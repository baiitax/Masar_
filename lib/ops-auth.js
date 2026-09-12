import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Phase-1 MVP auth for the MASAR Ops portal.
 *
 * Operators are an email allowlist (OPERATOR_EMAILS) plus a shared access
 * code (OPERATOR_ACCESS_CODE); sessions are HMAC-signed httpOnly cookies
 * (12h). This is deliberately swappable for magic-link/SSO in Phase 2 of the
 * CRM plan — the guard surface (getSession) stays the same.
 */

export const OPS_COOKIE = "masar_ops_session";
export const OPS_ROLES = ["masar.desk", "masar.compliance"];

const b64u = (str) => Buffer.from(str, "utf8").toString("base64url");

export function opsConfigured() {
  return Boolean(
    process.env.OPS_SECRET &&
      process.env.OPERATOR_EMAILS &&
      process.env.OPERATOR_ACCESS_CODE
  );
}

export function operatorAllowed(email) {
  const list = (process.env.OPERATOR_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(String(email || "").trim().toLowerCase());
}

export function checkAccessCode(code) {
  const want = process.env.OPERATOR_ACCESS_CODE || "";
  if (!want || code == null) return false;
  const a = Buffer.from(String(code));
  const b = Buffer.from(want);
  return a.length === b.length && timingSafeEqual(a, b);
}

function sign(payload) {
  return createHmac("sha256", process.env.OPS_SECRET || "")
    .update(payload)
    .digest("base64url");
}

export function createSessionValue(email) {
  const payload = b64u(
    JSON.stringify({ email, role: "masar.desk", exp: Date.now() + 12 * 3600 * 1000 })
  );
  return `${payload}.${sign(payload)}`;
}

export function verifySessionValue(value) {
  if (!value || !process.env.OPS_SECRET) return null;
  const [payload, sig] = String(value).split(".");
  if (!payload || !sig) return null;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(payload));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data || typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

/** Server-component guard (next/headers cookies). */
export function getSession() {
  const c = cookies().get(OPS_COOKIE);
  return c ? verifySessionValue(c.value) : null;
}

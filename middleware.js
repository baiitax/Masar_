import { NextResponse } from "next/server";

/**
 * Edge guard for the Ops portal: runs BEFORE any rendering, so unauthenticated
 * requests get a true 307 and no CRM data ever enters the response stream.
 * (A layout-level guard remains as defense-in-depth.)
 *
 * Session cookies are HMAC-SHA256 signed (base64url) — verified here with Web
 * Crypto to stay edge-runtime compatible.
 */

const OPS_COOKIE = "masar_ops_session";

function b64urlToBytes(str) {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64 + "===".slice((b64.length + 3) % 4);
  const bin = atob(pad);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function bytesToB64url(bytes) {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function verifySession(value, secret) {
  if (!value || !secret) return null;
  const [payload, sig] = String(value).split(".");
  if (!payload || !sig) return null;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  if (bytesToB64url(new Uint8Array(mac)) !== sig) return null;
  try {
    const data = JSON.parse(new TextDecoder().decode(b64urlToBytes(payload)));
    if (!data || typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export async function middleware(request) {
  const secret = process.env.OPS_SECRET;
  if (!secret) {
    return NextResponse.redirect(new URL("/portal/login", request.url));
  }
  const cookie = request.cookies.get(OPS_COOKIE)?.value;
  const session = await verifySession(cookie, secret);
  if (!session) {
    return NextResponse.redirect(new URL("/portal/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/masar/:path*"],
};

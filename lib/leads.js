import { promises as fs } from "fs";
import path from "path";
import { FORM_SCHEMAS } from "@/content/forms";
import { commodities } from "@/content/commodities";

const DATA_DIR = path.join(process.cwd(), ".data");
const LEADS_FILE = path.join(DATA_DIR, "leads.jsonl");

export const LEAD_TYPES = ["BUYER", "EXPORTER", "PARTNER", "INVESTOR", "MEDIA", "GENERAL"];

// Simple in-memory rate limiting (per server instance)
const buckets = new Map();
export function rateLimit(ip, limit = 10, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (buckets.get(ip) || []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) return false;
  arr.push(now);
  buckets.set(ip, arr);
  return true;
}

function clean(value) {
  if (typeof value !== "string") return value;
  // strip control chars except normal whitespace
  return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, 5000);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Internal lead scoring — never exposed publicly.
 * Dimensions mirror §47 of the operating brief.
 */
export function scoreLead(type, p) {
  let score = 0;
  const dims = {};
  const add = (k, v) => {
    dims[k] = v;
    score += v;
  };
  const has = (v) => v && String(v).trim().length > 0;

  add("verified_company_signal", has(p.website) || has(p.registrationNumber) ? 15 : 5);
  add("complete_requirement", has(p.productSpecification) || has(p.capabilities) || has(p.message) ? 20 : 5);

  const commodity = p.commodity || (Array.isArray(p.commodities) ? p.commodities[0] : "");
  const known = commodities.some((c) => c.name === commodity);
  add("commodity_relevance", known ? 15 : commodity ? 7 : 0);

  const qty = parseFloat(p.quantity || p.typicalVolume || "");
  add("quantity_clarity", Number.isFinite(qty) && qty > 0 ? 10 : has(p.annualCapacity) ? 7 : 2);
  add("frequency", p.frequency && p.frequency !== "One-off spot purchase" ? 10 : p.frequency ? 5 : 0);
  add("destination", has(p.destination) || has(p.targetMarkets) || has(p.country) ? 10 : 3);
  add("timeline", has(p.deliveryPeriod) || has(p.deadline) ? 10 : 3);
  add(
    "documentation_readiness",
    (Array.isArray(p.exportDocuments) && p.exportDocuments.length) || has(p.certifications) ? 10 : 2
  );
  add("decision_maker", has(p.role) ? 5 : 2);

  const grade = score >= 85 ? "A" : score >= 65 ? "B" : score >= 40 ? "C" : "D";
  return { score: Math.min(100, score), grade, dimensions: dims };
}

export async function persistLead(lead) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(LEADS_FILE, JSON.stringify(lead) + "\n", "utf8");
  } catch (err) {
    // Persistence failure must not break the UX in ephemeral environments;
    // the lead is still accepted and logged.
    console.warn("lead persistence failed:", err.message);
  }
}

export function validateLead(body) {
  const errors = [];
  if (!body || typeof body !== "object") return ["Malformed request"];
  const { type, payload } = body;
  if (!LEAD_TYPES.includes(type)) errors.push("Invalid lead type");
  if (!payload || typeof payload !== "object") errors.push("Missing payload");
  if (body.website) errors.push("Spam trap triggered");
  if (errors.length) return errors;

  const schema = Object.values(FORM_SCHEMAS).find((s) => s.type === type);
  const names = new Set();
  schema.groups.forEach((g) => g.fields.forEach((f) => names.add(f.name)));

  for (const f of schema.groups.flatMap((g) => g.fields)) {
    const v = payload[f.name];
    if (f.type === "files") continue;
    if (f.required) {
      if (f.type === "checkboxes") {
        if (!Array.isArray(v) || v.length === 0) errors.push(`${f.label} is required`);
      } else if (!v || !String(v).trim()) errors.push(`${f.label} is required`);
    }
    if (f.type === "email" && v && !EMAIL_RE.test(String(v).trim())) errors.push("Invalid email");
    if (typeof v === "string" && v.length > 5000) errors.push(`${f.label} too long`);
    if (f.type === "checkboxes" && v != null && !Array.isArray(v)) errors.push(`${f.label} malformed`);
  }
  return errors;
}

export function sanitizePayload(payload) {
  const out = {};
  Object.entries(payload).forEach(([k, v]) => {
    if (Array.isArray(v)) out[k] = v.map((x) => clean(x)).filter(Boolean);
    else if (typeof v === "string") out[k] = clean(v);
    else out[k] = v;
  });
  return out;
}

export function makeReference(type) {
  const year = new Date().getFullYear();
  const prefix = type === "BUYER" ? "B" : type === "EXPORTER" ? "E" : type === "PARTNER" ? "P" : type === "INVESTOR" ? "S" : type === "MEDIA" ? "M" : "G";
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `MAS-${year}-${prefix}${rand}`;
}

export function assignedTeamFor(type) {
  const schema = Object.values(FORM_SCHEMAS).find((s) => s.type === type);
  return schema?.teams || "General";
}

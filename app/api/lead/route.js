import { NextResponse } from "next/server";
import {
  validateLead,
  sanitizePayload,
  scoreLead,
  persistLead,
  makeReference,
  assignedTeamFor,
  rateLimit,
} from "@/lib/leads";

export const runtime = "nodejs";

function clientIp(request) {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : request.headers.get("x-real-ip") || "unknown";
}

function sameOrigin(request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin) return true; // same-origin fetch from older clients omits Origin
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Cross-origin requests are not permitted." }, { status: 403 });
  }
  const ip = clientIp(request);
  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request" }, { status: 400 });
  }

  const errors = validateLead(body);
  if (errors.length) {
    return NextResponse.json({ ok: false, error: errors[0], errors }, { status: 422 });
  }

  const payload = sanitizePayload(body.payload);
  const scoring = scoreLead(body.type, payload);
  const reference = makeReference(body.type);

  const lead = {
    reference,
    type: body.type,
    source: String(body.source || "").slice(0, 200),
    page: String(body.path || "").slice(0, 200),
    lang: ["en", "ar", "fr"].includes(body.lang) ? body.lang : "en",
    payload,
    // Internal scoring — never returned to the client in detail.
    scoring,
    assignedTeam: assignedTeamFor(body.type),
    status: "new",
    receivedAt: new Date().toISOString(),
  };

  await persistLead(lead);

  return NextResponse.json({
    ok: true,
    reference,
    message: "Your request has been received.",
  });
}

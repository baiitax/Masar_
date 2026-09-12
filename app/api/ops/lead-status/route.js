import { NextResponse } from "next/server";
import { OPS_COOKIE, verifySessionValue } from "@/lib/ops-auth";
import { ensureSchema, updateLeadStatus, leadExists } from "@/lib/db";

export const runtime = "nodejs";

const STATUSES = ["new", "contacted", "qualified", "matched", "in-transaction", "closed", "disqualified"];

export async function POST(request) {
  const session = verifySessionValue(request.cookies.get(OPS_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request" }, { status: 400 });
  }
  const { reference, status } = body || {};
  if (!/^MAS-\d{4}-[A-Z]{7}$/.test(String(reference || "")) || !STATUSES.includes(status)) {
    return NextResponse.json({ ok: false, error: "Invalid reference or status." }, { status: 422 });
  }
  if (!(await ensureSchema()) || !(await leadExists(reference))) {
    return NextResponse.json({ ok: false, error: "Lead not found." }, { status: 404 });
  }
  try {
    await updateLeadStatus(reference, status, session.email);
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Update failed." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

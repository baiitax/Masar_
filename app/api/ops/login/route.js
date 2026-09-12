import { NextResponse } from "next/server";
import {
  OPS_COOKIE,
  opsConfigured,
  operatorAllowed,
  checkAccessCode,
  createSessionValue,
} from "@/lib/ops-auth";

export const runtime = "nodejs";

export async function POST(request) {
  if (!opsConfigured()) {
    return NextResponse.json({ ok: false, error: "Ops auth is not configured." }, { status: 503 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request" }, { status: 400 });
  }
  const { email, code } = body || {};
  if (!operatorAllowed(email) || !checkAccessCode(code)) {
    return NextResponse.json({ ok: false, error: "Invalid credentials." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(OPS_COOKIE, createSessionValue(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 12 * 3600,
  });
  return res;
}

import { NextResponse } from "next/server";
import { OPS_COOKIE } from "@/lib/ops-auth";

export const runtime = "nodejs";

export async function GET() {
  const res = NextResponse.redirect(new URL("/portal/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  res.cookies.delete(OPS_COOKIE);
  return res;
}

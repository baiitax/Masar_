import { NextResponse } from "next/server";
import { dbAvailable, dbPing, ensureSchema, leadExists } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Liveness + database connectivity check. Exposes no data:
 * the optional ?probe=MAS-YYYY-XXXXXXX parameter returns only a boolean
 * existence answer for a reference of that exact shape.
 */
export async function GET(request) {
  const probe = new URL(request.url).searchParams.get("probe");
  const out = { ok: true, db: false, at: new Date().toISOString() };

  if (dbAvailable()) {
    const ready = await ensureSchema();
    out.db = ready ? await dbPing() : false;
    if (probe && /^MAS-\d{4}-[A-Z]{7}$/.test(probe)) {
      try {
        out.probe = await leadExists(probe);
      } catch {
        out.probe = null;
      }
    }
  }

  return NextResponse.json(out);
}

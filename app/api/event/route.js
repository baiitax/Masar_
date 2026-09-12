import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { ensureSchema, insertEvent } from "@/lib/db";

export const runtime = "nodejs";

// Privacy-conscious event collector: no PII is collected by the client.
export async function POST(request) {
  const origin = request.headers.get("origin");
  if (origin && (() => { try { return new URL(origin).host !== request.headers.get("host"); } catch { return true; } })()) {
    return new Response(null, { status: 403 });
  }
  try {
    const event = await request.json();
    if (!event || typeof event.type !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const safe = {
      type: String(event.type).slice(0, 80),
      path: String(event.path || "").slice(0, 200),
      lang: ["en", "ar", "fr"].includes(event.lang) ? event.lang : undefined,
      commodity: event.commodity ? String(event.commodity).slice(0, 80) : undefined,
      destination: event.destination ? String(event.destination).slice(0, 80) : undefined,
      at: new Date().toISOString(),
    };
    const dir = path.join(process.cwd(), ".data");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(path.join(dir, "events.jsonl"), JSON.stringify(safe) + "\n", "utf8").catch(() => {});
    try {
      if (await ensureSchema()) await insertEvent(safe);
    } catch {
      // Analytics must never break the experience.
    }
  } catch {
    // Analytics must never break the experience.
  }
  return new Response(null, { status: 204 });
}

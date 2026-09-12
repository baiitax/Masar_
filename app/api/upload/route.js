import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { rateLimit } from "@/lib/leads";

export const runtime = "nodejs";

const ALLOWED = [
  { ext: "pdf", ct: ["application/pdf"] },
  { ext: "jpg", ct: ["image/jpeg"] },
  { ext: "jpeg", ct: ["image/jpeg"] },
  { ext: "png", ct: ["image/png"] },
  { ext: "doc", ct: ["application/msword"] },
  { ext: "docx", ct: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"] },
];
const MAX_FILE = 8 * 1024 * 1024;
const MAX_TOTAL = 24 * 1024 * 1024;

export async function POST(request) {
  const origin = request.headers.get("origin");
  if (origin && (() => { try { return new URL(origin).host !== request.headers.get("host"); } catch { return true; } })()) {
    return NextResponse.json({ ok: false, error: "Cross-origin requests are not permitted." }, { status: 403 });
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip, 20)) {
    return NextResponse.json({ ok: false, error: "Too many uploads." }, { status: 429 });
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed upload" }, { status: 400 });
  }

  const reference = String(form.get("reference") || "");
  const field = String(form.get("field") || "documents").replace(/[^a-z0-9_-]/gi, "");
  if (!/^MAS-\d{4}-[A-Z]{7}$/.test(reference)) {
    return NextResponse.json({ ok: false, error: "Invalid reference" }, { status: 400 });
  }

  const files = form.getAll("files").filter((f) => typeof f === "object" && f.arrayBuffer);
  if (!files.length) return NextResponse.json({ ok: true, stored: 0 });

  let total = 0;
  const stored = [];
  const dir = path.join(process.cwd(), ".data", "uploads", reference);
  await fs.mkdir(dir, { recursive: true });

  for (const file of files) {
    const name = file.name || "file";
    const ext = name.split(".").pop().toLowerCase();
    const allowed = ALLOWED.find((a) => a.ext === ext);
    if (!allowed) {
      return NextResponse.json({ ok: false, error: `File type not permitted: ${ext}` }, { status: 422 });
    }
    if (file.size > MAX_FILE) {
      return NextResponse.json({ ok: false, error: "A file exceeds the 8 MB limit" }, { status: 422 });
    }
    total += file.size;
    if (total > MAX_TOTAL) {
      return NextResponse.json({ ok: false, error: "Total upload size exceeded" }, { status: 422 });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const safe = `${Date.now()}-${name.replace(/[^a-z0-9._-]/gi, "_").slice(-80)}`;
    await fs.writeFile(path.join(dir, safe), buf);
    stored.push({ field, name: safe, size: file.size });
  }

  return NextResponse.json({ ok: true, stored: stored.length });
}

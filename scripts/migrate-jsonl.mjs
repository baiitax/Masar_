#!/usr/bin/env node
/**
 * One-off data migration: .data/leads.jsonl + .data/events.jsonl -> Neon.
 *
 * Usage (requires a DATABASE_URL in the environment):
 *   DATABASE_URL=postgres://... node scripts/migrate-jsonl.mjs
 *
 * The schema must already exist (the app bootstraps it on first API use,
 * or hit GET /api/health once). Duplicate references are skipped and the
 * JSONL files are left untouched.
 */
import { readFileSync, existsSync } from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

const url =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.POSTGRES_URL;

if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const sql = neon(url);

async function main() {
  const leadsFile = path.join(process.cwd(), ".data", "leads.jsonl");
  const eventsFile = path.join(process.cwd(), ".data", "events.jsonl");
  let leads = 0;
  let events = 0;

  if (existsSync(leadsFile)) {
    for (const line of readFileSync(leadsFile, "utf8").split("\n").filter(Boolean)) {
      const l = JSON.parse(line);
      await sql(
        `INSERT INTO leads (reference, type, source, page, lang, payload, scoring, assigned_team, status, received_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT (reference) DO NOTHING`,
        [
          l.reference,
          l.type,
          l.source || "",
          l.page || "",
          l.lang || "en",
          JSON.stringify(l.payload || {}),
          JSON.stringify(l.scoring || null),
          l.assignedTeam || "",
          l.status || "new",
          l.receivedAt || new Date().toISOString(),
        ]
      );
      leads++;
    }
  }

  if (existsSync(eventsFile)) {
    for (const line of readFileSync(eventsFile, "utf8").split("\n").filter(Boolean)) {
      const e = JSON.parse(line);
      await sql(
        `INSERT INTO events (type, path, lang, commodity, destination, at) VALUES ($1,$2,$3,$4,$5,$6)`,
        [e.type || "", e.path || "", e.lang || null, e.commodity || null, e.destination || null, e.at || new Date().toISOString()]
      );
      events++;
    }
  }

  console.log(`migrated leads=${leads} events=${events}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

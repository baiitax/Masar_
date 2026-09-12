import { neon } from "@neondatabase/serverless";

/**
 * Postgres persistence (Neon via Vercel Marketplace).
 *
 * The connection string arrives as DATABASE_URL (or POSTGRES_URL) when the
 * Neon resource is connected to the project; until then every helper is a
 * no-op and callers fall back to the git-ignored JSONL store, so the site
 * runs identically in local/dev environments without a database.
 */

let sql = null;
let schemaPromise = null;

export function dbAvailable() {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

function getSql() {
  if (!dbAvailable()) return null;
  if (!sql) sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);
  return sql;
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  reference TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  source TEXT,
  page TEXT,
  lang TEXT,
  payload JSONB NOT NULL DEFAULT '{}',
  scoring JSONB,
  assigned_team TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  received_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  type TEXT,
  path TEXT,
  lang TEXT,
  commodity TEXT,
  destination TEXT,
  at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS documents (
  id BIGSERIAL PRIMARY KEY,
  reference TEXT NOT NULL,
  field TEXT,
  name TEXT,
  size INTEGER,
  mime TEXT,
  stored_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

/** Idempotent schema bootstrap; resolved once per serverless instance. */
export async function ensureSchema() {
  const s = getSql();
  if (!s) return false;
  if (!schemaPromise) {
    schemaPromise = s(SCHEMA)
      .then(() => true)
      .catch((err) => {
        console.warn("db schema bootstrap failed:", err.message);
        schemaPromise = null; // allow retry on a later call
        return false;
      });
  }
  return schemaPromise;
}

export async function insertLead(lead) {
  const s = getSql();
  await s(
    `INSERT INTO leads (reference, type, source, page, lang, payload, scoring, assigned_team, status, received_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     ON CONFLICT (reference) DO NOTHING`,
    [
      lead.reference,
      lead.type,
      lead.source || "",
      lead.page || "",
      lead.lang || "en",
      JSON.stringify(lead.payload || {}),
      JSON.stringify(lead.scoring || null),
      lead.assignedTeam || "",
      lead.status || "new",
      lead.receivedAt || new Date().toISOString(),
    ]
  );
}

export async function insertEvent(e) {
  const s = getSql();
  await s(`INSERT INTO events (type, path, lang, commodity, destination, at)
           VALUES ($1,$2,$3,$4,$5,$6)`, [
    e.type || "",
    e.path || "",
    e.lang || null,
    e.commodity || null,
    e.destination || null,
    e.at || new Date().toISOString(),
  ]);
}

export async function insertDocument(d) {
  const s = getSql();
  await s(`INSERT INTO documents (reference, field, name, size, mime)
           VALUES ($1,$2,$3,$4,$5)`, [
    d.reference,
    d.field || "",
    d.name || "",
    d.size || 0,
    d.mime || "",
  ]);
}

/** Existence oracle for a lead reference (used by /api/health probes). */
export async function leadExists(reference) {
  const s = getSql();
  const rows = await s(`SELECT 1 AS one FROM leads WHERE reference = $1 LIMIT 1`, [reference]);
  return rows.length > 0;
}

export async function dbPing() {
  const s = getSql();
  if (!s) return false;
  try {
    await s`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

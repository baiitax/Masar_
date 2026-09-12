import { neon } from "@neondatabase/serverless";

/**
 * MASAR persistence layer — Neon Postgres (Vercel Marketplace).
 *
 * Connection: uses the pooled HTTP URL (DATABASE_URL / POSTGRES_URL) which is
 * the correct driver shape for serverless functions (no TCP sockets, no
 * pool exhaustion). Writes are wrapped in a small retry for transient
 * network failures. When no URL is configured (local dev) every helper is a
 * no-op and callers fall back to the git-ignored JSONL store.
 *
 * Migrations: versioned and idempotent. `ensureSchema()` applies any
 * unapplied migration from MIGRATIONS in order and records it in
 * schema_migrations; concurrent serverless cold-starts are safe because all
 * DDL is IF NOT EXISTS and migration rows insert ON CONFLICT DO NOTHING.
 */

let sql = null;
let schemaPromise = null;
let appliedVersion = null;

export function dbAvailable() {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

function getSql() {
  if (!dbAvailable()) return null;
  if (!sql) {
    const raw = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);
    // v1 driver: tagged templates OR .query(); keep both call shapes usable.
    sql = (q, ...rest) =>
      typeof q === "string" ? raw.query(q, rest[0]) : raw(q, ...rest);
  }
  return sql;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Retry wrapper for transient serverless↔Neon network blips. */
async function withRetry(fn, retries = 2) {
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < retries) await sleep(150 * (i + 1));
    }
  }
  throw lastErr;
}

/* ------------------------------------------------------------------ */
/* Versioned migrations — the comprehensive CRM schema (plan §2).       */
/* ------------------------------------------------------------------ */

const MIGRATIONS = [
  {
    version: 1,
    name: "core crm schema",
    sql: `
CREATE TABLE IF NOT EXISTS schema_migrations (
  version INTEGER PRIMARY KEY,
  name TEXT,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS organizations (
  id BIGSERIAL PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('BUYER','EXPORTER','PARTNER','MASAR')),
  name TEXT NOT NULL,
  country TEXT,
  registration_number TEXT,
  website TEXT,
  status TEXT NOT NULL DEFAULT 'prospect',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  org_id BIGINT REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  lang TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

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
  org_id BIGINT REFERENCES organizations(id) ON DELETE SET NULL,
  received_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS requirements (
  id BIGSERIAL PRIMARY KEY,
  org_id BIGINT REFERENCES organizations(id) ON DELETE CASCADE,
  lead_reference TEXT,
  commodity TEXT NOT NULL,
  grade TEXT,
  quantity NUMERIC,
  unit TEXT,
  frequency TEXT,
  destination TEXT,
  delivery_period TEXT,
  packaging TEXT,
  certifications TEXT,
  product_specification TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS capabilities (
  id BIGSERIAL PRIMARY KEY,
  org_id BIGINT REFERENCES organizations(id) ON DELETE CASCADE,
  lead_reference TEXT,
  commodities JSONB NOT NULL DEFAULT '[]',
  annual_capacity TEXT,
  target_markets JSONB NOT NULL DEFAULT '[]',
  docs_ready BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS matches (
  id BIGSERIAL PRIMARY KEY,
  requirement_id BIGINT NOT NULL REFERENCES requirements(id) ON DELETE CASCADE,
  capability_id BIGINT NOT NULL REFERENCES capabilities(id) ON DELETE CASCADE,
  score INTEGER,
  status TEXT NOT NULL DEFAULT 'PROPOSED'
    CHECK (status IN ('PROPOSED','ACCEPTED','DECLINED','TRANSACTION')),
  proposed_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS transactions (
  id BIGSERIAL PRIMARY KEY,
  match_id BIGINT REFERENCES matches(id) ON DELETE SET NULL,
  code TEXT UNIQUE NOT NULL,
  stage INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'open',
  opened_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  closed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS gates (
  id BIGSERIAL PRIMARY KEY,
  transaction_id BIGINT NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  gate_no INTEGER NOT NULL,
  label TEXT NOT NULL,
  satisfied BOOLEAN NOT NULL DEFAULT false,
  satisfied_at TIMESTAMPTZ,
  satisfied_by TEXT,
  UNIQUE (transaction_id, gate_no)
);

CREATE TABLE IF NOT EXISTS documents (
  id BIGSERIAL PRIMARY KEY,
  org_id BIGINT REFERENCES organizations(id) ON DELETE SET NULL,
  reference TEXT,
  transaction_id BIGINT REFERENCES transactions(id) ON DELETE SET NULL,
  field TEXT,
  name TEXT,
  size INTEGER,
  mime TEXT,
  av_status TEXT NOT NULL DEFAULT 'pending',
  stored_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS evidence (
  id BIGSERIAL PRIMARY KEY,
  transaction_id BIGINT NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  gate_id BIGINT REFERENCES gates(id) ON DELETE SET NULL,
  doc_id BIGINT REFERENCES documents(id) ON DELETE SET NULL,
  kind TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'UNDER_VALIDATION'
    CHECK (status IN ('VERIFIED','SECONDARY','HISTORICAL','ILLUSTRATIVE','TARGET','UNDER_VALIDATION')),
  submitted_by_org BIGINT REFERENCES organizations(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  transaction_id BIGINT REFERENCES transactions(id) ON DELETE CASCADE,
  lead_reference TEXT,
  author_org BIGINT REFERENCES organizations(id) ON DELETE SET NULL,
  author_name TEXT,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tasks (
  id BIGSERIAL PRIMARY KEY,
  transaction_id BIGINT REFERENCES transactions(id) ON DELETE CASCADE,
  assignee_org BIGINT REFERENCES organizations(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  due_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
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

CREATE TABLE IF NOT EXISTS audit_log (
  id BIGSERIAL PRIMARY KEY,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  before JSONB,
  after JSONB,
  at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`,
  },
  {
    version: 2,
    name: "indexes for pipeline queries",
    sql: `
CREATE INDEX IF NOT EXISTS idx_leads_type_status ON leads (type, status);
CREATE INDEX IF NOT EXISTS idx_leads_received_at ON leads (received_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_org ON leads (org_id);
CREATE INDEX IF NOT EXISTS idx_events_at ON events (at DESC);
CREATE INDEX IF NOT EXISTS idx_documents_reference ON documents (reference);
CREATE INDEX IF NOT EXISTS idx_transactions_stage ON transactions (stage) WHERE status = 'open';
CREATE INDEX IF NOT EXISTS idx_evidence_txn ON evidence (transaction_id);
CREATE INDEX IF NOT EXISTS idx_gates_txn ON gates (transaction_id);
CREATE INDEX IF NOT EXISTS idx_requirements_commodity ON requirements (commodity);
CREATE INDEX IF NOT EXISTS idx_audit_at ON audit_log (at DESC);
`,
  },
];

/** Applies unapplied migrations; safe under concurrent cold starts. */
export async function ensureSchema() {
  const s = getSql();
  if (!s) return false;
  if (appliedVersion) return true;
  if (!schemaPromise) {
    schemaPromise = (async () => {
      try {
        await withRetry(async () => {
          for (const m of MIGRATIONS) {
            await s(m.sql);
            await s(
              `INSERT INTO schema_migrations (version, name) VALUES ($1,$2)
               ON CONFLICT (version) DO NOTHING`,
              [m.version, m.name]
            );
          }
        });
        const rows = await s`SELECT MAX(version) AS v FROM schema_migrations`;
        appliedVersion = Number(rows[0]?.v ?? 0);
        return true;
      } catch (err) {
        console.warn("db schema bootstrap failed:", err.message);
        schemaPromise = null; // allow retry on a later call
        return false;
      }
    })();
  }
  return schemaPromise;
}

export async function schemaVersion() {
  const s = getSql();
  if (!s) return null;
  try {
    const rows = await s`SELECT MAX(version) AS v FROM schema_migrations`;
    return Number(rows[0]?.v ?? 0);
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Data-access helpers (Ops + future portals).                         */
/* ------------------------------------------------------------------ */

export async function insertLead(lead) {
  const s = getSql();
  await withRetry(() =>
    s(
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
    )
  );
}

export async function leadByReference(reference) {
  const s = getSql();
  const rows = await s(`SELECT * FROM leads WHERE reference = $1 LIMIT 1`, [reference]);
  return rows[0] || null;
}

export async function leadExists(reference) {
  const s = getSql();
  const rows = await s(`SELECT 1 AS one FROM leads WHERE reference = $1 LIMIT 1`, [reference]);
  return rows.length > 0;
}

export async function listLeads({ type, status, limit = 50 } = {}) {
  const s = getSql();
  const where = [];
  const params = [];
  if (type) {
    params.push(type);
    where.push(`type = $${params.length}`);
  }
  if (status) {
    params.push(status);
    where.push(`status = $${params.length}`);
  }
  params.push(limit);
  return s(
    `SELECT * FROM leads ${where.length ? "WHERE " + where.join(" AND ") : ""}
     ORDER BY received_at DESC LIMIT $${params.length}`,
    params
  );
}

export async function updateLeadStatus(reference, status, actor = "system") {
  const s = getSql();
  const before = await leadByReference(reference);
  await s(`UPDATE leads SET status = $1 WHERE reference = $2`, [status, reference]);
  await insertAudit(actor, "lead.status", "lead", reference, before, { status });
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
  await s(
    `INSERT INTO documents (reference, field, name, size, mime)
     VALUES ($1,$2,$3,$4,$5)`,
    [d.reference, d.field || "", d.name || "", d.size || 0, d.mime || ""]
  );
}

export async function listDocuments(reference) {
  const s = getSql();
  return s(`SELECT * FROM documents WHERE reference = $1 ORDER BY stored_at DESC`, [reference]);
}

export async function createOrganization(org) {
  const s = getSql();
  const rows = await s(
    `INSERT INTO organizations (kind, name, country, registration_number, website, status)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [org.kind, org.name, org.country || null, org.registration || null, org.website || null, org.status || "prospect"]
  );
  return rows[0];
}

export async function linkLeadToOrg(reference, orgId, actor = "system") {
  const s = getSql();
  await s(`UPDATE leads SET org_id = $1 WHERE reference = $2`, [orgId, reference]);
  await insertAudit(actor, "lead.link_org", "lead", reference, null, { org_id: orgId });
}

/** Opens a transaction room and seeds gates G1–G6 (controlled release). */
export async function openTransaction(matchId, code, gateLabels) {
  const s = getSql();
  const rows = await s(
    `INSERT INTO transactions (match_id, code) VALUES ($1,$2) RETURNING *`,
    [matchId, code]
  );
  const txn = rows[0];
  for (let i = 0; i < (gateLabels || []).length; i++) {
    await s(
      `INSERT INTO gates (transaction_id, gate_no, label) VALUES ($1,$2,$3)
       ON CONFLICT (transaction_id, gate_no) DO NOTHING`,
      [txn.id, i + 1, gateLabels[i]]
    );
  }
  await insertAudit("system", "transaction.open", "transaction", code, null, { match_id: matchId });
  return txn;
}

/** A gate satisfies only via VERIFIED evidence — controlled release rule. */
export async function satisfyGate(transactionId, gateNo, evidenceRow, actor) {
  const s = getSql();
  if (!evidenceRow || evidenceRow.status !== "VERIFIED") {
    throw new Error("gate requires VERIFIED evidence");
  }
  await s(
    `UPDATE gates SET satisfied = true, satisfied_at = now(), satisfied_by = $3
     WHERE transaction_id = $1 AND gate_no = $2`,
    [transactionId, gateNo, actor]
  );
  await insertAudit(actor, "gate.satisfy", "transaction", String(transactionId), null, { gate_no: gateNo });
}

export async function insertAudit(actor, action, entityType, entityId, before, after) {
  const s = getSql();
  await s(
    `INSERT INTO audit_log (actor, action, entity_type, entity_id, before, after)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [actor, action, entityType, entityId || null, before ? JSON.stringify(before) : null, after ? JSON.stringify(after) : null]
  );
}

export async function listAudit(limit = 100) {
  const s = getSql();
  return s(`SELECT * FROM audit_log ORDER BY at DESC LIMIT $1`, [limit]);
}

export async function listAuditFor(entityId, limit = 50) {
  const s = getSql();
  return s(`SELECT * FROM audit_log WHERE entity_id = $1 ORDER BY at DESC LIMIT $2`, [entityId, limit]);
}

export async function listRecentDocuments(limit = 100) {
  const s = getSql();
  return s(`SELECT * FROM documents ORDER BY stored_at DESC LIMIT $1`, [limit]);
}

export async function dbPing() {
  const s = getSql();
  if (!s) return false;
  try {
    await withRetry(() => s`SELECT 1`);
    return true;
  } catch {
    return false;
  }
}

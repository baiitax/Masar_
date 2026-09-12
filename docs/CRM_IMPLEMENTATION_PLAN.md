# MASAR CRM & Portals — Implementation Plan

**Status:** Design v1 · **Scope:** turn the existing public lead-intake pipeline into a full
transaction CRM with four role-based portals.
**Constraints carried over from the master brief:** MASAR is transaction *infrastructure* —
the CRM never invents volumes, matches, or evidence; every record carries the evidence taxonomy
(`VERIFIED / SECONDARY / HISTORICAL / ILLUSTRATIVE / TARGET / UNDER VALIDATION`); empty states are
governed, not faked.

---

## 1. Current state (what we build on)

| Asset | Today |
|---|---|
| Intake | 6 schema-driven forms (BUYER / EXPORTER / PARTNER / INVESTOR / MEDIA / GENERAL) → `POST /api/lead` with server validation, honeypot, rate-limit, same-origin check |
| Lead record | `reference (MAS-2026-Bxxxxxx)`, type, payload, **internal scoring (0–100, grade A–D, 9 dimensions)**, assigned team, status, receivedAt — appended to git-ignored `.data/leads.jsonl` |
| Documents | `POST /api/upload` → allow-listed types, size caps, stored under `.data/uploads/<reference>/` |
| Analytics | PII-free funnel events (`/api/event`) |
| Reserved IA | `/portal/buyer|exporter|partner|masar` reserved in `robots.txt`, described on `/platform`, not exposed |

Gap: no database, no auth, no pipeline UI, no counterparty-facing surface. Leads currently die in a JSONL file.

---

## 2. Architecture

```
                        ┌──────────────────────────────┐
   Public site (SSG) ──▶│  Next.js 14 (this repo)      │
                        │  route group: (portal)       │
   /portal/buyer    ────▶│   middleware: auth + RBAC    │
   /portal/exporter ────▶│   server actions / API       │
   /portal/partner  ────▶│                              │
   /portal/masar    ────▶│  Supabase: Auth · Postgres · │
                        │  Storage (private buckets) · │
                        │  Realtime · Edge functions   │
                        └──────────────────────────────┘
```

- **Single codebase**: portals live in an `(portal)` route group with a `middleware.js` guard;
  public site stays SSG and untouched.
- **Supabase (Postgres)** mirrors the existing lead schema 1:1 so Phase 1 is a drop-in swap for
  `persistLead` (README already documents this swap).
- **Auth**: email magic-link + OTP to start (no passwords to store/handle); each user belongs to
  exactly one **Organization**; RBAC roles below. Later: SSO for institutional partners.
- **Storage**: private bucket per organization; signed short-lived URLs; server-side AV + content
  scan on upload (replaces `.data/uploads`).
- **Realtime**: Supabase Realtime channels per transaction room (stage/gate/message updates push
  to open portals; email/WhatsApp as fallback).
- **Audit**: append-only `audit_log` on every state change (who/when/before/after) — this is the
  "attributable decisions" principle made systemic.

### Core data model

```
organizations(id, kind: BUYER|EXPORTER|PARTNER|MASAR, name, country, registration, status)
users(id, org_id, name, email, role, lang)
leads(id, reference, type, source, payload jsonb, scoring jsonb, team, status, org_id?)
requirements(id, org_id, commodity, grade, qty, unit, frequency, destination, window, status)
capabilities(id, org_id, commodities[], docs_ready, annual_capacity, markets[])
matches(id, requirement_id, capability_id, score, status: PROPOSED|ACCEPTED|DECLINED|TRANSACTION)
transactions(id, match_id, stage (1..10), gates jsonb, status, opened_at, closed_at)
evidence(id, transaction_id, gate, kind, status: VERIFIED|…, doc_id, by_org, at)
documents(id, org_id, txn_id?, bucket_key, mime, size, av_status, classification)
messages(id, txn_id?, lead_id?, author, body, at)         -- always includes a MASAR desk seat
tasks(id, txn_id?, assignee_org, kind, due, status)       -- partner work orders
events(...)  audit_log(...)
```

### Roles (RBAC)

| Role | Sees / does |
|---|---|
| `masar.desk` | Full CRM: pipeline, scoring, matching, transaction control, evidence curation, publishing to public intelligence (approval workflow) |
| `masar.compliance` | Compliance checklists, document review, gate sign-off |
| `buyer.admin/member` | Own org's requirements, matches, transaction rooms, uploads |
| `exporter.admin/member` | Own profile, verification status, matched requirements, uploads, transaction rooms |
| `partner.executor` | Assigned tasks only (inspection orders, logistics legs, lab tests) + evidence submission |

---

## 3. The four portals

### 3.1 MASAR Ops Portal — `/portal/masar` (the CRM core)

Internal-only. Everything the public forms produce becomes a workable object here.

- **Pipeline board**: leads as cards across `new → contacted → qualified → matched → in-transaction → closed / disqualified`, filterable by type/team/grade/score; the internal score + 9 dimensions shown on the card (never exposed externally).
- **Lead workspace**: full payload, sanitized history, attached uploads (AV-scanned), notes, next-action tasks, email/WhatsApp log, one-click **convert to Organization** (creates org + sends portal invite).
- **Matching desk**: side-by-side requirement ↔ capability with commodity/grade/qty/frequency fit score; match proposals require a desk officer's sign-off (attributable).
- **Transaction workspace**: the existing 10-stage workflow as a live object; each stage lists its **gates (G1…G6)**; a gate flips to satisfied only when an evidence record with status `VERIFIED` is attached by an authorized role — enforcing "controlled release" in software.
- **Compliance queue**: per-regime checklists (SFDA/FASAH import side; NEPC/NAQS origin side), document expiry tracking.
- **Intelligence curation**: draft → review → approve → publish flow for public directories; records publish only with an evidence status; empty states remain governed.
- **Analytics**: §45 funnel from `/api/event` + pipeline metrics (conversion by team/grade/commodity), no PII.

### 3.2 Buyer Portal — `/portal/buyer`

For qualified Saudi/GCC demand.

1. **Onboarding**: invite from a qualified lead → magic-link auth → org profile (registration, SFDA status).
2. **Requirements**: create/track requirements (same schema as public form, saved drafts); live status timeline `received → validation → sourcing → matched → transaction`.
3. **Matches**: view proposed supplier shortlists with evidence-tagged dossiers (never raw directories); accept/decline proposals.
4. **Transaction room**: stage tracker mirroring MASAR's workflow, gate list with satisfied/pending state, evidence viewer (signed URLs), controlled-release notifications, message thread with the MASAR desk.
5. **Document vault**: specs, import permits; upload with the existing allow-list rules.

### 3.3 Exporter Portal — `/portal/exporter`

For verified African supply.

1. **Onboarding & verification track**: application converts to a verification checklist mirroring the public verification stack (identity → registration → capability → quality history → documentation); each step shows `pending / in review / verified` — the exporter sees exactly what "verified" requires.
2. **Capability profile**: commodities, grades, capacity, packaging, Incoterms comfort; kept current because matches score against it.
3. **Matched demand**: opt-in view of buyer requirements that fit; express supply intent (attributable).
4. **Transaction room**: same shared room as buyers; plus inspection scheduling and pre-shipment evidence uploads.
5. **Evidence bank**: every completed transaction accumulates a private track record the exporter can choose to share in future matches ("verified trade becomes financeable trade").

### 3.4 Partner Portal — `/portal/partner`

For the qualified third parties that move the physical world (inspection firms, labs, logistics, legal, banks).

- Receives **work orders** scoped to one transaction (e.g., "independent sampling at loading, Kano, week 32").
- Submits deliverables (reports, certificates, photos) → these become **evidence records** with `SECONDARY → VERIFIED` review by MASAR compliance.
- SLA timers and completion feed the transaction gates; partners see only their tasks, never the commercial terms.

---

## 4. How it works end-to-end (one trade)

```
Public form ─▶ lead (scored, routed) ─▶ Ops: qualify ─▶ org + portal invites
Buyer req ⇄ Exporter capability ─▶ Matching desk proposes (sign-off)
─▶ Transaction opened (stage 1)
   stages advance only when gates satisfied by VERIFIED evidence
   (inspection via Partner portal work order; docs via vaults; compliance checklists)
─▶ Controlled release at destination ─▶ evidence pack sealed ─▶ closed
─▶ repeat-trade intelligence: track records update both orgs' scores
```

Notifications at every gate change (portal realtime + email/WhatsApp digest). Every transition
writes `audit_log`.

---

## 5. Phased roadmap

| Phase | Scope | Exit criteria |
|---|---|---|
| **0 — Stabilize (1–2 wks)** | Supabase project; schema migrations mirroring lead record; swap `persistLead`/uploads; env + `.env.example`; alerts | Public forms write to Postgres; zero UX change |
| **1 — Ops MVP (4–6 wks)** | Auth + RBAC; pipeline board; lead workspace; doc review queue; audit log; replace JSONL tooling | A lead can go new→qualified→org with full history in-portal |
| **2 — Counterparty portals (4–6 wks)** | Buyer + Exporter portals: onboarding, requirements/capabilities, verification track, vaults, status timelines | First 5 buyers + 5 exporters self-serve |
| **3 — Transaction rooms (6–8 wks)** | Matches, gates/evidence engine, partner work orders, realtime room, release logic | First live transaction runs entirely in-system |
| **4 — Intelligence & scale (ongoing)** | Curation/publish workflow, analytics, repeat-trade scoring, financeable-record exports, SSO, i18n portals (AR/FR) | Public directories populate from verified records only |

**Effort note:** one senior full-stack + one product/compliance lead; Phases 0–2 ≈ one quarter.

---

## 6. Security & trust guardrails

- Postgres RLS: org-scoped isolation (`org_id = auth.org`); MASAR roles via service policies; partners see task-scoped rows only.
- CSRF tokens on all portal mutations; rate limits carried over; honeypot retained on public forms.
- Signed, expiring URLs; AV scan; type/size allow-lists unchanged.
- Internal scoring **never** leaves Ops portal responses.
- Evidence status is a workflow state, not a label: only compliance role can set `VERIFIED`.
- Public site discipline preserved: portals may enrich, but published intelligence still passes the
  curation workflow; empty states stay honest.

---

## 7. Open decisions

1. Supabase vs self-hosted Postgres+Keycloak (Supabase recommended for velocity).
2. WhatsApp Business API provider for gate notifications.
3. Whether banks get a read-only 5th view (financeable records) in Phase 4.
4. AR/FR portal localization depth (recommend EN-first with AR chrome in Phase 2).

# MASAR — Adversarial review against the master brief

Self-audit mapped to §66 "Final design test" and the non-negotiable business constraints.

## Business model fidelity
- [x] Positioned strictly as transaction infrastructure — homepage, platform, transactions and FAQ explicitly state what MASAR **is not** (marketplace, broker, bank, escrow, payment processor, logistics, warehouse, farm, lender).
- [x] Value chain stated: buyer/supplier intelligence, verification, matching, documentation/compliance, inspection coordination, transaction management, controlled release, evidence, repeat-trade intelligence.
- [x] Philosophy present: "Trust is engineered", "Compliance before cargo", "Independent evidence. Controlled release.", "We own the rail. Partners move the physical world.", "Verified trade becomes financeable trade."

## Unsupported-claims discipline (§37, §49–50, §61)
- [x] No invented volumes, customer counts, success rates, SLAs, shipments, revenue, valuation, licenses, certifications, partner/buyer logos or government relationships.
- [x] Active commodity column is intentionally empty; verified states only appear on actual evidence.
- [x] Partner network labeled "developing"; offices labeled developing; status page shows no uptime percentages; no fake press or leadership.
- [x] Every map/rail labeled "Illustrative trade corridor — not live transaction data".
- [x] No unsupported pricing — "request market quotation".
- [x] Evidence taxonomy (Verified/Secondary/Historical/Illustrative/Target/Under validation) used on commodities, corridors, compliance, articles and platform governance.
- [x] Inspection correctly described as coordinated through qualified third parties; no claim of owning labs.

## Final design test (§66)
- [x] Homepage explains MASAR within ~10s (badge, headline, subcopy, corridor rail).
- [x] Reads as a serious international institution; not crypto/marketplace/template.
- [x] Distinguishes MASAR from a marketplace ("Infrastructure, not a marketplace" section).
- [x] Explains the actual transaction (8-stage workflow + 10-stage interactive timeline + gates).
- [x] Demonstrates trust (verification stack, process-based trust indicators) and compliance (dedicated center with Saudi/origin regimes, document table, checklists, disclaimers).
- [x] Demonstrates Saudi + African understanding (origin/destination content, documentary photography, corridors, SFDA/FASAH/NEPC/NAQS references as guidance).
- [x] Buyer can submit a requirement immediately; exporter can apply immediately; partner collaboration path exists.
- [x] Expansion-ready architecture (Nigeria→Saudi flag; future corridors as Target; content-driven IA).
- [x] Arabic RTL works (verified via browser QA); FR switch present; preference persisted; no machine-translated deep copy (honest localization notice instead).
- [x] Mobile is purpose-built (bottom quick bar, thumb CTAs, drawer nav) — QA'd at 390px.
- [x] Glassmorphism remains readable; light and dark modes both AA-tuned.
- [x] Forms secure (server validation, honeypot, rate limit, origin check, sanitization, upload allow-lists/size caps, no credentials collected).
- [x] Authentic contextual imagery (custom-generated, documentary grade, navy/gold grade).
- [x] SEO + accessibility implemented; performance budget kept (~87 KB shared JS, SSG).
- [x] Feels like infrastructure, not marketing.

## Deliberate deferrals (honest scope)
- Deep interior page professional AR/FR copy: architecture complete; only homepage + chrome translated in v1 to avoid machine translation. A dismissible notice informs readers.
- Live CRM/DB: leads persist to git-ignored JSONL with full schema/scoring; README documents the Supabase/PostgreSQL swap.
- Private `/portal/*` workspaces: reserved/described, not exposed (no backend yet).
- Social links omitted (no verified official accounts per footer rule).

## QA performed
- `next build` clean: 69 routes generated.
- All 48 representative public routes return 200.
- Lead API: valid → scored (e.g. 77/B) routed lead + reference; invalid → 422 field list; honeypot → 422; bad type → 422; cross-origin blocked.
- Upload API: PDF accepted; `.exe` rejected; size/type enforced.
- Browser E2E: form validation errors render, full buyer submission reaches the branded success screen, EN→FR→AR switching flips lang/dir instantly and persists, zero console errors, every `img` has alt, buttons labeled, single h1.
- Visual QA across desktop dark/light, Arabic RTL, mobile hero/drawer, and the flagship transaction/corridor/commodity/intelligence surfaces.

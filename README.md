# MASAR — Saudi–Africa Trade Infrastructure Website

The official digital presence for **MASAR** — *the trusted transaction infrastructure for the
Saudi–Africa trade corridor*. MASAR is an asset-light transaction-infrastructure business: it
connects verified African agricultural supply with qualified Saudi demand and coordinates the
verification, compliance, independent evidence, controlled-release and execution workflow around
each trade. It is **not** a marketplace, broker, bank, escrow provider, logistics company,
warehouse operator, farm or lender.

The inaugural corridor is **Nigeria → Saudi Arabia**; the architecture is designed to extend to
**Africa → GCC** without a redesign.

---

## 1. Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (App Router), React 18 |
| Styling | Tailwind CSS + a semantic design-token / glassmorphism system (`app/globals.css`) |
| Components | Reusable design system under `components/` |
| Maps | `d3-geo` (Natural Earth via `world-atlas`) — no map API keys, no fake live data |
| Content | Structured, evidence-tagged content modules under `content/` (a CMS-shaped layer) |
| Forms / CRM | Secure API routes (`app/api`) with validation, rate limiting, honeypot, scored lead records |
| Fonts | Inter, Plus Jakarta Sans, IBM Plex Sans Arabic (via `next/font`) |
| Imagery | Next/Image (AVIF/WebP), custom documentary photography in `public/images/` |
| i18n | Instant EN / العربية (RTL) / FR with persisted preference (`components/AppProvider.jsx`) |

### Run

```bash
npm install
npm run dev        # development
npm run build && npm run start   # production
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) for canonical/OG/sitemap URLs.

---

## 2. Design system

Brand colors were **extracted from the actual MASAR logo files** (not invented):

- Primary navy `#061A3F` · deep blue `#0B2B68`
- Route gold `#C2994B` · highlight gold `#E6BE5E`

Tokens live in `app/globals.css` as CSS variables with light/dark variants
(`--bg`, `--ink`, `--muted`, `--line`, `--glass`, status colors…). Tailwind references the semantic
tokens (`text-ink`, `text-muted`, `border-line`, `bg-*`), so components never hardcode theme colors.
Gold is theme-aware so small gold text meets WCAG AA on the light theme.

Glass hierarchy follows the brief:

- **L0/L1** fixed atmospheric background + grid (`.app-bg`, `.app-grid`)
- **L2** glass navigation (`.glass-nav`)
- **L3** glass content cards (`.glass`)
- **L4** elevated transaction/feature cards (`.glass-strong`)
- **L5** primary CTA surfaces (`.btn-gold`)

Both **institutional dark** and **institutional light** themes are supported, persisted and
no-flash-bootstrapped before hydration.

---

## 3. Information architecture (implemented routes)

Public core: `/`, `/about`, `/platform`, `/how-it-works`
Trade: `/buyers`, `/buyers/request`, `/exporters`, `/exporters/apply`
Corridors: `/corridors`, `/corridors/nigeria-saudi` (flagship), `/corridor`
Commodities: `/commodities`, `/commodities/[slug]` (19 categories; full dossier pattern, sesame populated)
Intelligence: `/intelligence`, `/intelligence/saudi-buyers`, `/intelligence/african-suppliers`,
`/compliance`, `/verification`, `/inspection`, `/transactions`
Partners: `/partners`, `/strategic-partners`
Editorial: `/insights`, `/insights/[slug]`
Company: `/contact`, `/faq`, `/careers`, `/media`, `/strategic`, `/security`, `/status`
Legal: `/legal/privacy|terms|cookies|disclaimer|trade-disclaimer|data-protection`
Infrastructure: `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, API routes, `app/icon.png`

Future private portals (`/portal/buyer|exporter|partner|masar`) are intentionally **not** exposed —
they are described on `/platform` and reserved in `robots.txt`.

---

## 4. The trust / evidence model

The site never invents volumes, counts, success rates, licenses, certifications, partner logos or
government relationships. Instead it uses **process-based trust** and an explicit evidence taxonomy
(`content/commodities.js`, `app/platform`):

`VERIFIED · SECONDARY · HISTORICAL · ILLUSTRATIVE · TARGET · UNKNOWN`

- Commodity statuses: **Active / Under validation / Market intelligence / Future opportunity**.
  "Active" is intentionally empty until a verified transaction record exists.
- Partner network is labeled **"Partner network — developing"**; no logos are shown.
- Geographic presence (Riyadh / Lagos / Kano) is labeled **developing**, not claimed as offices.
- Intelligence directories show governed **empty states** ("No verified buyer records match this
  filter") instead of fabricated listings.
- All maps/rails are labeled **"Illustrative visualization — not live transaction data."**
- No unsupported pricing — commodity pages direct to "request market quotation."
- Status page reports systems without manufactured uptime percentages.

Editorial articles and dossiers carry author, sources, last-reviewed dates and disclaimers.

---

## 5. Forms, CRM, lead scoring and security

- One schema-driven form engine (`components/forms/LeadForm.jsx`) renders all intakes from
  `content/forms.js`: **BUYER, EXPORTER, PARTNER, INVESTOR, MEDIA, GENERAL** (careers reuses GENERAL).
- Buyer requirement and exporter application implement every field in the brief, including
  multi-select commodity/document chips and secure document uploads.
- `POST /api/lead`: same-origin check, in-memory rate limiting, honeypot, server-side validation,
  input sanitization, internal **lead scoring** (§47 dimensions — never returned to the client),
  team routing, status and a human reference (`MAS-2026-Bxxxxxx`). Records append to
  `.data/leads.jsonl` (git-ignored) — swap `persistLead` for HubSpot/Salesforce/Supabase.
- `POST /api/upload`: type allow-list (PDF/JPG/PNG/DOC/DOCX), 8 MB/file, 24 MB/total, private storage
  under `.data/uploads/<reference>/`.
- `POST /api/event`: privacy-conscious, PII-free analytics (pageviews + the §45 funnel events),
  queued to `localStorage` and beaconed.
- Security headers are set in `next.config.mjs`; the security page describes controls accurately
  without claiming unverified certifications.

### Production backend wiring (recommended, not required to run)

1. Replace `.data` persistence with PostgreSQL/Supabase tables mirroring the lead record
   (`reference, type, source, page, lang, payload, scoring, assignedTeam, status, receivedAt`).
2. Move document storage to a private bucket with signed, short-lived URLs and server-side
   antivirus/content scanning.
3. Add authenticated CSRF tokens for logged-in portal sessions and a turnkey bot provider if needed.
4. Add role-based access for the future `/portal/*` workspaces.

---

## 6. Content governance / CMS shape

`content/` is the CMS-agnostic content layer. Every record is shaped to support publication state,
author, reviewer, source, last-verified date and evidence status (see platform page "Content
governance"). To add:

- **Commodity** → extend `content/commodities.js` (status + dossier fields), create a dossier object.
- **Article** → add to `content/insights.js` with sources, dates and disclaimer.
- **FAQ** → `content/faqs.js` (auto-generates `FAQPage` schema).
- **Legal** → `content/legal.js`.
- **Corridor / workflow / platform / partners / forms** → matching module in `content/`.

Migration to a headless CMS (e.g. Sanity/Payload/Strapi) means replacing these modules with fetchers
while keeping the same evidence-status fields and review workflow (Source → Review → Approval →
Publication).

---

## 7. SEO, accessibility, performance

- Per-page metadata via `lib/seo.js` (title, description, canonical, OG, Twitter); Organization,
  WebSite, BreadcrumbList, Article, FAQPage and ContactPage JSON-LD (`components/schema.jsx`).
- Dynamic `sitemap.xml` and `robots.txt`; semantic headings; one `h1` per page; breadcrumbs.
- WCAG 2.2 AA targeting: keyboard operable menus/tabs/accordions, visible focus, labeled controls,
  `aria-expanded/controls/selected`, alert roles on form errors, skip link, AA contrast,
  `prefers-reduced-motion` handling, descriptive `alt` text, decorative SVGs aria-hidden.
- Performance: SSG/SSG-dynamic pages, `next/font`, optimized images (AVIF/WebP, `sizes`, lazy
  loading), client islands only where interactive, first-load JS ~87 KB shared.

---

## 8. Languages

- **English** is the source of record.
- **العربية** uses IBM Plex Sans Arabic, full RTL mirroring (logical properties, `dir/lang`
  switching, geo visuals pinned LTR), with homepage + global chrome professionally localized.
- **Français** homepage + global chrome are localized.
- Deep interior pages show an explicit, dismissible localization notice in AR/FR rather than
  machine-translated commercial/legal copy — extend `content/i18n/{ar,fr}.js` page-by-page with
  professional translation. Language preference is persisted and applied instantly.

---

## 9. Project map

```
app/                 routes (App Router), API, sitemap, robots, manifest, icon
components/          design system + page compositions + client islands
  maps/CorridorMap.jsx      animated d3-geo Saudi–Africa corridor (illustrative)
  forms/LeadForm.jsx        schema-driven secure B2B forms
  pages/                    page-level compositions & interactive explorers
content/             i18n dictionaries, commodities, corridors, workflow, platform,
                     partners, faqs, legal, insights, forms (CMS-shaped layer)
lib/                 SEO metadata, site config, lead scoring/validation
public/brand         official MASAR logos
public/images        custom documentary imagery + OG image
```

import { notFound } from "next/navigation";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  GlassCard,
  LinkButton,
  StatusPill,
  EvidenceTag,
  EmptyState,
  CheckList,
  Disclaim,
  Container,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import { commodities, getCommodity, COMMODITY_STATUS, sesameDossier } from "@/content/commodities";
import CTASection from "@/components/CTASection";

export function generateStaticParams() {
  return commodities.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = getCommodity(params.slug);
  if (!c) return {};
  return pageMeta({
    title: `${c.name} — commodity intelligence`,
    path: `/commodities/${c.slug}`,
    description: `${c.name} on the Nigeria–Saudi Arabia corridor: origin, demand, quality requirements, documentation, inspection, seasonality, logistics and risk, with evidence status.`,
  });
}

const GENERIC_QUALITY = [
  "Agreed grade and visual quality parameters, with tolerances fixed in writing",
  "Moisture within contract specification",
  "Foreign matter, damaged/discoloured material and admixture limits",
  "Applicable contaminant, residue and microbiological expectations aligned to Saudi food-import requirements",
  "Consistent packing, marking, lot identification and net-weight procedures",
];
const GENERIC_DOCS = [
  "Commercial contract and invoice, packing list",
  "Certificate of origin",
  "Phytosanitary certificate for applicable plant products",
  "Bill of lading / transport document",
  "Independent inspection and sampling report",
  "Laboratory analysis where the buyer or product category requires it",
  "Destination import and conformity documentation per importer status",
];
const GENERIC_INSPECTION = [
  "Sampling at aggregation and pre-shipment against the agreed specification",
  "Independent laboratory testing where specified",
  "Loading/stuffing supervision with photographic evidence",
  "Lot traceability from aggregation through shipment",
];

function SectionBlock({ icon, title, children }) {
  return (
    <Reveal>
      <GlassCard className="h-full">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
          <Icon name={icon} size={18} className="text-gold-500" /> {title}
        </h2>
        <div className="mt-3 text-sm leading-7 text-muted">{children}</div>
      </GlassCard>
    </Reveal>
  );
}

export default function CommodityPage({ params }) {
  const c = getCommodity(params.slug);
  if (!c) notFound();

  const status = COMMODITY_STATUS[c.status];
  const full = c.slug === "sesame" ? sesameDossier : null;
  const detailed = c.dossier;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Commodities", href: "/commodities" },
          { label: c.name },
        ]}
        eyebrow={`Commodity intelligence · ${c.scientific || "Agricultural products"}`}
        title={c.name}
        lead={c.summary}
      >
        <StatusPill tone={status.tone === "muted" ? "muted" : c.status === "FUTURE" ? "gold" : "warning"}>
          {status.label}
        </StatusPill>
        <LinkButton href="/buyers/request">Request market quotation</LinkButton>
      </PageHero>

      <Section className="!pt-4">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_330px]">
            <div className="space-y-5">
              <SectionBlock icon="doc" title="Overview">
                <p>{full?.overview || c.summary}</p>
              </SectionBlock>

              <SectionBlock icon="pin" title="Origin">
                {c.origins?.length ? (
                  <>
                    <p>Relevant Nigerian origin zones and producing areas include:</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.origins.map((o) => (
                        <span key={o} className="pill !normal-case !tracking-normal !text-xs">{o}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <p>Origin mapping for this category is part of the validation work for the corridor.</p>
                )}
              </SectionBlock>

              {detailed ? (
                <>
                  <SectionBlock icon="bank" title="Saudi demand">
                    <p>{full?.saudiDemand || c.saudiDemand || `Demand patterns for ${c.name.toLowerCase()} in the Saudi market are assessed through buyer intelligence and secondary sources as part of corridor validation.`}</p>
                    {full?.buyerProfiles ? (
                      <>
                        <p className="mt-3 font-semibold text-ink">Typical buyer profiles</p>
                        <ul className="mt-2 list-disc ps-5">
                          {full.buyerProfiles.map((b) => <li key={b}>{b}</li>)}
                        </ul>
                      </>
                    ) : null}
                  </SectionBlock>

                  <SectionBlock icon="checkCircle" title="Quality requirements">
                    <CheckList items={full?.qualityRequirements || GENERIC_QUALITY} icon="check" />
                  </SectionBlock>

                  <SectionBlock icon="docs" title="Typical documentation">
                    <CheckList items={full?.typicalDocumentation || GENERIC_DOCS} icon="fileCheck" />
                  </SectionBlock>

                  <SectionBlock icon="flask" title="Inspection considerations">
                    <CheckList items={full?.inspectionConsiderations || GENERIC_INSPECTION} icon="flask" />
                  </SectionBlock>

                  {c.seasonality ? (
                    <SectionBlock icon="clock" title="Seasonality">
                      <p>{c.seasonality}</p>
                    </SectionBlock>
                  ) : null}

                  {c.logistics ? (
                    <SectionBlock icon="ship" title="Logistics">
                      <p>{c.logistics}</p>
                    </SectionBlock>
                  ) : null}

                  {c.risks?.length ? (
                    <SectionBlock icon="shield" title="Risk considerations">
                      <ul className="space-y-2">
                        {c.risks.map((r) => (
                          <li key={r} className="flex items-start gap-2.5">
                            <Icon name="xCircle" size={16} className="mt-1 flex-none text-warning" /> {r}
                          </li>
                        ))}
                      </ul>
                    </SectionBlock>
                  ) : null}

                  <SectionBlock icon="route" title="MASAR opportunity">
                    <p>{full?.masarOpportunity || `MASAR is validating the end-to-end ${c.name.toLowerCase()} workflow: qualified Saudi demand, verified Nigerian supply, aligned specification and documentation, independent inspection evidence and controlled transaction stages.`}</p>
                  </SectionBlock>
                </>
              ) : (
                <Reveal>
                  <EmptyState
                    icon="search"
                    title={`Market intelligence for ${c.name.toLowerCase()} is currently under validation.`}
                  >
                    Origin and demand mapping, quality requirements and compliance pathways will be
                    published in the dossier as evidence is reviewed and approved.
                    <div className="mt-4">
                      <LinkButton href="/buyers/request" size="sm">Request this commodity</LinkButton>
                    </div>
                  </EmptyState>
                </Reveal>
              )}

              <SectionBlock icon="bank" title="Commercial pricing">
                <p>
                  <strong className="text-ink">Current commercial pricing: request market quotation.</strong>{" "}
                  MASAR does not publish unsupported prices; quotes are prepared against specific
                  grade, volume, Incoterms, destination and timing.
                </p>
                <LinkButton href="/buyers/request" variant="ghost" size="sm" className="mt-4">
                  Request market quotation
                </LinkButton>
              </SectionBlock>
            </div>

            <aside className="space-y-5">
              <Reveal>
                <GlassCard level={4}>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">Dossier status</p>
                  <div className="mt-3"><EvidenceTag status={detailed ? "SECONDARY" : c.status === "FUTURE" ? "TARGET" : "UNKNOWN"} /></div>
                  <dl className="mt-5 space-y-3 text-sm">
                    {c.seasonality ? (
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-widest text-muted">Seasonality</dt>
                        <dd className="mt-1 text-ink/85">{c.seasonality}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-widest text-muted">Pricing</dt>
                      <dd className="mt-1 text-gold-500">By market quotation</dd>
                    </div>
                  </dl>
                </GlassCard>
              </Reveal>

              <Reveal delay={0.08}>
                <GlassCard>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">Evidence</p>
                  {full?.evidence ? (
                    <>
                      <ul className="mt-3 space-y-1.5 text-xs leading-5 text-muted">
                        {full.evidence.sources.map((s) => (
                          <li key={s} className="flex gap-2"><Icon name="fileCheck" size={13} className="mt-0.5 flex-none text-gold-500" />{s}</li>
                        ))}
                      </ul>
                      <p className="mt-4 text-xs text-muted">Last verified: {full.evidence.lastUpdated}</p>
                    </>
                  ) : (
                    <p className="mt-3 text-xs leading-5 text-muted">
                      Evidence is compiled through official and secondary sources during validation
                      and shown here once reviewed.
                    </p>
                  )}
                </GlassCard>
              </Reveal>

              <Reveal delay={0.14}>
                <Disclaim title="Trade disclaimer">
                  <p>
                    Requirements vary by commodity, destination, importer status and transaction
                    structure. This dossier is operational guidance, not legal advice or an offer;
                    specifications and obligations are fixed in the transaction documents.
                  </p>
                </Disclaim>
              </Reveal>

              <Reveal delay={0.2}>
                <GlassCard>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">Related commodities</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {commodities.filter((x) => x.slug !== c.slug && x.dossier).slice(0, 5).map((x) => (
                      <Link key={x.slug} href={`/commodities/${x.slug}`} className="pill hover:!border-gold-500/50 hover:!text-gold-500">
                        {x.name}
                      </Link>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>

      <CTASection primary="buyer" />
    </>
  );
}

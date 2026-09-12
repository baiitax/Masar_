import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  GlassCard,
  LinkButton,
  EmptyState,
  IconBadge,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import { commodities, COMMODITY_STATUS } from "@/content/commodities";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "Commodity intelligence directory",
  path: "/commodities",
  description:
    "Evidence-based commodity directory for the Saudi–Africa corridor: active coverage, commodities under validation, market intelligence and future opportunities, with grades, documentation, inspection and risk context.",
});

const ORDER = ["ACTIVE", "VALIDATION", "INTELLIGENCE", "FUTURE"];

export default function CommoditiesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Commodities" }]}
        eyebrow="Commodity intelligence"
        title="The corridor commodity directory."
        lead="Every commodity carries an evidence status. MASAR does not claim to trade every product listed — coverage is published only as validation and verified transactions progress."
      >
        <LinkButton href="/buyers/request">Request a commodity</LinkButton>
        <LinkButton href="/intelligence" variant="ghost">Intelligence center</LinkButton>
      </PageHero>

      <Section className="!pt-4">
        <Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ORDER.map((k) => (
              <GlassCard key={k} className="!p-5">
                <span className={`dot dot-${COMMODITY_STATUS[k].tone === "success" ? "success" : k === "FUTURE" ? "gold" : k === "VALIDATION" ? "warning" : "muted"} mb-3 inline-block`} />
                <p className="text-sm font-bold text-ink">{COMMODITY_STATUS[k].label}</p>
                <p className="mt-1.5 text-xs leading-5 text-muted">{COMMODITY_STATUS[k].description}</p>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </Section>

      {ORDER.map((status) => {
        const list = commodities.filter((c) => c.status === status);
        return (
          <Section key={status} className="!py-12">
            <Reveal>
              <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                <h2 className="h-display text-2xl font-bold text-ink">{COMMODITY_STATUS[status].label}</h2>
                <span className="pill">{list.length} {list.length === 1 ? "entry" : "entries"}</span>
              </div>
            </Reveal>
            {list.length === 0 ? (
              <Reveal>
                <EmptyState
                  icon="grain"
                  title="No active commodities yet"
                >
                  Active status is reserved for commodities with completed verified transaction
                  records on the corridor. It will appear here only when MASAR has actually executed.
                </EmptyState>
              </Reveal>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((c, i) => (
                  <Reveal key={c.slug} delay={(i % 3) * 0.04}>
                    <Link href={`/commodities/${c.slug}`} className="block h-full">
                      <GlassCard hover className="h-full">
                        <div className="flex items-start justify-between gap-3">
                          <IconBadge name={c.icon === "bean" ? "grain" : c.icon} />
                          <span className={`pill dot-${COMMODITY_STATUS[status].tone === "muted" ? "muted" : status === "FUTURE" ? "gold" : "warning"}`}>
                            <span className={`dot dot-${COMMODITY_STATUS[status].tone === "muted" ? "muted" : status === "FUTURE" ? "gold" : "warning"}`} />
                            {COMMODITY_STATUS[status].label}
                          </span>
                        </div>
                        <h3 className="mt-4 font-display text-lg font-bold text-ink">{c.name}</h3>
                        {c.scientific ? <p className="text-xs italic text-muted">{c.scientific}</p> : null}
                        <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-muted">{c.summary}</p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-500">
                          View dossier <Icon name="chevronRight" size={14} className="rtl:rotate-180" />
                        </span>
                      </GlassCard>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </Section>
        );
      })}

      <Section>
        <Reveal>
          <GlassCard>
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
              <Icon name="shield" size={19} className="text-gold-500" /> Pricing policy
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              MASAR does not publish unverified market prices, and the directory never presents an
              offer to sell. Commercial pricing depends on grade, volume, Incoterms, season and
              logistics, and is provided by market quotation against a specific, qualified
              requirement.
            </p>
            <LinkButton href="/buyers/request" variant="ghost" className="mt-5">Request market quotation</LinkButton>
          </GlassCard>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}

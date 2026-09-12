import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  SectionHeader,
  GlassCard,
  LinkButton,
  EvidenceTag,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import { articles } from "@/content/insights";
import { INSIGHT_CATEGORIES } from "@/content/insights";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "Trade intelligence center",
  path: "/intelligence",
  description:
    "Institutional intelligence for the Saudi–Africa corridor: Saudi buyers, African suppliers, commodities, regulations, logistics, compliance and transaction insights, every record carrying an evidence status.",
});

const CATEGORY_CARDS = [
  { icon: "bank", t: "Saudi buyer intelligence", d: "Who buys, how they buy and what evidence they require.", href: "/intelligence/saudi-buyers" },
  { icon: "users", t: "African supplier intelligence", d: "Verified exporter capability, origin, certification and history.", href: "/intelligence/african-suppliers" },
  { icon: "grain", t: "Commodity intelligence", d: "Dossiers covering grade, seasonality, documentation and risk.", href: "/commodities" },
  { icon: "scale", t: "Trade regulations", d: "Export and import requirements mapped from official sources.", href: "/compliance" },
  { icon: "ship", t: "Logistics", d: "Ports, inland movement, freight, cold chain and transit considerations.", href: "/corridors/nigeria-saudi" },
  { icon: "stamp", t: "Compliance", d: "Documentation workflows, checklists and Saudi food-import requirements.", href: "/compliance" },
  { icon: "grid", t: "Market reports", d: "Structured corridor research and analysis from the MASAR desk.", href: "/insights" },
  { icon: "database", t: "Transaction insights", d: "What completes transactions — and what breaks them.", href: "/how-it-works" },
];

export default function IntelligencePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Intelligence" }]}
        eyebrow="Trade intelligence"
        title="An institutional intelligence platform for the corridor."
        lead="Intelligence at MASAR is evidence-governed: each record carries a source, a last-verified date and an evidence status. Private commercial information is never publicly exposed."
      >
        <LinkButton href="/intelligence/saudi-buyers">Saudi buyer intelligence</LinkButton>
        <LinkButton href="/intelligence/african-suppliers" variant="ghost">African suppliers</LinkButton>
      </PageHero>

      <Section className="!pt-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_CARDS.map((c, i) => (
            <Reveal key={c.t} delay={(i % 4) * 0.04}>
              <Link href={c.href} className="block h-full">
                <GlassCard hover className="h-full !p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold-500/30 bg-gold-500/10 text-gold-500">
                    <Icon name={c.icon} size={19} />
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-ink">{c.t}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-muted">{c.d}</p>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Evidence governance"
            title="Every record knows what it is — and what it is not."
            lead="No buyer, supplier, claim or statistic enters the public platform without a source, a review and an evidence status."
          />
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["VERIFIED", "SECONDARY", "HISTORICAL", "ILLUSTRATIVE", "TARGET", "UNKNOWN"].map((s) => (
            <Reveal key={s}>
              <GlassCard className="h-full !p-5">
                <EvidenceTag status={s} />
                <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">{s}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Latest research"
            title="From the MASAR intelligence desk."
            lead="Author, sources and review date accompany every article."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <Reveal key={a.slug}>
              <Link href={`/insights/${a.slug}`} className="block h-full">
                <GlassCard hover className="flex h-full flex-col !p-5">
                  <span className="pill w-fit">{a.categoryLabel}</span>
                  <h3 className="mt-4 font-display text-base font-bold leading-6 text-ink">{a.title}</h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted">{a.excerpt}</p>
                  <span className="mt-4 text-xs text-gold-500">{a.readingTime} · {new Date(a.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <LinkButton href="/insights" variant="ghost">All insights</LinkButton>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}

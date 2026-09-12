import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  SectionHeader,
  GlassCard,
  LinkButton,
  CheckList,
  ImageFrame,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "For exporters — connect African supply to Saudi demand",
  path: "/exporters",
  description:
    "Qualified African exporters use MASAR for Saudi buyer intelligence, demand matching, specification clarity, compliance workflow, inspection coordination and managed transaction execution.",
});

const PROBLEMS = [
  "Qualified buyer access",
  "Specification and grade clarity",
  "Saudi market intelligence",
  "Compliance and food-import knowledge",
  "Reliable transaction coordination",
  "A documented trade history buyers can trust",
];

const PROVIDES = [
  { icon: "bank", t: "Buyer intelligence", d: "Access to qualified Saudi demand — importers, distributors and processors with real requirements." },
  { icon: "route", t: "Market access", d: "A structured route into the Gulf's largest consumption market through an inaugural Nigeria–Saudi corridor." },
  { icon: "shield", t: "Qualification", d: "A clear, evidence-based process that turns capability into a verifiable position in the supplier network." },
  { icon: "target", t: "Demand matching", d: "Requirements matched to commodity, grade, capacity and documentation readiness — not broadcast to strangers." },
  { icon: "docs", t: "Compliance workflow", d: "Document checklists and Saudi import requirements coordinated before cargo moves." },
  { icon: "flask", t: "Inspection coordination", d: "Independent sampling and testing through qualified partners, with evidence returned to the record." },
];

const STAGES = [
  { t: "Apply", d: "Company, capability, compliance and transaction information." },
  { t: "Assessment", d: "Document and capability review; additional evidence may be requested." },
  { t: "Verification", d: "Only completed checks are shown as verified — never before." },
  { t: "Matched demand", d: "Qualified requirements aligned to your actual capability." },
];

export default function ExportersPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "For Exporters" }]}
        eyebrow="For African exporters"
        title="Connect qualified African supply with real Saudi demand."
        lead="MASAR gives origin exporters buyer access, specification clarity, compliance discipline and coordinated execution — with a transaction record that supports repeat trade."
      >
        <LinkButton href="/exporters/apply" data-event='{"event":"exporter_hero_cta"}'>Apply as an exporter</LinkButton>
        <LinkButton href="/commodities" variant="ghost">Commodity directory</LinkButton>
      </PageHero>

      <Section className="!pt-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1" delay={0.1}>
            <SectionHeader eyebrow="The problem" title="Supply exists. Qualified access does not." />
            <CheckList items={PROBLEMS} icon="xCircle" tone="text-warning" className="mt-7" />
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <ImageFrame
              src="/images/origin-nigeria.jpg"
              alt="Stacked sacks of sesame and groundnuts in a Nigerian commodity aggregation warehouse."
              caption="Aggregation at origin — capability and quality must be evidenced before export."
            />
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="What MASAR provides"
            title="From origin capability to matched, documented demand."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROVIDES.map((p, i) => (
            <Reveal key={p.t} delay={(i % 3) * 0.05}>
              <GlassCard hover className="h-full">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-500">
                  <Icon name={p.icon} size={21} />
                </span>
                <h3 className="mt-4 font-bold text-ink">{p.t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{p.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader eyebrow="Onboarding" title="Four stages — and no status ahead of evidence." />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.05}>
              <GlassCard level={4} className="h-full">
                <span className="font-mono text-xs tracking-widest text-gold-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-bold text-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{s.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <GlassCard>
            <p className="flex items-start gap-3 text-sm leading-7 text-muted">
              <Icon name="shield" size={18} className="mt-1 flex-none text-gold-500" />
              Applying does not create verification, approval or guaranteed orders. A supplier is
              presented as verified only after MASAR completes the relevant checks — and private
              commercial information is never publicly exposed.
            </p>
          </GlassCard>
        </Reveal>
      </Section>

      <CTASection primary="exporter" />
    </>
  );
}

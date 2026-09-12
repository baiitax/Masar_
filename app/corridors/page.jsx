import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  SectionHeader,
  GlassCard,
  LinkButton,
  StatusPill,
  EvidenceTag,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import CorridorMap from "@/components/maps/CorridorMap";
import { FUTURE_CORRIDORS } from "@/content/corridors";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "Trade corridors",
  path: "/corridors",
  description:
    "MASAR's inaugural trade corridor connects Nigeria and Saudi Arabia, with a designed path to Africa → GCC. Origin markets, destination markets, commodity flows, infrastructure and regulatory considerations.",
});

const LAYERS = [
  { icon: "pin", t: "Origin markets", d: "Producing regions, aggregation hubs and processors across Nigeria." },
  { icon: "bank", t: "Destination markets", d: "Importers, distributors, processors and food-service demand across Saudi cities and ports." },
  { icon: "grain", t: "Commodity flows", d: "Evidence-supported agricultural categories validated per corridor, beginning with sesame, cashew, ginger, hibiscus, gum arabic, shea and groundnuts." },
  { icon: "ship", t: "Trade infrastructure", d: "Ports, inland movement, inspection partners, freight and clearance coordinated within the transaction." },
  { icon: "scale", t: "Regulatory considerations", d: "Origin export requirements and Saudi food-import, conformity, labeling and customs requirements mapped per product." },
];

export default function CorridorsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Trade Corridors" }]}
        eyebrow="Trade corridors"
        title="Trade routes becoming trusted infrastructure."
        lead="MASAR opens one corridor deeply before expanding. The inaugural corridor is Nigeria → Saudi Arabia; the same transaction rail extends, deliberately, toward Africa → GCC."
      >
        <LinkButton href="/corridors/nigeria-saudi">Nigeria → Saudi Arabia</LinkButton>
        <LinkButton href="/corridor" variant="ghost">About the corridor</LinkButton>
      </PageHero>

      <Section className="!pt-0">
        <Reveal>
          <GlassCard level={4} className="!p-3 sm:!p-5 geo-visual">
            <CorridorMap showFuture />
          </GlassCard>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <div className="glass-strong grid gap-8 rounded-[1.5rem] p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <StatusPill tone="warning">
                <span className="dot dot-warning" /> Inaugural corridor · under operational validation
              </StatusPill>
              <h2 className="h-display mt-5 text-3xl font-bold text-ink sm:text-4xl">
                Nigeria <Icon name="arrow" size={26} className="inline text-gold-500 rtl:rotate-180" /> Saudi Arabia
              </h2>
              <p className="lead mt-4">
                Nigerian agricultural supply connected with Saudi import demand through
                verification, compliance, independent inspection and controlled release — the
                template for every corridor that follows.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Sesame", "Cashew", "Ginger", "Hibiscus", "Gum Arabic", "Shea", "Groundnuts"].map((c) => (
                  <Link
                    key={c}
                    href={`/commodities/${c.toLowerCase().replace(/\s+/g, "-")}`}
                    className="pill hover:border-gold-500/50 hover:text-gold-500"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="glass rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">Origin hubs</p>
                <p className="mt-1 font-semibold text-ink">Lagos · Kano</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">Destination hubs</p>
                <p className="mt-1 font-semibold text-ink">Jeddah · Riyadh · Dammam</p>
              </div>
              <LinkButton href="/corridors/nigeria-saudi" className="w-full">
                Open the flagship corridor
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Corridor intelligence"
            title="What MASAR maps on every corridor."
            lead="Five layers of operational context determine whether a corridor can produce trustworthy transactions."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LAYERS.map((l, i) => (
            <Reveal key={l.t} delay={(i % 3) * 0.05}>
              <GlassCard hover className="h-full">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-500">
                  <Icon name={l.icon} size={21} />
                </span>
                <h3 className="mt-4 font-bold text-ink">{l.t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{l.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Expansion architecture"
            title="Future corridors — targets, not claims."
            lead="Candidate corridors are identified from demand, supply and infrastructure evidence. They are marked Target until operational validation begins."
          />
        </Reveal>
        <Reveal className="mt-10">
          <GlassCard>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Corridor</th>
                    <th>Initial focus</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-semibold text-ink">Nigeria → Saudi Arabia</td>
                    <td>Sesame, cashew, ginger, hibiscus, gum arabic, shea, groundnuts</td>
                    <td><EvidenceTag status="ILLUSTRATIVE" label="Inaugural · validation" /></td>
                  </tr>
                  {FUTURE_CORRIDORS.map((c) => (
                    <tr key={c.name}>
                      <td className="font-medium text-ink/90">{c.name}</td>
                      <td className="text-muted">{c.focus}</td>
                      <td><EvidenceTag status="TARGET" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}

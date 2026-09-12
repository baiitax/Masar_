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
  title: "For buyers — source African agricultural supply",
  path: "/buyers",
  description:
    "Saudi importers, distributors and processors use MASAR for supplier discovery and qualification, commodity matching, documentation coordination, independent inspection and end-to-end transaction visibility.",
});

const NEEDS = [
  "Reliable, verifiable suppliers",
  "Consistent grades and specifications",
  "Traceability back to origin",
  "Complete, timely documentation",
  "Independent quality evidence",
  "Transaction visibility, order to delivery",
];

const PROVIDES = [
  { icon: "search", t: "Supplier discovery", d: "Origin-mapped suppliers matched to the commodity, grade, volume and cadence you require." },
  { icon: "shield", t: "Supplier qualification", d: "Registration, capability, documentation and export-readiness checks before introduction." },
  { icon: "grain", t: "Commodity matching", d: "Grade, quality parameters, packaging and commercial terms aligned in writing." },
  { icon: "docs", t: "Documentation coordination", d: "Origin and destination documents assembled before cargo moves." },
  { icon: "flask", t: "Inspection coordination", d: "Independent sampling, testing and loading evidence through qualified partners." },
  { icon: "route", t: "Transaction management", d: "Milestones, responsibilities and evidence tracked through to delivery and record." },
];

const STEPS = [
  { t: "Submit your requirement", d: "Commodity, specification, volume, frequency, destination and timeline." },
  { t: "Verification", d: "MASAR verifies your business and requirement before sourcing begins." },
  { t: "Qualified supply", d: "Receive qualified options with capability and documentation state." },
  { t: "Evidence-led execution", d: "Specification, compliance, inspection and controlled release through delivery." },
];

export default function BuyersPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "For Buyers" }]}
        eyebrow="For buyers"
        title="Source African agricultural supply with greater confidence."
        lead="Qualified suppliers, aligned specifications, independent inspection and coordinated documentation for Saudi importers, distributors and processors — built around the transaction, not a listing feed."
      >
        <LinkButton href="/buyers/request" data-event='{"event":"buyer_hero_cta"}'>Submit buyer requirement</LinkButton>
        <LinkButton href="/corridors/nigeria-saudi" variant="ghost">Explore the corridor</LinkButton>
      </PageHero>

      <Section className="!pt-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <ImageFrame
              src="/images/cold-chain-jeddah.jpg"
              alt="Inspectors checking sealed agricultural cargo at a refrigerated import warehouse at a Red Sea port."
              caption="Import and cold-chain environments — evidence and documentation travel with the cargo."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeader
              eyebrow="What buyers need"
              title="The confidence to commit across a border."
            />
            <CheckList items={NEEDS} className="mt-7" icon="checkCircle" />
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="What MASAR provides"
            title="Six coordinated capabilities around your requirement."
            lead="Not a directory. A managed path from requirement to a documented transaction."
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
          <SectionHeader eyebrow="The buyer journey" title="Four steps from requirement to completion." />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
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
              MASAR does not guarantee supply, price or quality and is not the contracting seller.
              Obligations remain with the contractual parties; MASAR engineers the verification,
              evidence and coordination that let the transaction complete.
            </p>
          </GlassCard>
        </Reveal>
      </Section>

      <CTASection primary="buyer" />
    </>
  );
}

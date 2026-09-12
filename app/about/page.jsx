import { pageMeta } from "@/lib/seo";
import {
  Container,
  PageHero,
  Section,
  SectionHeader,
  GlassCard,
  Eyebrow,
  IconBadge,
  LinkButton,
  StatusPill,
  ImageFrame,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import CTASection from "@/components/CTASection";
import CorridorMap from "@/components/maps/CorridorMap";

export const metadata = pageMeta({
  title: "About MASAR",
  path: "/about",
  description:
    "MASAR exists to make cross-border agricultural trade more reliable by building the transaction infrastructure — verification, compliance, independent evidence and controlled release — between real demand and verified supply.",
});

const PROBLEMS = [
  "Buyers cannot easily verify suppliers",
  "Exporters struggle to access qualified buyers",
  "Specifications are unclear",
  "Documentation is fragmented",
  "Quality evidence arrives too late",
  "Compliance is treated as an afterthought",
  "Payment and trust are disconnected",
  "Parties lack reliable transaction history",
];

const VALUES = [
  { icon: "shield", t: "Trust by Design", d: "Trust is structured into workflow and evidence rather than promised through branding." },
  { icon: "target", t: "Precision", d: "Specific grades, specific counterparties, specific evidence — generalized claims do not move cargo." },
  { icon: "stamp", t: "Compliance Before Cargo", d: "Regulatory and documentary work happens before movement, not after problems appear." },
  { icon: "flask", t: "Independent Evidence", d: "Inspection and testing sit outside the commercial relationship and speak for themselves." },
  { icon: "route", t: "Corridor Focus", d: "Depth on Nigeria → Saudi Arabia first; disciplined expansion to Africa → GCC." },
  { icon: "lock", t: "Operational Discipline", d: "Controlled release, attributable decisions and a complete record on every transaction." },
];

const PRESENCE = [
  { city: "Riyadh", role: "Buyer network & compliance", state: "Developing" },
  { city: "Lagos", role: "Origin operations", state: "Developing" },
  { city: "Kano", role: "Exporter network", state: "Developing" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About MASAR" }]}
        eyebrow="About MASAR"
        title="The transaction layer between real demand and verified supply."
        lead="MASAR exists to make cross-border trade more reliable by creating the transaction infrastructure between genuine Saudi demand and verified African agricultural supply."
      >
        <LinkButton href="/contact">Talk to MASAR</LinkButton>
        <LinkButton href="/how-it-works" variant="ghost">How MASAR works</LinkButton>
      </PageHero>

      <Section className="!pt-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="h-display text-3xl font-bold text-ink">An infrastructure business, not a marketplace.</h2>
            <div className="lead mt-5 space-y-4">
              <p>
                Cross-border agricultural trade between Africa and the Gulf holds substantial, real
                commercial potential. It also fails repeatedly — at verification, at documentation,
                at quality evidence and at the basic question of whether a stranger on the other
                side of the transaction will perform.
              </p>
              <p>
                MASAR was designed around those failures. We connect genuine African agricultural
                supply with genuine Saudi demand and coordinate the workflow required to complete
                trustworthy transactions: buyer and supplier intelligence, counterparty
                verification, matching, compliance, inspection coordination, transaction management,
                controlled release and evidence collection.
              </p>
              <p>
                We are deliberately asset-light. We do not buy or sell the cargo, own warehouses,
                operate ships, lend or process payments. Qualified partners perform those functions
                within a transaction structure MASAR controls and records.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ImageFrame
              src="/images/digital-evidence.jpg"
              ratio="4/3"
              alt="Abstract visualization of verification nodes and trade routes between Africa and the Arabian peninsula."
              evidence="ILLUSTRATIVE"
            />
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="The problem"
            title="Trade rarely fails on demand. It fails on trust."
            lead="Eight recurring failures fragment cross-border agricultural transactions — each predictable, and each addressable through structured workflow."
          />
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((p, i) => (
            <Reveal key={i} delay={(i % 4) * 0.04}>
              <GlassCard hover className="h-full !p-5">
                <Icon name="xCircle" size={20} className="text-warning" />
                <p className="mt-3 text-sm font-semibold leading-6 text-ink">{p}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <div className="glass-strong flex flex-col items-start gap-5 rounded-2xl p-8 sm:flex-row sm:items-center">
            <IconBadge name="route" />
            <div>
              <p className="eyebrow">MASAR's answer</p>
              <p className="mt-1 text-lg font-semibold text-ink">Build the transaction layer — and let partners move the physical world.</p>
            </div>
            <LinkButton href="/platform" variant="ghost" className="sm:ms-auto flex-none">Explore the platform</LinkButton>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>

          <div className="glass-strong rounded-[1.5rem] p-10 text-center sm:p-16">
            <p className="eyebrow justify-center" style={{ display: "flex" }}>Philosophy</p>
            <p className="h-display mx-auto mt-4 max-w-3xl text-3xl font-bold text-ink sm:text-5xl">
              Prove first. <span className="text-gradient-gold">Automate second.</span>
            </p>
            <p className="lead mx-auto mt-6 max-w-2xl">
              Automation without evidence simply scales error faster. MASAR begins with verification,
              documentation and independent evidence — then automates what has been proven to work.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader eyebrow="Values" title="The operating principles behind the rail." />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={(i % 3) * 0.05}>
              <GlassCard hover className="h-full">
                <IconBadge name={v.icon} />
                <h3 className="mt-4 font-bold text-ink">{v.t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{v.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Geographic presence"
            title="One inaugural corridor, three operating nodes."
            lead="MASAR's corridor presence is being established around the commercial points that matter for Nigeria → Saudi Arabia trade."
          />
        </Reveal>
        <Reveal delay={0.08} className="geo-visual mt-10">
          <GlassCard level={4} className="!p-3">
            <CorridorMap />
          </GlassCard>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {PRESENCE.map((p) => (
            <Reveal key={p.city}>
              <GlassCard hover>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-ink">{p.city}</h3>
                  <StatusPill tone="warning">{p.state}</StatusPill>
                </div>
                <p className="mt-2 text-sm text-muted">{p.role}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-5 flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/10 p-4 text-xs leading-6 text-muted">
            <Icon name="shield" size={15} className="mt-0.5 flex-none text-warning" />
            Corridor presence is being established. These nodes describe intended operating coverage
            and are not yet a representation of verified operating offices or legal entities.
          </p>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}

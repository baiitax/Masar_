import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  GlassCard,
  LinkButton,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import CorridorMap from "@/components/maps/CorridorMap";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "About the corridor — Africa, Saudi Arabia, MASAR",
  path: "/corridor",
  description:
    "Africa supplies. Saudi Arabia demands. MASAR is the transaction layer between them — verification, compliance, evidence and controlled execution, beginning with Nigeria to Saudi Arabia.",
});

const PILLARS = [
  {
    icon: "leaf",
    tag: "Africa",
    title: "Supply.",
    body: "Agricultural production, aggregation, processing and export capacity across origin economies — starting with Nigeria's sesame, cashew, ginger, hibiscus, gum arabic, shea and groundnut ecosystems.",
    points: ["Origin production and aggregation", "Exporters and processors", "Ports and origin documentation"],
    href: "/exporters",
    cta: "For exporters",
  },
  {
    icon: "route",
    tag: "MASAR",
    title: "Transaction layer.",
    body: "Verification, commodity matching, documentation and compliance workflow, independent inspection coordination, managed execution, controlled release and the evidence record that ties both sides together.",
    points: ["Counterparty verification", "Compliance and evidence", "Controlled release and record"],
    href: "/platform",
    cta: "Explore the platform",
    featured: true,
  },
  {
    icon: "bank",
    tag: "Saudi Arabia",
    title: "Demand.",
    body: "A large, import-dependent food market served by importers, distributors, processors and food-service buyers — quality-led, compliance-conscious and concentrated around Jeddah, Riyadh and Dammam.",
    points: ["Importers and distributors", "Processors and food service", "Regulated import requirements"],
    href: "/buyers",
    cta: "For buyers",
  },
];

export default function CorridorAbout() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Trade Corridors", href: "/corridors" },
          { label: "About the corridor" },
        ]}
        eyebrow="About the corridor"
        title={<>Africa supplies. Saudi Arabia demands. <span className="text-gradient-gold">MASAR is the layer in between.</span></>}
        lead="The corridor is not a shipping route alone. It is a controlled transaction environment connecting verified supply to qualified demand with independent evidence at every release point."
      >
        <LinkButton href="/corridors/nigeria-saudi">Nigeria → Saudi Arabia</LinkButton>
        <LinkButton href="/how-it-works" variant="ghost">How it works</LinkButton>
      </PageHero>

      <Section className="!pt-0">
        <Reveal>
          <GlassCard level={4} className="!p-3 sm:!p-5 geo-visual">
            <CorridorMap showFuture />
          </GlassCard>
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.tag} delay={i * 0.08}>
              <GlassCard level={p.featured ? 4 : 3} hover className="flex h-full flex-col">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-500">
                  <Icon name={p.icon} size={24} />
                </span>
                <p className="eyebrow mt-5">{p.tag}</p>
                <h2 className="h-display text-2xl font-bold text-ink">{p.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{p.body}</p>
                <ul className="mt-5 space-y-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-sm text-ink/85">
                      <Icon name="check" size={15} strokeWidth={2.2} className="text-success" /> {pt}
                    </li>
                  ))}
                </ul>
                <LinkButton href={p.href} variant="ghost" size="sm" className="mt-7 self-start">
                  {p.cta}
                </LinkButton>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-[1.5rem] p-10 text-center sm:p-16">
            <p className="eyebrow justify-center" style={{ display: "flex" }}>The expansion thesis</p>
            <h2 className="h-display mx-auto mt-4 max-w-3xl text-3xl font-bold text-ink sm:text-4xl">
              From one corridor to the infrastructure layer for <span className="text-gradient-gold">Africa → GCC trade.</span>
            </h2>
            <p className="lead mx-auto mt-5 max-w-2xl">
              Prove the rail on Nigeria → Saudi Arabia. Deepen it across verified commodities and
              repeat transactions. Extend it — unchanged in its logic — to additional African
              origins, then to the wider Gulf.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-2">
              {["Nigeria → Saudi Arabia", "West Africa → Saudi Arabia", "East Africa → GCC", "Africa → GCC"].map((s, i) => (
                <span key={s} className="pill">
                  <span className={`dot ${i === 0 ? "dot-gold" : "dot-muted"}`} />
                  {s}
                  {i > 0 ? <span className="text-[0.65rem] opacity-70">· target</span> : null}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}

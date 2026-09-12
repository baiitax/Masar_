import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  SectionHeader,
  GlassCard,
  Container,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import LeadForm from "@/components/forms/LeadForm";
import { STRATEGIC_AUDIENCES } from "@/content/partners";

export const metadata = pageMeta({
  title: "For strategic partners",
  path: "/strategic-partners",
  description:
    "Partner with MASAR across inspection, logistics, trade finance, insurance, distribution and technology — the partner ecosystem that executes inside the controlled Saudi–Africa transaction rail.",
});

const STEPS = [
  { t: "Inquiry", d: "Tell us about your capability, geography and the role you can perform on the corridor." },
  { t: "Assessment", d: "Capability, standing and documentation review against the category requirements." },
  { t: "Pilot", d: "Where aligned, a defined first engagement inside a managed transaction." },
  { t: "Verified partnership", d: "A formal, signed relationship — only then published as part of the network." },
];

export default function StrategicPartnersPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Partner network", href: "/partners" },
          { label: "Strategic partners" },
        ]}
        eyebrow="For strategic partners"
        title="Become part of the infrastructure."
        lead="Banks, trade-finance providers, logistics and inspection companies, insurers, distributors and technology partners extend what a verified transaction can accomplish — without MASAR becoming them."
      />

      <Section className="!pt-4">
        <Reveal>
          <SectionHeader eyebrow="Who we engage" title="Organizations with a role in the completed transaction." />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STRATEGIC_AUDIENCES.map((a, i) => (
            <Reveal key={a.title} delay={(i % 4) * 0.05}>
              <GlassCard hover className="h-full !p-5">
                <Icon name={a.icon} size={22} className="text-gold-500" />
                <h3 className="mt-4 text-sm font-bold text-ink">{a.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-muted">{a.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader eyebrow="Engagement path" title="From inquiry to verified partner." />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.06}>
              <GlassCard level={4} className="h-full">
                <span className="font-mono text-xs tracking-widest text-gold-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-bold text-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{s.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Container size="md">
          <Reveal>
            <div className="glass-strong rounded-2xl p-6 sm:p-9">
              <h2 className="h-display text-2xl font-bold text-ink">Become a strategic partner</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Submissions route to the partnerships team. Attach enough capability detail to
                support an informed first assessment.
              </p>
              <div className="mt-7">
                <LeadForm type="partner" source="strategic-partners-page" />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

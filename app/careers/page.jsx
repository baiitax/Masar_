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

export const metadata = pageMeta({
  title: "Careers — building the Africa–GCC trade rail",
  path: "/careers",
  description:
    "Build the infrastructure layer for Africa–GCC trade: roles across trade operations, Saudi buyer development, export operations, compliance, commodity intelligence, technology, risk and partnerships.",
});

const TEAMS = [
  { icon: "route", t: "Trade Operations", d: "Coordinate the end-to-end transaction workflow, milestones and evidence across parties." },
  { icon: "bank", t: "Saudi Buyer Development", d: "Identify, verify and build relationships with importers, distributors and processors." },
  { icon: "factory", t: "Export Operations", d: "Origin-side supplier qualification, inspection coordination and readiness." },
  { icon: "stamp", t: "Compliance", d: "Document regimes, Saudi and origin requirements and controlled-release gates." },
  { icon: "grain", t: "Commodity Intelligence", d: "Dossiers, seasonality, grades, origin mapping and evidence-based market research." },
  { icon: "layers", t: "Technology", d: "The transaction platform, verification systems, evidence layer and partner integrations." },
  { icon: "shield", t: "Risk", d: "Counterparty risk, fraud controls, documentation review and transaction governance." },
  { icon: "network", t: "Partnerships", d: "Inspection, logistics, financial, insurance and institutional relationships." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        eyebrow="Careers"
        title={<>Building the infrastructure layer for <span className="text-gradient-gold">Africa–GCC trade.</span></>}
        lead="MASAR hires for the corridor first — operators and analysts who can make a specific transaction trustworthy in Riyadh, Lagos and Kano, and engineers and intelligence specialists who turn that discipline into repeatable infrastructure."
      />

      <Section className="!pt-4">
        <Reveal>
          <SectionHeader eyebrow="Teams" title="Where people join the rail." />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAMS.map((t, i) => (
            <Reveal key={t.t} delay={(i % 4) * 0.05}>
              <GlassCard hover className="h-full !p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold-500/30 bg-gold-500/10 text-gold-500">
                  <Icon name={t.icon} size={19} />
                </span>
                <h3 className="mt-4 text-sm font-bold text-ink">{t.t}</h3>
                <p className="mt-1.5 text-xs leading-5 text-muted">{t.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Container size="md">
          <Reveal>
            <div className="glass-strong rounded-2xl p-6 sm:p-9">
              <h2 className="h-display text-2xl font-bold text-ink">Express interest</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                MASAR opens roles as corridor operations scale. Tell us where you fit and attach a
                CV; submissions route to the operations team and are treated confidentially.
              </p>
              <div className="mt-7">
                <LeadForm type="careers" source="careers-page" />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

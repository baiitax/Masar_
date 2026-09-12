import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  SectionHeader,
  GlassCard,
  LinkButton,
  CheckList,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import VerificationExplorer from "@/components/pages/VerificationExplorer";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "Verification — trust is engineered",
  path: "/verification",
  description:
    "MASAR's verification stack: company, identity, registration, commercial and supplier capability, buyer requirement validation, documents, inspection and transaction history — with explicit verified, pending, review and not-verified states.",
});

const PRINCIPLES = [
  "No record is marked verified without completed checks and evidence on file.",
  "Verification attaches to specific checks — not to blanket claims about a company.",
  "Pending and not-verified states are shown honestly, never papered over.",
  "Verification is re-checked per transaction where evidence can change.",
  "Results support counterparties; they are not warranties against every risk.",
];

export default function VerificationPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Verification" }]}
        eyebrow="Verification"
        title={<>Trust is <span className="text-gradient-gold">engineered.</span></>}
        lead="Verification at MASAR is a structured stack of checks with explicit states and evidence — identity, registration, capability, requirements, documents, inspection and transaction history. Nothing inherits trust from a logo or a relationship claim."
      >
        <LinkButton href="/how-it-works">See where verification fits</LinkButton>
        <LinkButton href="/exporters/apply" variant="ghost">Begin verification as an exporter</LinkButton>
      </PageHero>

      <Section className="!pt-4">
        <Reveal>
          <VerificationExplorer />
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeader
              eyebrow="Principles"
              title="What verification does — and does not — mean."
            />
            <CheckList items={PRINCIPLES} icon="shield" className="mt-7" />
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard level={4}>
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                <Icon name="database" size={19} className="text-gold-500" /> Evidence held on record
              </h2>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                {[
                  ["Registry and identity documents", "doc"],
                  ["Commercial capability references", "bank"],
                  ["Capability, capacity and site evidence", "factory"],
                  ["Validated buyer requirement", "target"],
                  ["Document consistency checks", "docs"],
                  ["Independent inspection outputs", "flask"],
                  ["Completed transaction dossiers", "fileCheck"],
                ].map(([label, icon]) => (
                  <li key={label} className="flex items-center gap-3 rounded-lg border border-line/12 bg-line/[0.03] px-4 py-3">
                    <Icon name={icon} size={16} className="text-gold-500" />
                    <span className="text-ink/85">{label}</span>
                    <span className="pill ms-auto"><span className="dot dot-muted" />Access controlled</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <CTASection />
    </>
  );
}

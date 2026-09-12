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
import ModulesExplorer from "@/components/pages/ModulesExplorer";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "Platform — the transaction layer",
  path: "/platform",
  description:
    "Nine coordinated modules — buyer and supplier intelligence, verification, commodity intelligence, compliance, inspection, transaction management, the evidence layer and controlled release — form MASAR's transaction infrastructure.",
});

const GOVERNANCE = [
  { k: "VERIFIED", t: "Verified", d: "Confirmed against primary or corroborating evidence with a recorded source." },
  { k: "SECONDARY", t: "Secondary source", d: "Supported by credible published sources pending primary confirmation." },
  { k: "HISTORICAL", t: "Historical", d: "Accurate for a prior period; not a claim about the present." },
  { k: "ILLUSTRATIVE", t: "Illustrative", d: "A model or visualization — never presented as live data." },
  { k: "TARGET", t: "Target", d: "A planned state, such as future corridors or developing presence." },
  { k: "UNKNOWN", t: "Under validation", d: "Not yet established; no claim is made." },
];

const FUTURE_PORTALS = [
  { icon: "bank", title: "Buyer portal", d: "Requirements, RFQs, supplier proposals, documents, inspections and transaction status." },
  { icon: "factory", title: "Exporter portal", d: "Matched opportunities, quotations, documentation, inspection and shipment coordination." },
  { icon: "network", title: "Partner portal", d: "Inspection, logistics and financial partners operating within controlled workflows." },
  { icon: "lock", title: "MASAR operations", d: "Intelligence, verification, transactions, compliance, disputes and analytics — internal only." },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Platform" }]}
        eyebrow="Platform"
        title="The transaction layer between supply and demand."
        lead="Nine coordinated modules turn a trade opportunity into a controlled, evidence-backed transaction. The platform manages workflow and records — partners perform laboratory, logistics, insurance and financial services."
      >
        <LinkButton href="/how-it-works">See the workflow</LinkButton>
        <LinkButton href="/transactions" variant="ghost">Transaction infrastructure</LinkButton>
      </PageHero>

      <Section className="!pt-4">
        <Reveal>
          <SectionHeader
            eyebrow="Modules"
            title="One infrastructure, nine working parts."
            lead="Each module exists to remove a specific failure point in cross-border trade — and each is governed by evidence status rather than assertion."
          />
        </Reveal>
        <div className="mt-12">
          <Reveal>
            <ModulesExplorer />
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Content governance"
            title="Every claim carries an evidence status."
            lead="Records and commercial statements pass through source → review → approval → publication, with last-verified dates and references. This is what keeps the platform defensible."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GOVERNANCE.map((g) => (
            <Reveal key={g.k}>
              <GlassCard hover className="h-full">
                <EvidenceTag status={g.k} label={g.t} />
                <p className="mt-3 text-sm leading-6 text-muted">{g.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Future portal architecture"
            title="Designed for private counterpart portals."
            lead="The public site is architected so authenticated portals can be added without re-engineering. These are not functional public pages and are opened only as verified workflows come online."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FUTURE_PORTALS.map((p) => (
            <Reveal key={p.title}>
              <GlassCard hover className="h-full !p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line/20 text-muted">
                  <Icon name={p.icon} size={20} />
                </span>
                <h3 className="mt-4 text-sm font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-xs leading-5 text-muted">{p.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}

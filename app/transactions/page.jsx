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
import TransactionTimeline from "@/components/pages/TransactionTimeline";
import { RELEASE_GATES } from "@/content/workflow";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "Transaction infrastructure — controlled trade execution",
  path: "/transactions",
  description:
    "How MASAR converts a trade opportunity into a controlled transaction: qualification, match, agreement, compliance, inspection, shipment, delivery, settlement and record, with gated release at each stage.",
});

const BOUNDARIES = [
  { icon: "bank", t: "Not a bank or escrow", d: "Payments, letters of credit and any escrow arrangements run through counterparties and regulated financial institutions." },
  { icon: "ship", t: "Not the carrier", d: "Freight, handling and warehousing are performed by qualified logistics partners, coordinated within the transaction." },
  { icon: "flask", t: "Not the laboratory", d: "Inspection and testing are independently performed; MASAR coordinates scope and evidence." },
  { icon: "grain", t: "Not the trader", d: "MASAR does not own commodities or take positions. Buyer and supplier contract as independent principals." },
];

export default function TransactionsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Transaction infrastructure" }]}
        eyebrow="Transaction infrastructure"
        title="From opportunity to completed transaction."
        lead="An interactive ten-stage timeline. Each stage has entry and exit conditions and produces evidence; a stage only closes when its requirements are satisfied and recorded."
      >
        <LinkButton href="/how-it-works">The eight-stage workflow</LinkButton>
        <LinkButton href="/platform" variant="ghost">Platform modules</LinkButton>
      </PageHero>

      <Section className="!pt-0">
        <Reveal>
          <TransactionTimeline />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Controlled release"
            title="The gates within the timeline."
            lead="Release logic converts good intentions into an auditable sequence: movement happens only after evidence."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {RELEASE_GATES.map((g, i) => (
            <Reveal key={g.t} delay={(i % 3) * 0.05}>
              <GlassCard hover className="h-full">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold-500/40 bg-gold-500/10 font-mono text-xs font-bold text-gold-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon name="lock" size={15} className="text-muted" />
                </div>
                <h3 className="mt-4 text-sm font-bold text-ink">{g.t}</h3>
                <p className="mt-2 text-xs leading-5 text-muted">{g.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Deliberate boundaries"
            title="The rail coordinates — partners perform."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BOUNDARIES.map((b, i) => (
            <Reveal key={b.t} delay={i * 0.05}>
              <GlassCard className="h-full !p-5">
                <Icon name={b.icon} size={22} className="text-gold-500" />
                <h3 className="mt-4 text-sm font-bold text-ink">{b.t}</h3>
                <p className="mt-2 text-xs leading-5 text-muted">{b.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <GlassCard>
            <CheckList
              icon="database"
              items={[
                "Every completed transaction becomes a structured record: parties, specifications, documents, inspection outputs and milestones.",
                "Records belong to the verified parties and make repeat trade faster and, over time, financeable.",
                "No transaction data, volumes or counts are published on the website until verified and approved.",
              ]}
            />
          </GlassCard>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}

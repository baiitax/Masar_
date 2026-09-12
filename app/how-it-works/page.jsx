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
import CinematicStages from "@/components/pages/CinematicStages";
import { StageRail } from "@/components/interactive";
import { WORKFLOW_STAGES, RELEASE_GATES } from "@/content/workflow";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "How MASAR works",
  path: "/how-it-works",
  description:
    "An eight-stage workflow — demand, verification, supply, qualification, specification, evidence, execution and completion — converts Saudi–Africa trade opportunities into controlled, documented transactions.",
});

export default function HowItWorks() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "How It Works" }]}
        eyebrow="How MASAR works"
        title="From genuine demand to a completed, documented transaction."
        lead="A disciplined eight-stage workflow with defined outputs and release points. Nothing advances on assumption; every stage produces evidence."
      >
        <LinkButton href="/buyers/request">Submit a buyer requirement</LinkButton>
        <LinkButton href="/exporters/apply" variant="ghost">Apply as an exporter</LinkButton>
      </PageHero>

      <Section className="!pt-0">
        <Reveal>
          <CinematicStages stages={WORKFLOW_STAGES} />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Controlled release"
            title="Evidence before release."
            lead="Key steps are gated on satisfied, recorded conditions. The release decision — and who authorized it — becomes part of the transaction record."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {RELEASE_GATES.map((g, i) => (
            <Reveal key={g.t} delay={(i % 3) * 0.05}>
              <GlassCard hover className="h-full">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold-500/40 bg-gold-500/10 font-mono text-xs font-bold text-gold-500">
                    G{i + 1}
                  </span>
                  <Icon name="lock" size={15} className="ms-auto text-muted" />
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
            eyebrow="Transaction view"
            title="The same eight stages, as ten operational milestones."
            lead="Inside a managed transaction the workflow maps to qualification, match, agreement, compliance, inspection, shipment, delivery, settlement and record."
          />
        </Reveal>
        <Reveal className="mt-10">
          <StageRail
            stages={[
              "Demand", "Qualification", "Match", "Commercial agreement", "Compliance",
              "Inspection", "Shipment", "Delivery", "Settlement", "Record",
            ]}
            note="Illustrative workflow — every transaction is sequenced around its documented conditions."
          />
        </Reveal>
        <Reveal className="mt-8">
          <GlassCard>
            <CheckList
              icon="shield"
              items={[
                "Payments and escrow, where used, run through counterparties and regulated financial institutions — MASAR is not a bank or payment processor.",
                "Inspection is performed by independent qualified third parties; MASAR coordinates scope and evidence.",
                "Logistics are executed by qualified partners; MASAR does not own ships, containers or warehouses.",
              ]}
            />
          </GlassCard>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}

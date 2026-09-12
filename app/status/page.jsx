import { pageMeta } from "@/lib/seo";
import { PageHero, Section, GlassCard, StatusPill, LinkButton } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "System status",
  path: "/status",
  description:
    "MASAR public system status. A public uptime and incident program begins when corridor transaction systems go live; no percentages or historical uptime are manufactured in the meantime.",
});

const SYSTEMS = [
  { name: "Marketing website", detail: "This public information site", state: "operational" },
  { name: "Lead & intake API", detail: "Buyer, exporter and partner submissions", state: "operational" },
  { name: "Transaction workspace", detail: "Stage-coordination system for managed transactions", state: "pre" },
  { name: "Verification service", detail: "Counterparty and document verification workflows", state: "pre" },
  { name: "Document service", detail: "Private evidence and document storage", state: "pre" },
  { name: "Partner API", detail: "Inspection, logistics and financial integrations", state: "pre" },
  { name: "Notifications", detail: "Milestone and transaction notifications", state: "pre" },
];

export default function StatusPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "System status" }]}
        eyebrow="System status"
        title="Status, without invented numbers."
        lead="MASAR publishes only what can be supported. The public website and intake services are operational; the transaction workspace and integrations are under development and are not reported with fabricated uptime percentages."
      />

      <Section className="!pt-4">
        <Reveal>
          <GlassCard level={4}>
            <div className="divide-y divide-line/10">
              {SYSTEMS.map((s) => (
                <div key={s.name} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="text-sm font-bold text-ink">{s.name}</p>
                    <p className="text-xs text-muted">{s.detail}</p>
                  </div>
                  {s.state === "operational" ? (
                    <StatusPill tone="success">
                      <Icon name="checkCircle" size={13} /> Operational
                    </StatusPill>
                  ) : (
                    <StatusPill tone="warning">
                      <Icon name="clock" size={13} /> Pre-operational
                    </StatusPill>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal className="mt-8">
          <GlassCard>
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
              <Icon name="shield" size={18} className="text-gold-500" /> Uptime & incidents
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              A public uptime history and incident communication program begins when the
              transaction workspace and partner integrations go live. Until verified measurement
              exists, no percentage, SLA or incident history is displayed.
            </p>
            <LinkButton href="/contact" variant="ghost" size="sm" className="mt-4">
              Report a problem
            </LinkButton>
          </GlassCard>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}

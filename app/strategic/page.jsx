import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  SectionHeader,
  GlassCard,
  Container,
  EvidenceTag,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import LeadForm from "@/components/forms/LeadForm";
import { ROADMAP } from "@/content/partners";

export const metadata = pageMeta({
  title: "Strategic information",
  path: "/strategic",
  description:
    "The MASAR strategic thesis: the problem in Saudi–Africa agricultural trade, an asset-light transaction-infrastructure business model, corridor strategy, expansion roadmap and request process for strategic information.",
});

const MODEL = [
  { icon: "target", t: "What MASAR builds", d: "The transaction rail: intelligence, verification, compliance workflow, inspection coordination, managed execution and the evidence record." },
  { icon: "factory", t: "What partners provide", d: "Physical and regulated functions — laboratories, logistics, insurance and banking — within the controlled workflow." },
  { icon: "database", t: "Where value compounds", d: "Verified counterparties, documented transactions and repeat-trade intelligence deepen with every completed corridor transaction." },
  { icon: "route", t: "How it scales", d: "One proven corridor template extends to additional African origins and Gulf destinations without rebuilding the infrastructure." },
];

export default function StrategicPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Strategic information" }]}
        eyebrow="Investor & strategic"
        title="An infrastructure thesis, not a pitch."
        lead="The opportunity MASAR is built around, stated plainly: a fragmented Saudi–Africa agricultural trade corridor that lacks the transaction layer needed to make trade verifiable, compliant and repeatable. No confidential financial data is published here."
      />

      <Section className="!pt-4">
        <Reveal>
          <SectionHeader
            eyebrow="The problem"
            title="Trade volume exists. Trust infrastructure does not."
            lead="African agricultural supply and Saudi import demand are both real and structural. What is missing between them is the operational layer that verifies counterparties, fixes specifications, produces independent evidence and coordinates compliance — the rails that mature corridors take for granted."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Unverified counterparties", "Buyers and suppliers cannot reliably establish each other.", "xCircle"],
            ["Late or missing evidence", "Quality and documents arrive after they can still matter.", "clock"],
            ["Compliance as afterthought", "Import requirements surface at the port, not the planning stage.", "stamp"],
            ["No transaction history", "Without records, repeat trade and trade finance never develop.", "database"],
          ].map(([t, d, icon], i) => (
            <Reveal key={t} delay={i * 0.05}>
              <GlassCard hover className="h-full !p-5">
                <Icon name={icon} size={20} className="text-warning" />
                <h3 className="mt-3 text-sm font-bold text-ink">{t}</h3>
                <p className="mt-1.5 text-xs leading-5 text-muted">{d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader eyebrow="Business model" title="Asset-light transaction infrastructure." />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {MODEL.map((m, i) => (
            <Reveal key={m.t} delay={(i % 2) * 0.06}>
              <GlassCard className="h-full">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-500">
                  <Icon name={m.icon} size={21} />
                </span>
                <h3 className="mt-4 font-bold text-ink">{m.t}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{m.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Corridor strategy & roadmap"
            title="Nigeria → Saudi Arabia, then Africa → GCC."
            lead="Phases are targets and planning states — they are presented honestly rather than as achieved scale."
          />
        </Reveal>
        <Reveal className="mt-10">
          <GlassCard>
            <ol className="relative space-y-6 ps-6">
              <span className="absolute bottom-2 start-[0.72rem] top-2 w-px bg-line/20" aria-hidden="true" />
              {ROADMAP.map((r) => (
                <li key={r.phase} className="relative">
                  <span className="absolute -start-6 top-1.5 h-3 w-3 rounded-full border-2 border-gold-500 bg-transparent" />
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display font-bold text-ink">{r.title}</h3>
                    <EvidenceTag status="TARGET" label={`${r.phase} · ${r.period}`} />
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{r.d}</p>
                </li>
              ))}
            </ol>
          </GlassCard>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <GlassCard>
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
              <Icon name="lock" size={18} className="text-gold-500" /> Discipline of disclosure
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              MASAR does not publish unverified volumes, customer counts, revenue, valuation,
              licenses or partnership claims on its public site. Strategic materials — commercial
              model detail, pipeline and operating metrics — are shared only with qualified
              strategic parties following assessment and, where appropriate, under confidentiality.
            </p>
          </GlassCard>
        </Reveal>
      </Section>

      <Section>
        <Container size="md">
          <Reveal>
            <div className="glass-strong rounded-2xl p-6 sm:p-9">
              <h2 className="h-display text-2xl font-bold text-ink">Request strategic information</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Submissions route to the strategic team and are assessed on relevance and mandate
                before materials are shared.
              </p>
              <div className="mt-7">
                <LeadForm type="investor" source="strategic-page" />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

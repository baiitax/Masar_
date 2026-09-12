import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  SectionHeader,
  GlassCard,
  LinkButton,
  CheckList,
  Disclaim,
  ImageFrame,
  EvidenceTag,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import { FLAGSHIP } from "@/content/corridors";
import { commodities } from "@/content/commodities";
import { WORKFLOW_STAGES } from "@/content/workflow";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "Nigeria → Saudi Arabia trade corridor",
  path: "/corridors/nigeria-saudi",
  description:
    "MASAR's flagship corridor: evidence-supported Nigerian agricultural supply matched with qualified Saudi import demand, with verification, compliance, independent inspection and controlled transaction workflow.",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Trade Corridors", href: "/corridors" },
  { label: "Nigeria → Saudi Arabia" },
];

export default function FlagshipCorridor() {
  const f = FLAGSHIP;
  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="Flagship corridor"
        title={
          <>
            Nigeria <Icon name="arrow" size={30} className="mx-1 inline text-gold-500 rtl:rotate-180" /> Saudi Arabia
          </>
        }
        lead="The first complete MASAR corridor: Nigerian agricultural production and export capacity connected to Saudi import, distribution and processing demand through a controlled transaction layer."
      >
        <LinkButton href="/buyers/request">Discuss a Nigeria–Saudi transaction</LinkButton>
        <LinkButton href="/exporters/apply" variant="ghost">Apply as a Nigerian exporter</LinkButton>
      </PageHero>

      <Section className="!pt-4">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <GlassCard level={4} className="h-full">
              <p className="eyebrow">Why Nigeria</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink">Depth of agricultural supply.</h2>
              <CheckList icon="leaf" className="mt-5" items={f.whyNigeria} />
              <ImageFrame
                src="/images/processing-nigeria.jpg"
                alt="Nigerian export processing line cleaning and bagging agricultural commodities."
                className="mt-7"
                ratio="16/10"
                evidence="SECONDARY"
              />
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard level={4} className="h-full">
              <p className="eyebrow">Why Saudi Arabia</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink">Structured, import-led demand.</h2>
              <CheckList icon="bank" className="mt-5" items={f.whySaudi} />
              <ImageFrame
                src="/images/saudi-distribution.jpg"
                alt="Food distribution warehouse with palletized goods serving the Saudi market."
                className="mt-7"
                ratio="16/10"
                evidence="SECONDARY"
              />
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Corridor challenges"
            title="Seven predictable failure points — each with an operational response."
          />
        </Reveal>
        <Reveal className="mt-10">
          <GlassCard>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="w-36">Challenge</th>
                    <th>Why transactions fail</th>
                    <th>MASAR's role</th>
                  </tr>
                </thead>
                <tbody>
                  {f.challenges.map((c) => (
                    <tr key={c.t}>
                      <td className="font-bold text-ink">{c.t}</td>
                      <td className="text-muted">{c.d}</td>
                      <td className="text-ink/85">
                        <span className="flex items-start gap-2">
                          <Icon name="shield" size={15} className="mt-1 flex-none text-gold-500" />
                          {c.r}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="MASAR's role"
            title="The transaction workflow on this corridor."
            lead={f.masarRole}
          />
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW_STAGES.map((s) => (
            <Reveal key={s.n} delay={(s.n % 4) * 0.05}>
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold-500/40 bg-gold-500/10 text-gold-500">
                    <Icon name={s.icon} size={18} />
                  </span>
                  <h3 className="font-display text-[0.95rem] font-bold text-ink">
                    <span className="font-mono text-[0.7rem] text-gold-500">{String(s.n).padStart(2, "0")}</span>
                    <br />
                    {s.title}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <Reveal>
            <SectionHeader
              eyebrow="Commodity opportunities"
              title="Only evidence-supported categories."
              lead="These categories combine Nigerian supply depth with documented Gulf demand. All are under validation; none is presented as actively transacted until a verified record exists."
            />
            <div className="mt-8 flex flex-wrap gap-2.5">
              {f.commodityOpportunities.map((slug) => {
                const c = commodities.find((x) => x.slug === slug);
                return (
                  <Link
                    key={slug}
                    href={`/commodities/${slug}`}
                    className="group flex items-center gap-2 rounded-xl border border-line/15 bg-line/[0.03] px-4 py-2.5 text-sm font-semibold text-ink/90 transition-all hover:border-gold-500/50 hover:text-gold-500"
                  >
                    <Icon name={c?.icon === "bean" ? "grain" : c?.icon || "grain"} size={16} />
                    {c?.name || slug}
                    <Icon name="chevronRight" size={13} className="opacity-40 rtl:rotate-180" />
                  </Link>
                );
              })}
            </div>
            <ImageFrame
              src="/images/port-logistics.jpg"
              alt="Container vessel and gantry cranes at a deep-water port at blue hour."
              className="mt-9"
              caption="Maritime execution is coordinated with qualified logistics partners — MASAR does not operate vessels or cargo assets."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard level={4}>
              <p className="eyebrow">Compliance landscape</p>
              <CheckList icon="stamp" className="mt-4" items={f.compliance} />
              <Disclaim title="Operational guidance, not legal advice" className="mt-6">
                <p>
                  Requirements vary by commodity, destination, importer status and transaction
                  structure. MASAR provides operational guidance and references official sources;
                  it does not replace advice from the relevant authorities or qualified
                  professionals.
                </p>
              </Disclaim>
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">Evidence</p>
                <ul className="mt-3 space-y-1.5 text-xs leading-5 text-muted">
                  {f.evidence.sources.map((s) => (
                    <li key={s} className="flex gap-2"><Icon name="fileCheck" size={13} className="mt-0.5 flex-none text-gold-500" />{s}</li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-2">
                  <EvidenceTag status="SECONDARY" />
                  <span className="text-xs text-muted">Last verified: {f.evidence.lastUpdated}</span>
                </div>
              </div>
              <LinkButton href="/compliance" variant="ghost" className="mt-6">Open the compliance center</LinkButton>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <CTASection primary="buyer" />
    </>
  );
}

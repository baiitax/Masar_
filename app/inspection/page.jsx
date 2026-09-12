import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  SectionHeader,
  GlassCard,
  LinkButton,
  ImageFrame,
  Disclaim,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "Inspection & evidence — independent evidence, controlled release",
  path: "/inspection",
  description:
    "Independent sampling, laboratory testing, quality inspection, loading verification, evidence packages, shipment evidence and delivery confirmation, coordinated through qualified third-party inspection partners.",
});

const STEPS = [
  { icon: "flask", t: "Sampling", d: "Representative samples drawn at aggregation and pre-shipment against defined sampling protocols." },
  { icon: "thermometer", t: "Laboratory testing", d: "Moisture, admixture, contamination, residue or microbiological parameters tested where the specification requires." },
  { icon: "eye", t: "Quality inspection", d: "Grade, condition, packing and marking checked against the agreed commercial specification." },
  { icon: "container", t: "Loading verification", d: "Stuffing and loading supervised, with counts, seals and photographic evidence." },
  { icon: "docs", t: "Documentation", d: "Reports and certificates cross-checked against contracts, invoices and transport documents for consistency." },
  { icon: "fileCheck", t: "Evidence package", d: "All outputs assembled into a chronological, attributable package tied to the transaction record." },
  { icon: "ship", t: "Shipment evidence", d: "Transport documents and milestones confirm what moved, when and under what conditions." },
  { icon: "pin", t: "Delivery confirmation", d: "Arrival and acceptance states recorded; discrepancies captured through a documented process." },
];

export default function InspectionPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Inspection & evidence" }]}
        eyebrow="Inspection & evidence"
        title={<>Independent evidence. <span className="text-gradient-gold">Controlled release.</span></>}
        lead="Parties cannot self-certify trust. MASAR coordinates independent sampling, testing and loading evidence so release decisions rest on what qualified third parties observed and recorded — not on what either commercial party asserts."
      >
        <LinkButton href="/transactions">View the transaction stages</LinkButton>
        <LinkButton href="/strategic-partners" variant="ghost">Inspection partners</LinkButton>
      </PageHero>

      <Section className="!pt-4">
        <Reveal>
          <SectionHeader
            eyebrow="The evidence chain"
            title="Eight evidence moments across the transaction."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={(i % 4) * 0.05}>
              <GlassCard hover className="h-full !p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold-500/30 bg-gold-500/10 text-gold-500">
                  <Icon name={s.icon} size={19} />
                </span>
                <p className="mt-3 font-mono text-[0.7rem] tracking-widest text-gold-500">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-sm font-bold text-ink">{s.t}</h3>
                <p className="mt-1.5 text-xs leading-5 text-muted">{s.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <ImageFrame
              src="/images/inspection-lab.jpg"
              ratio="4/3"
              alt="Gloved hands drawing a sesame sample for independent laboratory testing."
              caption="Independent, third-party evidence coordinated through qualified inspection partners."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeader eyebrow="Operating model" title="Coordinated by MASAR, performed by partners." />
            <div className="mt-6 space-y-4">
              {[
                { icon: "checkCircle", d: "MASAR coordinates qualified third-party inspection partners where required." },
                { icon: "xCircle", d: "MASAR does not own or operate laboratories unless a capability is formally introduced and legally supported." },
                { icon: "lock", d: "Evidence is returned to the controlled transaction record and used in release decisions." },
                { icon: "shield", d: "Findings speak to the sampled lot at the time of inspection; they are not blanket guarantees." },
              ].map((x, i) => (
                <GlassCard key={i} className="!p-4">
                  <p className="flex items-start gap-3 text-sm leading-6 text-ink/90">
                    <Icon name={x.icon} size={18} className={`mt-0.5 flex-none ${x.icon === "xCircle" ? "text-danger" : "text-success"}`} />
                    {x.d}
                  </p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <Disclaim title="Partner network — developing">
            <p>
              MASAR's inspection partner network is being established. No inspection company,
              laboratory or certification body is presented as a MASAR partner on this website
              until the relationship is verified. Qualified inspection providers can begin a
              partnership conversation through the strategic partners page.
            </p>
            <div className="mt-4">
              <LinkButton href="/strategic-partners" variant="ghost" size="sm">Become an inspection partner</LinkButton>
            </div>
          </Disclaim>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}

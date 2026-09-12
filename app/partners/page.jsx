import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  SectionHeader,
  GlassCard,
  LinkButton,
  StatusPill,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import { PARTNER_CATEGORIES } from "@/content/partners";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "Partner network",
  path: "/partners",
  description:
    "MASAR's partner ecosystem — inspection, logistics, financial institutions, insurance, technology, regulatory bodies, trade organizations and professional services. Partner identities are published only once relationships are verified.",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Partner network" }]}
        eyebrow="Partners"
        title="A qualified partner ecosystem around the rail."
        lead="MASAR deliberately stays asset-light. Inspection bodies, logistics operators, financial institutions, insurers and technology providers perform physical and regulated work inside a controlled transaction framework."
      >
        <LinkButton href="/strategic-partners">Partner with MASAR</LinkButton>
      </PageHero>

      <Section className="!pt-4">
        <Reveal>
          <GlassCard level={4} className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <StatusPill tone="warning">
              <Icon name="clock" size={13} /> Partner network — developing
            </StatusPill>
            <p className="text-sm leading-7 text-muted">
              MASAR is establishing its partner categories now. No partner logo, name or endorsement
              appears on this website until the relationship has been verified and formally agreed.
              This page describes the categories the network is designed around.
            </p>
          </GlassCard>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader eyebrow="Categories" title="What the transaction rail connects to." />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNER_CATEGORIES.map((p, i) => (
            <Reveal key={p.key} delay={(i % 4) * 0.05}>
              <GlassCard hover className="h-full !p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold-500/30 bg-gold-500/10 text-gold-500">
                  <Icon name={p.icon} size={19} />
                </span>
                <h3 className="mt-4 text-sm font-bold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-muted">{p.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Verification first"
            title="What MASAR verifies before a partner is published."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { icon: "shield", t: "Legal standing", d: "Registration, licensing and regulatory standing appropriate to the function performed." },
            { icon: "flask", t: "Operational capability", d: "Demonstrated ability to perform on the corridor — geography, capacity, quality and documentation." },
            { icon: "fileCheck", t: "Formal engagement", d: "A signed, current engagement before the relationship is described publicly in any form." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.06}>
              <GlassCard className="h-full">
                <Icon name={c.icon} size={22} className="text-gold-500" />
                <h3 className="mt-4 font-bold text-ink">{c.t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{c.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection primary="partner" />
    </>
  );
}

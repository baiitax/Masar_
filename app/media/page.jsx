import Image from "next/image";
import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  SectionHeader,
  GlassCard,
  Container,
  EmptyState,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import LeadForm from "@/components/forms/LeadForm";

export const metadata = pageMeta({
  title: "Media & press",
  path: "/media",
  description:
    "MASAR media center: approved company description, brand and logo downloads, and media contact. MASAR does not manufacture press coverage or publish unverified leadership information.",
});

const BOILERPLATE =
  "MASAR is the trusted transaction infrastructure for the Saudi–Africa trade corridor. An asset-light transaction-infrastructure company, MASAR connects verified African agricultural supply with qualified Saudi demand and orchestrates the counterparty verification, commodity matching, compliance documentation, independent inspection coordination, transaction management and controlled-release logic required to move trade from opportunity to completed transaction. The company's inaugural corridor is Nigeria → Saudi Arabia, with architecture designed to extend across Africa → GCC.";

const SHORT =
  "MASAR is cross-border trade infrastructure connecting verified African agricultural supply with qualified Saudi demand through verification, compliance, independent evidence and controlled transaction execution.";

export default function MediaPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Media" }]}
        eyebrow="Media & press"
        title="The MASAR press room."
        lead="Approved company descriptions, brand assets and the correct media contact. MASAR does not manufacture press coverage, and leadership details are published only once verified."
      />

      <Section className="!pt-4">
        <Reveal>
          <SectionHeader eyebrow="Company overview" title="Approved description of MASAR" />
        </Reveal>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <GlassCard level={4} className="h-full">
              <p className="text-xs font-bold uppercase tracking-widest text-gold-500">Standard boilerplate</p>
              <p className="mt-3 text-sm leading-7 text-muted">{BOILERPLATE}</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard className="h-full">
              <p className="text-xs font-bold uppercase tracking-widest text-gold-500">Short description</p>
              <p className="mt-3 text-sm leading-7 text-muted">{SHORT}</p>
              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-gold-500">Positioning</p>
              <p className="mt-2 text-sm italic text-muted">
                “The trusted transaction infrastructure for the Saudi–Africa trade corridor.”
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader eyebrow="Brand assets" title="Logo downloads" lead="Use the official MASAR marks without altering colors, proportions or surrounding typography." />
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Reveal>
            <GlassCard hover className="text-center">
              <div className="mx-auto flex h-40 items-center justify-center rounded-xl bg-navy-900 p-6">
                <Image src="/brand/logo-mark.png" width={120} height={120} alt="MASAR app mark: gold trade route over a navy map, with the MASAR monogram." className="rounded-[22%] shadow-gold" />
              </div>
              <h3 className="mt-5 font-bold text-ink">App mark (PNG)</h3>
              <p className="mt-1 text-xs text-muted">Square lockup with map motif — 1254×1254</p>
              <a href="/brand/logo-mark.png" download="masar-mark.png" className="btn btn-ghost btn-sm mt-4">
                <Icon name="download" size={14} /> Download PNG
              </a>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard hover className="text-center">
              <div className="mx-auto flex h-40 items-center justify-center rounded-xl bg-white p-6">
                <Image src="/brand/logo-horizontal.png" width={360} height={360} alt="MASAR horizontal logo with the wordmark and tagline Trusted Trade, Seamless Futures." className="w-full max-w-sm" />
              </div>
              <h3 className="mt-5 font-bold text-ink">Horizontal logo (PNG)</h3>
              <p className="mt-1 text-xs text-muted">Wordmark with tagline — for light backgrounds</p>
              <a href="/brand/logo-horizontal.png" download="masar-logo-horizontal.png" className="btn btn-ghost btn-sm mt-4">
                <Icon name="download" size={14} /> Download PNG
              </a>
            </GlassCard>
          </Reveal>
        </div>
        <Reveal className="mt-6">
          <GlassCard>
            <h3 className="text-sm font-bold text-ink">Brand colors (extracted from the official mark)</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {[
                ["#061A3F", "Primary navy"],
                ["#0B2B68", "Deep blue"],
                ["#C2994B", "Route gold"],
                ["#E6BE5E", "Gold highlight"],
              ].map(([hex, label]) => (
                <div key={hex} className="overflow-hidden rounded-xl border border-line/15">
                  <div className="h-14" style={{ background: hex }} />
                  <div className="p-3">
                    <p className="text-xs font-bold text-ink">{label}</p>
                    <p className="font-mono text-[0.7rem] text-muted">{hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <EmptyState icon="users" title="Leadership information is published once verified.">
            MASAR does not publish unverified names, titles, advisers or board composition. Verified
            leadership and company information will be added here as the organization confirms it.
          </EmptyState>
        </Reveal>
      </Section>

      <Section>
        <Container size="md">
          <Reveal>
            <div className="glass-strong rounded-2xl p-6 sm:p-9">
              <h2 className="h-display text-2xl font-bold text-ink">Media contact</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                For interviews, comment requests, fact sheets or brand asset packages, complete the
                media inquiry form and the team will respond with verified information only.
              </p>
              <div className="mt-7">
                <LeadForm type="media" source="media-page" />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

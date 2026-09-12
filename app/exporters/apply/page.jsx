import { pageMeta } from "@/lib/seo";
import { PageHero, Section, Container, GlassCard } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import LeadForm from "@/components/forms/LeadForm";

export const metadata = pageMeta({
  title: "Apply as an exporter",
  path: "/exporters/apply",
  description:
    "Structured exporter onboarding for African agricultural suppliers — company, export capability, compliance, quality systems and transaction terms, with secure document submission.",
});

const NOTES = [
  { icon: "shield", t: "No implied verification", d: "Your application is never displayed as verified until checks are actually completed." },
  { icon: "lock", t: "Confidential documents", d: "Certificates and company documents are access-controlled and used for assessment only." },
  { icon: "fileCheck", t: "Evidence over claims", d: "List only certifications and capabilities you can support with documents." },
];

export default function ExporterApply() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "For Exporters", href: "/exporters" },
          { label: "Exporter application" },
        ]}
        eyebrow="Exporter onboarding"
        title="Apply as an exporter."
        lead="A complete application takes around 15 minutes. Provide accurate, documentable information on your company, capability, compliance and transaction terms."
      />
      <Section className="!pt-0">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <Reveal>
              <div className="glass-strong rounded-2xl p-6 sm:p-9">
                <LeadForm type="exporter" source="exporter-application-page" />
              </div>
            </Reveal>
            <aside className="space-y-5">
              {NOTES.map((n, i) => (
                <Reveal key={n.t} delay={0.06 * i}>
                  <GlassCard>
                    <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink">
                      <Icon name={n.icon} size={17} className="text-gold-500" /> {n.t}
                    </h2>
                    <p className="mt-3 text-xs leading-6 text-muted">{n.d}</p>
                  </GlassCard>
                </Reveal>
              ))}
              <Reveal delay={0.2}>
                <GlassCard>
                  <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink">
                    <Icon name="upload" size={17} className="text-gold-500" /> Document uploads
                  </h2>
                  <p className="mt-3 text-xs leading-6 text-muted">
                    Registration certificates, company profiles and product or quality documents can
                    be attached (PDF, JPG, PNG or DOC/DOCX, up to 8 MB each). Files are stored with
                    access controls and never published.
                  </p>
                </GlassCard>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

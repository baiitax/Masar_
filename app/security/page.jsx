import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  SectionHeader,
  GlassCard,
  Disclaim,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "Security & data protection practices",
  path: "/security",
  description:
    "How MASAR protects commercial information: encryption, access controls, audit trails, document protection, identity verification and fraud monitoring. Security capabilities are stated accurately, without unverified certification claims.",
});

const CONTROLS = [
  { icon: "lock", t: "Encryption", d: "Information transmitted through the website is encrypted in transit. Document storage is access-restricted, with protections developed as the transaction platform expands." },
  { icon: "users", t: "Access controls", d: "Commercial submissions and documents are accessible on a need-to-know basis to authorized personnel, with role-based access designed for authenticated private workflows." },
  { icon: "audit", t: "Audit trails", d: "Verification, document and release actions are logged, preserving who did what, when and on what evidence." },
  { icon: "docs", t: "Document protection", d: "Uploaded commercial documents are stored privately, never publicly linked, and shared only within the specific transaction they support." },
  { icon: "shield", t: "Identity verification", d: "Counterparty checks form part of the transaction workflow; privileged actions require verified identity rather than self-assertion." },
  { icon: "eye", t: "Fraud monitoring", d: "Form submissions use validation, rate limiting and bot-detection measures; suspicious or anomalous activity is reviewed before processing." },
  { icon: "database", t: "Data minimization", d: "Public forms do not request payment credentials or unnecessary sensitive information; only trade-relevant data is collected." },
  { icon: "stamp", t: "Governance", d: "Commercial claims and records follow source → review → approval → publication, with evidence status maintained on each record." },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Security" }]}
        eyebrow="Security"
        title="Security for a transaction business."
        lead="MASAR handles commercial identity, documents and transaction evidence. Security is therefore an operating requirement, not a marketing statement — described here accurately, including what is still being built."
      />

      <Section className="!pt-4">
        <Reveal>
          <SectionHeader eyebrow="Controls" title="How commercial information is protected." />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTROLS.map((c, i) => (
            <Reveal key={c.t} delay={(i % 4) * 0.05}>
              <GlassCard hover className="h-full !p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold-500/30 bg-gold-500/10 text-gold-500">
                  <Icon name={c.icon} size={19} />
                </span>
                <h3 className="mt-4 text-sm font-bold text-ink">{c.t}</h3>
                <p className="mt-1.5 text-xs leading-5 text-muted">{c.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Forms & submissions"
            title="Input handling on every public form."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Server-side validation", "Client checks are convenience only; submissions are validated on the server."],
            ["Rate limiting", "Submission and upload endpoints are rate limited by source."],
            ["Bot protection", "Honeypot fields and input constraints reduce automated abuse without tracking people."],
            ["Input sanitization", "Free text is cleaned of control characters and length-bounded."],
            ["Secure file upload", "Type allowlisting, size limits (8 MB) and private storage for documents."],
            ["No credentials collected", "Public forms never request bank, card or payment credentials."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 0.05}>
              <GlassCard className="h-full">
                <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
                  <Icon name="checkCircle" size={16} className="text-success" /> {t}
                </h3>
                <p className="mt-2 text-xs leading-5 text-muted">{d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Disclaim title="Scope & accuracy">
            <p>
              MASAR does not claim security, regulatory or cloud certifications on this website
              unless they have been earned and verified. The controls above describe the design and
              operating practice of the public platform and the direction of the private
              transaction workspace. No internet-based system can be guaranteed absolutely secure;
              suspected incidents are investigated and assessed, and notifications are made where
              legally required.
            </p>
            <p className="mt-2">
              For privacy and data-subject matters, see the <a href="/legal/privacy" className="underline">Privacy Policy</a> and{" "}
              <a href="/legal/data-protection" className="underline">Data Protection Statement</a>.
            </p>
          </Disclaim>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}

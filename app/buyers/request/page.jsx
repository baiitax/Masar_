import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Section,
  GlassCard,
  Breadcrumbs,
  Container,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import LeadForm from "@/components/forms/LeadForm";

export const metadata = pageMeta({
  title: "Submit a buyer requirement",
  path: "/buyers/request",
  description:
    "Submit a structured Saudi buyer requirement — commodity, grade, quantity, frequency, destination and documentation needs. MASAR verifies requirements before sourcing.",
});

const NEXT = [
  { t: "Acknowledgement", d: "You receive a reference number and confirmation of the responsible team." },
  { t: "Verification", d: "MASAR may request additional verification of your business and requirement." },
  { t: "Qualified supply", d: "Capability-screened supplier options aligned to your specification." },
  { t: "Evidence & execution", d: "Specification, documentation, independent inspection and controlled release." },
];

export default function BuyerRequest({ searchParams }) {
  const commodity = searchParams?.commodity
    ? decodeURIComponent(searchParams.commodity).replace(/-/g, " ")
    : undefined;
  const mapped = commodity
    ? commodity.replace(/(^|\s)\S/g, (c) => c.toUpperCase()).replace("Gum Arabic", "Gum Arabic")
    : undefined;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "For Buyers", href: "/buyers" },
          { label: "Buyer requirement" },
        ]}
        eyebrow="For buyers"
        title="Submit a buyer requirement."
        lead="Provide as much specificity as you can — grade, volume, frequency, destination and documentation expectations. Requirements are assessed before any sourcing begins."
      />
      <Section className="!pt-0">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <Reveal>
              <div className="glass-strong rounded-2xl p-6 sm:p-9">
                <LeadForm
                  type="buyer"
                  source="buyer-requirement-page"
                  defaultValues={mapped ? { commodity: mapped } : undefined}
                />
              </div>
            </Reveal>
            <aside className="space-y-5">
              <Reveal delay={0.08}>
                <GlassCard>
                  <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink">
                    <Icon name="route" size={17} className="text-gold-500" /> What happens next
                  </h2>
                  <ol className="mt-4 space-y-4">
                    {NEXT.map((n, i) => (
                      <li key={n.t} className="flex gap-3">
                        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg border border-gold-500/40 font-mono text-[0.7rem] text-gold-500">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-ink">{n.t}</p>
                          <p className="mt-0.5 text-xs leading-5 text-muted">{n.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </GlassCard>
              </Reveal>
              <Reveal delay={0.14}>
                <GlassCard>
                  <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink">
                    <Icon name="lock" size={17} className="text-gold-500" /> Your information
                  </h2>
                  <p className="mt-3 text-xs leading-6 text-muted">
                    Requirements are confidential commercial information. They are never published
                    and are shared only within a specific transaction. We do not ask for payment
                    details or unnecessary sensitive information.
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

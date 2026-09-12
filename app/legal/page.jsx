import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { PageHero, Section, GlassCard } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import { LEGAL_DOCS } from "@/content/legal";

export const metadata = pageMeta({
  title: "Legal",
  path: "/legal/terms",
  description: "MASAR legal documents: privacy, terms of use, cookies, disclaimers and data protection.",
});

export default function LegalIndex() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Legal" }]}
        eyebrow="Legal"
        title="Legal & governance."
        lead="The terms, privacy and data-protection framework governing use of the MASAR website and the information submitted through it."
      />
      <Section className="!pt-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(LEGAL_DOCS).map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 0.05}>
              <Link href={`/legal/${d.slug}`} className="block h-full">
                <GlassCard hover className="h-full">
                  <Icon name="docs" size={22} className="text-gold-500" />
                  <h2 className="mt-4 font-bold text-ink">{d.title}</h2>
                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted">{d.intro}</p>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

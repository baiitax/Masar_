import { notFound } from "next/navigation";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Container, Breadcrumbs, GlassCard, Section } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import { LEGAL_DOCS } from "@/content/legal";
import CTASection from "@/components/CTASection";

export function generateStaticParams() {
  return Object.keys(LEGAL_DOCS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const doc = LEGAL_DOCS[params.slug];
  if (!doc) return {};
  return pageMeta({ title: doc.title, path: `/legal/${doc.slug}`, description: doc.intro });
}

export default function LegalDocPage({ params }) {
  const doc = LEGAL_DOCS[params.slug];
  if (!doc) notFound();

  return (
    <>
      <header className="pt-32 sm:pt-40 pb-10">
        <Container size="md">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Legal", href: "/legal/terms" },
              { label: doc.title },
            ]}
          />
          <Reveal>
            <h1 className="h-display text-3xl font-bold text-ink sm:text-5xl">{doc.title}</h1>
            <p className="mt-4 text-sm text-muted">Last updated: {doc.updated}</p>
            <p className="lead mt-6">{doc.intro}</p>
          </Reveal>
        </Container>
      </header>

      <Section className="!pt-2">
        <Container size="lg">
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <Reveal>
              <article className="prose-masar">
                {doc.sections.map((s, i) => (
                  <section key={i}>
                    <h2>{s.h}</h2>
                    {s.p.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </section>
                ))}
              </article>
            </Reveal>
            <aside className="space-y-3">
              <GlassCard className="!p-5 lg:sticky lg:top-28">
                <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
                  <Icon name="docs" size={15} className="text-gold-500" /> Legal
                </h2>
                <ul className="mt-3 space-y-1">
                  {Object.values(LEGAL_DOCS).map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/legal/${d.slug}`}
                        className={`block rounded-lg px-3 py-2 text-[0.82rem] transition-colors ${
                          d.slug === doc.slug
                            ? "bg-gold-500/12 font-semibold text-gold-500"
                            : "text-muted hover:bg-line/10 hover:text-ink"
                        }`}
                      >
                        {d.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </aside>
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}

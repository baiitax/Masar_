import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { pageMeta } from "@/lib/seo";
import {
  Container,
  Breadcrumbs,
  GlassCard,
  LinkButton,
  Disclaim,
} from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Icon from "@/components/icons";
import { articles, getArticle } from "@/content/insights";
import { ArticleSchema } from "@/components/schema";
import CTASection from "@/components/CTASection";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const a = getArticle(params.slug);
  if (!a) return {};
  return pageMeta({
    title: a.title,
    path: `/insights/${a.slug}`,
    description: a.excerpt,
    type: "article",
    publishedTime: a.date,
    tags: [a.categoryLabel],
  });
}

function fmt(d) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function ArticlePage({ params }) {
  const a = getArticle(params.slug);
  if (!a) notFound();
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="pt-32 sm:pt-40 pb-10">
          <Container size="md">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/insights" },
                { label: a.categoryLabel, href: "/insights" },
              ]}
            />
            <span className="pill">{a.categoryLabel}</span>
            <h1 className="h-display mt-5 text-3xl font-bold text-ink sm:text-[2.7rem]">{a.title}</h1>
            <p className="lead mt-5 text-lg">{a.excerpt}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
              <span className="flex items-center gap-1.5"><Icon name="user" size={14} className="text-gold-500" />{a.author}</span>
              <span className="flex items-center gap-1.5"><Icon name="clock" size={14} className="text-gold-500" />{a.readingTime}</span>
              <span>Published {fmt(a.date)}</span>
              <span>Last reviewed {fmt(a.modified || a.date)}</span>
            </div>
          </Container>
        </header>

        <Container size="md">
          <Reveal>
            <figure className="glass overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/8]">
                <Image src={a.image} alt={a.alt || ""} fill priority sizes="(max-width:768px) 100vw, 860px" className="object-cover" />
              </div>
            </figure>
          </Reveal>

          <div className="prose-masar mt-10">
            {a.sections.map((s, i) => (
              <section key={i}>
                <h2>{s.h}</h2>
                {s.p?.map((para, j) => <p key={j}>{para}</p>)}
                {s.bullets ? (
                  <ul>
                    {s.bullets.map((b, k) => <li key={k}>{b}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <Reveal className="mt-12">
            <GlassCard>
              <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink">
                <Icon name="docs" size={17} className="text-gold-500" /> Sources
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {a.sources.map((s, i) => (
                  <li key={i} className="flex gap-2"><Icon name="fileCheck" size={15} className="mt-1 flex-none text-gold-500" />{s}</li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          {a.disclaimer ? (
            <Reveal className="mt-6">
              <Disclaim title="Disclaimer">{a.disclaimer}</Disclaim>
            </Reveal>
          ) : null}

          <div className="mt-10 flex items-center justify-between border-y border-line/12 py-5 text-sm">
            <Link href="/insights" className="inline-flex items-center gap-2 font-semibold text-gold-500">
              <Icon name="arrow" size={15} className="rtl:rotate-180 rotate-180" /> All insights
            </Link>
            <LinkButton href="/contact" variant="ghost" size="sm">Discuss this topic</LinkButton>
          </div>
        </Container>
      </article>

      <section className="py-20">
        <Container>
          <h2 className="h-display mb-8 text-2xl font-bold text-ink">Related intelligence</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/insights/${r.slug}`} className="block h-full">
                <GlassCard hover className="h-full !p-5">
                  <span className="pill">{r.categoryLabel}</span>
                  <h3 className="mt-3 text-sm font-bold leading-6 text-ink">{r.title}</h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted">{r.excerpt}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ArticleSchema
        title={a.title}
        description={a.excerpt}
        path={`/insights/${a.slug}`}
        datePublished={a.date}
        dateModified={a.modified}
        author={a.author}
      />
      <CTASection />
    </>
  );
}

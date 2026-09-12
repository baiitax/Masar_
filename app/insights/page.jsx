import { pageMeta } from "@/lib/seo";
import { PageHero, Section } from "@/components/primitives";
import InsightsList from "@/components/pages/InsightsList";
import CTASection from "@/components/CTASection";

export const metadata = pageMeta({
  title: "Insights & research",
  path: "/insights",
  description:
    "MASAR intelligence journal: Saudi market and Nigeria market analysis, commodity intelligence, trade compliance, logistics, export education, buyer insights and MASAR research — with sources and review dates.",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        eyebrow="Insights & research"
        title="The MASAR intelligence journal."
        lead="Structured analysis of the Saudi–Africa corridor — buyers, commodities, compliance, logistics and transaction practice. Every article carries its author, sources, review date and disclaimer where applicable."
      />
      <Section className="!pt-4">
        <InsightsList />
      </Section>
      <CTASection />
    </>
  );
}

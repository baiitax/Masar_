import { pageMeta } from "@/lib/seo";
import { PageHero, Section, LinkButton, Container } from "@/components/primitives";
import IntelBrowser from "@/components/pages/IntelBrowser";
import CTASection from "@/components/CTASection";
import { commodities } from "@/content/commodities";

export const metadata = pageMeta({
  title: "Saudi buyer intelligence",
  path: "/intelligence/saudi-buyers",
  description:
    "Structured, evidence-gated Saudi buyer intelligence: commodity, city, industry, buyer type, evidence status, activity and confidence — private commercial information is never exposed.",
});

const columns = ["Buyer segment", "Commodity focus", "Location", "Industry", "Evidence status", "Confidence"];

export default function SaudiBuyerIntel() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Intelligence", href: "/intelligence" },
          { label: "Saudi buyer intelligence" },
        ]}
        eyebrow="Intelligence"
        title="Saudi buyer intelligence."
        lead="A structured interface over verified buyer records — segment, commodity, geography, evidence state and confidence. MASAR does not publish private contacts, requirements or unverified companies."
      >
        <LinkButton href="/buyers/request">Are you a Saudi buyer?</LinkButton>
      </PageHero>
      <Section className="!pt-4">
        <Container size="xl">
          <IntelBrowser
            filters={[
              { name: "commodity", label: "Commodity", options: commodities.filter((c) => c.dossier).map((c) => c.name) },
              { name: "city", label: "City", options: ["Riyadh", "Jeddah", "Dammam", "Mecca", "Medina", "Khobar"] },
              { name: "industry", label: "Industry", options: ["Import / distribution", "Food processing", "Bakery & confectionery", "Food service", "Retail", "Ingredient manufacturing"] },
              { name: "buyerType", label: "Buyer type", options: ["Direct importer", "Distributor", "Processor / manufacturer", "Tender / institutional"] },
              { name: "evidence", label: "Evidence status", options: ["Verified", "Secondary source", "Under validation"] },
              { name: "activity", label: "Activity", options: ["Active purchaser", "Periodic purchaser", "New entrant"] },
              { name: "confidence", label: "Confidence", options: ["High", "Medium", "Indicative"] },
            ]}
            columns={columns}
            emptyTitle="No verified buyer records match this filter."
            emptyBody="MASAR does not populate this directory from scraping or speculation. Records appear only after evidence review, and private contact and requirement data is never displayed publicly."
            methodology={[
              "Only legitimate public or business-sourced information is recorded.",
              "Private contact details, pricing and requirements remain confidential to the transaction workflow.",
              "Each record carries an evidence status, source and last-verified date.",
              "Buyer identity is disclosed to qualified, verified counterparties within a transaction.",
            ]}
            cta={<LinkButton href="/contact" variant="ghost">Contribute or verify buyer intelligence</LinkButton>}
          />
        </Container>
      </Section>
      <CTASection primary="buyer" />
    </>
  );
}

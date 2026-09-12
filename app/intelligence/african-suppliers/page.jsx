import { pageMeta } from "@/lib/seo";
import { PageHero, Section, LinkButton, Container } from "@/components/primitives";
import IntelBrowser from "@/components/pages/IntelBrowser";
import CTASection from "@/components/CTASection";
import { commodities } from "@/content/commodities";

export const metadata = pageMeta({
  title: "African supplier intelligence",
  path: "/intelligence/african-suppliers",
  description:
    "Evidence-gated African exporter directory: commodity, origin, capability, certification, export history and verification status. Sensitive supplier information is never exposed publicly.",
});

const columns = ["Exporter", "Commodity", "Origin", "Capability", "Certification", "Export history", "Verification"];

export default function AfricanSupplierIntel() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Intelligence", href: "/intelligence" },
          { label: "African supplier intelligence" },
        ]}
        eyebrow="Intelligence"
        title="African supplier intelligence."
        lead="Origin-level supplier records with capability, certification, export history and verification state — built from application evidence, not listings. Confidential commercial information is never exposed."
      >
        <LinkButton href="/exporters/apply">Apply as an exporter</LinkButton>
      </PageHero>
      <Section className="!pt-4">
        <Container size="xl">
          <IntelBrowser
            filters={[
              { name: "commodity", label: "Commodity", options: commodities.map((c) => c.name).slice(0, 12) },
              { name: "origin", label: "Origin", options: ["Nigeria", "Senegal", "Mali", "Tanzania", "Kenya", "Ethiopia", "Sudan", "Ghana"] },
              { name: "capability", label: "Capability", options: ["Aggregation", "Processing / sorting", "Bagging & packaging", "Warehousing", "Direct export"] },
              { name: "certification", label: "Certification", options: ["Phytosanitary", "Organic", "HACCP / ISO", "Laboratory program", "None declared"] },
              { name: "history", label: "Export history", options: ["Regular exporter", "Some shipments", "New entrant"] },
              { name: "status", label: "Verification status", options: ["Verified", "Pending", "Requires review", "Not verified"] },
            ]}
            columns={columns}
            emptyTitle="No verified supplier records match this filter."
            emptyBody="Suppliers appear with identifiable detail only after application review and verification. Until then, aggregate corridor coverage is shown but no private record is exposed."
            methodology={[
              "Records originate from structured exporter applications and evidence review.",
              "A supplier is marked verified only when the relevant checks are actually completed.",
              "Pricing, customers and confidential documents are never publicly displayed.",
              "Verification states — verified, pending, requires review, not verified — are explicit on every record.",
            ]}
            mapNote="Illustrative origin coverage for orientation. Individual exporter locations and records are shown only after verification."
            cta={<LinkButton href="/exporters/apply" variant="ghost">Begin the exporter application</LinkButton>}
          />
        </Container>
      </Section>
      <CTASection primary="exporter" />
    </>
  );
}

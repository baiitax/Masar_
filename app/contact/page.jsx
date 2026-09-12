import { pageMeta } from "@/lib/seo";
import { PageHero, Section, Container } from "@/components/primitives";
import ContactHub from "@/components/pages/ContactHub";
import { ContactPageSchema } from "@/components/schema";

export const metadata = pageMeta({
  title: "Contact MASAR",
  path: "/contact",
  description:
    "Route your inquiry to the right MASAR team: buyer requirements, exporter applications, partnerships, media, investor and strategic conversations, or general inquiries.",
});

export default function ContactPage({ searchParams }) {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title="Talk to MASAR."
        lead="Inquiries route to a specific team — buyer development, origin operations, partnerships, media, strategic, or general. Choose the path that describes you; each submission becomes a structured, assessed record."
      />
      <Section className="!pt-0">
        <Container size="xl">
          <ContactHub initial={searchParams?.type} />
        </Container>
      </Section>
      <ContactPageSchema />
    </>
  );
}

import { pageMeta } from "@/lib/seo";
import { PageHero, Section, Container, LinkButton } from "@/components/primitives";
import FaqExplorer from "@/components/pages/FaqExplorer";
import { FAQ_GROUPS } from "@/content/faqs";
import { FAQSchema } from "@/components/schema";

export const metadata = pageMeta({
  title: "Frequently asked questions",
  path: "/faq",
  description:
    "Answers about MASAR: buyers, exporters, transactions, verification, compliance, payments, logistics and what MASAR is — and is not.",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        eyebrow="FAQ"
        title="Questions about how MASAR works."
        lead="Clear answers on buyers, exporters, transactions, verification, compliance, payments and logistics — including the limits of what MASAR does."
      >
        <LinkButton href="/contact">Contact MASAR</LinkButton>
      </PageHero>
      <Section className="!pt-4">
        <Container size="md">
          <FaqExplorer groups={FAQ_GROUPS} />
        </Container>
      </Section>
      <FAQSchema groups={FAQ_GROUPS} />
    </>
  );
}

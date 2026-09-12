import { SITE_URL, SITE } from "@/lib/site";

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "MASAR",
        url: SITE_URL,
        logo: `${SITE_URL}/brand/logo-mark.png`,
        description: SITE.description,
        slogan: SITE.tagline,
        knowsAbout: [
          "Cross-border trade infrastructure",
          "Saudi Arabia food imports",
          "African agricultural exports",
          "Trade compliance",
          "Counterparty verification",
          "Nigeria Saudi Arabia trade corridor",
        ],
        areaServed: [
          { "@type": "Place", name: "Nigeria" },
          { "@type": "Place", name: "Saudi Arabia" },
        ],
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "MASAR",
        url: SITE_URL,
        description: SITE.description,
        inLanguage: ["en", "ar", "fr"],
      }}
    />
  );
}

export function BreadcrumbSchema({ items }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.label,
          ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
        })),
      }}
    />
  );
}

export function ArticleSchema({ title, description, path, datePublished, dateModified, author }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: `${SITE_URL}${path}`,
        datePublished,
        dateModified: dateModified || datePublished,
        author: { "@type": "Organization", name: author || "MASAR Trade Intelligence" },
        publisher: {
          "@type": "Organization",
          name: "MASAR",
          logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/logo-mark.png` },
        },
        inLanguage: "en",
      }}
    />
  );
}

export function FAQSchema({ groups }) {
  const qs = groups.flatMap((g) => g.items || []);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: qs.map((q) => ({
          "@type": "Question",
          name: q.q,
          acceptedAnswer: { "@type": "Answer", text: q.a },
        })),
      }}
    />
  );
}

export function ContactPageSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact MASAR",
        url: `${SITE_URL}/contact`,
        description:
          "Contact MASAR for buyer requirements, exporter applications, partnerships, media, investor relations and general inquiries.",
      }}
    />
  );
}

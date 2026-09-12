import { SITE_URL, SITE } from "./site";

export function pageMeta({
  title,
  description,
  path = "/",
  ogImage = "/images/og-default.jpg",
  type = "website",
  publishedTime,
  tags,
  noindex = false,
} = {}) {
  const fullTitle = title ? `${title} · MASAR` : `${SITE.name} — ${SITE.positioning}`;
  const url = `${SITE_URL}${path}`;
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "MASAR",
      locale: "en_GB",
      alternateLocale: ["ar_SA", "fr_FR"],
      type,
      images: [{ url: `${SITE_URL}${ogImage}`, width: 1200, height: 630, alt: "MASAR" }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(tags ? { article: { tags } } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${SITE_URL}${ogImage}`],
    },
  };
}

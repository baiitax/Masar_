import { SITE_URL } from "@/lib/site";
import { commodities } from "@/content/commodities";
import { articles } from "@/content/insights";
import { LEGAL_DOCS } from "@/content/legal";

const STATIC = [
  "", "/about", "/platform", "/how-it-works",
  "/buyers", "/buyers/request",
  "/exporters", "/exporters/apply",
  "/corridors", "/corridors/nigeria-saudi", "/corridor",
  "/commodities",
  "/intelligence", "/intelligence/saudi-buyers", "/intelligence/african-suppliers",
  "/compliance", "/verification", "/inspection", "/transactions",
  "/partners", "/strategic-partners",
  "/contact", "/faq",
  "/security", "/status", "/careers", "/media", "/strategic",
];

export default function sitemap() {
  const now = new Date();
  const staticRoutes = STATIC.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
  const commodityRoutes = commodities.map((c) => ({
    url: `${SITE_URL}/commodities/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  const articleRoutes = articles.map((a) => ({
    url: `${SITE_URL}/insights/${a.slug}`,
    lastModified: new Date(a.modified || a.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  const legalRoutes = Object.values(LEGAL_DOCS).map((d) => ({
    url: `${SITE_URL}/legal/${d.slug}`,
    lastModified: new Date(d.updated),
    changeFrequency: "yearly",
    priority: 0.3,
  }));
  return [...staticRoutes, ...commodityRoutes, ...articleRoutes, ...legalRoutes];
}

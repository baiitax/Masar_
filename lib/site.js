export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://masar.trade";

export const SITE = {
  name: "MASAR",
  legalName: "MASAR",
  tagline: "Trusted trade. Seamless futures.",
  positioning:
    "The trusted transaction infrastructure for the Saudi–Africa trade corridor.",
  description:
    "MASAR connects verified African agricultural supply with qualified Saudi demand and orchestrates the evidence, compliance and execution required to complete trustworthy cross-border trade.",
  email: "contact@masar.trade",
  twitter: "", // only populated once an official account exists
};

export function absoluteUrl(path = "") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

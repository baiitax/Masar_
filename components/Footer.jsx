"use client";

import Link from "next/link";
import Brand from "./Brand";
import { useApp } from "./AppProvider";

export default function Footer() {
  const { t } = useApp();
  const year = new Date().getFullYear();

  const cols = [
    {
      title: t("footer.colMasar"),
      links: [
        { label: t("nav.about"), href: "/about" },
        { label: t("nav.how"), href: "/how-it-works" },
        { label: t("nav.platform"), href: "/platform" },
        { label: t("nav.sub.careers"), href: "/careers" },
      ],
    },
    {
      title: t("footer.colTrade"),
      links: [
        { label: t("nav.buyers"), href: "/buyers" },
        { label: t("nav.exporters"), href: "/exporters" },
        { label: t("nav.corridors"), href: "/corridors" },
        { label: t("nav.sub.commodities"), href: "/commodities" },
      ],
    },
    {
      title: t("footer.colIntel"),
      links: [
        { label: t("nav.insights"), href: "/insights" },
        { label: t("nav.intelligence"), href: "/intelligence" },
        { label: t("nav.sub.compliance"), href: "/compliance" },
        { label: t("nav.sub.verification"), href: "/verification" },
      ],
    },
    {
      title: t("footer.colPartners"),
      links: [
        { label: t("nav.sub.strategicPartners"), href: "/strategic-partners" },
        { label: t("nav.sub.partners"), href: "/partners" },
        { label: t("nav.sub.media"), href: "/media" },
        { label: t("nav.sub.strategic"), href: "/strategic" },
      ],
    },
    {
      title: t("footer.colLegal"),
      links: [
        { label: "Privacy", href: "/legal/privacy" },
        { label: "Terms", href: "/legal/terms" },
        { label: "Cookies", href: "/legal/cookies" },
        { label: "Disclaimer", href: "/legal/disclaimer" },
      ],
    },
  ];

  return (
    <footer className="relative mt-10 border-t border-line/12">
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2.7fr]">
          <div>
            <Brand />
            <p className="mt-5 max-w-xs text-sm leading-7 text-muted">{t("footer.tagline")}</p>
            <p className="mt-5 text-xs leading-6 text-muted/80">{t("footer.locations")}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {cols.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-ink">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[0.84rem] text-muted transition-colors hover:text-gold-500"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line/12 pt-7 text-[0.74rem] leading-6 text-muted/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} MASAR. {t("footer.rights")}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/contact" className="hover:text-gold-500">{t("nav.sub.contact")}</Link>
            <Link href="/faq" className="hover:text-gold-500">{t("nav.sub.faq")}</Link>
            <Link href="/security" className="hover:text-gold-500">{t("nav.sub.security")}</Link>
            <Link href="/status" className="hover:text-gold-500">Status</Link>
            <Link href="/legal/data-protection" className="hover:text-gold-500">Data protection</Link>
            <Link href="/legal/trade-disclaimer" className="hover:text-gold-500">Trade disclaimer</Link>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-[0.68rem] leading-5 text-muted/60">
          {t("footer.locationsNote")}
        </p>
        <p className="mt-2 max-w-3xl text-[0.68rem] leading-5 text-muted/60">
          {t("backed.label")} — {t("backed.text")}{" "}
          <a
            href="https://kgmlimited.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-500"
          >
            kgmlimited.com
          </a>
        </p>
      </div>
    </footer>
  );
}

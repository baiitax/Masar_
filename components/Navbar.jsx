"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "./Brand";
import Icon from "./icons";
import { useApp, LANGS } from "./AppProvider";
import T from "./T";

const MENU = [
  { label: "nav.platform", href: "/platform" },
  {
    label: "nav.corridors",
    children: [
      { label: "nav.sub.corridorsOverview", href: "/corridors" },
      { label: "nav.sub.flagship", href: "/corridors/nigeria-saudi" },
      { label: "nav.sub.aboutCorridor", href: "/corridor" },
      { label: "nav.sub.commodities", href: "/commodities" },
    ],
  },
  {
    label: "nav.buyers",
    children: [
      { label: "nav.sub.buyerOverview", href: "/buyers" },
      { label: "nav.sub.buyerRequest", href: "/buyers/request" },
    ],
  },
  {
    label: "nav.exporters",
    children: [
      { label: "nav.sub.exporterOverview", href: "/exporters" },
      { label: "nav.sub.exporterApply", href: "/exporters/apply" },
    ],
  },
  {
    label: "nav.intelligence",
    children: [
      { label: "nav.sub.intelOverview", href: "/intelligence" },
      { label: "nav.sub.saudiBuyers", href: "/intelligence/saudi-buyers" },
      { label: "nav.sub.africanSuppliers", href: "/intelligence/african-suppliers" },
      { label: "nav.sub.compliance", href: "/compliance" },
      { label: "nav.sub.verification", href: "/verification" },
      { label: "nav.sub.inspection", href: "/inspection" },
      { label: "nav.sub.transactions", href: "/transactions" },
    ],
  },
  { label: "nav.how", href: "/how-it-works" },
  { label: "nav.about", href: "/about" },
  { label: "nav.insights", href: "/insights" },
];

function LangSwitcher({ compact = false }) {
  const { lang, setLang } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const current = LANGS.find((l) => l.code === lang) || LANGS[0];
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        className="btn btn-ghost btn-sm gap-1.5 !px-3"
      >
        <Icon name="globe" size={15} />
        <span className="text-xs font-bold">{current.label}</span>
        <Icon name="chevron" size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div
          role="listbox"
          className="glass-strong absolute end-0 mt-2 w-40 overflow-hidden rounded-xl p-1.5 shadow-glass-lg z-50"
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === lang}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                l.code === lang ? "bg-gold-500/15 text-gold-500" : "text-ink hover:bg-line/10"
              }`}
            >
              {l.name}
              {l.code === lang ? <Icon name="check" size={14} /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme, t } = useApp();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? t("common.themeLight") : t("common.themeDark")}
      className="btn btn-ghost btn-sm !px-2.5"
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
    </button>
  );
}

export default function Navbar() {
  const { t } = useApp();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-950"
      >
        <T k="common.skip" />
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled || mobileOpen ? "glass-nav shadow-glass" : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[4.6rem] max-w-[84rem] items-center justify-between gap-4 px-5 sm:px-8" aria-label="Primary">
          <Brand />

          <ul className="hidden items-center gap-0.5 xl:flex" onMouseLeave={() => setOpenDropdown(null)}>
            {MENU.map((item, i) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(i)}
              >
                {item.children ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={openDropdown === i}
                      onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.86rem] font-semibold transition-colors ${
                        openDropdown === i ? "text-gold-500" : "text-ink/80 hover:text-ink"
                      }`}
                    >
                      <T k={item.label} />
                      <Icon name="chevron" size={12} className={`transition-transform ${openDropdown === i ? "rotate-180" : ""}`} />
                    </button>
                    {openDropdown === i ? (
                      <div className="absolute start-0 top-full w-64 pt-2" onMouseEnter={() => setOpenDropdown(i)}>
                        <ul className="glass-strong rounded-xl p-2 shadow-glass-lg">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                className="block rounded-lg px-3.5 py-2.5 text-[0.84rem] font-medium text-muted transition-colors hover:bg-line/10 hover:text-ink"
                              >
                                <T k={c.label} />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-[0.86rem] font-semibold text-ink/80 transition-colors hover:text-ink"
                  >
                    <T k={item.label} />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LangSwitcher />
            </div>
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <Link href="/buyers/request" className="btn btn-gold btn-sm hidden !px-4 lg:inline-flex" data-event='{"event":"cta_header_start_trade"}'>
              <T k="nav.startTrade" />
            </Link>
            <button
              type="button"
              className="btn btn-ghost btn-sm !px-2.5 xl:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={t("nav.menu")}
              onClick={() => setMobileOpen(true)}
            >
              <Icon name="menu" size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileOpen ? (
        <div id="mobile-menu" className="fixed inset-0 z-[60] xl:hidden" role="dialog" aria-modal="true" aria-label={t("nav.menu")}>
          <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="glass-strong absolute end-0 top-0 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto p-6 shadow-glass-lg">
            <div className="flex items-center justify-between">
              <Brand compact />
              <button type="button" className="btn btn-ghost btn-sm !px-2.5" aria-label={t("nav.close")} onClick={() => setMobileOpen(false)}>
                <Icon name="close" size={18} />
              </button>
            </div>
            <ul className="mt-7 space-y-1">
              {MENU.map((item) => (
                <li key={item.label} className="border-b border-line/10 pb-1">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-3 text-base font-bold text-ink"
                        onClick={() => setMobileGroup(mobileGroup === item.label ? null : item.label)}
                        aria-expanded={mobileGroup === item.label}
                      >
                        <T k={item.label} />
                        <Icon name="chevron" size={16} className={`transition-transform ${mobileGroup === item.label ? "rotate-180" : ""}`} />
                      </button>
                      {mobileGroup === item.label ? (
                        <ul className="pb-3 ps-3">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link href={c.href} className="block rounded-lg px-3 py-2.5 text-sm text-muted hover:text-gold-500">
                                <T k={c.label} />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </>
                  ) : (
                    <Link href={item.href} className="block py-3 text-base font-bold text-ink">
                      <T k={item.label} />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-auto space-y-4 pt-8">
              <div className="flex items-center gap-2">
                <LangSwitcher />
                <ThemeToggle />
              </div>
              <Link href="/buyers/request" className="btn btn-gold w-full">
                <T k="nav.startTrade" />
              </Link>
              <Link href="/exporters/apply" className="btn btn-ghost w-full">
                <T k="nav.sub.exporterApply" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile bottom quick bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 xl:hidden">
        <div className="glass-strong mx-auto mb-2 flex w-[calc(100%-1.25rem)] max-w-md items-stretch justify-around rounded-2xl p-1.5 shadow-glass-lg">
          {[
            { href: "/corridors", icon: "route", label: t("nav.corridors") },
            { href: "/buyers", icon: "bank", label: t("nav.buyers") },
            { href: "/exporters", icon: "factory", label: t("nav.exporters") },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[0.66rem] font-semibold text-muted transition-colors"
            >
              <Icon name={l.icon} size={19} />
              <span className="max-w-[5.5rem] truncate">{l.label.replace(/^For /, "")}</span>
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[0.66rem] font-semibold text-gold-500"
            aria-label={t("nav.menu")}
          >
            <Icon name="menu" size={19} />
            <span>{t("nav.menu")}</span>
          </button>
        </div>
      </div>
    </>
  );
}

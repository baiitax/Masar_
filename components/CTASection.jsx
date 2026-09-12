"use client";

import { Container } from "./primitives";
import { useApp } from "./AppProvider";
import Link from "next/link";
import Icon from "./icons";

export default function CTASection({ primary = "general" }) {
  const { t } = useApp();
  const buttons = [
    { key: "buyer", href: "/buyers/request", label: t("cta.buyer"), variant: "gold", event: "cta_buyer_footer" },
    { key: "exporter", href: "/exporters/apply", label: t("cta.exporter"), variant: "navy", event: "cta_exporter_footer" },
    { key: "partner", href: "/strategic-partners", label: t("cta.partner"), variant: "ghost", event: "cta_partner_footer" },
  ];
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="glass-strong relative overflow-hidden rounded-[1.6rem] px-7 py-14 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(620px 300px at 50% -20%, rgba(194,153,75,0.18), transparent 60%)",
            }}
          />
          <p className="eyebrow mb-4 justify-center" style={{ display: "flex" }}>
            <span className="inline-block h-px w-7 bg-gold-500" />
            MASAR
          </p>
          <h2 className="h-display relative mx-auto max-w-3xl text-3xl font-bold text-ink sm:text-[2.5rem]">
            {t("cta.title")}
          </h2>
          <p className="lead relative mx-auto mt-5 max-w-2xl">{t("cta.lead")}</p>
          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3.5">
            {buttons.map((b) => (
              <Link
                key={b.key}
                href={b.href}
                data-event={`{"event":"${b.event}"}`}
                className={`btn ${
                  b.variant === "gold"
                    ? "btn-gold"
                    : b.variant === "navy"
                    ? "btn-navy"
                    : "btn-ghost"
                } ${primary === b.key ? "ring-2 ring-gold-400/40" : ""}`}
              >
                {b.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-ghost">
              {t("cta.general")}
              <Icon name="arrow" size={16} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

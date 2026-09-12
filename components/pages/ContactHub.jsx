"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/icons";
import { GlassCard } from "@/components/primitives";
import LeadForm from "@/components/forms/LeadForm";

const TYPES = [
  { key: "buyer", label: "Buyer", icon: "bank" },
  { key: "exporter", label: "Exporter", icon: "factory" },
  { key: "partner", label: "Partnership", icon: "network" },
  { key: "media", label: "Media", icon: "camera" },
  { key: "investor", label: "Investor / Strategic", icon: "bank" },
  { key: "general", label: "General", icon: "mail" },
];

const ROUTING = [
  ["BUYER", "Saudi buyer development"],
  ["EXPORTER", "Origin operations"],
  ["PARTNER", "Partnerships"],
  ["MEDIA", "Media"],
  ["INVESTOR", "Strategic"],
  ["GENERAL", "General"],
];

export default function ContactHub({ initial = "general" }) {
  const [active, setActive] = useState(TYPES.some((t) => t.key === initial) ? initial : "general");

  return (
    <div>
      <div role="tablist" aria-label="Inquiry type" className="flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={active === t.key}
            onClick={() => setActive(t.key)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
              active === t.key
                ? "border-gold-500/60 bg-gold-500/15 text-gold-500"
                : "border-line/15 text-muted hover:text-ink"
            }`}
          >
            <Icon name={t.icon} size={15} /> {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-8" aria-live="polite">
        {active === "buyer" ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <GlassCard level={4} className="!p-8 sm:!p-10">
              <h2 className="h-display text-2xl font-bold text-ink">Buyer requirements use the structured intake.</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Commodity, specification, grade, quantity, frequency, destination and documentation
                needs route directly to Saudi buyer development and start the verification process.
              </p>
              <Link href="/buyers/request" className="btn btn-gold mt-7">
                Submit buyer requirement <Icon name="arrow" size={15} className="rtl:rotate-180" />
              </Link>
            </GlassCard>
            <GlassCard>
              <p className="text-xs font-bold uppercase tracking-widest text-muted">Routes to</p>
              <p className="mt-2 text-sm font-bold text-ink">Saudi buyer development</p>
              <p className="mt-3 text-xs leading-6 text-muted">Typical response context: assessment of the requirement and any verification needed before sourcing begins.</p>
            </GlassCard>
          </div>
        ) : null}

        {active === "exporter" ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <GlassCard level={4} className="!p-8 sm:!p-10">
              <h2 className="h-display text-2xl font-bold text-ink">Exporters complete structured onboarding.</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Company, capability, compliance and transaction information, with optional secure
                document upload. Verification begins only after application review.
              </p>
              <Link href="/exporters/apply" className="btn btn-navy mt-7">
                Apply as an exporter <Icon name="arrow" size={15} className="rtl:rotate-180" />
              </Link>
            </GlassCard>
            <GlassCard>
              <p className="text-xs font-bold uppercase tracking-widest text-muted">Routes to</p>
              <p className="mt-2 text-sm font-bold text-ink">Origin operations</p>
              <p className="mt-3 text-xs leading-6 text-muted">No applicant is presented as verified until MASAR completes the relevant checks.</p>
            </GlassCard>
          </div>
        ) : null}

        {active === "partner" ? (
          <div className="glass-strong rounded-2xl p-6 sm:p-9">
            <LeadForm type="partner" source="contact-page" />
          </div>
        ) : null}

        {active === "media" ? (
          <div className="glass-strong rounded-2xl p-6 sm:p-9">
            <LeadForm type="media" source="contact-page" />
          </div>
        ) : null}

        {active === "investor" ? (
          <div className="glass-strong rounded-2xl p-6 sm:p-9">
            <LeadForm type="investor" source="contact-page" />
          </div>
        ) : null}

        {active === "general" ? (
          <div className="glass-strong rounded-2xl p-6 sm:p-9">
            <LeadForm type="general" source="contact-page" />
          </div>
        ) : null}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROUTING.map(([type, team]) => (
          <div key={type} className="glass rounded-xl px-4 py-3 text-xs">
            <span className="font-mono font-bold text-gold-500">{type}</span>
            <p className="mt-1 text-muted">{team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { VERIFICATION_STACK, VERIFICATION_STATES } from "@/content/workflow";
import Icon from "@/components/icons";

const stateDot = { verified: "dot-success", pending: "dot-warning", review: "dot-warning", none: "dot-muted" };

export default function VerificationExplorer() {
  const [active, setActive] = useState(0);
  const layer = VERIFICATION_STACK[active];

  return (
    <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
      <div className="glass rounded-2xl p-3">
        <ul className="space-y-1">
          {VERIFICATION_STACK.map((l, i) => (
            <li key={l.key}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-start text-sm font-semibold transition-colors ${
                  active === i ? "bg-gold-500/12 text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <Icon name={l.icon} size={17} className={active === i ? "text-gold-500" : ""} />
                {l.title}
                {active === i ? <Icon name="chevronRight" size={14} className="ms-auto rtl:rotate-180 text-gold-500" /> : null}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="glass-strong rounded-2xl p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-500">
            <Icon name={layer.icon} size={24} />
          </span>
          <h3 className="font-display text-xl font-bold text-ink">{layer.title}</h3>
        </div>
        <p className="mt-5 leading-7 text-muted">{layer.d}</p>

        <h4 className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-ink">Verification states</h4>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {VERIFICATION_STATES.map((s) => (
            <div key={s.key} className="rounded-xl border border-line/12 bg-line/[0.03] p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-ink">
                <span className={`dot ${stateDot[s.tone]}`} /> {s.label}
              </p>
              <p className="mt-1.5 text-xs leading-5 text-muted">{s.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/10 p-4 text-xs leading-6 text-muted">
          <Icon name="shield" size={15} className="mt-0.5 flex-none text-warning" />
          MASAR never displays “Verified” unless the underlying check has actually been performed and
          supported by evidence on file. Public pages do not expose private verification detail.
        </p>
      </div>
    </div>
  );
}

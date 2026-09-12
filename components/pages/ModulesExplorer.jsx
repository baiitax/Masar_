"use client";

import { useState } from "react";
import { PLATFORM_MODULES } from "@/content/platform";
import Icon from "@/components/icons";

export default function ModulesExplorer() {
  const [active, setActive] = useState(0);
  const mod = PLATFORM_MODULES[active];
  return (
    <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
      <ul role="tablist" aria-label="Platform modules" className="space-y-2">
        {PLATFORM_MODULES.map((m, i) => (
          <li key={m.key}>
            <button
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-start transition-all ${
                active === i
                  ? "border-gold-500/50 bg-gold-500/10"
                  : "border-line/12 bg-line/[0.03] hover:border-line/30"
              }`}
            >
              <Icon name={m.icon} size={19} className={active === i ? "text-gold-500" : "text-muted"} />
              <span>
                <span className={`block text-sm font-bold ${active === i ? "text-ink" : "text-ink/80"}`}>{m.title}</span>
                <span className="block text-xs text-muted">{m.summary}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="glass-strong rounded-2xl p-8" role="tabpanel" aria-live="polite">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-500">
            <Icon name={mod.icon} size={24} />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold text-ink">{mod.title}</h3>
            <p className="text-sm font-medium text-gold-500">{mod.summary}</p>
          </div>
        </div>
        <p className="mt-6 text-[0.95rem] leading-7 text-muted">{mod.body}</p>
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {mod.capabilities.map((c, i) => (
            <li key={i} className="flex items-start gap-2.5 rounded-lg border border-line/12 bg-line/[0.03] px-3.5 py-3 text-sm text-ink/85">
              <Icon name="check" size={16} strokeWidth={2.2} className="mt-0.5 flex-none text-success" />
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3 text-xs text-muted">
          <span className="pill"><span className="dot dot-muted" /> Module in development</span>
          <span className="pill"><span className="dot dot-warning" /> Evidence-gated</span>
        </div>
      </div>
    </div>
  );
}

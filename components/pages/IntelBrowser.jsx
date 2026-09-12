"use client";

import { useState } from "react";
import Icon from "@/components/icons";
import { EmptyState, GlassCard, StatusPill } from "@/components/primitives";
import CorridorMap from "@/components/maps/CorridorMap";

export default function IntelBrowser({
  filters,
  columns,
  emptyTitle,
  emptyBody,
  methodology,
  cta,
  mapNote = "Aggregate corridor coverage shown for orientation. Individual records are never shown without verification.",
}) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      <GlassCard className="h-fit lg:sticky lg:top-24">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink">
          <Icon name="search" size={17} className="text-gold-500" /> Filters
        </h2>
        <div className="mt-5 space-y-4">
          {filters.map((f) => (
            <div key={f.name}>
              <label className="field-label" htmlFor={`flt-${f.name}`}>{f.label}</label>
              <select
                id={`flt-${f.name}`}
                className="field-input"
                value={values[f.name] || ""}
                onChange={(e) => {
                  setValues((v) => ({ ...v, [f.name]: e.target.value }));
                  setSubmitted(false);
                }}
              >
                <option value="">Any</option>
                {f.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          ))}
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-navy btn-sm flex-1"
              onClick={() => setSubmitted(true)}
              data-event='{"event":"intel_filter_apply"}'
            >
              Search records
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setValues({});
                setSubmitted(false);
              }}
            >
              Reset
            </button>
          </div>
          <p className="text-[0.72rem] leading-5 text-muted">
            Public results exclude names, contacts, pricing and private commercial information.
          </p>
        </div>
      </GlassCard>

      <div>
        <div className="geo-visual glass mb-6 overflow-hidden rounded-2xl p-2">
          <CorridorMap note={false} labels={false} className="m-0 opacity-90" />
          <p className="px-3 pb-2 pt-1 text-xs text-muted">{mapNote}</p>
        </div>

        <GlassCard>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-base font-bold text-ink">Record results</h2>
            <StatusPill tone="warning">
              <span className="dot dot-warning" /> Evidence-gated directory
            </StatusPill>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  {columns.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
            </table>
            <div className="py-6">
              {submitted ? (
                <EmptyState icon="search" title={emptyTitle}>
                  {emptyBody}
                </EmptyState>
              ) : (
                <EmptyState icon="database" title="Run a filter to check verified records">
                  MASAR does not pre-populate public directories. Records appear only when they have
                  passed evidence review and the data may lawfully be shown.
                </EmptyState>
              )}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="mt-6">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink">
            <Icon name="shield" size={17} className="text-gold-500" /> Methodology & governance
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-6 text-muted">
            {methodology.map((m, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Icon name="check" size={16} strokeWidth={2.2} className="mt-1 flex-none text-success" />
                {m}
              </li>
            ))}
          </ul>
          <div className="mt-6">{cta}</div>
        </GlassCard>
      </div>
    </div>
  );
}

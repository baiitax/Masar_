"use client";

import { useEffect, useRef, useState } from "react";
import { TRANSACTION_STAGES } from "@/content/workflow";
import Icon from "@/components/icons";

export default function TransactionTimeline() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.dataset.idx);
            setActive((cur) => Math.max(cur, idx));
          }
        });
      },
      { threshold: 0.55, rootMargin: "-10% 0px -20% 0px" }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative">
      <div className="absolute bottom-0 start-[1.4rem] top-2 w-px bg-line/20 sm:start-8" aria-hidden="true">
        <div
          className="w-px bg-gradient-to-b from-gold-300 to-gold-600 transition-all duration-700"
          style={{ height: `${((active + 1) / TRANSACTION_STAGES.length) * 100}%` }}
        />
      </div>
      <ol className="space-y-5">
        {TRANSACTION_STAGES.map((s, i) => {
          const reached = i <= active;
          return (
            <li
              key={s.title}
              data-idx={i}
              ref={(el) => (refs.current[i] = el)}
              className="relative ps-14 sm:ps-24"
            >
              <span
                className={`absolute start-0 top-5 flex h-12 w-12 items-center justify-center rounded-full border sm:start-2 ${
                  reached
                    ? "border-gold-500/60 bg-gold-500/15 text-gold-500"
                    : "border-line/25 bg-line/5 text-muted"
                }`}
              >
                <Icon name={s.icon} size={20} />
              </span>
              <div className={`glass rounded-2xl p-6 transition-all duration-500 ${reached ? "card-hover" : "opacity-70"}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs tracking-widest text-gold-500">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted">{s.purpose}</p>
                <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-3">
                  <div className="rounded-lg border border-line/12 bg-line/[0.03] p-3">
                    <dt className="font-bold uppercase tracking-wider text-muted">Entry when</dt>
                    <dd className="mt-1 leading-5 text-ink/80">{s.enterWhen}</dd>
                  </div>
                  <div className="rounded-lg border border-line/12 bg-line/[0.03] p-3">
                    <dt className="font-bold uppercase tracking-wider text-muted">Exit when</dt>
                    <dd className="mt-1 leading-5 text-ink/80">{s.exitWhen}</dd>
                  </div>
                  <div className="rounded-lg border border-line/12 bg-line/[0.03] p-3">
                    <dt className="font-bold uppercase tracking-wider text-muted">Evidence</dt>
                    <dd className="mt-1 leading-5 text-ink/80">{s.evidence}</dd>
                  </div>
                </dl>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

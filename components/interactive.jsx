"use client";

import { useState, useId, useRef } from "react";
import Icon from "./icons";

export function Accordion({ items, defaultOpen = -1, className = "", groupLabel }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${id}-panel-${i}`;
        const btnId = `${id}-btn-${i}`;
        return (
          <div key={i} className="glass rounded-xl2 overflow-hidden">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-4.5 py-5 text-start"
              >
                <span className="font-semibold text-ink text-[0.98rem]">{item.q}</span>
                <Icon
                  name="chevron"
                  size={18}
                  className={`flex-none text-gold-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 sm:px-6 pb-5 text-sm leading-7 text-muted">{item.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Tabs({ tabs, initial = 0, className = "", listClassName = "" }) {
  const [active, setActive] = useState(initial);
  const tablistId = useId();
  return (
    <div className={className}>
      <div role="tablist" aria-label="Sections" className={`flex flex-wrap gap-2 ${listClassName}`}>
        {tabs.map((tab, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              role="tab"
              id={`${tablistId}-tab-${i}`}
              aria-selected={isActive}
              aria-controls={`${tablistId}-panel-${i}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-gold-500/15 border border-gold-500/40 text-gold-500"
                  : "border border-line/15 text-muted hover:text-ink hover:border-line/30"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${tablistId}-panel-${active}`}
        aria-labelledby={`${tablistId}-tab-${active}`}
        className="mt-7"
      >
        {tabs[active].content}
      </div>
    </div>
  );
}

/** Horizontal stage rail with an animated flowing connector and scroll progress */
export function StageRail({ stages, className = "", note }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  function onScroll(e) {
    const el = e.currentTarget;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }

  return (
    <div className={className}>
      <div
        ref={ref}
        onScroll={onScroll}
        className="rail-scroll overflow-x-auto pb-4"
      >
        <ol className="relative flex min-w-max items-stretch gap-0 pe-4 pt-2">
          {stages.map((s, i) => {
            const obj = typeof s === "string" ? { title: s } : s;
            const last = i === stages.length - 1;
            return (
              <li key={i} className="flex items-stretch">
                <div className="w-52 flex-none">
                  <div className="glass card-hover rounded-xl2 p-4 h-full">
                    <p className="font-mono text-[0.7rem] tracking-widest text-gold-500">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1.5 text-sm font-semibold leading-snug text-ink">
                      {obj.title}
                    </p>
                    {obj.body ? (
                      <p className="mt-1.5 text-xs leading-5 text-muted">{obj.body}</p>
                    ) : null}
                  </div>
                </div>
                {!last ? (
                  <div className="relative mx-1 mt-2 w-9 self-start sm:w-12" aria-hidden="true">
                    <div className="absolute top-[2.1rem] h-px w-full bg-line/25" />
                    <div
                      className="absolute top-[2.1rem] h-px w-full overflow-hidden"
                      style={{ opacity: 0.9 }}
                    >
                      <div className="rail-flow h-px w-full" />
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
      <div className="mx-1 h-0.5 max-w-md overflow-hidden rounded-full bg-line/15" aria-hidden="true">
        <div
          className="h-full bg-gold-500 transition-all duration-200"
          style={{ width: `${12 + progress * 88}%` }}
        />
      </div>
      {note ? <p className="mt-3 text-xs text-muted">{note}</p> : null}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Accordion } from "@/components/interactive";

export default function FaqExplorer({ groups }) {
  const [cat, setCat] = useState(groups[0]?.category || "");
  const group = groups.find((g) => g.category === cat) || groups[0];

  return (
    <>
      <div role="tablist" aria-label="FAQ categories" className="flex flex-wrap gap-2">
        {groups.map((g) => (
          <button
            key={g.category}
            role="tab"
            aria-selected={cat === g.category}
            onClick={() => setCat(g.category)}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
              cat === g.category
                ? "border-gold-500/60 bg-gold-500/15 text-gold-500"
                : "border-line/15 text-muted hover:text-ink"
            }`}
          >
            {g.category}
          </button>
        ))}
      </div>
      <Accordion key={group.category} items={group.items.map((i) => ({ q: i.q, a: i.a }))} className="mt-8" />
    </>
  );
}

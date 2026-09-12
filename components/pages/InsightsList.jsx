"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { articles, INSIGHT_CATEGORIES } from "@/content/insights";
import Icon from "@/components/icons";
import { EmptyState } from "@/components/primitives";

export default function InsightsList() {
  const [cat, setCat] = useState("all");
  const list = cat === "all" ? articles : articles.filter((a) => a.category === cat);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCat("all")}
          className={`rounded-lg border px-3.5 py-2 text-sm font-semibold transition-all ${
            cat === "all" ? "border-gold-500/60 bg-gold-500/15 text-gold-500" : "border-line/15 text-muted hover:text-ink"
          }`}
        >
          All
        </button>
        {INSIGHT_CATEGORIES.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setCat(c.key)}
            aria-pressed={cat === c.key}
            className={`rounded-lg border px-3.5 py-2 text-sm font-semibold transition-all ${
              cat === c.key ? "border-gold-500/60 bg-gold-500/15 text-gold-500" : "border-line/15 text-muted hover:text-ink"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="mt-8">
          <EmptyState icon="docs" title="New trade intelligence is being prepared.">
            Research in this category is under source review and will be published once approved.
          </EmptyState>
        </div>
      ) : (
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <Link key={a.slug} href={`/insights/${a.slug}`} className="block h-full">
              <article className="glass card-hover group flex h-full flex-col overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/9]">
                  <Image src={a.image} alt={a.alt || ""} fill sizes="(max-width:768px) 100vw, 400px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                  <span className="absolute start-3 bottom-3 pill !border-white/10 !bg-navy-900/80 !text-white">{a.categoryLabel}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.02rem] font-bold leading-6 text-ink group-hover:text-gold-500">
                    {a.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-xs leading-5 text-muted">{a.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-[0.72rem] text-muted">
                    <span>{new Date(a.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span className="flex items-center gap-1 font-semibold text-gold-500">
                      Read <Icon name="chevronRight" size={13} className="rtl:rotate-180" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

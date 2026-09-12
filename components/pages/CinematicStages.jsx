"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/icons";

export default function CinematicStages({ stages }) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.idx));
        });
      },
      { threshold: 0.4 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* progress line */}
      <div className="absolute inset-y-0 start-[1.75rem] w-px bg-line/20 sm:start-1/2 sm:-translate-x-1/2" aria-hidden="true">
        <div
          className="w-px bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 transition-all duration-700"
          style={{ height: `${((active + 0.6) / stages.length) * 100}%` }}
        />
      </div>

      <ol className="space-y-10 sm:space-y-16">
        {stages.map((s, i) => {
          const reached = i <= active;
          const flip = i % 2 === 1;
          return (
            <li
              key={s.n}
              data-idx={i}
              ref={(el) => (refs.current[i] = el)}
              className={`relative grid items-center gap-6 sm:grid-cols-2 sm:gap-16 ${flip ? "" : ""}`}
            >
              <span
                className={`absolute start-0 top-1 z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 sm:start-1/2 sm:-translate-x-1/2 ${
                  reached
                    ? "border-gold-500 bg-gold-500/15 text-gold-500"
                    : "border-line/30 bg-transparent text-muted"
                }`}
              >
                <Icon name={s.icon} size={24} />
              </span>

              <div className={`ps-20 sm:ps-0 ${flip ? "sm:col-start-2" : "sm:col-start-1 sm:text-end"}`}>
                <div className={`glass card-hover rounded-2xl p-7 ${flip ? "" : "sm:inline-block sm:w-full"}`}>
                  <p className="font-mono text-xs tracking-[0.3em] text-gold-500">
                    {String(s.n).padStart(2, "0")}
                  </p>
                  <h3 className="h-display mt-2 text-xl font-bold text-ink sm:text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{s.body}</p>
                  <ul className={`mt-4 flex flex-wrap gap-2 ${flip ? "" : "sm:justify-end"}`}>
                    {s.outputs.map((o) => (
                      <li key={o} className="pill !normal-case !tracking-normal !text-[0.72rem]">
                        <Icon name="fileCheck" size={12} className="text-success" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

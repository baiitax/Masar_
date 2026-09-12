"use client";

import { useEffect, useState } from "react";
import PreloaderVisual from "./PreloaderVisual";

/**
 * First-load brand preloader.
 *
 * Rendered from the root layout, so it is present (and visible, via SSR) on
 * EVERY page — including the initial load, which app/loading.js never covers.
 * It holds for a short branded beat, then fades out after hydration and is
 * fully unmounted so it never blocks interaction or paints on later renders.
 * Respects prefers-reduced-motion (near-instant dismiss).
 */
export default function Preloader() {
  const [phase, setPhase] = useState("show"); // show -> hide -> gone

  useEffect(() => {
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? 100 : 700;
    const t1 = setTimeout(() => setPhase("hide"), hold);
    const t2 = setTimeout(() => setPhase("gone"), hold + 550);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`preloader ${phase === "hide" ? "preloader-hide" : ""}`}
      role="status"
      aria-live="polite"
    >
      <PreloaderVisual />
      <span className="sr-only">Loading MASAR</span>
    </div>
  );
}

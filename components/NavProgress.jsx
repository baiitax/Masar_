"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Thin gold top progress bar for client-side route transitions.
 *
 * App Router pages are statically prerendered, so app/loading.js rarely gets a
 * chance to paint; this bar activates the moment an internal link is clicked
 * (on every page) and clears when the new route commits.
 */
export default function NavProgress() {
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const first = useRef(true);

  // Navigation committed — hide the bar.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setActive(false);
  }, [pathname]);

  // Detect internal navigation intent.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target instanceof Element ? e.target.closest("a") : null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("/") || href.startsWith("//")) return;
      try {
        if (new URL(a.href, window.location.href).origin !== window.location.origin) return;
      } catch {
        return;
      }
      setActive(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div
      className={`nav-progress ${active ? "nav-progress-active" : ""}`}
      aria-hidden="true"
    />
  );
}

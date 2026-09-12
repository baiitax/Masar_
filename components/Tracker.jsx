"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function queue(event) {
  try {
    const raw = localStorage.getItem("masar-events-queue");
    const q = raw ? JSON.parse(raw) : [];
    q.push({ ...event, at: new Date().toISOString() });
    localStorage.setItem("masar-events-queue", JSON.stringify(q.slice(-100)));
  } catch {
    /* no-op */
  }
}

function send(event) {
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(event)], { type: "application/json" });
      navigator.sendBeacon("/api/event", blob);
    }
  } catch {
    /* offline / blocked — retain local queue only */
  }
  queue(event);
}

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    send({ type: "pageview", path: pathname, lang: document.documentElement.lang });
  }, [pathname]);

  useEffect(() => {
    function onClick(e) {
      const el = e.target.closest?.("[data-event]");
      if (!el) return;
      let payload;
      try {
        payload = JSON.parse(el.dataset.event);
      } catch {
        return;
      }
      send({ type: payload.event || "click", ...payload, path: pathname });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}

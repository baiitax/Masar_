"use client";

import { createContext, useContext, useEffect, useState } from "react";
import en from "@/content/i18n/en";
import ar from "@/content/i18n/ar";
import fr from "@/content/i18n/fr";

const dicts = { en, ar, fr };
export const LANGS = [
  { code: "en", label: "EN", name: "English" },
  { code: "ar", label: "العربية", name: "العربية" },
  { code: "fr", label: "FR", name: "Français" },
];

const AppCtx = createContext(null);

function getPath(obj, path) {
  return path.split(".").reduce((cur, k) => (cur == null ? cur : cur[k]), obj);
}

export function AppProvider({ children }) {
  const [lang, setLangState] = useState("en");
  const [theme, setThemeState] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const l = localStorage.getItem("masar-lang") || "en";
      const th = localStorage.getItem("masar-theme") || "dark";
      setLangState(dicts[l] ? l : "en");
      setThemeState(th === "light" ? "light" : "dark");
      const dir = (dicts[l] || en).meta.dir;
      document.documentElement.lang = dicts[l] ? l : "en";
      document.documentElement.dir = dir;
    } catch {
      /* no-op */
    }
    setMounted(true);
  }, []);

  const setLang = (l) => {
    if (!dicts[l]) return;
    setLangState(l);
    try {
      localStorage.setItem("masar-lang", l);
    } catch {
      /* no-op */
    }
    document.documentElement.lang = l;
    document.documentElement.dir = dicts[l].meta.dir;
    document.dispatchEvent(new CustomEvent("masar:langchange", { detail: l }));
  };

  const applyTheme = (th) => {
    document.documentElement.classList.toggle("dark", th === "dark");
    document.documentElement.classList.toggle("light", th === "light");
  };

  const setTheme = (th) => {
    const next = th === "light" ? "light" : "dark";
    setThemeState(next);
    applyTheme(next);
    try {
      localStorage.setItem("masar-theme", next);
    } catch {
      /* no-op */
    }
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const t = (path) => {
    let cur = getPath(dicts[lang], path);
    if (typeof cur !== "string" && typeof cur !== "number") {
      cur = getPath(en, path);
    }
    return typeof cur === "string" || typeof cur === "number" ? cur : path;
  };

  const dict = dicts[lang] || en;

  return (
    <AppCtx.Provider
      value={{ lang, setLang, theme, setTheme, toggleTheme, t, dict, mounted, LANGS }}
    >
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

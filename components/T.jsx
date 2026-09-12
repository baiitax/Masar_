"use client";

import { useApp } from "./AppProvider";

/** Translate a dotted dictionary key inside a server-rendered tree. */
export default function T({ k }) {
  const { t } = useApp();
  return <>{t(k)}</>;
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["new", "contacted", "qualified", "matched", "in-transaction", "closed", "disqualified"];

export default function StatusForm({ reference, current }) {
  const router = useRouter();
  const [status, setStatus] = useState(current);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/ops/lead-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, status }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setMsg(data.error || "Update failed.");
      } else {
        setMsg("Updated.");
        router.refresh();
      }
    } catch {
      setMsg("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-wrap items-center gap-3">
      <label htmlFor={`st-${reference}`} className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
        Pipeline status
      </label>
      <select
        id={`st-${reference}`}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-xl border border-line/20 bg-line/[0.04] px-3 py-2 text-sm text-ink outline-none focus:border-gold-500/60"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <button type="submit" disabled={busy} className="btn btn-gold">
        {busy ? "Saving…" : "Save"}
      </button>
      {msg && <span role="status" className="text-xs text-muted">{msg}</span>}
    </form>
  );
}

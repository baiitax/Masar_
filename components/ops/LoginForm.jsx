"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/ops/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Sign-in failed.");
        return;
      }
      router.push("/portal/masar");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="ops-email" className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Operator email
        </label>
        <input
          id="ops-email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-line/20 bg-line/[0.04] px-4 py-2.5 text-sm text-ink outline-none focus:border-gold-500/60"
        />
      </div>
      <div>
        <label htmlFor="ops-code" className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Access code
        </label>
        <input
          id="ops-code"
          type="password"
          required
          autoComplete="current-password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-line/20 bg-line/[0.04] px-4 py-2.5 text-sm text-ink outline-none focus:border-gold-500/60"
        />
      </div>
      {error && (
        <p role="alert" className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-xs text-danger">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className="btn btn-gold w-full justify-center">
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

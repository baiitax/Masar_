import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession, opsConfigured } from "@/lib/ops-auth";

// Env-dependent guard must run per request, never from a build-time static
// prerender (env is absent during `next build`).
export const dynamic = "force-dynamic";

export const metadata = { title: "MASAR Ops Portal", robots: { index: false, follow: false } };

export default function OpsLayout({ children }) {
  if (!opsConfigured()) {
    return (
      <main className="mx-auto max-w-md px-5 pt-36 text-center">
        <div className="glass rounded-2xl p-8">
          <h1 className="h-display text-xl font-bold text-ink">Ops portal not configured</h1>
          <p className="mt-3 text-sm text-muted">
            Set OPS_SECRET, OPERATOR_EMAILS and OPERATOR_ACCESS_CODE to enable the internal portal.
          </p>
        </div>
      </main>
    );
  }
  const session = getSession();
  if (!session) redirect("/portal/login");

  return (
    <main className="mx-auto max-w-[84rem] px-5 pb-24 pt-28 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">MASAR Ops</p>
          <h1 className="h-display mt-1 text-2xl font-bold text-ink">Transaction CRM</h1>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted">{session.email}</span>
          <nav className="flex gap-3">
            <Link href="/portal/masar" className="font-semibold text-gold-500 hover:underline">Pipeline</Link>
            <Link href="/portal/masar/documents" className="font-semibold text-muted hover:text-gold-500">Documents</Link>
            <Link href="/portal/masar/audit" className="font-semibold text-muted hover:text-gold-500">Audit</Link>
          </nav>
          <a href="/api/ops/logout" className="text-muted hover:text-danger">Sign out</a>
        </div>
      </div>
      <div className="mt-8">{children}</div>
    </main>
  );
}

import Link from "next/link";
import { dbAvailable, ensureSchema, listLeads } from "@/lib/db";

const COLUMNS = ["new", "contacted", "qualified", "matched", "in-transaction", "closed"];

export default async function OpsDashboard() {
  if (!dbAvailable()) {
    return (
      <div className="glass rounded-2xl p-8 text-sm text-muted">
        Database not configured on this deployment — the pipeline is empty until Neon env vars are present.
      </div>
    );
  }
  const ready = await ensureSchema();
  if (!ready) {
    return <div className="glass rounded-2xl p-8 text-sm text-muted">Database unreachable.</div>;
  }
  const leads = await listLeads({ limit: 500 });

  const byStatus = {};
  for (const col of COLUMNS) byStatus[col] = [];
  for (const l of leads) (byStatus[l.status] || (byStatus[l.status] = [])).push(l);

  const stats = [
    ["Total leads", leads.length],
    ["New", (byStatus["new"] || []).length],
    ["Qualified", (byStatus["qualified"] || []).length],
    ["In transaction", (byStatus["in-transaction"] || []).length],
  ];

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="glass rounded-xl px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-ink">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {COLUMNS.map((col) => (
          <section key={col} aria-label={col}>
            <h2 className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-muted">
              {col} <span className="text-gold-500">{(byStatus[col] || []).length}</span>
            </h2>
            <div className="mt-3 space-y-3">
              {(byStatus[col] || []).map((l) => (
                <Link key={l.reference} href={`/portal/masar/leads/${l.reference}`} className="block">
                  <div className="glass hover:border-gold-500/40 rounded-xl p-4 transition-colors">
                    <p className="font-mono text-xs font-bold text-gold-500">{l.reference}</p>
                    <p className="mt-1 text-sm font-semibold text-ink">{l.type}</p>
                    <p className="mt-1 text-xs text-muted">
                      {l.scoring ? `score ${l.scoring.score ?? "?"}/${l.scoring.grade ?? ""}` : "unscored"}
                    </p>
                    <p className="mt-1 truncate text-xs text-muted">
                      {l.payload?.companyName || l.payload?.name || "—"}
                    </p>
                    <p className="mt-2 text-[0.65rem] text-muted/70">
                      {new Date(l.received_at).toLocaleDateString()} · {l.assigned_team}
                    </p>
                  </div>
                </Link>
              ))}
              {!(byStatus[col] || []).length && (
                <p className="rounded-xl border border-dashed border-line/20 p-4 text-center text-xs text-muted/60">
                  empty
                </p>
              )}
            </div>
          </section>
        ))}
      </div>
      {(byStatus["disqualified"] || []).length > 0 && (
        <p className="mt-6 text-xs text-muted">
          Disqualified: {(byStatus["disqualified"] || []).map((l) => l.reference).join(", ")}
        </p>
      )}
    </>
  );
}

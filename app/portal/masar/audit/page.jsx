import { dbAvailable, ensureSchema, listAudit } from "@/lib/db";

export const metadata = { robots: { index: false, follow: false } };

export default async function OpsAudit() {
  if (!dbAvailable() || !(await ensureSchema())) {
    return <div className="glass rounded-2xl p-8 text-sm text-muted">Database not configured.</div>;
  }
  const rows = await listAudit(150);
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
        Audit log — attributable decisions
      </h2>
      {rows.length === 0 && <p className="mt-4 text-sm text-muted/70">No audit entries yet.</p>}
      <ul className="mt-4 divide-y divide-line/10">
        {rows.map((a) => (
          <li key={a.id} className="py-3 text-sm">
            <span className="font-semibold text-ink">{a.actor}</span>{" "}
            <span className="text-gold-500">{a.action}</span>{" "}
            <span className="text-muted">
              on {a.entity_type} {a.entity_id || ""} · {new Date(a.at).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

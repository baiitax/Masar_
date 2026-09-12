import { dbAvailable, ensureSchema, listRecentDocuments } from "@/lib/db";

export const metadata = { robots: { index: false, follow: false } };

export default async function OpsDocuments() {
  if (!dbAvailable() || !(await ensureSchema())) {
    return <div className="glass rounded-2xl p-8 text-sm text-muted">Database not configured.</div>;
  }
  const docs = await listRecentDocuments(100);
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Upload queue</h2>
      {docs.length === 0 && <p className="mt-4 text-sm text-muted/70">No documents uploaded yet.</p>}
      <ul className="mt-4 divide-y divide-line/10">
        {docs.map((d) => (
          <li key={d.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
            <span className="font-semibold text-ink">{d.name}</span>
            <span className="text-xs text-muted">
              {d.reference} · {d.field} · {d.size} B · {d.mime} · AV {d.av_status} ·{" "}
              {new Date(d.stored_at).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

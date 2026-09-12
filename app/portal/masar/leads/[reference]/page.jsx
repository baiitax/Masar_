import { notFound } from "next/navigation";
import { dbAvailable, ensureSchema, leadByReference, listDocuments, listAuditFor } from "@/lib/db";
import StatusForm from "@/components/ops/StatusForm";

export const metadata = { robots: { index: false, follow: false } };

const FIELD_LABELS = {
  companyName: "Company",
  country: "Country",
  contactPerson: "Contact",
  name: "Name",
  email: "Email",
  phone: "Phone",
  role: "Role",
  commodity: "Commodity",
  commodities: "Commodities",
  quantity: "Quantity",
  typicalVolume: "Typical volume",
  unit: "Unit",
  frequency: "Frequency",
  destination: "Destination",
  deliveryPeriod: "Delivery period",
  productSpecification: "Specification",
  message: "Message",
  subject: "Subject",
};

export default async function LeadWorkspace({ params }) {
  if (!dbAvailable() || !(await ensureSchema())) {
    return <div className="glass rounded-2xl p-8 text-sm text-muted">Database not configured.</div>;
  }
  const lead = await leadByReference(params.reference);
  if (!lead) notFound();
  const docs = await listDocuments(lead.reference);
  const audit = await listAuditFor(lead.reference, 20);

  const payloadEntries = Object.entries(lead.payload || {}).filter(
    ([k, v]) => v !== "" && v != null && k !== "website_hp"
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        <div className="glass-strong rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-sm font-bold text-gold-500">{lead.reference}</p>
              <h2 className="h-display mt-1 text-xl font-bold text-ink">
                {lead.payload?.companyName || lead.payload?.name || lead.type}
              </h2>
              <p className="mt-1 text-xs text-muted">
                {lead.type} · {lead.assigned_team} · received{" "}
                {new Date(lead.received_at).toLocaleString()} · lang {lead.lang}
              </p>
            </div>
            <StatusForm reference={lead.reference} current={lead.status} />
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Intake payload</h3>
          <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {payloadEntries.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted/80">
                  {FIELD_LABELS[k] || k}
                </dt>
                <dd className="mt-0.5 whitespace-pre-wrap text-sm text-ink/90">
                  {Array.isArray(v) ? v.join(", ") : String(v)}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {lead.scoring && (
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Internal scoring — never public
            </h3>
            <p className="mt-3 font-display text-2xl font-bold text-ink">
              {lead.scoring.score} <span className="text-gold-500">/ {lead.scoring.grade}</span>
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {Object.entries(lead.scoring.dimensions || {}).map(([k, v]) => (
                <li key={k} className="flex justify-between rounded-lg border border-line/12 bg-line/[0.03] px-3 py-2 text-xs text-muted">
                  <span>{k.replace(/_/g, " ")}</span>
                  <span className="font-bold text-ink">+{v}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Documents</h3>
          {docs.length === 0 && <p className="mt-3 text-sm text-muted/70">No uploads for this lead.</p>}
          <ul className="mt-3 space-y-2">
            {docs.map((d) => (
              <li key={d.id} className="rounded-lg border border-line/12 bg-line/[0.03] px-3 py-2 text-xs text-muted">
                <span className="font-semibold text-ink">{d.name}</span> · {d.size} B · {d.mime} ·{" "}
                {new Date(d.stored_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Audit trail</h3>
          {audit.length === 0 && <p className="mt-3 text-sm text-muted/70">No actions recorded yet.</p>}
          <ul className="mt-3 space-y-2">
            {audit.map((a) => (
              <li key={a.id} className="rounded-lg border border-line/12 bg-line/[0.03] px-3 py-2 text-xs text-muted">
                <span className="font-semibold text-ink">{a.actor}</span> · {a.action} ·{" "}
                {new Date(a.at).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useRef, useState } from "react";
import { FORM_SCHEMAS } from "@/content/forms";
import { commodities } from "@/content/commodities";
import Icon from "@/components/icons";
import { useApp } from "@/components/AppProvider";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_FILE = 8 * 1024 * 1024;
const ACCEPT = ".pdf,.jpg,.jpeg,.png,.doc,.docx";

export default function LeadForm({
  type = "general",
  source = "",
  defaultValues = {},
  className = "",
}) {
  const schema = FORM_SCHEMAS[type] || FORM_SCHEMAS.general;
  const { t } = useApp();
  const [values, setValues] = useState(() => {
    const init = { ...defaultValues };
    schema.groups.forEach((g) =>
      g.fields.forEach((f) => {
        if (f.type === "checkboxes" && !init[f.name]) init[f.name] = [];
      })
    );
    return init;
  });
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | error | success
  const [result, setResult] = useState(null);
  const [started, setStarted] = useState(false);
  const formRef = useRef(null);

  const commodityOptions = useMemo(
    () => [...commodities.filter((c) => c.slug !== "other").map((c) => c.name), "Other verified agricultural product"],
    []
  );

  function fireEvent(name, extra = {}) {
    document.dispatchEvent(
      new CustomEvent("masar:form-event", { detail: { event: name, type: schema.type, ...extra } })
    );
  }

  function markStart() {
    if (!started) {
      setStarted(true);
      fireEvent(
        schema.type === "BUYER" ? "buyer_request_start" : schema.type === "EXPORTER" ? "exporter_application_start" : "form_start"
      );
    }
  }

  function setField(name, value) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  }

  function toggleCheckbox(name, option) {
    markStart();
    const cur = values[name] || [];
    setField(
      name,
      cur.includes(option) ? cur.filter((x) => x !== option) : [...cur, option]
    );
  }

  function onFiles(name, fileList) {
    markStart();
    const arr = Array.from(fileList || []);
    const bad = arr.find((f) => f.size > MAX_FILE || !/\.(pdf|jpe?g|png|docx?)$/i.test(f.name));
    if (bad) {
      setErrors((e) => ({ ...e, [name]: "Files must be PDF, JPG, PNG or DOC/DOCX and no larger than 8 MB each." }));
      return;
    }
    setFiles((f) => ({ ...f, [name]: arr }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  }

  function validate() {
    const next = {};
    schema.groups.forEach((g) =>
      g.fields.forEach((f) => {
        const val = values[f.name];
        if (f.required) {
          if (f.type === "checkboxes" && (!val || !val.length)) next[f.name] = "Select at least one option.";
          else if (f.type === "files") return;
          else if (!val || !String(val).trim()) next[f.name] = "This field is required.";
        }
        if (val && f.type === "email" && !EMAIL_RE.test(String(val).trim())) {
          next[f.name] = "Enter a valid business email address.";
        }
        if (val && f.type === "url") {
          const s = String(val).trim();
          if (s && !/^https?:\/\/.+\..+/.test(s)) next[f.name] = "Enter a valid URL including https://";
        }
        if (typeof val === "string" && val.length > 4000) next[f.name] = "Value too long.";
      })
    );
    return next;
  }

  async function onSubmit(e) {
    e.preventDefault();
    markStart();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      const first = formRef.current.querySelector("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const payload = {};
      Object.entries(values).forEach(([k, v]) => {
        if (Array.isArray(v)) payload[k] = v;
        else if (typeof v === "string") payload[k] = v.trim();
        else if (v != null) payload[k] = v;
      });
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: schema.type,
          source,
          lang: document.documentElement.lang,
          path: window.location.pathname,
          payload,
          website: values.website_hp || "",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || "submission failed");

      // Document upload (optional second step, tied to lead reference)
      const uploads = Object.entries(files).filter(([, arr]) => arr && arr.length);
      for (const [fieldName, arr] of uploads) {
        const fd = new FormData();
        fd.append("reference", data.reference);
        fd.append("field", fieldName);
        arr.forEach((f) => fd.append("files", f));
        try {
          await fetch("/api/upload", { method: "POST", body: fd });
        } catch {
          data.attachmentWarning = true;
        }
      }

      fireEvent(
        schema.type === "BUYER"
          ? "buyer_request_complete"
          : schema.type === "EXPORTER"
          ? "exporter_application_complete"
          : "form_complete",
        { commodity: payload.commodity || (payload.commodities || []).join(","), destination: payload.destination || payload.country || "" }
      );
      setResult(data);
      setStatus("success");
      window.scrollTo({ top: formRef.current.offsetTop - 120, behavior: "smooth" });
    } catch (err) {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass-strong rounded-2xl p-8 sm:p-10 text-center" role="status" aria-live="polite">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
          <Icon name="checkCircle" size={28} />
        </div>
        <h2 className="h-display mt-5 text-2xl font-bold text-ink">{schema.successTitle}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted">
          Your reference is <span className="font-mono font-semibold text-gold-500">{result.reference}</span>.
          The MASAR team may request additional verification before processing. Keep this reference for your records.
        </p>
        {result.attachmentWarning ? (
          <p className="mx-auto mt-3 max-w-md text-xs text-warning">
            Your form was received, but one or more attachments could not be uploaded. The team will request documents directly if required.
          </p>
        ) : null}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href="/corridors/nigeria-saudi" className="btn btn-gold">Explore the corridor</a>
          <a href="/" className="btn btn-ghost">Return home</a>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onFocusCapture={markStart}
      noValidate
      className={className}
      aria-label={schema.title}
    >
      {schema.groups.map((group, gi) => (
        <fieldset key={gi} className="fieldset-glass mb-6">
          <legend className="mb-4 px-2 font-display text-base font-bold text-ink">{group.title}</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            {group.fields.map((f) => {
              const width =
                f.width === "full" ? "sm:col-span-2" : f.width === "third" ? "sm:col-span-1" : "sm:col-span-1";
              const err = errors[f.name];
              const id = `f-${type}-${f.name}`;
              return (
                <div key={f.name} className={width + (f.width === "full" ? "" : "")}>
                  {f.type === "checkboxes" ? (
                    <div>
                      <p className="field-label">
                        {f.label}
                        {f.required ? <span className="text-gold-500"> *</span> : null}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {f.options.map((opt) => {
                          const active = (values[f.name] || []).includes(opt);
                          return (
                            <button
                              type="button"
                              key={opt}
                              aria-pressed={active}
                              onClick={() => toggleCheckbox(f.name, opt)}
                              className={`rounded-lg border px-3 py-1.5 text-[0.82rem] font-medium transition-all ${
                                active
                                  ? "border-gold-500/60 bg-gold-500/15 text-gold-500"
                                  : "border-line/20 text-muted hover:border-line/40 hover:text-ink"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {err ? <p className="field-hint text-danger" id={`${id}-err`}>{err}</p> : null}
                    </div>
                  ) : f.type === "files" ? (
                    <div>
                      <label className="field-label" htmlFor={id}>{f.label}</label>
                      <label
                        htmlFor={id}
                        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line/30 bg-line/5 px-4 py-7 text-center transition-colors hover:border-gold-500/50"
                      >
                        <Icon name="upload" size={22} className="text-gold-500" />
                        <span className="text-xs text-muted">
                          {files[f.name]?.length
                            ? files[f.name].map((x) => x.name).join(", ")
                            : "Click to attach files"}
                        </span>
                      </label>
                      <input
                        id={id}
                        type="file"
                        className="sr-only"
                        accept={ACCEPT}
                        multiple
                        onChange={(e) => onFiles(f.name, e.target.files)}
                      />
                      {err ? <p className="field-hint text-danger">{err}</p> : null}
                    </div>
                  ) : (
                    <div>
                      <label className="field-label" htmlFor={id}>
                        {f.label}
                        {f.required ? <span className="text-gold-500"> *</span> : null}
                      </label>
                      {f.type === "select" ? (
                        <select
                          id={id}
                          className="field-input"
                          value={values[f.name] || ""}
                          aria-invalid={!!err}
                          aria-describedby={err ? `${id}-err` : undefined}
                          onChange={(e) => setField(f.name, e.target.value)}
                        >
                          <option value="" disabled>Select…</option>
                          {f.options.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      ) : f.type === "commodity-select" ? (
                        <select
                          id={id}
                          className="field-input"
                          value={values[f.name] || ""}
                          required={f.required}
                          aria-invalid={!!err}
                          aria-describedby={err ? `${id}-err` : undefined}
                          onChange={(e) => {
                            setField(f.name, e.target.value);
                            fireEvent("buyer_commodity_selected", { commodity: e.target.value });
                          }}
                        >
                          <option value="" disabled>Select a commodity…</option>
                          {commodityOptions.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      ) : f.type === "textarea" ? (
                        <textarea
                          id={id}
                          rows={4}
                          className="field-input"
                          placeholder={f.placeholder || ""}
                          value={values[f.name] || ""}
                          aria-invalid={!!err}
                          aria-describedby={err ? `${id}-err` : undefined}
                          onChange={(e) => setField(f.name, e.target.value)}
                        />
                      ) : (
                        <input
                          id={id}
                          type={f.type}
                          className="field-input"
                          placeholder={f.placeholder || ""}
                          value={values[f.name] || ""}
                          inputMode={f.type === "tel" ? "tel" : undefined}
                          aria-invalid={!!err}
                          aria-describedby={err ? `${id}-err` : undefined}
                          onChange={(e) => setField(f.name, e.target.value)}
                        />
                      )}
                      {err ? (
                        <p className="field-hint text-danger" id={`${id}-err`} role="alert">{err}</p>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </fieldset>
      ))}

      {/* Honeypot — hidden from users and assistive tech */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website_hp">Do not fill this field</label>
        <input
          id="website_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website_hp || ""}
          onChange={(e) => setField("website_hp", e.target.value)}
        />
      </div>

      {schema.note ? (
        <div className="mb-6 flex gap-3 rounded-xl border border-line/15 bg-line/5 p-4 text-xs leading-6 text-muted">
          <Icon name="shield" size={16} className="mt-0.5 flex-none text-gold-500" />
          <p>{schema.note}</p>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mb-5 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-ink" role="alert">
          <p className="font-semibold">Something interrupted the transaction request.</p>
          <p className="mt-1 text-muted">
            We could not complete the request. Your information has not been submitted unless confirmation is shown.
          </p>
        </div>
      ) : null}

      <button
        type="submit"
        className="btn btn-gold w-full sm:w-auto"
        disabled={status === "submitting"}
        data-event={type === "buyer" ? '{"event":"buyer_request_submit_click"}' : type === "exporter" ? '{"event":"exporter_application_submit_click"}' : '{"event":"lead_form_submit_click"}'}
      >
        {status === "submitting" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-950/30 border-t-navy-950" aria-hidden="true" />
            {t("common.sending")}
          </>
        ) : (
          <>
            {schema.title}
            <Icon name="arrow" size={16} className="rtl:rotate-180" />
          </>
        )}
      </button>
    </form>
  );
}

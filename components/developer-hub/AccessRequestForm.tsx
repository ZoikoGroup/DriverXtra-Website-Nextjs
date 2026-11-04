"use client";

import { useState } from "react";
import { Check, ChevronDown, ClipboardCheck, Pencil, RotateCcw } from "lucide-react";
import { capabilities, environments } from "./data";

type Field = "organization" | "email" | "capability" | "environment" | "purpose" | "consent";
type Values = { organization: string; email: string; capability: string; environment: string; purpose: string; consent: boolean; updates: boolean };

const empty: Values = { organization: "", email: "", capability: "", environment: "", purpose: "", consent: false, updates: false };

// Long opaque strings or common key prefixes look like credentials, which must never be pasted here.
const looksLikeSecret = (s: string) => /\b(sk|pk|rk)_[a-z]*_?[A-Za-z0-9]{8,}|bearer\s+\S{10,}|[A-Za-z0-9_\-+/=]{32,}/i.test(s);

/** Demo access-review request — validated in the browser, nothing is sent. */
export default function AccessRequestForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof Values>(field: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<Field, string>> = {};
    if (!values.organization.trim()) next.organization = "Enter your organization's legal name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) next.email = "Enter a valid work email.";
    if (!values.capability) next.capability = "Choose the capability you need.";
    if (!values.environment) next.environment = "Choose an environment.";
    if (!values.purpose.trim()) next.purpose = "Describe the data flow you want to build.";
    else if (looksLikeSecret(values.purpose)) next.purpose = "This looks like a key or token. Remove it — never share credentials here.";
    if (!values.consent) next.consent = "Confirm you understand how this request is used.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSaved(true);
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setSaved(false);
  };

  const control = (error?: string) =>
    `w-full rounded-lg border bg-white text-sm text-ink transition-colors placeholder:text-slate-400 focus:ring-2 focus:ring-brand/40 focus:outline-none ${
      error ? "border-red-400" : "border-slate-300 hover:border-ink"
    }`;
  const error = (field: Field) => errors[field] && <p className="mt-1.5 animate-fade-up text-xs text-red-600">{errors[field]}</p>;
  const card = "rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.35)] sm:p-6";

  if (saved) {
    const rows: [string, string][] = [
      ["Organization", values.organization.trim()],
      ["Work email", values.email.trim()],
      ["Capability", values.capability],
      ["Environment", values.environment],
      ["Optional updates", values.updates ? "Yes" : "No"],
    ];
    return (
      <div className={`animate-fade-up ${card}`}>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 animate-pop place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <ClipboardCheck className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-[15px] font-bold text-ink">Demo request recorded</h3>
            <p className="text-xs text-slate-500">In a live service it would be routed to the right owner. Nothing was sent, and no access has been issued.</p>
          </div>
        </div>
        <dl className="mt-5 divide-y divide-slate-100 border-y border-slate-100">
          {rows.map(([label, value], i) => (
            <div key={label} className="grid animate-fade-up gap-1 py-2.5 text-[13px] sm:grid-cols-[150px_1fr]" style={{ animationDelay: `${i * 70}ms` }}>
              <dt className="font-semibold text-slate-500">{label}</dt>
              <dd className="flex gap-2 text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span className="break-words">{value}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button type="button" onClick={() => setSaved(false)} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-ink">
            <Pencil className="h-4 w-4 transition-transform group-hover:-rotate-12" /> Edit request
          </button>
          <button type="button" onClick={reset} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-ink">
            <RotateCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" /> Start again
          </button>
        </div>
      </div>
    );
  }

  const select = (field: "capability" | "environment", id: string, options: string[]) => (
    <span className="relative mt-2 block">
      <select
        id={id}
        value={values[field]}
        onChange={(e) => set(field, e.target.value)}
        aria-invalid={!!errors[field]}
        className={`${control(errors[field])} h-11 cursor-pointer appearance-none pr-9 pl-3`}
      >
        <option value="">Choose</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </span>
  );

  return (
    <form noValidate onSubmit={submit} className={`space-y-4 ${card}`}>
      <div>
        <label htmlFor="dh-org" className="text-[13px] font-semibold text-ink">
          Organization (legal name)
        </label>
        <input
          id="dh-org"
          type="text"
          autoComplete="organization"
          value={values.organization}
          onChange={(e) => set("organization", e.target.value)}
          aria-invalid={!!errors.organization}
          className={`${control(errors.organization)} mt-2 h-11 px-3`}
        />
        {error("organization")}
      </div>
      <div>
        <label htmlFor="dh-email" className="text-[13px] font-semibold text-ink">
          Work email
        </label>
        <input
          id="dh-email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          aria-invalid={!!errors.email}
          className={`${control(errors.email)} mt-2 h-11 px-3`}
        />
        {error("email")}
      </div>
      <div>
        <label htmlFor="dh-capability" className="text-[13px] font-semibold text-ink">
          Capability
        </label>
        {select("capability", "dh-capability", capabilities)}
        {error("capability")}
      </div>
      <div>
        <label htmlFor="dh-environment" className="text-[13px] font-semibold text-ink">
          Environment intent
        </label>
        {select("environment", "dh-environment", environments)}
        {error("environment")}
      </div>
      <div>
        <label htmlFor="dh-purpose" className="text-[13px] font-semibold text-ink">
          Purpose
        </label>
        <textarea
          id="dh-purpose"
          rows={3}
          maxLength={600}
          value={values.purpose}
          onChange={(e) => set("purpose", e.target.value)}
          aria-invalid={!!errors.purpose}
          className={`${control(errors.purpose)} mt-2 block min-h-[80px] resize-y px-3 py-2.5`}
        />
        {errors.purpose ? error("purpose") : <p className="mt-1.5 text-xs text-slate-500">Describe the data flow. No keys, tokens or personal data.</p>}
      </div>

      <label
        className={`flex cursor-pointer gap-3 rounded-lg border p-3 text-[13px] text-slate-700 transition-colors ${
          errors.consent ? "border-red-400" : "border-slate-200 hover:border-slate-400"
        }`}
      >
        <input type="checkbox" checked={values.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#ffc20e]" />
        I understand this request will be used to review technical access for my organization.
      </label>
      {error("consent")}
      <label className="flex cursor-pointer gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-[13px] text-slate-700 transition-colors hover:border-slate-400">
        <input type="checkbox" checked={values.updates} onChange={(e) => set("updates", e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#ffc20e]" />
        I agree to receive optional updates. My operational request is handled separately.
      </label>

      <button
        type="submit"
        className="btn-shine h-11 w-full rounded-full bg-brand text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
      >
        Request technical access review
      </button>
    </form>
  );
}

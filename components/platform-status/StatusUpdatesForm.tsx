"use client";

import { useState } from "react";
import { Check, MailCheck, Pencil } from "lucide-react";
import { serviceGroups } from "./data";

const services = serviceGroups.flatMap((g) => g.services.map((s) => s.name));
const noticeTypes = ["Incidents", "Planned maintenance"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = { email?: boolean; services?: boolean; notices?: boolean; consent?: boolean };

function Box({ label, checked, onChange, invalid }: { label: string; checked: boolean; onChange: () => void; invalid?: boolean }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 py-1.5 text-[13px] text-ink">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={`grid h-4 w-4 shrink-0 place-items-center rounded border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand/50 ${
          checked ? "border-ink bg-ink text-brand" : invalid ? "border-red-400 bg-white" : "border-slate-400 bg-white group-hover:border-ink"
        }`}
      >
        {checked && <Check className="h-3 w-3 animate-pop" strokeWidth={3} />}
      </span>
      {label}
    </label>
  );
}

/** Email-only status subscription; nothing is sent until the address is verified. */
export default function StatusUpdatesForm() {
  const [email, setEmail] = useState("");
  const [chosen, setChosen] = useState<string[]>([]);
  const [notices, setNotices] = useState<string[]>(["Incidents"]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const toggle = (list: string[], set: (v: string[]) => void, value: string, key: keyof Errors) => {
    set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
    setErrors((e) => ({ ...e, [key]: false }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = { email: !EMAIL.test(email.trim()), services: chosen.length === 0, notices: notices.length === 0, consent: !consent };
    setErrors(next);
    if (!Object.values(next).some(Boolean)) setSent(true);
  };

  const card = "rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.35)] sm:p-6";

  if (sent) {
    return (
      <div className={`animate-fade-up text-center ${card}`}>
        <span className="mx-auto grid h-12 w-12 animate-pop place-items-center rounded-full bg-brand-light text-gold">
          <MailCheck className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-[16px] font-bold text-ink">Check your inbox</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
          We&apos;ve sent a verification link to <strong className="font-semibold text-ink">{email.trim()}</strong>. Nothing is sent until you confirm it.
        </p>
        <p className="mt-3 text-[12px] text-slate-500">
          {chosen.length} {chosen.length === 1 ? "service" : "services"} · {notices.join(" and ")}
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-ink"
        >
          <Pencil className="h-4 w-4 transition-transform group-hover:-rotate-12" /> Change choices
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className={card}>
      <label htmlFor="status-email" className="text-[12px] font-semibold text-ink">
        Email
      </label>
      <input
        id="status-email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((er) => ({ ...er, email: false }));
        }}
        aria-invalid={errors.email}
        className={`mt-1.5 h-11 w-full rounded-lg border bg-white px-3 text-sm text-ink transition-colors focus:ring-2 focus:ring-brand/40 focus:outline-none ${
          errors.email ? "border-red-400" : "border-slate-300 hover:border-ink"
        }`}
      />
      {errors.email && <p className="mt-1.5 animate-fade-up text-xs text-red-600">Enter a valid email address.</p>}

      <fieldset className="mt-4">
        <legend className="text-[12px] font-semibold text-ink">Services</legend>
        <div className="mt-1">
          {services.map((s) => (
            <Box key={s} label={s} checked={chosen.includes(s)} invalid={errors.services} onChange={() => toggle(chosen, setChosen, s, "services")} />
          ))}
        </div>
        <p className={`mt-1 text-[13px] ${errors.services ? "animate-fade-up text-red-600" : "text-slate-600"}`}>Choose at least one service.</p>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="text-[12px] font-semibold text-ink">Notice types</legend>
        <div className="mt-1">
          {noticeTypes.map((n) => (
            <Box key={n} label={n} checked={notices.includes(n)} invalid={errors.notices} onChange={() => toggle(notices, setNotices, n, "notices")} />
          ))}
        </div>
        {errors.notices && <p className="mt-1 animate-fade-up text-xs text-red-600">Choose at least one notice type.</p>}
      </fieldset>

      <div className={`mt-4 rounded-lg border px-3 py-2 transition-colors ${errors.consent ? "border-red-300 bg-red-50/50" : "border-slate-200"}`}>
        <Box
          label="Send me operational status updates for the services above. This isn't marketing."
          checked={consent}
          invalid={errors.consent}
          onChange={() => {
            setConsent((c) => !c);
            setErrors((er) => ({ ...er, consent: false }));
          }}
        />
      </div>
      {errors.consent && <p className="mt-1.5 animate-fade-up text-xs text-red-600">Tick the box to confirm you want status updates.</p>}

      <button
        type="submit"
        className="btn-shine mt-4 h-11 w-full rounded-full bg-brand text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
      >
        Get status updates
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Compass, Info, Pencil } from "lucide-react";
import { hrefFor } from "@/lib/navigation";
import { partnerIcons } from "@/components/partner-program/icons";
import { orgTypes, programs } from "./data";

/** Suggests partner programs from a couple of answers — not an eligibility decision. */
export default function PathwayFinder() {
  const [activities, setActivities] = useState<string[]>([]);
  const [orgType, setOrgType] = useState("");
  const [errors, setErrors] = useState<{ activities?: boolean; orgType?: boolean }>({});
  const [result, setResult] = useState<{ labels: string[]; orgType: string } | null>(null);

  const toggle = (label: string) => {
    setActivities((a) => (a.includes(label) ? a.filter((x) => x !== label) : [...a, label]));
    setErrors((e) => ({ ...e, activities: false }));
  };

  const suggest = (e: React.FormEvent) => {
    e.preventDefault();
    const next = { activities: activities.length === 0, orgType: !orgType };
    setErrors(next);
    if (!next.activities && !next.orgType) setResult({ labels: activities, orgType });
  };

  const card = "rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.35)] sm:p-6";

  if (result) {
    const suggested = programs.filter((p) => result.labels.includes(p.label));
    const org = orgTypes.find((o) => o.id === result.orgType)!;
    return (
      <div className={`animate-fade-up ${card}`}>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 animate-pop place-items-center rounded-xl bg-brand-light text-gold">
            <Compass className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-[15px] font-bold text-ink">
              Start with {suggested.length === 1 ? "this program" : `these ${suggested.length} programs`}
            </h3>
            <p className="text-xs text-slate-500">A suggestion, not an eligibility decision. Nothing was shared or submitted.</p>
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          {suggested.map(({ label, text, icon }, i) => {
            const Icon = partnerIcons[icon];
            return (
              <li key={label} className="animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
                <Link
                  href={hrefFor(label)}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-md"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink text-brand transition-colors group-hover:bg-brand group-hover:text-ink">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{label}</span>
                    <span className="block text-[12px] text-slate-600">{text}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 flex gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-[13px] leading-relaxed text-slate-700">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <span>
            <strong className="font-semibold text-ink">{org.label}:</strong> {org.note}
          </span>
        </p>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-ink"
        >
          <Pencil className="h-4 w-4 transition-transform group-hover:-rotate-12" /> Change answers
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={suggest} className={`space-y-4 ${card}`}>
      <fieldset>
        <legend className="text-[13px] font-semibold text-ink">What does your organization mainly do?</legend>
        <div className="mt-2 space-y-2">
          {programs.map(({ label, activity }) => {
            const checked = activities.includes(label);
            return (
              <label
                key={label}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-[13px] transition-all duration-300 hover:-translate-y-0.5 ${
                  checked ? "border-brand bg-brand-light/60 text-ink" : errors.activities ? "border-red-300 text-slate-700" : "border-slate-200 text-slate-700 hover:border-slate-400"
                }`}
              >
                <input type="checkbox" checked={checked} onChange={() => toggle(label)} className="peer sr-only" />
                <span
                  className={`grid h-4 w-4 shrink-0 place-items-center rounded border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand/50 ${
                    checked ? "border-ink bg-ink text-brand" : "border-slate-400 bg-white"
                  }`}
                >
                  {checked && <Check className="h-3 w-3 animate-pop" strokeWidth={3} />}
                </span>
                {activity}
              </label>
            );
          })}
        </div>
        <p className={`mt-2 text-[12px] ${errors.activities ? "animate-fade-up text-red-600" : "text-slate-500"}`}>Choose at least one activity.</p>
      </fieldset>

      <div>
        <label htmlFor="org-type" className="text-[13px] font-semibold text-ink">
          Organization type
        </label>
        <span className="relative mt-2 block">
          <select
            id="org-type"
            value={orgType}
            onChange={(e) => {
              setOrgType(e.target.value);
              setErrors((er) => ({ ...er, orgType: false }));
            }}
            aria-invalid={errors.orgType}
            className={`h-11 w-full cursor-pointer appearance-none rounded-lg border bg-white pr-9 pl-3 text-sm text-ink transition-colors focus:ring-2 focus:ring-brand/40 focus:outline-none ${
              errors.orgType ? "border-red-400" : "border-slate-300 hover:border-ink"
            }`}
          >
            <option value="">Choose</option>
            {orgTypes.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </span>
        {errors.orgType && <p className="mt-1.5 animate-fade-up text-xs text-red-600">Choose your organization type.</p>}
      </div>

      <button
        type="submit"
        className="btn-shine h-11 w-full rounded-full bg-brand text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
      >
        Suggest pathways
      </button>
    </form>
  );
}

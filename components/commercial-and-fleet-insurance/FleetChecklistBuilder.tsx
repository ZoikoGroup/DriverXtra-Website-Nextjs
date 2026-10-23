"use client";

import { useState } from "react";
import { Check, ChevronDown, ClipboardList, Pencil, Printer } from "lucide-react";
import { businessTypes, operatingAreas, vehicleClasses } from "./data";

type Errors = Partial<Record<"businessType" | "count" | "area" | "classes", string>>;

/** Builds a preparation checklist from a few non-sensitive answers. Nothing leaves the browser. */
export default function FleetChecklistBuilder() {
  const [businessType, setBusinessType] = useState("");
  const [count, setCount] = useState("");
  const [area, setArea] = useState("");
  const [classes, setClasses] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [checklist, setChecklist] = useState<string[] | null>(null);

  const toggleClass = (c: string) => {
    setClasses((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));
    setErrors((e) => ({ ...e, classes: undefined }));
  };

  const build = () => {
    const n = Number(count);
    const next: Errors = {};
    if (!businessType) next.businessType = "Choose a business type.";
    if (!count || !Number.isInteger(n) || n < 1 || n > 10000) next.count = "Enter a number from 1 to 10,000.";
    if (!area) next.area = "Choose an operating area.";
    if (classes.length === 0) next.classes = "Choose at least one vehicle class.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const items = [
      `Business details: ${businessType.toLowerCase()}, with ${n} ${n === 1 ? "vehicle" : "vehicles"}`,
      `A vehicle list for each ${classes.join(", ").toLowerCase()} — make, model, registration and value`,
      n > 1 ? "Who's authorised to drive, and any driver checks you carry out" : "Named drivers and what work each one does",
      `Every operating area declared — ${area.toLowerCase()}`,
      "Claims history for the last few years, across all vehicles",
      "Where vehicles are kept overnight, and their security",
    ];
    if (classes.some((c) => c === "Vans" || c === "Pickups" || c === "Trucks")) items.push("Tools, equipment or goods carried — and whether you need goods-in-transit cover");
    if (classes.includes("Minibuses") || businessType === "Passenger transport") items.push("Whether passengers are carried for payment, and any licences required");
    if (n >= 5) items.push("Telematics, maintenance records or a fleet risk policy, if you have them");
    setChecklist(items);
  };

  const selectClass = (error?: string) =>
    `h-11 w-full cursor-pointer appearance-none rounded-lg border bg-white pr-9 pl-3 text-sm text-ink transition-colors focus:ring-2 focus:ring-brand/40 focus:outline-none ${
      error ? "border-red-400" : "border-slate-300 hover:border-ink"
    }`;

  if (checklist) {
    return (
      <div className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 animate-pop place-items-center rounded-xl bg-brand-light text-gold">
            <ClipboardList className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-[15px] font-bold text-ink">Your checklist for an insurer or broker</h3>
            <p className="text-xs text-slate-500">Built in your browser — nothing was sent.</p>
          </div>
        </div>
        <ul className="mt-4 space-y-2.5">
          {checklist.map((item, i) => (
            <li key={item} className="flex animate-fade-up gap-2.5 text-[13px] leading-relaxed text-ink" style={{ animationDelay: `${i * 70}ms` }}>
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setChecklist(null)}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-ink"
          >
            <Pencil className="h-4 w-4 transition-transform group-hover:-rotate-12" /> Edit answers
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
          >
            <Printer className="h-4 w-4" /> Print
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        build();
      }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Business type" error={errors.businessType}>
          <span className="relative flex items-center">
            <select
              value={businessType}
              onChange={(e) => (setBusinessType(e.target.value), setErrors((x) => ({ ...x, businessType: undefined })))}
              className={selectClass(errors.businessType)}
            >
              <option value="">Choose</option>
              {businessTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-500" />
          </span>
        </Field>
        <Field label="Number of vehicles" error={errors.count}>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={count}
            onChange={(e) => (setCount(e.target.value), setErrors((x) => ({ ...x, count: undefined })))}
            className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-ink transition-colors focus:ring-2 focus:ring-brand/40 focus:outline-none ${
              errors.count ? "border-red-400" : "border-slate-300 hover:border-ink"
            }`}
          />
        </Field>
        <Field label="Operating area" error={errors.area}>
          <span className="relative flex items-center">
            <select value={area} onChange={(e) => (setArea(e.target.value), setErrors((x) => ({ ...x, area: undefined })))} className={selectClass(errors.area)}>
              <option value="">Choose</option>
              {operatingAreas.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-500" />
          </span>
        </Field>
      </div>

      <fieldset className="mt-5">
        <legend className="text-[12px] font-semibold text-ink">Vehicle classes</legend>
        <div className="mt-2 space-y-1">
          {vehicleClasses.map((c) => {
            const checked = classes.includes(c);
            return (
              <label key={c} className="group flex w-fit cursor-pointer items-center gap-3 py-1 text-[13px] text-ink transition-transform hover:translate-x-1">
                <input type="checkbox" checked={checked} onChange={() => toggleClass(c)} className="peer sr-only" />
                <span
                  className={`grid h-4 w-4 place-items-center rounded border transition-all duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-brand/50 ${
                    checked ? "border-ink bg-ink text-white" : "border-slate-400 group-hover:border-ink"
                  }`}
                >
                  {checked && <Check className="h-3 w-3 animate-pop" strokeWidth={3} />}
                </span>
                {c}
              </label>
            );
          })}
        </div>
        <p className={`mt-1 text-[13px] ${errors.classes ? "animate-shake font-medium text-red-600" : "text-slate-600"}`}>Choose at least one vehicle class.</p>
      </fieldset>

      <button
        type="submit"
        className="btn-shine mt-6 inline-flex h-11 items-center rounded-full bg-brand px-6 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(232,172,0,0.7)]"
      >
        Build my checklist
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold text-ink">{label}</span>
      <span className="mt-1.5 block">{children}</span>
      {error && <span className="mt-1 block animate-fade-up text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

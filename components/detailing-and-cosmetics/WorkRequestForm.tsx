"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, ClipboardCheck, Pencil, RotateCcw } from "lucide-react";
import { services, vehicleTypes } from "./data";
import { CATALOG_EVENT } from "@/components/services/ServiceCatalog";

type Field = "vehicle" | "service" | "notes" | "location";
type Values = Record<Field, string>;

const empty: Values = { vehicle: "", service: "", notes: "", location: "" };
const NOTES_MAX = 300;

/** Demo request form — validated in the browser, nothing is sent. */
export default function WorkRequestForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [saved, setSaved] = useState(false);

  // Picking a card in the service catalog preselects it here.
  useEffect(() => {
    const onPick = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setValues((v) => ({ ...v, service: id }));
      setErrors((er) => ({ ...er, service: undefined }));
      setSaved(false);
    };
    window.addEventListener(CATALOG_EVENT, onPick);
    return () => window.removeEventListener(CATALOG_EVENT, onPick);
  }, []);

  const set = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<Field, string>> = {};
    if (!values.vehicle) next.vehicle = "Choose a vehicle type.";
    if (!values.service) next.service = "Choose the service you need.";
    if (!values.location.trim()) next.location = "Enter a town or postal area.";
    else if (/\d+\s+\w+\s+(street|st|road|rd|avenue|ave|lane|ln)\b/i.test(values.location)) next.location = "Town or postal area only — no full address.";
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

  const serviceTitle = services.find((s) => s.id === values.service)?.title;

  if (saved) {
    const rows: [string, string][] = [
      ["Vehicle type", values.vehicle],
      ["Service needed", serviceTitle ?? ""],
      ["Condition notes", values.notes.trim() || "None added"],
      ["Location", values.location.trim()],
    ];
    return (
      <div className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 animate-pop place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <ClipboardCheck className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-[15px] font-bold text-ink">Demo request saved</h3>
            <p className="text-xs text-slate-500">Kept in your browser only — nothing was sent to a provider.</p>
          </div>
        </div>
        <dl className="mt-5 divide-y divide-slate-100 border-y border-slate-100">
          {rows.map(([label, value], i) => (
            <div key={label} className="grid animate-fade-up gap-1 py-2.5 text-[13px] sm:grid-cols-[160px_1fr]" style={{ animationDelay: `${i * 70}ms` }}>
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

  return (
    <form noValidate onSubmit={save} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="dc-vehicle" className="text-[13px] font-semibold text-ink">
            Vehicle type
          </label>
          <span className="relative mt-2 block">
            <select
              id="dc-vehicle"
              value={values.vehicle}
              onChange={(e) => set("vehicle", e.target.value)}
              aria-invalid={!!errors.vehicle}
              className={`${control(errors.vehicle)} h-11 cursor-pointer appearance-none pr-9 pl-3`}
            >
              <option value="">Choose</option>
              {vehicleTypes.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </span>
          {errors.vehicle && <p className="mt-1.5 animate-fade-up text-xs text-red-600">{errors.vehicle}</p>}
        </div>

        <div>
          <label htmlFor="dc-service" className="text-[13px] font-semibold text-ink">
            Service needed
          </label>
          <span className="relative mt-2 block">
            <select
              id="dc-service"
              value={values.service}
              onChange={(e) => set("service", e.target.value)}
              aria-invalid={!!errors.service}
              className={`${control(errors.service)} h-11 cursor-pointer appearance-none pr-9 pl-3`}
            >
              <option value="">Choose</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </span>
          {errors.service && <p className="mt-1.5 animate-fade-up text-xs text-red-600">{errors.service}</p>}
        </div>

        <div className="sm:row-span-2">
          <label htmlFor="dc-notes" className="text-[13px] font-semibold text-ink">
            Vehicle condition notes
          </label>
          <textarea
            id="dc-notes"
            rows={3}
            maxLength={NOTES_MAX}
            value={values.notes}
            onChange={(e) => set("notes", e.target.value)}
            className={`${control()} mt-2 block min-h-[88px] resize-y px-3 py-2.5`}
          />
          <p className="mt-1.5 flex justify-between gap-3 text-xs text-slate-500">
            <span>Describe visible condition only. Don&apos;t include personal details.</span>
            <span className="shrink-0 tabular-nums">
              {values.notes.length}/{NOTES_MAX}
            </span>
          </p>
        </div>

        <div>
          <label htmlFor="dc-location" className="text-[13px] font-semibold text-ink">
            Location / ZIP
          </label>
          <input
            id="dc-location"
            type="text"
            autoComplete="address-level2"
            value={values.location}
            onChange={(e) => set("location", e.target.value)}
            aria-invalid={!!errors.location}
            className={`${control(errors.location)} mt-2 h-11 px-3`}
          />
          {errors.location ? (
            <p className="mt-1.5 animate-fade-up text-xs text-red-600">{errors.location}</p>
          ) : (
            <p className="mt-1.5 text-xs text-slate-500">Town or postal area only — no full address.</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          className="btn-shine h-11 rounded-full bg-brand px-6 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
        >
          Save demo request
        </button>
        <button
          type="button"
          onClick={reset}
          className="h-11 rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

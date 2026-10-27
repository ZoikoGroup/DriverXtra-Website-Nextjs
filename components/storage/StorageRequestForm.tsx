"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, ClipboardCheck, Pencil, RotateCcw, Warehouse, X } from "lucide-react";
import { CATALOG_EVENT } from "@/components/services/ServiceCatalog";
import { durations, storageTypes, vehicleSizes } from "./data";

type Field = "vehicle" | "location" | "start" | "duration";
type Values = Record<Field, string>;

const empty: Values = { vehicle: "", location: "", start: "", duration: "" };

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/** Demo storage request — validated in the browser, nothing is sent. */
export default function StorageRequestForm() {
  const [values, setValues] = useState<Values>(empty);
  const [typeId, setTypeId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [saved, setSaved] = useState(false);
  const [minDate, setMinDate] = useState<string>();

  // Today's date is set after mount so server and client markup match.
  useEffect(() => setMinDate(today()), []);

  // Picking a card in "Which kind of storage fits?" adds it as the preferred type.
  useEffect(() => {
    const onPick = (e: Event) => {
      setTypeId((e as CustomEvent<string>).detail);
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
    if (!values.vehicle) next.vehicle = "Choose a vehicle size or type.";
    if (!values.location.trim()) next.location = "Enter a town or postal area.";
    else if (/\d+\s+\w+\s+(street|st|road|rd|avenue|ave|lane|ln)\b/i.test(values.location)) next.location = "Town or postal area only — no full address.";
    if (!values.start) next.start = "Choose a start date.";
    else if (values.start < today()) next.start = "Choose today or a later date.";
    if (!values.duration) next.duration = "Choose how long you expect to store it.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSaved(true);
  };

  const reset = () => {
    setValues(empty);
    setTypeId(null);
    setErrors({});
    setSaved(false);
  };

  const control = (error?: string) =>
    `w-full rounded-lg border bg-white text-sm text-ink transition-colors placeholder:text-slate-400 focus:ring-2 focus:ring-brand/40 focus:outline-none ${
      error ? "border-red-400" : "border-slate-300 hover:border-ink"
    }`;

  const typeTitle = storageTypes.find((t) => t.id === typeId)?.title;
  const error = (field: Field) => errors[field] && <p className="mt-1.5 animate-fade-up text-xs text-red-600">{errors[field]}</p>;

  if (saved) {
    const rows: [string, string][] = [
      ["Vehicle size / type", values.vehicle],
      ["Preferred storage", typeTitle ?? "No preference"],
      ["Storage location", values.location.trim()],
      ["Start date", new Date(`${values.start}T00:00`).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })],
      ["Expected duration", values.duration],
    ];
    return (
      <div className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 animate-pop place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <ClipboardCheck className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-[15px] font-bold text-ink">Demo request saved</h3>
            <p className="text-xs text-slate-500">Kept in your browser only — this isn&apos;t a reservation and nothing was sent.</p>
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
      {typeTitle && (
        <p key={typeId} className="mb-5 inline-flex animate-pop items-center gap-2 rounded-full border border-brand/50 bg-brand-light py-1 pr-1 pl-3 text-xs font-semibold text-ink">
          <Warehouse className="h-3.5 w-3.5 text-gold" /> Preferred: {typeTitle}
          <button type="button" onClick={() => setTypeId(null)} aria-label="Remove preferred storage type" className="grid h-5 w-5 place-items-center rounded-full transition-colors hover:bg-ink hover:text-white">
            <X className="h-3 w-3" />
          </button>
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="st-vehicle" className="text-[13px] font-semibold text-ink">
            Vehicle size / type
          </label>
          <span className="relative mt-2 block">
            <select
              id="st-vehicle"
              value={values.vehicle}
              onChange={(e) => set("vehicle", e.target.value)}
              aria-invalid={!!errors.vehicle}
              className={`${control(errors.vehicle)} h-11 cursor-pointer appearance-none pr-9 pl-3`}
            >
              <option value="">Choose</option>
              {vehicleSizes.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </span>
          {error("vehicle")}
        </div>

        <div>
          <label htmlFor="st-location" className="text-[13px] font-semibold text-ink">
            Storage location
          </label>
          <input
            id="st-location"
            type="text"
            autoComplete="address-level2"
            value={values.location}
            onChange={(e) => set("location", e.target.value)}
            aria-invalid={!!errors.location}
            className={`${control(errors.location)} mt-2 h-11 px-3`}
          />
          {errors.location ? error("location") : <p className="mt-1.5 text-xs text-slate-500">Town or postal area only — no full address.</p>}
        </div>

        <div>
          <label htmlFor="st-start" className="text-[13px] font-semibold text-ink">
            Start date
          </label>
          <input
            id="st-start"
            type="date"
            min={minDate}
            value={values.start}
            onChange={(e) => set("start", e.target.value)}
            aria-invalid={!!errors.start}
            className={`${control(errors.start)} mt-2 h-11 cursor-pointer px-3`}
          />
          {error("start")}
        </div>

        <div>
          <label htmlFor="st-duration" className="text-[13px] font-semibold text-ink">
            Expected duration
          </label>
          <span className="relative mt-2 block">
            <select
              id="st-duration"
              value={values.duration}
              onChange={(e) => set("duration", e.target.value)}
              aria-invalid={!!errors.duration}
              className={`${control(errors.duration)} h-11 cursor-pointer appearance-none pr-9 pl-3`}
            >
              <option value="">Choose</option>
              {durations.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </span>
          {error("duration")}
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

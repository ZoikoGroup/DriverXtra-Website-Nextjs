"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, ClipboardCheck, Pencil, PhoneCall, RotateCcw } from "lucide-react";
import { CATALOG_EVENT } from "@/components/services/ServiceCatalog";
import { needs, safetySituations, vehicleTypes } from "./data";

type Field = "assistance" | "vehicle" | "location" | "safety";
type Values = Record<Field, string>;

const empty: Values = { assistance: "", vehicle: "", location: "", safety: "" };

/** Demo roadside request — validated in the browser, nothing is sent. */
export default function RoadsideRequestForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [saved, setSaved] = useState(false);

  // Picking a card in "Common roadside needs" preselects the assistance type.
  useEffect(() => {
    const onPick = (e: Event) => {
      setValues((v) => ({ ...v, assistance: (e as CustomEvent<string>).detail }));
      setErrors((er) => ({ ...er, assistance: undefined }));
      setSaved(false);
    };
    window.addEventListener(CATALOG_EVENT, onPick);
    return () => window.removeEventListener(CATALOG_EVENT, onPick);
  }, []);

  const set = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const situation = safetySituations.find((s) => s.value === values.safety);
  const inDanger = !!situation?.danger;

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<Field, string>> = {};
    if (!values.assistance) next.assistance = "Choose the help you need.";
    if (!values.vehicle) next.vehicle = "Choose a vehicle type.";
    if (!values.location.trim()) next.location = "Enter a road name, junction or landmark.";
    if (!values.safety) next.safety = "Tell us how safe you are right now.";
    else if (inDanger) next.safety = "Call local emergency services first — don't wait for roadside help.";
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

  const select = (field: Field, id: string, options: { value: string; label: string }[]) => (
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
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </span>
  );

  if (saved) {
    const rows: [string, string][] = [
      ["Assistance type", needs.find((n) => n.id === values.assistance)?.title ?? ""],
      ["Vehicle type", values.vehicle],
      ["Location or landmark", values.location.trim()],
      ["Safety situation", situation?.label ?? ""],
    ];
    return (
      <div className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 animate-pop place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <ClipboardCheck className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-[15px] font-bold text-ink">Demo request saved</h3>
            <p className="text-xs text-slate-500">Kept in your browser only — no provider has been dispatched and nothing was sent.</p>
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
          <label htmlFor="ra-assistance" className="text-[13px] font-semibold text-ink">
            Assistance type
          </label>
          {select(
            "assistance",
            "ra-assistance",
            needs.map((n) => ({ value: n.id, label: n.title })),
          )}
          {error("assistance")}
        </div>

        <div>
          <label htmlFor="ra-vehicle" className="text-[13px] font-semibold text-ink">
            Vehicle type
          </label>
          {select(
            "vehicle",
            "ra-vehicle",
            vehicleTypes.map((v) => ({ value: v, label: v })),
          )}
          {error("vehicle")}
        </div>

        <div className="sm:row-span-2">
          <label htmlFor="ra-location" className="text-[13px] font-semibold text-ink">
            Location or landmark
          </label>
          <input
            id="ra-location"
            type="text"
            autoComplete="off"
            value={values.location}
            onChange={(e) => set("location", e.target.value)}
            aria-invalid={!!errors.location}
            className={`${control(errors.location)} mt-2 h-11 px-3`}
          />
          {errors.location ? (
            error("location")
          ) : (
            <p className="mt-1.5 text-xs text-slate-500">Type a road name, junction or landmark. We never use your device location automatically.</p>
          )}
        </div>

        <div>
          <label htmlFor="ra-safety" className="text-[13px] font-semibold text-ink">
            Safety situation
          </label>
          {select("safety", "ra-safety", safetySituations)}
          {!inDanger && error("safety")}
        </div>
      </div>

      {inDanger && (
        <div key={errors.safety ?? "warn"} role="alert" className="mt-5 flex animate-shake gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-[13px] text-red-800">
          <PhoneCall className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            <strong className="font-bold">Call local emergency services now.</strong> If you&apos;re in a live lane or anyone is hurt, get to safety and call for
            emergency help first — roadside assistance can follow once you&apos;re safe.
          </p>
        </div>
      )}

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

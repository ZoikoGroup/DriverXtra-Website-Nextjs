"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, RotateCcw, Wrench } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { hrefFor } from "@/lib/navigation";
import { vehicles, type VehicleId } from "@/components/parts/data";
import { details, getServerSnapshot, getSnapshot, parse, subscribe } from "@/components/use-my-garage/garage-store";
import { exampleParts, statuses } from "./data";

const field =
  "h-11 w-full cursor-pointer appearance-none rounded-lg border bg-white px-3 pr-9 text-sm text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none";
const card = "rounded-2xl border border-slate-200 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_20px_40px_-28px_rgba(15,23,42,0.35)]";

/** Example fitment checker: vehicle (garage or example list) + exact part → status and reason. */
export default function FitmentChecker() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const garage = useMemo(() => parse(raw), [raw]);

  // null = untouched, so the active garage vehicle is preselected.
  const [vehicleChoice, setVehicleChoice] = useState<string | null>(null);
  const [partId, setPartId] = useState("");
  const [result, setResult] = useState<{ vehicle: string; part: string } | null>(null);
  const [errors, setErrors] = useState({ vehicle: false, part: false });

  const activeGarage = garage.vehicles.find((v) => v.uid === garage.active);
  const vehicleValue = vehicleChoice ?? (activeGarage ? `g:${activeGarage.uid}` : "");

  /** "g:<uid>" = garage vehicle, "v:<id>" = example vehicle. */
  const resolve = (value: string) => {
    if (value.startsWith("g:")) {
      const g = garage.vehicles.find((v) => v.uid === value.slice(2));
      const info = g && details(g.vehicleId);
      return info ? { id: info.id as VehicleId, label: `${g.year} ${info.make} ${info.model}` } : null;
    }
    const info = value.startsWith("v:") ? details(value.slice(2)) : null;
    return info ? { id: info.id as VehicleId, label: `${info.make} ${info.model}` } : null;
  };

  const selected = resolve(vehicleValue);
  const outcome = result && resolve(result.vehicle);
  const part = result && exampleParts.find((p) => p.id === result.part);
  const rule = outcome && part ? (part.rules[outcome.id] ?? part.otherwise) : null;
  const status = rule ? statuses[rule.status] : null;

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    const next = { vehicle: !selected, part: !partId };
    setErrors(next);
    if (!next.vehicle && !next.part) setResult({ vehicle: vehicleValue, part: partId });
  };

  return (
    <div className="mt-8 grid items-start gap-5 lg:grid-cols-2">
      <Reveal>
        <form noValidate onSubmit={check} className="space-y-4">
          <fieldset className={card}>
            <legend className="sr-only">Your vehicle</legend>
            <p className="text-[14px] font-bold text-ink">1. Your vehicle</p>
            <p className="mt-2 text-[12px] text-slate-500">{selected ? `Selected: ${selected.label}` : "No vehicle selected."}</p>
            <label htmlFor="fit-vehicle" className="mt-3 block text-[12px] font-semibold text-ink">
              Choose a vehicle
            </label>
            <span className="relative mt-1.5 block">
              <select
                id="fit-vehicle"
                value={vehicleValue}
                aria-invalid={errors.vehicle}
                onChange={(e) => {
                  setVehicleChoice(e.target.value);
                  setErrors((er) => ({ ...er, vehicle: false }));
                }}
                className={`${field} ${errors.vehicle ? "border-red-400" : "border-slate-300"}`}
              >
                <option value="">Choose a vehicle</option>
                {garage.vehicles.length > 0 && (
                  <optgroup label="From your garage">
                    {garage.vehicles.map((g) => {
                      const info = details(g.vehicleId);
                      return info ? (
                        <option key={g.uid} value={`g:${g.uid}`}>
                          {g.year} {info.make} {info.model}
                        </option>
                      ) : null;
                    })}
                  </optgroup>
                )}
                <optgroup label="Example vehicles">
                  {vehicles.map((v) => (
                    <option key={v.id} value={`v:${v.id}`}>
                      {v.make} {v.label}
                    </option>
                  ))}
                </optgroup>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </span>
            {errors.vehicle && <p className="mt-1.5 animate-fade-up text-xs text-red-600">Choose a vehicle to check against.</p>}
            <p className="mt-3 text-[12px] text-slate-500">
              <Link href={hrefFor("Use My Garage")} className="font-medium text-ink underline underline-offset-2 transition-colors hover:text-gold">
                Use My Garage
              </Link>{" "}
              to save vehicles.
            </p>
          </fieldset>

          <fieldset className={card}>
            <legend className="sr-only">The exact part</legend>
            <p className="text-[14px] font-bold text-ink">2. The exact part</p>
            <label htmlFor="fit-part" className="mt-3 block text-[12px] font-semibold text-ink">
              Choose a part (example catalog)
            </label>
            <span className="relative mt-1.5 block">
              <select
                id="fit-part"
                value={partId}
                aria-invalid={errors.part}
                onChange={(e) => {
                  setPartId(e.target.value);
                  setErrors((er) => ({ ...er, part: false }));
                }}
                className={`${field} ${errors.part ? "border-red-400" : "border-slate-300"}`}
              >
                <option value="">Choose a part</option>
                {exampleParts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · {p.partNo}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </span>
            {errors.part && <p className="mt-1.5 animate-fade-up text-xs text-red-600">Choose the exact part from the listing.</p>}
            <p className="mt-2 text-[12px] text-slate-500">Use the exact part number and variant from the listing.</p>
            <button
              type="submit"
              className="btn-shine mt-4 h-11 w-full rounded-full bg-brand text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
            >
              Check fitment
            </button>
          </fieldset>
        </form>
      </Reveal>

      <Reveal direction="left" delay={150} className="lg:sticky lg:top-32">
        <div aria-live="polite">
          {!status || !outcome || !part || !rule ? (
            <div className="grid min-h-[180px] place-items-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-8 text-center">
              <div>
                <Wrench className="mx-auto h-5 w-5 animate-float-slow text-slate-500" />
                <p className="mt-3 text-[13px] text-slate-500">Choose a vehicle and an exact part to see what the application data says.</p>
              </div>
            </div>
          ) : (
            <div key={`${result?.vehicle}-${result?.part}`} className={`animate-fade-up rounded-2xl border p-5 ${status.panel}`}>
              <p className="text-[12px] font-semibold tracking-wide text-slate-500 uppercase">Example result</p>
              <p className={`mt-2 flex items-center gap-2 text-[17px] font-bold ${status.text}`}>
                <span className={`h-2.5 w-2.5 shrink-0 animate-pop rounded-full ${status.dot}`} /> {status.label}
              </p>
              <dl className="mt-4 space-y-2 text-[13px]">
                <div className="grid grid-cols-[90px_1fr] gap-2">
                  <dt className="text-slate-500">Vehicle</dt>
                  <dd className="font-medium text-ink">{outcome.label}</dd>
                </div>
                <div className="grid grid-cols-[90px_1fr] gap-2">
                  <dt className="text-slate-500">Part</dt>
                  <dd className="font-medium text-ink">
                    {part.name} · {part.partNo}
                  </dd>
                </div>
                <div className="grid grid-cols-[90px_1fr] gap-2">
                  <dt className="text-slate-500">Why</dt>
                  <dd className="text-ink">{rule.note}</dd>
                </div>
                <div className="grid grid-cols-[90px_1fr] gap-2">
                  <dt className="text-slate-500">What to do</dt>
                  <dd className="text-ink">{status.action}</dd>
                </div>
              </dl>
              <p className="mt-4 text-[12px] text-slate-500">Synthetic example data. Never a guarantee of fit.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={`/parts?vehicle=${outcome.id}#all-parts`}
                  className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-ink"
                >
                  Browse parts for this vehicle <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setPartId("");
                  }}
                  className="group inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 text-[13px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink"
                >
                  <RotateCcw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-180" /> Check another part
                </button>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}

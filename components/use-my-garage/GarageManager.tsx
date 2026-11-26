"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, Car, Check, ChevronDown, Info, Plus, Trash2, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { hrefFor } from "@/lib/navigation";
import { vehicleMakes, vehicles } from "@/components/parts/data";
import { details, getServerSnapshot, getSnapshot, parse, save, subscribe, type GarageState } from "./garage-store";

const field =
  "h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white px-3 pr-9 text-sm text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";

function Select({ label, value, onChange, disabled, children }: { label: string; value: string; onChange: (v: string) => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold text-ink">{label}</span>
      <span className="relative mt-1.5 block">
        <select value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} className={field}>
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </span>
    </label>
  );
}

/** Session garage: add vehicles, pick the active one, and jump to parts filtered for it. */
export default function GarageManager() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const garage: GarageState = useMemo(() => parse(raw), [raw]);

  const [adding, setAdding] = useState(false);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const models = vehicles.filter((v) => v.make === make);
  const years = details(model)?.years ?? [];
  const active = garage.vehicles.find((v) => v.uid === garage.active);
  const activeInfo = active ? details(active.vehicleId) : null;

  const resetForm = () => {
    setMake("");
    setModel("");
    setYear("");
  };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!model || !year) return;
    const info = details(model);
    const duplicate = garage.vehicles.find((v) => v.vehicleId === model && v.year === Number(year));
    if (duplicate) {
      setNotice(`${year} ${info?.make} ${info?.model} is already in your garage.`);
      return;
    }
    const uid = `${model}-${year}-${Date.now()}`;
    // The first vehicle becomes active automatically; later ones wait to be chosen.
    save({ vehicles: [...garage.vehicles, { uid, vehicleId: model, year: Number(year) }], active: garage.active ?? uid });
    setNotice(`Added ${year} ${info?.make} ${info?.model}.`);
    resetForm();
    setAdding(false);
  };

  const remove = (uid: string) => {
    const rest = garage.vehicles.filter((v) => v.uid !== uid);
    save({ vehicles: rest, active: garage.active === uid ? null : garage.active });
    setNotice("Vehicle removed.");
  };

  const choose = (uid: string | null) => save({ ...garage, active: uid });

  return (
    <div>
      <Reveal>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-ink">Your vehicles for this session</h2>
            <p className="mt-1 text-[13px] text-slate-500">Not signed in</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setAdding((a) => !a);
              setNotice(null);
            }}
            aria-expanded={adding}
            aria-controls="add-vehicle"
            className="btn-shine group inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
          >
            {adding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />}
            {adding ? "Cancel" : "Add vehicle"}
          </button>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <p className="mt-6 flex flex-wrap items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-[12px] text-amber-900">
          <Info className="h-4 w-4 shrink-0 text-amber-700" />
          This vehicle is available only in this session unless you sign in and choose to save it.
          <Link href="/sign-in" className="font-semibold text-blue-700 underline underline-offset-2 transition-colors hover:text-gold">
            Sign in to save
          </Link>
        </p>
      </Reveal>

      <Reveal delay={150}>
        <div role="status" className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-navy px-4 py-3 text-[13px] text-white">
          <p className="flex items-center gap-2">
            {activeInfo ? (
              <>
                <span className="grid h-5 w-5 shrink-0 animate-pop place-items-center rounded-full bg-emerald-500 text-navy">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                Showing parts for <strong className="font-semibold text-brand">{active?.year} {activeInfo.make} {activeInfo.model}</strong>
              </>
            ) : (
              <>
                <Info className="h-4 w-4 shrink-0 text-brand" /> No vehicle selected. Parts show without vehicle filtering.
              </>
            )}
          </p>
          <Link
            href={activeInfo ? `/parts?vehicle=${activeInfo.id}#all-parts` : hrefFor("Browse All Parts")}
            className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand"
          >
            {activeInfo ? "Shop parts for this vehicle" : "Browse all parts"}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>

      {adding && (
        <form
          id="add-vehicle"
          onSubmit={add}
          className="mt-3 grid animate-fade-up gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.35)] sm:p-5 lg:grid-cols-[1fr_1.4fr_0.8fr_auto] lg:items-end"
        >
          <Select
            label="Make"
            value={make}
            onChange={(v) => {
              setMake(v);
              setModel("");
              setYear("");
            }}
          >
            <option value="">Choose make</option>
            {vehicleMakes.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </Select>
          <Select
            label="Model & engine"
            value={model}
            disabled={!make}
            onChange={(v) => {
              setModel(v);
              setYear("");
            }}
          >
            <option value="">Choose model</option>
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {details(m.id)?.model}
              </option>
            ))}
          </Select>
          <Select label="Year" value={year} disabled={!model} onChange={setYear}>
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </Select>
          <button
            type="submit"
            disabled={!year}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition-all duration-300 enabled:hover:-translate-y-0.5 enabled:hover:bg-brand enabled:hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="h-4 w-4" /> Add to garage
          </button>
          <p className="text-[12px] text-slate-500 lg:col-span-4">
            Know your VIN?{" "}
            <Link href={hrefFor("Enter VIN")} className="font-semibold text-blue-700 underline underline-offset-2 transition-colors hover:text-gold">
              Find parts by VIN
            </Link>{" "}
            instead.
          </p>
        </form>
      )}

      <p aria-live="polite" className="sr-only">
        {notice}
      </p>
      {notice && (
        <p key={notice} className="mt-3 animate-fade-up text-[12px] font-medium text-slate-600">
          {notice}
        </p>
      )}

      <Reveal delay={200}>
        {garage.vehicles.length === 0 ? (
          <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center">
            <p className="text-[15px] font-bold text-ink">No vehicles yet</p>
            <p className="mx-auto mt-1.5 max-w-md text-[13px] leading-relaxed text-slate-500">
              Add a vehicle to see parts with fitment information where it&apos;s available. You can always browse all parts instead.
            </p>
          </div>
        ) : (
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {garage.vehicles.map((v) => {
              const info = details(v.vehicleId);
              if (!info) return null;
              const isActive = v.uid === garage.active;
              return (
                <li
                  key={v.uid}
                  className={`group animate-fade-up rounded-2xl border bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)] ${
                    isActive ? "border-brand ring-2 ring-brand/30" : "border-slate-200 hover:border-brand/60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${isActive ? "bg-brand text-ink" : "bg-slate-100 text-slate-600 group-hover:bg-brand-light"}`}>
                      <Car className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-bold text-ink">
                        {v.year} {info.make}
                      </p>
                      <p className="truncate text-[13px] text-slate-600">{info.model}</p>
                    </div>
                    {isActive && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">Active</span>}
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => choose(isActive ? null : v.uid)}
                      className={`inline-flex h-8 items-center rounded-full px-3.5 text-[12px] font-semibold transition-all duration-300 ${
                        isActive ? "border border-slate-300 text-slate-600 hover:border-ink hover:text-ink" : "bg-ink text-white hover:bg-brand hover:text-ink"
                      }`}
                    >
                      {isActive ? "Stop using" : "Use this vehicle"}
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(v.uid)}
                      aria-label={`Remove ${v.year} ${info.make} ${info.model}`}
                      className="inline-flex h-8 items-center gap-1 rounded-full px-2.5 text-[12px] font-semibold text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Reveal>
    </div>
  );
}

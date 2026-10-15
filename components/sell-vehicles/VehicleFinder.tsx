"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Check, CircleAlert, Info, Loader2, Search } from "lucide-react";
import { lookupModes, sellerTypes, type LookupMode } from "./data";

/** Light validation per lookup type — enough to catch obvious typos. */
function validate(mode: LookupMode, value: string) {
  const v = value.trim();
  if (mode === "reg") return v.length >= 2 && v.length <= 10 ? "" : "Enter a registration plate, e.g. AB12 CDE.";
  if (mode === "vin") return /^[A-HJ-NPR-Z0-9]{17}$/i.test(v.replace(/\s/g, "")) ? "" : "A VIN has 17 letters and numbers (no I, O or Q).";
  return v.split(/\s+/).length >= 2 ? "" : "Enter the make and model, e.g. Toyota RAV4.";
}

export default function VehicleFinder() {
  const [sellerType, setSellerType] = useState(sellerTypes[0]);
  const [mode, setMode] = useState<LookupMode>("reg");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"idle" | "searching" | "found">("idle");
  const timer = useRef<number | undefined>(undefined);
  const current = lookupModes.find((m) => m.id === mode)!;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const reset = (patch: () => void) => {
    patch();
    setError("");
    setStatus("idle");
  };

  const find = () => {
    const message = validate(mode, value);
    setError(message);
    if (message) {
      setAttempt((a) => a + 1);
      return;
    }
    setStatus("searching");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("found"), 900);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        find();
      }}
      className="rounded-2xl bg-white p-5 text-ink shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)] sm:p-6"
    >
      <p className="text-sm font-bold">
        Tell us about the vehicle <span className="font-normal text-slate-500">(optional)</span>
      </p>
      <p className="mt-1 text-xs text-slate-500">Helps us show the options for your vehicle. Nothing is saved until you choose to.</p>

      <p className="mt-4 text-[13px] font-bold">I&apos;m selling as</p>
      <div className="mt-2 grid grid-cols-3 gap-2" role="radiogroup" aria-label="I'm selling as">
        {sellerTypes.map((t) => {
          const active = t === sellerType;
          return (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => reset(() => setSellerType(t))}
              className={`rounded-lg border px-2 py-2.5 text-xs font-semibold transition-all duration-300 sm:text-[13px] ${
                active ? "border-ink bg-ink text-white shadow-md" : "border-slate-200 text-ink hover:-translate-y-0.5 hover:border-slate-400"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
      <p className="mt-1.5 text-[11px] text-slate-500">Choosing a role doesn&apos;t verify it — checks happen later if needed.</p>

      <div className="mt-4 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
        {lookupModes.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() =>
              reset(() => {
                setMode(m.id);
                setValue("");
              })
            }
            className={`rounded-lg py-2.5 text-xs font-semibold transition-all duration-300 sm:text-[13px] ${
              mode === m.id ? "bg-ink text-white shadow" : "text-slate-500 hover:text-ink"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <label className="mt-4 block">
        <span className="text-[13px] font-bold">{current.field}</span>
        <input
          key={mode}
          value={value}
          onChange={(e) => reset(() => setValue(mode === "model" ? e.target.value : e.target.value.toUpperCase()))}
          placeholder={current.placeholder}
          className={`mt-1.5 h-11 w-full animate-fade-up rounded-lg border px-3 text-sm transition-all duration-200 placeholder:text-slate-400 focus:ring-2 focus:outline-none ${
            error ? "border-red-400 focus:ring-red-200" : "border-slate-300 hover:border-slate-400 focus:border-brand-dark focus:ring-brand/30"
          } ${mode !== "model" ? "font-semibold tracking-wider" : ""}`}
        />
      </label>
      {error && (
        <p key={attempt} className="mt-1.5 flex animate-shake items-center gap-1.5 text-xs font-medium text-red-600" role="alert">
          <CircleAlert className="h-3.5 w-3.5" /> {error}
        </p>
      )}

      {status === "found" ? (
        <div className="mt-4 animate-fade-up rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-emerald-800">
            <span className="grid h-6 w-6 animate-pop place-items-center rounded-full bg-emerald-500 text-white">
              <Check className="h-3.5 w-3.5" />
            </span>
            Got it — {value.trim()} · {sellerType}
          </p>
          <p className="mt-1 text-xs text-emerald-700">Next, choose how you&apos;d like to sell.</p>
          <a
            href="#selling-methods"
            className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline underline-offset-2"
          >
            See selling methods
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      ) : (
        <button
          type="submit"
          disabled={status === "searching"}
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lg disabled:pointer-events-none disabled:opacity-80"
        >
          {status === "searching" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Finding vehicle…
            </>
          ) : (
            <>
              <Search className="h-4 w-4" /> Find Vehicle
            </>
          )}
        </button>
      )}

      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
        <Info className="h-3.5 w-3.5 shrink-0" />
        Identifying a vehicle doesn&apos;t prove you own it or can sell it.
      </p>
    </form>
  );
}

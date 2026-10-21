"use client";

import { useState, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { vehicleMakes, vehicles, type VehicleId } from "./data";

type PartsHeroProps = {
  /** The vehicle currently being checked, if any. */
  vehicle: (typeof vehicles)[number] | null;
  onCheck: (id: VehicleId) => void;
  onClear: () => void;
};

/** Parts hero with the "Check compatibility" make/model card. */
export default function PartsHero({ vehicle, onCheck, onClear }: PartsHeroProps) {
  const [make, setMake] = useState<string>(vehicle?.make ?? "");
  const [model, setModel] = useState<string>(vehicle?.id ?? "");
  const [error, setError] = useState("");
  const models = vehicles.filter((v) => v.make === make);

  const check = () => {
    if (!make) return setError("Choose a make.");
    if (!model) return setError("Choose the model, year and engine.");
    setError("");
    onCheck(model as VehicleId);
  };

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <BgImage src="/images/home/hero-bg.jpeg" className="opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8 lg:py-20">
        <div>
          <Reveal>
            <Eyebrow dark>
              <span className="text-xs">Parts &amp; Accessories</span>
            </Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">
              Find Parts &amp; Accessories That Fit Your Vehicle.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
              Shop OEM, aftermarket, refurbished and performance parts from participating sellers. Start with your vehicle
              for compatibility guidance, or browse all parts and review fitment before you buy.
            </p>
          </Reveal>
        </div>

        <Reveal direction="left" delay={200}>
          <form
            id="check-compatibility"
            onSubmit={(e) => {
              e.preventDefault();
              check();
            }}
            className="scroll-mt-32 rounded-2xl bg-white p-5 text-ink shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)] sm:p-6"
          >
            <h2 className="text-lg font-bold">Check compatibility</h2>
            <p className="mt-1 text-xs text-slate-500">Optional. You can browse every part without a vehicle or a VIN.</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <SelectField label="Make">
                <select
                  id="compat-make"
                  value={make}
                  onChange={(e) => {
                    setMake(e.target.value);
                    setModel("");
                    setError("");
                  }}
                  className={selectClass}
                >
                  <option value="">Choose make</option>
                  {vehicleMakes.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </SelectField>
              <SelectField label="Model, year & engine">
                <select
                  value={model}
                  disabled={!make}
                  onChange={(e) => {
                    setModel(e.target.value);
                    setError("");
                  }}
                  className={`${selectClass} disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
                >
                  <option value="">{make ? "Choose model" : "Choose make first"}</option>
                  {models.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </SelectField>
            </div>
            {error && (
              <p role="alert" className="mt-2 animate-shake text-xs font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn-shine mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(232,172,0,0.7)]"
            >
              <Check className="h-4 w-4" /> Check Compatibility
            </button>

            {vehicle && (
              <p className="mt-3 flex animate-fade-up items-center justify-between gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                <span>
                  Checking fit for <strong>{vehicle.make} {vehicle.label}</strong>
                </span>
                <button type="button" onClick={onClear} className="font-semibold underline underline-offset-2 hover:text-ink">
                  Clear
                </button>
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const selectClass =
  "h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white pr-9 pl-3 text-sm text-ink transition-all duration-200 hover:border-slate-400 focus:border-brand-dark focus:ring-2 focus:ring-brand/30 focus:outline-none";

function SelectField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-ink">{label}</span>
      <span className="relative mt-1.5 block">
        {children}
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </span>
    </label>
  );
}

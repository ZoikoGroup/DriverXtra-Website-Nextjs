"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Check, ChevronDown, Info, Loader2, Pencil, Search } from "lucide-react";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import Stepper, { ErrorBanner } from "@/components/selling/Stepper";
import { CheckRow, Field, OptionGroup, PrimaryButton, SecondaryButton, StepNav, StepTitle, inputClass } from "@/components/selling/FormParts";
import { conditionLevels, years } from "@/components/selling/data";
import { DEFAULT_REGION, regions, useRegion } from "@/lib/region";
import {
  damageOptions,
  exampleEstimate,
  exampleLookup,
  lookupModes,
  steps,
  type ExampleVehicle,
  type LookupMode,
  type StepId,
} from "./data";

export type ValuationPrefill = {
  mode?: LookupMode;
  identifier?: string;
  make?: string;
  model?: string;
  mileage?: string;
};

type FormData = {
  mode: LookupMode;
  identifier: string;
  make: string;
  model: string;
  year: string;
  mileage: string;
  condition: string;
  damage: string;
  area: string;
  confirmed: boolean;
};

type Errors = Partial<Record<keyof FormData | "vehicle", string>>;

const plateCode: Record<string, string> = { US: "USA", GB: "UK" };
const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function ValuationWizard({ prefill = {} }: { prefill?: ValuationPrefill }) {
  const region = useRegion();
  const regionCode = regions.find((r) => r.name === region)?.code ?? "GB";
  const initial: FormData = {
    mode: prefill.mode ?? "registration",
    identifier: prefill.identifier ?? "",
    make: prefill.make ?? "",
    model: prefill.model ?? "",
    year: "",
    mileage: prefill.mileage ?? "",
    condition: "",
    damage: "",
    area: "",
    confirmed: false,
  };

  const [step, setStep] = useState<StepId>(1);
  const [maxStep, setMaxStep] = useState<StepId>(1);
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [attempt, setAttempt] = useState(0);
  const [lookup, setLookup] = useState<"idle" | "searching" | "found">("idle");
  const [found, setFound] = useState<ExampleVehicle | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(prefill.mode === "make-model");
  const [estimating, setEstimating] = useState(false);
  const [estimatedAt, setEstimatedAt] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // The vehicle as currently described — from a lookup or typed details.
  const vehicle: ExampleVehicle | null =
    found ??
    (data.make.trim() && data.model.trim() && data.year
      ? { year: Number(data.year), make: data.make.trim(), model: data.model.trim() }
      : null);

  const update = (patch: Partial<FormData>) => {
    setData((d) => ({ ...d, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      (Object.keys(patch) as (keyof FormData)[]).forEach((k) => delete next[k]);
      if ("make" in patch || "model" in patch || "year" in patch || "identifier" in patch) delete next.vehicle;
      return next;
    });
  };

  /** Shows the errors; returns true when there are any. */
  const fail = (errs: Errors) => {
    setErrors(errs);
    if (Object.keys(errs).length) {
      setAttempt((a) => a + 1);
      return true;
    }
    return false;
  };

  const goTo = (next: StepId) => {
    setStep(next);
    setMaxStep((m) => (next > m ? next : m));
    setErrors({});
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 100) cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const changeMode = (mode: LookupMode) => {
    update({ mode, identifier: "" });
    setFound(null);
    setLookup("idle");
    if (mode === "make-model") setDetailsOpen(true);
  };

  const findVehicle = () => {
    const id = data.identifier.replace(/\s/g, "");
    if (data.mode === "registration" && (id.length < 2 || id.length > 8)) return fail({ identifier: "Enter a registration plate, e.g. AB12 CDE." });
    if (data.mode === "vin" && !/^[A-HJ-NPR-Z0-9]{17}$/i.test(id)) return fail({ identifier: "A VIN has 17 letters and numbers (no I, O or Q)." });
    setErrors({});
    setLookup("searching");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setFound(exampleLookup(id));
      setLookup("found");
    }, 900);
  };

  const confirmVehicle = () => {
    if (vehicle) return goTo(2);
    const e: Errors = {};
    if (data.mode === "make-model" || detailsOpen) {
      if (!data.make.trim()) e.make = "Enter the make.";
      if (!data.model.trim()) e.model = "Enter the model.";
      if (!data.year) e.year = "Choose the year.";
    } else {
      e.vehicle = "Find the vehicle, or enter its details.";
    }
    fail(e);
  };

  const nextFromCondition = () => {
    const e: Errors = {};
    if (!data.mileage || Number(data.mileage) < 0) e.mileage = "Enter the current mileage.";
    if (!data.condition) e.condition = "Choose the overall condition.";
    if (!data.damage) e.damage = "Tell us about any damage.";
    if (data.area.trim().length < 2) e.area = "Enter your postcode area or town.";
    if (!fail(e)) goTo(3);
  };

  const getEstimate = () => {
    if (fail(data.confirmed ? {} : { confirmed: "Please confirm your details first." })) return;
    setEstimating(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setEstimatedAt(new Date().toLocaleDateString("en-GB", { dateStyle: "long" }));
      setEstimating(false);
      goTo(4);
    }, 1400);
  };

  const restart = () => {
    setData({ ...initial, identifier: "", make: "", model: "", mileage: "" });
    setFound(null);
    setLookup("idle");
    setDetailsOpen(false);
    setMaxStep(1);
    goTo(1);
  };

  const estimate = vehicle && step === 4 ? exampleEstimate(vehicle.year, Number(data.mileage), data.condition, data.damage) : null;
  const hasCoverage = region === DEFAULT_REGION;
  const canOpen = (id: StepId) => id <= maxStep && (id !== 4 || !!estimatedAt);
  const isDone = (id: StepId) => id < maxStep && id !== step;

  const conditionLabel = conditionLevels.find((c) => c.id === data.condition)?.label;
  const damageLabel = damageOptions.find((d) => d.id === data.damage)?.label;

  return (
    <section id="valuation" className="scroll-mt-28 bg-slate-50 py-20 md:py-24">
      <div className={container}>
        <SectionTitle eyebrow="Value My Vehicle" title="Your valuation" description="Four short steps. You can change anything before you get your estimate." />

        <Reveal delay={150}>
          <Stepper steps={steps} step={step} isDone={isDone} canOpen={canOpen} onSelect={goTo} />
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
          <Reveal delay={250}>
            <div ref={cardRef} className="scroll-mt-32 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <ErrorBanner errors={Object.values(errors).filter(Boolean) as string[]} attempt={attempt} />

              <div key={step} className="animate-fade-up">
                {step === 1 && (
                  <>
                    <StepTitle>Which vehicle are we valuing?</StepTitle>
                    <div className="mt-4 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
                      {lookupModes.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => changeMode(m.id)}
                          className={`rounded-lg py-2.5 text-xs font-semibold transition-all duration-300 sm:text-[13px] ${
                            data.mode === m.id ? "bg-ink text-white shadow" : "text-slate-500 hover:text-ink"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>

                    {data.mode !== "make-model" && (
                      <div key={data.mode} className="animate-fade-up">
                        <p className="mt-5 text-[13px] font-bold text-ink">{data.mode === "registration" ? "Registration plate" : "Vehicle identification number (VIN)"}</p>
                        <div className="mt-1.5 flex flex-wrap gap-2">
                          {data.mode === "registration" ? (
                            <div
                              className={`flex h-12 min-w-0 flex-1 overflow-hidden rounded-lg border-2 transition-shadow duration-300 focus-within:shadow-[0_0_0_4px_rgba(255,194,14,0.35)] ${
                                errors.identifier ? "border-red-500" : "border-ink"
                              }`}
                            >
                              <span className="grid w-12 shrink-0 place-items-center bg-blue-700 text-[10px] font-bold text-white">
                                {plateCode[regionCode] ?? regionCode}
                              </span>
                              <input
                                value={data.identifier}
                                onChange={(e) => {
                                  update({ identifier: e.target.value.toUpperCase() });
                                  setFound(null);
                                  setLookup("idle");
                                }}
                                placeholder="AB12 CDE"
                                aria-label="Registration plate"
                                maxLength={10}
                                className="w-full min-w-0 bg-[#f7d117] px-3 text-center text-xl font-extrabold tracking-[0.2em] text-ink placeholder:text-ink/35 focus:outline-none"
                              />
                            </div>
                          ) : (
                            <input
                              value={data.identifier}
                              onChange={(e) => {
                                update({ identifier: e.target.value.toUpperCase() });
                                setFound(null);
                                setLookup("idle");
                              }}
                              placeholder="17 characters"
                              aria-label="VIN"
                              maxLength={17}
                              className={`${inputClass(errors.identifier)} h-12 min-w-0 flex-1 font-semibold tracking-wider`}
                            />
                          )}
                          <button
                            type="button"
                            onClick={findVehicle}
                            disabled={lookup === "searching"}
                            className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lg disabled:opacity-80"
                          >
                            {lookup === "searching" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                            {lookup === "searching" ? "Finding…" : "Find Vehicle"}
                          </button>
                        </div>
                        {errors.identifier ? (
                          <p className="mt-1.5 animate-fade-up text-xs font-medium text-red-600">{errors.identifier}</p>
                        ) : (
                          <p className="mt-1.5 text-xs text-slate-500">Finds the vehicle record only. Not proof of ownership.</p>
                        )}

                        {lookup === "found" && found && (
                          <div className="mt-4 flex animate-fade-up items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                            <span className="grid h-9 w-9 animate-pop place-items-center rounded-full bg-emerald-500 text-white">
                              <Check className="h-5 w-5" />
                            </span>
                            <div className="text-sm">
                              <p className="font-bold text-emerald-800">
                                {found.year} {found.make} {found.model}
                              </p>
                              <p className="text-xs text-emerald-700">Example record — demo data until the vehicle lookup is connected.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Manual details */}
                    <div className={`mt-5 rounded-xl border transition-colors ${errors.vehicle ? "border-red-300" : "border-slate-200"}`}>
                      {data.mode !== "make-model" && (
                        <button
                          type="button"
                          onClick={() => setDetailsOpen((o) => !o)}
                          aria-expanded={detailsOpen}
                          className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-ink"
                        >
                          Enter the details
                          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${detailsOpen ? "rotate-180" : ""}`} />
                        </button>
                      )}
                      <div className={`grid transition-[grid-template-rows] duration-500 ${detailsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                        <div className="overflow-hidden">
                          <div className="grid gap-x-4 px-4 pb-4 sm:grid-cols-3">
                            <Field label="Make" error={errors.make}>
                              <input value={data.make} onChange={(e) => { update({ make: e.target.value }); setFound(null); }} placeholder="e.g. Toyota" className={inputClass(errors.make)} />
                            </Field>
                            <Field label="Model" error={errors.model}>
                              <input value={data.model} onChange={(e) => { update({ model: e.target.value }); setFound(null); }} placeholder="e.g. Corolla" className={inputClass(errors.model)} />
                            </Field>
                            <Field label="Year" error={errors.year}>
                              <select value={data.year} onChange={(e) => { update({ year: e.target.value }); setFound(null); }} className={inputClass(errors.year)}>
                                <option value="">Choose year</option>
                                {years.map((y) => (
                                  <option key={y}>{y}</option>
                                ))}
                              </select>
                            </Field>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <PrimaryButton onClick={confirmVehicle}>Confirm This Vehicle</PrimaryButton>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <StepTitle>Mileage and condition</StepTitle>
                    <div className="mt-1 grid gap-x-4 sm:grid-cols-2">
                      <Field label="Current mileage (miles)" error={errors.mileage}>
                        <input type="number" inputMode="numeric" min={0} value={data.mileage} onChange={(e) => update({ mileage: e.target.value })} placeholder="e.g. 24000" className={inputClass(errors.mileage)} />
                      </Field>
                      <Field label="Postcode area or town" error={errors.area} hint="Only the area — never your full address.">
                        <input value={data.area} onChange={(e) => update({ area: e.target.value.toUpperCase() })} placeholder="e.g. M1 or Leeds" className={inputClass(errors.area)} />
                      </Field>
                    </div>
                    <p className="mt-5 text-[13px] font-bold text-ink">Overall condition</p>
                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                      {conditionLevels.map((c) => {
                        const active = data.condition === c.id;
                        return (
                          <label
                            key={c.id}
                            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
                              active ? "border-brand bg-brand-light/50 shadow-md" : errors.condition ? "border-red-300" : "border-slate-200 hover:border-slate-400"
                            }`}
                          >
                            <input type="radio" name="vmv-condition" checked={active} onChange={() => update({ condition: c.id })} className="mt-0.5 h-4 w-4 accent-ink" />
                            <span>
                              <span className="block text-sm font-bold text-ink">{c.label}</span>
                              <span className="block text-xs text-slate-500">{c.text}</span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    <div className="mt-4">
                      <OptionGroup
                        title="Damage"
                        name="vmv-damage"
                        options={damageOptions.map((d) => d.label)}
                        value={damageLabel ?? ""}
                        onChange={(label) => update({ damage: damageOptions.find((d) => d.label === label)?.id ?? "" })}
                        error={errors.damage}
                      />
                    </div>
                    <StepNav onBack={() => goTo(1)} onNext={nextFromCondition} />
                  </>
                )}

                {step === 3 && (
                  <>
                    <StepTitle>Review your details</StepTitle>
                    <dl className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-200">
                      {[
                        { label: "Vehicle", value: vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : "—", edit: 1 as StepId },
                        { label: "Mileage", value: `${Number(data.mileage).toLocaleString("en-US")} mi`, edit: 2 as StepId },
                        { label: "Condition", value: conditionLabel ?? "—", edit: 2 as StepId },
                        { label: "Damage", value: damageLabel ?? "—", edit: 2 as StepId },
                        { label: "Area", value: data.area || "—", edit: 2 as StepId },
                      ].map((row, i) => (
                        <div key={row.label} className="flex animate-fade-up items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-50" style={{ animationDelay: `${i * 60}ms` }}>
                          <dt className="w-24 shrink-0 text-xs font-semibold text-slate-500">{row.label}</dt>
                          <dd className="flex-1 text-sm text-ink">{row.value}</dd>
                          <button type="button" onClick={() => goTo(row.edit)} className="group inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-ink">
                            <Pencil className="h-3 w-3 transition-transform group-hover:-rotate-12" /> Edit
                          </button>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-4">
                      <CheckRow
                        label="These details are accurate to the best of my knowledge."
                        checked={data.confirmed}
                        onChange={() => update({ confirmed: !data.confirmed })}
                        error={!!errors.confirmed}
                      />
                    </div>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                      <button type="button" onClick={() => goTo(2)} className="text-sm font-semibold text-slate-600 hover:text-ink">
                        ← Back
                      </button>
                      <PrimaryButton onClick={getEstimate} disabled={estimating}>
                        {estimating ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Calculating…
                          </>
                        ) : (
                          <>
                            <Calculator className="h-4 w-4" /> Get My Estimate
                          </>
                        )}
                      </PrimaryButton>
                    </div>
                  </>
                )}

                {step === 4 && vehicle && (
                  <>
                    <StepTitle>Your estimate</StepTitle>
                    <p className="mt-1 text-sm text-slate-500">
                      {vehicle.year} {vehicle.make} {vehicle.model} · {Number(data.mileage).toLocaleString("en-US")} mi · {region}
                    </p>

                    {hasCoverage && estimate ? (
                      <div className="mt-5 overflow-hidden rounded-2xl bg-navy p-6 text-white">
                        <p className="text-xs font-semibold tracking-wider text-brand uppercase">Estimated market range</p>
                        <p className="mt-2 animate-fade-up text-3xl font-extrabold sm:text-4xl">
                          {money(estimate.low)} <span className="text-slate-500">–</span> {money(estimate.high)}
                        </p>
                        {/* Range bar fills in once */}
                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full origin-left animate-[range-fill_1.2s_cubic-bezier(0.16,1,0.3,1)_both] rounded-full bg-gradient-to-r from-brand-dark to-brand" />
                        </div>
                        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                          <div>
                            <dt className="text-xs text-slate-400">Method</dt>
                            <dd>Age, mileage &amp; condition model</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-slate-400">Date</dt>
                            <dd>{estimatedAt}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-slate-400">Confidence</dt>
                            <dd className="font-semibold text-brand">{estimate.confidence}</dd>
                          </div>
                        </dl>
                        <p className="mt-4 flex gap-2 border-t border-white/10 pt-4 text-xs text-slate-400">
                          <Info className="h-3.5 w-3.5 shrink-0" /> Example estimate for design review — not market data, and not a purchase offer.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-5 animate-fade-up rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
                        <p className="font-bold">No estimate available in {region} yet</p>
                        <p className="mt-1">We don&apos;t have enough reliable data for this market, so we won&apos;t guess. You can still sell another way.</p>
                      </div>
                    )}

                    <p className="mt-6 text-[13px] font-bold text-ink">What would you like to do next?</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <Link
                        href="/list-and-manage"
                        className="btn-shine group inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg"
                      >
                        Create a Listing <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <SecondaryButton href="/instant-offer">Check Instant Offer</SecondaryButton>
                      <SecondaryButton href="/trade-in">Explore Trade-In</SecondaryButton>
                      <SecondaryButton onClick={restart}>Value another vehicle</SecondaryButton>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Reveal>

          {/* Live summary */}
          <Reveal direction="left" delay={350} className="h-full">
            <aside className="sticky top-36 rounded-2xl bg-navy p-5 text-white shadow-[0_24px_48px_-24px_rgba(11,18,32,0.8)]">
              <svg viewBox="0 0 120 50" className={`mx-auto h-16 w-40 transition-all duration-700 ${vehicle ? "text-brand" : "text-brand/60"}`} aria-hidden="true">
                <path
                  d="M8 36v-6c0-3 2-5 5-5.5l14-2 13-11c2-1.5 4.5-2.5 7-2.5h26c4 0 7.5 1.5 10 4l10 9.5 13 2.5c3 .6 5 3 5 6v5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M30 36h52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <circle cx="24" cy="38" r="7" fill="none" stroke="currentColor" strokeWidth="3" />
                <circle cx="91" cy="38" r="7" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
              <p className="mt-4 text-xs text-slate-400">Your vehicle</p>
              <p key={vehicle ? `${vehicle.year}${vehicle.model}` : "none"} className="mt-1 animate-fade-up text-lg font-bold">
                {vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : "Vehicle not identified"}
              </p>
              <dl className="mt-4 divide-y divide-white/10 border-t border-white/10 text-xs">
                {[
                  { label: "Mileage", value: data.mileage ? `${Number(data.mileage).toLocaleString("en-US")} mi` : "" },
                  { label: "Condition", value: conditionLabel ?? "" },
                  { label: "Damage", value: damageLabel ?? "" },
                  { label: "Area", value: data.area },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between gap-3 py-2.5">
                    <dt className="text-slate-400">{row.label}</dt>
                    <dd key={row.value} className={row.value ? "animate-fade-up text-right font-semibold text-white" : "text-slate-500"}>
                      {row.value || "Not added yet"}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 flex gap-2 text-[11px] leading-relaxed text-slate-400">
                <Info className="mt-px h-3.5 w-3.5 shrink-0" />
                Everything here is your declaration — not an inspection or history check.
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

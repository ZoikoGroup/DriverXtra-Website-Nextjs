"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Check, X, Plus, Minus, ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type VehicleConditionOption = {
  id: "excellent" | "good" | "fair" | "poor" | "unsure";
  label: string;
  description: string;
  multiplier: number;
};

const CONDITION_OPTIONS: VehicleConditionOption[] = [
  {
    id: "excellent",
    label: "Excellent",
    description: "Like-new inside and out; no faults; full records.",
    multiplier: 1.08,
  },
  {
    id: "good",
    label: "Good",
    description: "Normal wear for its age; minor marks; everything works.",
    multiplier: 1.0,
  },
  {
    id: "fair",
    label: "Fair",
    description: "Visible wear or a few minor faults needing attention.",
    multiplier: 0.88,
  },
  {
    id: "poor",
    label: "Poor",
    description: "Significant faults or damage; may need major repair.",
    multiplier: 0.72,
  },
  {
    id: "unsure",
    label: "I'm not sure",
    description: "We'll show a wider range.",
    multiplier: 0.95,
  },
];

const MARKET_OPTIONS = [
  { value: "uk", label: "United Kingdom (GBP)", currency: "£" },
  { value: "us", label: "United States (USD)", currency: "$" },
  { value: "eu", label: "European Union (EUR)", currency: "€" },
];

const MAKE_OPTIONS = [
  "Ford",
  "BMW",
  "Audi",
  "Mercedes-Benz",
  "Tesla",
  "Toyota",
];
const MODEL_OPTIONS: Record<string, string[]> = {
  Ford: ["Mustang", "Focus", "Puma", "Kuga"],
  BMW: ["3 Series", "M4", "X5", "i4"],
  Audi: ["A4", "A6", "Q5", "e-tron"],
  "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "EQC"],
  Tesla: ["Model 3", "Model Y", "Model S", "Roadster"],
  Toyota: ["Corolla", "RAV4", "Yaris", "Camry"],
};
const YEAR_OPTIONS = Array.from({ length: 15 }, (_, i) => String(2026 - i));
const TRIM_OPTIONS = ["Base", "Sport", "SE", "Premium", "Performance"];

type PricingGuidanceCalculatorSectionProps = {
  id?: string;
  sectionHeading?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function PricingGuidanceCalculatorSection({
  id = "pricing-guidance-calculator",
  sectionHeading = "Tell us about your vehicle",
  imageSrc = "/images/auto/9.png",
  imageAlt = "Front profile view of a performance muscle car",
  className = "bg-white",
}: PricingGuidanceCalculatorSectionProps) {
  // Step 1 state
  const [market, setMarket] = useState<string>("");
  const [odometerUnit, setOdometerUnit] = useState<"Miles" | "Kilometres">(
    "Miles",
  );

  // Step 2 state
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [trim, setTrim] = useState<string>("");
  const [notSureTrim, setNotSureTrim] = useState<boolean>(false);

  // Step 3 state
  const [odometer, setOdometer] = useState<string>("");
  const [condition, setCondition] = useState<VehicleConditionOption["id"] | "">(
    "",
  );
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [historyNotes, setHistoryNotes] = useState<string>("");

  // Result state
  const [estimateRange, setEstimateRange] = useState<{
    low: string;
    high: string;
    currency: string;
  } | null>(null);

  const selectedCurrency =
    MARKET_OPTIONS.find((m) => m.value === market)?.currency || "£";

  const handleCalculate = () => {
    const selectedCond = CONDITION_OPTIONS.find((c) => c.id === condition);
    const baseValue = 22500;
    const yearNum = parseInt(year || "2022", 10);
    const ageFactor = Math.max(0.45, 1 - (2026 - yearNum) * 0.06);
    const mileageNum = parseInt(odometer || "25000", 10);
    const mileageFactor = Math.max(0.6, 1 - mileageNum / 250000);
    const condMultiplier = selectedCond ? selectedCond.multiplier : 1;

    const mid = baseValue * ageFactor * mileageFactor * condMultiplier;
    const spread = condition === "unsure" || notSureTrim ? 0.14 : 0.08;

    const low = Math.round((mid * (1 - spread)) / 50) * 50;
    const high = Math.round((mid * (1 + spread)) / 50) * 50;

    setEstimateRange({
      low: low.toLocaleString(),
      high: high.toLocaleString(),
      currency: selectedCurrency,
    });
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: 3-Step Form + Submit Button (7 cols) */}
          <div className="lg:col-span-7">
            <Reveal delay={50}>
              <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                {sectionHeading}
              </h2>
            </Reveal>

            <div className="mt-6 space-y-5">
              {/* STEP 1 CARD */}
              <Reveal delay={80}>
                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0B1220] text-xs font-extrabold text-white">
                      1
                    </span>
                    <h3 className="text-sm font-bold text-ink sm:text-base">
                      Where will you list your vehicle?
                    </h3>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="listing-market"
                        className="mb-1.5 block text-[11px] font-bold text-slate-600"
                      >
                        Country or region
                      </label>
                      <div className="relative">
                        <select
                          id="listing-market"
                          value={market}
                          onChange={(e) => setMarket(e.target.value)}
                          className="w-full appearance-none rounded-2xl border border-slate-200/90 bg-white py-3 pl-4 pr-10 text-xs font-medium text-ink shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden sm:text-sm"
                        >
                          <option value="">Choose a market</option>
                          {MARKET_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="odometer-units"
                        className="mb-1.5 block text-[11px] font-bold text-slate-600"
                      >
                        Odometer units
                      </label>
                      <div className="relative">
                        <select
                          id="odometer-units"
                          value={odometerUnit}
                          onChange={(e) =>
                            setOdometerUnit(
                              e.target.value as "Miles" | "Kilometres",
                            )
                          }
                          className="w-full appearance-none rounded-2xl border border-slate-200/90 bg-white py-3 pl-4 pr-10 text-xs font-medium text-ink shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden sm:text-sm"
                        >
                          <option value="Miles">Miles</option>
                          <option value="Kilometres">Kilometres</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* STEP 2 CARD */}
              <Reveal delay={110}>
                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-200 text-xs font-extrabold text-slate-600">
                      2
                    </span>
                    <h3 className="text-sm font-bold text-ink sm:text-base">
                      Tell us about your vehicle
                    </h3>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="vehicle-make"
                        className="mb-1.5 block text-[11px] font-bold text-slate-600"
                      >
                        Make
                      </label>
                      <div className="relative">
                        <select
                          id="vehicle-make"
                          value={make}
                          onChange={(e) => {
                            setMake(e.target.value);
                            setModel("");
                          }}
                          className="w-full appearance-none rounded-2xl border border-slate-200/90 bg-white py-3 pl-4 pr-10 text-xs font-medium text-ink shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden sm:text-sm"
                        >
                          <option value="">Choose make</option>
                          {MAKE_OPTIONS.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="vehicle-model"
                        className="mb-1.5 block text-[11px] font-bold text-slate-600"
                      >
                        Model
                      </label>
                      <div className="relative">
                        <select
                          id="vehicle-model"
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          disabled={!make}
                          className="w-full appearance-none rounded-2xl border border-slate-200/90 bg-white py-3 pl-4 pr-10 text-xs font-medium text-ink shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden disabled:bg-slate-50 disabled:text-slate-400 sm:text-sm"
                        >
                          <option value="">Choose model</option>
                          {(make ? MODEL_OPTIONS[make] || [] : []).map(
                            (mod) => (
                              <option key={mod} value={mod}>
                                {mod}
                              </option>
                            ),
                          )}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="vehicle-year"
                        className="mb-1.5 block text-[11px] font-bold text-slate-600"
                      >
                        Year
                      </label>
                      <div className="relative">
                        <select
                          id="vehicle-year"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full appearance-none rounded-2xl border border-slate-200/90 bg-white py-3 pl-4 pr-10 text-xs font-medium text-ink shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden sm:text-sm"
                        >
                          <option value="">Choose year</option>
                          {YEAR_OPTIONS.map((yr) => (
                            <option key={yr} value={yr}>
                              {yr}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Trim Field */}
                  <div className="mt-4 sm:w-1/3 sm:pr-2">
                    <label
                      htmlFor="vehicle-trim"
                      className="mb-1.5 block text-[11px] font-bold text-slate-600"
                    >
                      Trim
                    </label>
                    <div className="relative">
                      <select
                        id="vehicle-trim"
                        value={trim}
                        onChange={(e) => setTrim(e.target.value)}
                        disabled={notSureTrim}
                        className="w-full appearance-none rounded-2xl border border-slate-200/90 bg-white py-3 pl-4 pr-10 text-xs font-medium text-ink shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden disabled:bg-slate-50 disabled:text-slate-400 sm:text-sm"
                      >
                        <option value="">Choose trim</option>
                        {TRIM_OPTIONS.map((tr) => (
                          <option key={tr} value={tr}>
                            {tr}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {/* Checkbox */}
                  <label className="mt-4 inline-flex cursor-pointer items-center gap-2.5 text-xs font-medium text-slate-600">
                    <input
                      type="checkbox"
                      checked={notSureTrim}
                      onChange={(e) => {
                        setNotSureTrim(e.target.checked);
                        if (e.target.checked) setTrim("");
                      }}
                      className="h-4 w-4 rounded border-slate-300 text-ink focus:ring-ink"
                    />
                    <span>I&apos;m not sure of the exact trim</span>
                  </label>

                  {/* Helper Footer */}
                  <p className="mt-5 text-[11px] text-slate-400">
                    No VIN or registration needed.{" "}
                    <a
                      href="#need-help-identifying"
                      className="font-medium text-slate-500 underline underline-offset-2 hover:text-ink"
                    >
                      Need help identifying your vehicle?
                    </a>
                  </p>
                </div>
              </Reveal>

              {/* STEP 3 CARD */}
              <Reveal delay={140}>
                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-200 text-xs font-extrabold text-slate-600">
                      3
                    </span>
                    <h3 className="text-sm font-bold text-ink sm:text-base">
                      Describe its condition as accurately as you can
                    </h3>
                  </div>

                  {/* Current Odometer Reading */}
                  <div className="mt-5">
                    <label
                      htmlFor="current-odometer"
                      className="mb-1.5 block text-[11px] font-bold text-slate-600"
                    >
                      Current odometer reading
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="1"
                        id="current-odometer"
                        value={odometer}
                        onChange={(e) => setOdometer(e.target.value)}
                        placeholder=""
                        className="w-full rounded-2xl border border-slate-200/90 bg-white py-3 pl-4 pr-16 text-xs font-medium text-ink shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden sm:text-sm"
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                        {odometerUnit.toLowerCase()}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[11px] text-slate-400">
                      Whole numbers only.
                    </p>
                  </div>

                  {/* Condition Selector */}
                  <div className="mt-5">
                    <span className="mb-2 block text-[11px] font-bold text-slate-600">
                      Condition
                    </span>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {CONDITION_OPTIONS.map((option) => {
                        const isSelected = condition === option.id;

                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setCondition(option.id)}
                            className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                              isSelected
                                ? "border-ink bg-slate-50/70 ring-1 ring-ink"
                                : "border-slate-200/80 bg-white hover:border-slate-300"
                            }`}
                          >
                            {/* Radio Circle */}
                            <span
                              className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                                isSelected
                                  ? "border-ink bg-ink"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {isSelected && (
                                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                              )}
                            </span>

                            <div>
                              <div className="text-xs font-bold text-ink">
                                {option.label}
                              </div>
                              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                                {option.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <p className="mt-3 text-xs font-medium text-slate-400">
                      Choose a condition, or &quot;I&apos;m not sure&quot;.
                    </p>
                  </div>

                  {/* History (optional) Expandable Accordion */}
                  <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white">
                    <button
                      type="button"
                      onClick={() => setHistoryOpen(!historyOpen)}
                      className="flex w-full items-center justify-between gap-4 p-4 text-left"
                    >
                      <div>
                        <div className="text-xs font-bold text-ink">
                          History (optional)
                        </div>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          Your own description — not a certified inspection
                        </p>
                      </div>

                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500">
                        {historyOpen ? (
                          <Minus className="h-3.5 w-3.5 stroke-[2.5]" />
                        ) : (
                          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                        )}
                      </span>
                    </button>

                    {historyOpen && (
                      <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                        <textarea
                          rows={3}
                          value={historyNotes}
                          onChange={(e) => setHistoryNotes(e.target.value)}
                          placeholder="Service stamps, recent tyres, bodywork notes..."
                          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-ink placeholder-slate-400 focus:border-slate-400 focus:outline-hidden"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCalculate}
                  className="rounded-full bg-[#F5B400] px-7 py-3.5 text-xs font-extrabold text-ink shadow-xs transition-all hover:bg-[#e0a400] sm:text-sm"
                >
                  View pricing guidance
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Possible Asking-Price Range Card (5 cols) */}
          <Reveal delay={150} className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              <h3 className="text-lg font-extrabold tracking-tight text-ink sm:text-xl">
                Possible asking-price range
              </h3>

              {/* Edge-to-edge Car Image */}
              <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-900">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              {estimateRange ? (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="text-[11px] font-bold tracking-wider text-amber-600 uppercase">
                    Indicative Asking Range
                  </div>
                  <div className="mt-1.5 text-2xl font-extrabold text-ink sm:text-3xl">
                    {estimateRange.currency}
                    {estimateRange.low} – {estimateRange.currency}
                    {estimateRange.high}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Based on entered condition, mileage, and regional market
                    context.
                  </p>
                </div>
              ) : (
                <p className="mt-5 text-xs leading-relaxed text-slate-500 sm:text-sm">
                  Complete the steps to see a range, the evidence behind it, and
                  what it doesn&apos;t cover.
                </p>
              )}

              {/* Feature / Disclaimer Checklist */}
              <ul className="mt-6 space-y-3 text-xs font-medium text-slate-600">
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                  <span>No sign-in needed</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                  <span>No VIN or registration needed</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <X className="h-4 w-4 shrink-0 text-rose-500 stroke-[2.5]" />
                  <span>Not an offer or guaranteed sale price</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

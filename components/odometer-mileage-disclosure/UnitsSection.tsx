"use client";

import { useId, useState } from "react";
import { ChevronDown, TriangleAlert } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { KM_PER_MILE, unitWarnings } from "./data";

type Unit = "mi" | "km";

const format = (n: number) => Math.round(n).toLocaleString("en-GB");

export default function UnitsSection() {
  const ids = useId();
  const [reading, setReading] = useState("");
  const [unit, setUnit] = useState<Unit>("mi");

  const value = Number(reading.replace(/[,\s]/g, ""));
  const valid = reading.trim() !== "" && Number.isFinite(value) && value >= 0;
  const result = valid
    ? unit === "mi"
      ? `${format(value)} mi ≈ ${format(value * KM_PER_MILE)} km`
      : `${format(value)} km ≈ ${format(value / KM_PER_MILE)} mi`
    : null;

  return (
    <section id="units" className="scroll-mt-28 bg-slate-50 py-16 md:py-20">
      <div className={container}>
        <SectionTitle
          eyebrow="Units"
          title="Miles and kilometres"
          description="Always record the unit shown on the display. Conversions are illustrative only — your raw reading is never changed."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-bold text-ink">Illustrative converter</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                <div>
                  <label htmlFor={`${ids}-reading`} className="block text-xs font-bold text-ink">
                    Reading
                  </label>
                  <input
                    id={`${ids}-reading`}
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="For example: 48210"
                    value={reading}
                    onChange={(e) => setReading(e.target.value)}
                    aria-describedby={`${ids}-result`}
                    aria-invalid={reading.trim() !== "" && !valid ? true : undefined}
                    className="mt-1.5 h-11 w-44 rounded-xl border border-slate-200 bg-white px-3 text-sm text-ink placeholder:text-slate-400 focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor={`${ids}-unit`} className="block text-xs font-bold text-ink">
                    Shown in
                  </label>
                  <div className="relative mt-1.5">
                    <select
                      id={`${ids}-unit`}
                      value={unit}
                      onChange={(e) => setUnit(e.target.value as Unit)}
                      className="h-11 w-44 appearance-none rounded-xl border border-slate-200 bg-white pr-9 pl-3 text-sm text-ink focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
                    >
                      <option value="mi">Miles (mi)</option>
                      <option value="km">Kilometres (km)</option>
                    </select>
                    <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  </div>
                </div>
              </div>
              <p id={`${ids}-result`} aria-live="polite" className="mt-3 text-sm text-slate-600">
                {result ? (
                  <>
                    <span className="font-semibold text-ink">{result}</span>
                    <span className="block text-xs text-slate-500">Approximate — record the reading in the unit shown.</span>
                  </>
                ) : reading.trim() !== "" ? (
                  <span className="text-red-600">Enter a number using digits only.</span>
                ) : (
                  "Enter a number to see an approximate conversion."
                )}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-bold text-ink">Watch for</h3>
              <ul className="mt-3 space-y-2.5">
                {unitWarnings.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                    <TriangleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

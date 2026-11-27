"use client";

import { Check } from "lucide-react";

/** Pill-style single-choice group built on radio inputs, so arrow keys work. */
export default function ChipGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  hideLegend,
}: {
  legend: string;
  name: string;
  options: readonly T[];
  value: T | null;
  onChange: (v: T) => void;
  hideLegend?: boolean;
}) {
  return (
    <fieldset className="rounded-xl border border-slate-200 bg-white px-3 pt-2 pb-3">
      <legend className={hideLegend ? "sr-only" : "px-1 text-[13px] font-semibold text-ink"}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o;
          return (
            <label key={o} className="cursor-pointer">
              <input type="radio" name={name} checked={on} onChange={() => onChange(o)} className="peer sr-only" />
              <span
                className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-[13px] font-semibold transition-all duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-brand/50 ${
                  on ? "border-ink bg-ink text-white" : "border-slate-200 text-ink hover:-translate-y-0.5 hover:border-brand hover:bg-brand-light"
                }`}
              >
                {on && <Check className="h-3.5 w-3.5 animate-pop text-brand" strokeWidth={3} />}
                {o}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

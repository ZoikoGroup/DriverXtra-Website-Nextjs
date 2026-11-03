"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { reviewPoints } from "./data";

/** "Keep qualifications current" callout that expands to explain partner reviews. */
export default function ReviewsCallout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 border-l-4 border-l-brand bg-white p-5 transition-shadow duration-500 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.3)] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-xl">
          <h3 className="text-[15px] font-bold text-ink">Keep qualifications and report quality current.</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
            Training, credentials and quality reviews have their own lifecycle. Expired qualifications pause the affected inspection types until renewed.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="partner-reviews"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
        >
          How partner reviews work
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <div id="partner-reviews" className={`grid transition-all duration-500 ease-out ${open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <ul className="space-y-2 overflow-hidden">
          {reviewPoints.map((p) => (
            <li key={p} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

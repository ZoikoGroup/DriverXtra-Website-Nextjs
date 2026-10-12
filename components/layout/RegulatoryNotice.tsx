"use client";

import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";

const disclosures = [
  "Vehicle finance is provided by independent, authorised lenders. DriverXtra may receive a commission from finance partners; this does not affect the rate you are offered.",
  "Insurance products are arranged by regulated insurance partners. Cover, eligibility and pricing are determined by the insurer.",
  "Vehicle history, valuation and inspection data are supplied by third parties and should be independently verified before purchase.",
];

export default function RegulatoryNotice() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-3 border-b border-white/10 py-8">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
      <div className="max-w-4xl">
        <p className="text-sm leading-relaxed text-slate-300">
          DriverXtra is a technology marketplace and does not own listed inventory or act as the seller, dealer, lender,
          insurer, repairer or transport provider unless expressly stated. Vehicles, parts and services are offered by
          independent users and verified or regulated partners subject to applicable terms, eligibility and local law.
        </p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group mt-4 inline-flex items-center gap-1.5 border-b-2 border-brand pb-1 text-sm font-semibold text-white transition-colors hover:text-brand"
        >
          Read regulatory disclosures
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>

        <div className={`grid transition-[grid-template-rows] duration-500 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <ul className="overflow-hidden">
            {disclosures.map((text, i) => (
              <li
                key={i}
                className={`mt-3 border-l-2 border-brand/50 pl-3 text-[13px] leading-relaxed text-slate-400 transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${150 + i * 80}ms` : "0ms" }}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

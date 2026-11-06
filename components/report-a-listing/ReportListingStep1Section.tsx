"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export type ReportStep = {
  number: number;
  label: string;
  active: boolean;
};

const DEFAULT_STEPS: ReportStep[] = [
  { number: 1, label: "Listing", active: true },
  { number: 2, label: "Concern", active: false },
  { number: 3, label: "Details", active: false },
  { number: 4, label: "Evidence", active: false },
  { number: 5, label: "Contact", active: false },
  { number: 6, label: "Review", active: false },
];

const DEFAULT_WHAT_HAPPENS_NEXT = [
  "We receive your report",
  "It's routed to the right reviewers",
  "Reviewers assess it against policy",
  "Action, if any, follows review",
];

type ReportListingStep1SectionProps = {
  id?: string;
  steps?: ReportStep[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function ReportListingStep1Section({
  id = "report-listing-step1",
  steps = DEFAULT_STEPS,
  imageSrc = "/images/listing/2.png",
  imageAlt = "Two colleagues high-fiving over laptop in office workshop",
  className = "bg-white",
}: ReportListingStep1SectionProps) {
  const [listingInput, setListingInput] = useState("");
  const [reportRef, setReportRef] = useState("");

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Step Progress Bar */}
        <Reveal delay={50} className="mb-10">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-slate-100/80 p-2 border border-slate-200/60 w-fit">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  step.active
                    ? "bg-[#0B1220] text-white shadow-xs"
                    : "bg-white/80 text-slate-500 border border-slate-200/60"
                }`}
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-extrabold ${
                    step.active
                      ? "bg-[#F5B400] text-ink"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {step.number}
                </span>
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Main 2-Column Grid */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Form Box */}
          <Reveal delay={100} className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                Which listing are you reporting?
              </h2>

              <div className="mt-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Listing link or ID
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={listingInput}
                    onChange={(e) => setListingInput(e.target.value)}
                    placeholder="e.g. DX-L-1001 or a listing link"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-ink placeholder-slate-400 focus:border-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-400"
                  />
                </div>
                <p className="mt-2 text-[11px] text-slate-400">
                  Find it on the listing page. Try DX-L-1001, DX-L-2002 or
                  DX-L-3003.
                </p>
              </div>

              {/* I can't find the listing ID Collapsible/Card */}
              <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 transition-all hover:border-slate-300">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-ink sm:text-sm">
                      I can&apos;t find the listing ID
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Describe it instead
                    </p>
                  </div>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600">
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                  </span>
                </div>
              </div>

              {/* Continue Button */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-[#F5B400] px-8 py-3 text-xs font-bold text-ink shadow-2xs transition-all hover:bg-[#e0a400]"
                >
                  Continue
                </button>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Image + What Happens Next + Check a Report */}
          <div className="space-y-6 lg:col-span-5">
            {/* Top Image */}
            <Reveal direction="zoom" delay={120}>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-sm">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            {/* What Happens Next Box */}
            <Reveal delay={150}>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
                <h3 className="text-base font-bold text-ink sm:text-lg">
                  What happens next
                </h3>
                <ol className="mt-4 space-y-2.5 text-xs text-slate-600 sm:text-sm list-decimal list-inside leading-relaxed">
                  {DEFAULT_WHAT_HAPPENS_NEXT.map((stepText, idx) => (
                    <li key={idx} className="font-medium text-slate-700">
                      {stepText}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 border-t border-slate-100 pt-4 text-[11px] leading-relaxed text-slate-400">
                  Status information may be limited to protect privacy and the
                  review process.
                </p>
              </div>
            </Reveal>

            {/* Check a Report Box */}
            <Reveal delay={180}>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
                <h3 className="text-base font-bold text-ink sm:text-lg">
                  Check a report
                </h3>
                <div className="mt-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Report reference
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={reportRef}
                      onChange={(e) => setReportRef(e.target.value)}
                      placeholder="RL-XXXXXX"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-ink placeholder-slate-400 focus:border-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-400"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-2.5 text-xs font-bold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                  >
                    Check status
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

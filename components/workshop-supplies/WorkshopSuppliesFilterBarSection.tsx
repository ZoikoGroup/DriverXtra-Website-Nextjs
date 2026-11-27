"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type WorkshopJobOption = {
  value: string;
  label: string;
};

export type DeliveryMarketOption = {
  value: string;
  label: string;
};

const DEFAULT_JOB_OPTIONS: WorkshopJobOption[] = [
  { value: "any", label: "Any job" },
  { value: "ev-high-voltage", label: "EV & high-voltage servicing" },
  { value: "brakes-suspension", label: "Brakes, suspension & chassis" },
  {
    value: "diagnostics-electronics",
    label: "Diagnostics & vehicle electronics",
  },
  { value: "fluids-lubricants", label: "Fluids, lubricants & sealants" },
  { value: "bodywork-detailing", label: "Bodywork, prep & detailing" },
  {
    value: "fasteners-hardware",
    label: "Fasteners, clips & workshop hardware",
  },
];

const DEFAULT_DELIVERY_MARKETS: DeliveryMarketOption[] = [
  { value: "uk", label: "United Kingdom" },
  { value: "us", label: "United States" },
  { value: "eu", label: "European Union" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
];

type WorkshopSuppliesFilterBarSectionProps = {
  id?: string;
  jobLabel?: ReactNode;
  jobHelpText?: ReactNode;
  marketLabel?: ReactNode;
  marketHelpText?: ReactNode;
  jobOptions?: WorkshopJobOption[];
  marketOptions?: DeliveryMarketOption[];
  selectedJob?: string;
  selectedMarket?: string;
  onJobChange?: (jobValue: string) => void;
  onMarketChange?: (marketValue: string) => void;
  className?: string;
};

export default function WorkshopSuppliesFilterBarSection({
  id = "workshop-supplies-filters",
  jobLabel = "What job are you doing?",
  jobHelpText = "This filters supply families. It isn't linked to your saved vehicles.",
  marketLabel = "Delivery market",
  marketHelpText = "Delivery options will be confirmed for your location.",
  jobOptions = DEFAULT_JOB_OPTIONS,
  marketOptions = DEFAULT_DELIVERY_MARKETS,
  selectedJob: controlledJob,
  selectedMarket: controlledMarket,
  onJobChange,
  onMarketChange,
  className = "bg-white",
}: WorkshopSuppliesFilterBarSectionProps) {
  const [internalJob, setInternalJob] = useState<string>("any");
  const [internalMarket, setInternalMarket] = useState<string>("uk");

  const currentJob = controlledJob ?? internalJob;
  const currentMarket = controlledMarket ?? internalMarket;

  const handleJobSelect = (value: string) => {
    setInternalJob(value);
    onJobChange?.(value);
  };

  const handleMarketSelect = (value: string) => {
    setInternalMarket(value);
    onMarketChange?.(value);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-12 md:py-16 ${className}`}>
      <div className={container}>
        <Reveal delay={50}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Card: Job / Supply Family Filter */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7">
              <label
                htmlFor="workshop-job-filter"
                className="block text-xs font-bold text-ink sm:text-sm"
              >
                {jobLabel}
              </label>

              <div className="relative mt-3">
                <select
                  id="workshop-job-filter"
                  value={currentJob}
                  onChange={(e) => handleJobSelect(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-slate-200/90 bg-white py-3.5 pl-4 pr-10 text-xs font-medium text-ink shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden sm:text-sm"
                >
                  {jobOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>

              {jobHelpText && (
                <p className="mt-2.5 text-[11px] leading-relaxed text-slate-400 sm:text-xs">
                  {jobHelpText}
                </p>
              )}
            </div>

            {/* Right Card: Delivery Market Selector */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7">
              <label
                htmlFor="workshop-delivery-market"
                className="block text-xs font-bold text-ink sm:text-sm"
              >
                {marketLabel}
              </label>

              <div className="relative mt-3">
                <select
                  id="workshop-delivery-market"
                  value={currentMarket}
                  onChange={(e) => handleMarketSelect(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-slate-200/90 bg-white py-3.5 pl-4 pr-10 text-xs font-medium text-ink shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden sm:text-sm"
                >
                  {marketOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>

              {marketHelpText && (
                <p className="mt-2.5 text-[11px] leading-relaxed text-slate-400 sm:text-xs">
                  {marketHelpText}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type OperatingMarketSectionProps = {
  id?: string;
  className?: string;
};

export default function OperatingMarketSection({
  id,
  className = "bg-[#F6F8FB]",
}: OperatingMarketSectionProps) {
  const [market, setMarket] = useState("United Kingdom");
  const [dealerType, setDealerType] = useState("");

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="max-w-2xl">
          <SectionTitle
            eyebrow="Market"
            title="Choose your operating market to view relevant requirements"
          />
        </div>

        <div className="mt-8 max-w-xl space-y-6">
          {/* Market Status Card */}
          <Reveal delay={100}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-xs font-semibold text-slate-500">
                Your operating market
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-base font-bold text-ink">{market}</span>
                <span className="text-xs font-normal text-slate-400">·</span>
                <button
                  type="button"
                  onClick={() => {
                    /* Handle market change modal/dropdown */
                  }}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Change market
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-700">
                  Dealer enrollment information available
                </span>
              </div>
            </div>
          </Reveal>

          {/* Dealer Type Select Dropdown */}
          <Reveal delay={150}>
            <div className="space-y-2 max-w-sm">
              <label
                htmlFor="dealer-type-select"
                className="block text-xs font-semibold text-slate-600"
              >
                Dealer type
              </label>
              <div className="relative">
                <select
                  id="dealer-type-select"
                  value={dealerType}
                  onChange={(e) => setDealerType(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                >
                  <option value="" disabled>
                    Choose
                  </option>
                  <option value="franchise">Franchise Dealer</option>
                  <option value="independent">Independent Dealer</option>
                  <option value="group">Dealership Group</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

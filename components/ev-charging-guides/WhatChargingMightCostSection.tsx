"use client";

import { useState, useMemo, type ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type WhatChargingMightCostSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function WhatChargingMightCostSection({
  id = "what-charging-might-cost",
  eyebrow = "Costs",
  title = "What charging might cost",
  description = "Energy charges may not include session, parking, idle or tax charges. Review the charging provider's current pricing.",
  imageSrc = "/images/auto/3.png",
  imageAlt = "Person reviewing financial receipts, documents and calculator on desktop",
  className = "bg-white",
}: WhatChargingMightCostSectionProps) {
  // Worksheet input state
  const [distance, setDistance] = useState<string>("");
  const [efficiency, setEfficiency] = useState<string>("");
  const [homePrice, setHomePrice] = useState<string>("");
  const [publicPrice, setPublicPrice] = useState<string>("");

  // Share charged at home is fixed at 80% per UI design
  const homeShareRatio = 0.8;

  // Real-time calculation logic
  const calculatedEstimate = useMemo(() => {
    const distNum = parseFloat(distance);
    const effNum = parseFloat(efficiency);
    const homeNum = parseFloat(homePrice);
    const pubNum = parseFloat(publicPrice);

    if (
      isNaN(distNum) ||
      isNaN(effNum) ||
      isNaN(homeNum) ||
      isNaN(pubNum) ||
      distNum <= 0 ||
      effNum <= 0
    ) {
      return null;
    }

    // Total energy required in kWh per year
    const totalKwh = (distNum / 100) * effNum;
    const homeKwh = totalKwh * homeShareRatio;
    const publicKwh = totalKwh * (1 - homeShareRatio);

    const totalCost = homeKwh * homeNum + publicKwh * pubNum;

    return {
      totalCost: totalCost.toFixed(2),
      monthlyCost: (totalCost / 12).toFixed(2),
      totalKwh: Math.round(totalKwh),
    };
  }, [distance, efficiency, homePrice, publicPrice]);

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        {/* Section Header */}
        <Reveal delay={50}>
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        {/* 2-Column Worksheet & Output Layout */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Interactive Form Card (6 cols) */}
          <Reveal delay={100} className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-ink sm:text-base">
                  Charging cost worksheet
                </h3>

                <div className="mt-6 space-y-4">
                  {/* Row 1: Distance, Efficiency, Home Price */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="distance-per-year"
                        className="block text-xs font-bold text-ink mb-1.5"
                      >
                        Distance per year (miles)
                      </label>
                      <input
                        type="number"
                        id="distance-per-year"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        placeholder=""
                        className="w-full rounded-2xl border border-slate-200/90 bg-white px-4 py-3 text-xs font-medium text-ink shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="efficiency-kwh"
                        className="block text-xs font-bold text-ink mb-1.5"
                      >
                        Efficiency (kWh per 100 miles)
                      </label>
                      <input
                        type="number"
                        id="efficiency-kwh"
                        value={efficiency}
                        onChange={(e) => setEfficiency(e.target.value)}
                        placeholder=""
                        className="w-full rounded-2xl border border-slate-200/90 bg-white px-4 py-3 text-xs font-medium text-ink shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="home-price"
                        className="block text-xs font-bold text-ink mb-1.5"
                      >
                        Home price (£ per kWh)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        id="home-price"
                        value={homePrice}
                        onChange={(e) => setHomePrice(e.target.value)}
                        placeholder=""
                        className="w-full rounded-2xl border border-slate-200/90 bg-white px-4 py-3 text-xs font-medium text-ink shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Row 2: Public Price */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="public-price"
                        className="block text-xs font-bold text-ink mb-1.5"
                      >
                        Public price (£ per kWh)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        id="public-price"
                        value={publicPrice}
                        onChange={(e) => setPublicPrice(e.target.value)}
                        placeholder=""
                        className="w-full rounded-2xl border border-slate-200/90 bg-white px-4 py-3 text-xs font-medium text-ink shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Share Label Footer */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-700">
                  Share charged at home: 80%
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Empty State / Dynamic Result Display Box (6 cols) */}
          <Reveal delay={150} className="lg:col-span-6">
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/40 p-6 sm:p-8 h-full flex flex-col items-center justify-between text-center">
              <div>
                <h3 className="text-base font-bold text-ink sm:text-lg">
                  Enter your own figures to see an estimate
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm max-w-md mx-auto">
                  There are no default tariffs — prices vary by provider, time
                  of day and location.
                </p>
              </div>

              {/* Dynamic Interactive Estimate Output or Empty Placeholder Image */}
              {calculatedEstimate ? (
                <div className="my-6 w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xs text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    Estimated Annual Cost
                  </div>
                  <div className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
                    £{calculatedEstimate.totalCost}
                    <span className="text-xs font-medium text-slate-500 ml-2">
                      / year
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs">
                    <div>
                      <span className="text-slate-500">Monthly Average:</span>
                      <p className="font-bold text-ink">
                        £{calculatedEstimate.monthlyCost}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Total Consumption:</span>
                      <p className="font-bold text-ink">
                        {calculatedEstimate.totalKwh} kWh
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="my-6 relative aspect-[16/10] w-full max-w-sm overflow-hidden rounded-2xl bg-slate-200 shadow-xs">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              )}

              {/* Subtle Helper Note */}
              <p className="text-[11px] text-slate-400">
                Calculations assume an 80/20 home vs public split.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

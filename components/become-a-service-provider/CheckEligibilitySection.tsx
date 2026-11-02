"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const CHECK_LIST = [
  "No account needed for this check",
  "Inspection and transport have their own programs",
  "Nothing is shared or submitted",
];

type CheckEligibilitySectionProps = {
  id?: string;
  className?: string;
};

export default function CheckEligibilitySection({
  id,
  className = "bg-[#F6F8FB]",
}: CheckEligibilitySectionProps) {
  const [businessType, setBusinessType] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [market, setMarket] = useState("United Kingdom");

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-2`}>
        {/* Left Column: Title, Description, Bullet Points */}
        <div>
          <SectionTitle
            eyebrow="Eligibility"
            title="Check what may apply to your business"
            description="Tell us your business type and main service category. We'll show the requirements that may apply in United Kingdom. This is a guide, not a decision."
          />

          <Reveal delay={100} className="mt-8">
            <ul className="space-y-3">
              {CHECK_LIST.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                  <span className="text-sm font-semibold text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Right Column: Interactive Form Card */}
        <Reveal direction="zoom" delay={150}>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
            {/* Business Type Field */}
            <div>
              <label
                htmlFor="business-type"
                className="block text-xs font-semibold text-slate-700"
              >
                Business type
              </label>
              <div className="relative mt-2">
                <select
                  id="business-type"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
                >
                  <option value="" disabled>
                    Choose
                  </option>
                  <option value="garage">Independent garage</option>
                  <option value="tyre">Tyre & fitting centre</option>
                  <option value="detailing">Detailing business</option>
                  <option value="mobile">Mobile technician</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Main Service Category Field */}
            <div className="mt-5">
              <label
                htmlFor="service-category"
                className="block text-xs font-semibold text-slate-700"
              >
                Main service category
              </label>
              <div className="relative mt-2">
                <select
                  id="service-category"
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
                >
                  <option value="" disabled>
                    Choose
                  </option>
                  <option value="maintenance">Maintenance & Repair</option>
                  <option value="tyres">Tyres & Wheels</option>
                  <option value="cosmetic">Cosmetic & Detailing</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Operating Market Field */}
            <div className="mt-5">
              <label
                htmlFor="operating-market"
                className="block text-xs font-semibold text-slate-700"
              >
                Operating market
              </label>
              <div className="relative mt-2 flex items-center rounded-xl border border-slate-300 bg-white px-4 py-3">
                <input
                  id="operating-market"
                  type="text"
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
                />
                <button
                  type="button"
                  onClick={() => setMarket("United Kingdom")}
                  className="text-xs font-bold text-[#1D5FD1] hover:underline"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="button"
                className="w-full rounded-xl bg-brand py-3.5 text-center text-sm font-bold text-ink shadow-sm transition-opacity hover:opacity-90"
              >
                Show requirements
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import { Car, Package } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type PurchaseStep = {
  step: number;
  title: string;
  description: string;
};

const VEHICLE_STEPS: PurchaseStep[] = [
  {
    step: 1,
    title: "Inspect the listing",
    description:
      "Compare photos, description and price with the vehicle's details.",
  },
  {
    step: 2,
    title: "Check who you're dealing with",
    description:
      "Private seller or dealer — and whether contact details stay consistent.",
  },
  {
    step: 3,
    title: "Request documents safely",
    description: "Ownership, VIN, mileage and history are separate evidence.",
  },
  {
    step: 4,
    title: "Inspect and test-drive",
    description: "Use an independent inspection where you can.",
  },
  {
    step: 5,
    title: "Pay carefully",
    description: "Verify the payee and method; beware of last-minute changes.",
  },
  {
    step: 6,
    title: "Keep records",
    description: "Messages, receipts and handover photos.",
  },
];

const PARTS_STEPS: PurchaseStep[] = [
  {
    step: 1,
    title: "Verify part numbers & fitment",
    description: "Cross-reference OEM codes, vehicle year, and trim specs.",
  },
  {
    step: 2,
    title: "Check seller verification",
    description: "Confirm verified parts seller or brand distributor status.",
  },
  {
    step: 3,
    title: "Inspect condition & origin",
    description:
      "Review clear photos, part condition, and manufacturer labels.",
  },
  {
    step: 4,
    title: "Confirm warranty & returns",
    description: "Check seller return window and fitment guarantee terms.",
  },
  {
    step: 5,
    title: "Pay via verified channels",
    description: "Use approved checkout systems with buyer protection.",
  },
  {
    step: 6,
    title: "Log serials & invoices",
    description: "Retain purchase receipts and serial numbers upon delivery.",
  },
];

type SixStepsToSaferPurchaseSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
};

export default function SixStepsToSaferPurchaseSection({
  id = "safer-purchase",
  eyebrow = "Your purchase",
  title = "Six steps to a safer purchase",
  description = "Choose what you're buying. The checklist further down follows your choice.",
  className = "bg-white",
}: SixStepsToSaferPurchaseSectionProps) {
  const [purchaseType, setPurchaseType] = useState<"vehicle" | "parts">(
    "vehicle",
  );

  const steps = purchaseType === "vehicle" ? VEHICLE_STEPS : PARTS_STEPS;

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* Toggle Pill Switcher */}
        <Reveal delay={80} className="mt-8">
          <div className="inline-flex items-center rounded-full border border-slate-200/80 bg-slate-50/60 p-1.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setPurchaseType("vehicle")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200 sm:text-sm ${
                purchaseType === "vehicle"
                  ? "bg-[#0B1220] text-white shadow-xs"
                  : "text-slate-600 hover:text-ink"
              }`}
            >
              <Car className="h-4 w-4 stroke-[2]" />
              <span>Buying a vehicle</span>
            </button>

            <button
              type="button"
              onClick={() => setPurchaseType("parts")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200 sm:text-sm ${
                purchaseType === "parts"
                  ? "bg-[#0B1220] text-white shadow-xs"
                  : "text-slate-600 hover:text-ink"
              }`}
            >
              <Package className="h-4 w-4 stroke-[2]" />
              <span>Buying parts</span>
            </button>
          </div>
        </Reveal>

        {/* 6-Step Stepper Line & Grid */}
        <Reveal delay={120} className="mt-12">
          <div className="relative">
            {/* Connecting Horizontal Line for Large Screens */}
            <div
              className="absolute top-4 left-4 right-4 hidden h-[2px] bg-slate-200 lg:block"
              aria-hidden="true"
            />

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {steps.map(
                ({ step, title: stepTitle, description: stepDesc }) => (
                  <div
                    key={step}
                    className="relative flex flex-col items-start"
                  >
                    {/* Dark Step Badge */}
                    <div className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0B1220] text-xs font-bold text-[#F5B400] shadow-xs">
                      {step}
                    </div>

                    {/* Step Text Content */}
                    <div className="mt-4">
                      <h4 className="text-xs font-bold text-ink sm:text-sm">
                        {stepTitle}
                      </h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                        {stepDesc}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

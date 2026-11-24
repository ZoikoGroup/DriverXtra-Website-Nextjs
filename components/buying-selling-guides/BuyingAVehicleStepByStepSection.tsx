"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type BuyerStepItem = {
  stepNumber: number;
  title: string;
  whatToConsider: string;
  guidance: string;
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_BUYER_STEPS: BuyerStepItem[] = [
  {
    stepNumber: 1,
    title: "Research",
    whatToConsider:
      "Your market, budget, vehicle type, energy needs and how long you'll keep it.",
    guidance: "Start broad. Shortlist by needs before price.",
    imageSrc: "/images/but/2.png",
    imageAlt: "Driver behind the steering wheel during sunset",
  },
  {
    stepNumber: 2,
    title: "Shortlist",
    whatToConsider:
      "Comparing specific makes, models, trims, and ownership cost estimates.",
    guidance: "Narrow down your options to 2-3 candidate vehicles.",
    imageSrc: "/images/auto/1.png",
    imageAlt: "Vehicle cockpit interior view",
  },
  {
    stepNumber: 3,
    title: "Verify seller and vehicle",
    whatToConsider:
      "Vehicle history reports, title clearance, seller identification, and service records.",
    guidance: "Always confirm documentation authenticity before viewing.",
    imageSrc: "/images/disputes/12.png",
    imageAlt: "Reviewing vehicle records on laptop and mobile screen",
  },
  {
    stepNumber: 4,
    title: "View and test drive",
    whatToConsider:
      "Physical condition check, mechanical sound, feature operations, and handling performance.",
    guidance: "Test drive on varied road surfaces including highways.",
    imageSrc: "/images/seller/2.png",
    imageAlt: "Inspecting car body and exterior condition",
  },
  {
    stepNumber: 5,
    title: "Price and terms",
    whatToConsider:
      "Negotiating final sale price, included accessories, repair credits, and financing terms.",
    guidance: "Get all agreed price conditions in written form before paying.",
    imageSrc: "/images/auto/3.png",
    imageAlt: "Reviewing price terms and financial paperwork",
  },
  {
    stepNumber: 6,
    title: "Payment and transfer",
    whatToConsider:
      "Secure payment methods, title transfer paperwork, bill of sale, and tax settlement.",
    guidance: "Use verified payment channels and retain transfer receipts.",
    imageSrc: "/images/disputes/1.png",
    imageAlt: "Signing transaction documentation",
  },
  {
    stepNumber: 7,
    title: "After purchase",
    whatToConsider:
      "Insurance activation, registration completion, initial servicing, and warranty registration.",
    guidance: "Complete insurance setup prior to driving off the lot.",
    imageSrc: "/images/auto/4.png",
    imageAlt: "Newly purchased vehicle charging at home station",
  },
];

type BuyingAVehicleStepByStepSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  steps?: BuyerStepItem[];
  className?: string;
};

export default function BuyingAVehicleStepByStepSection({
  id = "buying-a-vehicle-step-by-step",
  eyebrow = "Buyer guide",
  title = "Buying a vehicle, step by step",
  description = "Steps and requirements can differ by location, seller type and vehicle. Check the applicable local rules and service terms.",
  steps = DEFAULT_BUYER_STEPS,
  className = "bg-white",
}: BuyingAVehicleStepByStepSectionProps) {
  const [activeStepNumber, setActiveStepNumber] = useState<number>(1);

  const currentStep =
    steps.find((s) => s.stepNumber === activeStepNumber) || steps[0];

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

        {/* 2-Column Interactive Stepper Layout */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Vertical Step Navigation Tabs (4 cols) */}
          <Reveal delay={100} className="lg:col-span-4">
            <div className="space-y-2.5">
              {steps.map((step) => {
                const isActive = step.stepNumber === activeStepNumber;

                return (
                  <button
                    key={step.stepNumber}
                    type="button"
                    onClick={() => setActiveStepNumber(step.stepNumber)}
                    className={`w-full flex items-center gap-3.5 rounded-2xl p-4 text-left transition-all duration-200 ${
                      isActive
                        ? "border border-ink bg-white shadow-xs ring-1 ring-ink"
                        : "border border-slate-200/80 bg-white hover:border-slate-300"
                    }`}
                  >
                    {/* Circle Number Badge */}
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-extrabold ${
                        isActive
                          ? "bg-[#0B1220] text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {step.stepNumber}
                    </span>

                    {/* Step Title */}
                    <span
                      className={`text-xs font-bold sm:text-sm ${
                        isActive ? "text-ink" : "text-slate-600"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Right Stage Display Card (8 cols) */}
          {currentStep && (
            <Reveal delay={150} className="lg:col-span-8">
              <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
                {/* Zero-padding Edge-to-Edge Image */}
                <div className="relative aspect-[24/8] w-full overflow-hidden bg-slate-900">
                  <Image
                    src="/images/buy/2.png"
                    alt={currentStep.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />
                </div>

                {/* Stage Details Content */}
                <div className="p-6 sm:p-8">
                  <div className="text-[11px] font-extrabold tracking-wider text-amber-600 uppercase">
                    STAGE {currentStep.stepNumber} OF {steps.length}
                  </div>

                  <h3 className="mt-2 text-xl font-bold text-ink sm:text-2xl">
                    {currentStep.title}
                  </h3>

                  <div className="mt-6 space-y-4 text-xs sm:text-sm">
                    <div className="grid grid-cols-12 gap-2">
                      <span className="col-span-4 sm:col-span-3 font-bold text-ink">
                        What to consider
                      </span>
                      <span className="col-span-8 sm:col-span-9 font-medium text-slate-600 leading-relaxed">
                        {currentStep.whatToConsider}
                      </span>
                    </div>

                    <div className="grid grid-cols-12 gap-2">
                      <span className="col-span-4 sm:col-span-3 font-bold text-ink">
                        Guidance
                      </span>
                      <span className="col-span-8 sm:col-span-9 font-medium text-slate-600 leading-relaxed">
                        {currentStep.guidance}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

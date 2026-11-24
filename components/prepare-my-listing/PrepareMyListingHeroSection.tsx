"use client";

import { useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type ListingStageStep = {
  step: number;
  title: string;
  subtitle: string;
};

const DEFAULT_LISTING_STAGES: ListingStageStep[] = [
  {
    step: 1,
    title: "Prepare",
    subtitle: "You build a private draft",
  },
  {
    step: 2,
    title: "Review",
    subtitle: "You check it",
  },
  {
    step: 3,
    title: "Submit",
    subtitle: "You choose to send it",
  },
  {
    step: 4,
    title: "Moderation",
    subtitle: "It's reviewed before it can go live",
  },
];

type PrepareMyListingHeroSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  stages?: ListingStageStep[];
  activeStage?: number;
  onStageSelect?: (step: number) => void;
  className?: string;
};

export default function PrepareMyListingHeroSection({
  id = "prepare-my-listing-hero",
  eyebrow = "SELL VEHICLES / SELLER TOOLS",
  title = "Prepare my listing",
  description = "Build your vehicle listing step by step. Your draft stays private until you choose to submit it.",
  stages = DEFAULT_LISTING_STAGES,
  activeStage: controlledStage,
  onStageSelect,
  className = "bg-[#0B1220] text-white",
}: PrepareMyListingHeroSectionProps) {
  const [internalStage, setInternalStage] = useState<number>(1);
  const currentStage = controlledStage ?? internalStage;

  const handleStageClick = (step: number) => {
    setInternalStage(step);
    onStageSelect?.(step);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <Reveal delay={50}>
          <div className="max-w-4xl">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#F5B400]" />
              <span className="text-[11px] font-bold tracking-widest text-[#F5B400] uppercase">
                {eyebrow}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[42px] lg:leading-tight">
              {title}
            </h1>

            {description && (
              <p className="mt-3 max-w-2xl text-xs leading-relaxed text-slate-300/90 sm:text-sm">
                {description}
              </p>
            )}

            {/* 4-Stage Workflow Strip */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {stages.map((item) => {
                const isActive = currentStage === item.step;

                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => handleStageClick(item.step)}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all ${
                      isActive
                        ? "border-slate-600/90 bg-slate-800/80 shadow-xs"
                        : "border-slate-800 bg-slate-900/75 hover:border-slate-700 hover:bg-slate-800/50"
                    }`}
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#F5B400] text-xs font-extrabold text-ink">
                      {item.step}
                    </span>

                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white">
                        {item.title}
                      </div>
                      <div className="truncate text-[11px] text-slate-400">
                        {item.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

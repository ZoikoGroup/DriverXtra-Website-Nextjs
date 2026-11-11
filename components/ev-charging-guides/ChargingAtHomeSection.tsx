"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type HomeHousingOption = {
  id: string;
  tabLabel: string;
  heading: string;
  imageSrc: string;
  imageAlt: string;
  points: string[];
};

export type SafetyChecklistItem = {
  id: string;
  text: string;
};

const DEFAULT_HOUSING_OPTIONS: HomeHousingOption[] = [
  {
    id: "own-home",
    tabLabel: "I own my home",
    heading: "I own my home",
    imageSrc: "/images/ev/1.jpg",
    imageAlt: "Modern residential home exterior with swimming pool and garden",
    points: [
      "Check your electrical supply with a qualified electrician",
      "Confirm any local permits or notification rules",
      "Choose equipment approved for your vehicle",
    ],
  },
  {
    id: "rent",
    tabLabel: "I rent",
    heading: "I rent",
    imageSrc: "/images/disputes/1.png",
    imageAlt: "Residential rental property exterior",
    points: [
      "Obtain written landlord or property manager consent",
      "Discuss portable plug-in chargers vs dedicated wallbox units",
      "Agree on maintenance responsibilities and removal terms",
    ],
  },
  {
    id: "apartment",
    tabLabel: "I live in an apartment or shared building",
    heading: "I live in an apartment or shared building",
    imageSrc: "/images/disputes/11.png",
    imageAlt: "Multi-story residential apartment complex building",
    points: [
      "Consult your HOA, strata, or building management committee",
      "Review shared infrastructure and sub-metering policies",
      "Explore shared charging options for residents",
    ],
  },
];

const DEFAULT_SAFETY_CHECKLIST: SafetyChecklistItem[] = [
  {
    id: "certified-equipment",
    text: "Use equipment certified for your market",
  },
  {
    id: "manual-guidelines",
    text: "Follow the manufacturer's manual for use and storage",
  },
  {
    id: "dry-cables",
    text: "Keep connectors and cables dry and undamaged",
  },
  {
    id: "no-extension-leads",
    text: "Don't use domestic extension leads for charging",
  },
  {
    id: "professional-assessment",
    text: "Have installations assessed by a qualified professional",
  },
];

type ChargingAtHomeSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  housingOptions?: HomeHousingOption[];
  safetyChecklist?: SafetyChecklistItem[];
  safetyDisclaimer?: string;
  className?: string;
};

export default function ChargingAtHomeSection({
  id = "charging-at-home",
  eyebrow = "Home charging",
  title = "Charging at home",
  description = "Before installing charging equipment, consult a qualified electrical professional and check property and local requirements.",
  housingOptions = DEFAULT_HOUSING_OPTIONS,
  safetyChecklist = DEFAULT_SAFETY_CHECKLIST,
  safetyDisclaimer = "This guide never gives wiring or circuit-sizing instructions.",
  className = "bg-white",
}: ChargingAtHomeSectionProps) {
  const [activeTabId, setActiveTabId] = useState(
    housingOptions[0]?.id || "own-home",
  );

  const activeOption =
    housingOptions.find((opt) => opt.id === activeTabId) || housingOptions[0];

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        {/* Section Title */}
        <Reveal delay={50}>
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        {/* Tab Pills Bar */}
        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/70 p-1.5 w-fit">
            {housingOptions.map((option) => {
              const isActive = option.id === activeTabId;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActiveTabId(option.id)}
                  className={`rounded-full px-5 py-2 text-xs font-bold transition-all sm:text-sm ${
                    isActive
                      ? "bg-[#0B1220] text-white shadow-xs"
                      : "text-slate-600 hover:text-ink hover:bg-slate-200/50"
                  }`}
                >
                  {option.tabLabel}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Dynamic Housing Context Container */}
        {activeOption && (
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Edge-to-Edge Image (6 cols) */}
            <Reveal direction="zoom" delay={150} className="lg:col-span-6">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-xs">
                <Image
                  src={activeOption.imageSrc}
                  alt={activeOption.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            {/* Right Bulleted Options List (6 cols) */}
            <Reveal delay={200} className="lg:col-span-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-ink sm:text-xl">
                  {activeOption.heading}
                </h3>

                <ul className="space-y-3.5 pt-2">
                  {activeOption.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed"
                    >
                      <span className="mt-0.5 text-emerald-600 shrink-0">
                        <Check className="h-4 w-4 stroke-[2.5]" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        )}

        {/* Bottom Card: Home Safety Checklist */}
        <Reveal delay={250}>
          <div className="mt-12 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
            <h3 className="text-base font-bold text-ink sm:text-lg">
              Home safety checklist
            </h3>

            <div className="mt-6 space-y-3.5">
              {safetyChecklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed"
                >
                  <span className="mt-0.5 text-emerald-600 shrink-0">
                    <Check className="h-4 w-4 stroke-[2.5]" />
                  </span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {safetyDisclaimer && (
              <p className="mt-8 text-[11px] font-medium text-slate-400">
                {safetyDisclaimer}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

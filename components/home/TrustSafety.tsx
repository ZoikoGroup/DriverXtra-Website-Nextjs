"use client";

import { useState } from "react";
import {
  ShieldCheck,
  LockKeyhole,
  Scale,
  Eye,
  Check,
  ArrowRight,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const features = [
  {
    title: "Verified Participants",
    description:
      "Identity, ownership and business checks, shown as the tier each seller has actually reached.",
    Icon: ShieldCheck,
  },
  {
    title: "Secure Transactions",
    description:
      "Payment protection and transaction records, with scope stated per market and product.",
    Icon: LockKeyhole,
  },
  {
    title: "Evidence-Based Disputes",
    description:
      "Structured reporting, evidence upload and time-bound resolution workflows.",
    Icon: Scale,
  },
  {
    title: "Privacy & Local Compliance",
    description:
      "Data controls and consumer-protection rules that follow your chosen region.",
    Icon: Eye,
  },
];

const verificationLevels = [
  { level: "L0", label: "Unverified" },
  { level: "L1", label: "Contact Verified" },
  { level: "L2", label: "Identity Verified" },
  { level: "L3", label: "Verified Seller" },
  { level: "L4", label: "Business Verified" },
  { level: "L5", label: "Certified Partner" },
];

const levelDescriptions: Record<string, string> = {
  L0: "No verification completed.",
  L1: "Contact details have been verified.",
  L2: "Identity verification has been completed.",
  L3: "Identity plus ownership or title evidence for the vehicle being sold.",
  L4: "Business details have been verified.",
  L5: "The participant has attained certified partner status.",
};

export default function TrustSafety() {
  const [selectedLevel, setSelectedLevel] = useState("L3");

  const selectedLevelInfo = verificationLevels.find(
    (item) => item.level === selectedLevel
  );

  return (
    <section className="group/section relative isolate w-full overflow-hidden bg-[#0B1220] px-5 text-white sm:px-8 lg:px-10">
      {/* Background image and dark overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover/section:scale-[1.01]"
        style={{
          backgroundImage: `
            linear-gradient(
              180deg,
              rgba(11,18,32,0.78) 0%,
              rgba(11,18,32,0.88) 55%,
              rgba(11,18,32,0.96) 100%
            ),
            url("/images/home/bg3.png")
          `,
        }}
      />

      {/* Subtle navy overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_20%,rgba(36,52,77,0.28),transparent_55%)]"
      />

      {/* Main content */}
      <div className="mx-auto w-full max-w-[1280px] py-12 sm:py-16 lg:py-20">
        {/* Section heading */}
        <Reveal direction="up">
          <header className="max-w-[720px]">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-5 rounded-full bg-[#FFB900] transition-all duration-300 group-hover/section:w-9" />

              <span className="text-sm font-bold leading-6 text-[#FFB900]">
                Trust &amp; safety
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-[36px] lg:leading-[40px]">
              Trust is built into every transaction
            </h2>

            <p className="mt-2 max-w-[620px] text-sm leading-6 text-[#B9C4D5] sm:text-base sm:leading-7">
              DriverXtra combines identity and business verification,
              transaction records, fraud controls and structured dispute
              workflows to make automotive commerce safer and more accountable.
            </p>
          </header>
        </Reveal>

        {/* Four trust features */}
        <div className="mt-6 grid grid-cols-1 border-y border-[#29364B] sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, Icon }, index) => (
            <Reveal
              key={title}
              direction="up"
              delay={index * 100}
            >
              <article
                className={`group/card relative flex h-full min-w-0 flex-col items-start overflow-hidden px-4 py-6 transition-all duration-300 hover:bg-white/[0.035] sm:px-5 sm:py-7 ${
                  index > 0
                    ? "border-t border-[#29364B] sm:border-t-0"
                    : ""
                } ${
                  index % 2 === 1
                    ? "sm:border-l sm:border-[#29364B]"
                    : ""
                } ${
                  index > 1
                    ? "lg:border-l lg:border-[#29364B]"
                    : ""
                }`}
              >
                {/* Animated top accent */}
                <span className="absolute left-0 top-0 h-0.5 w-0 bg-[#FFB900] transition-all duration-500 group-hover/card:w-full" />

                {/* Icon */}
                <div className="flex size-12 items-center justify-center rounded-xl border border-[#D99C00] bg-[#0B1220]/50 text-[#FFB900] transition-all duration-300 group-hover/card:scale-110 group-hover/card:border-[#FFB900] group-hover/card:bg-[#FFB900] group-hover/card:text-[#0B1220] group-hover/card:shadow-[0_0_24px_rgba(255,185,0,0.14)]">
                  <Icon
                    size={22}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover/card:rotate-[-8deg]"
                  />
                </div>

                <h3 className="mt-4 text-sm font-bold leading-5 text-white transition-colors duration-300 group-hover/card:text-[#FFB900] sm:text-base">
                  {title}
                </h3>

                <p className="mt-1.5 max-w-[260px] text-xs leading-5 text-[#AAB6C9] transition-colors duration-300 group-hover/card:text-[#D0D8E5] sm:text-sm sm:leading-[21px]">
                  {description}
                </p>

                {/* Decorative indicator */}
                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-[#FFB900]">
                  <span className="h-1 w-1 rounded-full bg-[#FFB900] transition-transform duration-300 group-hover/card:scale-150" />

                  <span className="opacity-0 transition-all duration-300 group-hover/card:translate-x-0.5 group-hover/card:opacity-100">
                    Built into the platform
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Verification ladder */}
        <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
          {/* Ladder introduction */}
          <Reveal direction="up">
            <div>
              <h3 className="text-base font-bold leading-6 text-white transition-colors duration-300 hover:text-[#FFB900] sm:text-lg">
                The verification ladder
              </h3>

              <p className="mt-1.5 max-w-[300px] text-xs leading-5 text-[#AAB6C9] sm:text-sm sm:leading-[21px]">
                Not every participant is at the same level. Listings and seller
                cards always show the tier actually attained.
              </p>
            </div>
          </Reveal>

          {/* Level selection and description */}
          <Reveal direction="up" delay={150}>
            <div className="min-w-0">
              {/* Verification levels */}
              <div className="grid grid-cols-2 gap-2 min-[480px]:grid-cols-3 lg:grid-cols-6">
                {verificationLevels.map(({ level, label }, index) => {
                  const isSelected = selectedLevel === level;

                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSelectedLevel(level)}
                      aria-pressed={isSelected}
                      style={{
                        transitionDelay: `${index * 20}ms`,
                      }}
                      className={`group/level relative flex min-h-[68px] min-w-0 flex-col items-start justify-center overflow-hidden rounded-xl border px-3 py-2.5 text-left transition-all duration-300 hover:-translate-y-1 sm:px-3.5 ${
                        isSelected
                          ? "border-[#FFB900] bg-[#FFB900] text-[#0B1220] shadow-[0_6px_22px_rgba(255,185,0,0.12)]"
                          : "border-[#29364B] bg-[#17233A]/90 text-white hover:border-[#FFB900]/70 hover:bg-[#202D43] hover:shadow-[0_8px_22px_rgba(0,0,0,0.18)]"
                      }`}
                    >
                      {/* Hover highlight */}
                      {!isSelected && (
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-500 group-hover/level:translate-x-full" />
                      )}

                      <span
                        className={`relative text-base font-bold leading-6 transition-transform duration-300 group-hover/level:translate-x-0.5 sm:text-lg ${
                          isSelected
                            ? "text-[#0B1220]"
                            : "text-[#FFB900]"
                        }`}
                      >
                        {level}
                      </span>

                      <span
                        className={`relative mt-0.5 text-[10px] leading-4 sm:text-[11px] ${
                          isSelected
                            ? "text-[#0B1220]"
                            : "text-[#B9C4D5]"
                        }`}
                      >
                        {label}
                      </span>

                      {isSelected && (
                        <Check
                          size={13}
                          strokeWidth={2.5}
                          className="absolute right-2 top-2 text-[#0B1220]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected level description */}
              <div
                aria-live="polite"
                className="group/description mt-2.5 flex min-h-[54px] items-start gap-2.5 rounded-xl border border-[#29364B] bg-white/[0.06] px-3.5 py-3 transition-all duration-300 hover:border-[#FFB900]/50 hover:bg-white/[0.08] sm:items-center sm:px-4"
              >
                <ShieldCheck
                  size={17}
                  className="mt-0.5 shrink-0 text-[#FFB900] transition-transform duration-300 group-hover/description:scale-110 group-hover/description:rotate-[-8deg] sm:mt-0"
                />

                <p className="text-xs leading-5 text-[#E0E6EF] sm:text-sm">
                  <span className="font-bold text-white transition-colors duration-300 group-hover/description:text-[#FFB900]">
                    {selectedLevel} · {selectedLevelInfo?.label}.
                  </span>{" "}
                  {levelDescriptions[selectedLevel]}
                </p>

                <ArrowRight
                  size={15}
                  className="ml-auto mt-0.5 shrink-0 text-[#FFB900] opacity-0 transition-all duration-300 group-hover/description:translate-x-0.5 group-hover/description:opacity-100 sm:mt-0"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
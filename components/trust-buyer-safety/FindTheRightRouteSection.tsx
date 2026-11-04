"use client";

import { useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type RouteOption = {
  id: string;
  label: string;
  resultTitle: string;
  resultDescription: string;
};

const DEFAULT_OPTIONS: RouteOption[] = [
  {
    id: "misleading-listing",
    label: "A listing looks wrong or misleading",
    resultTitle: "Listing Review & Reporting",
    resultDescription:
      "Submit the listing reference and specific details for review against published intake and moderation policies.",
  },
  {
    id: "fraud-request",
    label: "Someone asked for money, codes or personal details",
    resultTitle: "Fraud & Security Protection",
    resultDescription:
      "Stop communication immediately. Report the account interaction through our designated security intake channel.",
  },
  {
    id: "completed-transaction",
    label: "I've already paid or completed a transaction",
    resultTitle: "Transaction & Payment Assistance",
    resultDescription:
      "Review payment provider policies and secure your accounts. Note that platform verifications do not provide financial guarantees[cite: 8].",
  },
  {
    id: "feel-unsafe",
    label: "I feel unsafe",
    resultTitle: "Emergency & Safety Support",
    resultDescription:
      "If you are in immediate physical danger, contact local emergency services immediately[cite: 4].",
  },
];

type FindTheRightRouteSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  options?: RouteOption[];
  className?: string;
};

export default function FindTheRightRouteSection({
  id = "find-the-right-route",
  eyebrow = "When something goes wrong",
  title = "Find the right route",
  description = "Choose the option that fits best. Reporting availability depends on the published intake policy.",
  options = DEFAULT_OPTIONS,
  className = "bg-[#F6F8FB]",
}: FindTheRightRouteSectionProps) {
  const [selectedId, setSelectedId] = useState<string>("misleading-listing");

  const activeOption =
    options.find((opt) => opt.id === selectedId) || options[0];

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Title, Description & Radio Option Cards */}
          <div className="lg:col-span-7">
            <SectionTitle
              eyebrow={eyebrow}
              title={title}
              description={description}
            />

            <div className="mt-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink">
                What&apos;s happening?
              </h4>

              <div className="mt-4 space-y-3">
                {options.map((option) => {
                  const isSelected = selectedId === option.id;

                  return (
                    <Reveal key={option.id} delay={60}>
                      <label
                        onClick={() => setSelectedId(option.id)}
                        className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4.5 transition-all duration-200 ${
                          isSelected
                            ? "border-slate-400 shadow-xs"
                            : "border-slate-200/80 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="route-option"
                          checked={isSelected}
                          onChange={() => setSelectedId(option.id)}
                          className="h-4 w-4 border-slate-300 text-ink focus:ring-slate-900"
                        />
                        <span className="text-xs font-bold text-ink sm:text-sm">
                          {option.label}
                        </span>
                      </label>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Outcome Card */}
          <Reveal delay={160} className="lg:col-span-5">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 transition-all duration-300">
                <h3 className="text-base font-bold text-ink">
                  {activeOption.resultTitle}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {activeOption.resultDescription}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

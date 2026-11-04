"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type ChecklistItem = {
  id: string;
  label: string;
};

const PREPARATION_CHECKLIST: ChecklistItem[] = [
  {
    id: "authorized",
    label: "We're authorized to act for our organization",
  },
  {
    id: "environment",
    label: "We know which environment we'll use first (non-production)",
  },
  {
    id: "usecase",
    label: "Our use case is an allowed use for the data involved",
  },
  {
    id: "credentials",
    label: "We've identified who will store and rotate credentials",
  },
  {
    id: "review",
    label: "Our security or compliance contact has reviewed the plan",
  },
  {
    id: "incidents",
    label: "We have a plan for incidents and revocation",
  },
];

type PrepareBeforeAccessSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  checklist?: ChecklistItem[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function PrepareBeforeAccessSection({
  id = "prepare",
  eyebrow = "Before you connect",
  title = "Prepare before requesting access",
  description = "This checklist is preparation — not an attestation or approval.",
  checklist = PREPARATION_CHECKLIST,
  imageSrc = "/images/security/2.png",
  imageAlt = "Engineering team working around a wooden conference desk planning integration access",
  className = "bg-[#F6F8FB]",
}: PrepareBeforeAccessSectionProps) {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});

  const toggleCheck = (itemId: string) => {
    setCheckedState((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const completedCount = Object.values(checkedState).filter(Boolean).length;

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
          {/* Left Column: Interactive Preparation Checklist */}
          <Reveal delay={100}>
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
              <div className="space-y-3">
                {checklist.map(({ id: itemId, label }) => {
                  const isChecked = Boolean(checkedState[itemId]);
                  return (
                    <label
                      key={itemId}
                      onClick={() => toggleCheck(itemId)}
                      className={`flex cursor-pointer items-center gap-3.5 rounded-xl border p-4 transition-all duration-200 ${
                        isChecked
                          ? "border-slate-400 bg-slate-50 shadow-xs"
                          : "border-slate-200/80 bg-white hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // Handled by container label click
                        className="h-4 w-4 rounded border-slate-300 text-ink focus:ring-slate-900"
                      />
                      <span className="text-xs font-medium text-slate-700 sm:text-sm">
                        {label}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Counter Indicator Footer */}
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-400">
                {completedCount} of {checklist.length} ready
              </div>
            </div>
          </Reveal>

          {/* Right Column: Imagery */}
          <Reveal direction="zoom" delay={150} className="w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

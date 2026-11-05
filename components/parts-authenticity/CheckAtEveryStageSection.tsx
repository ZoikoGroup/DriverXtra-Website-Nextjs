"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { FileText } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ChecklistStage = {
  id: string;
  label: string;
  items: { id: string; label: string }[];
};

const DEFAULT_STAGES: ChecklistStage[] = [
  {
    id: "before-purchase",
    label: "Before purchase",
    items: [
      {
        id: "p-1",
        label: "The listing names the manufacturer, part number and condition",
      },
      { id: "p-2", label: "Claims match the evidence shown, not just a logo" },
      {
        id: "p-3",
        label: "The price isn't implausibly low for a genuine part",
      },
      {
        id: "p-4",
        label:
          "I've checked the part against my vehicle's compatibility separately",
      },
      { id: "p-5", label: "I've checked for any recall on this part" },
    ],
  },
  {
    id: "on-receipt",
    label: "On receipt",
    items: [
      { id: "r-1", label: "Packaging and labels match what was listed" },
      {
        id: "r-2",
        label: "Serial numbers or batch markings are clear and unblemished",
      },
      {
        id: "r-3",
        label: "Invoices or documentation match the parts received",
      },
      {
        id: "r-4",
        label: "No signs of tampering, relabelling or physical damage",
      },
    ],
  },
  {
    id: "before-installing",
    label: "Before installing",
    items: [
      {
        id: "i-1",
        label: "Mechanic or technician has confirmed correct fitment",
      },
      {
        id: "i-2",
        label:
          "All safety-critical mountings and tolerances match specifications",
      },
      {
        id: "i-3",
        label: "Final verification of warranty coverage and return eligibility",
      },
    ],
  },
];

type CheckAtEveryStageSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  stages?: ChecklistStage[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function CheckAtEveryStageSection({
  id = "check-at-every-stage",
  eyebrow = "Buyer checklist",
  title = "Check at every stage",
  description = "Nothing is saved, and no account is needed.",
  stages = DEFAULT_STAGES,
  imageSrc = "/images/parts/8.png",
  imageAlt = "Vehicle raised on a hydraulic lift in a professional repair workshop",
  className = "bg-[#F6F8FB]",
}: CheckAtEveryStageSectionProps) {
  const [activeStageId, setActiveStageId] = useState<string>("before-purchase");
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});

  const activeStage = stages.find((s) => s.id === activeStageId) || stages[0];

  const toggleCheck = (itemId: string) => {
    setCheckedState((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const totalChecked = activeStage.items.filter(
    (item) => checkedState[item.id],
  ).length;

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Title, Description, Pill Tabs & Workshop Hero Image */}
          <div className="lg:col-span-5">
            <SectionTitle
              eyebrow={eyebrow}
              title={title}
              description={description}
            />

            {/* Stage Toggle Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl bg-slate-100/80 p-1.5 border border-slate-200/60">
              {stages.map((stage) => {
                const isActive = activeStageId === stage.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveStageId(stage.id)}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-[#0B1220] text-white shadow-xs"
                        : "text-slate-600 hover:text-ink hover:bg-white/60"
                    }`}
                  >
                    {stage.label}
                  </button>
                );
              })}
            </div>

            {/* Workshop Hero Image (/images/parts/8.png) */}
            <Reveal delay={120} className="mt-8">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-sm">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive Checklist Box */}
          <Reveal delay={180} className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              {/* Checklist Items */}
              <div className="space-y-3">
                {activeStage.items.map(({ id: itemId, label }) => {
                  const isChecked = Boolean(checkedState[itemId]);

                  return (
                    <label
                      key={itemId}
                      onClick={() => toggleCheck(itemId)}
                      className={`flex cursor-pointer items-center gap-3.5 rounded-2xl border p-4 transition-all duration-200 ${
                        isChecked
                          ? "border-slate-300 bg-slate-50/80 shadow-2xs"
                          : "border-slate-200/80 bg-white hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="h-4 w-4 rounded border-slate-300 text-ink focus:ring-slate-900"
                      />
                      <span className="text-xs font-medium text-slate-700 sm:text-sm">
                        {label}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Footer Summary & Print Button */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <p className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-600">
                    {totalChecked} of {activeStage.items.length} checked
                  </span>{" "}
                  · a guide, not proof of authenticity
                </p>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50"
                >
                  <FileText className="h-3.5 w-3.5 stroke-[2]" />
                  <span>Print checklist</span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

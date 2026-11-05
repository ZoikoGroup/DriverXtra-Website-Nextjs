"use client";

import { useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type ChecklistItem = {
  id: string;
  label: string;
};

type GateStep = {
  step: number;
  title: string;
  description: string;
};

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  {
    id: "authority",
    label: "Our organization's authority over this source is documented",
  },
  {
    id: "identifiers",
    label: "We know which identifiers each record carries",
  },
  {
    id: "mapping",
    label: "We've mapped our fields to the approved schema version",
  },
  {
    id: "rights",
    label: "Our media and brand rights are confirmed",
  },
  {
    id: "dry-run",
    label: "We'll test with a dry run before any review",
  },
];

const DEFAULT_GATES: GateStep[] = [
  {
    step: 1,
    title: "Eligibility",
    description: "Organization, market and product category",
  },
  {
    step: 2,
    title: "Credential",
    description: "Issued only after eligibility, through an approved flow",
  },
  {
    step: 3,
    title: "Dry run",
    description: "Validate without changing any catalog data",
  },
  {
    step: 4,
    title: "Review",
    description: "Rights, safety and quality checked independently",
  },
  {
    step: 5,
    title: "Approval",
    description: "A separate decision for each scope",
  },
  {
    step: 6,
    title: "Publish",
    description: "Catalog data is validated; publication follows review",
  },
];

type ExploreIntegrationRequirementsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  checklist?: ChecklistItem[];
  gates?: GateStep[];
  className?: string;
};

export default function ExploreIntegrationRequirementsSection({
  id = "integration-requirements",
  eyebrow = "Setup & validation",
  title = "Explore integration requirements",
  description = "Each gate must pass before the next one opens. There's no instant authorization.",
  checklist = DEFAULT_CHECKLIST,
  gates = DEFAULT_GATES,
  className = "bg-white",
}: ExploreIntegrationRequirementsSectionProps) {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleCheck = (itemId: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const completedCount = Object.values(checkedIds).filter(Boolean).length;

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Interactive Pre-ingestion Checklist */}
          <Reveal delay={100} className="lg:col-span-6">
            <div>
              <h3 className="text-sm font-bold text-ink">
                Pre-ingestion checklist
              </h3>

              <div className="mt-4 space-y-3">
                {checklist.map(({ id: itemId, label }) => {
                  const isChecked = Boolean(checkedIds[itemId]);

                  return (
                    <label
                      key={itemId}
                      onClick={() => toggleCheck(itemId)}
                      className={`flex cursor-pointer items-center gap-3.5 rounded-xl border p-4 transition-all duration-200 ${
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

              <p className="mt-4 text-xs font-semibold text-slate-400">
                {completedCount} of {checklist.length} ready · preparation, not
                approval
              </p>
            </div>
          </Reveal>

          {/* Right Column: Gate Sequence Timeline */}
          <Reveal delay={180} className="lg:col-span-6">
            <div className="relative space-y-6 pl-2">
              {/* Vertical Connecting Line */}
              <div
                className="absolute top-4 bottom-4 left-[1.375rem] w-[2px] bg-slate-200"
                aria-hidden="true"
              />

              {gates.map(
                ({ step, title: gateTitle, description: gateDesc }) => (
                  <div key={step} className="relative flex items-start gap-5">
                    {/* Step Badge */}
                    <div className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-ink shadow-2xs">
                      {step}
                    </div>

                    {/* Step Info */}
                    <div className="pt-0.5">
                      <h4 className="text-xs font-bold text-ink sm:text-sm">
                        {gateTitle}
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {gateDesc}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

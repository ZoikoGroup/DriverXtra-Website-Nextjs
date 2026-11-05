"use client";

import { useState, type ReactNode } from "react";
import {
  Building2,
  ShieldCheck,
  SlidersHorizontal,
  Check,
  Eye,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type PublicationStage = {
  id: number;
  label: string;
  icon: typeof Building2;
  title: string;
  description: string;
  checks: string[];
};

const DEFAULT_STAGES: PublicationStage[] = [
  {
    id: 1,
    label: "1. Organization",
    icon: Building2,
    title: "Organization Verification",
    description:
      "Verifies organizational identity, business standing, and legal authority before catalog intake.",
    checks: [
      "Verified business entity & EIN/tax registration",
      "Signed partner terms & data governance agreement",
      "Designated admin & technical contacts assigned",
    ],
  },
  {
    id: 2,
    label: "2. Authorized source",
    icon: ShieldCheck,
    title: "Authorized Source Validation",
    description:
      "Confirms distribution rights and data lineage for the catalog source.",
    checks: [
      "OEM or brand authorization rights verified",
      "API credential scope & source origin whitelisted",
      "Data feed contract version validation",
    ],
  },
  {
    id: 3,
    label: "3. Mapping",
    icon: SlidersHorizontal,
    title: "Catalog Mapping & Schema Normalization",
    description:
      "Transforms raw inventory feeds into standardized DriverXtra catalog schemas.",
    checks: [
      "Part number & fitment attribute mapping",
      "Category hierarchy alignment",
      "Currency & tax format normalization",
    ],
  },
  {
    id: 4,
    label: "4. Quality checks",
    icon: Check,
    title: "Automated Quality & Rule Checks",
    description:
      "Runs real-time validation on stock levels, required fields, and asset media availability.",
    checks: [
      "Stock availability & price sanity bounds check",
      "High-resolution image & document asset resolution",
      "Fitment compatibility matrix validation",
    ],
  },
  {
    id: 5,
    label: "5. Publication",
    icon: Eye,
    title: "Live Publication & Sync",
    description:
      "Publishes approved items to the live marketplace with automated delta updates.",
    checks: [
      "Instant listing updates across target channels",
      "Real-time inventory decrement sync",
      "Public API search indexing refreshed",
    ],
  },
];

type FromOrganizationToPublicationSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  stages?: PublicationStage[];
  className?: string;
};

export default function FromOrganizationToPublicationSection({
  id,
  eyebrow = "Source authority",
  title = "From organization to publication",
  description = "Select a stage to see what's checked. Every stage can hold data — nothing skips ahead.",
  stages = DEFAULT_STAGES,
  className = "bg-[#F6F8FB]",
}: FromOrganizationToPublicationSectionProps) {
  const [activeStageId, setActiveStageId] = useState<number>(
    stages[0]?.id || 1,
  );

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* Stepper Tabs */}
        <Reveal delay={100} className="mt-10">
          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Connecting Horizontal Line for Large Screens */}
            <div
              className="absolute top-1/2 left-0 right-0 hidden h-[2px] -translate-y-1/2 bg-slate-200 lg:block"
              aria-hidden="true"
            />

            {stages.map(({ id: stageId, label, icon: Icon }) => {
              const isActive = stageId === activeStageId;
              return (
                <button
                  key={stageId}
                  type="button"
                  onClick={() => setActiveStageId(stageId)}
                  className={`relative z-10 flex flex-1 items-center justify-center gap-3 rounded-2xl border p-4 text-xs font-bold transition-all duration-200 sm:p-5 ${
                    isActive
                      ? "border-slate-900 bg-white text-ink shadow-md ring-1 ring-slate-900"
                      : "border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:text-ink hover:shadow-sm"
                  }`}
                >
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#0B1220] text-brand shadow-xs">
                    <Icon className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <span className="whitespace-nowrap">{label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

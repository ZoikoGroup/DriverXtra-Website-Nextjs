import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type CoverageDetail = {
  label: string;
  value: string;
};

export type FreshnessDetail = {
  label: string;
  value: string;
};

const DEFAULT_COVERAGE_DETAILS: CoverageDetail[] = [
  { label: "Observations", value: "21k+ listings (banded)" },
  { label: "Sources", value: "Demonstration listing feed (synthetic)" },
  { label: "Missing periods", value: "None in this period" },
  {
    label: "Exclusions",
    value: "Damaged/salvage title, duplicates, extreme outliers",
  },
];

const DEFAULT_FRESHNESS_DETAILS: FreshnessDetail[] = [
  { label: "Observations to", value: "Sept 2026" },
  { label: "Ingested", value: "2 Oct 2026" },
  { label: "Calculated", value: "2 Oct 2026" },
  { label: "Published", value: "3 Oct 2026" },
];

type CoverageFreshnessSourcesSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  coverageDetails?: CoverageDetail[];
  freshnessDetails?: FreshnessDetail[];
  className?: string;
};

export default function CoverageFreshnessSourcesSection({
  id = "coverage-freshness-sources",
  eyebrow = "Coverage",
  title = "Coverage, freshness and sources",
  description = "These results describe the selected data sources and cohort, not every vehicle in the market.",
  coverageDetails = DEFAULT_COVERAGE_DETAILS,
  freshnessDetails = DEFAULT_FRESHNESS_DETAILS,
  className = "bg-[#F6F8FB]",
}: CoverageFreshnessSourcesSectionProps) {
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

        {/* 2-Column Data Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Left Box: Coverage */}
          <Reveal delay={100}>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8 h-full">
              <h3 className="text-base font-bold text-ink sm:text-lg">
                Coverage
              </h3>

              <div className="mt-6 space-y-4">
                {coverageDetails.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-12 items-baseline gap-2 text-xs sm:text-sm"
                  >
                    <span className="col-span-5 sm:col-span-4 font-bold text-ink">
                      {item.label}
                    </span>
                    <span className="col-span-7 sm:col-span-8 text-slate-500 font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right Box: Freshness */}
          <Reveal delay={150}>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8 h-full">
              <h3 className="text-base font-bold text-ink sm:text-lg">
                Freshness
              </h3>

              <div className="mt-6 space-y-4">
                {freshnessDetails.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-12 items-baseline gap-2 text-xs sm:text-sm"
                  >
                    <span className="col-span-5 sm:col-span-4 font-bold text-ink">
                      {item.label}
                    </span>
                    <span className="col-span-7 sm:col-span-8 text-slate-500 font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

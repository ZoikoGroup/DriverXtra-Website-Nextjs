import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ErrorReasonRow = {
  reasonClass: string;
  whatItMeans: string;
  safeNextStep: string;
};

const DEFAULT_ERROR_REASONS: ErrorReasonRow[] = [
  {
    reasonClass: "Schema mismatch",
    whatItMeans: "Fields don't match the declared schema version",
    safeNextStep: "Correct the source mapping and resubmit the affected scope",
  },
  {
    reasonClass: "Source conflict",
    whatItMeans: "Two authorized sources disagree",
    safeNextStep: "Held for review — lineage is kept",
  },
  {
    reasonClass: "Unknown stock",
    whatItMeans: "Quantity missing, stale or untrusted",
    safeNextStep: 'Shown as "Availability is not confirmed for this item."',
  },
  {
    reasonClass: "Rights expired",
    whatItMeans:
      "Authorization for this product, brand or market has not been confirmed.",
    safeNextStep: "Contact the reviewer — no manual bypass",
  },
  {
    reasonClass: "Safety hold",
    whatItMeans: "This item is restricted pending a product-safety review.",
    safeNextStep: "Wait for the independent review",
  },
];

type WhenSomethingGoesWrongSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  reasons?: ErrorReasonRow[];
  className?: string;
};

export default function WhenSomethingGoesWrongSection({
  id = "errors-recovery",
  eyebrow = "Errors & recovery",
  title = "When something goes wrong",
  description = "Reason classes only — no invented error numbers.",
  reasons = DEFAULT_ERROR_REASONS,
  className = "bg-[#F6F8FB]",
}: WhenSomethingGoesWrongSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <Reveal delay={100} className="mt-10">
          <div className="">
            <div className="overflow-x-auto">
              <div className="min-w-[640px] divide-y divide-slate-100">
                {/* Table Header */}
                <div className="grid grid-cols-12 pb-3.5 text-xs font-bold text-slate-400">
                  <span className="col-span-3">Reason class</span>
                  <span className="col-span-5">What it means</span>
                  <span className="col-span-4">Safe next step</span>
                </div>

                {/* Table Rows */}
                {reasons.map(({ reasonClass, whatItMeans, safeNextStep }) => (
                  <div
                    key={reasonClass}
                    className="grid grid-cols-12 items-center py-4 text-xs text-slate-700 sm:text-sm"
                  >
                    <span className="col-span-3 font-semibold text-ink">
                      {reasonClass}
                    </span>
                    <span className="col-span-5 pr-4 leading-relaxed text-slate-500">
                      {whatItMeans}
                    </span>
                    <span className="col-span-4 leading-relaxed text-slate-600 font-medium">
                      {safeNextStep}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

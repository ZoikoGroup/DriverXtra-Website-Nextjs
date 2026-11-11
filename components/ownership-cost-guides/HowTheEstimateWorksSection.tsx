import type { ReactNode } from "react";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type FormulaItem = {
  id: string;
  label?: string;
  text: ReactNode;
};

export type AssumptionDetailRow = {
  label: string;
  value: string;
};

const DEFAULT_FORMULAS: FormulaItem[] = [
  {
    id: "economic",
    label: "Economic",
    text: "price + fees − value at end + interest + running costs",
  },
  {
    id: "cash-flow",
    label: "Cash flow",
    text: "money paid − sale proceeds; depreciation isn't added on top",
  },
  {
    id: "per-mile",
    label: "Per mile",
    text: "total ÷ total distance; zero distance shows N/A",
  },
  {
    id: "unknown-costs",
    text: "Unknown costs are excluded and flagged — never counted as zero",
  },
];

const DEFAULT_ASSUMPTION_DETAILS: AssumptionDetailRow[] = [
  {
    label: "Status",
    value: "Illustrative assumptions, not verified market data",
  },
  {
    label: "As of",
    value: "1 Oct 2026 (demonstration)",
  },
  {
    label: "Model",
    value: "OCG v0.2 (demonstration)",
  },
  {
    label: "Not included",
    value: "Inflation, discounting, incentives, warranties",
  },
];

type HowTheEstimateWorksSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  formulas?: FormulaItem[];
  assumptionDetails?: AssumptionDetailRow[];
  disclaimerText?: string;
  className?: string;
};

export default function HowTheEstimateWorksSection({
  id = "how-the-estimate-works",
  eyebrow = "Sources & limits",
  title = "How the estimate works",
  description = "Review the market, input basis, as-of date, model version and known limitations.",
  formulas = DEFAULT_FORMULAS,
  assumptionDetails = DEFAULT_ASSUMPTION_DETAILS,
  disclaimerText = "Methodology & Data Standards isn't published yet.",
  className = "bg-[#F6F8FB]",
}: HowTheEstimateWorksSectionProps) {
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
          {/* Left Box: Formulas */}
          <Reveal delay={100}>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-ink sm:text-lg">
                  Formulas
                </h3>

                <div className="mt-6 space-y-4">
                  {formulas.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 text-xs sm:text-sm"
                    >
                      <span className="mt-0.5 text-emerald-600 shrink-0">
                        <Check className="h-4 w-4 stroke-[2.5]" />
                      </span>
                      <p className="text-slate-600 font-medium leading-relaxed">
                        {item.label && (
                          <strong className="font-bold text-ink mr-1">
                            {item.label}:
                          </strong>
                        )}
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Box: About these assumptions */}
          <Reveal delay={150}>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-ink sm:text-lg">
                  About these assumptions
                </h3>

                <div className="mt-6 space-y-4">
                  {assumptionDetails.map((item) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-12 items-baseline gap-2 text-xs sm:text-sm"
                    >
                      <span className="col-span-4 sm:col-span-3 font-bold text-ink">
                        {item.label}
                      </span>
                      <span className="col-span-8 sm:col-span-9 font-medium text-slate-500">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {disclaimerText && (
                <p className="mt-8 text-[11px] font-medium text-slate-400">
                  {disclaimerText}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

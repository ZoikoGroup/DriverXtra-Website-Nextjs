import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type MarketDataMetric = {
  quarter: string;
  value: number;
  heightPercent: string;
};

const DEFAULT_METRICS: MarketDataMetric[] = [
  { quarter: "Q1", value: 100, heightPercent: "h-24" },
  { quarter: "Q2", value: 103, heightPercent: "h-28" },
  { quarter: "Q3", value: 101, heightPercent: "h-25" },
  { quarter: "Q4", value: 106, heightPercent: "h-32" },
];

type ReadingMarketDataCarefullySectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  metrics?: MarketDataMetric[];
  className?: string;
};

export default function ReadingMarketDataCarefullySection({
  id = "reading-market-data",
  eyebrow = "Data-backed",
  title = "Reading market data carefully",
  description = "Every chart states what was measured, for whom, when, and how.",
  metrics = DEFAULT_METRICS,
  className = "bg-[#F6F8FB]",
}: ReadingMarketDataCarefullySectionProps) {
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

        {/* 2-Column Main Content Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: What this means & Limitations Card (5 cols) */}
          <Reveal delay={100} className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-ink sm:text-base">
                    What this means
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Asking prices show what sellers hope for. They aren&apos;t
                    completed sale prices, and they don&apos;t describe every
                    vehicle.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-bold text-ink sm:text-base">
                    Limitations
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Coverage varies by region; small cohorts are withheld rather
                    than shown as zero.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Visual Bar Chart & Metadata Grid (7 cols) */}
          <Reveal delay={150} className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              {/* Bar Chart Representation */}
              <div className="flex h-48 items-end justify-between gap-4 px-4 pb-4">
                {metrics.map((item) => (
                  <div
                    key={item.quarter}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div className="w-full max-w-[80px]">
                      <div
                        className={`w-full rounded-lg bg-[#0B1220] ${item.heightPercent}`}
                      />
                    </div>
                    <span className="text-xs font-bold text-ink sm:text-sm">
                      {item.value}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 uppercase">
                      {item.quarter}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Show as a table
                </button>
              </div>

              {/* 2x2 Metadata Grid */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#F6F8FB] p-4 border border-slate-100">
                  <span className="text-[11px] font-extrabold text-[#667085]">
                    Observation type
                  </span>
                  <p className="mt-1 text-xs font-bold text-ink sm:text-sm">
                    Asking (advertised) prices
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F6F8FB] p-4 border border-slate-100">
                  <span className="text-[11px] font-extrabold text-[#667085]">
                    Cohort
                  </span>
                  <p className="mt-1 text-xs font-bold text-ink sm:text-sm">
                    Used cars, illustrative sample
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F6F8FB] p-4 border border-slate-100">
                  <span className="text-[11px] font-extrabold text-[#667085]">
                    Reference period
                  </span>
                  <p className="mt-1 text-xs font-bold text-ink sm:text-sm">
                    Illustrative year
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F6F8FB] p-4 border border-slate-100">
                  <span className="text-[11px] font-extrabold text-[#667085]">
                    Method
                  </span>
                  <p className="mt-1 text-xs font-bold text-ink sm:text-sm underline cursor-pointer decoration-slate-400 underline-offset-2">
                    Read the methodology
                  </p>
                </div>
              </div>

              {/* Footer Note */}
              <p className="mt-6 text-[11px] text-slate-400 font-medium">
                This information describes the reported dataset, not every
                vehicle or transaction.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type MethodDetailRow = {
  label: string;
  value: string;
};

const DEFAULT_METHOD_DETAILS: MethodDetailRow[] = [
  {
    label: "Measure",
    value:
      "Median of eligible asking prices per month, after duplicate and outlier rules",
  },
  {
    label: "Index",
    value: "Median rebased to 100 at the first month of your selected period",
  },
  {
    label: "Change",
    value: "100 × (current ÷ prior − 1), only where both periods are valid",
  },
  {
    label: "Minimum sample",
    value: "Small groups are withheld, never shown as zero",
  },
  {
    label: "Version",
    value: "Method v0.3 · release DEMO-2026-10 (synthetic)",
  },
];

type HowFiguresAreCalculatedSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  methodDetails?: MethodDetailRow[];
  imageSrc?: string;
  imageAlt?: string;
  revisionDateText?: string;
  revisionSummary?: string;
  whatChangedLabel?: string;
  className?: string;
};

export default function HowFiguresAreCalculatedSection({
  id = "how-figures-are-calculated",
  eyebrow = "Method & revisions",
  title = "How these figures are calculated",
  description,
  methodDetails = DEFAULT_METHOD_DETAILS,
  imageSrc = "/images/market/2.png",
  imageAlt = "Person writing notes on document with a pen on desk",
  revisionDateText = "This series was updated on 3 Oct 2026. Review the change explanation before comparing versions.",
  whatChangedLabel = "Jun 2026 restated",
  className = "bg-white",
}: HowFiguresAreCalculatedSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Eyebrow, Title & Method Details (6 cols) */}
          <div className="space-y-8 lg:col-span-6">
            <Reveal delay={50}>
              <SectionTitle
                eyebrow={eyebrow}
                title={title}
                description={description}
              />
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-5">
                {methodDetails.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-12 items-baseline gap-2 text-xs sm:text-sm"
                  >
                    <span className="col-span-4 sm:col-span-3 font-bold text-ink">
                      {item.label}
                    </span>
                    <span className="col-span-8 sm:col-span-9 font-medium text-slate-500 leading-relaxed">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Zero-padding Image & Latest Revision Card (6 cols) */}
          <div className="space-y-6 lg:col-span-6">
            {/* Edge-to-edge top image container */}
            <Reveal direction="zoom" delay={120}>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-xs">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            {/* Latest Revision Container */}
            <Reveal delay={160}>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7">
                <h3 className="text-sm font-bold text-ink sm:text-base">
                  Latest revision
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                  {revisionDateText}
                </p>

                {/* Static Accordion trigger box matching UI */}
                <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-[11px] font-bold text-ink sm:text-xs">
                        What changed
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        {whatChangedLabel}
                      </span>
                    </div>

                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500">
                      <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

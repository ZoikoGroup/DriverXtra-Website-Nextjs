import type { ReactNode } from "react";
import Image from "next/image";
import { Layers, Calendar, Tag } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type TrendFactorCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: "layers" | "calendar" | "tag";
};

const DEFAULT_TREND_FACTORS: TrendFactorCard[] = [
  {
    id: "mix-changes",
    title: "Mix changes",
    description:
      "If more newer or pricier cars are listed, the median can rise without any single car becoming dearer.",
    imageSrc: "/images/auto/2.png",
    imageAlt: "Green luxury performance coupe parked outdoors during dusk",
    icon: "layers",
  },
  {
    id: "seasonality",
    title: "Seasonality",
    description:
      "Demand and listings vary through the year. Compare like months where you can.",
    imageSrc: "/images/auto/3.png",
    imageAlt: "Person reviewing financial paperwork and calculator on desk",
    icon: "calendar",
  },
  {
    id: "asking-vs-sold",
    title: "Asking vs sold",
    description:
      "Asking prices describe advertised amounts, not completed sale prices.",
    imageSrc: "/images/auto/5.png",
    imageAlt: "Luxury sedan dark side profile silhouette",
    icon: "tag",
  },
];

type ThingsThatCanMoveATrendLineSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  factors?: TrendFactorCard[];
  className?: string;
};

export default function ThingsThatCanMoveATrendLineSection({
  id = "things-that-move-trendline",
  eyebrow = "Reading trends",
  title = "Things that can move a trend line",
  description,
  factors = DEFAULT_TREND_FACTORS,
  className = "bg-white",
}: ThingsThatCanMoveATrendLineSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3-Column Grid for Trend Factor Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {factors.map((factor, i) => (
            <Reveal key={factor.id} delay={i * 50}>
              <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs h-full">
                <div>
                  {/* Zero-padding edge-to-edge top image */}
                  <div className="relative aspect-[22/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={factor.imageSrc}
                      alt={factor.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 sm:p-7">
                    {/* Dark Slate Icon Badge */}
                    <div className="mb-4 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-2xs">
                      {factor.icon === "layers" && (
                        <Layers className="h-4 w-4 stroke-[2]" />
                      )}
                      {factor.icon === "calendar" && (
                        <Calendar className="h-4 w-4 stroke-[2]" />
                      )}
                      {factor.icon === "tag" && (
                        <Tag className="h-4 w-4 stroke-[2]" />
                      )}
                    </div>

                    <h3 className="text-base font-bold text-ink sm:text-lg">
                      {factor.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {factor.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

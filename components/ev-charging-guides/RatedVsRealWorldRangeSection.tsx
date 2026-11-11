import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type RangeFactorCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_RANGE_FACTORS: RangeFactorCard[] = [
  {
    id: "temperature",
    title: "Temperature",
    description:
      "Cold weather and cabin heating can reduce range; mild weather usually helps.",
    imageSrc: "/images/ev/4.png",
    imageAlt: "Snow-covered winter landscape with trees and cabin rooftop",
  },
  {
    id: "speed-and-terrain",
    title: "Speed and terrain",
    description: "Higher motorway speeds and hills use more energy.",
    imageSrc: "/images/auto/1.png",
    imageAlt: "Man driving a modern vehicle at sunset holding steering wheel",
  },
  {
    id: "load-and-habits",
    title: "Load and habits",
    description: "Passengers, cargo and driving style all matter.",
    imageSrc: "/images/auto/9.png",
    imageAlt: "Front profile view of a performance muscle car",
  },
];

type RatedVsRealWorldRangeSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  factors?: RangeFactorCard[];
  className?: string;
};

export default function RatedVsRealWorldRangeSection({
  id = "rated-vs-real-world-range",
  eyebrow = "Range",
  title = "Rated vs real-world range",
  description = "Rated range comes from a standard test. Your range depends on how and where you drive.",
  factors = DEFAULT_RANGE_FACTORS,
  className = "bg-[#F6F8FB]",
}: RatedVsRealWorldRangeSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3-Column Grid for Range Factor Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {factors.map((card, i) => (
            <Reveal key={card.id} delay={i * 50}>
              <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs h-full">
                <div>
                  {/* Zero-padding edge-to-edge top image */}
                  <div className="relative aspect-[26/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 sm:p-7">
                    <h3 className="text-base font-bold text-ink sm:text-lg">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {card.description}
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

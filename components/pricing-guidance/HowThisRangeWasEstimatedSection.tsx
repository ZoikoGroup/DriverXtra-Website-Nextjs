import type { ReactNode } from "react";
import Image from "next/image";
import { Layers, Gauge, FileText, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type EstimationMethodCard = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_METHOD_CARDS: EstimationMethodCard[] = [
  {
    id: "comparable-asking-prices",
    title: "Comparable asking prices",
    description:
      "We compare similar vehicles — same make, model, year band, mileage band and market. Small groups are withheld rather than shown.",
    icon: Layers,
    imageSrc: "/images/auto/2.png",
    imageAlt: "Sports coupe parked outdoors on open road",
  },
  {
    id: "your-details-adjust-range",
    title: "Your details adjust the range",
    description:
      'Condition, mileage and history move the range. An "I\'m not sure" answer widens it instead of guessing.',
    icon: Gauge,
    imageSrc: "/images/disputes/11.png",
    imageAlt: "Market distribution analytics charts on dark dashboard",
  },
  {
    id: "completed-sales-kept-separate",
    title: "Completed sales kept separate",
    description:
      "Completed sale data is shown only where verified and available. It is unavailable in this prototype, so none is used.",
    icon: FileText,
    imageSrc: "/images/market/2.png",
    imageAlt: "Hands signing contract documentation with pen",
  },
];

type HowThisRangeWasEstimatedSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  cards?: EstimationMethodCard[];
  className?: string;
};

export default function HowThisRangeWasEstimatedSection({
  id = "how-this-range-was-estimated",
  eyebrow = "Method",
  title = "How this range was estimated",
  description,
  cards = DEFAULT_METHOD_CARDS,
  className = "bg-[#F6F8FB]",
}: HowThisRangeWasEstimatedSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <Reveal delay={50}>
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        {/* 3-Column Grid for Method Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => {
            const IconComponent = card.icon;

            return (
              <Reveal key={card.id} delay={index * 50}>
                <div className="flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
                  <div>
                    {/* Edge-to-edge Top Image */}
                    <div className="relative aspect-[26/9] w-full overflow-hidden bg-slate-900">
                      <Image
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>

                    {/* Content Body */}
                    <div className="p-6 sm:p-7">
                      {/* Dark Rounded Icon Badge */}
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-2xs">
                        <IconComponent className="h-5 w-5 stroke-[2]" />
                      </div>

                      <h3 className="mt-5 text-base font-bold text-ink sm:text-lg">
                        {card.title}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ChargingOptionCard = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_UK_CHARGING_OPTIONS: ChargingOptionCard[] = [
  {
    id: "domestic-socket-ac",
    title: "Domestic socket (AC)",
    subtitle: "3-pin plug with an approved cable",
    description: "Slow; not intended as a primary option",
    imageSrc: "/images/ev/1.jpg",
    imageAlt: "Residential home exterior with driveway and pool",
  },
  {
    id: "ac-wallbox-public-ac",
    title: "AC wallbox / public AC",
    subtitle: "Dedicated equipment, usually Type 2",
    description: "Common for home and destination charging",
    imageSrc: "/images/ev/2.jpg",
    imageAlt: "Low angle view of modern city skyscrapers",
  },
  {
    id: "rapid-ultra-rapid-dc",
    title: "Rapid / ultra-rapid (DC)",
    subtitle: "Public high-power stations",
    description: "Fastest, with speed depending on vehicle and battery",
    imageSrc: "/images/auto/4.png",
    imageAlt: "Electric vehicle charging connector plugged into car port",
  },
];

type ChargingOptionsUkSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  options?: ChargingOptionCard[];
  className?: string;
};

export default function ChargingOptionsUkSection({
  id = "charging-options-uk",
  eyebrow = "Charging options",
  title = "Charging options in United Kingdom",
  description = "Names and voltages differ by region — there's no universal standard.",
  options = DEFAULT_UK_CHARGING_OPTIONS,
  className = "bg-white",
}: ChargingOptionsUkSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3-Column Grid for Charging Option Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {options.map((card, i) => (
            <Reveal key={card.id} delay={i * 50}>
              <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs h-full">
                <div>
                  {/* Zero-padding edge-to-edge top image */}
                  <div className="relative aspect-[22/9] w-full overflow-hidden bg-slate-900">
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

                    <p className="mt-1 text-xs font-semibold text-slate-700 sm:text-sm">
                      {card.subtitle}
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-slate-500 sm:text-sm">
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

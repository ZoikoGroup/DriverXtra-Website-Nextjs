import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type PublicChargerStep = {
  number: number;
  title: string;
  description: string;
};

const DEFAULT_PUBLIC_CHARGER_STEPS: PublicChargerStep[] = [
  {
    number: 1,
    title: "Station, port and connector",
    description:
      "A station has ports; each port has a connector. A free station doesn't mean a compatible port.",
  },
  {
    number: 2,
    title: "Access and payment",
    description: "App, account, card or contactless — check before you arrive.",
  },
  {
    number: 3,
    title: "Accessibility",
    description:
      "Bay size, kerb and cable reach vary. Missing data doesn't mean accessible.",
  },
  {
    number: 4,
    title: "Out of service?",
    description: "Report it to the operator and choose another charger.",
  },
  {
    number: 5,
    title: "Fees",
    description:
      "Energy charges may not include session, parking, idle or tax charges.",
  },
];

type UsingPublicChargersSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  steps?: PublicChargerStep[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function UsingPublicChargersSection({
  id = "using-public-chargers",
  eyebrow = "Public charging",
  title = "Using public chargers",
  description = "Charging information may be incomplete or delayed. Confirm availability and access directly with the operator.",
  steps = DEFAULT_PUBLIC_CHARGER_STEPS,
  imageSrc = "/images/auto/4.png",
  imageAlt = "Electric vehicle charging cable connected to car charging port with blue LED glow",
  className = "bg-[#F6F8FB]",
}: UsingPublicChargersSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        {/* Section Title */}
        <Reveal delay={50}>
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        {/* 2-Column Layout */}
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Edge-to-Edge Image (6 cols) */}
          <Reveal direction="zoom" delay={100} className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-xs">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Right Step-by-Step Numbered Timeline (6 cols) */}
          <Reveal delay={150} className="lg:col-span-6">
            <div className="relative pl-2">
              {/* Vertical Connecting Line */}
              <div className="absolute left-6 top-5 bottom-5 w-0.5 bg-slate-200/80" />

              <div className="space-y-6">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="relative flex items-start gap-4"
                  >
                    {/* Amber Circle Number Badge */}
                    <div className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F5B400] text-xs font-extrabold text-ink shadow-2xs">
                      {step.number}
                    </div>

                    {/* Step Text Content */}
                    <div className="pt-0.5">
                      <h3 className="text-sm font-bold text-ink sm:text-base">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                        {step.description}
                      </p>
                    </div>
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

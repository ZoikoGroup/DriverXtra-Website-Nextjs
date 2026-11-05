import type { ReactNode } from "react";
import Image from "next/image";
import { User, Globe, Clock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type EligibilityCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: "user" | "globe" | "clock";
};

const DEFAULT_ELIGIBILITY_CARDS: EligibilityCard[] = [
  {
    id: "your-standing",
    title: "Your standing",
    description: "You're a party to the matter, or authorized to act for one.",
    imageSrc: "/images/disputes/8.png",
    imageAlt: "Modern open plan office workspace with employees at desks",
    icon: "user",
  },
  {
    id: "the-matter-and-market",
    title: "The matter and market",
    description: "The product, the transaction channel and where it happened.",
    imageSrc: "/images/disputes/9.png",
    imageAlt: "Front profile of a performance muscle car parked outdoors",
    icon: "globe",
  },
  {
    id: "the-policy-and-timing",
    title: "The policy and timing",
    description:
      "Any applicable deadline will be shown using the policy and case details available to us.",
    imageSrc: "/images/disputes/10.png",
    imageAlt: "Person writing notes on financial contract with a pen",
    icon: "clock",
  },
];

type WhatEligibilityDependsOnSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  cards?: EligibilityCard[];
  className?: string;
};

export default function WhatEligibilityDependsOnSection({
  id = "eligibility-requirements",
  eyebrow = "Requirements",
  title = "What eligibility depends on",
  description = "Unknown requirements are shown as unknown — never assumed.",
  cards = DEFAULT_ELIGIBILITY_CARDS,
  className = "bg-white",
}: WhatEligibilityDependsOnSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3-Column Grid for Eligibility Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.id} delay={i * 50}>
              <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs h-full">
                <div>
                  {/* Zero-padding edge-to-edge top image */}
                  <div className="relative aspect-[20/10] w-full overflow-hidden">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 sm:p-7">
                    {/* Icon Box */}
                    <div className="mb-4 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-2xs">
                      {card.icon === "user" && (
                        <User className="h-4 w-4 stroke-[2]" />
                      )}
                      {card.icon === "globe" && (
                        <Globe className="h-4 w-4 stroke-[2]" />
                      )}
                      {card.icon === "clock" && (
                        <Clock className="h-4 w-4 stroke-[2]" />
                      )}
                    </div>

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

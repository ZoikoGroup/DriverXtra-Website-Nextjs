import type { ReactNode } from "react";
import Image from "next/image";
import { Gauge, Layers, CreditCard } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type NumberIdeaCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: "gauge" | "layers" | "card";
};

const DEFAULT_NUMBER_IDEAS: NumberIdeaCard[] = [
  {
    id: "depreciation",
    title: "Depreciation",
    description:
      "The difference between what you pay and what the car is worth at the end — often the biggest cost, and the least certain.",
    imageSrc: "/images/auto/2.png",
    imageAlt: "Green high-performance luxury coupe parked outdoors",
    icon: "gauge",
  },
  {
    id: "fixed-vs-variable",
    title: "Fixed vs variable",
    description:
      "Insurance and tax arrive regardless of use; fuel and wear grow with distance.",
    imageSrc: "/images/auto/1.png",
    imageAlt:
      "Man driving a modern luxury car during sunset holding steering wheel",
    icon: "layers",
  },
  {
    id: "apr-vs-total-loan-cost",
    title: "APR vs total loan cost",
    description:
      "A lower rate over a longer term can still cost more interest overall.",
    imageSrc: "/images/market/2.png",
    imageAlt: "Person writing notes on financial contract document",
    icon: "card",
  },
];

type UnderstandTheNumbersSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  ideas?: NumberIdeaCard[];
  className?: string;
};

export default function UnderstandTheNumbersSection({
  id = "understand-the-numbers",
  eyebrow = "Key ideas",
  title = "Understand the numbers",
  description,
  ideas = DEFAULT_NUMBER_IDEAS,
  className = "bg-white",
}: UnderstandTheNumbersSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3-Column Grid for Key Idea Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {ideas.map((item, i) => (
            <Reveal key={item.id} delay={i * 50}>
              <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs h-full">
                <div>
                  {/* Zero-padding edge-to-edge top image */}
                  <div className="relative aspect-[26/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 sm:p-7">
                    {/* Dark Slate Icon Badge */}
                    <div className="mb-4 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-2xs">
                      {item.icon === "gauge" && (
                        <Gauge className="h-4 w-4 stroke-[2]" />
                      )}
                      {item.icon === "layers" && (
                        <Layers className="h-4 w-4 stroke-[2]" />
                      )}
                      {item.icon === "card" && (
                        <CreditCard className="h-4 w-4 stroke-[2]" />
                      )}
                    </div>

                    <h3 className="text-base font-bold text-ink sm:text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {item.description}
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

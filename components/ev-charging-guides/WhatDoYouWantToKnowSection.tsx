import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type EvTopicCard = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
};

const DEFAULT_EV_TOPICS: EvTopicCard[] = [
  {
    id: "new-to-evs",
    title: "New to EVs",
    imageSrc: "/images/market/3.png",
    imageAlt: "Person driving a vehicle during sunset holding steering wheel",
    href: "#",
  },
  {
    id: "charge-at-home",
    title: "Charge at home",
    imageSrc: "/images/ev/1.jpg",
    imageAlt: "Modern home exterior with swimming pool and driveway",
    href: "#",
  },
  {
    id: "charge-in-public",
    title: "Charge in public",
    imageSrc: "/images/auto/4.png",
    imageAlt: "Electric vehicle plugged into a public charging port",
    href: "#",
  },
  {
    id: "understand-range",
    title: "Understand range",
    imageSrc: "/images/auto/9.png",
    imageAlt: "Front profile view of a performance muscle car",
    href: "#",
  },
  {
    id: "compare-costs",
    title: "Compare costs",
    imageSrc: "/images/auto/3.png",
    imageAlt: "Person reviewing financial paperwork and calculator on desk",
    href: "#",
  },
];

type WhatDoYouWantToKnowSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  topics?: EvTopicCard[];
  className?: string;
};

export default function WhatDoYouWantToKnowSection({
  id = "what-do-you-want-to-know",
  eyebrow = "Start here",
  title = "What do you want to know?",
  description,
  topics = DEFAULT_EV_TOPICS,
  className = "bg-white",
}: WhatDoYouWantToKnowSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 5-Column Responsive Grid */}
        <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {topics.map((item, i) => (
            <Reveal key={item.id} delay={i * 40}>
              <a
                href={item.href || "#"}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300 h-full"
              >
                <div>
                  {/* Zero-padding edge-to-edge top image */}
                  <div className="relative aspect-[20/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="text-xs font-bold text-ink sm:text-sm group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

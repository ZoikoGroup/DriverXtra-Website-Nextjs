import type { ReactNode } from "react";
import Image from "next/image";
import { Gauge, CreditCard, Zap, Tag, Wrench, Truck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type AutomotiveTopicCard = {
  id: string;
  title: string;
  publishedCount: number;
  imageSrc: string;
  imageAlt: string;
  icon: "gauge" | "card" | "zap" | "tag" | "wrench" | "truck";
};

const DEFAULT_TOPIC_CARDS: AutomotiveTopicCard[] = [
  {
    id: "market-data",
    title: "Market data",
    publishedCount: 1,
    imageSrc: "/images/auto/2.png",
    imageAlt: "Green high-performance luxury coupe parked outdoors during dusk",
    icon: "gauge",
  },
  {
    id: "ownership",
    title: "Ownership",
    publishedCount: 1,
    imageSrc: "/images/auto/3.png",
    imageAlt: "Person reviewing financial paperwork and calculator on desk",
    icon: "card",
  },
  {
    id: "ev",
    title: "EV",
    publishedCount: 2,
    imageSrc: "/images/auto/4.png",
    imageAlt: "Electric vehicle plugged into charging station port",
    icon: "zap",
  },
  {
    id: "buying-selling",
    title: "Buying & Selling",
    publishedCount: 2,
    imageSrc: "/images/auto/5.png",
    imageAlt: "Side silhouette view of a luxury sedan in low light",
    icon: "tag",
  },
  {
    id: "parts",
    title: "Parts",
    publishedCount: 1,
    imageSrc: "/images/auto/6.png",
    imageAlt: "Mechanic pouring motor oil into engine bay",
    icon: "wrench",
  },
  {
    id: "fleet",
    title: "Fleet",
    publishedCount: 1,
    imageSrc: "/images/auto/7.png",
    imageAlt:
      "Large commercial transport truck driving along countryside highway",
    icon: "truck",
  },
];

type ExploreTopicsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  topics?: AutomotiveTopicCard[];
  className?: string;
};

export default function ExploreTopicsSection({
  id = "explore-topics",
  eyebrow = "Explore topics",
  title = "Explore topics",
  description,
  topics = DEFAULT_TOPIC_CARDS,
  className = "bg-white",
}: ExploreTopicsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 6-Column Grid for Topic Cards */}
        <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {topics.map((topic, i) => (
            <Reveal key={topic.id} delay={i * 30}>
              <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300 h-full">
                <div>
                  {/* Zero-padding edge-to-edge top image */}
                  <div className="relative aspect-[20/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={topic.imageSrc}
                      alt={topic.imageAlt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4 sm:p-5">
                    {/* Inline Icon + Title Row */}
                    <div className="flex items-center gap-2">
                      <span className="text-[#F5B400] shrink-0">
                        {topic.icon === "gauge" && (
                          <Gauge className="h-4 w-4 stroke-[2]" />
                        )}
                        {topic.icon === "card" && (
                          <CreditCard className="h-4 w-4 stroke-[2]" />
                        )}
                        {topic.icon === "zap" && (
                          <Zap className="h-4 w-4 stroke-[2]" />
                        )}
                        {topic.icon === "tag" && (
                          <Tag className="h-4 w-4 stroke-[2]" />
                        )}
                        {topic.icon === "wrench" && (
                          <Wrench className="h-4 w-4 stroke-[2]" />
                        )}
                        {topic.icon === "truck" && (
                          <Truck className="h-4 w-4 stroke-[2]" />
                        )}
                      </span>

                      <h3 className="text-xs font-bold text-ink sm:text-sm truncate">
                        {topic.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[11px] font-medium text-slate-400 sm:text-xs">
                      {topic.publishedCount}{" "}
                      {topic.publishedCount === 1 ? "published" : "published"}
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

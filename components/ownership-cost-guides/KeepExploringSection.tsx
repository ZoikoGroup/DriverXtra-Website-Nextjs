import type { ReactNode } from "react";
import Image from "next/image";
import { FileText, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type KeepExploringCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  linkText?: string;
};

const DEFAULT_EXPLORE_CARDS: KeepExploringCard[] = [
  {
    id: "vehicle-finance",
    title: "Vehicle Finance",
    description: "Compare loans and leases.",
    imageSrc: "/images/auto/3.png",
    imageAlt: "Person reviewing financial paperwork and calculator on desk",
    href: "#",
    linkText: "Open",
  },
  {
    id: "market-trends",
    title: "Market Trends",
    description: "Observed price patterns.",
    imageSrc: "/images/market/1.png",
    imageAlt: "Analytics and market metrics dashboard screen",
    href: "#",
    linkText: "Open",
  },
  {
    id: "automotive-insights",
    title: "Automotive Insights",
    description: "What goes into owning a car.",
    imageSrc: "/images/market/3.png",
    imageAlt: "Man driving a vehicle during sunset holding steering wheel",
    href: "#",
    linkText: "Open",
  },
];

type KeepExploringSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  cards?: KeepExploringCard[];
  className?: string;
};

export default function KeepExploringSection({
  id = "keep-exploring",
  eyebrow = "Related",
  title = "Keep exploring",
  description,
  cards = DEFAULT_EXPLORE_CARDS,
  className = "bg-white",
}: KeepExploringSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3-Column Grid for Keep Exploring Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.id} delay={i * 50}>
              <a
                href={card.href || "#"}
                className="group flex flex-col justify-between overflow-visible rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300 h-full"
              >
                <div>
                  {/* Zero-padding edge-to-edge top image */}
                  <div className="relative aspect-[24/10] w-full overflow-hidden rounded-t-3xl bg-slate-900">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Icon + Content */}
                  <div className="px-6 pb-6 sm:px-7">
                    <div className="relative -mt-5 mb-4 inline-flex">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-md ring-4 ring-white">
                        <FileText className="h-5 w-5 stroke-[2]" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-ink sm:text-lg">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Footer Link Button */}
                <div className="px-6 pb-6 sm:px-7 pt-0">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 transition-colors group-hover:text-blue-700">
                    <span>{card.linkText || "Open"}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
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

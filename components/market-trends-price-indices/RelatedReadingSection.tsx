import type { ReactNode } from "react";
import Image from "next/image";
import { FileText } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type RelatedReadingCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
};

const DEFAULT_RELATED_CARDS: RelatedReadingCard[] = [
  {
    id: "automotive-insights",
    title: "Automotive Insights",
    description: "Analysis and explainers.",
    imageSrc: "/images/market/3.png",
    imageAlt: "Man driving a modern vehicle at sunset holding steering wheel",
    href: "#",
  },
  {
    id: "asking-vs-sold-prices",
    title: "Asking vs sold prices",
    description: "Why the two tell different stories.",
    imageSrc: "/images/auto/2.png",
    imageAlt: "Green luxury performance coupe parked outdoors",
    href: "#",
  },
  {
    id: "buyer-safety",
    title: "Buyer Safety",
    description: "Checks before you commit.",
    imageSrc: "/images/auto/9.png",
    imageAlt: "Front profile of a muscle car parked outdoors",
    href: "#",
  },
];

type RelatedReadingSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  cards?: RelatedReadingCard[];
  className?: string;
};

export default function RelatedReadingSection({
  id = "related-reading",
  eyebrow = "Related",
  title = "Related reading",
  description,
  cards = DEFAULT_RELATED_CARDS,
  className = "bg-white",
}: RelatedReadingSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3-Column Grid for Related Reading Cards */}
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

                  {/* Icon positioned in between image and text content */}
                  <div className="px-6 pb-8 sm:px-7">
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
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

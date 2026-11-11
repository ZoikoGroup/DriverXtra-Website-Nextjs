import type { ReactNode } from "react";
import Image from "next/image";
import { FileText } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type PracticalGuideCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
};

const DEFAULT_GUIDE_CARDS: PracticalGuideCard[] = [
  {
    id: "ownership-cost-guides",
    title: "Ownership Cost Guides",
    description: "What it really costs to run a vehicle.",
    imageSrc: "/images/auto/3.png",
    imageAlt: "Person reviewing financial documents and calculator at desk",
    href: "#",
  },
  {
    id: "ev-charging-guides",
    title: "EV & Charging Guides",
    description: "Charging options, range and running costs.",
    imageSrc: "/images/auto/4.png",
    imageAlt: "Electric vehicle charging cable inserted into port",
    href: "#",
  },
  {
    id: "buying-selling-guides",
    title: "Buying & Selling Guides",
    description: "Step-by-step checks for both sides.",
    imageSrc: "/images/auto/9.png",
    imageAlt: "Front profile of a performance muscle car parked outdoors",
    href: "#",
  },
];

type GoDeeperWithAGuideSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  guides?: PracticalGuideCard[];
  className?: string;
};

export default function GoDeeperWithAGuideSection({
  id = "go-deeper-guide",
  eyebrow = "Practical guides",
  title = "Go deeper with a guide",
  description,
  guides = DEFAULT_GUIDE_CARDS,
  className = "bg-white",
}: GoDeeperWithAGuideSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3-Column Grid for Practical Guide Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {guides.map((guide, i) => (
            <Reveal key={guide.id} delay={i * 50}>
              <a
                href={guide.href || "#"}
                className="group flex flex-col justify-between overflow-visible rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300 h-full"
              >
                <div>
                  {/* Zero-padding edge-to-edge top image */}
                  <div className="relative aspect-[24/10] w-full overflow-hidden rounded-t-3xl bg-slate-900">
                    <Image
                      src={guide.imageSrc}
                      alt={guide.imageAlt}
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
                      {guide.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {guide.description}
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

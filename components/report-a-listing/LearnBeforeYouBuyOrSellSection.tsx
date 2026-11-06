import type { ReactNode } from "react";
import Image from "next/image";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type GuidanceCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

const DEFAULT_GUIDANCE_CARDS: GuidanceCard[] = [
  {
    id: "buyer-safety",
    title: "Buyer Safety",
    description: "Checks before you commit.",
    imageSrc: "/images/seller/2.png",
    imageAlt: "Side profile of a sleek luxury dark sedan in low light showroom",
    href: "#",
  },
  {
    id: "seller-safety",
    title: "Seller Safety",
    description: "Protect yourself when selling.",
    imageSrc: "/images/seller/1.png",
    imageAlt: "Front profile of a performance muscle car parked outdoors",
    href: "#",
  },
  {
    id: "parts-authenticity",
    title: "Parts Authenticity",
    description: "What parts claims mean.",
    imageSrc: "/images/parts/2.png",
    imageAlt: "Person pouring oil or fluid into a vehicle engine bay",
    href: "#",
  },
];

type LearnBeforeYouBuyOrSellSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  cards?: GuidanceCard[];
  className?: string;
};

export default function LearnBeforeYouBuyOrSellSection({
  id = "related-guidance",
  eyebrow = "Related guidance",
  title = "Learn before you buy or sell",
  description,
  cards = DEFAULT_GUIDANCE_CARDS,
  className = "bg-[#F6F8FB]",
}: LearnBeforeYouBuyOrSellSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3-Column Grid for Guidance Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.id} delay={i * 50}>
              <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs h-full">
                <div>
                  {/* Zero-padding edge-to-edge image header */}
                  <div className="relative aspect-[24/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 sm:p-7">
                    {/* Shield Icon Box */}
                    <div className="mb-4 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-2xs">
                      <ShieldCheck className="h-4 w-4 stroke-[2]" />
                    </div>

                    <h3 className="text-base font-bold text-ink sm:text-lg">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Read Guide Footer Link */}
                <div className="p-6 pt-0 sm:p-7 sm:pt-0">
                  <a
                    href={card.href}
                    className="group/link inline-flex items-center gap-2 text-xs font-bold text-blue-600 transition-colors hover:text-blue-700 sm:text-sm"
                  >
                    <span>Read guide</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

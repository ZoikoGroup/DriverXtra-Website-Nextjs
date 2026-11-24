import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type RelatedSellerToolCard = {
  id: string;
  title: string;
  description: string;
  ctaLabel?: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_RELATED_SELLER_TOOLS: RelatedSellerToolCard[] = [
  {
    id: "pricing-guidance",
    title: "Pricing Guidance",
    description: "See a possible asking-price range.",
    ctaLabel: "Open",
    href: "#pricing-guidance",
    imageSrc: "/images/disputes/11.png",
    imageAlt: "Market distribution charts and pricing analytics dashboard",
  },
  {
    id: "selling-guide",
    title: "Selling Guide",
    description: "Every step from prep to handover.",
    ctaLabel: "Open",
    href: "#selling-guide",
    imageSrc: "/images/auto/9.png",
    imageAlt: "Front profile of a performance muscle car outdoors",
  },
  {
    id: "fees-and-disclosures",
    title: "Fees & Disclosures",
    description: "Who is responsible for what.",
    ctaLabel: "Open",
    href: "#fees-and-disclosures",
    imageSrc: "/images/auto/3.png",
    imageAlt: "Financial paperwork, calculator and documentation on desk",
  },
];

type RelatedSellerToolsSectionProps = {
  id?: string;
  title?: ReactNode;
  tools?: RelatedSellerToolCard[];
  className?: string;
};

export default function RelatedSellerToolsSection({
  id = "related-seller-tools",
  title = "Related seller tools",
  tools = DEFAULT_RELATED_SELLER_TOOLS,
  className = "bg-[#F6F8FB]",
}: RelatedSellerToolsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <Reveal delay={50}>
          <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
            {title}
          </h2>
        </Reveal>

        {/* 3-Column Grid for Related Tools */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {tools.map((tool, index) => (
            <Reveal key={tool.id} delay={index * 50}>
              <a
                href={tool.href}
                className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-0 shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-md"
              >
                <div className="p-0">
                  {/* Zero-Padding Edge-to-Edge Top Thumbnail Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-none bg-slate-900 p-0 m-0">
                    <Image
                      src={tool.imageSrc}
                      alt={tool.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="h-full w-full object-cover p-0 m-0 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Overlapping Dark Badge + Title + Subtitle */}
                  <div className="relative px-6 pb-5 pt-0">
                    <div className="-mt-5 mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-xs ring-2 ring-white">
                      <ArrowRight className="h-4 w-4 stroke-[2.25] transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>

                    <h3 className="text-sm font-bold text-ink sm:text-base">
                      {tool.title}
                    </h3>

                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {tool.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="px-6 pb-6 pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 transition-colors group-hover:text-blue-700">
                    <span>{tool.ctaLabel || "Open"}</span>
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.25] transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

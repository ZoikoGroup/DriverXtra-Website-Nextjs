import type { ReactNode } from "react";
import Image from "next/image";
import { UserCheck, Building2, Car } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type DistinctionCard = {
  title: string;
  description: string;
  icon: typeof UserCheck;
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_DISTINCTIONS: DistinctionCard[] = [
  {
    title: "Identity",
    description:
      "Identity checks can relate to a person or a business. They do not by themselves confirm permission to sell an item or complete a transaction.",
    icon: UserCheck,
    imageSrc: "/images/how/2.png",
    imageAlt: "Two business professionals high-fiving at an office desk",
  },
  {
    title: "Authority",
    description:
      "Some business categories may require separate operating or representative authority checks, depending on the market and activity.",
    icon: Building2,
    imageSrc: "/images/how/3.png",
    imageAlt:
      "Modern corporate skyscraper buildings looking up from street level",
  },
  {
    title: "Listing or product",
    description:
      "A checked seller does not mean every listing, vehicle or part is authenticated, inspected or guaranteed.",
    icon: Car,
    imageSrc: "/images/how/4.png",
    imageAlt: "Luxury grey sports car parked outdoors",
  },
];

type CoreDistinctionsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  distinctions?: DistinctionCard[];
  className?: string;
};

export default function CoreDistinctionsSection({
  id = "core-distinctions",
  eyebrow = "Three core distinctions",
  title = "A signal covers one attribute — not everything",
  description,
  distinctions = DEFAULT_DISTINCTIONS,
  className = "bg-white",
}: CoreDistinctionsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {distinctions.map(
            (
              {
                title: cardTitle,
                description: cardDesc,
                icon: Icon,
                imageSrc,
                imageAlt,
              },
              i,
            ) => (
              <Reveal key={cardTitle} delay={i * 80}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                  {/* Image Container */}
                  <div className="relative aspect-[20/9] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content Container with Inline Icon Badge */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      {/* Dark Icon Badge matching screenshot exact placement */}
                      <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-sm">
                        <Icon className="h-5 w-5 stroke-[2]" />
                      </div>

                      <h3 className="text-base font-bold text-ink">
                        {cardTitle}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                        {cardDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

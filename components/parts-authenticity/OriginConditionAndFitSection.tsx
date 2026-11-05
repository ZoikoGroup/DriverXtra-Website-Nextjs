import type { ReactNode } from "react";
import Image from "next/image";
import { ClipboardCheck, Wrench, Car } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type AuthenticityAspectCard = {
  title: string;
  description: string;
  icon: typeof ClipboardCheck;
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_ASPECTS: AuthenticityAspectCard[] = [
  {
    title: "Origin (authenticity)",
    description:
      "Who made the part, and whether a claim about that is supported by evidence.",
    icon: ClipboardCheck,
    imageSrc: "/images/parts/2.png",
    imageAlt: "Hands pouring motor oil into an engine bay using a funnel",
  },
  {
    title: "Condition and safety",
    description:
      "A provenance record does not independently establish that a part is free of defects or recalls.",
    icon: Wrench,
    imageSrc: "/images/parts/3.png",
    imageAlt:
      "Vehicle undergoing maintenance in a workshop with garage bay lighting",
  },
  {
    title: "Fitment",
    description:
      "Compatibility information does not establish manufacturing origin or suitability for installation.",
    icon: Car,
    imageSrc: "/images/parts/4.png",
    imageAlt: "Modified performance sports car parked outdoors",
  },
];

type OriginConditionAndFitSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  aspects?: AuthenticityAspectCard[];
  className?: string;
};

export default function OriginConditionAndFitSection({
  id = "what-authenticity-means",
  eyebrow = "What authenticity means",
  title = "Origin, condition and fit are different questions",
  description,
  aspects = DEFAULT_ASPECTS,
  className = "bg-white",
}: OriginConditionAndFitSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3 Column Grid with Inline Content Icons */}
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {aspects.map(
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
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Content Body */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      {/* Dark Icon Box inside content side */}
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

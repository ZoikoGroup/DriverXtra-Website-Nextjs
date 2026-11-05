import type { ReactNode } from "react";
import Image from "next/image";
import { Scale, FileText } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ReviewKindCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: "scale" | "file";
};

const DEFAULT_REVIEW_KINDS: ReviewKindCard[] = [
  {
    id: "a-dispute",
    title: "A dispute",
    description:
      "A disagreement about a marketplace transaction or service — a vehicle, parts order, booking or transport. Coverage depends on the market and product.",
    imageSrc: "/images/disputes/6.png",
    imageAlt: "Green high-performance luxury coupe parked outdoors during dusk",
    icon: "scale",
  },
  {
    id: "an-appeal",
    title: "An appeal",
    description:
      "A request to review an eligible platform decision, like a listing or account restriction. There's no universal automatic right to a second review.",
    imageSrc: "/images/disputes/7.png",
    imageAlt: "Person writing notes on official document with a pen",
    icon: "file",
  },
];

type TwoKindsOfReviewSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  cards?: ReviewKindCard[];
  className?: string;
};

export default function TwoKindsOfReviewSection({
  id = "two-kinds-of-review",
  eyebrow = "Dispute or appeal",
  title = "Two different kinds of review",
  description,
  cards = DEFAULT_REVIEW_KINDS,
  className = "bg-[#F6F8FB]",
}: TwoKindsOfReviewSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 2-Column Grid for Review Kinds */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal key={card.id} delay={i * 50}>
              <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs h-full">
                <div>
                  {/* Edge-to-edge zero padding top image container */}
                  <div className="relative aspect-[20/9] w-full overflow-hidden">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 sm:p-8">
                    {/* Dark Slate Icon Badge */}
                    <div className="mb-4 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-2xs">
                      {card.icon === "scale" && (
                        <Scale className="h-4 w-4 stroke-[2]" />
                      )}
                      {card.icon === "file" && (
                        <FileText className="h-4 w-4 stroke-[2]" />
                      )}
                    </div>

                    <h3 className="text-base font-bold text-ink sm:text-lg">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {card.description}
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

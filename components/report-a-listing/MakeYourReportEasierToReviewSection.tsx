import type { ReactNode } from "react";
import Image from "next/image";
import { Eye, FileText, Clock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ReportTipCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: "specific" | "secrets" | "once";
};

const DEFAULT_TIP_CARDS: ReportTipCard[] = [
  {
    id: "be-specific",
    title: "Be specific",
    description:
      "Name the exact detail that's wrong and where you saw the correct information.",
    imageSrc: "/images/listing/3.png",
    imageAlt: "Person writing notes on financial contract with a pen",
    icon: "specific",
  },
  {
    id: "show-dont-share",
    title: "Show, don't share secrets",
    description:
      "Screenshots help. Crop out card numbers, passwords and anyone's personal details.",
    imageSrc: "/images/listing/4.png",
    imageAlt: "Laptop displaying code on screen on office desk",
    icon: "secrets",
  },
  {
    id: "report-once",
    title: "Report once",
    description:
      "Retrying won't create duplicates. If you're unsure it went through, check your reference first.",
    imageSrc: "/images/listing/5.png",
    imageAlt: "Analytics dashboard screen displaying data charts",
    icon: "once",
  },
];

type MakeYourReportEasierToReviewSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  cards?: ReportTipCard[];
  className?: string;
};

export default function MakeYourReportEasierToReviewSection({
  id = "report-tips",
  eyebrow = "Tips",
  title = "Make your report easier to review",
  description,
  cards = DEFAULT_TIP_CARDS,
  className = "bg-white",
}: MakeYourReportEasierToReviewSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3-Column Grid for Report Tips Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.id} delay={i * 50}>
              <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs h-full">
                <div>
                  {/* Zero-padding edge-to-edge image header */}
                  <div className="relative aspect-[25/10] w-full overflow-hidden">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 sm:p-7">
                    {/* Icon Box */}
                    <div className="mb-4 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-2xs">
                      {card.icon === "specific" && (
                        <Eye className="h-4 w-4 stroke-[2]" />
                      )}
                      {card.icon === "secrets" && (
                        <FileText className="h-4 w-4 stroke-[2]" />
                      )}
                      {card.icon === "once" && (
                        <Clock className="h-4 w-4 stroke-[2]" />
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

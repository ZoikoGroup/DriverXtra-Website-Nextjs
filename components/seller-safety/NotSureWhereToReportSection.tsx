import type { ReactNode } from "react";
import Image from "next/image";
import { AlertTriangle, Flag, Scale } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ReportCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: "fraud" | "listing" | "disputes";
  buttonText: string;
  buttonVariant: "amber" | "outline";
};

const DEFAULT_REPORT_CARDS: ReportCard[] = [
  {
    id: "report-fraud",
    title: "Report Fraud",
    description:
      "Choose Report Fraud for suspected scams, fake payments, account impersonation or coercion.",
    imageSrc: "/images/seller/13.png",
    imageAlt: "Person holding smartphone and working on laptop computer",
    icon: "fraud",
    buttonText: "Report Fraud",
    buttonVariant: "amber",
  },
  {
    id: "report-listing",
    title: "Report a Listing",
    description:
      "Choose Report a Listing for misleading, copied, unsafe or suspicious listing content.",
    imageSrc: "/images/seller/14.png",
    imageAlt: "Green high-performance luxury coupe parked outdoors",
    icon: "listing",
    buttonText: "Report a Listing",
    buttonVariant: "amber",
  },
  {
    id: "disputes-appeals",
    title: "Disputes & Appeals",
    description:
      "Choose Disputes & Appeals for an eligible transaction dispute or review of a formal platform decision.",
    imageSrc: "/images/seller/15.png",
    imageAlt: "Modern open plan office workspace with employees at desks",
    icon: "disputes",
    buttonText: "Disputes & Appeals",
    buttonVariant: "outline",
  },
];

type NotSureWhereToReportSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  cards?: ReportCard[];
  className?: string;
};

export default function NotSureWhereToReportSection({
  id = "report",
  eyebrow = "Report",
  title = "Not sure where to report?",
  description,
  cards = DEFAULT_REPORT_CARDS,
  className = "bg-[#F6F8FB]",
}: NotSureWhereToReportSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3-Column Grid for Report Cards */}
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
                    {/* Icon Box */}
                    <div className="mb-4 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-2xs">
                      {card.icon === "fraud" && (
                        <AlertTriangle className="h-4 w-4 stroke-[2]" />
                      )}
                      {card.icon === "listing" && (
                        <Flag className="h-4 w-4 stroke-[2]" />
                      )}
                      {card.icon === "disputes" && (
                        <Scale className="h-4 w-4 stroke-[2]" />
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

                {/* Button Footer */}
                <div className="p-6 pt-0 sm:p-7 sm:pt-0">
                  {card.buttonVariant === "amber" ? (
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-full bg-[#F5B400] px-5 py-2.5 text-xs font-bold text-ink shadow-2xs transition-all duration-200 hover:bg-[#e0a400]"
                    >
                      {card.buttonText}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
                    >
                      {card.buttonText}
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Plus, X, Check, AlertTriangle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type WarningSignCard = {
  id: string;
  title: string;
  description: string;
  answerText: string;
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_SIGNS: WarningSignCard[] = [
  {
    id: "inconsistent-packaging",
    title: "Inconsistent packaging",
    description:
      "Fonts, colours, labels or seals that differ from the manufacturer's usual packaging.",
    answerText:
      "Compare with the issuer's own information, and report the listing if a claim looks unsupported.",
    imageSrc: "/images/parts/7.png",
    imageAlt: "Inconsistent packaging inspection",
  },
  {
    id: "altered-identifiers",
    title: "Altered identifiers",
    description: "Scratched, relabelled or missing part numbers and serials.",
    answerText:
      "Inspect serial etchings and lot numbers directly. Avoid parts where production stamps appear scraped or restamped.",
    imageSrc: "/images/parts/2.png",
    imageAlt: "Altered part identifiers check",
  },
  {
    id: "implausible-pricing",
    title: "Implausible pricing",
    description: '"Genuine" parts far below typical prices for that part.',
    answerText:
      "Cross-reference wholesale and retail price averages across authorized dealers before purchasing.",
    imageSrc: "/images/trust/8.png",
    imageAlt: "Pricing documents and evidence",
  },
  {
    id: "unusual-representations",
    title: "Unusual representations",
    description: "Logos or brand images used without supporting evidence.",
    answerText:
      "Verify trademark usage claims and request official distributor or seller authorization certificates.",
    imageSrc: "/images/trust/11.png",
    imageAlt: "Unusual brand representations check",
  },
  {
    id: "safety-critical-shortcuts",
    title: "Safety-critical shortcuts",
    description: "Brakes, steering or airbags sold with vague origin details.",
    answerText:
      "Always request explicit proof of origin and safety testing compliance prior to buying critical components.",
    imageSrc: "/images/parts/8.png",
    imageAlt: "Safety-critical part verification",
  },
];

type SignsWorthACloserLookSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  signs?: WarningSignCard[];
  safetyNoticeTitle?: string;
  safetyNoticeDescription?: ReactNode;
  className?: string;
};

export default function SignsWorthACloserLookSection({
  id = "warning-signs",
  eyebrow = "Warning signs",
  title = "Signs worth a closer look",
  description = "Indicators aren't proof — but they're a reason to pause and check.",
  signs = DEFAULT_SIGNS,
  safetyNoticeTitle = "Safety and recalls",
  safetyNoticeDescription = "Where an authoritative source is available, check whether a part is recalled. The absence of a recall record isn't a safety certificate, and recall checks are separate from authenticity.",
  className = "bg-white",
}: SignsWorthACloserLookSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    "inconsistent-packaging",
  );

  const toggleExpand = (signId: string) => {
    setExpandedId(expandedId === signId ? null : signId);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 2-Column Grid for Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {signs.map((card, i) => {
            const isExpanded = expandedId === card.id;

            return (
              <Reveal key={card.id} delay={i * 50}>
                <div
                  onClick={() => toggleExpand(card.id)}
                  className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isExpanded
                      ? "border-slate-300 shadow-xs"
                      : "border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  {/* Top row: Image on left with individual imageSrc, text on right */}
                  <div className="flex items-stretch">
                    <div className="relative h-[90px] w-[90px] sm:w-[105px] shrink-0 overflow-hidden bg-slate-900">
                      <Image
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        fill
                        sizes="(max-width: 640px) 90px, 105px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 items-start justify-between gap-4 p-4 sm:p-5">
                      <div>
                        <h3 className="text-sm font-bold text-ink sm:text-base">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-xs italic text-slate-500 sm:text-sm">
                          {card.description}
                        </p>
                      </div>

                      {/* Accordion Toggle Icon */}
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors ${
                          isExpanded
                            ? "bg-[#F5B400] text-ink"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {isExpanded ? (
                          <X className="h-3.5 w-3.5 stroke-[2.5]" />
                        ) : (
                          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Expanded answer box spanning full width below the image and text row */}
                  {isExpanded && (
                    <div className="flex items-start gap-2 border-t border-slate-100 bg-white px-5 py-3.5 text-xs font-medium text-emerald-700 sm:text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 stroke-[2.5]" />
                      <span>{card.answerText}</span>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Full-Width Safety & Recalls Card */}
        <Reveal delay={300} className="mt-8">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
            <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-sm">
              <AlertTriangle className="h-5 w-5 stroke-[2]" />
            </div>

            <h3 className="text-base font-bold text-ink sm:text-lg">
              {safetyNoticeTitle}
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm max-w-4xl">
              {safetyNoticeDescription}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

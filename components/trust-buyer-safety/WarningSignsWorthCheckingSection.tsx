"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Plus, X, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type WarningCard = {
  id: string;
  title: string;
  quote?: string;
  description?: string;
  footerText?: string;
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_WARNINGS: WarningCard[] = [
  {
    id: "pressure",
    title: "Pressure and urgency",
    quote: "Another buyer is paying today — send a deposit now.",
    footerText: "Slow down. Genuine sellers can wait for reasonable checks.",
    imageSrc: "/images/trust/8.png",
    imageAlt: "Person reviewing invoices and documents with a calculator",
  },
  {
    id: "impersonation",
    title: "Impersonation",
    description:
      "Someone claims to be DriverXtra, a bank or a delivery company.",
    imageSrc: "/images/trust/9.png",
    imageAlt: "Person working on laptop and smartphone",
  },
  {
    id: "off-platform",
    title: "Off-platform switch",
    quote: "Let's move to another app — it's easier.",
    imageSrc: "/images/trust/10.png",
    imageAlt: "Laptop open on a desk showing code interface",
  },
  {
    id: "cloned-listings",
    title: "Cloned listings",
    description: "The same photos appear with a different seller or price.",
    imageSrc: "/images/trust/11.png",
    imageAlt: "Luxury grey sports car parked outdoors",
  },
  {
    id: "altered-evidence",
    title: "Altered evidence",
    description: "Documents or photos that look edited or inconsistent.",
    imageSrc: "/images/trust/12.png",
    imageAlt: "Person signing documentation on a clipboard",
  },
];

type WarningSignsWorthCheckingSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  warnings?: WarningCard[];
  className?: string;
};

export default function WarningSignsWorthCheckingSection({
  id = "common-patterns",
  eyebrow = "Common patterns",
  title = "Warning signs worth checking",
  description = "These patterns are common — spotting one doesn't prove fraud, but it's a reason to pause.",
  warnings = DEFAULT_WARNINGS,
  className = "bg-[#F6F8FB]",
}: WarningSignsWorthCheckingSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>("pressure");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* Asymmetrical 2-Column Grid Layout matching design */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {warnings.map((card, i) => {
            const isExpanded = expandedId === card.id;

            return (
              <Reveal key={card.id} delay={i * 60}>
                <div
                  onClick={() => toggleExpand(card.id)}
                  className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white p-4 transition-all duration-300 sm:flex-row sm:items-center sm:gap-5 sm:p-5 ${
                    isExpanded
                      ? "border-slate-300 shadow-sm"
                      : "border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-xl bg-slate-900 sm:aspect-[4/3] sm:w-36">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 150px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Content & Accordion Body */}
                  <div className="mt-4 flex flex-1 flex-col justify-between sm:mt-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-bold text-ink sm:text-base">
                          {card.title}
                        </h3>

                        {card.quote ? (
                          <p className="mt-1 text-xs italic text-slate-500 sm:text-sm">
                            &ldquo;{card.quote}&rdquo;
                          </p>
                        ) : (
                          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            {card.description}
                          </p>
                        )}
                      </div>

                      {/* Expand Toggle Button */}
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

                    {/* Expanded Footer note (e.g. for Pressure & urgency) */}
                    {isExpanded && card.footerText && (
                      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs font-medium text-emerald-700">
                        <Check className="h-4 w-4 shrink-0 stroke-[2.5]" />
                        <span>{card.footerText}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

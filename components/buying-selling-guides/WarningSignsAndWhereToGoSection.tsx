"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type WarningSignCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  actionLabel?: string;
  actionHref?: string;
  expandedDetails?: ReactNode;
};

const DEFAULT_WARNING_SIGNS: WarningSignCard[] = [
  {
    id: "fake-payment-screenshot",
    title: "Fake payment screenshot",
    description:
      "Do not release a vehicle or part until payment is verified through an independent channel.",
    imageSrc: "/images/buy/4.png",
    imageAlt:
      "Person holding phone next to laptop reviewing transaction details",
    actionLabel: "Report Fraud",
    actionHref: "#",
    expandedDetails:
      "Always check your bank app directly rather than relying on buyer screenshots or email notifications. Contact your bank immediately if you suspect fraudulent transfer documentation.",
  },
  {
    id: "misleading-listing-facts",
    title: "Misleading listing facts",
    description:
      "Compare documents and vehicle details. Record the mismatch without accusing anyone publicly.",
    imageSrc: "/images/auto/8.png",
    imageAlt: "Sports car on scenic open road",
    expandedDetails:
      "Request official V5C registration or title documents to cross-reference VIN numbers, mileage records, and trim levels before placing a deposit.",
  },
  {
    id: "disputed-transaction",
    title: "Disputed transaction",
    description:
      "Record evidence and check whether the platform process applies.",
    imageSrc: "/images/buy/3.png",
    imageAlt: "Modern corporate office space",
    expandedDetails:
      "Document all communications, receipts, and listings. Follow platform-specific dispute channels or consult legal advisors if buying privately.",
  },
  {
    id: "unknown-ownership-or-lien",
    title: "Unknown ownership or lien",
    description:
      "Check with the relevant registry or a qualified professional before proceeding.",
    imageSrc: "/images/Careers/c3.png",
    imageAlt: "Person signing paper contract documentation",
    expandedDetails:
      "Run a comprehensive HPI check or state title search to verify whether outstanding finance or third-party ownership claims exist on the vehicle.",
  },
  {
    id: "suspicious-deposit-request",
    title: "Suspicious deposit request",
    description:
      "Understand the terms and verify the payee yourself. There's no DriverXtra escrow.",
    imageSrc: "/images/auto/3.png",
    imageAlt: "Financial documents, calculator and paperwork",
    expandedDetails:
      "Never send wire transfers or non-refundable deposits to unverified individuals prior to inspecting the vehicle in person.",
  },
  {
    id: "unsafe-meetup",
    title: "Unsafe meetup",
    description:
      "Stop if it feels unsafe. In immediate danger, contact local emergency services.",
    imageSrc: "/images/Careers/c4.png",
    imageAlt: "People gathered near vehicle at public venue",
    expandedDetails:
      "Always arrange meetups in well-lit, public areas or designated police safe-exchange zones. Bring a companion whenever inspecting a vehicle.",
  },
];

type WarningSignsAndWhereToGoSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  cards?: WarningSignCard[];
  className?: string;
};

export default function WarningSignsAndWhereToGoSection({
  id = "warning-signs-and-where-to-go",
  eyebrow = "Risks",
  title = "Warning signs and where to go",
  description = "Each risk has one specialist route.",
  cards = DEFAULT_WARNING_SIGNS,
  className = "bg-[#F6F8FB]",
}: WarningSignsAndWhereToGoSectionProps) {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    "fake-payment-screenshot": true,
  });

  const toggleExpand = (cardId: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        {/* Section Title Header */}
        <Reveal delay={50}>
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        {/* 2-Column Responsive Card Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cards.map((card, index) => {
            const isExpanded = !!expandedIds[card.id];

            return (
              <Reveal key={card.id} delay={index * 40}>
                <div
                  className={`flex flex-col justify-between overflow-hidden rounded-3xl border bg-white shadow-xs transition-all duration-300 h-full ${
                    isExpanded
                      ? "border-slate-300 ring-1 ring-slate-200"
                      : "border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Left Thumbnail Image (Zero-padding edge container) */}
                    <div className="relative aspect-[4/3] w-full sm:w-36 sm:shrink-0">
                      <Image
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, 144px"
                        className="object-cover"
                      />
                    </div>

                    {/* Right Info Box */}
                    <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-xs font-bold text-ink sm:text-sm">
                            {card.title}
                          </h3>

                          {/* Plus/Minus Toggle Control */}
                          <button
                            type="button"
                            onClick={() => toggleExpand(card.id)}
                            className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-ink transition-colors"
                            aria-label="Toggle details"
                          >
                            {isExpanded ? (
                              <Minus className="h-3.5 w-3.5 stroke-[2.5]" />
                            ) : (
                              <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                            )}
                          </button>
                        </div>

                        <p className="mt-2 text-xs italic leading-relaxed text-slate-500">
                          {card.description}
                        </p>
                      </div>

                      {/* Explicit Action Link (e.g. Report Fraud) */}
                      {card.actionLabel && (
                        <div className="mt-4 pt-2">
                          <a
                            href={card.actionHref || "#"}
                            className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 underline underline-offset-4 hover:text-amber-600 transition-colors"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                            <span>{card.actionLabel}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expandable Details Drawer */}
                  {isExpanded && card.expandedDetails && (
                    <div className="border-t border-slate-100 bg-slate-50/60 p-5 text-xs text-slate-600 leading-relaxed sm:px-6">
                      {card.expandedDetails}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

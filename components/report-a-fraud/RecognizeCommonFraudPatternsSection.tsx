"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Plus, Minus, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type FraudPatternCard = {
  id: string;
  title: string;
  quote: string;
  imageSrc: string;
  imageAlt: string;
  expandedContent: string;
};

const DEFAULT_FRAUD_PATTERNS: FraudPatternCard[] = [
  {
    id: "payment-details-changed",
    title: "Payment details changed",
    quote: '"Please pay this new account instead."',
    imageSrc: "/images/fraud/3.png",
    imageAlt: "Person reviewing financial documents and calculator on desk",
    expandedContent:
      "Stop, don't pay or share codes, and verify through a channel you already trust. Then report it.",
  },
  {
    id: "fake-payment-proof",
    title: "Fake payment proof",
    quote: "A screenshot claims money was sent.",
    imageSrc: "/images/fraud/4.png",
    imageAlt: "Person writing notes on financial paperwork",
    expandedContent:
      "Verify funds directly in your own bank or payment provider account rather than relying on screenshots or receipt images.",
  },
  {
    id: "code-requests",
    title: "Code requests",
    quote: '"Read me the code we just sent."',
    imageSrc: "/images/fraud/5.png",
    imageAlt: "Person holding smartphone next to laptop screen",
    expandedContent:
      "Never share verification codes, login tokens, or passwords with anyone over phone, email, or chat.",
  },
  {
    id: "courier-pressure",
    title: "Courier pressure",
    quote: '"My courier collects today — pay the fee."',
    imageSrc: "/images/fraud/6.png",
    imageAlt: "Delivery truck driving on a mountain highway",
    expandedContent:
      "Confirm shipping and courier arrangements through established carrier channels before releasing items or sending fees.",
  },
  {
    id: "recovery-offers",
    title: "Recovery offers",
    quote: '"We can get your money back for a fee."',
    imageSrc: "/images/fraud/7.png",
    imageAlt: "Modern open plan office workspace with employees at desks",
    expandedContent:
      "Beware of secondary scams offering guaranteed fund recovery for an upfront fee; report suspicious offers immediately.",
  },
  {
    id: "threats-or-urgency",
    title: "Threats or urgency",
    quote: "Pressure, threats or deadlines to pay now.",
    imageSrc: "/images/fraud/8.png",
    imageAlt: "Two colleagues high-fiving over laptop in office workshop",
    expandedContent:
      "Scammers often create artificial urgency. Pause, verify through official support channels, and do not act under pressure.",
  },
];

type RecognizeCommonFraudPatternsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  patterns?: FraudPatternCard[];
  className?: string;
};

export default function RecognizeCommonFraudPatternsSection({
  id = "fraud-patterns",
  eyebrow = "Scam warning signs",
  title = "Recognize common fraud patterns",
  description = "Spotting a sign doesn't prove fraud — it's a reason to stop and check.",
  patterns = DEFAULT_FRAUD_PATTERNS,
  className = "bg-white",
}: RecognizeCommonFraudPatternsSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    "payment-details-changed",
  );

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

        {/* 2-Column Grid for Fraud Pattern Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {patterns.map((pattern, index) => {
            const isExpanded = expandedId === pattern.id;

            return (
              <Reveal key={pattern.id} delay={index * 40}>
                <div
                  onClick={() => toggleExpand(pattern.id)}
                  className={`cursor-pointer overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isExpanded
                      ? "border-slate-300 shadow-xs ring-1 ring-slate-200"
                      : "border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  {/* Top Row: Fully edge-to-edge zero outer padding image wrapper on the left */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Zero padding image container flush to top-left corner */}
                      <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden bg-slate-900 sm:w-[120px]">
                        <Image
                          src={pattern.imageSrc}
                          alt={pattern.imageAlt}
                          fill
                          sizes="(max-width: 640px) 100px, 120px"
                          className="object-cover"
                        />
                      </div>

                      {/* Title & Quote */}
                      <div className="py-4 pr-4">
                        <h3 className="text-sm font-bold text-ink sm:text-base">
                          {pattern.title}
                        </h3>
                        <p className="mt-1 text-xs italic text-slate-500 sm:text-sm">
                          {pattern.quote}
                        </p>
                      </div>
                    </div>

                    {/* Plus/Minus Toggle Button */}
                    <div className="pr-4 sm:pr-5">
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors ${
                          isExpanded
                            ? "bg-[#0B1220] text-[#F5B400] shadow-2xs"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {isExpanded ? (
                          <Minus className="h-3.5 w-3.5 stroke-[2.5]" />
                        ) : (
                          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Content Box for every card */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                        <p className="text-xs font-medium text-slate-700 sm:text-sm leading-relaxed">
                          {pattern.expandedContent}
                        </p>
                      </div>
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

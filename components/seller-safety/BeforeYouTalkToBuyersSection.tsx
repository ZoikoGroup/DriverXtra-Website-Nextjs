"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type SellerSituation = {
  id: string;
  label: string;
  checklistTitle: string;
  items: string[];
};

const DEFAULT_SITUATIONS: SellerSituation[] = [
  {
    id: "private-vehicle",
    label: "Private vehicle seller",
    checklistTitle: "Before contact checklist",
    items: [
      "Share only the listing details buyers need",
      "Keep your home address and documents private until you're ready",
      "Use in-platform messaging where it's available",
      "Never share login or one-time codes",
    ],
  },
  {
    id: "dealer-business",
    label: "Dealer or business seller",
    checklistTitle: "Business contact checklist",
    items: [
      "Verify authorized representative credentials and business registration",
      "Ensure commercial terms and tax details are clearly documented",
      "Keep official communications within approved corporate channels",
      "Protect customer data and payment records securely",
    ],
  },
  {
    id: "parts-seller",
    label: "Parts seller",
    checklistTitle: "Parts contact checklist",
    items: [
      "Confirm part number, compatibility and condition before responding",
      "Keep supplier invoices and brand verification documents accessible",
      "Avoid making unsupported brand-owner claims",
      "Provide clear return and warranty terms upfront",
    ],
  },
];

type BeforeYouTalkToBuyersSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  situations?: SellerSituation[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function BeforeYouTalkToBuyersSection({
  id = "before-you-talk",
  eyebrow = "Your situation",
  title = "Before you talk to buyers",
  description = "Choose how you sell. The examples change; the safety principles don't.",
  situations = DEFAULT_SITUATIONS,
  imageSrc = "/images/seller/2.png",
  imageAlt = "Sleek luxury dark sedan parked in a professional showroom setting",
  className = "bg-white",
}: BeforeYouTalkToBuyersSectionProps) {
  const [activeId, setActiveId] = useState<string>("private-vehicle");

  const currentSituation =
    situations.find((s) => s.id === activeId) || situations[0];

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* Situation Toggle Pill Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 rounded-2xl p-1.5 border border-slate-200/60 w-fit">
          {situations.map((sit) => {
            const isActive = activeId === sit.id;
            return (
              <button
                key={sit.id}
                type="button"
                onClick={() => setActiveId(sit.id)}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-[#0B1220] text-white shadow-xs"
                    : "text-slate-600 hover:text-ink hover:bg-white/60"
                }`}
              >
                {sit.label}
              </button>
            );
          })}
        </div>

        {/* Content Split Grid */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Luxury Car Image (/images/seller/2.png) */}
          <Reveal direction="zoom" delay={100} className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-sm">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Right Column: Dynamic Checklist Box */}
          <Reveal delay={180} className="lg:col-span-6">
            <div className="">
              <h3 className="text-base font-bold text-ink sm:text-lg">
                {currentSituation.checklistTitle}
              </h3>

              <div className="mt-6 space-y-4">
                {currentSituation.items.map((itemText, index) => (
                  <div key={index} className="flex items-start gap-1.5">
                    <span className="grid h-5 w-5 shrink-0 place-items-center text-emerald-700 mt-0.5">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span className="text-xs font-medium text-slate-700 sm:text-sm leading-relaxed">
                      {itemText}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

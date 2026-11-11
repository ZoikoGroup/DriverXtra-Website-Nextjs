"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ChecklistItem = {
  id: string;
  label: string;
};

const DEFAULT_BUYER_CHECKLIST: ChecklistItem[] = [
  {
    id: "budget",
    label: "I've set a budget, including running costs",
  },
  {
    id: "vin-match",
    label: "I've checked the vehicle identification matches",
  },
  {
    id: "ownership-finance",
    label: "I've reviewed ownership and finance status",
  },
  {
    id: "inspection",
    label: "I've inspected or arranged an inspection",
  },
  {
    id: "written-terms",
    label: "I've agreed terms in writing",
  },
  {
    id: "payment-confirmation",
    label: "I've confirmed payment through my own bank",
  },
];

type FirstTimeBuyerChecklistSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  items?: ChecklistItem[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function FirstTimeBuyerChecklistSection({
  id = "first-time-buyer-checklist",
  eyebrow = "First time?",
  title = "First-time buyer checklist",
  description = "An educational checklist — progress here isn't legal compliance. Nothing is saved to an account.",
  items = DEFAULT_BUYER_CHECKLIST,
  imageSrc = "/images/market/3.png",
  imageAlt = "Driver holding steering wheel inside vehicle cockpit during sunset",
  className = "bg-[#F6F8FB]",
}: FirstTimeBuyerChecklistSectionProps) {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleCheck = (itemId: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const checkedCount = Object.values(checkedIds).filter(Boolean).length;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Eyebrow, Title, Description, and Zero-padding Image (6 cols) */}
          <div className="space-y-8 lg:col-span-6">
            <Reveal delay={50}>
              <SectionTitle
                eyebrow={eyebrow}
                title={title}
                description={description}
              />
            </Reveal>

            <Reveal direction="zoom" delay={100}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-xs">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive Checklist Card (6 cols) */}
          <Reveal delay={150} className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              <div className="space-y-3">
                {items.map((item) => {
                  const isChecked = !!checkedIds[item.id];

                  return (
                    <label
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`group flex cursor-pointer items-center gap-3.5 rounded-2xl border p-4 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                        isChecked
                          ? "border-slate-300 bg-slate-50/50 text-ink"
                          : "border-slate-200/80 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {/* Checkbox Box */}
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
                          isChecked
                            ? "border-[#0B1220] bg-[#0B1220] text-white"
                            : "border-slate-300 bg-white group-hover:border-slate-400"
                        }`}
                      >
                        {isChecked && (
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        )}
                      </span>

                      {/* Label Text */}
                      <span>{item.label}</span>
                    </label>
                  );
                })}
              </div>

              {/* Progress Counter + Print Trigger Footer */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-2">
                <span className="text-xs font-medium text-slate-400">
                  {checkedCount} of {items.length} checked · educational, not
                  legal compliance
                </span>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-bold text-ink transition-colors hover:bg-slate-50 shadow-2xs"
                >
                  Print checklist
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

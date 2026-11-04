"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { FileText, RotateCcw } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ChecklistItem = {
  id: string;
  label: string;
};

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  {
    id: "match-person",
    label: "Listing details match what I've seen in person",
  },
  {
    id: "seller-type",
    label: "I know whether I'm buying from a private seller or a dealer",
  },
  {
    id: "documents-reviewed",
    label:
      "I've reviewed ownership and identity documents applicable in my market",
  },
  {
    id: "vin-match",
    label: "The VIN matches across the vehicle, documents and listing",
  },
  {
    id: "independent-inspection",
    label: "I've considered an independent inspection",
  },
  {
    id: "safe-meeting",
    label: "I've planned a safe meeting place and told someone I trust",
  },
  {
    id: "verified-payee",
    label: "I've verified the payee before paying anything",
  },
  {
    id: "keep-records",
    label: "I'm keeping messages and receipts",
  },
];

type QuestionsBeforeYouCommitSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  categoryLabel?: string;
  items?: ChecklistItem[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function QuestionsBeforeYouCommitSection({
  id = "buyer-checklist",
  eyebrow = "Buyer checklist",
  title = "Questions before you commit?",
  description = "Work through this before you pay. No account is needed, and nothing is saved.",
  categoryLabel = "Buying a vehicle",
  items = DEFAULT_CHECKLIST,
  imageSrc = "/images/trust/13.png",
  imageAlt = "Team members collaborating in a modern meeting room with presentation screen",
  className = "bg-white",
}: QuestionsBeforeYouCommitSectionProps) {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});

  const toggleCheck = (itemId: string) => {
    setCheckedState((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleClear = () => {
    setCheckedState({});
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const totalChecked = Object.values(checkedState).filter(Boolean).length;

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Title, Description, and Office Meeting Hero Image */}
          <div className="lg:col-span-5">
            <SectionTitle
              eyebrow={eyebrow}
              title={title}
              description={description}
            />

            <Reveal delay={120} className="mt-8">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-sm">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive Checklist Box */}
          <Reveal delay={180} className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              {/* Category Label */}
              <h3 className="text-xs font-bold text-ink sm:text-sm">
                {categoryLabel}
              </h3>

              {/* Checklist Items */}
              <div className="mt-5 space-y-3">
                {items.map(({ id: itemId, label }) => {
                  const isChecked = Boolean(checkedState[itemId]);

                  return (
                    <label
                      key={itemId}
                      onClick={() => toggleCheck(itemId)}
                      className={`flex cursor-pointer items-center gap-3.5 rounded-2xl border p-4 transition-all duration-200 ${
                        isChecked
                          ? "border-slate-300 bg-slate-50/80 shadow-2xs"
                          : "border-slate-200/80 bg-white hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="h-4 w-4 rounded border-slate-300 text-ink focus:ring-slate-900"
                      />
                      <span className="text-xs font-medium text-slate-700 sm:text-sm">
                        {label}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Footer Summary & Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <p className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-600">
                    {totalChecked} of {items.length} checked
                  </span>{" "}
                  · a guide, not a guarantee
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50"
                  >
                    <FileText className="h-3.5 w-3.5 stroke-[2]" />
                    <span>Print checklist</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClear}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50"
                  >
                    <RotateCcw className="h-3.5 w-3.5 stroke-[2]" />
                    <span>Clear ticks</span>
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

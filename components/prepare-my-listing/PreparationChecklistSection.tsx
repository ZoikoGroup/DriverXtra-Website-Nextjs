import type { ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type PreparationChecklistItem = {
  id: string;
  label: string;
};

const DEFAULT_PREPARATION_ITEMS: PreparationChecklistItem[] = [
  {
    id: "vehicle-identity",
    label: "Make, model, year and trim (VIN optional)",
  },
  {
    id: "odometer-reading",
    label: "Current odometer reading and the date you read it",
  },
  {
    id: "condition-and-history",
    label: "What you know about condition, damage, repairs and modifications",
  },
  {
    id: "ownership-and-finance",
    label:
      "Whether you own the vehicle, have the title or registration document, and any finance on it",
  },
  {
    id: "photos-privacy",
    label:
      "At least four clear photos — with plates, documents and faces kept out",
  },
  {
    id: "asking-price-area",
    label:
      "Your asking price, and a general area for buyers (not your address)",
  },
];

type PreparationChecklistSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  items?: PreparationChecklistItem[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function PreparationChecklistSection({
  id = "preparation-checklist",
  eyebrow = "Before you begin",
  title = "The preparation checklist",
  description = "Have these to hand. Unknown answers are allowed — we'll flag them for review instead of guessing.",
  items = DEFAULT_PREPARATION_ITEMS,
  imageSrc = "/images/market/2.png",
  imageAlt = "Hands signing vehicle paperwork at a desk",
  className = "bg-[#F6F8FB]",
}: PreparationChecklistSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Eyebrow, Title, Description & Checkmark List (6 cols) */}
          <Reveal delay={50} className="lg:col-span-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-5 bg-[#F5B400]" />
                <span className="text-[11px] font-bold tracking-wider text-amber-600 uppercase">
                  {eyebrow}
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                {title}
              </h2>

              {description && (
                <p className="mt-3 max-w-xl text-xs leading-relaxed text-slate-500 sm:text-sm">
                  {description}
                </p>
              )}

              <ul className="mt-6 space-y-3.5 text-xs font-medium text-slate-600 sm:text-sm">
                {items.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 stroke-[2.25]" />
                    <span className="leading-relaxed">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Right Column: Edge-to-Edge Paperwork Image (6 cols) */}
          <Reveal direction="zoom" delay={120} className="lg:col-span-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-xs">
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
      </div>
    </section>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { MapPin, User, Car, FileText } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ViewingCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: "map" | "user" | "car";
};

const DEFAULT_VIEWING_CARDS: ViewingCard[] = [
  {
    id: "choose-the-place",
    title: "Choose the place",
    description:
      "Somewhere you're comfortable with, at a time that suits you. No venue is guaranteed safe.",
    imageSrc: "/images/seller/8.jpg",
    imageAlt: "Person driving a car holding steering wheel with watch",
    icon: "map",
  },
  {
    id: "bring-someone",
    title: "Bring someone",
    description: "A trusted companion, or let someone know where you'll be.",
    imageSrc: "/images/seller/9.jpg",
    imageAlt: "Business presentation meeting in an office workspace",
    icon: "user",
  },
  {
    id: "test-drives",
    title: "Test drives",
    description:
      "Keep the keys until you're in the car. Check your insurer's terms and local rules first.",
    imageSrc: "/images/seller/10.jpg",
    imageAlt: "Rear profile of a black sports car on the road",
    icon: "car",
  },
];

const DEFAULT_CHECKLIST_ITEMS = [
  "I've agreed a place and time I'm comfortable with",
  "Someone knows where I'll be",
  "Documents and spare keys are out of sight",
  "I've checked my insurance for test drives",
  "I'll stop the viewing if I feel unsafe",
];

type PrepareForVehicleViewingsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  cards?: ViewingCard[];
  checklistTitle?: string;
  checklistItems?: string[];
  className?: string;
};

export default function PrepareForVehicleViewingsSection({
  id = "viewings",
  eyebrow = "Viewings",
  title = "Prepare for vehicle viewings and test drives",
  description = "Use practical safeguards appropriate to your situation and local rules. Protect keys, documents and personal details.",
  cards = DEFAULT_VIEWING_CARDS,
  checklistTitle = "Viewing checklist — nothing is saved",
  checklistItems = DEFAULT_CHECKLIST_ITEMS,
  className = "bg-[#F6F8FB]",
}: PrepareForVehicleViewingsSectionProps) {
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});

  const toggleCheck = (index: number) => {
    setCheckedState((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const totalChecked = Object.values(checkedState).filter(Boolean).length;

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3-Column Grid for Viewing Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.id} delay={i * 50}>
              <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
                {/* Zero-padding edge-to-edge image header */}
                <div className="relative aspect-[22/10] w-full overflow-hidden bg-slate-900">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-4 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-2xs">
                    {card.icon === "map" && (
                      <MapPin className="h-4 w-4 stroke-[2]" />
                    )}
                    {card.icon === "user" && (
                      <User className="h-4 w-4 stroke-[2]" />
                    )}
                    {card.icon === "car" && (
                      <Car className="h-4 w-4 stroke-[2]" />
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
            </Reveal>
          ))}
        </div>

        {/* Bottom Interactive Checklist Box */}
        <Reveal delay={200} className="mt-8">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
            <h3 className="text-xs font-bold tracking-wide text-slate-400 uppercase sm:text-sm">
              {checklistTitle}
            </h3>

            <div className="mt-6 space-y-3">
              {checklistItems.map((itemText, index) => {
                const isChecked = Boolean(checkedState[index]);

                return (
                  <label
                    key={index}
                    onClick={() => toggleCheck(index)}
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
                      {itemText}
                    </span>
                  </label>
                );
              })}
            </div>

            <p className="mt-5 text-xs text-slate-400">
              <span className="font-semibold text-slate-600">
                {totalChecked} of {checklistItems.length} ready
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

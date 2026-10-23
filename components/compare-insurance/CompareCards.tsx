"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { compareCards } from "./data";

/** Image cards — tapping one slides its definition up over the photo. */
export default function CompareCards() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {compareCards.map(({ title, image, alt, meaning }, i) => {
        const isOpen = open === title;
        return (
          <Reveal key={title} delay={i * 90} className="h-full">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : title)}
              aria-expanded={isOpen}
              className={`group flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white text-left transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)] ${
                isOpen ? "border-brand shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]" : "border-slate-200 hover:border-brand/60"
              }`}
            >
              <span className="relative block aspect-[235/177] overflow-hidden">
                <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 235px, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                <span
                  className={`absolute inset-0 flex items-end bg-gradient-to-t from-navy via-navy/90 to-navy/40 p-3 transition-all duration-500 ${
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                  }`}
                >
                  <span className="text-[12px] leading-snug text-white">{meaning}</span>
                </span>
              </span>
              <span className="block p-3">
                <span className="block text-[14px] font-bold text-ink">{title}</span>
                <span className="mt-1 inline-flex items-center gap-1 text-[12px] font-semibold text-blue-700">
                  {isOpen ? "Hide meaning" : "What it means"}
                  <Plus className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-45" : "group-hover:rotate-90"}`} />
                </span>
              </span>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}

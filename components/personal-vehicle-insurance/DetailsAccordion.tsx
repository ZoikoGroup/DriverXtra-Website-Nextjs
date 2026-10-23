"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { details } from "./data";

export default function DetailsAccordion() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-2.5">
      {details.map(({ title, text }, i) => {
        const isOpen = open === title;
        return (
          <Reveal key={title} delay={i * 80}>
            <div
              className={`rounded-xl border bg-white transition-all duration-300 ${
                isOpen ? "border-brand/60 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]" : "border-slate-200 hover:border-slate-300 hover:shadow-md"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : title)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
              >
                <span className="text-[13px] font-bold text-ink transition-transform duration-300 group-hover:translate-x-1">{title}</span>
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                    isOpen ? "rotate-45 border-brand bg-brand text-ink" : "border-slate-300 text-ink group-hover:border-ink"
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="mx-4 border-t border-slate-100 pt-3 pb-4 text-[13px] leading-relaxed text-slate-600">{text}</p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

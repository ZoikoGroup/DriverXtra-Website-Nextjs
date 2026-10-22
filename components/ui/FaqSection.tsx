"use client";

import { useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import SectionTitle, { container } from "./SectionTitle";

export type Faq = { q: string; a: ReactNode };

type FaqSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: ReactNode;
  faqs: Faq[];
  className?: string;
};

/** Sticky heading on the left, one-at-a-time accordion on the right. */
export default function FaqSection({ id, eyebrow, title, description, faqs, className = "bg-slate-50" }: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={`${container} grid gap-10 lg:grid-cols-[1fr_2fr]`}>
        <div className="lg:sticky lg:top-40 lg:self-start">
          <SectionTitle eyebrow={eyebrow} title={title} description={description} />
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={q} delay={Math.min(i, 6) * 50}>
                <div className="group">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-ink transition-colors duration-300 hover:text-gold"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">{q}</span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-brand bg-brand text-ink"
                          : "border-slate-300 bg-white text-slate-600 group-hover:border-brand group-hover:text-ink"
                      }`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-400 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p
                        className={`pr-10 pb-5 text-[13px] leading-relaxed text-slate-600 transition-all duration-500 ${
                          isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                        }`}
                      >
                        {a}
                      </p>
                    </div>
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

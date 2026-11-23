"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "./Reveal";
import { container } from "./SectionTitle";

export type SearchableFaq = { question: string; answer: string };

type SearchableFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  faqs: SearchableFaq[];
  className?: string;
};

/** Heading + search box on the left, filtered one-at-a-time accordion on the right. */
export default function SearchableFaqSection({
  id = "faq",
  eyebrow = "FAQ",
  title,
  faqs,
  className = "bg-[#F6F8FB]",
}: SearchableFaqSectionProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(faqs[0]?.question ?? null);

  const q = query.trim().toLowerCase();
  const results = q ? faqs.filter((f) => `${f.question} ${f.answer}`.toLowerCase().includes(q)) : faqs;

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={`${container} grid gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <Reveal>
            <p className="flex items-center gap-3 text-[15px] font-semibold text-slate-600">
              <span className="h-0.5 w-5 bg-brand" />
              {eyebrow}
            </p>
            <h2 className="mt-2 text-3xl leading-tight font-bold tracking-tight text-ink sm:text-[34px]">{title}</h2>
          </Reveal>
          <Reveal delay={150} className="mt-8">
            <label htmlFor={`${id}-search`} className="text-sm font-bold text-ink">
              Search these questions
            </label>
            <input
              id={`${id}-search`}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[15px] text-ink focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
            />
            <p className="mt-2 text-xs text-slate-500" aria-live="polite">
              {results.length} {results.length === 1 ? "question" : "questions"}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          {results.length === 0 ? (
            <p className="py-5 text-[15px] text-slate-600">No questions match &ldquo;{query}&rdquo;.</p>
          ) : (
            <ul className="border-t border-slate-200">
              {results.map((item, i) => {
                const isOpen = open === item.question;
                const panelId = `${id}-panel-${faqs.indexOf(item)}`;
                return (
                  <Reveal as="li" key={item.question} delay={Math.min(i, 6) * 30} className="border-b border-slate-200">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : item.question)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-[15px] font-bold text-ink">{item.question}</span>
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${
                          isOpen ? "bg-brand text-ink" : "border border-slate-200 bg-white text-ink hover:border-slate-400"
                        }`}
                      >
                        {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <p id={panelId} className="pr-12 pb-5 text-[15px] leading-relaxed text-slate-600">
                        {item.answer}
                      </p>
                    )}
                  </Reveal>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

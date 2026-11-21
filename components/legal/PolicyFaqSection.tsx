"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import PolicySection from "./PolicySection";

export type PolicyFaq = { question: string; answer: string };

/** Single-column searchable accordion that fits a policy page's main column. */
export default function PolicyFaqSection({ id = "faq", title, faqs }: { id?: string; title: string; faqs: PolicyFaq[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(faqs[0]?.question ?? null);

  const q = query.trim().toLowerCase();
  const results = q ? faqs.filter((f) => `${f.question} ${f.answer}`.toLowerCase().includes(q)) : faqs;

  return (
    <PolicySection id={id} title={title}>
      <label htmlFor={`${id}-search`} className="text-xs font-semibold text-slate-500">
        Search these questions
      </label>
      <input
        id={`${id}-search`}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-1 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-[15px] text-ink focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
      />
      <p className="mt-2 text-xs text-slate-500" aria-live="polite">
        {results.length} {results.length === 1 ? "question" : "questions"}
      </p>

      {results.length === 0 ? (
        <p className="py-5 text-[15px] text-slate-600">No questions match &ldquo;{query}&rdquo;.</p>
      ) : (
        <ul className="mt-2">
          {results.map((item) => {
            const isOpen = open === item.question;
            const panelId = `${id}-panel-${faqs.indexOf(item)}`;
            return (
              <li key={item.question} className="border-b border-slate-200">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : item.question)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="text-[15px] font-bold text-ink">{item.question}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${
                      isOpen ? "bg-brand text-ink" : "border border-slate-300 bg-white text-ink hover:border-slate-500"
                    }`}
                  >
                    {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && (
                  <p id={panelId} className="pr-12 pb-4 text-[15px] leading-relaxed text-slate-600">
                    {item.answer}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </PolicySection>
  );
}

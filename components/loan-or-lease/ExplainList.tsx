"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import type { ExplainItem } from "./data";

/** Rows with a short summary; the + opens a longer explanation. Several can be open at once. */
export default function ExplainList({ items }: { items: ExplainItem[] }) {
  const [open, setOpen] = useState<string[]>([]);
  const toggle = (title: string) => setOpen((o) => (o.includes(title) ? o.filter((t) => t !== title) : [...o, title]));

  return (
    <ul className="mt-6 space-y-2.5">
      {items.map(({ title, summary, detail }, i) => {
        const isOpen = open.includes(title);
        return (
          <Reveal key={title} as="li" delay={Math.min(i, 6) * 60}>
            <div
              className={`rounded-xl border bg-white transition-all duration-300 ${
                isOpen ? "border-brand shadow-md" : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(title)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
              >
                <span>
                  <span className="block text-sm font-bold text-ink">{title}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">{summary}</span>
                </span>
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                    isOpen ? "rotate-45 border-brand bg-brand text-ink" : "border-slate-300 text-ink group-hover:border-brand"
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-400 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p
                    className={`border-t border-slate-100 px-4 pt-3 pb-4 text-[13px] leading-relaxed text-slate-600 transition-all duration-500 ${
                      isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                    }`}
                  >
                    {detail}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}

"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import PolicySection from "@/components/legal/PolicySection";
import { categories, technologies, type Category } from "./data";

function StatusLabel({ category }: { category: Category }) {
  const count = technologies.filter((t) => t.category === category.id).length;
  const items = `${count} ${count === 1 ? "item" : "items"}`;

  if (category.status === "off") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-slate-500">
        <span className="h-2 w-2 rounded-full border border-slate-400" />
        Not in use
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
      <span className="h-2 w-2 rounded-full bg-emerald-600" />
      {category.status === "always" ? "Always active" : "Active in this prototype"} · {items}
    </span>
  );
}

export default function TechnologyCategoriesSection() {
  const [open, setOpen] = useState<string[]>(["necessary", "functional"]);
  const toggle = (id: string) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  return (
    <PolicySection id="categories" title="Technology categories">
      <ul className="space-y-3">
        {categories.map((c) => {
          const isOpen = open.includes(c.id);
          const panelId = `category-${c.id}`;
          return (
            <li key={c.id} className="rounded-xl border border-slate-200 bg-white">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(c.id)}
                className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 text-left"
              >
                <span className="text-sm font-bold text-ink">{c.name}</span>
                <span className="flex items-center gap-3">
                  <StatusLabel category={c} />
                  <span className="grid h-6 w-6 place-items-center rounded-full border border-slate-300 text-ink">
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </span>
              </button>
              {isOpen && (
                <p id={panelId} className="px-4 pb-3 text-[13px] leading-relaxed text-slate-600">
                  {c.description}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </PolicySection>
  );
}

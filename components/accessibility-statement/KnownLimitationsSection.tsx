"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import PolicySection from "@/components/legal/PolicySection";
import { limitations, type Limitation } from "./data";

function StatusLabel({ item }: { item: Limitation }) {
  if (item.status === "known") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-slate-500">
        <span aria-hidden className="h-2 w-2 rounded-full border border-slate-400" />
        Known behaviour
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-xs font-medium text-gold">
      <span aria-hidden className="h-2 w-2 rounded-full bg-brand-dark" />
      Open{item.identified && ` — identified ${item.identified}`}
    </span>
  );
}

export default function KnownLimitationsSection() {
  const [open, setOpen] = useState<string[]>(limitations.slice(0, 2).map((l) => l.title));
  const toggle = (t: string) => setOpen((o) => (o.includes(t) ? o.filter((x) => x !== t) : [...o, t]));

  return (
    <PolicySection id="limitations" title="Known accessibility limitations">
      <ul className="space-y-3">
        {limitations.map((item, i) => {
          const isOpen = open.includes(item.title);
          const panelId = `limitation-${i}`;
          return (
            <li key={item.title} className={`rounded-xl border bg-white ${isOpen ? "border-ink" : "border-slate-300"}`}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.title)}
                className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 text-left"
              >
                <span className="text-sm font-bold text-ink">{item.title}</span>
                <span className="flex items-center gap-3">
                  <StatusLabel item={item} />
                  <span className="grid h-6 w-6 place-items-center rounded-full border border-slate-300 text-ink">
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </span>
              </button>
              {isOpen && (
                <dl id={panelId} className="grid gap-x-6 gap-y-2 px-4 pb-4 text-sm sm:grid-cols-[150px_1fr]">
                  <dt className="font-bold text-ink">What happens</dt>
                  <dd className="text-slate-600">{item.happens}</dd>
                  <dt className="font-bold text-ink">Where</dt>
                  <dd className="text-slate-600">{item.where}</dd>
                  <dt className="font-bold text-ink">What you can do now</dt>
                  <dd className="text-slate-600">{item.workaround}</dd>
                </dl>
              )}
            </li>
          );
        })}
      </ul>
    </PolicySection>
  );
}

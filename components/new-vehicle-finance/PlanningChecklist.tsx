"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { checklist } from "./data";

/** Tick-off list kept only in component state — nothing is saved. */
export default function PlanningChecklist() {
  const [done, setDone] = useState<number[]>([]);
  const toggle = (i: number) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));

  return (
    <div className="mt-6">
      <ol className="space-y-1">
        {checklist.map((item, i) => {
          const on = done.includes(i);
          return (
            <li key={item}>
              <label className="group flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 text-[14px] transition-colors hover:bg-slate-50">
                <span className="w-4 shrink-0 pt-px text-[13px] font-semibold text-slate-400">{i + 1}.</span>
                <input type="checkbox" checked={on} onChange={() => toggle(i)} className="peer sr-only" />
                <span
                  className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand/50 ${
                    on ? "border-ink bg-ink text-brand" : "border-slate-400 bg-white group-hover:border-ink"
                  }`}
                >
                  {on && <Check className="h-3 w-3 animate-pop" strokeWidth={3} />}
                </span>
                <span className={`transition-colors ${on ? "text-slate-400 line-through" : "text-ink"}`}>{item}</span>
              </label>
            </li>
          );
        })}
      </ol>
      <div className="mt-4 h-1.5 max-w-xs overflow-hidden rounded-full bg-slate-100" aria-hidden>
        <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${(done.length / checklist.length) * 100}%` }} />
      </div>
      <p aria-live="polite" className="mt-2 text-[12px] text-slate-500">
        {done.length === checklist.length ? "All 5 done — nice planning. Nothing is saved." : `${done.length} of ${checklist.length} done — nothing is saved`}
      </p>
    </div>
  );
}

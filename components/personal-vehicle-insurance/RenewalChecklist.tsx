"use client";

import { useState } from "react";
import { Check, PartyPopper } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { renewalChecklist } from "./data";

/** Tick-off list kept in memory only — nothing is saved or sent. */
export default function RenewalChecklist() {
  const [done, setDone] = useState<number[]>([]);
  const toggle = (i: number) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  const complete = done.length === renewalChecklist.length;

  return (
    <div>
      <ul className="space-y-2.5">
        {renewalChecklist.map((item, i) => {
          const checked = done.includes(i);
          return (
            <Reveal key={item} as="li" delay={i * 70}>
              <label
                className={`group flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-[13px] transition-all duration-300 hover:translate-x-1 ${
                  checked ? "border-emerald-200 bg-emerald-50/60 text-slate-500" : "border-slate-200 bg-white text-ink hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <input type="checkbox" checked={checked} onChange={() => toggle(i)} className="peer sr-only" />
                <span
                  className={`grid h-4 w-4 shrink-0 place-items-center rounded border transition-all duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-brand/50 ${
                    checked ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-400 group-hover:border-ink"
                  }`}
                >
                  {checked && <Check className="h-3 w-3 animate-pop" strokeWidth={3} />}
                </span>
                <span className={`transition-colors ${checked ? "line-through decoration-slate-300" : ""}`}>{item}</span>
              </label>
            </Reveal>
          );
        })}
      </ul>

      <div className="mt-4 flex items-center gap-3" aria-live="polite">
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-emerald-500 transition-all duration-500 ease-out" style={{ width: `${(done.length / renewalChecklist.length) * 100}%` }} />
        </div>
        <p className="text-xs text-slate-500">
          <span key={done.length} className="inline-block animate-pop font-semibold text-ink">
            {done.length}
          </span>{" "}
          of {renewalChecklist.length} done
        </p>
        {complete && (
          <span className="inline-flex animate-pop items-center gap-1 text-xs font-semibold text-emerald-600">
            <PartyPopper className="h-3.5 w-3.5" /> Ready to renew
          </span>
        )}
      </div>
    </div>
  );
}

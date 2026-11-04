"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { readinessItems } from "./data";

/** Self-check before requesting access — nothing is saved or scored. */
export default function ReadinessChecklist() {
  const [done, setDone] = useState<Set<number>>(new Set());
  const count = done.size;
  const all = count === readinessItems.length;

  const toggle = (i: number) =>
    setDone((d) => {
      const next = new Set(d);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.35)]">
      <p className="text-[12px] font-bold text-ink">Checklist — nothing is saved or scored</p>
      <ul className="mt-3 space-y-2">
        {readinessItems.map((item, i) => {
          const checked = done.has(i);
          return (
            <li key={item}>
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-[13px] transition-all duration-300 hover:-translate-y-0.5 ${
                  checked ? "border-emerald-300 bg-emerald-50/60 text-ink" : "border-slate-200 text-slate-700 hover:border-slate-400"
                }`}
              >
                <input type="checkbox" checked={checked} onChange={() => toggle(i)} className="peer sr-only" />
                <span
                  className={`grid h-4 w-4 shrink-0 place-items-center rounded border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand/50 ${
                    checked ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-400 bg-white"
                  }`}
                >
                  {checked && <Check className="h-3 w-3 animate-pop" strokeWidth={3} />}
                </span>
                {item}
              </label>
            </li>
          );
        })}
      </ul>
      <div className="mt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${(count / readinessItems.length) * 100}%` }} />
        </div>
        <p className="mt-2 text-xs text-slate-500" aria-live="polite">
          {count} of {readinessItems.length} ready
        </p>
      </div>
      {all && (
        <Link href="#request-access" className="group mt-3 inline-flex animate-fade-up items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-gold">
          You look ready — request technical access
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

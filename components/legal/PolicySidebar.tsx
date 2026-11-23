"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Printer } from "lucide-react";
import { regions, setRegion, type RegionName } from "@/lib/region";

/** `track: false` keeps a link out of the scroll highlight (e.g. a target inside the hero). */
export type TocSection = { id: string; label: string; track?: boolean };

/** Sticky "On this page" navigation with an optional region choice and a print action. */
export default function PolicySidebar({
  sections,
  showRegion = false,
  printLabel = "Print this page",
  heading = "On this page",
}: {
  sections: TocSection[];
  showRegion?: boolean;
  printLabel?: string;
  heading?: string;
}) {
  const [active, setActive] = useState(sections[0]?.id);
  const [region, setLocalRegion] = useState<RegionName | "">("");

  useEffect(() => {
    const els = sections
      .filter((s) => s.track !== false)
      .map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -60% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="print:hidden lg:sticky lg:top-28 lg:self-start">
      <nav aria-label={heading} className="hidden lg:block">
        <p className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">{heading}</p>
        <ul className={`mt-3 space-y-0.5 border-l border-slate-200 ${sections.length ? "" : "hidden"}`}>
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1 pl-3 text-[13px] transition-colors ${
                  active === s.id ? "border-brand font-semibold text-ink" : "border-transparent text-slate-500 hover:text-ink"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="lg:mt-6">
        {showRegion && (
          <div className="mb-4">
            <label htmlFor="policy-region" className="text-[13px] font-bold text-ink">
              Choose your region
            </label>
            <div className="relative mt-2">
              <select
                id="policy-region"
                value={region}
                onChange={(e) => {
                  const next = e.target.value as RegionName;
                  setLocalRegion(next);
                  setRegion(next);
                }}
                className="h-10 w-full appearance-none rounded-lg border border-slate-300 bg-white pr-9 pl-3 text-sm text-ink focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
              >
                <option value="" disabled>
                  Select a region
                </option>
                {regions.map((r) => (
                  <option key={r.code} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
            <p className="mt-2 text-xs text-slate-500">We don&apos;t infer this from your location.</p>
          </div>
        )}

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white text-sm font-semibold text-ink transition-colors hover:border-ink"
        >
          <Printer className="h-4 w-4" />
          {printLabel}
        </button>
      </div>
    </aside>
  );
}

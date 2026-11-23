"use client";

import { useMemo, useState, type ReactNode } from "react";
import { CircleCheck } from "lucide-react";
import { container } from "@/components/ui/SectionTitle";
import PolicySection from "@/components/legal/PolicySection";
import PolicySidebar from "@/components/legal/PolicySidebar";
import { audiences, tocAfter, tocBefore, topics, type Audience } from "./data";

/**
 * Sidebar + main column. The "Show topics for" chips filter the topic sections
 * and their sidebar links; `responsibilities` and `children` always show.
 */
export default function ComplianceBody({ responsibilities, children }: { responsibilities: ReactNode; children: ReactNode }) {
  const [audience, setAudience] = useState<Audience | "everyone">("everyone");

  const visibleTopics = useMemo(
    () => (audience === "everyone" ? topics : topics.filter((t) => t.audiences.includes(audience))),
    [audience],
  );
  const toc = useMemo(
    () => [...tocBefore, ...visibleTopics.map((t) => ({ id: t.id, label: t.title })), ...tocAfter],
    [visibleTopics],
  );

  return (
    <div className={`${container} grid gap-10 py-12 md:py-16 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14`}>
      <PolicySidebar sections={toc} heading="Browse disclosure topics" />
      <div className="max-w-205">
        <fieldset className="mb-8 print:hidden">
          <legend className="text-xs font-semibold text-slate-500">Show topics for</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {audiences.map((a) => {
              const active = audience === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setAudience(a.id)}
                  className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                    active ? "border-navy bg-navy text-white" : "border-slate-300 bg-white text-ink hover:border-ink"
                  }`}
                >
                  {a.label}
                </button>
              );
            })}
          </div>
          <p className="sr-only" aria-live="polite">
            {visibleTopics.length} topics shown
          </p>
        </fieldset>

        {responsibilities}

        {visibleTopics.map((t) => (
          <PolicySection key={t.id} id={t.id} title={t.title}>
            <ul className="-mt-2 space-y-1.5 text-sm leading-relaxed text-slate-600">
              {t.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <CircleCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {p}
                </li>
              ))}
            </ul>
          </PolicySection>
        ))}

        {children}
      </div>
    </div>
  );
}

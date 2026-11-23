"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { prepChecklist } from "./data";

const STORAGE_KEY = "dx:selling-guide:prep-checklist";
const total = prepChecklist.reduce((n, g) => n + g.items.length, 0);

export default function GetCarReadySection() {
  const [done, setDone] = useState<string[]>([]);

  // Load saved ticks after mount so server and client render the same markup.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(saved)) setDone(saved.filter((x) => typeof x === "string"));
    } catch {
      /* storage unavailable — start empty */
    }
  }, []);

  const update = (next: string[]) => {
    setDone(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const toggle = (id: string) => update(done.includes(id) ? done.filter((x) => x !== id) : [...done, id]);
  const pct = Math.round((done.length / total) * 100);

  return (
    <section id="get-ready" className="scroll-mt-28 bg-[#F6F8FB] py-20 md:py-24">
      <div className={`${container} grid items-start gap-10 lg:grid-cols-2`}>
        <div>
          <SectionTitle
            eyebrow="Step 2"
            title="Get the car and paperwork ready"
            description="Your ticks are saved on this device only, so you can come back later."
          />
          <Reveal delay={150} className="mt-8">
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={done.length}
              aria-label="Checklist progress"
              className="h-2.5 overflow-hidden rounded-full bg-slate-200"
            >
              <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-3 text-[15px] font-bold text-ink" aria-live="polite">
              {done.length} of {total} done
            </p>
          </Reveal>
          <Reveal direction="zoom" delay={200} className="mt-6">
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-slate-200">
              <Image
                src="/images/selling-guide/step-paperwork.webp"
                alt="Vehicle documents laid out on a desk"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 sm:p-6">
            {prepChecklist.map((group) => (
              <fieldset key={group.title} className="mb-4 last:mb-0">
                <legend className="mb-2 text-sm font-bold text-ink">{group.title}</legend>
                <div className="space-y-2">
                  {group.items.map((item) => {
                    const checked = done.includes(item.id);
                    return (
                      <label
                        key={item.id}
                        className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-[15px] transition-colors ${
                          checked
                            ? "border-emerald-200 bg-emerald-50 text-slate-500 line-through"
                            : "border-slate-200 text-ink hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(item.id)}
                          className="h-5 w-5 shrink-0 accent-emerald-600"
                        />
                        {item.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}
            <button
              type="button"
              onClick={() => update([])}
              disabled={done.length === 0}
              className="mt-2 h-10 rounded-full border border-slate-300 px-4 text-sm font-semibold text-ink transition-all hover:border-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear my ticks
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

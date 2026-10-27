"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

type ChecklistProps = {
  items: string[];
  image: string;
  imageAlt: string;
};

/** Photo beside a tick-as-you-go list. Nothing is saved — it resets on reload. */
export default function Checklist({ items, image, imageAlt }: ChecklistProps) {
  const [done, setDone] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="mt-8 grid items-center gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-[1fr_1.25fr]">
      <Reveal direction="right">
        <div className="group overflow-hidden rounded-2xl">
          <Image
            src={image}
            alt={imageAlt}
            width={500}
            height={375}
            className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </Reveal>

      <div>
        <ul className="space-y-2">
          {items.map((item, i) => {
            const checked = done.has(i);
            return (
              <Reveal key={item} as="li" delay={i * 70}>
                <label
                  className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-[10px] border px-3.5 py-2.5 text-[14px] leading-snug transition-colors ${
                    checked
                      ? "border-emerald-300 bg-emerald-50 text-slate-500"
                      : "border-slate-200 bg-white text-ink hover:border-ink"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(i)}
                    className="peer sr-only"
                  />
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand/60 ${
                      checked
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-400 bg-white"
                    }`}
                  >
                    {checked && <Check className="h-3.5 w-3.5 animate-pop" />}
                  </span>
                  <span
                    className={
                      checked ? "line-through decoration-slate-400" : ""
                    }
                  >
                    {item}
                  </span>
                </label>
              </Reveal>
            );
          })}
        </ul>
        <p className="mt-3 text-[12px] text-slate-500" aria-live="polite">
          {done.size} of {items.length} done
        </p>
      </div>
    </div>
  );
}

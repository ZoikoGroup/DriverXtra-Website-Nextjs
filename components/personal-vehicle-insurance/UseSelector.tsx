"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Info } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { uses } from "./data";

type UseId = (typeof uses)[number]["id"];

export default function UseSelector() {
  const [selected, setSelected] = useState<UseId | null>(null);
  const choice = uses.find((u) => u.id === selected);

  return (
    <>
      <div role="radiogroup" aria-label="How do you use the vehicle?" className="mt-6 grid gap-4 md:grid-cols-3">
        {uses.map((u, i) => {
          const active = u.id === selected;
          return (
            <Reveal key={u.id} delay={i * 100} className="h-full">
              <button
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSelected(u.id)}
                className={`group relative h-full w-full rounded-xl border p-4 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] ${
                  active ? "border-ink bg-ink text-white shadow-lg" : "border-slate-200 bg-white hover:border-brand/60"
                }`}
              >
                <span
                  className={`absolute top-4 right-4 grid h-5 w-5 place-items-center rounded-full border transition-all duration-300 ${
                    active ? "scale-100 border-brand bg-brand text-ink" : "scale-90 border-slate-300 group-hover:border-ink"
                  }`}
                >
                  {active && <Check className="h-3 w-3 animate-pop" />}
                </span>
                <span className={`block pr-8 text-[14px] font-bold ${active ? "text-white" : "text-ink"}`}>{u.title}</span>
                <span className={`mt-3 block text-[12px] leading-relaxed ${active ? "text-slate-300" : "text-slate-500"}`}>{u.text}</span>
              </button>
            </Reveal>
          );
        })}
      </div>

      {choice && (
        <div key={choice.id} className="mt-4 flex animate-fade-up flex-wrap items-start gap-3 rounded-xl bg-slate-50 p-4 text-[13px] leading-relaxed text-slate-600">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p className="flex-1">{choice.note}</p>
          {choice.id === "business" && (
            <Link
              href="/commercial-and-fleet-insurance"
              className="group inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-4 hover:text-gold"
            >
              Commercial &amp; Fleet Insurance <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      )}
    </>
  );
}

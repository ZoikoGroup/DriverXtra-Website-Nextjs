"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Truck, Car } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { businessOptions, type BusinessOptionId } from "./data";

const icons = { single: Car, fleet: Truck };

export default function BusinessTypeSelector() {
  const [selected, setSelected] = useState<BusinessOptionId>("single");
  const choice = businessOptions.find((o) => o.id === selected)!;

  return (
    <>
      <div role="radiogroup" aria-label="One vehicle or a fleet?" className="mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">
        {businessOptions.map((o, i) => {
          const active = o.id === selected;
          const Icon = icons[o.id];
          return (
            <Reveal key={o.id} delay={i * 100} className="h-full">
              <button
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSelected(o.id)}
                className={`group h-full w-full rounded-xl border p-4 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] ${
                  active ? "border-brand bg-brand-light/40 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]" : "border-slate-200 bg-white hover:border-brand/60"
                }`}
              >
                <span className="flex items-center justify-between">
                  <Icon className="h-4 w-4 text-brand-dark transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12" />
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full border transition-all duration-300 ${
                      active ? "border-brand bg-brand text-ink" : "border-slate-300 group-hover:border-ink"
                    }`}
                  >
                    {active && <Check className="h-3 w-3 animate-pop" />}
                  </span>
                </span>
                <span className="mt-2 block text-[14px] font-bold text-ink">{o.title}</span>
                <span className="mt-1 block text-[12px] text-slate-500">{o.text}</span>
              </button>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-4 grid items-center gap-8 lg:grid-cols-[1fr_1.15fr]">
        <Reveal direction="right">
          <div className="group overflow-hidden rounded-2xl">
            <Image
              src="/images/commercial-and-fleet-insurance/your-business.webp"
              alt="Water droplets on glass in teal and orange light"
              width={500}
              height={375}
              className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </Reveal>
        <div key={choice.id} className="animate-fade-up" aria-live="polite">
          <h3 className="text-[15px] font-bold text-ink">{choice.detailTitle}</h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">{choice.detail}</p>
          <ul className="mt-3 space-y-2.5">
            {choice.points.map((p, i) => (
              <li key={p} className="flex animate-fade-up gap-2.5 text-[13px] text-ink" style={{ animationDelay: `${120 + i * 70}ms` }}>
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

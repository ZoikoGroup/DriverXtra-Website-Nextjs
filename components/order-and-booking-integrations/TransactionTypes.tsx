"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, TriangleAlert } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { transactionTypes, type TransactionType } from "./data";

/** Switches the lifecycle, prerequisites and exception paths between orders and bookings. */
export default function TransactionTypes() {
  const [type, setType] = useState<TransactionType>("order");
  const t = transactionTypes[type];

  return (
    <>
      <Reveal delay={100}>
        <div role="tablist" aria-label="Transaction type" className="mt-6 inline-flex rounded-full border border-slate-200 bg-white p-1">
          {(Object.keys(transactionTypes) as TransactionType[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={type === key}
              onClick={() => setType(key)}
              className={`h-9 rounded-full px-5 text-sm font-semibold transition-all duration-300 ${
                type === key ? "bg-ink text-brand shadow-md" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
              }`}
            >
              {transactionTypes[key].label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
        <Reveal direction="right">
          <div className="group relative aspect-[268/182] overflow-hidden rounded-2xl">
            <Image
              src="/images/order-and-booking-integrations/transaction-types.png"
              alt="Water droplets on glass in blue and orange light"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </Reveal>
        <div key={type}>
          <p className="animate-fade-up text-[13px] leading-relaxed text-slate-600">{t.intro}</p>
          <ol className="mt-3 space-y-2">
            {t.steps.map(({ title, text }, i) => (
              <li
                key={title}
                className="group flex animate-fade-up items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-md"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-bold text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-ink">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-[13px] font-bold text-ink">{title}</span>
                  <span className="block text-[12px] text-slate-600">{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div key={`${type}-notes`} className="mt-8 grid gap-5 lg:grid-cols-2">
        <article className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]">
          <h3 className="text-[15px] font-bold text-ink">Prerequisites</h3>
          <ul className="mt-3 space-y-2">
            {t.prerequisites.map((p) => (
              <li key={p} className="flex items-start gap-2 text-[13px] text-slate-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {p}
              </li>
            ))}
          </ul>
        </article>
        <article
          className="animate-fade-up rounded-2xl border border-brand bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(232,172,0,0.6)]"
          style={{ animationDelay: "100ms" }}
        >
          <h3 className="text-[15px] font-bold text-ink">Exception paths</h3>
          <ul className="mt-3 space-y-2">
            {t.exceptions.map((e) => (
              <li key={e} className="flex items-start gap-2 text-[13px] text-slate-700">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {e}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </>
  );
}

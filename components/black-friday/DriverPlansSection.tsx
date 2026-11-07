"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { OFFER_MONTHS, OFFER_PERCENT, PLAN_CATEGORIES, PLANS, type Plan, type PlanCategory } from "./data";

type Billing = "monthly" | "annually";

function PlanCard({ plan, billing, showOffer }: { plan: Plan; billing: Billing; showOffer: boolean }) {
  const annual = billing === "annually";
  const price = annual ? plan.price * 12 : plan.price;

  return (
    <div
      className={`flex h-full flex-col rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 ${
        plan.featured
          ? "border-[3px] border-[#fcd116] shadow-[0_24px_48px_-20px_rgba(252,209,22,0.35)]"
          : "border-[3px] border-white hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.5)]"
      }`}
    >
      <h3 className="bf-display text-xl font-extrabold text-[#13243c]">{plan.name}</h3>
      <p className="mt-0.5 text-[15px] text-slate-500">{plan.tagline}</p>

      <p className="mt-3 flex items-baseline gap-1.5 text-[#13243c]">
        <span className="bf-display text-4xl font-extrabold">${price}</span>
        <span className="text-[15px] text-slate-500">/{annual ? "yr" : "mo"}</span>
      </p>
      <p className="text-[13px] text-slate-500">Billed {billing}, plus taxes &amp; fees</p>

      {showOffer && (
        <div className="mt-3 flex animate-fade-up items-center gap-3 rounded-lg border border-dashed border-[#d6a800] bg-[#fff6cc] p-2.5">
          <span className="bf-display rounded-md bg-[#fcd116] px-2 py-1 text-lg font-extrabold text-[#13243c] italic">
            {OFFER_PERCENT}%
          </span>
          <span className="text-[13px] leading-snug text-[#13243c]">
            Off eligible charges for the first {OFFER_MONTHS} months, then ${plan.price}/mo
          </span>
        </div>
      )}

      <div className="mt-3 rounded-xl bg-[#e8f1ef] px-4 py-4 text-center">
        <p className="bf-display text-2xl font-extrabold text-[#1f5c4c]">{plan.dataGb} GB</p>
        <p className="text-[15px] font-bold text-[#1f5c4c]">high-speed data</p>
        <p className="mt-0.5 text-[13px] text-slate-500">Unlimited 2G data thereafter</p>
      </div>

      <ul className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-[15px] text-[#13243c]">
        {[{ label: `${plan.hotspotGb} GB mobile hotspot` }, ...plan.features].map((f) => (
          <li key={f.label} className="flex gap-2.5">
            <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[#2f8a7e]" strokeWidth={3} />
            <span>
              {f.label}
              {"note" in f && f.note && <span className="block text-[13px] text-slate-500">{f.note}</span>}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Link
          href="#offer-conditions"
          className={`group flex h-12 items-center justify-between rounded-full pr-1.5 pl-5 text-[15px] font-bold transition-all hover:-translate-y-0.5 ${
            plan.featured
              ? "bg-[#fcd116] text-[#13243c] hover:shadow-[0_10px_24px_-8px_rgba(252,209,22,0.8)]"
              : "bg-[#1f5c4c] text-white hover:bg-[#184a3d]"
          }`}
        >
          Choose {plan.short}
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#13243c]">
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
          </span>
        </Link>
        <Link
          href="#features"
          className="mt-2 block text-center text-[15px] font-bold text-[#13243c] underline underline-offset-4 hover:text-[#1f5c4c]"
        >
          View plan details
        </Link>
      </div>
    </div>
  );
}

export default function DriverPlansSection() {
  const [category, setCategory] = useState<PlanCategory>("Prepaid");
  const [billing, setBilling] = useState<Billing>("monthly");
  const [showOffer, setShowOffer] = useState(true);

  return (
    <section id="plans" className="scroll-mt-20 bg-[#13243c] py-20 md:py-24">
      <div className={container}>
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
            <h2 className="bf-display shrink-0 text-3xl font-extrabold whitespace-nowrap text-white sm:text-4xl">
              Driver plans
            </h2>
            {/* One line always; scrolls sideways on narrow screens instead of wrapping */}
            <div
              role="tablist"
              aria-label="Plan type"
              className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {PLAN_CATEGORIES.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={category === c}
                  onClick={() => setCategory(c)}
                  className={`h-10 shrink-0 rounded-full px-4 text-[14px] font-bold whitespace-nowrap transition-colors ${
                    category === c
                      ? "bg-[#fcd116] text-[#13243c]"
                      : "border border-white/15 bg-[#0d1829] text-white hover:border-white/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-5">
            <div role="radiogroup" aria-label="Billing period" className="flex shrink-0 rounded-full border border-white/15 bg-[#0d1829] p-1">
              {(["monthly", "annually"] as const).map((b) => (
                <button
                  key={b}
                  role="radio"
                  aria-checked={billing === b}
                  onClick={() => setBilling(b)}
                  className={`h-9 rounded-full px-4 text-[14px] font-semibold whitespace-nowrap capitalize transition-colors ${
                    billing === b ? "bg-white text-[#13243c]" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
            <label className="flex shrink-0 cursor-pointer items-center gap-3 text-[14px] whitespace-nowrap text-slate-300">
              <input
                type="checkbox"
                role="switch"
                checked={showOffer}
                onChange={(e) => setShowOffer(e.target.checked)}
                className="peer sr-only"
              />
              <span
                className={`relative h-6 w-11 rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#fcd116] ${
                  showOffer ? "bg-[#2f8a7e]" : "bg-slate-600"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-[#fcd116] shadow transition-[left] ${
                    showOffer ? "left-6" : "left-1"
                  }`}
                />
              </span>
              Proposed offer
            </label>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {PLANS.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 80} className="h-full">
                <PlanCard plan={plan} billing={billing} showOffer={showOffer} />
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}

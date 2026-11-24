"use client";

import { Globe } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import RegionPicker from "@/components/ui/RegionPicker";
import { Eyebrow, container } from "@/components/ui/SectionTitle";
import { useRegion } from "@/lib/region";
import { regionCurrency } from "./data";

export default function BudgetHeroSection() {
  const region = useRegion();

  return (
    <section id="by-monthly-budget" className="bg-navy py-12 text-white md:py-16">
      <div className={container}>
        <Reveal>
          <Eyebrow dark>BROWSE BY NEED</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">By Monthly Budget</h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
            Start with an amount you would like to spend each month. See available vehicles and the assumptions behind
            any payment illustration.
          </p>
        </Reveal>
        <Reveal delay={300} className="mt-6">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-slate-300">
            <Globe aria-hidden className="h-4 w-4 text-slate-300" />
            <span>
              Shopping in <strong className="font-semibold text-white">{region}</strong>
            </span>
            <span aria-hidden>·</span>
            <span>
              Prices shown in <strong className="font-semibold text-white">{regionCurrency[region].code}</strong>
            </span>
            <span aria-hidden>·</span>
            <RegionPicker label="Change" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

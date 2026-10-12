"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "./SectionTitle";

const stages = [
  {
    name: "Discover",
    summary: "Make fragmented supply searchable and comparable.",
    examples: ["Vehicle search", "Brand pages", "Parts discovery", "Provider discovery"],
  },
  {
    name: "Evaluate",
    summary: "Compare with context, history and verified information.",
    examples: ["Vehicle history", "Fitment checks", "Price context", "Independent inspections"],
  },
  {
    name: "Acquire",
    summary: "Transact through governed, transparent workflows.",
    examples: ["Offers & counteroffers", "Finance comparison", "Insurance comparison", "Secure payments"],
  },
  {
    name: "Own",
    summary: "Keep ownership records and tools in one place.",
    examples: ["My Garage", "Documents", "Insurance renewals", "Recall reminders"],
  },
  {
    name: "Operate",
    summary: "Maintain, repair and run vehicles efficiently.",
    examples: ["Service booking", "Parts ordering", "Roadside support", "Fleet operations"],
  },
  {
    name: "Upgrade",
    summary: "Improve and personalize with compatible products.",
    examples: ["Performance parts", "Accessories", "EV charging", "Tires & wheels"],
  },
  {
    name: "Exit",
    summary: "Sell, trade in or dispose with confidence.",
    examples: ["Valuation", "Instant offer", "Trade-in", "Fleet disposition"],
  },
];

export default function Lifecycle() {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  const progress = (active / (stages.length - 1)) * 100;

  return (
    <section className="bg-white py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="The full vehicle lifecycle"
          title="Built around the whole life of a vehicle"
          description="Select a stage to see what DriverXtra does there."
        />

        <Reveal delay={150}>
          <div className="mt-10 rounded-3xl bg-navy p-5 text-white sm:p-8">
            {/* Stepper */}
            <div className="relative overflow-x-auto pb-2">
              <div className="relative min-w-[560px]">
                <div className="absolute top-5 right-[7%] left-[7%] h-0.5 bg-brand/30" />
                <div
                  className="absolute top-5 left-[7%] h-0.5 bg-brand transition-all duration-700 ease-out"
                  style={{ width: `${progress * 0.86}%` }}
                />
                <ol className="relative grid grid-cols-7">
                  {stages.map((s, i) => {
                    const isActive = i === active;
                    const isPast = i < active;
                    return (
                      <li key={s.name} className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => setActive(i)}
                          onMouseEnter={() => setActive(i)}
                          aria-pressed={isActive}
                          className="group flex flex-col items-center gap-2"
                        >
                          <span
                            className={`grid h-10 w-10 place-items-center rounded-full border text-sm font-bold transition-all duration-500 ${
                              isActive
                                ? "scale-110 border-brand bg-brand text-ink shadow-[0_0_0_6px_rgba(255,194,14,0.18)]"
                                : isPast
                                  ? "border-brand bg-navy-700 text-brand"
                                  : "border-white/15 bg-navy-700 text-white group-hover:border-brand group-hover:text-brand"
                            }`}
                          >
                            {i + 1}
                          </span>
                          <span
                            className={`text-xs font-semibold transition-colors duration-300 ${
                              isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                            }`}
                          >
                            {s.name}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            {/* Stage detail */}
            <div
              key={stage.name}
              className="mt-6 grid animate-fade-up gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:grid-cols-2 sm:p-6"
            >
              <div>
                <h3 className="text-xl font-bold">
                  <span className="text-brand">{active + 1}.</span> {stage.name}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{stage.summary}</p>
                <Link
                  href="#"
                  className="group mt-5 inline-flex items-center gap-1.5 border-b-2 border-brand pb-1 text-sm font-semibold text-white"
                >
                  See it in the marketplace
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Examples</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {stage.examples.map((ex, i) => (
                    <span
                      key={ex}
                      className="animate-fade-up rounded-full border border-white/15 bg-navy-700 px-3 py-1.5 text-xs text-slate-200 transition-colors duration-300 hover:border-brand hover:text-brand"
                      style={{ animationDelay: `${100 + i * 60}ms` }}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid items-center gap-4 md:grid-cols-2">
              <p className="text-2xl font-extrabold text-brand sm:text-[26px]">One vehicle. One connected commerce journey.</p>
              <p className="text-sm leading-relaxed text-slate-300">
                DriverXtra is designed to reduce the handoffs between purchase, ownership, maintenance and resale — so
                customers and businesses can move through the vehicle lifecycle with more continuity, visibility and
                trust.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

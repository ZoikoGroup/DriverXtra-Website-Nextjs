"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { regions } from "@/lib/region";
import { shotGroups, vehicleTypes, type VehicleType } from "./data";

export default function ChecklistSection() {
  const ids = useId();
  const [type, setType] = useState<VehicleType>("car");
  const [market, setMarket] = useState("");
  const groups = shotGroups[type];

  return (
    <section id="checklist" className="scroll-mt-28 bg-slate-50 py-16 md:py-20">
      <div className={container}>
        <SectionTitle eyebrow="Checklist" title="Photos buyers find useful" />

        <div className="mt-8 flex flex-wrap items-end gap-4">
          <fieldset className="rounded-2xl border border-slate-200 bg-white px-3 pt-1 pb-3">
            <legend className="px-1 text-xs font-bold text-ink">Vehicle type</legend>
            <div className="flex gap-2">
              {vehicleTypes.map(({ value, label }) => {
                const active = type === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setType(value)}
                    className={`h-10 rounded-full border px-4 text-sm font-semibold transition-colors ${
                      active ? "border-ink bg-ink text-white" : "border-slate-300 bg-white text-ink hover:border-ink"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label htmlFor={`${ids}-market`} className="block text-xs font-bold text-slate-500">
              Market
            </label>
            <div className="relative mt-1.5">
              <select
                id={`${ids}-market`}
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                aria-describedby={`${ids}-market-note`}
                className="h-11 w-56 appearance-none rounded-xl border border-slate-200 bg-white pr-9 pl-3 text-sm text-ink focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
              >
                <option value="">Not selected</option>
                {regions.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
          </div>
        </div>

        <p id={`${ids}-market-note`} aria-live="polite" className="mt-3 text-xs text-slate-500">
          {market
            ? `No confirmed mandatory photos for ${market} — every shot below is recommended. Check local listing rules before publishing.`
            : "Select a market to see whether any photo is required. Until then, every shot is recommended."}
        </p>

        <nav aria-label="Checklist steps" className="mt-6">
          <ol className="flex flex-wrap gap-3">
            {groups.map(({ id, label, shots }, i) => (
              <li key={id}>
                <a
                  href={`#shots-${id}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-ink"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-[11px] font-bold text-brand">{i + 1}</span>
                  {label}
                  <span className="font-medium text-slate-400">{shots.length}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {groups.map(({ id, label, shots }) => (
          <div key={id} id={`shots-${id}`} className="mt-10 scroll-mt-32">
            <h3 className="text-lg font-bold text-ink">{label}</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shots.map(({ title, text, tip, image, alt }, i) => (
                <Reveal as="li" key={`${type}-${title}`} delay={i * 80}>
                  <article className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_32px_-20px_rgba(15,23,42,0.35)]">
                    <div className="relative aspect-[8/5] overflow-hidden bg-slate-200">
                      <Image
                        src={image}
                        alt={alt}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute bottom-3 left-3 rounded-md bg-ink/85 px-2 py-1 text-[11px] font-semibold text-white">
                        Example view — not your vehicle
                      </span>
                    </div>
                    <div className="p-4">
                      <span className="inline-block rounded bg-blue-50 px-1.5 py-0.5 text-[11px] font-semibold text-blue-700">
                        Recommended photo
                      </span>
                      <h4 className="mt-1.5 text-base font-bold text-ink">{title}</h4>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-700">{text}</p>
                      <p className="mt-2 text-[13px] leading-relaxed text-slate-500">{tip}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

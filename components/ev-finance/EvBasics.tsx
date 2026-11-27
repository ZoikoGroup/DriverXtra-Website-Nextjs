"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Info } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ChipGroup from "./ChipGroup";
import { conditionTips, conditions, typeCards, vehicleTypes, type Condition, type VehicleType } from "./data";

/** BEV vs PHEV choice; the matching card is highlighted and shows tailored tips. */
export default function EvBasics() {
  const [type, setType] = useState<VehicleType | null>(null);
  const [condition, setCondition] = useState<Condition | null>(null);

  return (
    <>
      <Reveal delay={150}>
        <div className="mt-6 flex flex-wrap gap-3">
          <ChipGroup legend="Vehicle type" name="ev-type" options={vehicleTypes} value={type} onChange={setType} />
          <ChipGroup legend="New or used" name="ev-condition" options={conditions} value={condition} onChange={setCondition} />
        </div>
      </Reveal>

      <div className="mt-3 grid gap-5 md:grid-cols-2">
        {typeCards.map((c, i) => {
          const selected = type === c.type;
          const dimmed = type !== null && type !== "Not sure" && !selected;
          return (
            <Reveal key={c.type} delay={i * 120} className="h-full">
              <article
                className={`group h-full overflow-hidden rounded-2xl border bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)] ${
                  selected ? "border-brand ring-2 ring-brand/30" : "border-slate-200 hover:border-brand/60"
                } ${dimmed ? "opacity-60 hover:opacity-100" : ""}`}
              >
                <div className="relative aspect-[446/167] overflow-hidden">
                  <Image src={c.image} alt={c.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                  {selected && (
                    <span className="absolute top-3 left-3 inline-flex animate-pop items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-ink">
                      <Check className="h-3 w-3" strokeWidth={3} /> Your choice
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-[15px] font-bold text-ink">{c.type}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{c.text}</p>
                  {selected && (
                    <ul className="mt-3 animate-fade-up space-y-1.5 border-t border-slate-100 pt-3 text-[13px] text-ink">
                      {c.tips.map((t) => (
                        <li key={t} className="flex gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={3} /> {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div aria-live="polite">
        {(condition || type === "Not sure") && (
          <p key={`${type}-${condition}`} className="mt-4 flex animate-fade-up items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] text-ink">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>
              {type === "Not sure" && "Not sure which type? Compare charging access first — it affects a BEV far more than a PHEV. "}
              {condition && conditionTips[condition]}
            </span>
          </p>
        )}
      </div>
    </>
  );
}

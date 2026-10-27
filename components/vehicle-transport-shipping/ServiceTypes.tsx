"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, MapPin, Truck, Warehouse } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { img, serviceTypes, type ServiceTypeId } from "./data";

const icons = { open: Truck, enclosed: Warehouse, pickup: MapPin };

/** Three selectable service types; the details below follow the selection. */
export default function ServiceTypes() {
  const [active, setActive] = useState<ServiceTypeId>("open");
  const current = serviceTypes.find((t) => t.id === active)!;

  return (
    <>
      <Reveal delay={150}>
        <div
          role="tablist"
          aria-label="Service types"
          className="mt-8 grid gap-2.5 sm:grid-cols-3"
        >
          {serviceTypes.map(({ id, title, text }) => {
            const Icon = icons[id];
            const selected = id === active;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="service-type-panel"
                onClick={() => setActive(id)}
                className={`flex min-h-20 flex-col items-start gap-1 rounded-2xl border p-3.5 text-left transition-all duration-300 ${
                  selected
                    ? "border-navy bg-navy text-white"
                    : "border-slate-200 bg-white text-ink hover:-translate-y-0.5 hover:border-brand/60"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${selected ? "text-brand" : "text-brand-dark"}`}
                />
                <span className="text-[15px] font-bold">{title}</span>
                <span
                  className={`text-[12px] ${selected ? "text-slate-300" : "text-slate-500"}`}
                >
                  {text}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div
        id="service-type-panel"
        role="tabpanel"
        className="mt-4 grid items-center gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-[1fr_1.25fr]"
      >
        <Reveal direction="right">
          <div className="group overflow-hidden rounded-2xl">
            <Image
              src={img("service-types.webp")}
              alt="A covered lorry driving along a mountain road"
              width={500}
              height={375}
              className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </Reveal>
        <div key={active} className="animate-fade-up" aria-live="polite">
          <h3 className="text-lg font-bold text-ink">{current.title}</h3>
          <ul className="mt-2 space-y-2">
            {current.points.map((p) => (
              <li
                key={p}
                className="flex gap-2.5 text-[15px] leading-relaxed text-ink"
              >
                <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

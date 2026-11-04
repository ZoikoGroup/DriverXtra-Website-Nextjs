"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { hrefFor } from "@/lib/navigation";
import { healthStyles, serviceGroups, type Health } from "./data";

const DAYS = 90;

export function HealthLabel({ health, className = "" }: { health: Health; className?: string }) {
  const s = healthStyles[health];
  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold ${s.text} ${className}`}>
      <span className={`h-2 w-2 shrink-0 ${s.dot}`} />
      {health}
    </span>
  );
}

/** Services grouped by audience; each row opens to a 90-day history strip. */
export default function ServiceStatus() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
      {serviceGroups.map(({ title, services }, g) => (
        <Reveal key={title} delay={g * 120}>
          <h3 className="text-[13px] font-semibold text-slate-600">{title}</h3>
          <ul className="mt-2 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {services.map(({ name, health, text, incidentDays, link }) => {
              const expanded = open === name;
              const panel = `service-${name.replace(/\W+/g, "-").toLowerCase()}`;
              return (
                <li key={name}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panel}
                    onClick={() => setOpen(expanded ? null : name)}
                    className="group flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-50"
                  >
                    <span className="flex-1 text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{name}</span>
                    <HealthLabel health={health} className="text-[12px]" />
                    <ChevronDown className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
                  </button>
                  <div id={panel} className={`grid transition-all duration-500 ease-out ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4">
                        <p className="text-[13px] text-slate-600">{text}</p>
                        <div aria-hidden className="mt-3 flex h-7 gap-[2px]">
                          {Array.from({ length: DAYS }, (_, i) => DAYS - 1 - i).map((day) => (
                            <span
                              key={day}
                              className={`flex-1 rounded-[2px] transition-transform duration-200 hover:scale-y-110 ${incidentDays.includes(day) ? "bg-amber-500" : "bg-emerald-500"}`}
                            />
                          ))}
                        </div>
                        <p className="mt-1.5 flex justify-between text-[11px] text-slate-500">
                          <span>90 days ago</span>
                          <span>
                            {DAYS - incidentDays.length} of {DAYS} days without a disclosed incident
                          </span>
                          <span>Today</span>
                        </p>
                        {link && (
                          <Link href={hrefFor(link)} className="group/link mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-700 transition-colors hover:text-gold">
                            {link} <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}

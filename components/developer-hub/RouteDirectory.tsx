"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ClipboardCheck, Code, FileText, Gauge, ShieldCheck, Zap } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { hrefFor } from "@/lib/navigation";
import { accessStyles, routes, type Access, type RouteIcon } from "./data";

const icons: Record<RouteIcon, typeof Code> = { code: Code, zap: Zap, clipboard: ClipboardCheck, calendar: CalendarDays, gauge: Gauge, shield: ShieldCheck };

const filters: { id: Access | "all"; label: string }[] = [
  { id: "all", label: "All routes" },
  { id: "public", label: "Public" },
  { id: "partner", label: "Partner access" },
  { id: "pilot", label: "Pilot" },
];

export function AccessLabel({ access }: { access: Access }) {
  const s = accessStyles[access];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

/** The six integration routes, filterable by access level. */
export default function RouteDirectory() {
  const [filter, setFilter] = useState<Access | "all">("all");
  const shown = routes.filter((r) => filter === "all" || r.access === filter);

  return (
    <>
      <Reveal delay={150}>
        <div role="group" aria-label="Filter by access level" className="mt-6 flex flex-wrap gap-2">
          {filters.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                filter === id ? "border-ink bg-ink text-white shadow" : "border-slate-300 bg-white text-ink hover:border-ink"
              }`}
            >
              {label}
              {id !== "all" && <span className="ml-1.5 opacity-60">{routes.filter((r) => r.access === id).length}</span>}
            </button>
          ))}
        </div>
      </Reveal>

      <div key={filter} className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map(({ id, label, text, meta, access, icon, image, alt }, i) => {
          const Icon = icons[icon];
          return (
            <article
              key={id}
              className="group flex animate-fade-up flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[262/112] overflow-hidden">
                <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-brand transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand group-hover:text-ink">
                    <Icon className="h-4 w-4" />
                  </span>
                  <AccessLabel access={access} />
                </div>
                <h3 className="mt-3 text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{label}</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-slate-600">{text}</p>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <FileText className="h-3.5 w-3.5" /> {meta}
                </p>
                <Link
                  href={hrefFor(label)}
                  className="group/link mt-4 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold text-blue-700 transition-colors hover:text-ink"
                >
                  Open {label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

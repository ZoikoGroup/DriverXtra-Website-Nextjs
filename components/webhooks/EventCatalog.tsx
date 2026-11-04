"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Search, SearchX } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { eventFamilies, lifecycleStyles, type Lifecycle } from "./data";

const field = "h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none";

/** Public event summaries with a search box and family / lifecycle filters. */
export default function EventCatalog() {
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [lifecycle, setLifecycle] = useState<"all" | Lifecycle>("all");

  const q = query.trim().toLowerCase();
  const results = eventFamilies
    .filter((f) => family === "all" || f.id === family)
    .map((f) => ({
      ...f,
      events: f.events.filter(
        (e) => (lifecycle === "all" || e.lifecycle === lifecycle) && (!q || `${f.label} ${e.name} ${e.text}`.toLowerCase().includes(q)),
      ),
    }))
    .filter((f) => f.events.length > 0);

  const reset = () => {
    setDraft("");
    setQuery("");
    setFamily("all");
    setLifecycle("all");
  };

  return (
    <div className="mt-6">
      <Reveal>
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(draft);
          }}
          className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 lg:grid-cols-[1.6fr_1fr_1fr_auto] lg:items-end"
        >
          <label className="block">
            <span className="text-[12px] font-semibold text-ink">Search event definitions</span>
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={'Try "listing" or "feed"'} className={`mt-1.5 ${field} placeholder:text-slate-400`} />
          </label>
          <label className="block">
            <span className="text-[12px] font-semibold text-ink">Family</span>
            <span className="relative mt-1.5 block">
              <select value={family} onChange={(e) => setFamily(e.target.value)} className={`${field} cursor-pointer appearance-none pr-9`}>
                <option value="all">All families</option>
                {eventFamilies.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </span>
          </label>
          <label className="block">
            <span className="text-[12px] font-semibold text-ink">Lifecycle</span>
            <span className="relative mt-1.5 block">
              <select value={lifecycle} onChange={(e) => setLifecycle(e.target.value as "all" | Lifecycle)} className={`${field} cursor-pointer appearance-none pr-9`}>
                <option value="all">All</option>
                <option value="Stable">Stable</option>
                <option value="Beta">Beta</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </span>
          </label>
          <button
            type="submit"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-ink"
          >
            <Search className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" /> Search
          </button>
        </form>
      </Reveal>

      {results.length === 0 ? (
        <div className="mt-4 animate-fade-up rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <SearchX className="mx-auto h-6 w-6 text-slate-400" />
          <p className="mt-2 text-sm font-semibold text-ink">No public event matches your search.</p>
          <p className="mt-1 text-[13px] text-slate-500">Restricted families aren&apos;t listed here.</p>
          <button type="button" onClick={reset} className="mt-4 text-sm font-semibold text-blue-700 underline underline-offset-4 transition-colors hover:text-gold">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {results.map((f, i) => (
            <Reveal key={f.id} delay={i * 120} className="h-full">
              <article className="group flex h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <div className="relative hidden w-[30%] shrink-0 overflow-hidden sm:block">
                  <Image src={f.image} alt={f.alt} fill sizes="(min-width: 1024px) 15vw, 30vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                </div>
                <div className="flex-1 p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
                    <h3 className="text-[15px] font-bold text-ink">{f.label}</h3>
                    <span className="flex items-center gap-1.5 text-[13px] font-medium text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Public summary
                    </span>
                  </div>
                  <ul>
                    {f.events.map((e) => {
                      const { dot, text } = lifecycleStyles[e.lifecycle];
                      return (
                        <li key={e.name} className="animate-fade-up border-b border-slate-100 py-2.5 transition-colors last:border-0 hover:bg-brand-light/40">
                          <p className="font-mono text-[12px] font-semibold text-ink">{e.name}</p>
                          <p className="mt-0.5 text-[12px] text-slate-600">{e.text}</p>
                          <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                            {e.version} ·
                            <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                            <span className={text}>{e.lifecycle}</span>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

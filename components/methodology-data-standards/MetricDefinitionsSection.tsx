"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "@/components/press-media/PressHeading";
import { metrics } from "./data";
import EvidenceBadge from "./EvidenceBadge";

export default function MetricDefinitionsSection() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(metrics[0].id);

  const q = query.trim().toLowerCase();
  const results = q
    ? metrics.filter((m) => `${m.name} ${m.category} ${m.description}`.toLowerCase().includes(q))
    : metrics;
  const categories = [...new Set(results.map((m) => m.category))];
  const selected = metrics.find((m) => m.id === selectedId) ?? metrics[0];

  const details = [
    { term: "Units", value: selected.units },
    { term: "Version", value: selected.version },
    { term: "Scope", value: selected.scope },
  ];

  return (
    <section id="metric-definitions" className="scroll-mt-28 bg-[#F6F8FB] py-16 md:py-20">
      <div className={container}>
        <PressHeading eyebrow="Metric definitions" title="Look up a metric" />

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[340px_1fr]">
          <Reveal>
            <label htmlFor="metric-search" className="text-sm font-bold text-ink">
              Search definitions
            </label>
            <input
              id="metric-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. median, index, charging"
              className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[15px] text-ink placeholder:text-slate-400 focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
            />
            <p className="mt-2 text-xs text-slate-500" aria-live="polite">
              {results.length} {results.length === 1 ? "metric" : "metrics"}
            </p>

            {categories.map((cat) => (
              <div key={cat} className="mt-4">
                <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase">{cat}</h3>
                <ul className="mt-2 space-y-1.5">
                  {results
                    .filter((m) => m.category === cat)
                    .map((m) => {
                      const active = m.id === selected.id;
                      return (
                        <li key={m.id}>
                          <button
                            type="button"
                            aria-pressed={active}
                            onClick={() => setSelectedId(m.id)}
                            className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-xl bg-white px-3 py-2.5 text-left transition-colors ${
                              active ? "border-2 border-ink" : "border border-slate-200 hover:border-slate-400"
                            }`}
                          >
                            <span className="text-[15px] font-semibold text-ink">{m.name}</span>
                            <EvidenceBadge evidence={m.evidence} className="text-xs font-semibold" />
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </Reveal>

          <Reveal delay={100} className="lg:sticky lg:top-32">
            <article aria-live="polite" className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
              <p className="text-xs font-bold tracking-wider text-amber-500 uppercase">{selected.category}</p>
              <h3 className="mt-2 text-xl font-bold text-ink">{selected.name}</h3>
              <div className="mt-2">
                <EvidenceBadge evidence={selected.evidence} className="text-base" />
              </div>
              <p className="mt-3 text-[15px] text-ink">{selected.description}</p>
              <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-[160px_1fr]">
                <dt className="text-[15px] font-bold text-ink">Formula</dt>
                <dd className="max-w-[520px] rounded-lg bg-slate-50 px-2.5 py-2 text-sm leading-relaxed text-slate-700">
                  {selected.formula}
                </dd>
                {details.map((d) => (
                  <div key={d.term} className="contents">
                    <dt className="text-[15px] font-bold text-ink">{d.term}</dt>
                    <dd className="text-[15px] text-slate-600">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

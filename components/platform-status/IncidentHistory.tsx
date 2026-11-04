"use client";

import { useState } from "react";
import { ChevronDown, SearchX } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { allServices, healthStyles, incidents, type Health } from "./data";
import { HealthLabel } from "./ServiceStatus";

const field = "h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none";
const severities = (Object.keys(healthStyles) as Health[]).filter((h) => h !== "Operational");

/** Disclosed incident records with search, service and severity filters. */
export default function IncidentHistory() {
  const [draft, setDraft] = useState({ query: "", service: "all", severity: "all" });
  const [filters, setFilters] = useState(draft);

  const q = filters.query.trim().toLowerCase();
  const rows = incidents.filter(
    (i) =>
      (filters.service === "all" || i.service === filters.service) &&
      (filters.severity === "all" || i.severity === filters.severity) &&
      (!q || `${i.ref} ${i.title}`.toLowerCase().includes(q)),
  );

  const reset = () => {
    const empty = { query: "", service: "all", severity: "all" };
    setDraft(empty);
    setFilters(empty);
  };

  return (
    <div className="mt-6">
      <Reveal>
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            setFilters(draft);
          }}
          className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 lg:grid-cols-[1.6fr_1fr_1fr_auto] lg:items-end"
        >
          <label className="block">
            <span className="text-[12px] font-semibold text-ink">Search incidents</span>
            <input
              value={draft.query}
              onChange={(e) => setDraft({ ...draft, query: e.target.value })}
              placeholder="Title or reference"
              className={`mt-1.5 ${field} placeholder:text-slate-400`}
            />
          </label>
          <label className="block">
            <span className="text-[12px] font-semibold text-ink">Service</span>
            <span className="relative mt-1.5 block">
              <select value={draft.service} onChange={(e) => setDraft({ ...draft, service: e.target.value })} className={`${field} cursor-pointer appearance-none pr-9`}>
                <option value="all">All services</option>
                {allServices.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </span>
          </label>
          <label className="block">
            <span className="text-[12px] font-semibold text-ink">Severity</span>
            <span className="relative mt-1.5 block">
              <select value={draft.severity} onChange={(e) => setDraft({ ...draft, severity: e.target.value })} className={`${field} cursor-pointer appearance-none pr-9`}>
                <option value="all">All</option>
                {severities.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </span>
          </label>
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-ink"
          >
            Filter
          </button>
        </form>
      </Reveal>

      <Reveal delay={150}>
        <p aria-live="polite" className="mt-4 text-[12px] text-slate-500">
          {rows.length} {rows.length === 1 ? "record" : "records"}
        </p>
        {rows.length === 0 ? (
          <div className="mt-2 animate-fade-up rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <SearchX className="mx-auto h-6 w-6 text-slate-400" />
            <p className="mt-2 text-sm font-semibold text-ink">No disclosed records match these filters.</p>
            <button type="button" onClick={reset} className="mt-3 text-sm font-semibold text-blue-700 underline underline-offset-4 transition-colors hover:text-gold">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  {["Reference", "Title", "Service", "Severity", "Date", "Outcome"].map((h) => (
                    <th key={h} className="px-2 py-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((i) => (
                  <tr key={i.ref} className="animate-fade-up border-b border-slate-200 transition-colors hover:bg-brand-light/50">
                    <th scope="row" className="px-2 py-3 font-semibold text-slate-600">
                      {i.ref}
                    </th>
                    <td className="max-w-[160px] px-2 py-3 text-ink">{i.title}</td>
                    <td className="px-2 py-3 text-ink">{i.service}</td>
                    <td className="px-2 py-3">
                      <HealthLabel health={i.severity} className="text-[12px]" />
                    </td>
                    <td className="px-2 py-3 text-ink">{i.date}</td>
                    <td className="px-2 py-3 text-ink">{i.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Reveal>
    </div>
  );
}

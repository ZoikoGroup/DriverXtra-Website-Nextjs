"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PolicySection from "@/components/legal/PolicySection";
import { categories, categoryName, technologies, type CategoryId } from "./data";

const columns = ["Name", "Category", "Type", "Provider", "Purpose", "How long it is stored"];

export default function TechnologiesTableSection() {
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const rows = filter === "all" ? technologies : technologies.filter((t) => t.category === filter);

  return (
    <PolicySection id="technologies" title="Technologies and providers">
      <label htmlFor="technology-filter" className="text-xs font-semibold text-slate-500">
        Show
      </label>
      <div className="relative mt-1 w-full max-w-[240px]">
        <select
          id="technology-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value as CategoryId | "all")}
          className="h-10 w-full appearance-none rounded-lg border border-slate-300 bg-white pr-9 pl-3 text-sm text-ink focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>
      <p className="mt-3 text-xs text-slate-500" aria-live="polite">
        {rows.length} {rows.length === 1 ? "technology" : "technologies"} listed
      </p>

      {rows.length === 0 ? (
        <p className="mt-4 rounded-xl bg-[#F6F8FB] px-4 py-5 text-sm text-slate-600">
          Nothing in this category is used in this prototype.
        </p>
      ) : (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-[13px]">
            <caption className="sr-only">Technologies used on DriverXtra</caption>
            <thead>
              <tr className="border-b-2 border-ink">
                {columns.map((c) => (
                  <th key={c} scope="col" className="px-2 py-2.5 align-bottom font-semibold text-ink">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.name} className="border-b border-slate-200 align-top">
                  <th scope="row" className="w-[16%] px-2 py-3 font-semibold text-ink">
                    {t.name}
                  </th>
                  <td className="px-2 py-3 text-slate-600">{categoryName[t.category]}</td>
                  <td className="px-2 py-3 text-slate-600">{t.type}</td>
                  <td className="px-2 py-3 text-slate-600">{t.provider}</td>
                  <td className="px-2 py-3 text-slate-600">{t.purpose}</td>
                  <td className="px-2 py-3 text-slate-600">{t.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PolicySection>
  );
}

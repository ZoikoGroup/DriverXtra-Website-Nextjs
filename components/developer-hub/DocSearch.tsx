"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, FileText, Search } from "lucide-react";
import { hrefFor } from "@/lib/navigation";
import { docCategories, docs } from "./data";

/** Searches public documentation only — restricted content is never in the index. */
export default function DocSearch() {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState<{ q: string; category: string } | null>(null);

  const results = submitted
    ? docs.filter((d) => {
        const q = submitted.q.trim().toLowerCase();
        return (!submitted.category || d.category === submitted.category) && (!q || `${d.title} ${d.snippet}`.toLowerCase().includes(q));
      })
    : [];

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted({ q: input, category });
        }}
        className="grid items-end gap-3 md:grid-cols-[2fr_1.2fr_auto]"
      >
        <div>
          <label htmlFor="doc-search" className="text-[12px] font-semibold text-ink">
            Search documentation
          </label>
          <span className="relative mt-1.5 flex items-center">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
            <input
              id="doc-search"
              type="search"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (!e.target.value) setSubmitted(null);
              }}
              placeholder='Try "errors", "versioning" or "feed"'
              className="h-11 w-full rounded-lg border border-slate-300 bg-white pr-3 pl-9 text-sm text-ink transition-colors placeholder:text-slate-400 hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
            />
          </span>
        </div>
        <div>
          <label htmlFor="doc-category" className="text-[12px] font-semibold text-ink">
            Category
          </label>
          <span className="relative mt-1.5 block">
            <select
              id="doc-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white pr-9 pl-3 text-sm text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
            >
              <option value="">All categories</option>
              {docCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </span>
        </div>
        <button type="submit" className="btn-shine h-11 rounded-full bg-ink px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
          Search
        </button>
      </form>

      {submitted && (
        <div className="mt-5 border-t border-slate-100 pt-4" aria-live="polite">
          <p className="text-xs text-slate-500">
            <span key={results.length} className="inline-block animate-pop font-semibold text-ink">
              {results.length}
            </span>{" "}
            public {results.length === 1 ? "result" : "results"}
            {submitted.q.trim() && <> for “{submitted.q.trim()}”</>}
            {submitted.category && <> in {submitted.category}</>}
          </p>
          {results.length === 0 ? (
            <p className="mt-3 animate-fade-up text-sm text-slate-600">No public documentation matches. Try a broader term or another category.</p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100">
              {results.map((d, i) => (
                <li key={d.title} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <Link href={hrefFor(d.route)} className="group flex items-start gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-slate-50">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span className="flex-1">
                      <span className="block text-[14px] font-semibold text-ink transition-colors group-hover:text-gold">{d.title}</span>
                      <span className="mt-0.5 block text-[13px] text-slate-600">{d.snippet}</span>
                      <span className="mt-1 block text-[11px] text-slate-400">
                        {d.category} · {d.route}
                      </span>
                    </span>
                    <ArrowRight className="mt-1 h-4 w-4 -translate-x-1 text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

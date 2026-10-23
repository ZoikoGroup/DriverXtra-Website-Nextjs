"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Search } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { topics } from "./data";

export default function DisclosureTopics() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string[]>([]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return topics;
    return topics.filter((t) => [t.title, t.summary, ...t.details].some((s) => s.toLowerCase().includes(q)));
  }, [query]);

  const toggle = (id: string) => setOpen((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  // Pills jump to a topic and open it.
  const jumpTo = (id: string) => {
    setQuery("");
    setInput("");
    setOpen((ids) => (ids.includes(id) ? ids : [...ids, id]));
    requestAnimationFrame(() => document.getElementById(`topic-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }));
  };

  return (
    <section id="disclosure-topics" className="scroll-mt-28 bg-white pb-16">
      <div className={container}>
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Explore finance disclosures by topic.</h2>
        </Reveal>

        <Reveal delay={100}>
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(input);
            }}
            className="mt-5"
          >
            <label htmlFor="disclosure-search" className="text-[13px] font-semibold text-ink">
              Search finance topics
            </label>
            <div className="mt-1.5 flex max-w-md gap-2">
              <span className="relative flex flex-1 items-center">
                <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
                <input
                  id="disclosure-search"
                  type="search"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (!e.target.value) setQuery("");
                  }}
                  placeholder="e.g. APR, mileage, credit check"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white pr-3 pl-9 text-sm text-ink transition-colors placeholder:text-slate-400 hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
                />
              </span>
              <button type="submit" className="btn-shine h-11 rounded-lg bg-ink px-5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
                Search
              </button>
            </div>
          </form>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-4 flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => jumpTo(t.id)}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white"
              >
                {t.title}
              </button>
            ))}
          </div>
        </Reveal>

        {query && (
          <p className="mt-4 animate-fade-up text-xs text-slate-500" aria-live="polite">
            <span className="font-semibold text-ink">{results.length}</span> {results.length === 1 ? "topic" : "topics"} for “{query}” ·{" "}
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setInput("");
              }}
              className="font-semibold text-ink underline underline-offset-4 hover:text-gold"
            >
              Show all
            </button>
          </p>
        )}

        {results.length === 0 ? (
          <p className="mt-4 animate-fade-up rounded-2xl border border-dashed border-slate-300 px-6 py-10 text-center text-sm text-slate-500">
            No topics match “{query}”. Try a different word, such as fees or lease.
          </p>
        ) : (
          <div key={query} className="mt-4 space-y-3">
            {results.map((t, i) => {
              const isOpen = open.includes(t.id);
              return (
                <Reveal key={t.id} delay={i * 70}>
                  <div
                    id={`topic-${t.id}`}
                    className={`scroll-mt-28 rounded-xl border bg-white transition-all duration-300 ${
                      isOpen ? "border-brand/60 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]" : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    <button type="button" onClick={() => toggle(t.id)} aria-expanded={isOpen} className="group flex w-full items-center gap-4 p-4 text-left">
                      <span className="flex-1">
                        <span className="block text-[15px] font-bold text-ink">{t.title}</span>
                        <span className="mt-1 block text-[13px] leading-relaxed text-slate-600">{t.summary}</span>
                      </span>
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          isOpen ? "rotate-45 border-brand bg-brand text-ink" : "border-slate-300 text-ink group-hover:border-ink"
                        }`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </span>
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <div className="mx-4 border-t border-slate-100 pt-3 pb-4">
                          <ul className="space-y-2">
                            {t.details.map((d) => (
                              <li key={d} className="flex gap-2 text-[13px] leading-relaxed text-slate-600">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                {d}
                              </li>
                            ))}
                          </ul>
                          {t.related && (
                            <Link href={t.related.href} className="group/link mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-ink underline underline-offset-4 hover:text-gold">
                              {t.related.label} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { answers, helpTopics, type HelpTopicId } from "./data";

export const TOPIC_EVENT = "insurance-help:topic";

/** Topic pills + search over the help answers. The issue router can select a topic via TOPIC_EVENT. */
export default function HelpTopics({ initialTopic }: { initialTopic?: HelpTopicId }) {
  const [topic, setTopic] = useState<HelpTopicId | null>(initialTopic ?? null);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => setTopic(initialTopic ?? null), [initialTopic]);

  useEffect(() => {
    const onTopic = (e: Event) => {
      setTopic((e as CustomEvent<HelpTopicId>).detail);
      setQuery("");
      setInput("");
      document.getElementById("help-topics")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener(TOPIC_EVENT, onTopic);
    return () => window.removeEventListener(TOPIC_EVENT, onTopic);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return answers.filter((a) => (!topic || a.topic === topic) && (!q || a.q.toLowerCase().includes(q) || a.a.toLowerCase().includes(q)));
  }, [topic, query]);

  const reset = () => {
    setTopic(null);
    setQuery("");
    setInput("");
  };

  return (
    <>
      <Reveal delay={150}>
        <div className="mt-6 flex flex-wrap gap-2">
          {helpTopics.map((t) => {
            const active = topic === t.id;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={active}
                onClick={() => setTopic(active ? null : t.id)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                  active ? "border-ink bg-ink text-white shadow-lg" : "border-slate-200 bg-white text-ink hover:-translate-y-0.5 hover:border-ink"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={200}>
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(input);
          }}
          className="mt-5"
        >
          <label htmlFor="help-search" className="text-[12px] font-semibold text-ink">
            Search insurance help
          </label>
          <div className="mt-1.5 flex max-w-md gap-2">
            <span className="relative flex flex-1 items-center">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
              <input
                id="help-search"
                type="search"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (!e.target.value) setQuery("");
                }}
                placeholder={`Try "claim" or "complaint"`}
                className="h-11 w-full rounded-lg border border-slate-300 bg-white pr-3 pl-9 text-sm text-ink transition-colors placeholder:text-slate-400 hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
              />
            </span>
            <button type="submit" className="btn-shine h-11 rounded-lg bg-ink px-5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
              Search
            </button>
          </div>
        </form>
      </Reveal>

      <p className="mt-3 text-xs text-slate-500" aria-live="polite">
        <span key={results.length} className="inline-block animate-pop font-semibold text-ink">
          {results.length}
        </span>{" "}
        {results.length === 1 ? "answer" : "answers"}
        {(topic || query) && (
          <>
            {" · "}
            <button type="button" onClick={reset} className="font-semibold text-ink underline underline-offset-4 hover:text-gold">
              Show all
            </button>
          </>
        )}
      </p>

      {results.length === 0 ? (
        <p className="mt-3 animate-fade-up rounded-2xl border border-dashed border-slate-300 px-6 py-10 text-center text-sm text-slate-500">
          No answers match. Try another word, or use the issue router below.
        </p>
      ) : (
        <div key={`${topic}-${query}`} className="mt-2 divide-y divide-slate-200 border-b border-slate-200">
          {results.map(({ q, a }, i) => {
            const isOpen = open === q;
            return (
              <div key={q} className="animate-fade-up" style={{ animationDelay: `${i * 45}ms` }}>
                <button type="button" onClick={() => setOpen(isOpen ? null : q)} aria-expanded={isOpen} className="group flex w-full items-center justify-between gap-4 py-4 text-left">
                  <span className="text-[13px] font-semibold text-ink transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold">{q}</span>
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                      isOpen ? "rotate-45 border-brand bg-brand text-ink" : "border-slate-300 text-ink group-hover:border-ink"
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="pr-10 pb-4 text-[13px] leading-relaxed text-slate-600">{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

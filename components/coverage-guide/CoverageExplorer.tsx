"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Building2, FileText, Plus, Search, UserRound } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { buildingBlocks, glossaryTopics, terms, type Audience, type GlossaryTopic } from "./data";

const audiences: { id: Audience; title: string; text: string; icon: typeof UserRound }[] = [
  { id: "personal", title: "Personal use", text: "Your own car or family vehicle", icon: UserRound },
  { id: "business", title: "Business use", text: "Work vehicles and fleets", icon: Building2 },
  { id: "all", title: "Show everything", text: "All terms", icon: FileText },
];

/** "Who is the cover for?", the building-block cards and the glossary share one set of filters. */
export default function CoverageExplorer() {
  const [audience, setAudience] = useState<Audience>("all");
  const [topic, setTopic] = useState<GlossaryTopic | "all">("all");
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string[]>([]);
  const glossaryRef = useRef<HTMLElement>(null);

  const forAudience = useMemo(() => terms.filter((t) => audience === "all" || t.audience === "all" || t.audience === audience), [audience]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return forAudience.filter(
      (t) => (topic === "all" || t.topic === topic) && (!q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)),
    );
  }, [forAudience, topic, query]);

  const toggle = (term: string) => setOpen((o) => (o.includes(term) ? o.filter((x) => x !== term) : [...o, term]));

  const showTopic = (t: GlossaryTopic) => {
    setTopic(t);
    setQuery("");
    setInput("");
    glossaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section id="start-here" className="scroll-mt-40 bg-white pt-16 pb-14">
        <div className={container}>
          <SectionTitle eyebrow="Start here" title="Who is the cover for?" />
          <div role="radiogroup" aria-label="Who is the cover for?" className="mt-6 grid gap-4 md:grid-cols-3">
            {audiences.map(({ id, title, text, icon: Icon }, i) => {
              const active = id === audience;
              return (
                <Reveal key={id} delay={i * 100} className="h-full">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => {
                      setAudience(id);
                      if (id === "personal" && topic === "Business") setTopic("all");
                    }}
                    className={`group h-full w-full rounded-xl border p-4 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] ${
                      active ? "border-navy bg-navy text-white shadow-lg" : "border-slate-200 bg-white hover:border-brand/60"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-brand transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12" />
                    <span className={`mt-2 block text-[14px] font-bold ${active ? "text-white" : "text-ink"}`}>{title}</span>
                    <span className={`mt-1 block text-[12px] ${active ? "text-slate-300" : "text-slate-500"}`}>{text}</span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="coverage-concepts" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Coverage concepts" title="The building blocks of a policy" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {buildingBlocks.map(({ title, topic: t, image, alt }, i) => (
              <Reveal key={title} delay={i * 100} className="h-full">
                <button
                  type="button"
                  onClick={() => showTopic(t)}
                  className="group block h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]"
                >
                  <span className="relative block aspect-[398/249] overflow-hidden">
                    <Image src={image} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                  </span>
                  <span className="block p-4">
                    <span className="block text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{title}</span>
                    <span className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] text-slate-600">
                      See related terms <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section ref={glossaryRef} id="glossary" className="scroll-mt-40 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Glossary" title="Search coverage terms" />

          <Reveal delay={100}>
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                setQuery(input);
              }}
              className="mt-5"
            >
              <label htmlFor="glossary-search" className="text-[12px] font-semibold text-ink">
                Search the glossary
              </label>
              <div className="mt-1.5 flex max-w-md gap-2">
                <span className="relative flex flex-1 items-center">
                  <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
                  <input
                    id="glossary-search"
                    type="search"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      if (!e.target.value) setQuery("");
                    }}
                    placeholder={`Try "excess", "exclusion" or "liability"`}
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
              {(["all", ...glossaryTopics] as const)
                .filter((t) => !(audience === "personal" && t === "Business"))
                .map((t) => {
                  const active = topic === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setTopic(t)}
                      className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all duration-300 ${
                        active ? "border-ink bg-ink text-white shadow-lg" : "border-slate-200 bg-white text-ink hover:-translate-y-0.5 hover:border-ink"
                      }`}
                    >
                      {t === "all" ? "All topics" : t}
                    </button>
                  );
                })}
            </div>
          </Reveal>

          <p className="mt-4 text-xs text-slate-500" aria-live="polite">
            <span key={results.length} className="inline-block animate-pop font-semibold text-ink">
              {results.length}
            </span>{" "}
            {results.length === 1 ? "term" : "terms"}
            {audience !== "all" && <> for {audience === "personal" ? "personal use" : "business use"}</>}
            {query && <> matching “{query}”</>}
          </p>

          {results.length === 0 ? (
            <div className="mt-3 animate-fade-up rounded-2xl border border-dashed border-slate-300 px-6 py-10 text-center">
              <p className="text-sm text-slate-500">No terms match. Try another word or topic.</p>
              <button
                type="button"
                onClick={() => {
                  setTopic("all");
                  setQuery("");
                  setInput("");
                }}
                className="mt-3 text-sm font-semibold text-ink underline underline-offset-4 hover:text-gold"
              >
                Show all terms
              </button>
            </div>
          ) : (
            <div key={`${audience}-${topic}-${query}`} className="mt-3 space-y-2.5">
              {results.map((t, i) => {
                const isOpen = open.includes(t.term);
                return (
                  <div
                    key={t.term}
                    className={`animate-fade-up rounded-xl border bg-white transition-all duration-300 ${
                      isOpen ? "border-brand/60 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]" : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                    }`}
                    style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}
                  >
                    <button type="button" onClick={() => toggle(t.term)} aria-expanded={isOpen} className="group flex w-full items-center gap-4 px-4 py-3 text-left">
                      <span className="flex-1">
                        <span className="block text-[13px] font-bold text-ink transition-transform duration-300 group-hover:translate-x-1">{t.term}</span>
                        <span className="mt-0.5 block text-[11px] text-slate-500">{t.topic}</span>
                      </span>
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
                        <p className="mx-4 border-t border-slate-100 pt-3 pb-4 text-[13px] leading-relaxed text-slate-600">{t.definition}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Check, Clock, Printer, Search, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import RegionPicker from "@/components/ui/RegionPicker";
import { useRegion } from "@/lib/region";
import { topics, type Audience, type DisclosureTopic } from "./data";

const audienceLabel = (t: DisclosureTopic) => (t.audiences.length === 2 ? "Personal & commercial" : t.audiences[0] === "personal" ? "Personal" : "Commercial");

export default function DisclosureFinder({ initialTopic }: { initialTopic?: string }) {
  const region = useRegion();
  const [audience, setAudience] = useState<Audience>("personal");
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  // Opened after mount — the detail panel is a portal.
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => setOpenId(initialTopic ?? null), [initialTopic]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return topics.filter(
      (t) => t.audiences.includes(audience) && (!q || [t.title, t.summary, ...t.details].some((s) => s.toLowerCase().includes(q))),
    );
  }, [audience, query]);

  const selected = topics.find((t) => t.id === openId) ?? null;

  return (
    <>
      <div className="print:hidden">
        <Reveal delay={150}>
          <div className="mt-6 grid items-end gap-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 lg:grid-cols-[1fr_auto_2fr]">
            <div>
              <p className="text-[12px] font-semibold text-ink">Market</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-sm">
                <strong className="text-ink">{region}</strong>
                <span className="text-slate-400">·</span>
                <RegionPicker label="Change" buttonClassName="text-xs font-semibold text-blue-700 underline underline-offset-2 transition-colors hover:text-ink" />
              </div>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-ink">Audience</p>
              <div role="radiogroup" aria-label="Audience" className="mt-1.5 inline-flex rounded-full border border-slate-200 p-1">
                {(["personal", "commercial"] as const).map((a) => (
                  <button
                    key={a}
                    type="button"
                    role="radio"
                    aria-checked={audience === a}
                    onClick={() => setAudience(a)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-all duration-300 ${
                      audience === a ? "bg-ink text-white shadow" : "text-ink hover:bg-slate-100"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                setQuery(input);
              }}
            >
              <label htmlFor="disclosure-topic-search" className="text-[12px] font-semibold text-ink">
                Search topics
              </label>
              <div className="mt-1.5 flex gap-2">
                <span className="relative flex flex-1 items-center">
                  <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
                  <input
                    id="disclosure-topic-search"
                    type="search"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      if (!e.target.value) setQuery("");
                    }}
                    placeholder="e.g. excess, privacy, fees"
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white pr-3 pl-9 text-sm text-ink transition-colors placeholder:text-slate-400 hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
                  />
                </span>
                <button type="submit" className="btn-shine h-11 rounded-lg bg-ink px-5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  Search
                </button>
              </div>
            </form>
          </div>
        </Reveal>

        <p className="mt-3 text-xs text-slate-500" aria-live="polite">
          <span key={results.length} className="inline-block animate-pop font-semibold text-ink">
            {results.length}
          </span>{" "}
          {results.length === 1 ? "topic" : "topics"} for {audience} insurance in {region}
          {query && <> matching “{query}”</>}
        </p>

        {results.length === 0 ? (
          <div className="mt-3 animate-fade-up rounded-2xl border border-dashed border-slate-300 px-6 py-10 text-center">
            <p className="text-sm text-slate-500">No topics match “{query}”.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setInput("");
              }}
              className="mt-3 text-sm font-semibold text-ink underline underline-offset-4 hover:text-gold"
            >
              Show all topics
            </button>
          </div>
        ) : (
          <div key={`${audience}-${query}`} className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setOpenId(t.id)}
                className="group flex h-full animate-fade-up flex-col rounded-xl border border-slate-200 bg-white p-4 text-left transition-all duration-500 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]"
                style={{ animationDelay: `${Math.min(i, 11) * 45}ms` }}
              >
                <span className="text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{t.title}</span>
                <span className="mt-2 line-clamp-2 flex-1 text-[12px] leading-relaxed text-slate-600">{t.summary}</span>
                <span className="mt-3 flex items-center justify-between gap-2">
                  <span className="rounded-full border border-dashed border-slate-300 px-2 py-0.5 text-[10px] font-semibold text-slate-600">{audienceLabel(t)}</span>
                  <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Printed version: full text of every topic shown. */}
      <div className="hidden print:block">
        <p className="mb-4 text-sm">
          {results.length} topics for {audience} insurance in {region}
        </p>
        {results.map((t) => (
          <div key={t.id} className="mb-4 break-inside-avoid">
            <h3 className="font-bold">{t.title}</h3>
            <p className="text-sm">{t.summary}</p>
            <ul className="ml-5 list-disc text-sm">
              {t.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {selected && <TopicPanel topic={selected} region={region} onClose={() => setOpenId(null)} />}
    </>
  );
}

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-md print:hidden"
    >
      <Printer className="h-4 w-4" /> Print this page
    </button>
  );
}

function TopicPanel({ topic, region, onClose }: { topic: DisclosureTopic; region: string; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setVisible(false);
    window.setTimeout(onClose, 250);
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per open
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="topic-title">
      <div onClick={close} className={`absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`} />
      <div
        className={`relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:rounded-2xl ${
          visible ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-8 opacity-0 sm:scale-95"
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-[11px] font-bold tracking-wide text-gold uppercase">Disclosure topic</p>
            <h2 id="topic-title" className="mt-1 text-lg font-extrabold text-ink">
              {topic.title}
            </h2>
          </div>
          <button ref={closeRef} type="button" onClick={close} aria-label="Close topic" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 transition-all hover:rotate-90 hover:bg-ink hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-6 py-5">
          <p className="text-[14px] leading-relaxed text-slate-700">{topic.summary}</p>
          <ul className="mt-4 space-y-2.5">
            {topic.details.map((d, i) => (
              <li
                key={d}
                className={`flex gap-2.5 text-[13px] leading-relaxed text-slate-600 transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                style={{ transitionDelay: visible ? `${150 + i * 70}ms` : "0ms" }}
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2 text-[11px]">
            <span className="rounded-full border border-dashed border-slate-300 px-2 py-0.5 font-semibold text-slate-600">{audienceLabel(topic)}</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-600">{region}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 font-semibold text-amber-700">
              <Clock className="h-3 w-3" /> Review pending
            </span>
          </div>
          <p className="mt-4 text-xs text-slate-400">Educational notice. A provider&apos;s transaction-specific notice takes priority.</p>
        </div>
      </div>
    </div>,
    document.body,
  );
}

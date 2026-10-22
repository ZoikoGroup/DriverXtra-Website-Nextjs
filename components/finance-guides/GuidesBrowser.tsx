"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronDown, Clock, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { guides, startHere, topics, type Guide, type Topic } from "./data";

const sortOptions = [
  { id: "relevant", label: "Most relevant" },
  { id: "newest", label: "Newest" },
  { id: "az", label: "A–Z" },
] as const;
type SortId = (typeof sortOptions)[number]["id"];

export default function GuidesBrowser({ initialGuide }: { initialGuide?: string }) {
  const [topic, setTopic] = useState<Topic | "all">("all");
  const [level, setLevel] = useState<"all" | Guide["level"]>("all");
  const [sort, setSort] = useState<SortId>("relevant");
  // Opened after mount — the reader is a portal, which can't render on the server.
  const [openId, setOpenId] = useState<string | null>(null);

  // Also handles menu links to ?guide=… while already on this page.
  useEffect(() => setOpenId(initialGuide ?? null), [initialGuide]);

  const openGuide = (id: string | null) => {
    setOpenId(id);
    const url = id ? `${window.location.pathname}?guide=${id}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  };

  const results = useMemo(() => {
    const list = guides.filter((g) => (topic === "all" || g.topic === topic) && (level === "all" || g.level === level));
    if (sort === "newest") return [...list].sort((a, b) => b.reviewedOn.localeCompare(a.reviewedOn));
    if (sort === "az") return [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [topic, level, sort]);

  const openGuideData = guides.find((g) => g.id === openId) ?? null;

  return (
    <>
      {/* A good place to start */}
      <section className="bg-white pt-16 pb-4">
        <div className={container}>
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">A good place to start</h2>
          </Reveal>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {startHere.map((id, i) => {
              const g = guides.find((x) => x.id === id)!;
              return (
                <Reveal key={id} delay={i * 100}>
                  <button
                    type="button"
                    onClick={() => openGuide(id)}
                    className="group h-full w-full rounded-2xl border border-slate-200 p-5 text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]"
                  >
                    <span className="block text-[15px] font-bold text-ink transition-colors group-hover:text-gold">{g.title}</span>
                    <span className="mt-2 line-clamp-3 block text-[13px] leading-relaxed text-slate-600">{g.excerpt}</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
                      Read guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore topics */}
      <section id="explore-topics" className="scroll-mt-28 bg-white pt-10 pb-16">
        <div className={container}>
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Explore topics</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap">
              {[{ id: "all" as const, label: "All topics", count: guides.length }, ...topics.map((t) => ({ id: t, label: t, count: guides.filter((g) => g.topic === t).length }))].map(
                ({ id, label, count }) => {
                  const active = topic === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setTopic(id)}
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                        active ? "border-ink bg-ink text-white shadow-lg" : "border-slate-200 bg-white text-ink hover:-translate-y-0.5 hover:border-ink"
                      }`}
                    >
                      {label}
                      <span className={`text-[11px] ${active ? "text-brand" : "text-slate-400"}`}>{count}</span>
                    </button>
                  );
                },
              )}
            </div>
          </Reveal>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-ink">Guides</h3>
              <p className="text-xs text-slate-500">
                <span key={results.length} className="inline-block animate-pop font-semibold text-ink">
                  {results.length}
                </span>{" "}
                {results.length === 1 ? "guide" : "guides"}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Dropdown label="Level" value={level} onChange={(v) => setLevel(v as typeof level)} options={[["all", "All levels"], ["Beginner", "Beginner"], ["Intermediate", "Intermediate"]]} />
              <Dropdown label="Sort" value={sort} onChange={(v) => setSort(v as SortId)} options={sortOptions.map((o) => [o.id, o.label])} />
            </div>
          </div>

          {results.length === 0 ? (
            <p className="mt-6 animate-fade-up rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center text-sm text-slate-500">
              No guides match this topic and level yet.
            </p>
          ) : (
            <div key={`${topic}-${level}-${sort}`} className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {results.map((g, i) => (
                <Reveal key={g.id} delay={(i % 3) * 90} className="h-full">
                  <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-[11px] font-bold tracking-wide text-slate-600 uppercase transition-colors group-hover:bg-brand-light group-hover:text-ink">
                      {g.topic}
                    </span>
                    <h4 className="mt-3">
                      <button type="button" onClick={() => openGuide(g.id)} className="text-left text-[15px] font-bold text-ink underline decoration-slate-300 underline-offset-4 transition-colors hover:text-gold hover:decoration-brand">
                        {g.title}
                      </button>
                    </h4>
                    <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-slate-600">{g.excerpt}</p>
                    <p className="mt-3 text-[11px] text-slate-400">
                      Reviewed {g.reviewed} · {g.minutes} min read · {g.level}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {openGuideData && <GuideReader guide={openGuideData} onClose={() => openGuide(null)} />}
    </>
  );
}

function Dropdown({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: (readonly [string, string])[] }) {
  return (
    <label className="relative flex items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-48 cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white pr-9 pl-3 text-sm text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-500" />
    </label>
  );
}

/** Slide-in reader for a guide (there are no separate article pages yet). */
function GuideReader({ guide, onClose }: { guide: Guide; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

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

  const close = () => {
    setVisible(false);
    window.setTimeout(onClose, 300);
  };

  return createPortal(
    <div className="fixed inset-0 z-[80] flex justify-end" role="dialog" aria-modal="true" aria-labelledby="guide-title">
      <div onClick={close} className={`absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`} />
      <article
        className={`relative flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
          <span className="flex items-center gap-2 text-xs font-bold tracking-wide text-gold uppercase">
            <BookOpen className="h-4 w-4" /> {guide.topic}
          </span>
          <button ref={closeRef} type="button" onClick={close} aria-label="Close guide" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 transition-all hover:rotate-90 hover:bg-ink hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-6 py-6">
          <h2 id="guide-title" className={`text-2xl font-extrabold text-ink transition-all delay-150 duration-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
            {guide.title}
          </h2>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="h-3.5 w-3.5" /> {guide.minutes} min read · {guide.level} · Reviewed {guide.reviewed}
          </p>
          <div className="mt-5 space-y-4">
            {guide.body.map((para, i) => (
              <p
                key={i}
                className={`text-[15px] leading-relaxed text-slate-700 transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                style={{ transitionDelay: visible ? `${250 + i * 100}ms` : "0ms" }}
              >
                {para}
              </p>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Related</p>
            <Link href={guide.related.href} onClick={() => document.body.style.removeProperty("overflow")} className="group mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline underline-offset-4 hover:text-gold">
              {guide.related.label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-6 text-xs text-slate-400">General information, not a lender offer or personal financial advice.</p>
        </div>
      </article>
    </div>,
    document.body,
  );
}

"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "@/components/press-media/PressHeading";
import { announcements, formatDate, topics, type Topic } from "./data";
import TypeBadge from "./TypeBadge";

const PAGE_SIZE = 6;

const regions = [...new Set(announcements.flatMap((a) => a.regions))].sort();
const years = [...new Set(announcements.map((a) => a.published.slice(0, 4)))].sort().reverse();
const lastUpdated = announcements.reduce((max, a) => (a.published > max ? a.published : max), "");

const selectCls =
  "h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pr-10 pl-4 text-[15px] text-ink focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none";

function Select({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-ink">
        {label}
      </label>
      <div className="relative mt-2">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={selectCls}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>
    </div>
  );
}

export default function AnnouncementsArchiveSection() {
  const [topic, setTopic] = useState<Topic | "all">("all");
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [year, setYear] = useState("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return announcements
      .filter((a) => topic === "all" || a.topic === topic)
      .filter((a) => region === "all" || a.regions.includes(region))
      .filter((a) => year === "all" || a.published.startsWith(year))
      .filter((a) => !q || `${a.title} ${a.summary} ${a.type}`.toLowerCase().includes(q))
      .sort((a, b) => (sort === "newest" ? b.published.localeCompare(a.published) : a.published.localeCompare(b.published)));
  }, [topic, query, region, year, sort]);

  // Any filter change starts the list from the top again.
  const resetting =
    <T,>(set: (v: T) => void) =>
    (v: T) => {
      set(v);
      setVisible(PAGE_SIZE);
    };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    setQuery(draft);
    setVisible(PAGE_SIZE);
  };

  const clearAll = () => {
    setTopic("all");
    setDraft("");
    setQuery("");
    setRegion("all");
    setYear("all");
    setVisible(PAGE_SIZE);
  };

  return (
    <section id="announcements" className="scroll-mt-28 bg-white py-20 md:py-24">
      <div className={container}>
        <PressHeading
          eyebrow="Archive"
          title="Latest announcements"
          description="Filter by publication date, topic and region."
        />

        <Reveal delay={100} className="mt-8">
          <div
            role="group"
            aria-label="Filter by topic"
            className="flex gap-1 overflow-x-auto rounded-full border border-slate-200 bg-white p-1.5 shadow-sm scrollbar-none"
          >
            {topics.map((t) => {
              const active = topic === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => resetting(setTopic)(t.id)}
                  className={`h-11 shrink-0 rounded-full px-5 text-sm font-semibold whitespace-nowrap transition-colors ${
                    active ? "bg-navy text-white" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={150} className="mt-5">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
            <form onSubmit={onSearch} role="search" className="md:col-span-2 lg:col-span-1">
              <label htmlFor="news-search" className="text-sm font-bold text-ink">
                Search announcements
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="news-search"
                  type="search"
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value);
                    if (!e.target.value) setQuery("");
                  }}
                  className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-[15px] text-ink focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-12 shrink-0 rounded-full bg-navy px-5 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
                >
                  Search
                </button>
              </div>
            </form>
            <Select
              id="news-region"
              label="Region"
              value={region}
              onChange={resetting(setRegion)}
              options={[{ value: "all", label: "All regions" }, ...regions.map((r) => ({ value: r, label: r }))]}
            />
            <Select
              id="news-year"
              label="Year (UTC)"
              value={year}
              onChange={resetting(setYear)}
              options={[{ value: "all", label: "All years" }, ...years.map((y) => ({ value: y, label: y }))]}
            />
            <Select
              id="news-sort"
              label="Sort"
              value={sort}
              onChange={(v) => setSort(v as "newest" | "oldest")}
              options={[
                { value: "newest", label: "Newest first" },
                { value: "oldest", label: "Oldest first" },
              ]}
            />
          </div>
        </Reveal>

        <p className="mt-4 text-sm text-slate-500" aria-live="polite">
          {results.length} published {results.length === 1 ? "record" : "records"} · last updated{" "}
          {formatDate(lastUpdated, "short")}
        </p>

        {results.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
            <p className="text-[15px] text-slate-600">No announcements match these filters.</p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-4 h-11 rounded-full border border-slate-300 px-5 text-sm font-semibold text-ink hover:border-ink"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.slice(0, visible).map((a, i) => (
              <Reveal as="li" key={a.id} delay={(i % PAGE_SIZE) * 60}>
                <article className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-lg">
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <Image
                      src={a.image}
                      alt={a.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <TypeBadge>{a.type}</TypeBadge>
                      {a.correctionPublished && (
                        <span className="flex items-center gap-1.5 text-sm text-amber-700">
                          <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden />
                          Correction published
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 text-base leading-snug font-bold text-ink">{a.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{a.summary}</p>
                    <p className="mt-3 text-sm text-slate-500">
                      <time dateTime={a.published}>{formatDate(a.published)}</time> · {a.regions.join(", ")}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        )}

        {visible < results.length && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="h-12 rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

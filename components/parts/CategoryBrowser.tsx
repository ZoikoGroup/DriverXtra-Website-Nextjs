"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown, CircleHelp, Search, SearchX, SlidersHorizontal, X, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { useRegion } from "@/lib/region";
import PartsHero from "./PartsHero";
import ShopCards from "./ShopCards";
import PartCard from "./PartCard";
import PartsCompare, { MAX_COMPARE } from "./PartsCompare";
import { PARTS_COUNTRY, vehicles, type Part, type VehicleId } from "./data";

export type FilterGroup = {
  title: string;
  options: string[];
  valueOf: (p: Part) => string | undefined;
  /** Parts this group doesn't apply to are never hidden by it (e.g. tyre sizes don't hide wheels). */
  appliesTo?: (p: Part) => boolean;
};

export type QuickCard = {
  id: string;
  title: string;
  text: string;
  icon: LucideIcon;
  /** Select one option in a filter group, or focus the search box. */
  action: { group: string; option: string } | "search";
};

export type CategoryBrowserProps = {
  /** Shop card to highlight, and the section id it links to. */
  activeCard: string;
  sectionId: string;
  title: string;
  description: string;
  parts: Part[];
  groups: FilterGroup[];
  quickCards?: QuickCard[];
  searchLabel: string;
  searchHint: string;
  resultsTitle: string;
  /** e.g. n => `${n} EV parts` */
  countLabel: (n: number) => string;
  emptyText: string;
  initialVehicle?: VehicleId;
};

const LOADING_MS = 400;

const sortOptions = [
  { id: "relevance", label: "Relevance" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
] as const;
type SortId = (typeof sortOptions)[number]["id"];

/** Spaces, slashes and dashes ignored — "225/45R17" and "225/45 R17" match the same part. */
const normalise = (s: string) => s.toLowerCase().replace(/[\s/-]+/g, "");

/** A parts category page: hero, shop cards, quick cards, search, sticky spec filters, results and compare. */
export default function CategoryBrowser({
  activeCard,
  sectionId,
  title,
  description,
  parts,
  groups,
  quickCards = [],
  searchLabel,
  searchHint,
  resultsTitle,
  countLabel,
  emptyText,
  initialVehicle,
}: CategoryBrowserProps) {
  const region = useRegion();
  const [vehicleId, setVehicleId] = useState<string>(initialVehicle ?? "");
  const [fitOnly, setFitOnly] = useState(!!initialVehicle);
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [orderInfo, setOrderInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);
  const loadingTimer = useRef<number | undefined>(undefined);
  const searchRef = useRef<HTMLInputElement>(null);
  const resultsId = `${sectionId}-results`;

  const flash = useCallback(() => {
    window.clearTimeout(loadingTimer.current);
    setLoading(true);
    loadingTimer.current = window.setTimeout(() => setLoading(false), LOADING_MS);
  }, []);
  useEffect(() => () => window.clearTimeout(loadingTimer.current), []);

  const vehicle = vehicles.find((v) => v.id === vehicleId) ?? null;
  const inRegion = region === PARTS_COUNTRY ? parts : [];
  const scrollTo = (id: string) => window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  const change = (fn: () => void) => {
    fn();
    flash();
  };
  const toggleOption = (group: string, option: string) =>
    change(() =>
      setSelected((s) => {
        const list = s[group] ?? [];
        return { ...s, [group]: list.includes(option) ? list.filter((o) => o !== option) : [...list, option] };
      }),
    );

  const resetFilters = () =>
    change(() => {
      setSelected({});
      setQuery("");
      setQueryInput("");
      setFitOnly(false);
    });

  const results = useMemo(() => {
    const q = normalise(query);
    const list = inRegion.filter(
      (p) =>
        groups.every((g) => {
          const chosen = selected[g.title] ?? [];
          if (!chosen.length || (g.appliesTo && !g.appliesTo(p))) return true;
          const value = g.valueOf(p);
          return !!value && chosen.includes(value);
        }) &&
        (!q || [p.name, p.partNo, p.brand, p.spec ?? ""].some((s) => normalise(s).includes(q))) &&
        (!fitOnly || !vehicle || p.connectorCheck || p.fits?.includes(vehicle.id as never)),
    );
    if (sort === "relevance") return list;
    const dir = sort === "price-asc" ? 1 : -1;
    return [...list].sort((a, b) => (a.price === undefined ? 1 : b.price === undefined ? -1 : (a.price - b.price) * dir));
  }, [inRegion, groups, selected, query, fitOnly, vehicle, sort]);

  const activeCount = Object.values(selected).reduce((n, l) => n + l.length, 0) + (query ? 1 : 0);
  const compareItems = compare.map((id) => parts.find((p) => p.id === id)!).filter(Boolean);
  const resultsKey = JSON.stringify([selected, query, fitOnly, vehicleId, sort, region]);

  const runQuick = (card: QuickCard) => {
    if (card.action === "search") {
      searchRef.current?.focus();
      searchRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const { group, option } = card.action;
    change(() => setSelected((s) => ({ ...s, [group]: [option] })));
    scrollTo(resultsId);
  };

  const filterPanel = (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between px-4 py-3.5">
        <h2 className="text-base font-bold text-ink">Filters</h2>
        <button type="button" onClick={resetFilters} className="text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-ink">
          Reset
        </button>
      </div>
      {groups.map((g) => (
        <Group key={g.title} title={g.title}>
          {g.options.map((o) => (
            <CheckOption key={o} label={o} checked={(selected[g.title] ?? []).includes(o)} onChange={() => toggleOption(g.title, o)} />
          ))}
        </Group>
      ))}
      <Group title="Compatibility with your vehicle">
        {vehicle ? (
          <>
            <CheckOption label={`Only parts that fit my ${vehicle.label.split(" · ")[0]}`} checked={fitOnly} onChange={() => change(() => setFitOnly((f) => !f))} />
            <button
              type="button"
              onClick={() => change(() => { setVehicleId(""); setFitOnly(false); })}
              className="mt-1 text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-ink"
            >
              Clear vehicle
            </button>
          </>
        ) : (
          <p className="text-xs text-slate-500">
            <a href="#check-compatibility" className="font-semibold text-blue-700 underline underline-offset-2 hover:text-ink">
              Select a vehicle
            </a>{" "}
            to filter by compatibility.
          </p>
        )}
      </Group>
    </div>
  );

  return (
    <>
      <PartsHero
        key={vehicleId || "none"}
        vehicle={vehicle}
        onCheck={(id) =>
          change(() => {
            setVehicleId(id);
            setFitOnly(true);
            scrollTo(resultsId);
          })
        }
        onClear={() => change(() => { setVehicleId(""); setFitOnly(false); })}
      />

      <ShopCards active={activeCard} />

      <section id={sectionId} className="scroll-mt-28 bg-white pt-10 pb-20">
        <div className={container}>
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-slate-600">{description}</p>
          </Reveal>

          {quickCards.length > 0 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:max-w-3xl">
              {quickCards.map((card, i) => {
                const Icon = card.icon;
                const active = card.action !== "search" && (selected[card.action.group] ?? []).join() === card.action.option;
                return (
                  <Reveal key={card.id} delay={150 + i * 80}>
                    <button
                      type="button"
                      onClick={() => runQuick(card)}
                      aria-pressed={card.action === "search" ? undefined : active}
                      className={`group h-full w-full rounded-xl border p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                        active ? "border-brand bg-brand-light/40" : "border-slate-200 bg-white hover:border-brand/60"
                      }`}
                    >
                      <Icon className="h-5 w-5 text-brand-dark transition-transform duration-500 group-hover:rotate-180" />
                      <span className="mt-2 block text-sm font-bold text-ink">{card.title}</span>
                      <span className="block text-xs text-slate-500">{card.text}</span>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          )}

          <Reveal delay={200}>
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                change(() => setQuery(queryInput.trim()));
                scrollTo(resultsId);
              }}
              className="mt-6 max-w-xl"
            >
              <label htmlFor={`${sectionId}-search`} className="text-[13px] font-bold text-ink">
                {searchLabel}
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  ref={searchRef}
                  id={`${sectionId}-search`}
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  className="h-11 min-w-0 flex-1 rounded-lg border border-slate-300 px-3 text-sm transition-all duration-200 hover:border-slate-400 focus:border-brand-dark focus:ring-2 focus:ring-brand/30 focus:outline-none"
                />
                <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lg">
                  <Search className="h-4 w-4" /> Search
                </button>
              </div>
              <p className="mt-1.5 text-xs text-slate-500">{searchHint}</p>
            </form>
          </Reveal>

          <div id={resultsId} className="mt-8 grid scroll-mt-32 gap-6 lg:grid-cols-[240px_1fr]">
            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-[124px] max-h-[calc(100vh-140px)] overflow-y-auto overscroll-contain rounded-2xl [scrollbar-width:thin]">
                <Reveal direction="right">{filterPanel}</Reveal>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-ink">{resultsTitle}</h3>
                  <p className="text-sm text-slate-600" aria-live="polite">
                    <strong key={results.length} className="inline-block animate-pop text-ink">
                      {countLabel(results.length).split(" ")[0]}
                    </strong>{" "}
                    {countLabel(results.length).split(" ").slice(1).join(" ")} in {region}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFiltersOpen((o) => !o)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-ink hover:border-ink lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4" /> Filters
                    {activeCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold">{activeCount}</span>}
                  </button>
                  <label className="relative flex items-center">
                    <span className="sr-only">Sort results</span>
                    <select
                      value={sort}
                      onChange={(e) => change(() => setSort(e.target.value as SortId))}
                      className="h-9 cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white pr-9 pl-3 text-xs font-semibold text-ink hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
                    >
                      {sortOptions.map((o) => (
                        <option key={o.id} value={o.id}>
                          Sort: {o.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-500" />
                  </label>
                  <div className="relative">
                    <button type="button" onClick={() => setOrderInfo((o) => !o)} aria-expanded={orderInfo} className="text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-ink">
                      How results are ordered
                    </button>
                    {orderInfo && (
                      <div className="absolute top-full right-0 z-20 mt-2 w-72 animate-fade-up rounded-xl bg-navy p-4 text-xs leading-relaxed text-slate-200 shadow-2xl">
                        <p className="flex items-center gap-1.5 font-semibold text-white">
                          <CircleHelp className="h-3.5 w-3.5 text-brand" /> How results are ordered
                        </p>
                        <p className="mt-2">By relevance to your search and vehicle, then listing completeness. Payment doesn&apos;t change the order.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {(query || (vehicle && fitOnly)) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {query && (
                    <button
                      type="button"
                      onClick={() => change(() => { setQuery(""); setQueryInput(""); })}
                      className="group inline-flex animate-fade-up items-center gap-1.5 rounded-full border border-brand bg-brand-light px-3 py-1 text-xs font-semibold text-ink hover:bg-brand"
                    >
                      “{query}” <X className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
                    </button>
                  )}
                  {vehicle && fitOnly && (
                    <button
                      type="button"
                      onClick={() => change(() => setFitOnly(false))}
                      className="inline-flex animate-fade-up items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800"
                    >
                      <Check className="h-3.5 w-3.5" /> Only parts that fit my {vehicle.label.split(" · ")[0]}
                    </button>
                  )}
                </div>
              )}

              <div className={`grid transition-[grid-template-rows] duration-500 lg:hidden ${filtersOpen ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">{filterPanel}</div>
              </div>

              <div className="mt-5">
                {loading ? (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: Math.min(6, Math.max(3, results.length)) }, (_, i) => (
                      <div key={i} className="space-y-3 rounded-2xl border border-slate-200 p-4">
                        <div className="skeleton h-4 w-20 rounded" />
                        <div className="skeleton h-10 w-10 rounded-lg" />
                        <div className="skeleton h-4 w-4/5 rounded" />
                        <div className="skeleton h-3 w-3/5 rounded" />
                        <div className="skeleton h-6 w-1/3 rounded" />
                        <div className="skeleton h-9 w-28 rounded-full" />
                      </div>
                    ))}
                  </div>
                ) : results.length === 0 ? (
                  <div className="flex animate-fade-up flex-col items-center rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-slate-100">
                      <SearchX className="h-6 w-6 text-slate-500" />
                    </span>
                    <h4 className="mt-4 text-lg font-bold text-ink">{region !== PARTS_COUNTRY ? `Nothing listed in ${region} yet` : "No matching results"}</h4>
                    <p className="mt-1 max-w-sm text-sm text-slate-500">{region !== PARTS_COUNTRY ? "Parts for this market are coming soon." : emptyText}</p>
                    {region === PARTS_COUNTRY && (
                      <button type="button" onClick={resetFilters} className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
                        Reset filters
                      </button>
                    )}
                  </div>
                ) : (
                  <div key={resultsKey} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {results.map((p, i) => (
                      <Reveal key={p.id} delay={(i % 3) * 80} className="h-full">
                        <PartCard
                          part={p}
                          vehicle={vehicle ? { id: vehicle.id, label: vehicle.label } : null}
                          noVehicleText="Select a vehicle to check fitment"
                          comparing={compare.includes(p.id)}
                          compareFull={compare.length >= MAX_COMPARE}
                          onToggleCompare={() => setCompare((c) => (c.includes(p.id) ? c.filter((x) => x !== p.id) : c.length < MAX_COMPARE ? [...c, p.id] : c))}
                        />
                      </Reveal>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PartsCompare
        items={compareItems}
        vehicle={vehicle ? { id: vehicle.id, label: vehicle.label } : null}
        onRemove={(id) => setCompare((c) => c.filter((x) => x !== id))}
        onClear={() => setCompare([])}
      />
    </>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-slate-200 px-4 py-4">
      <h3 className="mb-2 text-[13px] font-bold text-ink">{title}</h3>
      {children}
    </div>
  );
}

function CheckOption({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="group -mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-50">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded accent-ink transition-transform group-hover:scale-110" />
      <span className={`text-sm ${checked ? "font-medium text-ink" : "text-slate-700"}`}>{label}</span>
    </label>
  );
}

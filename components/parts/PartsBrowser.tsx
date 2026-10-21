"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown, CircleHelp, Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { useRegion } from "@/lib/region";
import PartCard from "./PartCard";
import PartsHero from "./PartsHero";
import ShopCards from "./ShopCards";
import PartsCompare, { MAX_COMPARE } from "./PartsCompare";
import {
  PARTS_COUNTRY,
  categories,
  partTypes,
  parts,
  vehicles,
  type Category,
  type PartType,
  type VehicleId,
} from "./data";

const LOADING_MS = 400;

const sortOptions = [
  { id: "relevance", label: "Relevance" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
] as const;
type SortId = (typeof sortOptions)[number]["id"];

const normalise = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[\s-]+/g, "");

type PartsBrowserProps = {
  initialVehicle?: VehicleId;
  initialTypes?: PartType[];
  initialCategories?: Category[];
  initialQuery?: string;
};

export default function PartsBrowser({ initialVehicle, initialTypes = [], initialCategories = [], initialQuery = "" }: PartsBrowserProps) {
  const region = useRegion();

  // Vehicle from "Check compatibility" or a /parts?vehicle=… link
  const [vehicleId, setVehicleId] = useState<string>(initialVehicle ?? "");
  const [fitOnly, setFitOnly] = useState(!!initialVehicle);

  // Filters
  const [types, setTypes] = useState<PartType[]>(initialTypes);
  const [cats, setCats] = useState<Category[]>(initialCategories);
  const [queryInput, setQueryInput] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortId>("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [orderInfo, setOrderInfo] = useState(false);

  const [loading, setLoading] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);
  const loadingTimer = useRef<number | undefined>(undefined);

  const flash = useCallback(() => {
    window.clearTimeout(loadingTimer.current);
    setLoading(true);
    loadingTimer.current = window.setTimeout(() => setLoading(false), LOADING_MS);
  }, []);
  useEffect(() => () => window.clearTimeout(loadingTimer.current), []);

  // Footer / menu links to /parts?… while already on this page.
  const lastLink = useRef(JSON.stringify([initialTypes, initialCategories, initialQuery]));
  useEffect(() => {
    const link = JSON.stringify([initialTypes, initialCategories, initialQuery]);
    if (link === lastLink.current) return;
    lastLink.current = link;
    setTypes(initialTypes);
    setCats(initialCategories);
    setQueryInput(initialQuery);
    setQuery(initialQuery);
    flash();
  }, [initialTypes, initialCategories, initialQuery, flash]);

  const vehicle = vehicles.find((v) => v.id === vehicleId) ?? null;

  const scrollTo = (id: string) => window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);

  const clearVehicle = () => {
    setVehicleId("");
    setFitOnly(false);
    flash();
  };

  const toggle = <T,>(list: T[], value: T) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const resetFilters = () => {
    setTypes([]);
    setCats([]);
    setQuery("");
    setQueryInput("");
    setFitOnly(false);
    flash();
  };

  const results = useMemo(() => {
    if (region !== PARTS_COUNTRY) return [];
    const q = normalise(query);
    const list = parts.filter(
      (p) =>
        (!types.length || types.includes(p.type)) &&
        (!cats.length || (p.category && cats.includes(p.category))) &&
        (!q || [p.name, p.partNo, p.brand].some((s) => normalise(s).includes(q))) &&
        (!fitOnly || !vehicle || p.universal || p.connectorCheck || p.fits?.includes(vehicle.id as never)),
    );
    if (sort === "relevance") return list;
    const dir = sort === "price-asc" ? 1 : -1;
    return [...list].sort((a, b) => {
      if (a.price === undefined) return 1;
      if (b.price === undefined) return -1;
      return (a.price - b.price) * dir;
    });
  }, [region, types, cats, query, fitOnly, vehicle, sort]);

  const activeCount = types.length + cats.length + (query ? 1 : 0);
  const compareItems = compare.map((id) => parts.find((p) => p.id === id)!).filter(Boolean);
  const resultsKey = JSON.stringify([types, cats, query, fitOnly, vehicleId, sort, region]);

  const filterPanel = (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between px-4 py-3.5">
        <h2 className="text-base font-bold text-ink">Filters</h2>
        <button type="button" onClick={resetFilters} className="text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-ink">
          Reset
        </button>
      </div>
      <FilterGroup title="Product type">
        {partTypes.map((t) => (
          <CheckOption
            key={t.id}
            label={t.label}
            checked={types.includes(t.id)}
            onChange={() => {
              setTypes((x) => toggle(x, t.id));
              flash();
            }}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Category">
        {categories.map((c) => (
          <CheckOption
            key={c}
            label={c}
            checked={cats.includes(c)}
            onChange={() => {
              setCats((x) => toggle(x, c));
              flash();
            }}
          />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <>
      <PartsHero
        key={vehicleId || "none"}
        vehicle={vehicle}
        onCheck={(id) => {
          setVehicleId(id);
          setFitOnly(true);
          flash();
          scrollTo("all-parts");
        }}
        onClear={clearVehicle}
      />

      <ShopCards
        onSelectTypes={(ts) => {
          setTypes(ts);
          setCats([]);
          flash();
          scrollTo("all-parts");
        }}
      />

      {/* Search + results */}
      <section id="all-parts" className="scroll-mt-28 bg-white pt-8 pb-20">
        <div className={container}>
          <Reveal>
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                setQuery(queryInput.trim());
                flash();
              }}
              className="max-w-xl"
            >
              <label htmlFor="part-search" className="text-[13px] font-bold text-ink">
                Search parts or manufacturer part number
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="part-search"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  className="h-11 min-w-0 flex-1 rounded-lg border border-slate-300 px-3 text-sm transition-all duration-200 hover:border-slate-400 focus:border-brand-dark focus:ring-2 focus:ring-brand/30 focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lg"
                >
                  <Search className="h-4 w-4" /> Search
                </button>
              </div>
              <p className="mt-1.5 text-xs text-slate-500">Enter a part name or part number.</p>
            </form>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-[124px] max-h-[calc(100vh-140px)] overflow-y-auto overscroll-contain rounded-2xl [scrollbar-width:thin]">
                <Reveal direction="right">{filterPanel}</Reveal>
              </div>
            </aside>

            <div className="min-w-0">
              {/* Results header */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-ink">All parts &amp; accessories</h2>
                  <p className="text-sm text-slate-600" aria-live="polite">
                    <strong key={results.length} className="inline-block animate-pop text-ink">
                      {results.length}
                    </strong>{" "}
                    {results.length === 1 ? "part" : "parts"} in {region}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFiltersOpen((o) => !o)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4" /> Filters
                    {activeCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold">{activeCount}</span>}
                  </button>
                  <label className="relative flex items-center">
                    <span className="sr-only">Sort parts</span>
                    <select
                      value={sort}
                      onChange={(e) => {
                        setSort(e.target.value as SortId);
                        flash();
                      }}
                      className="h-9 cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white pr-9 pl-3 text-xs font-semibold text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
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
                    <button
                      type="button"
                      onClick={() => setOrderInfo((o) => !o)}
                      aria-expanded={orderInfo}
                      className="text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-ink"
                    >
                      How results are ordered
                    </button>
                    {orderInfo && (
                      <div className="absolute top-full right-0 z-20 mt-2 w-72 animate-fade-up rounded-xl bg-navy p-4 text-xs leading-relaxed text-slate-200 shadow-2xl">
                        <p className="flex items-center gap-1.5 font-semibold text-white">
                          <CircleHelp className="h-3.5 w-3.5 text-brand" /> How results are ordered
                        </p>
                        <p className="mt-2">
                          By relevance to your search and vehicle, then listing completeness. Sponsored items are labelled and
                          payment doesn&apos;t change the order.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Active chips */}
              {(vehicle || query) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {vehicle && (
                    <button
                      type="button"
                      onClick={() => {
                        setFitOnly((f) => !f);
                        flash();
                      }}
                      aria-pressed={fitOnly}
                      className={`inline-flex animate-fade-up items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                        fitOnly ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-slate-300 text-slate-600 hover:border-ink"
                      }`}
                    >
                      {fitOnly && <Check className="h-3.5 w-3.5" />} Only parts that fit my {vehicle.label.split(" · ")[0]}
                    </button>
                  )}
                  {query && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setQueryInput("");
                        flash();
                      }}
                      className="group inline-flex animate-fade-up items-center gap-1.5 rounded-full border border-brand bg-brand-light px-3 py-1 text-xs font-semibold text-ink hover:bg-brand"
                    >
                      “{query}” <X className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
                    </button>
                  )}
                </div>
              )}

              {/* Mobile filters */}
              <div className={`grid transition-[grid-template-rows] duration-500 lg:hidden ${filtersOpen ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">{filterPanel}</div>
              </div>

              {/* Grid */}
              <div className="mt-5">
                {loading ? (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }, (_, i) => (
                      <div key={i} className="space-y-3 rounded-2xl border border-slate-200 p-4">
                        <div className="skeleton h-4 w-24 rounded" />
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
                    <h3 className="mt-4 text-lg font-bold text-ink">
                      {region !== PARTS_COUNTRY ? `No parts listed in ${region} yet` : "No matching parts found"}
                    </h3>
                    <p className="mt-1 max-w-sm text-sm text-slate-500">
                      {region !== PARTS_COUNTRY
                        ? "Parts for this market are coming soon."
                        : "We won't suggest parts that may not fit. Try another category or search by part number."}
                    </p>
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

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
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

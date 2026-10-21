"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown, CircleHelp, Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { useRegion } from "@/lib/region";
import PartsHero from "@/components/parts/PartsHero";
import ShopCards from "@/components/parts/ShopCards";
import { PARTS_COUNTRY, categories, parts, vehicles, type Category, type VehicleId } from "@/components/parts/data";
import OemPartCard from "./OemPartCard";

const LOADING_MS = 400;
const conditions = ["New", "Used", "Remanufactured"] as const;
type Condition = (typeof conditions)[number];

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

const oemParts = parts.filter((p) => p.type === "oem");
const manufacturers = Array.from(new Set(oemParts.map((p) => p.brand))).sort();
const conditionOf = (p: (typeof oemParts)[number]): Condition => (p.condition === "Used" || p.condition === "Remanufactured" ? p.condition : "New");

export default function OemBrowser({ initialVehicle }: { initialVehicle?: VehicleId }) {
  const region = useRegion();
  const [vehicleId, setVehicleId] = useState<string>(initialVehicle ?? "");
  const [fitOnly, setFitOnly] = useState(!!initialVehicle);
  const [cats, setCats] = useState<Category[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [conds, setConds] = useState<Condition[]>([]);
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [orderInfo, setOrderInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadingTimer = useRef<number | undefined>(undefined);

  const flash = useCallback(() => {
    window.clearTimeout(loadingTimer.current);
    setLoading(true);
    loadingTimer.current = window.setTimeout(() => setLoading(false), LOADING_MS);
  }, []);
  useEffect(() => () => window.clearTimeout(loadingTimer.current), []);

  const vehicle = vehicles.find((v) => v.id === vehicleId) ?? null;
  const inRegion = region === PARTS_COUNTRY ? oemParts : [];

  const scrollTo = (id: string) => window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  const toggle = <T,>(list: T[], value: T) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  const change = (fn: () => void) => {
    fn();
    flash();
  };

  const resetFilters = () =>
    change(() => {
      setCats([]);
      setBrands([]);
      setConds([]);
      setQuery("");
      setQueryInput("");
      setFitOnly(false);
    });

  const results = useMemo(() => {
    const q = normalise(query);
    const list = inRegion.filter(
      (p) =>
        (!cats.length || (p.category && cats.includes(p.category))) &&
        (!brands.length || brands.includes(p.brand)) &&
        (!conds.length || conds.includes(conditionOf(p))) &&
        (!q || [p.name, p.partNo, p.brand].some((s) => normalise(s).includes(q))) &&
        (!fitOnly || !vehicle || p.fits?.includes(vehicle.id as never)),
    );
    if (sort === "relevance") return list;
    const dir = sort === "price-asc" ? 1 : -1;
    return [...list].sort((a, b) => (a.price === undefined ? 1 : b.price === undefined ? -1 : (a.price - b.price) * dir));
  }, [inRegion, cats, brands, conds, query, fitOnly, vehicle, sort]);

  // Category pills only show categories that have OEM parts.
  const pillCategories = categories.filter((c) => inRegion.some((p) => p.category === c));
  const activeCount = cats.length + brands.length + conds.length + (query ? 1 : 0);
  const resultsKey = JSON.stringify([cats, brands, conds, query, fitOnly, vehicleId, sort, region]);

  const filterPanel = (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between px-4 py-3.5">
        <h2 className="text-base font-bold text-ink">Filters</h2>
        <button type="button" onClick={resetFilters} className="text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-ink">
          Reset
        </button>
      </div>
      <Group title="Category">
        {pillCategories.map((c) => (
          <CheckOption key={c} label={c} checked={cats.includes(c)} onChange={() => change(() => setCats((x) => toggle(x, c)))} />
        ))}
      </Group>
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
      <Group title="Manufacturer">
        {manufacturers.map((m) => (
          <CheckOption key={m} label={m} checked={brands.includes(m)} onChange={() => change(() => setBrands((x) => toggle(x, m)))} />
        ))}
      </Group>
      <Group title="Condition">
        {conditions.map((c) => (
          <CheckOption key={c} label={c} checked={conds.includes(c)} onChange={() => change(() => setConds((x) => toggle(x, c)))} />
        ))}
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
            scrollTo("explore-oem");
          })
        }
        onClear={() => change(() => { setVehicleId(""); setFitOnly(false); })}
      />

      <ShopCards active="oem" />

      <section id="explore-oem" className="scroll-mt-28 bg-white pt-10 pb-20">
        <div className={container}>
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Explore OEM Parts</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-slate-600">
              Browse OEM-classified parts from participating sellers. Review the exact part number, product details and
              evidence before you buy.
            </p>
          </Reveal>

          {/* Category pills */}
          <Reveal delay={150}>
            <div className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap">
              {[{ label: "All OEM-classified", value: null as Category | null, count: inRegion.length }, ...pillCategories.map((c) => ({ label: c, value: c, count: inRegion.filter((p) => p.category === c).length }))].map(
                ({ label, value, count }) => {
                  const active = value ? cats.length === 1 && cats[0] === value : cats.length === 0;
                  return (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={active}
                      onClick={() => change(() => setCats(value ? [value] : []))}
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

          {/* Search */}
          <Reveal delay={200}>
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                change(() => setQuery(queryInput.trim()));
              }}
              className="mt-6 max-w-xl"
            >
              <label htmlFor="oem-search" className="text-[13px] font-bold text-ink">
                Search parts or manufacturer part number
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="oem-search"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  className="h-11 min-w-0 flex-1 rounded-lg border border-slate-300 px-3 text-sm transition-all duration-200 hover:border-slate-400 focus:border-brand-dark focus:ring-2 focus:ring-brand/30 focus:outline-none"
                />
                <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lg">
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
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-ink">OEM-classified parts</h3>
                  <p className="text-sm text-slate-600" aria-live="polite">
                    <strong key={results.length} className="inline-block animate-pop text-ink">
                      {results.length}
                    </strong>{" "}
                    OEM-classified {results.length === 1 ? "part" : "parts"} in {region}
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
                    <span className="sr-only">Sort parts</span>
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

              {query && (
                <button
                  type="button"
                  onClick={() => change(() => { setQuery(""); setQueryInput(""); })}
                  className="group mt-4 inline-flex animate-fade-up items-center gap-1.5 rounded-full border border-brand bg-brand-light px-3 py-1 text-xs font-semibold text-ink hover:bg-brand"
                >
                  “{query}” <X className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
                </button>
              )}
              {vehicle && fitOnly && (
                <p className="mt-4 flex animate-fade-up items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <Check className="h-3.5 w-3.5" /> Showing parts checked for your {vehicle.make} {vehicle.label.split(" · ")[0]}
                </p>
              )}

              <div className={`grid transition-[grid-template-rows] duration-500 lg:hidden ${filtersOpen ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">{filterPanel}</div>
              </div>

              <div className="mt-5">
                {loading ? (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }, (_, i) => (
                      <div key={i} className="space-y-3 rounded-2xl border border-slate-200 p-4">
                        <div className="skeleton h-4 w-32 rounded" />
                        <div className="skeleton h-4 w-4/5 rounded" />
                        <div className="skeleton h-3 w-3/5 rounded" />
                        <div className="skeleton h-12 w-full rounded" />
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
                    <h4 className="mt-4 text-lg font-bold text-ink">{region !== PARTS_COUNTRY ? `No OEM parts listed in ${region} yet` : "No matching OEM parts"}</h4>
                    <p className="mt-1 max-w-sm text-sm text-slate-500">
                      {region !== PARTS_COUNTRY ? "Parts for this market are coming soon." : "Try another category, manufacturer or part number."}
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
                        <OemPartCard part={p} vehicle={vehicle ? { id: vehicle.id, label: vehicle.label } : null} />
                      </Reveal>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
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

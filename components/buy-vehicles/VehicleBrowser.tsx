"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bookmark, BookmarkCheck, ChevronDown, Info, SearchX, SlidersHorizontal, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { DEFAULT_REGION, setRegion, useRegion } from "@/lib/region";
import BrowseHero from "./BrowseHero";
import FilterPanel from "./FilterPanel";
import VehicleCard, { VehicleCardSkeleton } from "./VehicleCard";
import CompareBar, { MAX_COMPARE } from "./CompareBar";
import CompareModal from "./CompareModal";
import {
  categoryPresets,
  countActiveFilters,
  emptyFilters,
  getResults,
  listings,
  regionHasListings,
  sortOptions,
  type Filters,
  type SortId,
  type TabId,
} from "./data";

const LOADING_MS = 450;
const STORAGE_KEY = "dx-buy-vehicles";

/** Saved and compared vehicles survive a page refresh (per browser). */
function readStored(): { saved: string[]; compare: string[] } {
  try {
    const raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    const valid = (ids: unknown) =>
      Array.isArray(ids) ? ids.filter((id) => listings.some((l) => l.id === id)) : [];
    return { saved: valid(raw.saved), compare: valid(raw.compare).slice(0, MAX_COMPARE) };
  } catch {
    return { saved: [], compare: [] };
  }
}

type VehicleBrowserProps = {
  initialTab: TabId;
  initialCategory?: string;
  initialSort?: SortId;
};

const filtersFor = (category?: string): Filters => ({ ...emptyFilters, ...(category ? categoryPresets[category]?.filters : {}) });

export default function VehicleBrowser({ initialTab, initialCategory, initialSort = "relevant" }: VehicleBrowserProps) {
  const region = useRegion();
  const [tab, setTab] = useState<TabId>(initialTab);
  const [category, setCategory] = useState(initialCategory);
  const [draft, setDraft] = useState<Filters>(() => filtersFor(initialCategory));
  const [applied, setApplied] = useState<Filters>(() => filtersFor(initialCategory));
  const [sort, setSort] = useState<SortId>(initialSort);
  const [moreOpen, setMoreOpen] = useState(initialTab === "advanced");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [searchSaved, setSearchSaved] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const loadingTimer = useRef<number | undefined>(undefined);

  // Show a short skeleton state whenever the result set changes.
  const flashLoading = useCallback(() => {
    window.clearTimeout(loadingTimer.current);
    setLoading(true);
    setSearchSaved(false);
    loadingTimer.current = window.setTimeout(() => setLoading(false), LOADING_MS);
  }, []);

  useEffect(() => () => window.clearTimeout(loadingTimer.current), []);

  useEffect(() => {
    const stored = readStored();
    setSaved(stored.saved);
    setCompare(stored.compare);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ saved, compare }));
    } catch {
      // Storage can be unavailable (private mode) — selections just won't persist.
    }
  }, [saved, compare, hydrated]);

  // Region changes (here or in the footer) reload the results.
  const previousRegion = useRef(region);
  useEffect(() => {
    if (previousRegion.current === region) return;
    previousRegion.current = region;
    flashLoading();
  }, [region, flashLoading]);

  // Close the comparison once there's nothing left in it.
  useEffect(() => {
    if (compare.length === 0) setCompareOpen(false);
  }, [compare.length]);

  // Footer / menu links to /buy-vehicles?… while already on this page.
  const lastLink = useRef(JSON.stringify([initialTab, initialCategory, initialSort]));
  useEffect(() => {
    const link = JSON.stringify([initialTab, initialCategory, initialSort]);
    if (link === lastLink.current) return;
    lastLink.current = link;
    setTab(initialTab);
    if (initialTab === "advanced") setMoreOpen(true);
    setCategory(initialCategory);
    setDraft(filtersFor(initialCategory));
    setApplied(filtersFor(initialCategory));
    setSort(initialSort);
    flashLoading();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [initialTab, initialCategory, initialSort, flashLoading]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const changeTab = (next: TabId) => {
    setTab(next);
    if (next === "advanced") setMoreOpen(true);
    const url = next === "all" ? window.location.pathname : `${window.location.pathname}?type=${next}`;
    window.history.replaceState(null, "", url);
    flashLoading();
  };

  const applyFilters = () => {
    setApplied(draft);
    setDrawerOpen(false);
    flashLoading();
    if (window.innerWidth < 1024) resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearFilters = () => {
    setDraft(emptyFilters);
    setApplied(emptyFilters);
    setCategory(undefined);
    flashLoading();
  };

  const clearCategory = () => {
    setCategory(undefined);
    flashLoading();
  };

  const changeSort = (next: SortId) => {
    setSort(next);
    flashLoading();
  };

  const closeCompare = useCallback(() => setCompareOpen(false), []);

  const toggleSaved = (id: string) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleCompare = (id: string) =>
    setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length < MAX_COMPARE ? [...c, id] : c));

  const results = useMemo(() => getResults(region, tab, applied, sort, category), [region, tab, applied, sort, category]);
  const activeCount = countActiveFilters(applied);
  const dirty = JSON.stringify(draft) !== JSON.stringify(applied);
  const compareItems = compare.map((id) => listings.find((l) => l.id === id)!).filter(Boolean);
  const resultsKey = JSON.stringify([region, tab, applied, sort, category]);
  const categoryChip = category && categoryPresets[category]?.match ? categoryPresets[category].label : null;
  const emptyRegion = !regionHasListings(region);

  const panelProps = {
    draft,
    onChange: (patch: Partial<Filters>) => setDraft((d) => ({ ...d, ...patch })),
    onApply: applyFilters,
    onClear: clearFilters,
    moreOpen,
    onToggleMore: () => setMoreOpen((o) => !o),
    dirty,
  };

  return (
    <>
      <BrowseHero activeTab={tab} onTabChange={changeTab} region={region} />

      <section className="bg-white py-8 lg:py-10">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-4 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <Reveal direction="right" className="sticky top-[132px]">
              <FilterPanel {...panelProps} className="max-h-[calc(100vh-150px)]" />
            </Reveal>
          </aside>

          <div ref={resultsRef} className="min-w-0 scroll-mt-32">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-ink transition-all hover:border-ink lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeCount > 0 && (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold">
                      {activeCount}
                    </span>
                  )}
                </button>
                <p className="text-sm text-slate-600" aria-live="polite">
                  <strong key={results.length} className="inline-block animate-pop text-base text-ink">
                    {results.length}
                  </strong>{" "}
                  {results.length === 1 ? "vehicle" : "vehicles"} in {region}
                </p>
                {categoryChip && (
                  <button
                    type="button"
                    onClick={clearCategory}
                    aria-label={`Remove ${categoryChip} filter`}
                    className="group inline-flex animate-fade-up items-center gap-1.5 rounded-full border border-brand bg-brand-light px-3 py-1 text-xs font-semibold text-ink transition-all hover:bg-brand"
                  >
                    {categoryChip}
                    <X className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-90" />
                  </button>
                )}
              </div>

              <label className="relative flex items-center">
                <span className="sr-only">Sort results</span>
                <select
                  value={sort}
                  onChange={(e) => changeSort(e.target.value as SortId)}
                  className="h-9 cursor-pointer appearance-none rounded-full border border-slate-300 bg-white pr-9 pl-4 text-xs font-semibold text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
                >
                  {sortOptions.map((o) => (
                    <option key={o.id} value={o.id}>
                      Sort: {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-500" />
              </label>
            </div>

            {/* Results */}
            <div className="mt-5">
              {loading ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: Math.max(3, Math.min(results.length, 6)) }, (_, i) => (
                    <VehicleCardSkeleton key={i} />
                  ))}
                </div>
              ) : results.length === 0 ? (
                <div className="flex animate-fade-up flex-col items-center rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-slate-100">
                    <SearchX className="h-6 w-6 text-slate-500" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">
                    {emptyRegion ? `No vehicles listed in ${region} yet` : "No vehicles match these filters"}
                  </h3>
                  <p className="mt-1 max-w-sm text-sm text-slate-500">
                    {emptyRegion
                      ? "Listings for this region are coming soon. You can browse another region in the meantime."
                      : "Try removing a filter or choosing a different category."}
                  </p>
                  <button
                    type="button"
                    onClick={() => (emptyRegion ? setRegion(DEFAULT_REGION) : clearFilters())}
                    className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    {emptyRegion ? `View ${DEFAULT_REGION} listings` : "Clear all filters"}
                  </button>
                </div>
              ) : (
                <div key={resultsKey} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map((l, i) => (
                    <Reveal key={l.id} delay={(i % 3) * 90} className="h-full">
                      <VehicleCard
                        listing={l}
                        priority={i < 3}
                        saved={saved.includes(l.id)}
                        onToggleSave={() => toggleSaved(l.id)}
                        comparing={compare.includes(l.id)}
                        onToggleCompare={() => toggleCompare(l.id)}
                        compareFull={compare.length >= MAX_COMPARE}
                      />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>

            {/* Footnote */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5">
              <p className="flex max-w-xl gap-2 text-xs text-slate-500">
                <Info className="mt-px h-3.5 w-3.5 shrink-0" />
                Example listings for design review. Sponsored listings are labelled; sort order is not affected by payment.
              </p>
              <button
                type="button"
                onClick={() => setSearchSaved((s) => !s)}
                aria-pressed={searchSaved}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  searchSaved ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-slate-300 text-ink hover:border-ink"
                }`}
              >
                {searchSaved ? <BookmarkCheck className="h-4 w-4 animate-pop" /> : <Bookmark className="h-4 w-4" />}
                {searchSaved ? "Search saved" : "Save this search"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${drawerOpen ? "" : "pointer-events-none"}`} aria-hidden={!drawerOpen}>
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-full max-w-sm p-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <FilterPanel {...panelProps} onClose={() => setDrawerOpen(false)} className="h-full w-full" />
        </div>
      </div>

      <CompareBar
        items={compareItems}
        onRemove={toggleCompare}
        onClear={() => setCompare([])}
        onCompare={() => setCompareOpen(true)}
      />
      <CompareModal
        open={compareOpen}
        items={compareItems}
        onClose={closeCompare}
        onRemove={toggleCompare}
      />
    </>
  );
}

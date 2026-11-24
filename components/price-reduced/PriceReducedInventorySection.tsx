"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { useRegion } from "@/lib/region";
import PriceReducedCard from "./PriceReducedCard";
import {
  PAGE_SIZE,
  PRICES_CHECKED,
  bodyStyles,
  conditions,
  emptyFilters,
  filterListings,
  formatDate,
  formatGbp,
  makes,
  minReductionOptions,
  priceOptions,
  sortOptions,
  withinOptions,
  type Filters,
  type SortId,
} from "./data";

const LISTING_REGION = "United Kingdom";

const selectClass =
  "mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[13px] text-ink focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-xs font-bold text-ink">
      {label}
      {children}
    </label>
  );
}

export default function PriceReducedInventorySection() {
  const region = useRegion();
  const inRegion = region === LISTING_REGION;
  const [draft, setDraft] = useState<Filters>(emptyFilters);
  const [applied, setApplied] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState<SortId>("recommended");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [saved, setSaved] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const set = (patch: Partial<Filters>) => setDraft((d) => ({ ...d, ...patch }));

  const results = inRegion ? filterListings(applied, sort) : [];
  const draftCount = inRegion ? filterListings(draft, sort).length : 0;
  const shown = results.slice(0, visible);

  const apply = (e: FormEvent) => {
    e.preventDefault();
    setApplied(draft);
    setVisible(PAGE_SIZE);
    setFiltersOpen(false);
  };

  const clear = () => {
    setDraft(emptyFilters);
    setApplied(emptyFilters);
    setVisible(PAGE_SIZE);
  };

  const toggleSave = (id: string) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <section className="bg-white py-10 md:py-14">
      <div className={`${container} grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]`}>
        <div>
          <button
            type="button"
            onClick={() => setFiltersOpen((o) => !o)}
            aria-expanded={filtersOpen}
            aria-controls="price-reduced-filters"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold text-ink lg:hidden"
          >
            <SlidersHorizontal aria-hidden className="h-4 w-4" />
            {filtersOpen ? "Hide filters" : "Filter reduced vehicles"}
          </button>

          <form
            id="price-reduced-filters"
            onSubmit={apply}
            aria-label="Filter reduced vehicles"
            className={`${filtersOpen ? "mt-4 block" : "hidden"} rounded-2xl border border-slate-200 p-4 lg:sticky lg:top-28 lg:mt-0 lg:block`}
          >
            <h2 className="text-[13px] font-bold text-ink">Filter reduced vehicles</h2>

            <div className="mt-4 space-y-3.5">
              <Field label="Make">
                <select value={draft.make} onChange={(e) => set({ make: e.target.value })} className={selectClass}>
                  <option value="">Any make</option>
                  {makes.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </Field>
              <Field label="Body style">
                <select value={draft.body} onChange={(e) => set({ body: e.target.value })} className={selectClass}>
                  <option value="">Any</option>
                  {bodyStyles.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </Field>
              <Field label="New or used">
                <select value={draft.condition} onChange={(e) => set({ condition: e.target.value })} className={selectClass}>
                  <option value="">Any</option>
                  {conditions.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Current advertised price">
                <select value={draft.maxPrice} onChange={(e) => set({ maxPrice: e.target.value })} className={selectClass}>
                  <option value="">Any price</option>
                  {priceOptions.map((p) => (
                    <option key={p} value={p}>
                      Up to {formatGbp(p)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Minimum verified reduction">
                <select value={draft.minReduction} onChange={(e) => set({ minReduction: e.target.value })} className={selectClass}>
                  <option value="">Any amount</option>
                  {minReductionOptions.map((r) => (
                    <option key={r} value={r}>
                      {formatGbp(r)} or more
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Price reduced within">
                <select value={draft.withinDays} onChange={(e) => set({ withinDays: e.target.value })} className={selectClass}>
                  <option value="">Any time</option>
                  {withinOptions.map((o) => (
                    <option key={o.days} value={o.days}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              <div>
                <Field label="City or postal code (optional)">
                  <input
                    value={draft.location}
                    onChange={(e) => set({ location: e.target.value })}
                    autoComplete="address-level2"
                    aria-describedby="price-reduced-location-hint"
                    className={selectClass}
                  />
                </Field>
                <p id="price-reduced-location-hint" className="mt-1 text-[11px] leading-snug text-slate-500">
                  Choose a location to see nearby vehicles.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-start gap-2">
              <button
                type="submit"
                className="inline-flex h-10 items-center rounded-full bg-brand px-4 text-xs font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg"
              >
                Show {draftCount} {draftCount === 1 ? "vehicle" : "vehicles"}
              </button>
              <button
                type="button"
                onClick={clear}
                className="inline-flex h-9 items-center rounded-full px-4 text-xs font-semibold text-ink transition-colors hover:bg-slate-50"
              >
                Clear all
              </button>
            </div>
          </form>
        </div>

        <div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">Vehicles with a verified price reduction</h2>
              <p className="mt-1 text-sm text-slate-600" aria-live="polite">
                <strong className="text-ink">
                  {results.length} {results.length === 1 ? "vehicle matches" : "vehicles match"} your filters
                </strong>{" "}
                · prices checked {formatDate(PRICES_CHECKED)}
              </p>
            </div>
            <label className="text-xs font-bold text-ink">
              Sort vehicles
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                className={`${selectClass} min-w-[180px]`}
              >
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center">
              <h3 className="text-lg font-bold text-ink">No reduced vehicles match</h3>
              <p className="mt-2 text-sm text-slate-600">
                {inRegion
                  ? "Try a smaller minimum reduction, a longer time window or clearing some filters."
                  : `There are no price-reduced listings in ${region} yet. Try changing your region.`}
              </p>
            </div>
          ) : (
            <>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                {shown.map((l, i) => (
                  <Reveal as="li" key={l.id} delay={(i % PAGE_SIZE) * 60}>
                    <PriceReducedCard
                      listing={l}
                      saved={saved.includes(l.id)}
                      onToggleSave={() => toggleSave(l.id)}
                      priority={i < 2}
                    />
                  </Reveal>
                ))}
              </ul>
              {visible < results.length && (
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="inline-flex h-10 items-center rounded-full border border-slate-300 px-5 text-xs font-semibold text-ink transition-colors hover:border-ink"
                  >
                    Load more vehicles
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

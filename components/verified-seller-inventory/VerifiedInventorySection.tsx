"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { BadgeCheck, LocateFixed, SlidersHorizontal } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { useRegion } from "@/lib/region";
import VerifiedListingCard from "./VerifiedListingCard";
import {
  PAGE_SIZE,
  STATUS_CONFIRMED,
  bodies,
  conditions,
  emptyFilters,
  filterListings,
  formatGbp,
  formatMiles,
  fuels,
  makes,
  mileageOptions,
  modelsFor,
  priceOptions,
  sellerTypes,
  sortOptions,
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

export default function VerifiedInventorySection() {
  const region = useRegion();
  const [draft, setDraft] = useState<Filters>(emptyFilters);
  const [applied, setApplied] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState<SortId>("relevant");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [saved, setSaved] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationNote, setLocationNote] = useState("");

  const set = (patch: Partial<Filters>) => setDraft((d) => ({ ...d, ...patch }));

  const results = region === LISTING_REGION ? filterListings(applied, sort) : [];
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
    setLocationNote("");
  };

  const useMyLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationNote("Location isn't available in this browser. Enter a city or postal area instead.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        set({ location: "Current location" });
        setLocationNote("Using your current location.");
        setLocating(false);
      },
      () => {
        setLocationNote("We couldn't get your location. Enter a city or postal area instead.");
        setLocating(false);
      },
    );
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
            aria-controls="verified-filters"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold text-ink lg:hidden"
          >
            <SlidersHorizontal aria-hidden className="h-4 w-4" />
            {filtersOpen ? "Hide filters" : "Refine your search"}
          </button>

          <form
            id="verified-filters"
            onSubmit={apply}
            aria-label="Refine your vehicle search"
            className={`${filtersOpen ? "mt-4 block" : "hidden"} rounded-2xl border border-slate-200 p-4 lg:sticky lg:top-28 lg:mt-0 lg:block`}
          >
            <h2 className="text-[13px] font-bold text-ink">Refine your vehicle search</h2>

            <div className="mt-3 rounded-lg bg-emerald-50 p-3">
              <p className="text-xs font-bold text-ink">Verified Seller eligibility</p>
              <p className="mt-1 flex items-center gap-2 text-xs text-emerald-700">
                <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                Always on for this page
              </p>
            </div>

            <div className="mt-4 space-y-3.5">
              <Field label="Make">
                <select value={draft.make} onChange={(e) => set({ make: e.target.value, model: "" })} className={selectClass}>
                  <option value="">Choose make</option>
                  {makes.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </Field>
              <Field label="Model">
                <select value={draft.model} onChange={(e) => set({ model: e.target.value })} className={selectClass}>
                  <option value="">Choose model</option>
                  {modelsFor(draft.make).map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </Field>
              <Field label="Body type">
                <select value={draft.body} onChange={(e) => set({ body: e.target.value })} className={selectClass}>
                  <option value="">Any</option>
                  {bodies.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </Field>
              <Field label="Fuel">
                <select value={draft.fuel} onChange={(e) => set({ fuel: e.target.value })} className={selectClass}>
                  <option value="">Any</option>
                  {fuels.map((f) => (
                    <option key={f}>{f}</option>
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
              <Field label="Mileage">
                <select value={draft.maxMileage} onChange={(e) => set({ maxMileage: e.target.value })} className={selectClass}>
                  <option value="">Any</option>
                  {mileageOptions.map((m) => (
                    <option key={m} value={m}>
                      Up to {formatMiles(m)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Seller type">
                <select value={draft.sellerType} onChange={(e) => set({ sellerType: e.target.value })} className={selectClass}>
                  <option value="">Any</option>
                  {sellerTypes.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="City or postal area (optional)">
                <input
                  value={draft.location}
                  onChange={(e) => set({ location: e.target.value })}
                  autoComplete="address-level2"
                  className={selectClass}
                />
              </Field>
              <div>
                <button
                  type="button"
                  onClick={useMyLocation}
                  disabled={locating}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900 disabled:opacity-60"
                >
                  <LocateFixed aria-hidden className="h-3.5 w-3.5" />
                  {locating ? "Finding your location…" : "Use my location"}
                </button>
                <p className="mt-1 text-[11px] leading-snug text-slate-500" aria-live="polite">
                  {locationNote || "Location is optional. We never use it without asking."}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-start gap-2">
              <button
                type="submit"
                className="inline-flex h-10 items-center rounded-full bg-brand px-4 text-xs font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg"
              >
                Show matching vehicles
              </button>
              <button
                type="button"
                onClick={clear}
                className="inline-flex h-9 items-center rounded-full border border-slate-300 px-4 text-xs font-semibold text-ink transition-colors hover:border-ink"
              >
                Clear other filters
              </button>
            </div>
          </form>
        </div>

        <div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">Available vehicles from verified sellers</h2>
              <p className="mt-1 text-sm text-slate-600" aria-live="polite">
                <strong className="text-ink">
                  {results.length} matching {results.length === 1 ? "vehicle" : "vehicles"}
                </strong>{" "}
                · seller status confirmed {STATUS_CONFIRMED}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white">
                <BadgeCheck aria-hidden className="h-3.5 w-3.5" />
                Verified sellers
              </span>
            </div>
            <label className="text-xs font-bold text-ink">
              Sort
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
              <h3 className="text-lg font-bold text-ink">No verified sellers match</h3>
              <p className="mt-2 text-sm text-slate-600">
                {region === LISTING_REGION
                  ? "Try clearing some filters or widening your location."
                  : `There's no verified seller inventory in ${region} yet. Try changing your region.`}
              </p>
            </div>
          ) : (
            <>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                {shown.map((l, i) => (
                  <Reveal as="li" key={l.id} delay={(i % PAGE_SIZE) * 60}>
                    <VerifiedListingCard
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

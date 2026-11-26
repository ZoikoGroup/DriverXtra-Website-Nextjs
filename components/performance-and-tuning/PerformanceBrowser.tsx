"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Car, Check, ChevronDown, FlaskConical, SearchX, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { hrefFor } from "@/lib/navigation";
import { regions, setRegion, useRegion, type RegionName } from "@/lib/region";
import { vehicles, type VehicleId } from "@/components/parts/data";
import { details, getServerSnapshot, getSnapshot, parse, subscribe } from "@/components/use-my-garage/garage-store";
import {
  CATALOG_UPDATED,
  families,
  fitLabels,
  intendedUses,
  products,
  roadUseLabels,
  type Fit,
  type IntendedUse,
  type Product,
  type RoadUse,
} from "./data";

const field =
  "h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white px-3 pr-9 text-sm text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none";
const linkCls = "font-medium text-blue-700 underline underline-offset-2 transition-colors hover:text-gold";
const MAX_COMPARE = 3;
const sorts = ["Relevance", "Price: low to high", "Price: high to low", "Name"] as const;

function Dropdown({ id, label, value, onChange, children, className = "" }: { id: string; label: string; value: string; onChange: (v: string) => void; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[12px] font-semibold text-ink">
        {label}
      </label>
      <span className="relative mt-1.5 block">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={field}>
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </span>
    </div>
  );
}

function Status({ dot, text, label }: { dot: string; text: string; label: string }) {
  return (
    <span className={`flex items-center gap-2 ${text}`}>
      <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

const installText = {
  basic: { label: "Basic tools", dot: "border border-slate-400 bg-white", text: "text-slate-600" },
  professional: { label: "Professional review", dot: "bg-amber-600", text: "text-amber-700" },
};

/** Modal built on <dialog>, so Escape, focus trapping and the backdrop come from the browser. */
function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
  }, []);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-label={title}
      className={`m-auto w-[calc(100%-2rem)] animate-fade-up rounded-2xl bg-white p-0 text-ink shadow-2xl backdrop:bg-navy/60 backdrop:backdrop-blur-sm ${wide ? "max-w-4xl" : "max-w-lg"}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
        <h2 className="text-[16px] font-bold">{title}</h2>
        <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-slate-100">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-[75vh] overflow-y-auto p-5">{children}</div>
    </dialog>
  );
}

/** Upgrade catalog with vehicle, market and intended-use context, filters, compare and details. */
export default function PerformanceBrowser() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const garage = useMemo(() => parse(raw), [raw]);
  const market = useRegion();

  const [vehicleChoice, setVehicleChoice] = useState<string | null>(null);
  const [use, setUse] = useState<IntendedUse>("Not sure");
  const [family, setFamily] = useState("all");
  const [fitFilter, setFitFilter] = useState("any");
  const [roadFilter, setRoadFilter] = useState("any");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Relevance");
  const [compare, setCompare] = useState<string[]>([]);
  const [modal, setModal] = useState<{ kind: "details"; id: string } | { kind: "compare" } | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // null = untouched, so the active garage vehicle is preselected.
  const activeGarage = garage.vehicles.find((v) => v.uid === garage.active);
  const vehicleValue = vehicleChoice ?? (activeGarage ? `g:${activeGarage.uid}` : "");

  const vehicle = useMemo(() => {
    if (vehicleValue.startsWith("g:")) {
      const g = garage.vehicles.find((v) => v.uid === vehicleValue.slice(2));
      const info = g && details(g.vehicleId);
      return info ? { id: info.id as VehicleId, label: `${g.year} ${info.make} ${info.model}` } : null;
    }
    const info = vehicleValue.startsWith("v:") ? details(vehicleValue.slice(2)) : null;
    return info ? { id: info.id as VehicleId, label: `${info.make} ${info.model}` } : null;
  }, [vehicleValue, garage]);

  const fitOf = (p: Product): { fit: Fit; note?: string } => (vehicle ? (p.fits[vehicle.id] ?? { fit: "not-listed" }) : { fit: "unverified" });
  const roadOf = (p: Product): RoadUse => p.roadUse[market] ?? "not-confirmed";

  const rows = products
    .filter((p) => (family === "all" || p.family === family) && (fitFilter === "any" || fitOf(p).fit === fitFilter) && (roadFilter === "any" || roadOf(p) === roadFilter))
    .sort((a, b) => (sort === "Price: low to high" ? a.price - b.price : sort === "Price: high to low" ? b.price - a.price : sort === "Name" ? a.name.localeCompare(b.name) : 0));

  const filtered = family !== "all" || fitFilter !== "any" || roadFilter !== "any";
  const clearFilters = () => {
    setFamily("all");
    setFitFilter("any");
    setRoadFilter("any");
  };

  const toggleCompare = (id: string) => {
    if (compare.includes(id)) {
      setCompare(compare.filter((x) => x !== id));
      setNotice(null);
    } else if (compare.length >= MAX_COMPARE) {
      setNotice(`You can compare up to ${MAX_COMPARE} products. Remove one to add another.`);
    } else {
      setCompare([...compare, id]);
      setNotice(null);
    }
  };

  const focusVehicle = () => {
    const el = document.getElementById("pt-vehicle");
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus({ preventScroll: true });
  };

  const roadNote = (r: RoadUse) =>
    use === "Public roads" && r !== "offered"
      ? `Not confirmed for public roads in ${market}.`
      : use === "Track or competition" && r === "competition"
        ? "Matches your intended use. Not for public roads."
        : null;

  const detailProduct = modal?.kind === "details" ? products.find((p) => p.id === modal.id) : null;
  const compared = products.filter((p) => compare.includes(p.id));

  return (
    <>
      {/* Vehicle + market context */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        <Reveal className="h-full">
          <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_20px_40px_-28px_rgba(15,23,42,0.35)]">
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
              <Car className={`mt-0.5 h-5 w-5 shrink-0 ${vehicle ? "text-emerald-600" : "text-amber-600"}`} />
              <div aria-live="polite">
                <p className="text-[14px] font-bold text-ink">{vehicle ? vehicle.label : "No vehicle selected"}</p>
                <p className="text-[12px] text-slate-500">{vehicle ? "Fitment shown for this vehicle" : "Results aren't filtered by vehicle"}</p>
              </div>
            </div>
            <Dropdown id="pt-vehicle" label="Choose a vehicle" value={vehicleValue} onChange={setVehicleChoice} className="mt-4">
              <option value="">Choose a vehicle</option>
              {garage.vehicles.length > 0 && (
                <optgroup label="From your garage">
                  {garage.vehicles.map((g) => {
                    const info = details(g.vehicleId);
                    return info ? (
                      <option key={g.uid} value={`g:${g.uid}`}>
                        {g.year} {info.make} {info.model}
                      </option>
                    ) : null;
                  })}
                </optgroup>
              )}
              <optgroup label="Example vehicles">
                {vehicles.map((v) => (
                  <option key={v.id} value={`v:${v.id}`}>
                    {v.make} {v.label}
                  </option>
                ))}
              </optgroup>
            </Dropdown>
            <Link href={hrefFor("Use My Garage")} className={`mt-3 inline-block text-[12px] ${linkCls}`}>
              Use My Garage
            </Link>
          </div>
        </Reveal>
        <Reveal direction="left" delay={100} className="h-full">
          <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_20px_40px_-28px_rgba(15,23,42,0.35)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <Dropdown id="pt-market" label="Market" value={market} onChange={(v) => setRegion(v as RegionName)}>
                {regions.map((r) => (
                  <option key={r.code}>{r.name}</option>
                ))}
              </Dropdown>
              <Dropdown id="pt-use" label="Intended use" value={use} onChange={(v) => setUse(v as IntendedUse)}>
                {intendedUses.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </Dropdown>
            </div>
            <p className="mt-6 text-[12px] leading-relaxed text-slate-500">
              This is a filter, not a legal self-certification. Availability and permitted use may vary by region and intended use.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Filters + products */}
      <div id="products" className="mt-10 grid scroll-mt-28 items-start gap-6 lg:grid-cols-[220px_1fr]">
        <Reveal className="lg:sticky lg:top-32">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[14px] font-bold text-ink">Filter products</p>
            <Dropdown id="pt-family" label="Family" value={family} onChange={setFamily}>
              <option value="all">All families</option>
              {families.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </Dropdown>
            <Dropdown id="pt-fit" label="Fitment status" value={fitFilter} onChange={setFitFilter}>
              <option value="any">Any</option>
              {(Object.keys(fitLabels) as Fit[]).map((f) => (
                <option key={f} value={f}>
                  {fitLabels[f].label}
                </option>
              ))}
            </Dropdown>
            <Dropdown id="pt-road" label="Road-use status" value={roadFilter} onChange={setRoadFilter}>
              <option value="any">Any</option>
              {(Object.keys(roadUseLabels) as RoadUse[]).map((r) => (
                <option key={r} value={r}>
                  {roadUseLabels[r].label}
                </option>
              ))}
            </Dropdown>
            <button
              type="button"
              onClick={clearFilters}
              disabled={!filtered}
              className="h-10 w-full rounded-full border border-slate-300 text-[13px] font-semibold text-ink transition-all duration-300 enabled:hover:border-ink enabled:hover:bg-brand disabled:opacity-50"
            >
              Clear filters
            </button>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl font-extrabold text-ink">Products</span>
                <span aria-live="polite" className="text-[13px] text-slate-600">
                  <strong className="font-semibold text-ink">
                    {rows.length} {rows.length === 1 ? "product" : "products"}
                  </strong>{" "}
                  · catalog updated {CATALOG_UPDATED}
                </span>
              </p>
              <div className="flex items-center gap-3">
                <label htmlFor="pt-sort" className="text-[12px] font-semibold text-ink">
                  Sort
                </label>
                <span className="relative block w-48">
                  <select id="pt-sort" value={sort} onChange={(e) => setSort(e.target.value as (typeof sorts)[number])} className={field}>
                    {sorts.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                </span>
              </div>
            </div>
          </Reveal>

          {rows.length === 0 ? (
            <div className="mt-5 animate-fade-up rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <SearchX className="mx-auto h-6 w-6 text-slate-400" />
              <p className="mt-2 text-sm font-semibold text-ink">No products match these filters.</p>
              <button type="button" onClick={clearFilters} className="mt-3 text-sm font-semibold text-blue-700 underline underline-offset-4 transition-colors hover:text-gold">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {rows.map((p, i) => {
                const fit = fitOf(p);
                const road = roadOf(p);
                const note = roadNote(road);
                const checked = compare.includes(p.id);
                return (
                  <Reveal key={p.id} delay={(i % 2) * 100} className="h-full">
                    <article
                      className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)] ${
                        checked ? "border-brand ring-2 ring-brand/30" : "border-slate-200 hover:border-brand/60"
                      }`}
                    >
                      <div className="relative aspect-[16/9] overflow-hidden bg-navy">
                        <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                        <span className="absolute top-3 left-3 rounded bg-brand-light px-2 py-0.5 text-[10px] font-bold tracking-wide text-gold">EXAMPLE</span>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="text-[15px] font-bold text-ink">{p.name}</h3>
                        <p className="mt-1 text-[12px] text-slate-500">
                          {p.brand} · Part {p.partNo}
                        </p>
                        <dl className="mt-3 space-y-2 text-[13px]">
                          <div className="grid grid-cols-[80px_1fr] gap-2">
                            <dt className="text-[12px] font-semibold text-ink">Fitment</dt>
                            <dd>
                              <Status {...fitLabels[fit.fit]} />
                              {fit.note && <p className="mt-0.5 text-[12px] text-slate-500">{fit.note}</p>}
                              <p className="mt-0.5 text-[12px]">
                                <button type="button" onClick={focusVehicle} className={linkCls}>
                                  {vehicle ? "Change vehicle" : "Choose a vehicle"}
                                </button>
                                {" · "}
                                <Link href={hrefFor("Fitment Help")} className={linkCls}>
                                  Fitment Help
                                </Link>
                              </p>
                            </dd>
                          </div>
                          <div className="grid grid-cols-[80px_1fr] gap-2">
                            <dt className="text-[12px] font-semibold text-ink">Road use</dt>
                            <dd>
                              <Status {...roadUseLabels[road]} />
                              {note && <p className="mt-0.5 text-[12px] text-slate-500">{note}</p>}
                            </dd>
                          </div>
                          <div className="grid grid-cols-[80px_1fr] gap-2">
                            <dt className="text-[12px] font-semibold text-ink">Installation</dt>
                            <dd>
                              <Status {...installText[p.install]} />
                              {p.install === "professional" && (
                                <p className="mt-0.5 text-[12px] leading-relaxed text-slate-500">Professional installation or calibration may be required; review manufacturer instructions.</p>
                              )}
                            </dd>
                          </div>
                        </dl>
                        {p.test ? (
                          <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 p-3 text-[12px] text-blue-900">
                            <p className="font-bold">Test result for this exact configuration</p>
                            <p className="mt-1 text-[13px]">{p.test.result}</p>
                            <p className="mt-1 leading-relaxed text-blue-800/80">{p.test.detail}</p>
                          </div>
                        ) : (
                          <p className="mt-3 text-[12px] text-slate-500">No verified performance test is published for this part.</p>
                        )}
                        <div className="mt-auto pt-4">
                          <div className="flex items-baseline justify-between">
                            <span className="text-[12px] font-semibold text-ink">Price</span>
                            <span className="text-xl font-extrabold text-ink">£{p.price.toLocaleString("en-GB")}</span>
                          </div>
                          <div className="mt-3 flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setModal({ kind: "details", id: p.id })}
                              className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-ink"
                            >
                              View product details
                            </button>
                            <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink">
                              <input type="checkbox" checked={checked} onChange={() => toggleCompare(p.id)} className="peer sr-only" />
                              <span
                                className={`grid h-4 w-4 place-items-center rounded border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand/50 ${
                                  checked ? "border-ink bg-ink text-brand" : "border-slate-400 bg-white hover:border-ink"
                                }`}
                              >
                                {checked && <Check className="h-3 w-3 animate-pop" strokeWidth={3} />}
                              </span>
                              Compare
                            </label>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Compare tray */}
      {compare.length > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-40 px-4">
          <div className="mx-auto flex max-w-3xl animate-fade-up flex-wrap items-center justify-between gap-3 rounded-2xl bg-navy px-4 py-3 text-white shadow-2xl">
            <div className="flex flex-wrap items-center gap-2 text-[13px]">
              <span className="font-semibold">Compare ({compare.length}/{MAX_COMPARE})</span>
              {compared.map((p) => (
                <span key={p.id} className="flex items-center gap-1 rounded-full bg-white/10 py-1 pr-1 pl-3 text-[12px]">
                  {p.name}
                  <button type="button" onClick={() => toggleCompare(p.id)} aria-label={`Remove ${p.name} from compare`} className="grid h-5 w-5 place-items-center rounded-full transition-colors hover:bg-white/20">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setCompare([])} className="h-9 rounded-full px-3 text-[13px] font-semibold text-slate-300 transition-colors hover:text-white">
                Clear
              </button>
              <button
                type="button"
                disabled={compare.length < 2}
                onClick={() => setModal({ kind: "compare" })}
                className="h-9 rounded-full bg-brand px-4 text-[13px] font-semibold text-ink transition-all duration-300 enabled:hover:-translate-y-0.5 enabled:hover:bg-brand-dark disabled:opacity-50"
              >
                {compare.length < 2 ? "Add one more" : "Compare now"}
              </button>
            </div>
            {notice && <p className="w-full animate-fade-up text-[12px] text-brand">{notice}</p>}
          </div>
        </div>
      )}

      {detailProduct && (
        <Modal title={detailProduct.name} onClose={() => setModal(null)}>
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-navy">
            <Image src={detailProduct.image} alt={detailProduct.alt} fill sizes="500px" className="object-cover" />
          </div>
          <p className="mt-4 text-[13px] text-slate-500">
            {detailProduct.brand} · Part {detailProduct.partNo} · {detailProduct.family}
          </p>
          <dl className="mt-4 divide-y divide-slate-200 border-y border-slate-200 text-[13px]">
            {[
              ["Vehicle", vehicle?.label ?? "None selected"],
              ["Fitment", fitLabels[fitOf(detailProduct).fit].label + (fitOf(detailProduct).note ? ` — ${fitOf(detailProduct).note}` : "")],
              ["Market", market],
              ["Road use", roadUseLabels[roadOf(detailProduct)].label],
              ["Intended use", use],
              ["Installation", installText[detailProduct.install].label],
              ["Test evidence", detailProduct.test ? detailProduct.test.result : "None published"],
              ["Price", `£${detailProduct.price.toLocaleString("en-GB")} (example)`],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[110px_1fr] gap-3 py-2.5">
                <dt className="text-slate-500">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[12px] text-slate-500">Example listing for design review. Statuses are filters, not a guarantee of fit or legality.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={hrefFor("Aftermarket Parts")} className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-brand px-4 text-[13px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark">
              Shop aftermarket parts <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href={hrefFor("Fitment Help")} className="inline-flex h-9 items-center rounded-full border border-slate-300 px-4 text-[13px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink">
              Fitment Help
            </Link>
          </div>
        </Modal>
      )}

      {modal?.kind === "compare" && (
        <Modal title="Compare products" onClose={() => setModal(null)} wide>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th scope="col" className="w-32 py-3 pr-3 font-semibold text-slate-500">
                    <span className="sr-only">Detail</span>
                  </th>
                  {compared.map((p) => (
                    <th key={p.id} scope="col" className="px-3 py-3 align-top font-bold text-ink">
                      {p.name}
                      <span className="block text-[12px] font-normal text-slate-500">{p.brand}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Family", (p: Product) => p.family],
                    ["Fitment", (p: Product) => <Status {...fitLabels[fitOf(p).fit]} />],
                    ["Road use", (p: Product) => <Status {...roadUseLabels[roadOf(p)]} />],
                    ["Installation", (p: Product) => <Status {...installText[p.install]} />],
                    ["Test evidence", (p: Product) => (p.test ? <span className="flex items-start gap-1.5"><FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-700" />{p.test.result}</span> : "None published")],
                    ["Price", (p: Product) => <strong>£{p.price.toLocaleString("en-GB")}</strong>],
                  ] as [string, (p: Product) => React.ReactNode][]
                ).map(([label, cell]) => (
                  <tr key={label} className="border-b border-slate-200 transition-colors hover:bg-slate-50">
                    <th scope="row" className="py-3 pr-3 font-semibold text-slate-500">
                      {label}
                    </th>
                    {compared.map((p) => (
                      <td key={p.id} className="px-3 py-3 align-top text-ink">
                        {cell(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[12px] text-slate-500">
            Fitment shown for {vehicle?.label ?? "no vehicle"} · road use for {market}.
          </p>
        </Modal>
      )}
    </>
  );
}

"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, Trophy, X } from "lucide-react";
import { formatMileage, formatPrice, powertrainLabel, verificationLabel, type Listing } from "./data";

const CLOSE_MS = 300;

type Row = {
  label: string;
  value: (l: Listing) => string;
  /** Which listing wins this row, if it can be ranked. */
  best?: "min" | "max";
  number?: (l: Listing) => number;
};

const historyText: Record<Listing["history"], string> = {
  available: "History report available",
  new: "New vehicle — no prior history",
  pending: "History report pending",
};

const rows: Row[] = [
  { label: "Price", value: (l) => formatPrice(l.price), best: "min", number: (l) => l.price },
  { label: "Powertrain", value: (l) => powertrainLabel[l.powertrain] },
  { label: "Year", value: (l) => String(l.year), best: "max", number: (l) => l.year },
  { label: "Mileage", value: (l) => formatMileage(l.mileage), best: "min", number: (l) => l.mileage },
  { label: "Body type", value: (l) => l.body },
  { label: "Condition", value: (l) => (l.condition === "new" ? "New" : "Used") },
  { label: "Seller type", value: (l) => l.seller },
  { label: "Location", value: (l) => l.location },
  { label: "Seller verification", value: (l) => verificationLabel[l.verification] },
  { label: "Vehicle history", value: (l) => historyText[l.history] },
  {
    label: "Certification",
    value: (l) =>
      l.certification?.status === "certified" ? "Certified" : l.certification ? "Not current" : "Not certified",
  },
];

type CompareModalProps = {
  open: boolean;
  items: Listing[];
  onClose: () => void;
  onRemove: (id: string) => void;
};

export default function CompareModal({ open, items, onClose, onRemove }: CompareModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [highlight, setHighlight] = useState(true);
  const closeButton = useRef<HTMLButtonElement>(null);

  // Mount → animate in; animate out → unmount.
  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  const columns = { gridTemplateColumns: `150px repeat(${items.length}, minmax(190px, 1fr))` } as CSSProperties;

  const bestId = (row: Row) => {
    if (!row.best || !row.number || items.length < 2) return null;
    const values = items.map(row.number);
    const target = row.best === "min" ? Math.min(...values) : Math.max(...values);
    const winners = items.filter((l) => row.number!(l) === target);
    return winners.length === items.length ? null : winners.map((l) => l.id);
  };

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="compare-title">
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-navy/70 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      />

      <div
        className={`relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:rounded-3xl ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-[0.97] opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 id="compare-title" className="flex items-center gap-3 text-lg font-bold text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-ink">
              <ArrowLeftRight className="h-4 w-4" />
            </span>
            Compare vehicles
            <span className="text-sm font-medium text-slate-400">({items.length})</span>
          </h2>
          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-600 select-none">
              <span className="relative inline-flex">
                <input
                  type="checkbox"
                  checked={highlight}
                  onChange={() => setHighlight((h) => !h)}
                  className="peer sr-only"
                />
                <span className="h-5 w-9 rounded-full bg-slate-300 transition-colors duration-300 peer-checked:bg-brand peer-focus-visible:ring-2 peer-focus-visible:ring-brand/50" />
                <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 peer-checked:translate-x-4" />
              </span>
              Highlight differences
            </label>
            <button
              ref={closeButton}
              type="button"
              onClick={onClose}
              aria-label="Close compare"
              className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 transition-all duration-300 hover:rotate-90 hover:border-ink hover:bg-ink hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <div className="min-w-fit">
            {/* Vehicle header row */}
            <div className="sticky top-0 z-10 grid border-b border-slate-200 bg-white" style={columns}>
              <div className="flex items-end p-4 text-xs font-semibold text-slate-400">Vehicle</div>
              {items.map((l, i) => (
                <Column key={l.id} index={i} visible={visible}>
                  <div className="group relative p-4">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
                      <Image
                        src={l.image}
                        alt=""
                        fill
                        sizes="240px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(l.id)}
                      aria-label={`Remove ${l.make} ${l.model}`}
                      className="absolute top-6 right-6 grid h-7 w-7 place-items-center rounded-full bg-white/95 shadow transition-all duration-300 hover:scale-110 hover:bg-ink hover:text-white"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <p className="mt-3 text-sm leading-snug font-bold text-ink">
                      {l.year} {l.make} {l.model}
                    </p>
                    <p className="mt-1 text-lg font-extrabold text-ink">{formatPrice(l.price)}</p>
                  </div>
                </Column>
              ))}
            </div>

            {/* Spec rows */}
            {rows.map((row) => {
              const values = items.map(row.value);
              const differs = new Set(values).size > 1;
              const winners = bestId(row);
              const marked = highlight && differs;
              return (
                <div
                  key={row.label}
                  className={`grid border-b border-slate-100 transition-colors duration-300 hover:bg-slate-50 ${marked ? "bg-brand-light/40" : ""}`}
                  style={columns}
                >
                  <div className="flex items-center gap-2 p-4 text-xs font-semibold text-slate-500">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full bg-brand transition-all duration-300 ${marked ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                    />
                    {row.label}
                  </div>
                  {items.map((l, i) => (
                    <Column key={l.id} index={i} visible={visible}>
                      <div className="flex flex-wrap items-center gap-2 p-4 text-sm text-ink">
                        {values[i]}
                        {winners?.includes(l.id) && (
                          <span className="inline-flex animate-pop items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                            <Trophy className="h-3 w-3" />
                            Best
                          </span>
                        )}
                      </div>
                    </Column>
                  ))}
                </div>
              );
            })}

            {/* Actions */}
            <div className="grid" style={columns}>
              <div />
              {items.map((l, i) => (
                <Column key={l.id} index={i} visible={visible}>
                  <div className="p-4">
                    <Link
                      href="#"
                      className="flex h-10 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lg"
                    >
                      View details
                    </Link>
                  </div>
                </Column>
              ))}
            </div>
          </div>
        </div>

        {items.length < 2 && (
          <p className="border-t border-slate-200 bg-slate-50 px-6 py-3 text-center text-xs text-slate-500">
            Add at least one more vehicle to see a full comparison.
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}

/** Each vehicle column fades up in turn when the modal opens. */
function Column({ index, visible, children }: { index: number; visible: boolean; children: ReactNode }) {
  return (
    <div
      className={`transition-all duration-500 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
      style={{ transitionDelay: visible ? `${150 + index * 90}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

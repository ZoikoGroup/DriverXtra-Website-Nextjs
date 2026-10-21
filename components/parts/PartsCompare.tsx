"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeftRight, X } from "lucide-react";
import { formatPrice } from "./PartCard";
import { partTypes, type Part } from "./data";

export const MAX_COMPARE = 3;

const originText = { reviewed: "Evidence reviewed", unverified: "Not independently verified", lapsed: "Evidence no longer current" };

type PartsCompareProps = {
  items: Part[];
  vehicle: { id: string; label: string } | null;
  onRemove: (id: string) => void;
  onClear: () => void;
};

/** Bottom tray listing chosen parts, plus a side-by-side comparison window. */
export default function PartsCompare({ items, vehicle, onRemove, onClear }: PartsCompareProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (items.length < 2) setOpen(false);
  }, [items.length]);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }
    const frame = requestAnimationFrame(() => setVisible(true));
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const rows: { label: string; value: (p: Part) => string }[] = [
    { label: "Price", value: (p) => (p.price !== undefined ? `${formatPrice(p.price)}${p.perUnit ? " each" : ""}` : "Not offered in market") },
    { label: "Type", value: (p) => partTypes.find((t) => t.id === p.type)!.badge },
    { label: "Condition", value: (p) => p.condition ?? "New" },
    { label: "Brand", value: (p) => p.brand },
    { label: "Part no.", value: (p) => p.partNo },
    { label: "Specification", value: (p) => p.spec ?? "—" },
    { label: "Origin", value: (p) => (p.origin ? originText[p.origin] : "—") },
    {
      label: "Fitment",
      value: (p) =>
        p.universal ? "Universal — no fitment needed" : vehicle ? (p.fits?.includes(vehicle.id as never) ? "Fits your vehicle" : "Not listed for your vehicle") : "Not verified",
    },
    { label: "Seller", value: (p) => p.seller },
  ];

  return (
    <>
      <div
        aria-hidden={!items.length}
        className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          items.length ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-3 rounded-2xl bg-navy p-3 text-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/10 sm:flex-nowrap sm:p-4">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <ArrowLeftRight className="h-4 w-4 text-brand" /> Compare
            <span className="text-slate-400">
              {items.length}/{MAX_COMPARE}
            </span>
          </p>
          <ul className="flex flex-1 gap-2 overflow-x-auto">
            {items.map((p) => (
              <li key={p.id} className="flex shrink-0 animate-fade-up items-center gap-1.5 rounded-full bg-white/10 py-1 pr-1 pl-3 text-xs">
                <span className="max-w-[140px] truncate">{p.name}</span>
                <button type="button" onClick={() => onRemove(p.id)} aria-label={`Remove ${p.name} from compare`} className="grid h-5 w-5 place-items-center rounded-full hover:bg-white/20">
                  <X className="h-3 w-3" />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onClear} className="px-2 text-xs text-slate-400 transition-colors hover:text-white">
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              disabled={items.length < 2}
              className="btn-shine rounded-full bg-brand px-4 py-2 text-xs font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark disabled:pointer-events-none disabled:opacity-50"
            >
              {items.length < 2 ? "Add one more" : "Compare now"}
            </button>
          </div>
        </div>
      </div>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Compare parts">
            <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-navy/70 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`} />
            <div
              className={`relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:rounded-3xl ${
                visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-[0.97] opacity-0"
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h2 className="flex items-center gap-3 text-lg font-bold text-ink">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand">
                    <ArrowLeftRight className="h-4 w-4" />
                  </span>
                  Compare parts
                </h2>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close compare"
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 transition-all duration-300 hover:rotate-90 hover:bg-ink hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="overflow-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="w-36 p-4" />
                      {items.map((p, i) => (
                        <th key={p.id} className={`p-4 align-top font-bold text-ink transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`} style={{ transitionDelay: `${150 + i * 90}ms` }}>
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => {
                      const values = items.map(row.value);
                      const differs = new Set(values).size > 1;
                      return (
                        <tr key={row.label} className={`border-b border-slate-100 transition-colors hover:bg-slate-50 ${differs ? "bg-brand-light/30" : ""}`}>
                          <th scope="row" className="p-4 text-xs font-semibold text-slate-500">
                            {row.label}
                          </th>
                          {values.map((v, i) => (
                            <td key={items[i].id} className="p-4 align-top text-ink">
                              {v}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

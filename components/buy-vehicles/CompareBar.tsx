"use client";

import Image from "next/image";
import { ArrowLeftRight, X } from "lucide-react";
import type { Listing } from "./data";

export const MAX_COMPARE = 3;

type CompareBarProps = {
  items: Listing[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onCompare: () => void;
};

export default function CompareBar({ items, onRemove, onClear, onCompare }: CompareBarProps) {
  const open = items.length > 0;

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-3 rounded-2xl bg-navy p-3 text-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/10 sm:flex-nowrap sm:p-4">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <ArrowLeftRight className="h-4 w-4 text-brand" />
          Compare
          <span className="text-slate-400">
            {items.length}/{MAX_COMPARE}
          </span>
        </p>

        <ul className="flex flex-1 gap-2 overflow-x-auto">
          {items.map((l) => (
            <li
              key={l.id}
              className="flex shrink-0 animate-fade-up items-center gap-2 rounded-full bg-white/10 py-1 pr-1 pl-1 text-xs"
            >
              <span className="relative h-6 w-6 overflow-hidden rounded-full">
                <Image src={l.image} alt="" fill sizes="24px" className="object-cover" />
              </span>
              <span className="max-w-[120px] truncate">
                {l.make} {l.model.split(" ")[0]}
              </span>
              <button
                type="button"
                onClick={() => onRemove(l.id)}
                aria-label={`Remove ${l.make} ${l.model} from compare`}
                className="grid h-5 w-5 place-items-center rounded-full transition-colors hover:bg-white/20"
              >
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
            onClick={onCompare}
            disabled={items.length < 2}
            className="btn-shine rounded-full bg-brand px-4 py-2 text-xs font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
          >
            {items.length < 2 ? "Add one more" : "Compare now"}
          </button>
        </div>
      </div>
    </div>
  );
}

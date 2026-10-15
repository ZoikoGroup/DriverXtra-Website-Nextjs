"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { regions, setRegion, useRegion } from "@/lib/region";

type RegionPickerProps = {
  label?: string;
  buttonClassName?: string;
};

/** "Change region" link that opens an animated region list. */
export default function RegionPicker({
  label = "Change region",
  buttonClassName = "font-semibold text-brand underline underline-offset-2 transition-colors hover:text-white",
}: RegionPickerProps) {
  const region = useRegion();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapper} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={buttonClassName}
      >
        {label}
      </button>

      <div
        className={`absolute top-full left-0 z-30 mt-3 w-64 origin-top-left rounded-2xl bg-white p-2 text-ink shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-black/5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] max-sm:-left-24 ${
          open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <p className="flex items-center gap-2 px-3 pt-2 pb-2 text-xs font-semibold text-slate-500">
          <Globe className="h-3.5 w-3.5 text-brand-dark" />
          Choose your region
        </p>
        <ul role="listbox" aria-label="Region">
          {regions.map((r, i) => {
            const active = r.name === region;
            return (
              <li
                key={r.code}
                className={`transition-all duration-300 ${open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}
                style={{ transitionDelay: open ? `${60 + i * 30}ms` : "0ms" }}
              >
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  tabIndex={open ? 0 : -1}
                  onClick={() => {
                    setRegion(r.name);
                    setOpen(false);
                  }}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 ${
                    active ? "bg-brand-light font-semibold" : "hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`grid h-6 w-8 place-items-center rounded text-[10px] font-bold transition-colors ${
                      active ? "bg-brand text-ink" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                    }`}
                  >
                    {r.code}
                  </span>
                  <span className="flex-1">{r.name}</span>
                  {active && <Check className="h-4 w-4 animate-pop text-ink" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

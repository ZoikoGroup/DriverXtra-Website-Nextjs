"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, CirclePlus, Search, Settings, X } from "lucide-react";
import { megaMenus } from "@/lib/megaMenu";
import { hrefFor } from "@/lib/navigation";
import { quickActions } from "./quickActions";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute top-0 right-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <Image src="/logo.png" alt="DriverXtra" width={684} height={120} className="h-6 w-auto" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-lg transition-all duration-300 hover:rotate-90 hover:bg-slate-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="flex h-11 items-center gap-2 rounded-full border border-slate-300 px-4 transition-colors focus-within:border-brand-dark"
          >
            <Search className="h-4 w-4 text-slate-500" />
            <input
              type="search"
              placeholder="Search by make, model, part…"
              className="w-full bg-transparent text-sm focus:outline-none"
            />
          </form>

          <div className="mt-4 grid grid-cols-3 gap-2 sm:hidden">
            {quickActions.map(({ label, icon: Icon }) => (
              <Link
                key={label}
                href="#"
                className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 py-3 text-xs font-medium transition-colors hover:border-brand hover:bg-brand-light"
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            ))}
          </div>

          <ul className="mt-4 divide-y divide-slate-100">
            {megaMenus.map((menu, i) => {
              const isOpen = expanded === menu.label;
              return (
                <li
                  key={menu.label}
                  className={`transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
                  style={{ transitionDelay: open ? `${120 + i * 40}ms` : "0ms" }}
                >
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : menu.label)}
                    className="flex w-full items-center justify-between py-3.5 text-left text-[15px] font-semibold text-ink"
                    aria-expanded={isOpen}
                  >
                    {menu.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-dark" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {menu.columns.map((col) => (
                        <div key={col.title} className="pb-3">
                          <p className="pt-1 pb-1.5 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                            {col.title}
                          </p>
                          <ul>
                            {col.items.map(({ label, icon: Icon, note, href }) => (
                              <li key={label}>
                                <Link
                                  href={href ?? hrefFor(label)}
                                  onClick={onClose}
                                  className="group flex items-center gap-3 rounded-lg py-2 pr-2 pl-1 text-sm text-slate-600 transition-all hover:bg-brand-light hover:pl-2 hover:text-ink"
                                >
                                  <Icon className="h-5 w-5 shrink-0 text-ink transition-transform group-hover:scale-110" strokeWidth={1.5} />
                                  <span>
                                    {label}
                                    {note && <span className="block text-[11px] text-slate-400">{note}</span>}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-slate-200 p-5">
          <Link
            href="/parts"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-400 text-sm font-medium transition-colors hover:bg-ink hover:text-white"
          >
            <Settings className="h-4 w-4" />
            Find Parts
          </Link>
          <Link
            href="/sell-vehicles"
            className="btn-shine inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold transition-colors hover:bg-brand-dark"
          >
            <CirclePlus className="h-4 w-4 fill-ink text-brand" />
            Sell Vehicle
          </Link>
        </div>
      </aside>
    </div>
  );
}

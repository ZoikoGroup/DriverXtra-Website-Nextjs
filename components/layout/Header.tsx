"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CirclePlus, Menu, Search, Settings } from "lucide-react";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import { quickActions } from "./quickActions";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_10px_30px_-10px_rgba(15,23,42,0.25)]" : ""
      }`}
    >
      {/* Top bar */}
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div
          className={`mx-auto flex max-w-[1440px] items-center gap-3 px-4 transition-[height] duration-300 sm:px-6 lg:px-10 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          <Link href="/" aria-label="DriverXtra home" className="shrink-0 transition-transform duration-300 hover:scale-[1.04]">
            <Image
              src="/logo.png"
              alt="DriverXtra"
              width={684}
              height={120}
              priority
              className="h-6 w-auto sm:h-7 lg:h-8"
            />
          </Link>

          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="group ml-auto hidden h-10 w-full max-w-[380px] items-center rounded-full border border-slate-800 bg-white pr-1.5 pl-5 transition-all duration-300 focus-within:max-w-[440px] focus-within:border-brand-dark focus-within:shadow-[0_0_0_4px_rgba(255,194,14,0.25)] hover:shadow-md md:flex"
          >
            <input
              type="search"
              placeholder="Search by make, model, part…"
              className="w-full bg-transparent text-sm text-ink placeholder:text-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Search"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-700 transition-colors duration-300 group-focus-within:bg-brand group-focus-within:text-ink hover:bg-brand hover:text-ink"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          <nav aria-label="Account" className="ml-auto hidden items-center gap-1 sm:flex md:ml-2">
            {quickActions.map(({ label, icon: Icon, href }) => (
              <Link
                key={label}
                href={href}
                className="group flex w-16 flex-col items-center gap-0.5 rounded-lg py-1.5 text-slate-700 transition-colors duration-200 hover:bg-slate-100 hover:text-ink"
              >
                <Icon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            ))}
          </nav>

          <span className="mx-2 hidden h-8 w-px bg-slate-300 lg:block" />

          <Link
            href="/parts"
            className="group hidden h-10 items-center gap-2 rounded-lg border border-slate-400 px-4 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white hover:shadow-lg lg:inline-flex"
          >
            <Settings className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
            Find Parts
          </Link>

          <Link
            href="/sell-vehicles"
            className="btn-shine group hidden h-10 items-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)] sm:inline-flex"
          >
            <CirclePlus className="h-4 w-4 fill-ink text-brand transition-transform duration-300 group-hover:rotate-90" />
            Sell Vehicle
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="ml-auto grid h-10 w-10 place-items-center rounded-lg text-ink transition-colors hover:bg-slate-100 sm:ml-1 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <MegaMenu />

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Info, Search, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { regions, useRegion } from "@/lib/region";
import { listings } from "@/components/buy-vehicles/data";
import { ALPHABET, REGISTRY_VERSION, brandSlug, brands, brandsByLetter, findBrand, searchBrands, type Brand } from "./data";

const HIGHLIGHT_MS = 2200;

export default function BrandDirectory({ initialQuery = "" }: { initialQuery?: string }) {
  const region = useRegion();
  const regionCode = regions.find((r) => r.name === region)?.code ?? "GB";
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<{ text: string; matches: Brand[] } | null>(null);
  const [message, setMessage] = useState("");
  const [highlight, setHighlight] = useState("");
  const [activeLetter, setActiveLetter] = useState("A");
  const timer = useRef<number | undefined>(undefined);

  // Listing counts come from the live listings for the selected region.
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    listings.filter((l) => l.country === region).forEach((l) => map.set(l.make, (map.get(l.make) ?? 0) + 1));
    return map;
  }, [region]);

  const groups = useMemo(() => {
    if (!filter) return brandsByLetter.filter((g) => g.brands.length);
    return brandsByLetter
      .map((g) => ({ ...g, brands: g.brands.filter((b) => filter.matches.includes(b)) }))
      .filter((g) => g.brands.length);
  }, [filter]);

  const lettersWithBrands = new Set(brandsByLetter.filter((g) => g.brands.length).map((g) => g.letter));

  const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });

  const runSearch = (text: string) => {
    window.clearTimeout(timer.current);
    setMessage("");
    const q = text.trim();
    if (!q) {
      setFilter(null);
      return;
    }
    const exact = findBrand(q);
    if (exact) {
      setFilter(null);
      setHighlight(exact.name);
      // Let the full directory render before scrolling to the brand.
      window.setTimeout(() => scrollToId(`brand-${brandSlug(exact.name)}`), 50);
      timer.current = window.setTimeout(() => setHighlight(""), HIGHLIGHT_MS);
      return;
    }
    const matches = searchBrands(q);
    if (matches.length) {
      setFilter({ text: q, matches });
      window.setTimeout(() => scrollToId("brand-directory"), 50);
    } else {
      setFilter(null);
      setMessage(`No brand matches “${q}”. Check the spelling or browse A–Z below.`);
    }
  };

  // ?q= from /brands/<unknown-name> links.
  useEffect(() => {
    if (initialQuery) runSearch(initialQuery);
    return () => window.clearTimeout(timer.current);
    // Only on first load.
  }, []);

  // Highlight the letter of the group currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveLetter((visible[0].target as HTMLElement).dataset.letter ?? "A");
      },
      { rootMargin: "-180px 0px -55% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-letter]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [groups]);

  const clearSearch = () => {
    setQuery("");
    setFilter(null);
    setMessage("");
  };

  return (
    <>
      {/* Hero with search */}
      <section className="relative overflow-hidden bg-navy text-white">
        <BgImage src="/images/home/hero-bg.jpeg" className="opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />

        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8 lg:py-20">
          <div>
            <Reveal>
              <Eyebrow dark>
                <span className="text-xs">Brands &amp; Discovery</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">
                Find the Right Vehicle with Confidence.
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 text-xl font-bold text-brand sm:text-2xl">Browse Vehicle Brands A–Z.</p>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300">
                Find an automotive brand by name, then explore eligible vehicles in your selected market.
              </p>
            </Reveal>
          </div>

          <Reveal direction="left" delay={200}>
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                runSearch(query);
              }}
              className="rounded-2xl bg-white p-5 text-ink shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)] sm:p-6"
            >
              <label htmlFor="brand-search" className="text-base font-semibold">
                Search vehicle brands
              </label>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <div className="relative min-w-0 flex-1">
                  <input
                    id="brand-search"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setMessage("");
                    }}
                    placeholder="Enter a brand name or recognized alias"
                    autoComplete="off"
                    className="h-11 w-full rounded-lg border border-slate-300 px-3 pr-9 text-sm transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-brand-dark focus:ring-2 focus:ring-brand/30 focus:outline-none"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      aria-label="Clear search"
                      className="absolute top-1/2 right-2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition-all hover:rotate-90 hover:bg-slate-100 hover:text-ink"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn-shine inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(232,172,0,0.7)]"
                >
                  <Search className="h-4 w-4" /> Find a brand
                </button>
              </div>
              {message ? (
                <p role="alert" className="mt-2 animate-shake text-xs font-medium text-red-600">
                  {message}
                </p>
              ) : (
                <p className="mt-2 text-xs text-slate-500">
                  Try a full name like &quot;Volkswagen&quot; or an approved alias like &quot;VW&quot;.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      {/* Directory */}
      <section id="brand-directory" className="scroll-mt-32 bg-white pb-20">
        {/* Letter bar sticks under the header */}
        <nav aria-label="Jump to letter" className="sticky top-14 z-20 border-b border-slate-200 bg-white/90 py-3 backdrop-blur lg:top-[104px]">
          <div className="mx-auto flex max-w-[1200px] gap-1.5 overflow-x-auto px-4 [scrollbar-width:none] sm:px-6 lg:justify-center lg:px-8">
            {ALPHABET.map((letter) => {
              const enabled = lettersWithBrands.has(letter);
              const active = enabled && letter === activeLetter && !filter;
              return (
                <button
                  key={letter}
                  type="button"
                  disabled={!enabled}
                  onClick={() => {
                    clearSearch();
                    window.setTimeout(() => document.getElementById(`letter-${letter}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
                  }}
                  aria-label={enabled ? `Brands starting with ${letter}` : `No brands starting with ${letter}`}
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-md border text-xs font-bold transition-all duration-300 ${
                    active
                      ? "scale-110 border-ink bg-ink text-brand shadow-md"
                      : enabled
                        ? "border-slate-200 bg-white text-ink hover:-translate-y-0.5 hover:border-brand hover:bg-brand-light"
                        : "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mx-auto max-w-[1200px] px-4 pt-10 sm:px-6 lg:px-8">
          {filter && (
            <div className="mb-6 flex animate-fade-up flex-wrap items-center gap-3 rounded-xl border border-brand/50 bg-brand-light/50 px-4 py-3 text-sm">
              Showing <strong>{filter.matches.length}</strong> {filter.matches.length === 1 ? "brand" : "brands"} matching “{filter.text}”
              <button type="button" onClick={clearSearch} className="font-semibold text-blue-700 underline underline-offset-2 hover:text-ink">
                Show all brands
              </button>
            </div>
          )}

          <div key={filter?.text ?? "all"} className="gap-8 sm:columns-2 lg:columns-4">
            {groups.map((group, gi) => (
              <Reveal key={group.letter} delay={(gi % 4) * 60} className="mb-8 break-inside-avoid">
                <div id={`letter-${group.letter}`} data-letter={group.letter} className="scroll-mt-48">
                  <h2 className="text-xl font-extrabold text-ink">{group.letter}</h2>
                  <span className="mt-1.5 block h-[3px] w-full rounded-full bg-brand" />
                  <ul className="mt-1">
                    {group.brands.map((brand) => (
                      <BrandRow
                        key={brand.name}
                        brand={brand}
                        count={counts.get(brand.name) ?? 0}
                        notOffered={!!brand.notOfferedIn?.includes(regionCode)}
                        regionCode={regionCode}
                        highlighted={highlight === brand.name}
                      />
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
            <Reveal className="mb-8 break-inside-avoid">
              <p className="text-xs leading-relaxed text-slate-500">
                {brands.length} brands in the directory · registry {REGISTRY_VERSION}
              </p>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-4 flex gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500">
              <Info className="mt-px h-3.5 w-3.5 shrink-0" />
              <span>
                Brand names help you find vehicles. Seller verification and vehicle history are reviewed separately on each
                listing. Looking for parts?{" "}
                <Link href="/buy-vehicles" className="font-semibold text-ink underline underline-offset-2 hover:text-gold">
                  Choose a specific vehicle to check compatibility.
                </Link>
              </span>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

type BrandRowProps = {
  brand: Brand;
  count: number;
  notOffered: boolean;
  regionCode: string;
  highlighted: boolean;
};

function BrandRow({ brand, count, notOffered, regionCode, highlighted }: BrandRowProps) {
  const status = brand.historic ? "Historic" : notOffered ? `Not offered in ${regionCode}` : count ? `${count} ${count === 1 ? "listing" : "listings"}` : "";
  const unavailable = brand.historic || notOffered;
  const rowClass = `group flex items-center justify-between gap-3 border-b border-slate-100 px-1 py-2.5 text-sm transition-all duration-300 ${
    highlighted ? "animate-pulse rounded-md bg-brand-light ring-2 ring-brand" : ""
  }`;

  return (
    <li id={`brand-${brandSlug(brand.name)}`} className="scroll-mt-48">
      {unavailable ? (
        <div className={rowClass}>
          <span className="font-semibold text-slate-500">{brand.name}</span>
          <span className="text-[11px] text-slate-400">{status}</span>
        </div>
      ) : (
        <Link href={`/buy-vehicles?make=${encodeURIComponent(brand.name)}`} className={`${rowClass} hover:rounded-md hover:bg-brand-light/50 hover:pl-2.5`}>
          <span className="font-semibold text-ink">{brand.name}</span>
          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            {status}
            <ArrowRight className="h-3.5 w-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:w-3.5 group-hover:translate-x-0 group-hover:opacity-100" />
          </span>
        </Link>
      )}
    </li>
  );
}

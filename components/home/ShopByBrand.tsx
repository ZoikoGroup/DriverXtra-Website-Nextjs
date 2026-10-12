
"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

const categories = ["Popular", "EV", "Luxury", "Commercial"] as const;

type Category = (typeof categories)[number];

const brands: {
  name: string;
  initials: string;
  categories: Category[];
}[] = [
  { name: "Toyota", initials: "TO", categories: ["Popular"] },
  { name: "Volkswagen", initials: "VO", categories: ["Popular"] },
  { name: "Ford", initials: "FO", categories: ["Popular", "Commercial"] },
  { name: "BMW", initials: "BM", categories: ["Popular", "EV", "Luxury"] },
  { name: "Mercedes-Benz", initials: "MB", categories: ["Popular", "Luxury"] },
  { name: "Audi", initials: "AU", categories: ["Popular", "EV", "Luxury"] },
  { name: "Kia", initials: "KI", categories: ["Popular", "EV"] },
  { name: "Hyundai", initials: "HY", categories: ["Popular", "EV"] },
  { name: "Nissan", initials: "NI", categories: ["Popular", "EV"] },
  { name: "Vauxhall", initials: "VA", categories: ["Popular"] },
  { name: "Peugeot", initials: "PE", categories: ["Popular"] },
  { name: "Renault", initials: "RE", categories: ["Popular", "EV"] },
  { name: "Skoda", initials: "SK", categories: ["Popular"] },
  { name: "Honda", initials: "HO", categories: ["Popular"] },
  { name: "Tesla", initials: "TE", categories: ["Popular", "EV"] },
  { name: "Volvo", initials: "VO", categories: ["Popular", "EV", "Luxury"] },
];

export default function ShopByBrand() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("Popular");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const matchesCategory =
        activeCategory === "Popular" ||
        brand.categories.includes(activeCategory);

      const matchesQuery = brand.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const visibleBrands = showAll
    ? filteredBrands
    : filteredBrands.slice(0, 16);

  return (
    <section
      id="shop-by-brand"
      className="w-full overflow-hidden bg-[#F5F7FA]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        {/* Heading */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[720px]">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-5 rounded-full bg-[#FFBF00]" />
              <p className="text-sm font-bold leading-7 text-[#C58B00] sm:text-base">
                Browse by brand
              </p>
            </div>

            <h2 className="mt-2 text-3xl font-extrabold leading-10 tracking-tight text-[#172033] sm:text-4xl">
              Shop by brand
            </h2>

            <p className="mt-2 text-sm leading-7 text-[#66738C] sm:text-base">
              Explore vehicles and compatible parts from leading
              automotive marques.
            </p>
          </div>

          <a
            href="/brands"
            className="group/link inline-flex w-fit shrink-0 items-center gap-1.5 border-b-2 border-[#FFBF00] px-1.5 pb-1 text-sm font-semibold text-[#172033] transition-colors duration-200 hover:text-[#B98200] sm:text-base"
          >
            View all brands A–Z
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover/link:translate-x-1"
            />
          </a>
        </div>

        {/* Filters and search */}
        <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter brands by category"
          >
            {categories.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setActiveCategory(category);
                    setShowAll(false);
                  }}
                  className={`min-h-10 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF00] focus-visible:ring-offset-2 ${
                    active
                      ? "border-[#0B1220] bg-[#0B1220] text-white shadow-sm"
                      : "border-[#DCE3ED] bg-white text-[#172033] hover:border-[#FFBF00] hover:bg-[#FFF9E5]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <label className="relative block w-full lg:max-w-[304px]">
            <Search
              size={16}
              strokeWidth={1.8}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#66738C]"
            />

            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setShowAll(false);
              }}
              placeholder="Search brands, e.g. VW or Opel"
              aria-label="Search brands"
              className="h-11 w-full rounded-xl border border-[#DCE3ED] bg-white pl-9 pr-3 text-sm text-[#172033] outline-none transition-all duration-200 placeholder:text-[#98A6BF] hover:border-[#B9C4D4] focus:border-[#FFBF00] focus:ring-2 focus:ring-[#FFBF00]/20"
            />
          </label>
        </div>

        {/* Brand cards */}
        <div
          aria-live="polite"
          className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
        >
          {visibleBrands.map((brand, index) => (
            <a
              key={brand.name}
              href={`/brands/${encodeURIComponent(
                brand.name.toLowerCase().replace(/\s+/g, "-")
              )}`}
              style={{ animationDelay: `${index * 35}ms` }}
              className="group flex min-h-28 min-w-0 flex-col items-center justify-center gap-1.5 rounded-2xl border border-[#DCE3ED] bg-white px-2 py-3.5 text-center opacity-0 shadow-[0_1px_3px_rgba(16,24,40,0.02)] transition-[transform,border-color,box-shadow] duration-300 ease-out animate-[brandEnter_.35s_ease-out_forwards] hover:-translate-y-1 hover:border-[#FFBF00] hover:shadow-[0_8px_20px_rgba(16,24,40,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF00] focus-visible:ring-offset-2"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#0B1220] text-base font-extrabold leading-6 text-[#FFBF00] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FFBF00] group-hover:text-[#0B1220]">
                {brand.initials}
              </span>

              <span className="max-w-full break-words text-xs font-bold leading-4 text-[#172033] transition-colors duration-200 group-hover:text-[#B98200] sm:text-sm">
                {brand.name}
              </span>

              <span className="text-[10px] leading-4 text-[#66738C] sm:text-[11px]">
                Vehicles &amp; parts
              </span>

              <span className="sr-only">
                Browse {brand.name} vehicles and parts
              </span>
            </a>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="py-12 text-center">
            <p className="font-semibold text-[#172033]">
              No brands found
            </p>
            <p className="mt-2 text-sm text-[#66738C]">
              Try another brand name or category.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("Popular");
              }}
              className="mt-4 rounded-full bg-[#0B1220] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#263247]"
            >
              Reset filters
            </button>
          </div>
        )}

        {filteredBrands.length > 16 && (
          <button
            type="button"
            onClick={() => setShowAll((previous) => !previous)}
            className="mx-auto mt-6 flex items-center gap-2 rounded-full border border-[#DCE3ED] bg-white px-5 py-2.5 text-sm font-semibold text-[#172033] transition-all duration-200 hover:border-[#FFBF00] hover:bg-[#FFF9E5]"
          >
            {showAll ? "Show fewer brands" : "Show all brands"}
            <ArrowRight
              size={16}
              className={`transition-transform duration-200 ${
                showAll ? "rotate-[-90deg]" : "group-hover:translate-x-1"
              }`}
            />
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes brandEnter {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}

"use client";

import { useState, useMemo, type ReactNode } from "react";
import Image from "next/image";
import { Search, FileText, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type GuideCategory =
  | "All"
  | "New"
  | "Used"
  | "EV"
  | "Private sale"
  | "Dealer"
  | "Trade-in"
  | "Fleet";

export type GuideCard = {
  id: string;
  categoryTag: string; // e.g. "BUYING · USED"
  title: string;
  badgeLabel?: string;
  reviewedDate?: string;
  imageSrc: string;
  imageAlt: string;
  categories: GuideCategory[];
  href?: string;
};

const DEFAULT_CATEGORIES: GuideCategory[] = [
  "All",
  "New",
  "Used",
  "EV",
  "Private sale",
  "Dealer",
  "Trade-in",
  "Fleet",
];

const DEFAULT_GUIDE_CARDS: GuideCard[] = [
  {
    id: "checking-used-car-history",
    categoryTag: "BUYING · USED",
    title: "Checking a used car's history",
    badgeLabel: "Independent guide",
    reviewedDate: "Reviewed 1 Oct 2026",
    imageSrc: "/images/disputes/4.png",
    imageAlt: "Hands signing contract agreement documentation",
    categories: ["Used"],
  },
  {
    id: "buying-from-private-seller",
    categoryTag: "BUYING · PRIVATE SALE",
    title: "Buying from a private seller",
    badgeLabel: "Independent guide",
    reviewedDate: "Reviewed 1 Oct 2026",
    imageSrc: "/images/auto/5.png",
    imageAlt: "Luxury sedan vehicle silhouette in dark background studio",
    categories: ["Private sale"],
  },
  {
    id: "buying-from-a-dealer",
    categoryTag: "BUYING · DEALER",
    title: "Buying from a dealer",
    badgeLabel: "Independent guide",
    reviewedDate: "Reviewed 1 Oct 2026",
    imageSrc: "/images/auto/2.png",
    imageAlt: "Sports car parked outdoors on road",
    categories: ["Dealer"],
  },
  {
    id: "buying-your-first-ev",
    categoryTag: "BUYING · EV",
    title: "Buying your first EV",
    badgeLabel: "Independent guide",
    reviewedDate: "Reviewed 1 Oct 2026",
    imageSrc: "/images/auto/4.png",
    imageAlt: "Electric vehicle plug connector charging at station",
    categories: ["EV", "New", "Used"],
  },
  {
    id: "trading-in-your-car",
    categoryTag: "SELLING · TRADE-IN",
    title: "Trading in your car",
    badgeLabel: "Independent guide",
    reviewedDate: "Reviewed 1 Oct 2026",
    imageSrc: "/images/auto/9.png",
    imageAlt: "Front profile of muscle car parked outdoors",
    categories: ["Trade-in"],
  },
  {
    id: "writing-an-honest-listing",
    categoryTag: "SELLING · PRIVATE SALE",
    title: "Writing an honest listing",
    badgeLabel: "Independent guide",
    reviewedDate: "Reviewed 1 Oct 2026",
    imageSrc: "/images/Careers/c8.png",
    imageAlt: "Laptop screen showing code editor on office desk",
    categories: ["Private sale"],
  },
  {
    id: "selling-a-fleet-vehicle",
    categoryTag: "SELLING · FLEET",
    title: "Selling a fleet vehicle",
    badgeLabel: "Independent guide",
    reviewedDate: "Reviewed 1 Oct 2026",
    imageSrc: "/images/auto/7.png",
    imageAlt: "Commercial transport truck driving on open highway road",
    categories: ["Fleet"],
  },
  {
    id: "buying-a-new-car",
    categoryTag: "BUYING · NEW",
    title: "Buying a new car",
    badgeLabel: "Independent guide",
    reviewedDate: "Reviewed 1 Oct 2026",
    imageSrc: "/images/auto/9.png",
    imageAlt: "Front view of modern sport vehicle",
    categories: ["New"],
  },
];

type BrowseGuidesSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  categories?: GuideCategory[];
  guides?: GuideCard[];
  className?: string;
};

export default function BrowseGuidesSection({
  id = "browse-guides",
  eyebrow = "Guides",
  title = "Browse guides",
  description,
  categories = DEFAULT_CATEGORIES,
  guides = DEFAULT_GUIDE_CARDS,
  className = "bg-white",
}: BrowseGuidesSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<GuideCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Category and Live Search Filtering
  const filteredGuides = useMemo(() => {
    return guides.filter((card) => {
      const matchesCategory =
        selectedCategory === "All" ||
        card.categories.includes(selectedCategory);

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        card.title.toLowerCase().includes(query) ||
        card.categoryTag.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [guides, selectedCategory, searchQuery]);

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        {/* Section Title */}
        <Reveal delay={50}>
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        {/* Filter Controls Row: Category Pills + Search Box */}
        <Reveal delay={100} className="mt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                      isActive
                        ? "bg-[#0B1220] text-white shadow-xs"
                        : "border border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:text-ink"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="w-full sm:w-64 lg:w-72 shrink-0">
              <label htmlFor="search-guides-input" className="sr-only">
                Search within guides
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search-guides-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search within guides"
                  className="w-full rounded-2xl border border-slate-200/90 bg-white py-2.5 pl-4 pr-10 text-xs text-ink placeholder-slate-400 shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden sm:text-sm"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
                )}
              </div>
            </div>
          </div>

          {/* Active Results Counter */}
          <div className="mt-4 text-[11px] font-semibold text-slate-400">
            {filteredGuides.length}{" "}
            {filteredGuides.length === 1 ? "guide" : "guides"}
          </div>
        </Reveal>

        {/* 3-Column Grid for Guide Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGuides.length > 0 ? (
            filteredGuides.map((card, index) => (
              <Reveal key={card.id} delay={index * 40}>
                <a
                  href={card.href || "#"}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-md h-full"
                >
                  <div>
                    {/* Zero-padding Edge-to-Edge Image */}
                    <div className="relative aspect-[20/10] w-full overflow-hidden">
                      <Image
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content Box */}
                    <div className="p-6">
                      <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                        {card.categoryTag}
                      </div>

                      <h3 className="mt-1 text-sm font-bold text-ink transition-colors group-hover:text-amber-600 sm:text-base">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Bottom Meta Bar (Independent guide badge & date) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-6 py-4 text-[11px] font-medium text-slate-400">
                    {card.badgeLabel && (
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <FileText className="h-3.5 w-3.5 text-slate-400" />
                        <span>{card.badgeLabel}</span>
                      </span>
                    )}

                    {card.reviewedDate && <span>{card.reviewedDate}</span>}
                  </div>
                </a>
              </Reveal>
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-200 p-12 text-center">
              <p className="text-sm font-medium text-slate-500">
                No guides found matching your criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-full bg-[#0B1220] px-5 py-2 text-xs font-bold text-white shadow-xs"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

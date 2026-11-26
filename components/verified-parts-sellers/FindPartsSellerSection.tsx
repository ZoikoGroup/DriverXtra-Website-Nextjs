"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type SellerSortOption =
  | "best-text-match"
  | "name-az"
  | "verified-recent";

export type SellerVerificationState =
  | "verified"
  | "under-review"
  | "expired"
  | "unavailable";

export type PartsSellerItem = {
  id: string;
  name: string;
  badgeLabel?: string;
  location: string;
  market: string;
  offersSummary: string;
  offerTags: string[];
  verificationState: SellerVerificationState;
  statusHeading: string;
  statusDetail: string;
  imageSrc: string;
  imageAlt: string;
  profileHref?: string;
  verificationInfoHref?: string;
};

const DEFAULT_PARTS_SELLERS: PartsSellerItem[] = [
  {
    id: "example-motor-parts",
    name: "Example Motor Parts",
    badgeLabel: "EXAMPLE",
    location: "Manchester, United Kingdom",
    market: "uk",
    offersSummary: "Sells OEM, Aftermarket parts",
    offerTags: ["oem", "aftermarket"],
    verificationState: "verified",
    statusHeading: "Verified for the published checks",
    statusDetail:
      "Business details checked against the published criteria on 14 Oct 2026.",
    imageSrc: "/images/part/3.png",
    imageAlt: "Teal performance coupe parked at dusk on coastal road",
    profileHref: "#seller-example-motor-parts",
    verificationInfoHref: "#what-seller-verification-means",
  },
  {
    id: "northside-oem",
    name: "Northside OEM",
    badgeLabel: "EXAMPLE",
    location: "Leeds, United Kingdom",
    market: "uk",
    offersSummary: "Sells OEM parts",
    offerTags: ["oem"],
    verificationState: "verified",
    statusHeading: "Verified for the published checks",
    statusDetail:
      "Business details checked against the published criteria on 28 Sep 2026.",
    imageSrc: "/images/part/2.png",
    imageAlt: "Dark vehicle inside workshop bay with open door and lighting",
    profileHref: "#seller-northside-oem",
    verificationInfoHref: "#what-seller-verification-means",
  },
  {
    id: "midlands-axle-supply",
    name: "Midlands Axle & Chassis Supply",
    badgeLabel: "EXAMPLE",
    location: "Birmingham, United Kingdom",
    market: "uk",
    offersSummary: "Sells Aftermarket, Remanufactured parts",
    offerTags: ["aftermarket", "remanufactured"],
    verificationState: "under-review",
    statusHeading: "Verification currently under review",
    statusDetail:
      "Periodic review of published seller details is currently in progress.",
    imageSrc: "/images/part/4.png",
    imageAlt: "Front grille view of dark coupe parked outdoors",
    profileHref: "#seller-midlands-axle-supply",
    verificationInfoHref: "#what-seller-verification-means",
  },
];

type FindPartsSellerSectionProps = {
  id?: string;
  heading?: ReactNode;
  subheading?: ReactNode;
  sellers?: PartsSellerItem[];
  onViewProfile?: (seller: PartsSellerItem) => void;
  className?: string;
};

export default function FindPartsSellerSection({
  id = "find-parts-seller",
  heading = "Find a parts seller",
  subheading = "Review seller details and understand what verification checks cover.",
  sellers = DEFAULT_PARTS_SELLERS,
  onViewProfile,
  className = "bg-white",
}: FindPartsSellerSectionProps) {
  const [searchInput, setSearchInput] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [market, setMarket] = useState("uk");
  const [sellerOffers, setSellerOffers] = useState("any");
  const [sortBy, setSortBy] = useState<SellerSortOption>("best-text-match");
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAppliedQuery(searchInput.trim());
  };

  const filteredSellers = useMemo(() => {
    const q = appliedQuery.toLowerCase();

    const matches = sellers.filter((seller) => {
      if (verifiedOnly && seller.verificationState !== "verified") {
        return false;
      }

      if (market !== "all" && seller.market !== market) {
        return false;
      }

      if (sellerOffers !== "any" && !seller.offerTags.includes(sellerOffers)) {
        return false;
      }

      if (q) {
        const haystack =
          `${seller.name} ${seller.location} ${seller.offersSummary}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });

    const sorted = [...matches];
    if (sortBy === "name-az") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "verified-recent") {
      sorted.sort((a, b) => b.statusDetail.localeCompare(a.statusDetail));
    }

    return sorted;
  }, [sellers, verifiedOnly, market, sellerOffers, appliedQuery, sortBy]);

  return (
    <section id={id} className={`scroll-mt-28 py-16 md:py-20 ${className}`}>
      <div className={container}>
        {/* Section Heading */}
        <Reveal delay={40}>
          <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
              {subheading}
            </p>
          )}
        </Reveal>

        {/* Filter & Search Toolbar */}
        <Reveal delay={80}>
          <form
            onSubmit={handleSearchSubmit}
            className="mt-6 flex flex-wrap items-end gap-3"
          >
            {/* Search Input + Dark Pill Button */}
            <div className="min-w-[240px] flex-1 sm:max-w-xs">
              <label
                htmlFor="parts-seller-search"
                className="mb-1.5 block text-[11px] font-bold text-ink"
              >
                Search parts sellers
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="parts-seller-search"
                  type="text"
                  value={searchInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchInput(val);
                    if (val.trim() === "") {
                      setAppliedQuery("");
                    }
                  }}
                  placeholder=""
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-ink shadow-2xs transition-colors focus:border-slate-400 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-[#0B1220] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-slate-800"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Market Select */}
            <div className="w-full sm:w-44">
              <label
                htmlFor="parts-seller-market"
                className="mb-1.5 block text-[11px] font-bold text-ink"
              >
                Market
              </label>
              <div className="relative">
                <select
                  id="parts-seller-market"
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-8 text-xs font-medium text-ink shadow-2xs focus:border-slate-400 focus:outline-hidden"
                >
                  <option value="uk">United Kingdom</option>
                  <option value="us">United States</option>
                  <option value="eu">European Union</option>
                  <option value="all">All markets</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Seller Offers Select */}
            <div className="w-full sm:w-36">
              <label
                htmlFor="parts-seller-offers"
                className="mb-1.5 block text-[11px] font-bold text-ink"
              >
                Seller offers
              </label>
              <div className="relative">
                <select
                  id="parts-seller-offers"
                  value={sellerOffers}
                  onChange={(e) => setSellerOffers(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-8 text-xs font-medium text-ink shadow-2xs focus:border-slate-400 focus:outline-hidden"
                >
                  <option value="any">Any</option>
                  <option value="oem">OEM parts</option>
                  <option value="aftermarket">Aftermarket</option>
                  <option value="remanufactured">Remanufactured</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Sort Select */}
            <div className="w-full sm:w-40">
              <label
                htmlFor="parts-seller-sort"
                className="mb-1.5 block text-[11px] font-bold text-ink"
              >
                Sort
              </label>
              <div className="relative">
                <select
                  id="parts-seller-sort"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as SellerSortOption)
                  }
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-8 text-xs font-medium text-ink shadow-2xs focus:border-slate-400 focus:outline-hidden"
                >
                  <option value="best-text-match">Best text match</option>
                  <option value="name-az">Name: A to Z</option>
                  <option value="verified-recent">Recently checked</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Currently Verified Only Checkbox */}
            <label className="inline-flex cursor-pointer items-center gap-2 py-2.5 pl-1 text-xs font-semibold text-ink">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-slate-300 text-ink focus:ring-ink"
              />
              <span>Currently verified only</span>
            </label>
          </form>
        </Reveal>

        {/* Disclosure & Result Count Row */}
        <div className="mt-4 space-y-1.5">
          <p className="text-[11px] text-slate-400">
            &ldquo;Seller offers&rdquo; describes what a seller sells — not
            brand approval. Sorting never ranks sellers by how
            &ldquo;safe&rdquo; they are, and no placement is paid for.
          </p>

          <p className="text-xs font-medium text-slate-600">
            <strong className="font-extrabold text-ink">
              {filteredSellers.length}{" "}
              {filteredSellers.length === 1 ? "seller" : "sellers"}
            </strong>
            {verifiedOnly && <span> · currently verified only</span>}
          </p>

          <p className="text-[11px] text-slate-400">
            Sellers whose verification is under review, expired or unavailable
            aren&apos;t shown with this filter on.{" "}
            <button
              type="button"
              onClick={() => setVerifiedOnly((prev) => !prev)}
              className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
            >
              {verifiedOnly
                ? "Show all listed sellers"
                : "Show currently verified only"}
            </button>
          </p>
        </div>

        {/* Seller Cards Grid (2 Columns) */}
        {filteredSellers.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-slate-200/80 bg-slate-50/60 p-10 text-center">
            <p className="text-sm font-bold text-ink">
              No parts sellers match your current filters.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Try clearing your search or toggling &ldquo;Show all listed
              sellers&rdquo;.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {filteredSellers.map((seller, index) => (
              <Reveal key={seller.id} delay={index * 45}>
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-0 shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-sm sm:flex-row">
                  {/* Left Edge-to-Edge Zero-Padding Image */}
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-none bg-slate-900 p-0 m-0 sm:aspect-auto sm:w-40 md:w-44">
                    <Image
                      src={seller.imageSrc}
                      alt={seller.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 180px"
                      className="h-full w-full object-cover p-0 m-0"
                    />
                  </div>

                  {/* Right Seller Metadata & Actions */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-extrabold tracking-tight text-ink">
                          {seller.name}
                        </h3>
                        {seller.badgeLabel && (
                          <span className="rounded bg-amber-100/95 px-2 py-0.5 text-[9px] font-extrabold tracking-wider text-amber-900 uppercase">
                            {seller.badgeLabel}
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-[11px] text-slate-500">
                        {seller.location} · {seller.offersSummary}
                      </p>

                      <p
                        className={`mt-3 flex items-center gap-1.5 text-xs font-semibold ${
                          seller.verificationState === "verified"
                            ? "text-emerald-700"
                            : "text-amber-700"
                        }`}
                      >
                        <span
                          className={`inline-block h-1.5 w-1.5 rounded-full ${
                            seller.verificationState === "verified"
                              ? "bg-emerald-600"
                              : "bg-amber-500"
                          }`}
                        />
                        <span>{seller.statusHeading}</span>
                      </p>

                      <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
                        {seller.statusDetail}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      {seller.profileHref ? (
                        <a
                          href={seller.profileHref}
                          onClick={() => onViewProfile?.(seller)}
                          className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold text-ink transition-colors hover:border-slate-300 hover:bg-slate-50"
                        >
                          View seller profile
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onViewProfile?.(seller)}
                          className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold text-ink transition-colors hover:border-slate-300 hover:bg-slate-50"
                        >
                          View seller profile
                        </button>
                      )}

                      <a
                        href={
                          seller.verificationInfoHref ??
                          "#what-seller-verification-means"
                        }
                        className="text-xs font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
                      >
                        What seller verification means
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

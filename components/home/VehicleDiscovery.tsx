"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  Gauge,
  MapPin,
  UserRound,
  Check,
  ShieldCheck,
  FileText,
  ArrowLeftRight,
  ArrowRight,
  Info,
  BadgeCheck,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

type Vehicle = {
  id: number;
  image: string;
  title: string;
  price: string;
  monthly: string;
  market: "Within market" | "Below market";
  mileage: string;
  location: string;
  seller: string;
  condition: string;
  badges: string[];
  category: string[];
  sponsored?: boolean;
};

const filters = [
  "Recommended",
  "Used",
  "New",
  "EV & Hybrid",
  "Commercial & Fleet",
];

const vehicles: Vehicle[] = [
  {
    id: 1,
    image: "/images/home/image1.png",
    title: "2024 Toyota RAV4 2.5 Hybrid Design",
    price: "$31,450",
    monthly: "est. £703/mo*",
    market: "Within market",
    mileage: "8,200 mi",
    location: "Manchester",
    seller: "Dealer",
    condition: "Used",
    badges: ["L4 Business Verified", "History report available"],
    category: ["Used", "EV & Hybrid"],
  },
  {
    id: 2,
    image: "/images/home/image2.png",
    title: "2025 BMW X3 xDrive30e M Sport",
    price: "$52,900",
    monthly: "est. £1,183/mo*",
    market: "Within market",
    mileage: "10 mi",
    location: "London",
    seller: "Dealer",
    condition: "New",
    badges: ["L5 Certified Partner", "New vehicle — no prior history"],
    category: ["New", "EV & Hybrid"],
  },
  {
    id: 3,
    image: "/images/home/image3.png",
    title: "2023 Tesla Model 3 Long Range AWD",
    price: "$29,990",
    monthly: "est. £670/mo*",
    market: "Below market",
    mileage: "14,600 mi",
    location: "Bristol",
    seller: "Private",
    condition: "Used",
    badges: ["L3 Verified Seller", "History report available"],
    category: ["Used", "EV & Hybrid"],
  },
  {
    id: 4,
    image: "/images/home/image4.png",
    title: "2024 Mercedes-Benz C 300 AMG Line Premium",
    price: "$38,500",
    monthly: "est. £861/mo*",
    market: "Within market",
    mileage: "11,900 mi",
    location: "Birmingham",
    seller: "Dealer",
    condition: "Certified",
    badges: ["L4 Business Verified", "History report available"],
    category: ["Used"],
    sponsored: true,
  },
];

export default function VehicleDiscovery() {
  const [activeFilter, setActiveFilter] = useState("Recommended");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [compared, setCompared] = useState<number[]>([]);

  const filteredVehicles =
    activeFilter === "Recommended"
      ? vehicles
      : vehicles.filter((vehicle) =>
          vehicle.category.includes(activeFilter)
        );

  const toggleFavorite = (id: number) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const toggleCompare = (id: number) => {
    setCompared((previous) => {
      if (previous.includes(id)) {
        return previous.filter((item) => item !== id);
      }

      if (previous.length >= 3) {
        return previous;
      }

      return [...previous, id];
    });
  };

  return (
    <section
      id="vehicle-discovery"
      className="relative isolate w-full overflow-hidden bg-white text-[#101828]"
    >
      {/* Dark navy background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[430px] bg-[#07101F] sm:h-[440px] lg:h-[450px]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(72,91,120,0.24),transparent_45%),linear-gradient(110deg,#07101F_0%,#07101F_58%,#111C2B_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07101F]/20" />
      </div>

      {/* Main container: consistent 1280px width */}
      <div className="mx-auto w-full max-w-[1280px] px-4 pb-12 pt-10 sm:px-6 sm:pt-12 lg:px-10 lg:pt-12">
        {/* Heading */}
        <Reveal direction="up">
          <div className="max-w-[520px]">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-5 shrink-0 rounded-full bg-[#FFBF00] transition-all duration-300 hover:w-8" />

              <p className="text-sm font-bold leading-7 text-[#C1C9D6] sm:text-base">
                Vehicle discovery
              </p>
            </div>

            <h2 className="mt-3 text-3xl font-extrabold leading-[1.2] tracking-tight text-white sm:text-4xl sm:leading-[1.37]">
              Vehicles worth{" "}
              <span className="text-[#FFBF00] transition-colors duration-300 hover:text-[#FFD966]">
                your
                <br className="hidden sm:block" /> attention
              </span>
            </h2>

            <p className="mt-2 max-w-[470px] text-sm leading-6 text-[#C1C9D6] sm:text-base sm:leading-7">
              Verified inventory, transparent pricing and the details you
              need to compare with confidence.
            </p>
          </div>
        </Reveal>

        {/* Category filters */}
        <Reveal direction="up" delay={100}>
          <div
            className="mt-4 flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter vehicles"
          >
            {filters.map((filter) => {
              const active = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveFilter(filter)}
                  className={`min-h-10 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 sm:text-sm ${
                    active
                      ? "border-[#FFBF00] bg-[#FFBF00] text-[#07101F] shadow-[0_4px_14px_rgba(255,191,0,0.15)]"
                      : "border-white/25 bg-[#07101F]/40 text-white hover:border-[#FFBF00] hover:bg-white/10 hover:text-[#FFBF00]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Vehicle cards */}
        <div className="mt-7 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {filteredVehicles.map((vehicle, index) => {
            const favorite = favorites.includes(vehicle.id);
            const isCompared = compared.includes(vehicle.id);

            return (
              <Reveal
                key={vehicle.id}
                direction="up"
                delay={index * 120}
              >
                <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#DCE3ED] bg-white shadow-[0_6px_18px_rgba(16,24,40,0.07),0_1px_2px_rgba(16,24,40,0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#FFBF00] hover:shadow-[0_14px_32px_rgba(16,24,40,0.14)]">
                  {/* Vehicle image */}
                  <div className="relative h-44 w-full shrink-0 overflow-hidden bg-[#F2F4F7] sm:h-40 lg:h-[136px]">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.title}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07101F]/25 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Favorite button */}
                    <button
                      type="button"
                      aria-label={
                        favorite
                          ? `Remove ${vehicle.title} from favorites`
                          : `Add ${vehicle.title} to favorites`
                      }
                      aria-pressed={favorite}
                      onClick={() => toggleFavorite(vehicle.id)}
                      className={`absolute right-2.5 top-2.5 flex size-9 items-center justify-center rounded-full bg-white/95 text-[#344054] shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF00] ${
                        favorite ? "text-red-500" : ""
                      }`}
                    >
                      <Heart
                        size={19}
                        strokeWidth={1.8}
                        className={`transition-transform duration-300 ${
                          favorite
                            ? "scale-110 fill-red-500"
                            : "group-hover:scale-105"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Vehicle information */}
                  <div className="flex flex-1 flex-col p-3">
                    {vehicle.sponsored && (
                      <span className="mb-1.5 inline-flex w-fit rounded-full border border-dashed border-[#98A2B3] bg-[#F2F4F7] px-2 py-0.5 text-[10px] font-medium leading-4 text-[#475467]">
                        Sponsored
                      </span>
                    )}

                    <h3 className="min-h-10 text-sm font-bold leading-5 text-[#172033] transition-colors duration-300 group-hover:text-[#B98200]">
                      {vehicle.title}
                    </h3>

                    {/* Price */}
                    <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <p className="text-xl font-extrabold leading-8 tracking-tight text-[#172033]">
                        {vehicle.price}
                      </p>

                      <p className="text-[10px] leading-4 text-[#66738C]">
                        {vehicle.monthly}
                      </p>
                    </div>

                    {/* Market status */}
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span
                        className={`size-1.5 shrink-0 ${
                          vehicle.market === "Below market"
                            ? "rounded-full bg-[#079455]"
                            : "rounded-[1px] bg-[#2463EB]"
                        }`}
                      />

                      <span
                        className={`text-[10px] font-bold leading-4 ${
                          vehicle.market === "Below market"
                            ? "text-[#078052]"
                            : "text-[#2463EB]"
                        }`}
                      >
                        {vehicle.market}
                      </span>
                    </div>

                    {/* Vehicle specifications */}
                    <div className="mt-2.5 grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] leading-4 text-[#66738C]">
                      <span className="flex min-w-0 items-center gap-1">
                        <Gauge size={12} className="shrink-0" />
                        <span className="truncate">{vehicle.mileage}</span>
                      </span>

                      <span className="flex min-w-0 items-center gap-1">
                        <MapPin size={12} className="shrink-0" />
                        <span className="truncate">{vehicle.location}</span>
                      </span>

                      <span className="flex min-w-0 items-center gap-1">
                        <UserRound size={12} className="shrink-0" />
                        <span className="truncate">{vehicle.seller}</span>
                      </span>

                      <span className="flex min-w-0 items-center gap-1">
                        <Check size={12} className="shrink-0" />
                        <span className="truncate">{vehicle.condition}</span>
                      </span>
                    </div>

                    {/* Verification badges */}
                    <div className="mt-2.5 flex flex-col items-start gap-1.5">
                      {vehicle.badges.map((badge, badgeIndex) => (
                        <span
                          key={badge}
                          className={`inline-flex max-w-full items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium leading-4 transition-colors duration-200 sm:text-[10px] ${
                            badgeIndex === 1 && vehicle.id === 2
                              ? "bg-[#E8F0FF] text-[#2463EB]"
                              : "bg-[#E5F5EF] text-[#168365]"
                          }`}
                        >
                          {badgeIndex === 0 ? (
                            <ShieldCheck size={12} className="shrink-0" />
                          ) : (
                            <FileText size={12} className="shrink-0" />
                          )}

                          <span className="truncate">{badge}</span>
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto grid grid-cols-2 gap-1.5 pt-5">
                      <button
                        type="button"
                        aria-pressed={isCompared}
                        onClick={() => toggleCompare(vehicle.id)}
                        disabled={!isCompared && compared.length >= 3}
                        className={`inline-flex min-h-9 min-w-0 items-center justify-center gap-1 rounded-full border px-1.5 text-[10px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF00] disabled:cursor-not-allowed disabled:opacity-40 sm:text-[11px] ${
                          isCompared
                            ? "border-[#FFBF00] bg-[#FFF6D8] text-[#172033]"
                            : "border-[#DCE3ED] bg-white text-[#172033] hover:border-[#FFBF00] hover:bg-[#FFF9E8]"
                        }`}
                      >
                        <ArrowLeftRight size={12} className="shrink-0" />
                        {isCompared ? "Selected" : "Compare"}
                      </button>

                      <a
                        href={`/vehicles/${vehicle.id}`}
                        className="group/details inline-flex min-h-9 min-w-0 items-center justify-center gap-1 rounded-full bg-[#0B1220] px-1.5 text-[10px] font-semibold text-white transition-all duration-300 hover:bg-[#FFBF00] hover:text-[#07101F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF00] sm:text-[11px]"
                      >
                        View details
                        <ArrowRight
                          size={12}
                          className="transition-transform duration-300 group-hover/details:translate-x-0.5"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Animated bottom border */}
                  <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#FFBF00] transition-transform duration-300 group-hover:scale-x-100" />
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom information and link */}
        <Reveal direction="up" delay={200}>
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-1.5 text-[10px] leading-5 text-[#66738C]">
              <Info size={13} className="mt-0.5 shrink-0" />
              Example listings for design review. Production cards render live
              inventory only.
            </p>

            <a
              href="/vehicles"
              className="group/link inline-flex w-fit shrink-0 items-center gap-1.5 border-b-2 border-[#FFBF00] pb-0.5 text-sm font-semibold text-[#172033] transition-colors duration-300 hover:text-[#B98200]"
            >
              View all vehicles

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover/link:translate-x-1"
              />
            </a>
          </div>
        </Reveal>

        {/* Comparison selection feedback */}
        {compared.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#DCE3ED] bg-[#F8FAFC] p-3 transition-all duration-300">
            <p className="text-sm text-[#344054]">
              <BadgeCheck
                size={16}
                className="mr-1 inline-block text-[#168365]"
              />
              {compared.length} of 3 vehicles selected for comparison.
            </p>

            <button
              type="button"
              onClick={() => setCompared([])}
              className="text-sm font-semibold text-[#172033] underline decoration-[#FFBF00] underline-offset-4 transition-colors duration-200 hover:text-[#B98200]"
            >
              Clear selection
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
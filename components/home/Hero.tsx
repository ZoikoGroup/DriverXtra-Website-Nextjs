"use client";

import { useState } from "react";
import {
  CarFront,
  Cog,
  Wrench,
  Search,
  ChevronDown,
  ShieldCheck,
  FileText,
  LockKeyhole,
  Globe,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const tabs = [
  { label: "Vehicles", icon: CarFront },
  { label: "Parts", icon: Cog },
  { label: "Services", icon: Wrench },
];

const trustItems = [
  {
    title: "Verified Sellers",
    description: "See how verification works",
    icon: ShieldCheck,
  },
  {
    title: "Vehicle History Required",
    description: "What history is required",
    icon: FileText,
  },
  {
    title: "Fitment-Verified Parts",
    description: "How fitment confidence works",
    icon: Cog,
  },
  {
    title: "Secure Payments",
    description: "Scope by market and product",
    icon: LockKeyhole,
  },
  {
    title: "Local Compliance",
    description: "Rules for your region",
    icon: Globe,
  },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState("Vehicles");

  const options =
    activeTab === "Vehicles"
      ? ["New", "Used", "Certified"]
      : activeTab === "Parts"
        ? ["New", "Used", "Refurbished"]
        : ["Maintenance", "Repair", "Inspection"];

  return (
    <section className="relative isolate overflow-hidden text-white">
      {/* Background image only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/home/hero-bg.jpeg')",
        }}
      />

      {/* Main hero content */}
      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-9 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:min-h-[510px] lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:px-10 lg:py-16">
        {/* Left: heading and buttons */}
        <div className="min-w-0">
          <Reveal>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-0.5 w-5 shrink-0 rounded-full bg-[#FFBF00]" />
              <p className="text-xs font-bold leading-5 text-[#FFBF00] sm:text-sm">
                Vehicles, parts and services in one marketplace
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="max-w-[640px] text-[clamp(2.25rem,4.2vw,3.75rem)] font-extrabold leading-[1.12] tracking-[-0.035em]">
              Buy, Sell, and Upgrade
              <br className="hidden sm:block" /> Vehicles{" "}
              <span className="text-[#FFBF00]">
                with
                <br className="hidden sm:block" /> Confidence
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-5 max-w-[560px] text-sm leading-6 text-[#C1C9D6] sm:text-base sm:leading-7">
              The global automotive marketplace for vehicles,
              fitment-verified parts, accessories and trusted services — with
              transparent pricing, verified participants and secure
              transactions.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#vehicle-search"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#FFBF00] px-6 py-3 text-sm font-semibold text-[#07101F] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#FFD044] hover:shadow-[0_8px_24px_rgba(255,191,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF00] focus-visible:ring-offset-2"
              >
                Find a Vehicle
              </a>

              <a
                href="/sell-vehicle"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/35 px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#FFBF00] hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF00]"
              >
                Sell Your Vehicle
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right: search panel */}
        <Reveal
          direction="left"
          delay={200}
          className="min-w-0 w-full"
        >
          <div
            id="vehicle-search"
            className="w-full min-w-0 rounded-2xl bg-white p-4 text-[#101828] shadow-[0_18px_50px_rgba(5,10,25,0.28)] transition-shadow duration-300 hover:shadow-[0_22px_55px_rgba(5,10,25,0.36)] sm:p-5"
          >
            <h2 className="mb-3 text-sm font-bold leading-5 text-[#52627F]">
              Search DriverXtra
            </h2>

            {/* Category tabs */}
            <div
              role="tablist"
              aria-label="Search category"
              className="grid grid-cols-3 gap-1 rounded-xl border border-[#DFE5EE] bg-[#F4F6F9] p-1"
            >
              {tabs.map(({ label, icon: Icon }) => {
                const active = activeTab === label;

                return (
                  <button
                    key={label}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(label)}
                    className={`flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-lg px-1 text-xs font-semibold transition-all duration-200 ease-out sm:gap-2 sm:px-2 sm:text-sm ${
                      active
                        ? "bg-[#0B1220] text-white shadow-[0_2px_6px_rgba(11,18,32,0.25)]"
                        : "text-[#66738C] hover:bg-white hover:text-[#101828]"
                    }`}
                  >
                    <Icon
                      size={14}
                      strokeWidth={1.8}
                      className={`shrink-0 transition-colors duration-200 ${
                        active ? "text-[#FFBF00]" : ""
                      }`}
                    />
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Search form */}
            <form
              className="mt-4 space-y-3.5"
              onSubmit={(event) => {
                event.preventDefault();

                const formData = new FormData(event.currentTarget);
                const params = new URLSearchParams();

                formData.forEach((value, key) => {
                  if (String(value).trim()) {
                    params.set(key, String(value).trim());
                  }
                });

                params.set("category", activeTab.toLowerCase());

                window.location.href = `/search?${params.toString()}`;
              }}
            >
              <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
                {/* Condition / service type */}
                <label className="block min-w-0">
                  <span className="mb-1 block text-[11px] font-semibold leading-5 text-[#344054] sm:text-xs">
                    {activeTab === "Vehicles"
                      ? "New / Used / Certified"
                      : activeTab === "Parts"
                        ? "Part Condition"
                        : "Service Type"}
                  </span>

                  <div className="relative">
                    <select
                      name="condition"
                      defaultValue=""
                      className="h-11 w-full appearance-none rounded-xl border border-[#DFE5EE] bg-white py-2 pl-3 pr-9 text-xs text-[#344054] outline-none transition-colors duration-200 focus:border-[#FFBF00] focus:ring-2 focus:ring-[#FFBF00]/20 sm:text-sm"
                    >
                      <option value="">
                        {activeTab === "Vehicles"
                          ? "All vehicles"
                          : activeTab === "Parts"
                            ? "All conditions"
                            : "All services"}
                      </option>

                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#66738C]"
                    />
                  </div>
                </label>

                {/* Location */}
                <label className="block min-w-0">
                  <span className="mb-1 block text-[11px] font-semibold leading-5 text-[#344054] sm:text-xs">
                    Location / Postcode
                  </span>

                  <input
                    name="location"
                    type="text"
                    placeholder="e.g. M1 1AE"
                    className="h-11 w-full min-w-0 rounded-xl border border-[#DFE5EE] px-3 text-xs text-[#344054] outline-none transition-colors duration-200 placeholder:text-[#98A6BF] focus:border-[#FFBF00] focus:ring-2 focus:ring-[#FFBF00]/20 sm:text-sm"
                  />
                </label>

                {/* Keyword */}
                <label className="block min-w-0">
                  <span className="mb-1 block text-[11px] font-semibold leading-5 text-[#344054] sm:text-xs">
                    {activeTab === "Vehicles"
                      ? "Make & Model"
                      : activeTab === "Parts"
                        ? "Part Name"
                        : "Service Name"}
                  </span>

                  <input
                    name="keyword"
                    type="text"
                    placeholder={
                      activeTab === "Vehicles"
                        ? "e.g. Toyota RAV4 or VW"
                        : activeTab === "Parts"
                          ? "e.g. Brake pads"
                          : "e.g. Vehicle servicing"
                    }
                    className="h-11 w-full min-w-0 rounded-xl border border-[#DFE5EE] px-3 text-xs text-[#344054] outline-none transition-colors duration-200 placeholder:text-[#98A6BF] focus:border-[#FFBF00] focus:ring-2 focus:ring-[#FFBF00]/20 sm:text-sm"
                  />
                </label>

                {/* Budget */}
                <label className="block min-w-0">
                  <span className="mb-1 block text-[11px] font-semibold leading-5 text-[#344054] sm:text-xs">
                    Budget / Monthly
                  </span>

                  <div className="relative">
                    <select
                      name="budget"
                      defaultValue=""
                      className="h-11 w-full appearance-none rounded-xl border border-[#DFE5EE] bg-white py-2 pl-3 pr-9 text-xs text-[#344054] outline-none transition-colors duration-200 focus:border-[#FFBF00] focus:ring-2 focus:ring-[#FFBF00]/20 sm:text-sm"
                    >
                      <option value="">Any budget</option>
                      <option value="under-5000">Under 5,000</option>
                      <option value="5000-15000">5,000–15,000</option>
                      <option value="15000-plus">15,000+</option>
                    </select>

                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#66738C]"
                    />
                  </div>
                </label>
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#FFBF00] px-5 py-2.5 text-sm font-semibold text-[#07101F] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FFD044] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF00] focus-visible:ring-offset-2 active:translate-y-0"
              >
                <Search size={15} strokeWidth={2} />
                Search {activeTab}
              </button>
            </form>
          </div>
        </Reveal>
      </div>

      {/* Trust strip */}
      <div className="border-t border-white/10 bg-[#07101F]/90 backdrop-blur-[2px]">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-10">
          {trustItems.map(({ title, description, icon: Icon }) => (
            <a
              key={title}
              href="#trust"
              className="group flex min-w-0 items-center gap-3 border-b border-white/10 px-3 py-4 transition-colors duration-200 hover:bg-white/[0.04] sm:px-4 lg:border-b-0 lg:border-l lg:first:border-l-0"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#FFBF00] text-[#FFBF00] transition-all duration-300 group-hover:bg-[#FFBF00] group-hover:text-[#07101F] group-hover:shadow-[0_0_18px_rgba(255,191,0,0.18)]">
                <Icon size={19} strokeWidth={1.7} />
              </span>

              <span className="min-w-0">
                <span className="block text-sm font-bold leading-5 transition-colors duration-200 group-hover:text-[#FFBF00]">
                  {title}
                </span>
                <span className="mt-0.5 block text-xs leading-5 text-[#AEB9CA]">
                  {description}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Reduced-motion accessibility */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          :global(*) {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
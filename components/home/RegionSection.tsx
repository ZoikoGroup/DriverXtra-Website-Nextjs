"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CreditCard,
  Gauge,
  FileText,
  Truck,
  LockKeyhole,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const regions = {
  "United Kingdom": {
    currency: "GBP",
    distance: "Miles",
    symbol: "£",
  },
  "United States": {
    currency: "USD",
    distance: "Miles",
    symbol: "$",
  },
  India: {
    currency: "INR",
    distance: "Kilometres",
    symbol: "₹",
  },
  Australia: {
    currency: "AUD",
    distance: "Kilometres",
    symbol: "A$",
  },
  Canada: {
    currency: "CAD",
    distance: "Kilometres",
    symbol: "C$",
  },
} as const;

type RegionName = keyof typeof regions;

export default function RegionSection() {
  const [region, setRegion] = useState<RegionName>("United Kingdom");
  const [currency, setCurrency] = useState("GBP");
  const [distance, setDistance] = useState("Miles");
  const [message, setMessage] = useState(
    "Currently showing: United Kingdom, GBP, miles."
  );

  const features = [
    { label: "Currency", Icon: CreditCard },
    { label: "Units", Icon: Gauge },
    { label: "Local disclosures", Icon: FileText },
    { label: "Cross-border logistics", Icon: Truck },
    { label: "Privacy controls", Icon: LockKeyhole },
  ];

  function handleRegionChange(value: string) {
    const selectedRegion = value as RegionName;
    setRegion(selectedRegion);
    setCurrency(regions[selectedRegion].currency);
    setDistance(regions[selectedRegion].distance);
  }

  function handleSubmit() {
    setMessage(
      `Currently showing: ${region}, ${currency}, ${distance.toLowerCase()}.`
    );
  }

  return (
    <section className="w-full overflow-hidden bg-[#F5F7FA] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      {/* Same 1280px width as the other sections */}
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid w-full overflow-hidden rounded-2xl border border-[#DCE3ED] bg-white transition-shadow duration-500 hover:shadow-[0_18px_45px_rgba(11,18,32,0.08)] md:grid-cols-2 md:rounded-3xl">
          {/* Left content */}
          <Reveal direction="up">
            <div className="flex h-full min-w-0 flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-8 lg:py-10">
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-4 rounded-full bg-[#FFB900] transition-all duration-300 hover:w-8" />

                <span className="text-sm font-bold leading-6 text-[#D99400]">
                  Your region
                </span>
              </div>

              {/* Heading */}
              <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-[#172033] sm:text-3xl lg:text-[28px] lg:leading-[1.12]">
                Global by design.{" "}
                <span className="transition-colors duration-300 hover:text-[#C58A00] text-[#E6A000]">
                  Local where it matters.
                </span>
              </h2>

              <p className="mt-3 max-w-[460px] text-sm leading-6 text-[#77849B] sm:text-base">
                DriverXtra adapts marketplace rules, disclosures, currency,
                units and partner eligibility to the market you choose.
              </p>

              {/* Feature icons */}
              <div className="mt-5 grid grid-cols-5 gap-2">
                {features.map(({ label, Icon }, index) => (
                  <Reveal
                    key={label}
                    direction="up"
                    delay={index * 70}
                  >
                    <div className="group/feature flex min-w-0 flex-col items-center gap-1.5 text-center">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FFF5D9] text-[#E6A000] transition-all duration-300 group-hover/feature:-translate-y-1 group-hover/feature:scale-110 group-hover/feature:bg-[#FFB900] group-hover/feature:text-[#0B1220] group-hover/feature:shadow-[0_6px_16px_rgba(255,185,0,0.2)] sm:size-11">
                        <Icon
                          size={17}
                          strokeWidth={1.7}
                          className="transition-transform duration-300 group-hover/feature:rotate-[-8deg]"
                        />
                      </div>

                      <span className="text-[10px] font-semibold leading-4 text-[#172033] transition-colors duration-300 group-hover/feature:text-[#D99400] sm:text-xs sm:leading-5">
                        {label}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Region form */}
              <form
                className="mt-5 flex flex-col gap-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {/* Country */}
                  <div className="min-w-0">
                    <label
                      htmlFor="region"
                      className="mb-1 block text-xs font-semibold leading-5 text-[#172033]"
                    >
                      Country / region
                    </label>

                    <div className="group/select relative">
                      <select
                        id="region"
                        value={region}
                        onChange={(event) =>
                          handleRegionChange(event.target.value)
                        }
                        className="h-10 w-full appearance-none rounded-xl border border-[#DCE3ED] bg-white px-3 pr-8 text-sm text-[#172033] outline-none transition-all duration-200 hover:border-[#B7C2D2] focus:border-[#E6A000] focus:ring-2 focus:ring-[#FFB900]/20"
                      >
                        {Object.keys(regions).map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#77849B] transition-transform duration-200 group-hover/select:text-[#D99400]"
                      />
                    </div>
                  </div>

                  {/* Currency */}
                  <div className="min-w-0">
                    <label
                      htmlFor="currency"
                      className="mb-1 block text-xs font-semibold leading-5 text-[#172033]"
                    >
                      Currency
                    </label>

                    <div className="group/select relative">
                      <select
                        id="currency"
                        value={currency}
                        onChange={(event) => setCurrency(event.target.value)}
                        className="h-10 w-full appearance-none rounded-xl border border-[#DCE3ED] bg-white px-3 pr-8 text-sm text-[#172033] outline-none transition-all duration-200 hover:border-[#B7C2D2] focus:border-[#E6A000] focus:ring-2 focus:ring-[#FFB900]/20"
                      >
                        {["GBP", "USD", "INR", "AUD", "CAD", "EUR"].map(
                          (value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          )
                        )}
                      </select>

                      <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#77849B] transition-colors duration-200 group-hover/select:text-[#D99400]"
                      />
                    </div>
                  </div>

                  {/* Distance units */}
                  <div className="min-w-0">
                    <label
                      htmlFor="distance"
                      className="mb-1 block text-xs font-semibold leading-5 text-[#172033]"
                    >
                      Distance units
                    </label>

                    <div className="group/select relative">
                      <select
                        id="distance"
                        value={distance}
                        onChange={(event) => setDistance(event.target.value)}
                        className="h-10 w-full appearance-none rounded-xl border border-[#DCE3ED] bg-white px-3 pr-8 text-sm text-[#172033] outline-none transition-all duration-200 hover:border-[#B7C2D2] focus:border-[#E6A000] focus:ring-2 focus:ring-[#FFB900]/20"
                      >
                        <option value="Miles">Miles</option>
                        <option value="Kilometres">Kilometres</option>
                      </select>

                      <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#77849B] transition-colors duration-200 group-hover/select:text-[#D99400]"
                      />
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-1">
                  <button
                    type="submit"
                    className="group/button inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#FFB900] px-5 py-2.5 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EBA900] hover:shadow-[0_8px_20px_rgba(255,185,0,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6A000] active:translate-y-0"
                  >
                    Change Region

                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover/button:translate-x-1"
                    />
                  </button>
                </div>
              </form>

              {/* Current selection */}
              <p
                aria-live="polite"
                className="mt-3 text-sm leading-6 text-[#77849B] transition-colors duration-300"
              >
                {message}
              </p>
            </div>
          </Reveal>

          {/* Right image */}
          <Reveal direction="right" delay={150}>
            <div className="group/image relative min-h-[260px] h-full overflow-hidden bg-gradient-to-br from-[#E9EAF2] via-[#F9E5E8] to-[#172033] sm:min-h-[340px] md:min-h-full">
              <Image
                src="/images/home/4.png"
                alt="DriverXtra regional marketplace experience"
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-105"
              />

              {/* Image overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-[#0B1220]/10 transition-opacity duration-500 group-hover/image:opacity-70" />

              {/* Bottom gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B1220]/30 to-transparent opacity-60 transition-opacity duration-300 group-hover/image:opacity-90" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
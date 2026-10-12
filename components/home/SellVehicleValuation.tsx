"use client";

import { useState, type FormEvent } from "react";
import {
  Tag,
  Zap,
  CarFront,
  Building2,
  Info,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

type ValuationMethod = "Registration" | "VIN" | "Make & model";

const methods: ValuationMethod[] = [
  "Registration",
  "VIN",
  "Make & model",
];

const sellingOptions = [
  {
    title: "List for sale",
    description: "Reach verified buyers directly",
    icon: Tag,
  },
  {
    title: "Instant offer",
    description: "From named partners, with conditions",
    icon: Zap,
  },
  {
    title: "Trade-in",
    description: "Put your value toward the next one",
    icon: CarFront,
  },
  {
    title: "Consignment",
    description: "Business Verified dealers only",
    icon: Building2,
  },
];

export default function SellVehicleValuation() {
  const [method, setMethod] =
    useState<ValuationMethod>("Registration");
  const [identifier, setIdentifier] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [mileage, setMileage] = useState("");
  const [message, setMessage] = useState("");

  function handleMethodChange(nextMethod: ValuationMethod) {
    setMethod(nextMethod);
    setIdentifier("");
    setMake("");
    setModel("");
    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const params = new URLSearchParams({
      method: method.toLowerCase().replace(/\s*&\s*/g, "-"),
      mileage,
    });

    if (method === "Make & model") {
      params.set("make", make.trim());
      params.set("model", model.trim());
    } else {
      params.set("identifier", identifier.trim().toUpperCase());
    }

    // Connect this route to your actual valuation API/page.
    window.location.href = `/valuation?${params.toString()}`;
  }

  return (
    <section
      id="sell-vehicle"
      className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
    >
      <div className="relative isolate mx-auto w-full max-w-[1280px] overflow-hidden rounded-[20px] bg-[#07101F] text-white shadow-[0_18px_50px_rgba(5,10,25,0.15)] transition-shadow duration-500 hover:shadow-[0_24px_65px_rgba(5,10,25,0.22)]">
        {/* Background image */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out hover:scale-[1.02]"
          style={{
            backgroundImage: "url('/images/home/sell-vehicle-bg.png')",
          }}
        />

        {/* Background overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,16,31,0.98)_0%,rgba(7,16,31,0.93)_43%,rgba(7,16,31,0.77)_72%,rgba(7,16,31,0.87)_100%)]"
        />

        {/* Decorative circle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 -z-10 size-64 rounded-full border-[24px] border-[#FFBF00]/10 transition-transform duration-700 ease-out hover:rotate-12 sm:size-80"
        />

        <div className="grid grid-cols-1 items-center gap-8 p-5 sm:p-8 md:p-10 lg:grid-cols-[1.15fr_0.95fr] lg:gap-10 lg:p-10 xl:gap-12 xl:p-10">
          {/* Left content */}
          <div className="min-w-0">
            <Reveal direction="up">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-5 shrink-0 rounded-full bg-[#FFBF00] transition-all duration-300 group-hover:w-8" />

                <p className="text-sm font-bold leading-5 text-[#FFBF00]">
                  Sell your vehicle
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={100}>
              <h2 className="mt-4 max-w-[540px] text-3xl font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-4xl">
                Know what your vehicle{" "}
                <span className="inline-block text-[#FFBF00] transition-colors duration-300 hover:text-[#FFD966]">
                  is worth
                </span>
              </h2>
            </Reveal>

            <Reveal direction="up" delay={180}>
              <p className="mt-4 max-w-[540px] text-sm leading-6 text-[#C1C9D6] sm:text-base sm:leading-7">
                Get a market-informed valuation, then choose how you want
                to sell — list it, request an instant offer, explore
                trade-in or work with a verified consignment partner.
              </p>
            </Reveal>

            {/* Selling options */}
            <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-y-4">
              {sellingOptions.map(({ title, description, icon: Icon }, index) => (
                <Reveal
                  key={title}
                  direction="up"
                  delay={220 + index * 100}
                >
                  <div className="group flex h-full min-w-0 items-start gap-2.5 rounded-xl border border-transparent p-2 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.06] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[#FFBF00] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]"
                    />

                    <div className="min-w-0">
                      <p className="text-sm font-bold leading-5 text-[#E7ECF4] transition-colors duration-300 group-hover:text-white">
                        {title}
                      </p>

                      <p className="mt-0.5 text-xs leading-5 text-[#C1C9D6] sm:text-sm">
                        {description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Disclaimer */}
            <Reveal direction="up" delay={350}>
              <div className="mt-6 flex items-start gap-2">
                <Info
                  size={14}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#98A6BF] transition-colors duration-300 hover:text-[#FFBF00]"
                />

                <p className="max-w-[540px] text-[11px] leading-5 text-[#98A6BF] sm:text-xs">
                  Valuations are estimates shown as a confidence range,
                  based on comparable listings and recent sales in your
                  region. They are not a guaranteed offer.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Valuation form */}
          <Reveal direction="up" delay={200}>
            <div className="group min-w-0 rounded-2xl bg-white p-4 text-[#101828] shadow-[0_18px_50px_rgba(5,10,25,0.28)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(5,10,25,0.35)] sm:p-5 lg:p-6">
              <h3 className="text-base font-bold leading-6 text-[#172033] sm:text-lg">
                Get a valuation
              </h3>

              {/* Method tabs */}
              <div
                role="tablist"
                aria-label="Vehicle identification method"
                className="mt-3 grid grid-cols-3 gap-1 rounded-xl border border-[#DFE5EE] bg-[#F4F6F9] p-1"
              >
                {methods.map((item) => {
                  const active = method === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => handleMethodChange(item)}
                      className={`min-h-10 min-w-0 rounded-lg px-1 py-2 text-[11px] font-semibold transition-all duration-300 sm:min-h-11 sm:px-2 sm:text-xs md:text-sm ${
                        active
                          ? "bg-[#0B1220] text-white shadow-[0_2px_6px_rgba(11,18,32,0.25)]"
                          : "text-[#66738C] hover:bg-white hover:text-[#101828] hover:shadow-sm"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
                {method === "Make & model" ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label className="block min-w-0">
                      <span className="mb-1 block text-xs font-semibold leading-5 text-[#344054]">
                        Make
                      </span>

                      <input
                        required
                        name="make"
                        value={make}
                        onChange={(event) => setMake(event.target.value)}
                        placeholder="e.g. Toyota"
                        autoComplete="off"
                        className="h-11 w-full min-w-0 rounded-xl border border-[#DFE5EE] px-3 text-sm text-[#344054] outline-none transition-all duration-200 placeholder:text-[#98A6BF] focus:border-[#FFBF00] focus:ring-2 focus:ring-[#FFBF00]/20"
                      />
                    </label>

                    <label className="block min-w-0">
                      <span className="mb-1 block text-xs font-semibold leading-5 text-[#344054]">
                        Model
                      </span>

                      <input
                        required
                        name="model"
                        value={model}
                        onChange={(event) => setModel(event.target.value)}
                        placeholder="e.g. Corolla"
                        autoComplete="off"
                        className="h-11 w-full min-w-0 rounded-xl border border-[#DFE5EE] px-3 text-sm text-[#344054] outline-none transition-all duration-200 placeholder:text-[#98A6BF] focus:border-[#FFBF00] focus:ring-2 focus:ring-[#FFBF00]/20"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="block min-w-0">
                    <span className="mb-1 block text-xs font-semibold leading-5 text-[#344054]">
                      {method === "Registration"
                        ? "Registration plate"
                        : "Vehicle Identification Number (VIN)"}
                    </span>

                    <input
                      required
                      name="identifier"
                      value={identifier}
                      onChange={(event) => setIdentifier(event.target.value)}
                      placeholder={
                        method === "Registration"
                          ? "e.g. AB12 CDE"
                          : "Enter your 17-character VIN"
                      }
                      autoComplete="off"
                      maxLength={method === "VIN" ? 17 : 10}
                      className="h-11 w-full min-w-0 rounded-xl border border-[#DFE5EE] px-3 text-sm text-[#344054] outline-none transition-all duration-200 placeholder:text-[#98A6BF] focus:border-[#FFBF00] focus:ring-2 focus:ring-[#FFBF00]/20"
                    />

                    {method === "Registration" && (
                      <span className="mt-1 block text-[11px] leading-5 text-[#66738C]">
                        Used only to look up make, model and year.
                      </span>
                    )}

                    {method === "VIN" && (
                      <span className="mt-1 block text-[11px] leading-5 text-[#66738C]">
                        Enter your vehicle&apos;s VIN to identify it.
                      </span>
                    )}
                  </label>
                )}

                <label className="block min-w-0">
                  <span className="mb-1 block text-xs font-semibold leading-5 text-[#344054]">
                    Mileage (miles)
                  </span>

                  <input
                    required
                    name="mileage"
                    type="number"
                    min="0"
                    max="1000000"
                    step="1"
                    value={mileage}
                    onChange={(event) => setMileage(event.target.value)}
                    placeholder="e.g. 32000"
                    className="h-11 w-full min-w-0 rounded-xl border border-[#DFE5EE] px-3 text-sm text-[#344054] outline-none transition-all duration-200 placeholder:text-[#98A6BF] focus:border-[#FFBF00] focus:ring-2 focus:ring-[#FFBF00]/20"
                  />
                </label>

                <button
                  type="submit"
                  className="group/button flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#FFBF00] px-5 py-2.5 text-sm font-bold text-[#07101F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFD044] hover:shadow-[0_8px_24px_rgba(255,191,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF00] focus-visible:ring-offset-2 active:translate-y-0"
                >
                  Get My Valuation
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover/button:translate-x-1"
                  />
                </button>

                {message && (
                  <p
                    role="status"
                    className="flex items-start gap-2 text-xs leading-5 text-[#66738C]"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                    {message}
                  </p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
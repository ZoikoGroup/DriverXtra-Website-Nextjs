"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CreditCard,
  Info,
  Umbrella,
  Calculator,
  ChevronRight,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function FinanceInsurance() {
  const [vehiclePrice, setVehiclePrice] = useState(28000);
  const [deposit, setDeposit] = useState(3000);
  const [term, setTerm] = useState(48);
  const [apr, setApr] = useState(8.9);

  const monthlyPayment = useMemo(() => {
    const principal = Math.max(0, vehiclePrice - deposit);
    const monthlyRate = apr / 100 / 12;

    if (principal === 0) return 0;
    if (monthlyRate === 0) return principal / term;

    return (
      (principal * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -term))
    );
  }, [vehiclePrice, deposit, term, apr]);

  const totalPayable = monthlyPayment * term + deposit;

  const money = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const financeFeatures = [
    "Compare by APR, total amount payable, term and fees",
    "Soft-check pre-qualification where permitted — no effect on your credit score",
    "Loans and leases, including commercial and fleet",
  ];

  const insuranceFeatures = [
    "Coverage limits, exclusions and excess shown before price",
    "Comprehensive, third party and commercial/fleet cover",
    "Quotes use your selected vehicle — no re-typing details",
    'Sponsored placements are labelled and never ranked as "cheapest"',
  ];

  const insuranceComparisons = [
    { label: "Excess", value: "Compulsory + voluntary, side by side" },
    { label: "Exclusions", value: "Listed in plain language" },
    { label: "Extras", value: "Courtesy car, legal cover, breakdown" },
    { label: "Provider", value: "Name and regulator shown on every quote" },
  ];

  const sliderBackground = (percentage: number) =>
    `linear-gradient(to right, #FFB900 ${percentage}%, #FFFFFF ${percentage}%)`;

  return (
    <section
      id="finance-insurance"
      className="w-full bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Section heading */}
        <Reveal>
          <div className="max-w-[720px]">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-0.5 w-5 rounded-full bg-[#FFB900]" />
              <span className="text-sm font-bold leading-6 text-[#E9A000]">
                Finance &amp; insurance
              </span>
            </div>

            <h2 className="max-w-[650px] text-2xl font-extrabold leading-tight tracking-tight text-[#171F32] sm:text-3xl lg:text-4xl lg:leading-[1.15]">
              Compare the full cost before you
              <br className="hidden sm:block" /> commit
            </h2>

            <p className="mt-2 max-w-[620px] text-sm leading-6 text-[#71809A] sm:text-base sm:leading-7">
              Side-by-side offers from regulated partners, ranked by what
              matters to you
              <br className="hidden sm:block" /> — not by who paid for placement.
            </p>
          </div>
        </Reveal>

        {/* Finance and insurance cards */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Finance card */}
          <Reveal delay={100}>
            <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#DCE3ED] bg-white p-4 transition-all duration-500 hover:-translate-y-2 hover:border-[#FFB900]/60 hover:shadow-[0_24px_48px_-16px_rgba(11,18,32,0.16)] sm:p-6 lg:p-7">
              <div className="mb-5 flex items-center gap-3.5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#0B1220] transition-all duration-500 group-hover:rotate-[-6deg] group-hover:bg-[#FFB900]">
                  <CreditCard
                    size={23}
                    strokeWidth={1.8}
                    className="text-[#FFB900] transition-colors duration-500 group-hover:text-[#0B1220]"
                  />
                </div>

                <h3 className="text-lg font-bold leading-6 text-[#171F32] transition-colors duration-300 group-hover:text-[#B98200] sm:text-xl">
                  Finance that shows the full cost
                </h3>
              </div>

              {/* Finance features */}
              <ul className="space-y-2.5">
                {financeFeatures.map((feature, i) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm leading-5 text-[#273247] transition-transform duration-300 hover:translate-x-1"
                  >
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-[#23966B]"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Monthly payment calculator */}
              <div className="mt-5 rounded-xl border border-[#DCE3ED] bg-[#F5F7FA] p-4 transition-all duration-500 group-hover:border-[#FFB900]/40 group-hover:shadow-sm sm:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Calculator
                    size={16}
                    className="text-[#71809A] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:text-[#B98200]"
                  />
                  <h4 className="text-xs font-bold text-[#171F32]">
                    Estimate a monthly payment
                  </h4>
                </div>

                {/* Vehicle price */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="vehicle-price"
                      className="text-sm text-[#273247]"
                    >
                      Vehicle price
                    </label>
                    <span className="text-sm font-semibold text-[#171F32]">
                      {money(vehiclePrice)}
                    </span>
                  </div>

                  <input
                    id="vehicle-price"
                    type="range"
                    min={5000}
                    max={150000}
                    step={500}
                    value={vehiclePrice}
                    onChange={(e) => {
                      const nextPrice = Number(e.target.value);
                      setVehiclePrice(nextPrice);
                      setDeposit((current) =>
                        Math.min(current, nextPrice)
                      );
                    }}
                    className="finance-slider"
                    style={{
                      background: sliderBackground(
                        ((vehiclePrice - 5000) / 145000) * 100
                      ),
                    }}
                  />
                </div>

                {/* Deposit */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="vehicle-deposit"
                      className="text-sm text-[#273247]"
                    >
                      Deposit
                    </label>
                    <span className="text-sm font-semibold text-[#171F32]">
                      {money(deposit)}
                    </span>
                  </div>

                  <input
                    id="vehicle-deposit"
                    type="range"
                    min={0}
                    max={vehiclePrice}
                    step={100}
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    className="finance-slider"
                    style={{
                      background: sliderBackground(
                        vehiclePrice > 0
                          ? (deposit / vehiclePrice) * 100
                          : 0
                      ),
                    }}
                  />
                </div>

                {/* Loan term */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="loan-term"
                      className="text-sm text-[#273247]"
                    >
                      Term
                    </label>
                    <span className="text-sm font-semibold text-[#171F32]">
                      {term} months
                    </span>
                  </div>

                  <input
                    id="loan-term"
                    type="range"
                    min={12}
                    max={84}
                    step={12}
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                    className="finance-slider"
                    style={{
                      background: sliderBackground(((term - 12) / 72) * 100),
                    }}
                  />
                </div>

                {/* APR */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="loan-apr"
                      className="text-sm text-[#273247]"
                    >
                      Illustrative APR
                    </label>
                    <span className="text-sm font-semibold text-[#171F32]">
                      {apr.toFixed(1)}%
                    </span>
                  </div>

                  <input
                    id="loan-apr"
                    type="range"
                    min={0}
                    max={20}
                    step={0.1}
                    value={apr}
                    onChange={(e) => setApr(Number(e.target.value))}
                    className="finance-slider"
                    style={{
                      background: sliderBackground((apr / 20) * 100),
                    }}
                  />
                </div>

                {/* Monthly payment result */}
                <div className="mt-5 border-t border-[#DCE3ED] pt-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm text-[#273247]">
                      Est. monthly
                    </span>

                    <span className="text-2xl font-extrabold tracking-tight text-[#171F32] transition-colors duration-300 group-hover:text-[#B98200] sm:text-3xl">
                      {money(monthlyPayment)}
                      <span className="ml-1 text-sm font-semibold">/mo</span>
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-[#71809A]">
                    Estimated total payable {money(totalPayable)}, including
                    deposit, at an illustrative {apr.toFixed(1)}% APR. Not an
                    offer; actual rates are set by regulated partners.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.alert(
                    "Pre-qualification requires integration with a regulated finance partner."
                  )
                }
                className="group/finance mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#FFB900] px-5 py-3 text-sm font-bold text-[#0B1220] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFD04D] hover:shadow-[0_8px_24px_rgba(255,185,0,0.25)] active:translate-y-0"
              >
                Get Pre-Qualified
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/finance:translate-x-1"
                />
              </button>
            </article>
          </Reveal>

          {/* Insurance card */}
          <Reveal delay={220}>
            <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#DCE3ED] bg-white p-4 transition-all duration-500 hover:-translate-y-2 hover:border-[#FFB900]/60 hover:shadow-[0_24px_48px_-16px_rgba(11,18,32,0.16)] sm:p-6 lg:p-7">
              <div className="mb-5 flex items-center gap-3.5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#0B1220] transition-all duration-500 group-hover:rotate-[-6deg] group-hover:bg-[#FFB900]">
                  <Umbrella
                    size={23}
                    strokeWidth={1.8}
                    className="text-[#FFB900] transition-colors duration-500 group-hover:text-[#0B1220]"
                  />
                </div>

                <h3 className="text-lg font-bold leading-6 text-[#171F32] transition-colors duration-300 group-hover:text-[#B98200] sm:text-xl">
                  Compare cover with confidence
                </h3>
              </div>

              {/* Insurance features */}
              <ul className="space-y-2.5">
                {insuranceFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm leading-5 text-[#273247] transition-transform duration-300 hover:translate-x-1"
                  >
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-[#23966B]"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Comparison details */}
              <div className="mt-5 rounded-xl border border-[#DCE3ED] bg-[#F5F7FA] p-4 transition-all duration-500 group-hover:border-[#FFB900]/40 group-hover:shadow-sm sm:p-5">
                <h4 className="mb-4 text-xs font-bold text-[#171F32]">
                  What we compare
                </h4>

                <dl className="space-y-3">
                  {insuranceComparisons.map((item, i) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-[88px_minmax(0,1fr)] gap-2 transition-transform duration-300 hover:translate-x-1 sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-3"
                    >
                      <dt className="text-sm leading-5 text-[#71809A]">
                        {item.label}
                      </dt>

                      <dd className="text-sm font-semibold leading-5 text-[#273247]">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.alert(
                    "Insurance comparison requires integration with regulated insurance providers."
                  )
                }
                className="group/insurance mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0B1220] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#222E43] hover:shadow-lg active:translate-y-0"
              >
                Compare Insurance
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/insurance:translate-x-1"
                />
              </button>
            </article>
          </Reveal>
        </div>

        {/* Important notice */}
        <Reveal delay={100}>
          <div className="group mt-5 flex items-start gap-3 rounded-xl border border-[#C9DCFF] bg-[#E9F0FF] px-4 py-4 text-[#294A80] transition-all duration-300 hover:border-[#9DBDFF] hover:shadow-md">
            <Info
              size={18}
              className="mt-0.5 shrink-0 text-[#477FFF] transition-transform duration-300 group-hover:scale-110"
            />

            <p className="text-xs leading-5 sm:text-sm">
              <strong className="font-bold">Important: </strong>
              Finance and insurance are provided by third-party regulated
              partners. DriverXtra does not provide lending or insurance
              directly. Terms, rates, coverage and approval are determined by
              the respective provider and applicable law.
            </p>
          </div>
        </Reveal>

        {/* Commercial and fleet finance */}
        <Reveal delay={160}>
          <div className="group/fleet mt-3 flex flex-col gap-3 rounded-xl border border-dashed border-[#DCE3ED] px-4 py-4 transition-all duration-300 hover:border-[#FFB900]/70 hover:bg-[#FFFCF3] sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-[#273247]">
              <strong className="font-bold text-[#171F32]">
                Commercial &amp; fleet finance.
              </strong>{" "}
              Multi-vehicle lending, leasing and fleet cover from
              business-eligible partners.
            </p>

            <a
              href="/compare-vehicle-finance?mode=leases"
              className="group/link inline-flex w-fit shrink-0 items-center gap-1 border-b-2 border-[#FFB900] pb-1 text-sm font-semibold text-[#171F32] transition-colors duration-300 hover:text-[#B98200]"
            >
              Fleet finance options
              <ChevronRight
                size={16}
                className="transition-transform duration-300 group-hover/link:translate-x-1"
              />
            </a>
          </div>
        </Reveal>
      </div>

      <style jsx>{`
        .finance-slider {
          display: block;
          width: 100%;
          height: 8px;
          appearance: none;
          -webkit-appearance: none;
          border-radius: 999px;
          cursor: pointer;
          outline: none;
          transition: box-shadow 200ms ease;
        }

        .finance-slider::-webkit-slider-thumb {
          width: 17px;
          height: 17px;
          appearance: none;
          -webkit-appearance: none;
          border: 2px solid #ffffff;
          border-radius: 50%;
          background: #0b1220;
          box-shadow: 0 0 0 1px #0b1220;
          transition:
            transform 200ms ease,
            box-shadow 200ms ease;
        }

        .finance-slider::-moz-range-thumb {
          width: 13px;
          height: 13px;
          border: 2px solid #ffffff;
          border-radius: 50%;
          background: #0b1220;
          box-shadow: 0 0 0 1px #0b1220;
          transition:
            transform 200ms ease,
            box-shadow 200ms ease;
        }

        .finance-slider:hover::-webkit-slider-thumb {
          transform: scale(1.2);
          box-shadow: 0 0 0 4px rgba(255, 185, 0, 0.2);
        }

        .finance-slider:hover::-moz-range-thumb {
          transform: scale(1.2);
          box-shadow: 0 0 0 4px rgba(255, 185, 0, 0.2);
        }

        .finance-slider:focus-visible {
          outline: 2px solid #ffb900;
          outline-offset: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          .finance-slider,
          .finance-slider::-webkit-slider-thumb,
          .finance-slider::-moz-range-thumb {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
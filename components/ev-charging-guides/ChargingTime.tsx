"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const FIELDS = [
  {
    id: "capacity",
    label: "Usable battery capacity (kWh)",
    hint: "From your vehicle documents",
  },
  {
    id: "charger",
    label: "Charger rating (kW)",
    hint: "",
  },
  {
    id: "max-power",
    label: "Vehicle's max charging power (kW)",
    hint: "AC: onboard charger. DC: max DC rate.",
  },
] as const;

const CURVE_POINTS = "0,30 85,30 170,80 245,140 320,175";

const inputClass =
  "mt-2 h-11 w-full rounded-lg border border-[#d9dde3] bg-white px-3 text-sm text-[#14233a] outline-none focus:border-[#14233a]";

export default function ChargingTime() {
  const [from, setFrom] = useState("20");
  const [to, setTo] = useState("80");

  return (
    <section className="w-full overflow-x-hidden bg-white px-6 py-12 text-[#14233a] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <p className="flex items-center gap-2 text-sm font-semibold text-[#5b6673]">
          <span aria-hidden="true" className="h-0.5 w-4 bg-[#e0a526]" />
          Speed and charge time
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          How long might charging take?
        </h2>
        <p className="mt-3 max-w-[480px] text-base leading-7 text-[#5b6673]">
          Charging speed usually slows as the battery fills. Never assume
          maximum power is sustained.
        </p>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
          {/* Curve card */}
          <figure className="rounded-2xl border border-[#e3e6eb] bg-white p-5">
            <figcaption className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold">
                Illustrative DC charging curve
              </span>
              <span className="rounded border border-[#e0c25a] bg-[#fdf3c8] px-2 py-0.5 text-sm font-bold uppercase tracking-[0.04em] text-[#5b4a00]">
                Not a specific vehicle
              </span>
            </figcaption>

            <div className="mt-6 grid grid-cols-[40px_1fr] gap-x-3">
              <div className="flex flex-col justify-between pb-8 pt-4 text-sm text-[#5b6673]">
                <span>High</span>
                <span>Low</span>
              </div>
              <div>
                <svg
                  viewBox="0 0 340 200"
                  role="img"
                  aria-label="Charging power stays high at first, then tapers as the battery approaches full"
                  className="h-auto w-full"
                >
                  <path
                    d="M0 0V190H340"
                    fill="none"
                    stroke="#c5cad2"
                    strokeWidth="1.5"
                  />
                  <g transform="translate(0,10)">
                    <polyline
                      points={CURVE_POINTS}
                      fill="none"
                      stroke="#0f1b2d"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
                <div className="mt-2 flex justify-between text-sm text-[#5b6673]">
                  <span>10%</span>
                  <span>90% charge</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-5 text-[#5b6673]">
              Power stays high at first, then tapers as the battery approaches
              full. Shape varies by vehicle, temperature and battery condition.
            </p>
          </figure>

          {/* Inputs card */}
          <form className="rounded-2xl border border-[#e3e6eb] bg-white p-6 shadow-sm">
            <div className="grid gap-x-5 gap-y-5 sm:grid-cols-3">
              {FIELDS.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-bold leading-5"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    inputMode="decimal"
                    className={inputClass}
                  />
                  {field.hint && (
                    <p className="mt-2 text-sm leading-5 text-[#5b6673]">
                      {field.hint}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5">
              <p className="text-sm font-bold">From / to battery %</p>
              <div className="mt-2 flex items-center gap-3">
                <label htmlFor="from" className="sr-only">
                  From battery percent
                </label>
                <input
                  id="from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  inputMode="numeric"
                  className="h-11 w-[72px] rounded-lg border border-[#d9dde3] bg-white px-3 text-sm outline-none focus:border-[#14233a]"
                />
                <ArrowRight
                  className="h-4 w-4 text-[#14233a]"
                  aria-hidden="true"
                />
                <label htmlFor="to" className="sr-only">
                  To battery percent
                </label>
                <input
                  id="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  inputMode="numeric"
                  className="h-11 w-[72px] rounded-lg border border-[#d9dde3] bg-white px-3 text-sm outline-none focus:border-[#14233a]"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

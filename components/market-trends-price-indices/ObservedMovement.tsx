"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Copy, Download, Printer } from "lucide-react";

const VIEW_OPTIONS = [
  { id: "median", label: "Asking price (median)" },
  { id: "index", label: "Asking price index (base = 100)" },
] as const;

const SELECTS = [
  { id: "body", label: "Body style", value: "All body styles" },
  { id: "fuel", label: "Fuel type", value: "All fuel types" },
  { id: "age", label: "Vehicle age", value: "All ages" },
] as const;

const STATS = [
  { label: "Latest (Sept 2026)", value: "£16,280" },
  { label: "Change vs prior month", value: "0.8%" },
  { label: "Change over period", value: "4.6%" },
  { label: "Observations in period", value: "21k+" },
] as const;

const TABS = ["Chart", "Table"] as const;

const Y_LABELS = ["£18.4k", "£16.9k", "£16.3k", "£15.8k", "£15.2k"] as const;

const X_LABELS = [
  "Oct 2025",
  "Dec 2025",
  "Feb 2026",
  "Apr 2026",
  "Jun 2026",
  "Aug 2026",
  "Sept 2026",
] as const;

const POINTS = [
  { x: 20, y: 150 },
  { x: 58, y: 176 },
  { x: 96, y: 178 },
  { x: 134, y: 168 },
  { x: 172, y: 142 },
  { x: 210, y: 134 },
  { x: 248, y: 116 },
  { x: 286, y: 108 },
  { x: 324, y: 84 },
  { x: 362, y: 56 },
  { x: 400, y: 64 },
  { x: 438, y: 44 },
] as const;

const ACTIONS = [
  {
    label: "Download available aggregated data",
    href: "/explore/download",
    icon: Download,
  },
  { label: "Copy link to this view", href: "/explore/share", icon: Copy },
  { label: "Print", href: "/explore/print", icon: Printer },
] as const;

const polyline = POINTS.map((p) => `${p.x},${p.y}`).join(" ");

function SelectField({
  id,
  label,
  value,
}: {
  id: string;
  label: string;
  value: string;
}) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      <div className="relative mt-2">
        <select
          id={id}
          defaultValue={value}
          className="h-10 w-full appearance-none rounded-md border border-[#d9dee5] bg-white px-3 pr-9 text-sm text-[#1a2433]"
        >
          <option>{value}</option>
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-[#6b7686]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default function ObservedMovement() {
  const [view, setView] =
    useState<(typeof VIEW_OPTIONS)[number]["id"]>("median");
  const [tab, setTab] = useState<(typeof TABS)[number]>("Chart");

  return (
    <section className="w-full overflow-x-hidden bg-white px-6 py-10 text-[#1a2433] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <p className="flex items-center gap-2 text-sm font-medium text-[#6b7686]">
          <span className="h-0.5 w-4 bg-[#e0a030]" />
          Explore
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Observed movement for selected cohort
        </h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Filters */}
          <form className="rounded-lg border border-[#e3e7ed] bg-white p-4 shadow-sm">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">Market</span>
              </div>
              <div className="mt-2 flex items-center justify-between rounded-md border border-[#d9dee5] px-3 py-2.5 text-sm">
                <span className="font-bold">United Kingdom</span>
                <Link
                  href="/explore/market"
                  className="text-sm font-semibold text-[#2a5bd7] underline"
                >
                  Change
                </Link>
              </div>
            </div>

            <fieldset className="mt-4">
              <legend className="text-sm font-semibold">
                What you&apos;re viewing
              </legend>
              <div className="mt-2 space-y-2">
                {VIEW_OPTIONS.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-start gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      name="view"
                      checked={view === option.id}
                      onChange={() => setView(option.id)}
                      className="mt-1 h-4 w-4 accent-[#1a2433]"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {SELECTS.map((s) => (
              <SelectField key={s.id} {...s} />
            ))}

            <div className="mt-4 grid grid-cols-2 gap-3">
              <SelectField id="from" label="From" value="Oct 2025" />
              <SelectField id="to" label="To" value="Sept 2026" />
            </div>

            <SelectField
              id="compare"
              label="Compare with fuel type"
              value="No comparison"
            />
            <p className="mt-2 text-sm leading-5 text-[#6b7686]">
              Comparisons use the same observation type and method.
            </p>
            <p className="mt-3 text-sm leading-5 text-[#6b7686]">
              Currency: GBP (nominal, no inflation adjustment)
            </p>

            <button
              type="reset"
              className="mt-4 w-full rounded-md border border-[#d9dee5] bg-white px-4 py-2.5 text-sm font-semibold"
            >
              Reset filters
            </button>
          </form>

          {/* Content */}
          <div className="min-w-0">
            <p className="rounded-md bg-[#f4f6f9] px-4 py-3 text-sm">
              <strong className="font-bold">Viewing:</strong> Asking price
              (median) · United Kingdom · All body styles, All fuel types, All
              ages · Oct 2025–Sept 2026
            </p>
            <p className="mt-2 text-sm italic text-[#6b7686]">
              Asking prices describe advertised amounts, not completed sale
              prices.
            </p>

            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat) => (
                <li
                  key={stat.label}
                  className="rounded-md border border-[#e3e7ed] bg-white p-3"
                >
                  <p className="text-sm text-[#6b7686]">{stat.label}</p>
                  <p className="mt-1 text-2xl font-extrabold">{stat.value}</p>
                </li>
              ))}
            </ul>

            <div
              role="tablist"
              aria-label="Result view"
              className="mt-4 inline-flex gap-2"
            >
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={
                    tab === t
                      ? "rounded-full bg-[#1a2433] px-4 py-1.5 text-sm font-semibold text-white"
                      : "rounded-full border border-[#d9dee5] px-4 py-1.5 text-sm font-semibold"
                  }
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-3 rounded-lg border border-[#e3e7ed] bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-bold">Asking price (median)</h3>
                <p className="flex items-center gap-2 text-sm text-[#6b7686]">
                  <span aria-hidden="true" className="h-0.5 w-5 bg-[#1a2433]" />
                  All fuel types
                </p>
              </div>

              {tab === "Chart" ? (
                <div className="mt-4 flex gap-2">
                  <ul className="flex h-[200px] flex-col justify-between pb-6 text-sm text-[#6b7686]">
                    {Y_LABELS.map((label) => (
                      <li key={label}>{label}</li>
                    ))}
                  </ul>
                  <div className="min-w-0 flex-1">
                    <svg
                      viewBox="0 0 460 200"
                      preserveAspectRatio="none"
                      role="img"
                      aria-label="Line chart of median asking price from October 2025 to September 2026, rising from about £15.5k to £16.3k"
                      className="h-[200px] w-full"
                    >
                      {[0, 50, 100, 150, 200].map((y) => (
                        <line
                          key={y}
                          x1="0"
                          x2="460"
                          y1={y}
                          y2={y}
                          stroke="#e3e7ed"
                          strokeWidth="1"
                        />
                      ))}
                      <polyline
                        points={polyline}
                        fill="none"
                        stroke="#1a2433"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                    <ul className="mt-2 flex justify-between text-sm text-[#6b7686]">
                      {X_LABELS.map((label) => (
                        <li key={label}>{label}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#e3e7ed] text-[#6b7686]">
                        <th className="py-2 font-semibold">Period</th>
                        <th className="py-2 font-semibold">
                          Asking price (median)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#e3e7ed]">
                        <td className="py-2">Oct 2025</td>
                        <td className="py-2">£15,560</td>
                      </tr>
                      <tr>
                        <td className="py-2">Sept 2026</td>
                        <td className="py-2">£16,280</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              <p className="mt-3 text-sm italic text-[#6b7686]">
                Gaps show missing months — they aren&apos;t filled in. Y-axis:
                GBP, nominal.
              </p>
            </div>

            <ul className="mt-3 flex flex-wrap items-center gap-3">
              {ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <li key={action.label}>
                    <Link
                      href={action.href}
                      className="inline-flex items-center gap-2 rounded-md border border-[#d9dee5] bg-white px-3 py-2 text-sm font-semibold"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {action.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

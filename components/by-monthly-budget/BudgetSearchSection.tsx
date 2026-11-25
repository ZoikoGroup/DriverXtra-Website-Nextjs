"use client";

import { useId, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gauge, MapPin, SlidersHorizontal } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { listings, powertrainLabel } from "@/components/buy-vehicles/data";
import { useRegion } from "@/lib/region";
import {
  currencySymbol,
  defaultAssumptions,
  financeableAmount,
  formatMoney,
  monthlyPayment,
  termOptions,
  type Assumptions,
} from "./data";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-ink focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none";

export default function BudgetSearchSection() {
  const region = useRegion();
  const ids = useId();
  const [input, setInput] = useState("");
  const [budget, setBudget] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [assumptions, setAssumptions] = useState<Assumptions>(defaultAssumptions);

  const symbol = currencySymbol(region);
  const money = (n: number) => formatMoney(region, n);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = Number(input.replace(/[^0-9.]/g, ""));
    if (!input.trim() || !Number.isFinite(value) || value <= 0) {
      setError("Enter a monthly amount greater than 0.");
      setBudget(null);
      return;
    }
    setError("");
    setBudget(Math.round(value));
  };

  const clearAll = () => {
    setInput("");
    setBudget(null);
    setError("");
    setAssumptions(defaultAssumptions);
  };

  const update = (patch: Partial<Assumptions>) => setAssumptions((a) => ({ ...a, ...patch }));

  const matches =
    budget === null
      ? []
      : listings
          .filter((l) => l.country === region)
          .map((l) => ({ listing: l, monthly: monthlyPayment(l.price, assumptions) }))
          .filter((m) => m.monthly <= budget)
          .sort((a, b) => b.monthly - a.monthly);

  const exampleBudget = budget ?? 300;
  const exampleAmount = Math.round(financeableAmount(exampleBudget, assumptions) / 10) * 10;
  const assumptionSummary = `Using ${assumptions.termMonths} months · ${assumptions.apr}% assumed annual interest · ${money(
    assumptions.downPayment,
  )} down · taxes and fees not included`;

  return (
    <section className="bg-white pt-5 pb-14 md:pb-16">
      <div className={container}>
        <Reveal>
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.25)]"
          >
            <label htmlFor={`${ids}-budget`} className="text-[13px] font-bold text-ink">
              Maximum monthly vehicle payment
            </label>
            <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <span aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm text-slate-400">
                  {symbol}
                </span>
                <input
                  id={`${ids}-budget`}
                  inputMode="decimal"
                  autoComplete="off"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your monthly budget"
                  aria-describedby={`${ids}-hint${error ? ` ${ids}-error` : ""}`}
                  aria-invalid={Boolean(error)}
                  className={`h-14 w-full rounded-xl border bg-white pr-4 pl-10 text-[17px] text-ink placeholder:text-slate-400 focus:ring-2 focus:ring-brand/40 focus:outline-none ${
                    error ? "border-red-500" : "border-slate-200 focus:border-ink"
                  }`}
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="inline-flex h-11 items-center rounded-full bg-brand px-5 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg"
                >
                  Show matching vehicles
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex h-11 items-center rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-ink transition-colors hover:border-ink"
                >
                  Clear budget and filters
                </button>
              </div>
            </div>
            {error && (
              <p id={`${ids}-error`} role="alert" className="mt-2 text-xs font-semibold text-red-600">
                {error}
              </p>
            )}
            <p id={`${ids}-hint`} className="mt-2 text-xs text-slate-500">
              Choose a payment target, not a loan approval amount.
            </p>

            <button
              type="button"
              onClick={() => setShowAssumptions((s) => !s)}
              aria-expanded={showAssumptions}
              aria-controls={`${ids}-assumptions`}
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900"
            >
              <SlidersHorizontal aria-hidden className="h-4 w-4" />
              Edit payment assumptions
            </button>

            <div
              id={`${ids}-assumptions`}
              className={`grid transition-[grid-template-rows] duration-400 ${showAssumptions ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <fieldset disabled={!showAssumptions} className="grid gap-4 pt-4 sm:grid-cols-3">
                  <legend className="sr-only">Payment assumptions</legend>
                  <label className="text-xs font-semibold text-ink">
                    Term
                    <select
                      value={assumptions.termMonths}
                      onChange={(e) => update({ termMonths: Number(e.target.value) })}
                      className={fieldClass}
                    >
                      {termOptions.map((t) => (
                        <option key={t} value={t}>
                          {t} months
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs font-semibold text-ink">
                    Assumed annual interest (%)
                    <input
                      type="number"
                      min={0}
                      max={40}
                      step={0.1}
                      value={assumptions.apr}
                      onChange={(e) => update({ apr: Math.min(Math.max(Number(e.target.value) || 0, 0), 40) })}
                      className={fieldClass}
                    />
                  </label>
                  <label className="text-xs font-semibold text-ink">
                    Down payment ({symbol})
                    <input
                      type="number"
                      min={0}
                      step={100}
                      value={assumptions.downPayment}
                      onChange={(e) => update({ downPayment: Math.max(Number(e.target.value) || 0, 0) })}
                      className={fieldClass}
                    />
                  </label>
                </fieldset>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">{assumptionSummary}</p>
          </form>
        </Reveal>

        <div aria-live="polite" className="mt-10">
          {budget === null ? (
            <Reveal delay={100}>
              <div className="rounded-2xl bg-slate-50 px-6 py-6 text-center">
                <h2 className="text-lg font-bold text-ink">Enter a monthly amount to see matching vehicles</h2>
                <p className="mt-1 text-sm text-slate-600">
                  For example, {money(exampleBudget)} a month over {assumptions.termMonths} months at {assumptions.apr}% could
                  finance about {money(exampleAmount)} — before taxes, fees and your down payment.
                </p>
              </div>
            </Reveal>
          ) : matches.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 px-6 py-6 text-center">
              <h2 className="text-lg font-bold text-ink">No vehicles match {money(budget)} a month</h2>
              <p className="mt-1 text-sm text-slate-600">
                {listings.some((l) => l.country === region)
                  ? "Try a higher amount, a longer term or a larger down payment."
                  : `There are no listings in ${region} yet. Try changing your location.`}
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <h2 className="text-xl font-bold text-ink">
                  {matches.length} {matches.length === 1 ? "vehicle" : "vehicles"} up to {money(budget)} a month
                </h2>
                <p className="text-xs text-slate-500">
                  About {money(Math.round(financeableAmount(budget, assumptions)) + assumptions.downPayment)} vehicle price
                  at these assumptions
                </p>
              </div>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {matches.map(({ listing: l, monthly }, i) => {
                  const title = `${l.year} ${l.make} ${l.model}`;
                  const total = monthly * assumptions.termMonths + assumptions.downPayment;
                  return (
                    <Reveal as="li" key={l.id} delay={Math.min(i, 5) * 60}>
                      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-24px_rgba(15,23,42,0.4)]">
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                          <Image
                            src={l.image}
                            alt={title}
                            fill
                            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <h3 className="text-[15px] leading-snug font-bold text-ink">{title}</h3>
                          <p className="mt-2 text-xl font-extrabold text-ink">
                            {money(Math.round(monthly))}
                            <span className="text-sm font-semibold text-slate-500"> /month est.</span>
                          </p>
                          <dl className="mt-2 space-y-0.5 text-xs text-slate-600">
                            <div className="flex justify-between gap-3">
                              <dt>Vehicle price</dt>
                              <dd className="font-semibold text-ink">{money(l.price)}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                              <dt>Total repayable (est.)</dt>
                              <dd className="font-semibold text-ink">{money(Math.round(total))}</dd>
                            </div>
                          </dl>
                          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Gauge aria-hidden className="h-3.5 w-3.5" />
                              {l.mileage.toLocaleString()} mi
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin aria-hidden className="h-3.5 w-3.5" />
                              {l.location}
                            </span>
                            <span>{powertrainLabel[l.powertrain]}</span>
                          </p>
                          <div className="mt-auto pt-4">
                            <Link
                              href="/buy-vehicles"
                              className="inline-flex h-9 w-full items-center justify-center rounded-full bg-ink text-xs font-semibold text-white transition-colors hover:bg-navy-700"
                            >
                              View details
                            </Link>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

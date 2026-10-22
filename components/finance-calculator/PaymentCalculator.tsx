"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Calculator, ChevronDown, CircleAlert, Info, RotateCcw, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { calculate, formatGBP, termOptions, type Estimate } from "./data";

type Draft = Record<"price" | "down" | "rate" | "term" | "tradeIn" | "owed" | "taxPercent" | "fees", string>;

const initialDraft: Draft = { price: "25000", down: "0", rate: "7.5", term: "60", tradeIn: "", owed: "", taxPercent: "", fees: "" };

const num = (v: string) => (v.trim() === "" ? 0 : Number(v));

export default function PaymentCalculator() {
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [extrasOpen, setExtrasOpen] = useState(false);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [scenarios, setScenarios] = useState<{ A?: Estimate; B?: Estimate }>({});
  const [scenarioMsg, setScenarioMsg] = useState("");

  const set = (key: keyof Draft) => (v: string) => setDraft((d) => ({ ...d, [key]: v }));

  const fail = (message: string) => {
    setError(message);
    setAttempt((a) => a + 1);
  };

  const run = () => {
    const values = Object.fromEntries(Object.entries(draft).map(([k, v]) => [k, num(v)])) as Record<keyof Draft, number>;
    if (Object.values(values).some((v) => Number.isNaN(v) || v < 0)) return fail("Use positive numbers only.");
    if (!(values.price >= 500)) return fail("Enter a vehicle price of at least £500.");
    if (values.rate > 50) return fail("Enter an interest rate of 50% or less.");
    const result = calculate(values);
    if (result.financed <= 0) return fail("Your down payment and trade-in cover the whole price — there's nothing to finance.");
    setError("");
    setEstimate(result);
    window.setTimeout(() => document.getElementById("estimate-result")?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
  };

  const startOver = () => {
    setDraft(initialDraft);
    setEstimate(null);
    setError("");
    setExtrasOpen(false);
  };

  const save = (slot: "A" | "B") => {
    if (!estimate) {
      setScenarioMsg("Calculate a payment first, then save it.");
      setAttempt((a) => a + 1);
      return;
    }
    setScenarioMsg("");
    setScenarios((s) => ({ ...s, [slot]: estimate }));
  };

  const interestShare = estimate ? (estimate.interest / estimate.totalPayments) * 100 : 0;

  return (
    <>
      <section id="your-estimate" className="scroll-mt-28 bg-white py-16 md:py-20">
        <div className={container}>
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Your estimate</h2>
          </Reveal>

          <Reveal delay={100}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                run();
              }}
              className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <p className="text-xs text-slate-500">Your estimate is based on the information you enter.</p>
              <div className="mt-4 grid gap-x-6 gap-y-4 md:grid-cols-3">
                <Money label="Vehicle price (GBP)" value={draft.price} onChange={set("price")} />
                <Money label="Down payment (GBP)" value={draft.down} onChange={set("down")} />
                <label className="block">
                  <span className="text-xs font-bold text-ink">Illustrative annual interest rate (not APR)</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min={0}
                    value={draft.rate}
                    onChange={(e) => set("rate")(e.target.value)}
                    className={inputCls}
                  />
                  <span className="mt-1.5 block text-[11px] leading-snug text-slate-500">
                    An interest rate is not the same as APR. APR may include certain borrowing costs and follows
                    market-specific disclosure rules.
                  </span>
                </label>
                <label className="block md:col-span-1">
                  <span className="text-xs font-bold text-ink">Loan term (months)</span>
                  <span className="relative mt-1.5 block">
                    <select value={draft.term} onChange={(e) => set("term")(e.target.value)} className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white pr-9 pl-3 text-sm text-ink transition-all duration-200 hover:border-slate-400 focus:border-brand-dark focus:ring-2 focus:ring-brand/30 focus:outline-none">
                      {termOptions.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  </span>
                </label>
              </div>

              {/* Extras */}
              <div className="mt-5 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setExtrasOpen((o) => !o)}
                  aria-expanded={extrasOpen}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-sm font-semibold text-ink"
                >
                  Add a trade-in, taxes and fees
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${extrasOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ${extrasOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="grid gap-4 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-4">
                      <Money label="Trade-in value (GBP)" value={draft.tradeIn} onChange={set("tradeIn")} placeholder="0" />
                      <Money label="Still owed on trade-in (GBP)" value={draft.owed} onChange={set("owed")} placeholder="0" />
                      <label className="block">
                        <span className="text-xs font-bold text-ink">Tax (%)</span>
                        <input type="number" inputMode="decimal" min={0} step="0.1" value={draft.taxPercent} onChange={(e) => set("taxPercent")(e.target.value)} placeholder="0" className={inputCls} />
                      </label>
                      <Money label="Fees financed (GBP)" value={draft.fees} onChange={set("fees")} placeholder="0" />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <p key={attempt} role="alert" className="mt-4 flex animate-shake items-center gap-2 text-sm font-medium text-red-600">
                  <CircleAlert className="h-4 w-4" /> {error}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="btn-shine inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(232,172,0,0.7)]"
                >
                  <Calculator className="h-4 w-4" /> Calculate payment
                </button>
                <button
                  type="button"
                  onClick={startOver}
                  className="group inline-flex h-11 items-center gap-2 rounded-full border border-slate-300 px-6 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
                >
                  <RotateCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" /> Start over
                </button>
              </div>
            </form>
          </Reveal>

          {/* Result */}
          {estimate && (
            <div id="estimate-result" key={estimate.monthly} className="mt-5 grid animate-fade-up scroll-mt-32 gap-5 overflow-hidden rounded-2xl bg-navy p-6 text-white md:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="text-xs font-semibold tracking-wider text-brand uppercase">Illustrative monthly payment</p>
                <p className="mt-2 text-4xl font-extrabold sm:text-5xl">
                  {formatGBP(estimate.monthly)}
                  <span className="text-base font-medium text-slate-400"> × {estimate.term}</span>
                </p>
                <p className="mt-3 flex gap-2 text-xs text-slate-400">
                  <Info className="mt-px h-3.5 w-3.5 shrink-0" /> An estimate, not a lender offer.
                </p>
              </div>
              <div>
                <dl className="space-y-2 text-sm">
                  {[
                    ["Amount financed", estimate.financed],
                    ["Total of payments", estimate.totalPayments],
                    ["Total interest", estimate.interest],
                    ["Total cost (incl. down payment)", estimate.totalCost],
                  ].map(([label, value], i) => (
                    <div key={label as string} className="flex animate-fade-up justify-between gap-3 border-b border-white/10 pb-2" style={{ animationDelay: `${100 + i * 70}ms` }}>
                      <dt className="text-slate-400">{label}</dt>
                      <dd className="font-semibold">{formatGBP(value as number)}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4">
                  <div className="flex h-2.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full origin-left animate-[range-fill_1s_cubic-bezier(0.16,1,0.3,1)_both] bg-brand" style={{ width: `${100 - interestShare}%` }} />
                    <div className="h-full origin-left animate-[range-fill_1s_cubic-bezier(0.16,1,0.3,1)_0.3s_both] bg-orange-400" style={{ width: `${interestShare}%` }} />
                  </div>
                  <p className="mt-2 flex gap-4 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-brand" /> Amount financed
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-orange-400" /> Interest ({interestShare.toFixed(0)}%)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Scenarios */}
          <Reveal>
            <h2 className="mt-12 text-2xl font-extrabold tracking-tight text-ink">Compare two scenarios</h2>
            <p className="mt-1 text-xs text-slate-500">Save your current estimate as Scenario A or B to see the tradeoffs side by side.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {(["A", "B"] as const).map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => save(slot)}
                  className={`inline-flex h-10 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                    scenarios[slot] ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-slate-300 text-ink hover:border-ink"
                  }`}
                >
                  {scenarios[slot] ? `Scenario ${slot} saved — update` : `Save as Scenario ${slot}`}
                </button>
              ))}
              {(scenarios.A || scenarios.B) && (
                <button type="button" onClick={() => setScenarios({})} className="inline-flex items-center gap-1 px-2 text-xs font-semibold text-slate-500 hover:text-ink">
                  <X className="h-3.5 w-3.5" /> Clear scenarios
                </button>
              )}
            </div>
            {scenarioMsg && (
              <p key={attempt} role="alert" className="mt-3 animate-shake text-sm font-medium text-red-600">
                {scenarioMsg}
              </p>
            )}
          </Reveal>

          {(scenarios.A || scenarios.B) && <ScenarioTable a={scenarios.A} b={scenarios.B} />}
        </div>
      </section>
    </>
  );
}

const inputCls =
  "mt-1.5 h-11 w-full max-w-[260px] rounded-lg border border-slate-300 px-3 text-sm text-ink transition-all duration-200 hover:border-slate-400 focus:border-brand-dark focus:ring-2 focus:ring-brand/30 focus:outline-none";

function Money({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-ink">{label}</span>
      <input type="number" inputMode="numeric" min={0} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputCls} />
    </label>
  );
}

function ScenarioTable({ a, b }: { a?: Estimate; b?: Estimate }) {
  const rows: { label: string; value: (e: Estimate) => number; money: boolean; lowerIsBetter?: boolean; suffix?: string }[] = [
    { label: "Vehicle price", value: (e) => e.price, money: true },
    { label: "Down payment", value: (e) => e.down, money: true },
    { label: "Interest rate", value: (e) => e.rate, money: false, suffix: "%" },
    { label: "Term", value: (e) => e.term, money: false, suffix: " months" },
    { label: "Monthly payment", value: (e) => e.monthly, money: true, lowerIsBetter: true },
    { label: "Total interest", value: (e) => e.interest, money: true, lowerIsBetter: true },
    { label: "Total cost", value: (e) => e.totalCost, money: true, lowerIsBetter: true },
  ];
  const show = (r: (typeof rows)[number], e?: Estimate) => (e ? (r.money ? formatGBP(r.value(e)) : `${r.value(e)}${r.suffix ?? ""}`) : "—");

  return (
    <div className="mt-6 animate-fade-up overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            {["", "Scenario A", "Scenario B", "B vs A"].map((h) => (
              <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const diff = a && b ? r.value(b) - r.value(a) : null;
            const better = diff !== null && r.lowerIsBetter ? diff < 0 : null;
            return (
              <tr key={r.label} className="border-t border-slate-100 transition-colors hover:bg-slate-50">
                <th scope="row" className="px-4 py-3 text-xs font-semibold text-slate-500">
                  {r.label}
                </th>
                <td className="px-4 py-3 text-ink">{show(r, a)}</td>
                <td className="px-4 py-3 text-ink">{show(r, b)}</td>
                <td className="px-4 py-3">
                  {diff === null || Math.abs(diff) < 0.005 ? (
                    <span className="text-slate-400">—</span>
                  ) : (
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        better === null ? "text-slate-600" : better ? "text-emerald-600" : "text-orange-600"
                      }`}
                    >
                      {diff > 0 ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />}
                      {r.money ? formatGBP(Math.abs(diff)) : `${Math.abs(Number(diff.toFixed(2)))}${r.suffix ?? ""}`}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

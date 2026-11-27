"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Gauge, Info } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { hrefFor } from "@/lib/navigation";
import { terms } from "@/components/ev-finance/data";
import { Field, Placeholder, Tick, card, gbp, inputBase, num } from "@/components/finance-tools/LoanEstimator";
import { feeItems, feeStates, type FeeState } from "./data";

type Fee = { state: FeeState; amount: string };
type Result = {
  financed: number;
  monthly: number;
  total: number;
  charge: number;
  term: number;
  apr: number;
  lines: [string, number, string?][];
  unknown: string[];
  estimated: string[];
  negativeEquity: number;
};

const selectCls = `${inputBase} cursor-pointer appearance-none border-slate-300 px-3 pr-9`;

/** New-vehicle loan illustration: % or amount down, itemised fees (known / estimated / unknown) and an optional trade-in. */
export default function NewLoanCalculator() {
  const [price, setPrice] = useState("");
  const [downMode, setDownMode] = useState<"amount" | "percent">("amount");
  const [down, setDown] = useState("");
  const [fees, setFees] = useState<Fee[]>(feeItems.map(() => ({ state: "Unknown", amount: "" })));
  const [trading, setTrading] = useState(false);
  const [trade, setTrade] = useState({ value: "", payoff: "" });
  const [apr, setApr] = useState("");
  const [term, setTerm] = useState(60);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [covered, setCovered] = useState(false);

  const clear = (k: string) => setErrors((e) => ({ ...e, [k]: "" }));
  const setFee = (i: number, patch: Partial<Fee>) => {
    setFees((f) => f.map((x, j) => (j === i ? { ...x, ...patch } : x)));
    clear(`fee${i}`);
  };
  const opt = (s: string) => (Number.isFinite(num(s)) ? num(s) : 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = num(price);
    const rate = num(apr);
    const next: Record<string, string> = {};
    if (!(p > 0)) next.price = "Enter the agreed vehicle price.";
    if (downMode === "percent" && opt(down) > 100) next.down = "Enter a percentage up to 100.";
    if (!Number.isFinite(rate) || rate > 99) next.apr = "Enter an illustrative rate between 0 and 99.";
    fees.forEach((f, i) => {
      if (f.state !== "Unknown" && !Number.isFinite(num(f.amount))) next[`fee${i}`] = "Enter an amount or mark it unknown.";
    });
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    const downAmount = downMode === "percent" ? (p * opt(down)) / 100 : opt(down);
    const lines: Result["lines"] = [["Agreed vehicle price", p]];
    const unknown: string[] = [];
    const estimated: string[] = [];
    let feeTotal = 0;
    fees.forEach((f, i) => {
      if (f.state === "Unknown") return unknown.push(feeItems[i]);
      const a = num(f.amount);
      feeTotal += a;
      if (f.state === "Estimated") estimated.push(feeItems[i]);
      if (a) lines.push([feeItems[i], a, f.state === "Estimated" ? "estimate" : undefined]);
    });
    const value = trading ? opt(trade.value) : 0;
    const payoff = trading ? opt(trade.payoff) : 0;
    if (payoff) lines.push(["Trade-in loan payoff", payoff]);
    if (downAmount) lines.push([downMode === "percent" ? `Cash down payment (${opt(down)}%)` : "Cash down payment", -downAmount]);
    if (value) lines.push(["Trade-in value", -value]);

    const financed = p + feeTotal + payoff - downAmount - value;
    if (financed <= 0) {
      setResult(null);
      setCovered(true);
      return;
    }
    const r = rate / 1200;
    const monthly = r === 0 ? financed / term : (financed * r) / (1 - Math.pow(1 + r, -term));
    setCovered(false);
    setResult({ financed, monthly, total: monthly * term, charge: monthly * term - financed, term, apr: rate, lines, unknown, estimated, negativeEquity: Math.max(0, payoff - value) });
  };

  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.1fr_1fr]">
      <Reveal>
        <form noValidate onSubmit={submit} className={card}>
          <Field id="nv-price" label="Agreed vehicle price" prefix="£" value={price} onChange={(v) => (setPrice(v), clear("price"))} error={errors.price} />

          <fieldset className="mt-5">
            <legend className="text-[12px] font-semibold text-ink">Cash down payment</legend>
            <div role="radiogroup" aria-label="Enter down payment as" className="mt-2 flex gap-2">
              {(
                [
                  ["amount", "Amount"],
                  ["percent", "% of price"],
                ] as const
              ).map(([m, label]) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={downMode === m}
                  onClick={() => {
                    setDownMode(m);
                    setDown("");
                    clear("down");
                  }}
                  className={`h-9 rounded-full border px-4 text-[13px] font-semibold transition-all duration-300 ${
                    downMode === m ? "border-ink bg-ink text-white" : "border-slate-200 text-ink hover:-translate-y-0.5 hover:border-brand hover:bg-brand-light"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <Field
              id="nv-down"
              label={downMode === "amount" ? "Down payment amount" : "Down payment percentage"}
              prefix={downMode === "amount" ? "£" : undefined}
              suffix={downMode === "percent" ? "%" : undefined}
              value={down}
              onChange={(v) => (setDown(v), clear("down"))}
              error={errors.down}
              hint="There's no universal minimum down payment."
              className="mt-3 [&>label]:sr-only"
            />
            {downMode === "percent" && num(price) > 0 && opt(down) > 0 && opt(down) <= 100 && (
              <p className="mt-1 animate-fade-up text-[12px] font-medium text-ink">= {gbp((num(price) * opt(down)) / 100)}</p>
            )}
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-[12px] font-semibold text-ink">Taxes and fees you&apos;ll finance</legend>
            <p className="mt-1 text-[13px] text-slate-600">Mark each as known, estimated or unknown. Unknown items aren&apos;t counted — the result will say so.</p>
            <div className="mt-3 space-y-2">
              {feeItems.map((item, i) => (
                <div key={item} className="grid grid-cols-2 items-start gap-2 sm:grid-cols-[1.2fr_1fr_1fr]">
                  <span className="col-span-2 pt-0 text-[12px] font-semibold text-ink sm:col-span-1 sm:pt-3">{item}</span>
                  <span className="relative block">
                    <select aria-label={`${item} status`} value={fees[i].state} onChange={(e) => setFee(i, { state: e.target.value as FeeState, amount: e.target.value === "Unknown" ? "" : fees[i].amount })} className={selectCls}>
                      {feeStates.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  </span>
                  <Field id={`nv-fee-${i}`} label={`${item} amount`} prefix="£" value={fees[i].amount} disabled={fees[i].state === "Unknown"} onChange={(v) => setFee(i, { amount: v })} error={errors[`fee${i}`]} className="[&>label]:sr-only [&>span]:mt-0" />
                </div>
              ))}
            </div>
          </fieldset>

          <div className="mt-6">
            <Tick checked={trading} onChange={() => setTrading((t) => !t)}>
              I&apos;m trading in a vehicle
            </Tick>
            {trading && (
              <div className="mt-3 grid animate-fade-up gap-4 sm:grid-cols-2">
                <Field id="nv-trade" label="Trade-in value" prefix="£" value={trade.value} onChange={(v) => setTrade((t) => ({ ...t, value: v }))} />
                <Field id="nv-payoff" label="Amount still owed on it" prefix="£" value={trade.payoff} onChange={(v) => setTrade((t) => ({ ...t, payoff: v }))} />
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field id="nv-apr" label="Illustrative interest rate (APR you choose)" suffix="%" value={apr} onChange={(v) => (setApr(v), clear("apr"))} error={errors.apr} hint="Hypothetical — used here as a simple annual rate." />
            <div>
              <label htmlFor="nv-term" className="text-[12px] font-semibold text-ink">
                Term
              </label>
              <span className="relative mt-1.5 block">
                <select id="nv-term" value={term} onChange={(e) => setTerm(Number(e.target.value))} className={selectCls}>
                  {terms.map((t) => (
                    <option key={t} value={t}>
                      {t} months
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn-shine mt-6 h-11 w-full rounded-full bg-brand text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
          >
            Calculate example
          </button>
        </form>
      </Reveal>

      <Reveal direction="left" delay={150} className="lg:sticky lg:top-32">
        <div aria-live="polite">
          {covered ? (
            <div className="animate-fade-up rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 text-[13px] text-ink">
              <p className="font-bold text-emerald-800">Nothing left to finance</p>
              <p className="mt-1">Your down payment and trade-in cover the price and the fees you counted.</p>
            </div>
          ) : !result ? (
            <Placeholder icon={Gauge}>Enter a price and an illustrative rate to see the monthly amount, total of payments and finance charge together.</Placeholder>
          ) : (
            <div key={`${result.monthly}-${result.term}`} className={`animate-fade-up ${card}`}>
              <p className="text-[12px] font-semibold tracking-wide text-slate-500 uppercase">Example — not a quote</p>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[
                  ["Monthly amount", gbp(result.monthly)],
                  ["Total of payments", gbp(result.total, 0)],
                  ["Finance charge", gbp(result.charge, 0)],
                ].map(([k, v], i) => (
                  <div key={k} className={`rounded-lg px-2 py-3 transition-colors ${i === 0 ? "bg-brand-light" : "bg-slate-50 hover:bg-brand-light"}`}>
                    <dt className="text-[11px] text-slate-500">{k}</dt>
                    <dd className={`mt-0.5 font-extrabold text-ink ${i === 0 ? "text-[18px]" : "text-[15px]"}`}>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 text-[12px] text-slate-500">
                {result.term} months at {result.apr}% · amount financed {gbp(result.financed, 0)}
              </p>
              <dl className="mt-4 divide-y divide-slate-100 border-y border-slate-100 text-[13px]">
                {result.lines.map(([k, n, tag]) => (
                  <div key={k} className="flex justify-between gap-3 py-2">
                    <dt className="text-slate-600">
                      {k}
                      {tag && <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800">{tag}</span>}
                    </dt>
                    <dd className={n < 0 ? "text-emerald-700" : "text-ink"}>
                      {n < 0 ? "−" : ""}
                      {gbp(Math.abs(n), 0)}
                    </dd>
                  </div>
                ))}
              </dl>
              {result.unknown.length > 0 && (
                <p className="mt-3 flex gap-2 rounded-lg bg-amber-50 px-3 py-2 text-[12px] text-amber-900">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    <strong className="font-semibold">Not counted (unknown):</strong> {result.unknown.join(", ")}. The real amount financed will be higher if these are financed.
                  </span>
                </p>
              )}
              {result.estimated.length > 0 && <p className="mt-2 text-[12px] text-slate-600">Includes estimates for {result.estimated.join(", ")}.</p>}
              {result.negativeEquity > 0 && (
                <p className="mt-2 text-[12px] text-amber-900">{gbp(result.negativeEquity, 0)} of negative equity from your trade-in is included.</p>
              )}
              <p className="mt-4 text-[11px] leading-relaxed text-slate-500">Uses only your figures. Insurance, fuel or charging, servicing and optional add-ons aren&apos;t included.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={hrefFor("Get Pre-Qualified")} className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-ink">
                  Get pre-qualified
                </Link>
                <Link href={hrefFor("Compare Vehicle Finance")} className="inline-flex h-9 items-center rounded-full border border-slate-300 px-4 text-[13px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink">
                  Compare vehicle finance
                </Link>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}

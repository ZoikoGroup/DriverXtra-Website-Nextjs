"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Gauge, Info } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { hrefFor } from "@/lib/navigation";
import { terms } from "@/components/ev-finance/data";

export const gbp = (n: number, digits = 2) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
export const num = (v: string) => (v.trim() === "" ? NaN : Number(v));

export const inputBase =
  "h-11 w-full rounded-lg border bg-white text-sm text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";

export function Field({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
  error,
  disabled,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[12px] font-semibold text-ink">
        {label}
      </label>
      <span className="relative mt-1.5 block">
        {prefix && <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-500">{prefix}</span>}
        <input
          id={id}
          inputMode="decimal"
          value={value}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={hint || error ? `${id}-note` : undefined}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ""))}
          className={`${inputBase} ${prefix ? "pl-7" : "pl-3"} ${suffix ? `${suffix.length > 8 ? "pr-32" : "pr-16"} text-right` : "pr-3"} ${error ? "border-red-400" : "border-slate-300"}`}
        />
        {suffix && <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[12px] text-slate-500">{suffix}</span>}
      </span>
      {(error || hint) && (
        <p id={`${id}-note`} className={`mt-1 text-[11px] ${error ? "animate-fade-up text-red-600" : "text-slate-500"}`}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export function Tick({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: React.ReactNode }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 text-[13px] font-medium text-ink">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={`grid h-4 w-4 shrink-0 place-items-center rounded border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand/50 ${
          checked ? "border-ink bg-ink text-brand" : "border-slate-400 bg-white group-hover:border-ink"
        }`}
      >
        {checked && <Check className="h-3 w-3 animate-pop" strokeWidth={3} />}
      </span>
      {children}
    </label>
  );
}

export function Placeholder({ icon: Icon, children }: { icon: typeof Gauge; children: React.ReactNode }) {
  return (
    <div className="grid min-h-[110px] place-items-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-6 text-center">
      <div>
        <Icon className="mx-auto h-5 w-5 animate-float-slow text-slate-500" />
        <p className="mt-2 text-[13px] leading-relaxed text-slate-500">{children}</p>
      </div>
    </div>
  );
}

export const card = "rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_48px_-32px_rgba(15,23,42,0.35)] sm:p-6";


type LoanResult = {
  financed: number;
  monthly: number;
  interest: number;
  total: number;
  term: number;
  apr: number;
  lines: [string, number][];
  excluded: string[];
  negativeEquity: number;
};

type LoanLabels = { price: string; feesHint: string; down: string; tradeIn: string };

type LoanEstimatorProps = {
  idPrefix: string;
  labels?: Partial<LoanLabels>;
  /** Show the incentive amount and the "documented at point of sale" tick box. */
  incentive?: boolean;
  placeholder: string;
  /** Costs always listed under "Not included". */
  excluded: string[];
};

const defaultLabels: LoanLabels = { price: "Vehicle price", feesHint: "Itemize where you can.", down: "Cash down payment", tradeIn: "Trade-in value" };

/** Illustrative fixed-rate loan: amount financed, monthly payment, interest and exclusions. */
export default function LoanEstimator({ idPrefix, labels, incentive: withIncentive = true, placeholder, excluded: baseExcluded }: LoanEstimatorProps) {
  const L = { ...defaultLabels, ...labels };
  const [v, setV] = useState({ price: "", fees: "", down: "", tradeIn: "", payoff: "", incentive: "", apr: "" });
  const [feesUnknown, setFeesUnknown] = useState(false);
  const [documented, setDocumented] = useState(false);
  const [term, setTerm] = useState(60);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<LoanResult | null>(null);
  const [nothingToFinance, setNothingToFinance] = useState(false);

  const set = (k: keyof typeof v) => (value: string) => {
    setV((s) => ({ ...s, [k]: value }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };
  const opt = (s: string) => (Number.isFinite(num(s)) ? num(s) : 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = num(v.price);
    const apr = num(v.apr);
    const next: Record<string, string> = {};
    if (!(price > 0)) next.price = `Enter the ${L.price.toLowerCase()}.`;
    if (!Number.isFinite(apr) || apr > 99) next.apr = "Enter an example APR between 0 and 99.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const fees = feesUnknown ? 0 : opt(v.fees);
    const incentive = withIncentive ? opt(v.incentive) : 0;
    const applied = documented ? incentive : 0;
    const down = opt(v.down);
    const tradeIn = opt(v.tradeIn);
    const payoff = opt(v.payoff);
    const financed = price + fees + payoff - down - tradeIn - applied;

    if (financed <= 0) {
      setResult(null);
      setNothingToFinance(true);
      return;
    }
    const r = apr / 1200;
    const monthly = r === 0 ? financed / term : (financed * r) / (1 - Math.pow(1 + r, -term));
    const total = monthly * term;
    const excluded = [...baseExcluded];
    if (feesUnknown) excluded.unshift("Taxes and fees — not known yet");
    if (incentive > 0 && !documented) excluded.unshift(`Incentive of ${gbp(incentive, 0)} — not confirmed at the point of sale`);

    const lines: [string, number][] = [[L.price, price]];
    if (fees) lines.push(["Taxes and fees", fees]);
    if (payoff) lines.push(["Trade-in loan payoff", payoff]);
    if (down) lines.push([L.down, -down]);
    if (tradeIn) lines.push([L.tradeIn, -tradeIn]);
    if (applied) lines.push(["Documented incentive", -applied]);

    setNothingToFinance(false);
    setResult({ financed, monthly, interest: total - financed, total, term, apr, lines, excluded, negativeEquity: Math.max(0, payoff - tradeIn) });
  };

  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.2fr_1fr]">
      <Reveal>
        <form noValidate onSubmit={submit} className={card}>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field id={`${idPrefix}-price`} label={L.price} prefix="£" value={v.price} onChange={set("price")} error={errors.price} />
            <Field id={`${idPrefix}-fees`} label="Taxes and fees you'll finance" prefix="£" value={feesUnknown ? "" : v.fees} onChange={set("fees")} disabled={feesUnknown} hint={L.feesHint} />
          </div>
          <div className="mt-4">
            <Tick checked={feesUnknown} onChange={() => setFeesUnknown((x) => !x)}>
              I don&apos;t know the fees yet
            </Tick>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Field id={`${idPrefix}-down`} label={L.down} prefix="£" value={v.down} onChange={set("down")} />
            <Field id={`${idPrefix}-trade`} label={L.tradeIn} prefix="£" value={v.tradeIn} onChange={set("tradeIn")} />
            <Field id={`${idPrefix}-payoff`} label="Trade-in loan payoff" prefix="£" value={v.payoff} onChange={set("payoff")} />
            {withIncentive && <Field id={`${idPrefix}-incentive`} label="Incentive amount" prefix="£" value={v.incentive} onChange={set("incentive")} />}
          </div>
          {withIncentive && (
            <div className="mt-4">
              <Tick checked={documented} onChange={() => setDocumented((x) => !x)}>
                This incentive is documented and applied at the point of sale
              </Tick>
            </div>
          )}
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Field id={`${idPrefix}-apr`} label="Example APR" suffix="%" value={v.apr} onChange={set("apr")} error={errors.apr} hint="Your own example — not an offered rate." />
            <div>
              <label htmlFor={`${idPrefix}-term`} className="text-[12px] font-semibold text-ink">
                Term
              </label>
              <span className="relative mt-1.5 block">
                <select id={`${idPrefix}-term`} value={term} onChange={(e) => setTerm(Number(e.target.value))} className={`${inputBase} cursor-pointer appearance-none border-slate-300 px-3 pr-9`}>
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
            className="btn-shine mt-5 h-11 w-full rounded-full bg-brand text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
          >
            Show illustrative payment
          </button>
        </form>
      </Reveal>

      <Reveal direction="left" delay={150} className="lg:sticky lg:top-32">
        <div aria-live="polite">
          {nothingToFinance ? (
            <div className="animate-fade-up rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 text-[13px] text-ink">
              <p className="font-bold text-emerald-800">Nothing left to finance</p>
              <p className="mt-1">Your down payment{withIncentive ? ", trade-in and incentive" : " and trade-in"} cover the price and fees you entered.</p>
            </div>
          ) : !result ? (
            <Placeholder icon={Gauge}>{placeholder}</Placeholder>
          ) : (
            <div key={`${result.monthly}-${result.term}`} className={`animate-fade-up ${card}`}>
              <p className="text-[12px] font-semibold tracking-wide text-slate-500 uppercase">Illustrative payment</p>
              <p className="mt-1 text-4xl font-extrabold tracking-tight text-ink">
                {gbp(result.monthly)}
                <span className="text-base font-semibold text-slate-500"> /month</span>
              </p>
              <p className="mt-1 text-[12px] text-slate-500">
                {result.term} months at {result.apr}% example APR
              </p>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  ["Amount financed", result.financed],
                  ["Total interest", result.interest],
                  ["Total repaid", result.total],
                ].map(([k, n]) => (
                  <div key={k as string} className="rounded-lg bg-slate-50 px-2 py-2.5 transition-colors hover:bg-brand-light">
                    <dt className="text-[11px] text-slate-500">{k}</dt>
                    <dd className="mt-0.5 text-[14px] font-bold text-ink">{gbp(n as number, 0)}</dd>
                  </div>
                ))}
              </dl>
              <dl className="mt-4 divide-y divide-slate-100 border-y border-slate-100 text-[13px]">
                {result.lines.map(([k, n]) => (
                  <div key={k} className="flex justify-between py-2">
                    <dt className="text-slate-600">{k}</dt>
                    <dd className={n < 0 ? "text-emerald-700" : "text-ink"}>
                      {n < 0 ? "−" : ""}
                      {gbp(Math.abs(n), 0)}
                    </dd>
                  </div>
                ))}
              </dl>
              {result.negativeEquity > 0 && (
                <p className="mt-3 flex gap-2 rounded-lg bg-amber-50 px-3 py-2 text-[12px] text-amber-900">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {gbp(result.negativeEquity, 0)} of negative equity from your trade-in is added to the loan.
                </p>
              )}
              <p className="mt-4 text-[12px] font-semibold text-ink">Not included</p>
              <ul className="mt-1 space-y-1 text-[12px] text-slate-600">
                {result.excluded.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" /> {x}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] leading-relaxed text-slate-500">Illustrative only — not a lender offer or a credit decision. Your actual rate and payment depend on the lender.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={hrefFor("Get Pre-Qualified")} className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-ink">
                  Get pre-qualified
                </Link>
                <Link href={hrefFor("Compare Vehicle Loans")} className="inline-flex h-9 items-center rounded-full border border-slate-300 px-4 text-[13px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink">
                  Compare vehicle loans
                </Link>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}


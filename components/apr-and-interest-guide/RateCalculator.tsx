"use client";

import { useState } from "react";
import { ChevronDown, Info, Plus, Trash2, TriangleAlert } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Field, Tick, gbp, inputBase, num } from "@/components/finance-tools/LoanEstimator";
import { feeClasses, feeTimings, loanTypes, rateKinds, type LoanType, type RateKind } from "./data";

type Scenario = { amount: string; down: string; term: string; kind: RateKind; rate: string; type: LoanType };
type Outcome = { financed: number; monthly: number; interest: number; total: number; term: number; rate: number; firstYearInterest: number; kind: RateKind };
type Fee = { id: number; name: string; amount: number; when: (typeof feeTimings)[number]; cls: (typeof feeClasses)[number] };

const blank: Scenario = { amount: "", down: "", term: "60", kind: "A nominal interest rate", type: "Fixed rate, equal monthly payments", rate: "" };
const selectCls = `${inputBase} cursor-pointer appearance-none border-slate-300 px-3 pr-9`;
const box = "rounded-2xl border border-slate-200 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_20px_40px_-28px_rgba(15,23,42,0.35)] sm:p-6";

function Select({ id, label, value, onChange, options, className = "" }: { id: string; label: string; value: string; onChange: (v: string) => void; options: readonly string[]; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[12px] font-semibold text-ink">
        {label}
      </label>
      <span className="relative mt-1.5 block">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={selectCls}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </span>
    </div>
  );
}

const rateHint: Record<RateKind, string> = {
  "A nominal interest rate": "Hypothetical nominal interest assumption — not an APR.",
  "An APR": "Used as if it were the nominal rate, so any fees inside the APR aren't separated.",
  "Not sure": "Treated as a nominal rate. Check the lender's disclosure for which it is.",
};

function calc(s: Scenario): Outcome {
  const financed = num(s.amount) - (Number.isFinite(num(s.down)) ? num(s.down) : 0);
  const term = num(s.term);
  const rate = num(s.rate);
  const r = rate / 1200;
  const monthly = r === 0 ? financed / term : (financed * r) / (1 - Math.pow(1 + r, -term));
  // Interest paid in the first 12 months (or the whole term if shorter).
  let balance = financed;
  let firstYearInterest = 0;
  for (let m = 0; m < Math.min(12, term); m++) {
    const i = balance * r;
    firstYearInterest += i;
    balance -= monthly - i;
  }
  return { financed, monthly, interest: monthly * term - financed, total: monthly * term, term, rate, firstYearInterest, kind: s.kind };
}

/** Fixed-rate example with an optional second scenario and a separate fee tracker. */
export default function RateCalculator() {
  const [comparing, setComparing] = useState(false);
  const [scenarios, setScenarios] = useState<Scenario[]>([blank, blank]);
  const [errors, setErrors] = useState<Record<string, string>[]>([{}, {}]);
  const [results, setResults] = useState<Outcome[] | null>(null);

  const [fees, setFees] = useState<Fee[]>([]);
  const [draft, setDraft] = useState({ name: "", amount: "", when: feeTimings[0] as Fee["when"], cls: feeClasses[0] as Fee["cls"] });
  const [feeError, setFeeError] = useState("");

  const visible = comparing ? scenarios : scenarios.slice(0, 1);

  const update = (i: number, patch: Partial<Scenario>) => {
    setScenarios((s) => s.map((x, j) => (j === i ? { ...x, ...patch } : x)));
    setErrors((e) => e.map((x, j) => (j === i ? { ...x, ...Object.fromEntries(Object.keys(patch).map((k) => [k, ""])) } : x)));
  };

  const validate = (s: Scenario) => {
    const e: Record<string, string> = {};
    const amount = num(s.amount);
    const down = Number.isFinite(num(s.down)) ? num(s.down) : 0;
    const term = num(s.term);
    const rate = num(s.rate);
    if (!(amount >= 1000 && amount <= 500000)) e.amount = "Enter 1,000 to 500,000.";
    else if (down >= amount) e.down = "The down payment must be less than the loan amount.";
    if (!(Number.isInteger(term) && term >= 12 && term <= 96)) e.term = "Enter 12 to 96 months.";
    if (!(rate >= 0 && rate <= 99)) e.rate = "Enter a rate from 0 to 99.";
    if (s.type !== "Fixed rate, equal monthly payments") e.type = "This simple example only covers fixed-rate, equal monthly payments.";
    return e;
  };

  const calculate = (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = scenarios.map((s, i) => (i === 0 || comparing ? validate(s) : {}));
    setErrors(errs);
    if (errs.some((e) => Object.keys(e).length)) return setResults(null);
    setResults(visible.map(calc));
  };

  const addFee = () => {
    const amount = num(draft.amount);
    if (!draft.name.trim() || !(amount >= 0)) return setFeeError("Enter a fee name and amount.");
    setFees((f) => [...f, { id: Date.now(), name: draft.name.trim(), amount, when: draft.when, cls: draft.cls }]);
    setDraft((d) => ({ ...d, name: "", amount: "" }));
    setFeeError("");
  };

  const term = results?.[0]?.term ?? (Number(scenarios[0].term) || 0);
  const feeTotal = (f: Fee) => (f.when === "Monthly" ? f.amount * term : f.amount);
  const feesSum = fees.reduce((t, f) => t + feeTotal(f), 0);

  return (
    <div className="mt-6">
      <Reveal>
        <Tick
          checked={comparing}
          onChange={() => {
            setComparing((c) => !c);
            setResults(null);
          }}
        >
          Compare two scenarios
        </Tick>
      </Reveal>

      <Reveal delay={100}>
        <form noValidate onSubmit={calculate} className={`mt-4 ${box}`}>
          <h3 className="text-[15px] font-bold text-ink">{comparing ? "Your examples" : "Your example"}</h3>
          {visible.map((s, i) => {
            const e = errors[i];
            const p = `apr-${i}`;
            return (
              <fieldset key={i} className={`mt-5 animate-fade-up ${comparing ? "rounded-xl border border-slate-200 p-4" : ""}`}>
                <legend className={comparing ? "px-1 text-[13px] font-bold text-ink" : "sr-only"}>{comparing ? `Scenario ${i === 0 ? "A" : "B"}` : "Loan details"}</legend>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                  <Field id={`${p}-amount`} label="Loan amount" prefix="£" value={s.amount} onChange={(v) => update(i, { amount: v })} error={e.amount} hint="1,000 to 500,000. Fictional." />
                  <Field id={`${p}-down`} label="Down payment (optional)" prefix="£" value={s.down} onChange={(v) => update(i, { down: v })} error={e.down} />
                  <Field id={`${p}-term`} label="Term (monthly payments)" value={s.term} onChange={(v) => update(i, { term: v.replace(/\D/g, "") })} error={e.term} hint="12 to 96 months." />
                  <Select id={`${p}-kind`} label="Which rate do you have?" value={s.kind} onChange={(v) => update(i, { kind: v as RateKind })} options={rateKinds} />
                  <Field
                    id={`${p}-rate`}
                    label={s.kind === "An APR" ? "Hypothetical APR" : "Hypothetical nominal interest rate"}
                    suffix="% a year"
                    value={s.rate}
                    onChange={(v) => update(i, { rate: v })}
                    error={e.rate}
                    hint={rateHint[s.kind]}
                  />
                  <div>
                    <Select id={`${p}-type`} label="Loan type" value={s.type} onChange={(v) => update(i, { type: v as LoanType })} options={loanTypes} />
                    {e.type && <p className="mt-1 animate-fade-up text-[11px] text-red-600">{e.type}</p>}
                  </div>
                </div>
              </fieldset>
            );
          })}
          <button
            type="submit"
            className="btn-shine mt-5 h-11 w-full rounded-full bg-brand text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
          >
            Calculate
          </button>
        </form>
      </Reveal>

      <div aria-live="polite">
        {results && (
          <div className="mt-4 animate-fade-up">
            <div className={`grid gap-4 ${results.length > 1 ? "md:grid-cols-2" : ""}`}>
              {results.map((r, i) => (
                <div key={i} className={box}>
                  <p className="text-[12px] font-semibold tracking-wide text-slate-500 uppercase">
                    {results.length > 1 ? `Scenario ${i === 0 ? "A" : "B"} · ` : ""}Example — not an offer
                  </p>
                  <p className="mt-1 text-4xl font-extrabold tracking-tight text-ink">
                    {gbp(r.monthly)}
                    <span className="text-base font-semibold text-slate-500"> /month</span>
                  </p>
                  <p className="mt-1 text-[12px] text-slate-500">
                    {r.term} payments at {r.rate}% {r.kind === "An APR" ? "(APR used as a nominal rate)" : "nominal"}
                  </p>
                  <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                    {[
                      ["Amount financed", r.financed],
                      ["Total interest", r.interest],
                      ["Total repayment", r.total],
                    ].map(([k, n]) => (
                      <div key={k as string} className="rounded-lg bg-slate-50 px-2 py-2.5 transition-colors hover:bg-brand-light">
                        <dt className="text-[11px] text-slate-500">{k}</dt>
                        <dd className="mt-0.5 text-[14px] font-bold text-ink">{gbp(n as number, 0)}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-4">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Principal</span>
                      <span>Interest</span>
                    </div>
                    <div className="mt-1 flex h-2.5 overflow-hidden rounded-full bg-slate-100" aria-hidden>
                      <div className="h-full bg-navy transition-all duration-700" style={{ width: `${(r.financed / r.total) * 100}%` }} />
                      <div className="h-full bg-brand" style={{ width: `${(r.interest / r.total) * 100}%` }} />
                    </div>
                    <p className="mt-2 text-[12px] text-slate-600">
                      Interest is {Math.round((r.interest / r.total) * 100)}% of what you repay. In the first {Math.min(12, r.term)} months, {gbp(r.firstYearInterest, 0)} goes on interest.
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {results.length === 2 && (
              <p className="mt-4 flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-[13px] text-blue-900">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {Math.abs(results[0].total - results[1].total) < 0.5 ? (
                    "Both scenarios cost the same in total."
                  ) : (
                    <>
                      Scenario {results[0].total < results[1].total ? "A" : "B"} repays <strong>{gbp(Math.abs(results[0].total - results[1].total), 0)} less</strong> in total
                      {Math.sign(results[0].monthly - results[1].monthly) === Math.sign(results[0].total - results[1].total)
                        ? " and has the lower monthly payment."
                        : `, even though its monthly payment is ${gbp(Math.abs(results[0].monthly - results[1].monthly))} higher.`}
                    </>
                  )}
                </span>
              </p>
            )}
            {results.some((r) => r.kind !== "A nominal interest rate") && (
              <p className="mt-3 flex items-start gap-2 text-[12px] text-amber-800">
                <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Where you entered an APR or weren&apos;t sure, fees inside it aren&apos;t separated, so the interest shown may differ from a lender&apos;s figures.
              </p>
            )}
          </div>
        )}
      </div>

      <Reveal delay={150}>
        <div className={`mt-4 ${box}`}>
          <h3 className="text-[15px] font-bold text-ink">Fees you&apos;ve been told about (optional)</h3>
          <p className="mt-1 text-[12px] text-slate-500">List them to keep track. They&apos;re shown separately and aren&apos;t added to the interest above.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end">
            <div>
              <label htmlFor="fee-name" className="text-[12px] font-semibold text-ink">
                Fee name
              </label>
              <input
                id="fee-name"
                value={draft.name}
                maxLength={40}
                onChange={(e) => (setDraft((d) => ({ ...d, name: e.target.value })), setFeeError(""))}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFee())}
                className={`${inputBase} mt-1.5 border-slate-300 px-3`}
              />
            </div>
            <Field id="fee-amount" label="Amount" prefix="£" value={draft.amount} onChange={(v) => (setDraft((d) => ({ ...d, amount: v })), setFeeError(""))} />
            <Select id="fee-when" label="When it's paid" value={draft.when} onChange={(v) => setDraft((d) => ({ ...d, when: v as Fee["when"] }))} options={feeTimings} />
            <Select id="fee-class" label="Classification" value={draft.cls} onChange={(v) => setDraft((d) => ({ ...d, cls: v as Fee["cls"] }))} options={feeClasses} />
            <button
              type="button"
              onClick={addFee}
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-slate-300 px-6 text-[13px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand"
            >
              <Plus className="h-4 w-4" /> Add fee
            </button>
          </div>
          {feeError && <p className="mt-2 animate-fade-up text-xs text-red-600">{feeError}</p>}

          {fees.length > 0 && (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    {["Fee", "Amount", "When", "Classification", "Over the term", ""].map((h) => (
                      <th key={h} scope="col" className="px-2 py-2 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fees.map((f) => (
                    <tr key={f.id} className="animate-fade-up border-b border-slate-100 transition-colors hover:bg-slate-50">
                      <th scope="row" className="px-2 py-2 font-medium text-ink">
                        {f.name}
                      </th>
                      <td className="px-2 py-2">{gbp(f.amount)}</td>
                      <td className="px-2 py-2">{f.when}</td>
                      <td className="px-2 py-2">
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${f.cls === "Finance charge" ? "bg-amber-50 text-amber-800" : f.cls === "Unknown" ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700"}`}>
                          {f.cls}
                        </span>
                      </td>
                      <td className="px-2 py-2">{f.when === "Monthly" ? (term ? gbp(feeTotal(f), 0) : "Set a term") : gbp(f.amount, 0)}</td>
                      <td className="px-2 py-2 text-right">
                        <button type="button" onClick={() => setFees((x) => x.filter((y) => y.id !== f.id))} aria-label={`Remove ${f.name}`} className="grid h-7 w-7 place-items-center rounded-full text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-[13px] text-ink">
                Listed fees over {term || "—"} months: <strong>{gbp(feesSum, 0)}</strong>
                <span className="text-slate-500">
                  {" "}
                  · of which marked as finance charges: {gbp(fees.filter((f) => f.cls === "Finance charge").reduce((t, f) => t + feeTotal(f), 0), 0)}
                </span>
              </p>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}

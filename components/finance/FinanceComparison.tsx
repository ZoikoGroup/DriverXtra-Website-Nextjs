"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowLeftRight, Calculator, CalendarDays, ChevronDown, CircleAlert, CreditCard, Info, RefreshCw, Scale, X, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import { Eyebrow, container } from "@/components/ui/SectionTitle";
import { formatGBP, leaseFigures, leaseOptions, loanFigures, loanOptions, monthlyPayment, termOptions, type LoanOption } from "./data";

export type FinanceMode = "loans" | "leases" | "estimate";

const modes: { id: FinanceMode; title: string; text: string; icon: LucideIcon }[] = [
  { id: "loans", title: "Compare vehicle loans", text: "Hire purchase and personal loans", icon: CreditCard },
  { id: "leases", title: "Explore lease options", text: "Personal and business contract hire", icon: CalendarDays },
  { id: "estimate", title: "Estimate a payment", text: "Illustrative only — not an offer", icon: Scale },
];

const orderOptions = [
  { id: "az", label: "provider A–Z (neutral)" },
  { id: "total", label: "total payable" },
  { id: "monthly", label: "monthly cost" },
] as const;
type OrderId = (typeof orderOptions)[number]["id"];

const MAX_COMPARE = 3;

type Assumptions = { price: number; deposit: number; term: number };

export default function FinanceComparison({ initialMode = "loans" }: { initialMode?: FinanceMode }) {
  const [mode, setMode] = useState<FinanceMode>(initialMode);
  const [draft, setDraft] = useState({ price: "22000", deposit: "3000", term: "48" });
  const [applied, setApplied] = useState<Assumptions>({ price: 22000, deposit: 3000, term: 48 });
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [order, setOrder] = useState<OrderId>("az");
  const [estimateApr, setEstimateApr] = useState(9.9);
  const [compare, setCompare] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  // Menu links to ?mode=… while already on this page.
  useEffect(() => setMode(initialMode), [initialMode]);

  const chooseMode = (next: FinanceMode) => {
    setMode(next);
    window.history.replaceState(null, "", next === "loans" ? window.location.pathname : `${window.location.pathname}?mode=${next}`);
    window.setTimeout(() => document.getElementById("finance-options")?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  };

  const update = () => {
    const price = Number(draft.price);
    const deposit = Number(draft.deposit);
    const term = Number(draft.term);
    let message = "";
    if (!(price >= 1000 && price <= 500000)) message = "Enter a vehicle price between £1,000 and £500,000.";
    else if (!(deposit >= 0)) message = "Enter a deposit of £0 or more.";
    else if (deposit >= price) message = "The deposit must be less than the vehicle price.";
    setError(message);
    if (message) {
      setAttempt((a) => a + 1);
      return;
    }
    setApplied({ price, deposit, term });
  };

  const loans = useMemo(() => {
    const list = loanOptions
      .filter((o) => !o.sponsored)
      .map((o) => ({ option: o, ...loanFigures(o, applied.price, applied.deposit, applied.term) }));
    const az = [...list].sort((a, b) => a.option.name.localeCompare(b.option.name));
    if (order === "az") return az;
    const key = order === "total" ? "total" : "monthly";
    // Only complete, fixed costs are ranked; the rest follow alphabetically.
    return [...az.filter((l) => l.complete).sort((a, b) => a[key] - b[key]), ...az.filter((l) => !l.complete)];
  }, [applied, order]);

  const sponsored = loanOptions.filter((o) => o.sponsored).map((o) => ({ option: o, ...loanFigures(o, applied.price, applied.deposit, applied.term) }));

  const leases = useMemo(() => {
    const list = leaseOptions.map((o) => ({ option: o, ...leaseFigures(o, applied.price, applied.term) }));
    const az = [...list].sort((a, b) => a.option.name.localeCompare(b.option.name));
    if (order === "az") return az;
    const key = order === "total" ? "total" : "monthly";
    return [...az.filter((l) => l.complete).sort((a, b) => a[key] - b[key]), ...az.filter((l) => !l.complete)];
  }, [applied, order]);

  const estimate = useMemo(() => {
    const amount = applied.price - applied.deposit;
    const monthly = monthlyPayment(amount, estimateApr, applied.term);
    const repaid = monthly * applied.term;
    return { amount, monthly, total: repaid + applied.deposit, interest: repaid - amount };
  }, [applied, estimateApr]);

  const toggleCompare = (id: string) =>
    setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length < MAX_COMPARE ? [...c, id] : c));
  const compareItems = compare.map((id) => loanOptions.find((o) => o.id === id)!).filter(Boolean);
  const resultsKey = JSON.stringify([applied, order, mode]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <BgImage src="/images/home/hero-bg.jpeg" className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8 lg:py-20">
          <div>
            <Reveal>
              <Eyebrow dark>
                <span className="text-xs">Vehicle Finance</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Compare vehicle finance options.</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
                See loan and lease options from third-party providers side by side, with the costs that matter explained —
                then decide whether to continue with a provider.
              </p>
            </Reveal>
          </div>

          <div className="space-y-3">
            {modes.map(({ id, title, text, icon: Icon }, i) => {
              const active = mode === id;
              return (
                <Reveal key={id} direction="left" delay={200 + i * 100}>
                  <button
                    type="button"
                    onClick={() => chooseMode(id)}
                    aria-pressed={active}
                    className={`group flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all duration-500 hover:-translate-y-0.5 ${
                      active ? "bg-white text-ink shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)]" : "border border-white/10 bg-white/[0.04] text-white hover:border-brand/50 hover:bg-white/[0.08]"
                    }`}
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-all duration-500 group-hover:scale-110 ${
                        active ? "bg-navy text-brand" : "bg-white/10 text-brand group-hover:bg-brand group-hover:text-ink"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold">{title}</span>
                      <span className={`block text-xs ${active ? "text-slate-500" : "text-slate-400"}`}>{text}</span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="finance-options" className="scroll-mt-28 bg-slate-50 py-14 md:py-16">
        <div className={container}>
          {/* Assumptions */}
          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                update();
              }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <h2 className="text-lg font-bold text-ink">Set your comparison assumptions</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <NumberField label="Vehicle price (GBP)" value={draft.price} onChange={(price) => setDraft((d) => ({ ...d, price }))} />
                <NumberField label="Deposit (GBP)" value={draft.deposit} onChange={(deposit) => setDraft((d) => ({ ...d, deposit }))} />
                <label className="block">
                  <span className="text-xs font-bold text-ink">Term</span>
                  <span className="relative mt-1.5 block">
                    <select
                      value={draft.term}
                      onChange={(e) => setDraft((d) => ({ ...d, term: e.target.value }))}
                      className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white pr-9 pl-3 text-sm text-ink transition-all hover:border-slate-400 focus:border-brand-dark focus:ring-2 focus:ring-brand/30 focus:outline-none"
                    >
                      {termOptions.map((t) => (
                        <option key={t} value={t}>
                          {t} months
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  </span>
                </label>
              </div>
              {error && (
                <p key={attempt} role="alert" className="mt-3 flex animate-shake items-center gap-2 text-sm font-medium text-red-600">
                  <CircleAlert className="h-4 w-4" /> {error}
                </p>
              )}
              <button
                type="submit"
                className="group mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lg"
              >
                <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" /> Update comparison
              </button>
            </form>
          </Reveal>

          {/* Results */}
          <div key={mode} className="mt-10 animate-fade-up">
            {mode !== "estimate" && (
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-extrabold text-ink sm:text-2xl">{mode === "loans" ? "Vehicle loan options" : "Vehicle lease options"}</h2>
                  <p className="text-xs text-slate-500">
                    {mode === "loans"
                      ? `${loans.length} provider records · payments estimated from your assumptions using each provider's stated rate — not offers`
                      : `${leases.length} provider records · example rentals for a vehicle around your price — not offers. Leases aren't ranked by APR.`}
                  </p>
                </div>
                <label className="relative flex items-center">
                  <span className="sr-only">Order options</span>
                  <select
                    value={order}
                    onChange={(e) => setOrder(e.target.value as OrderId)}
                    className="h-10 cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white pr-9 pl-3 text-xs font-semibold text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
                  >
                    {orderOptions.map((o) => (
                      <option key={o.id} value={o.id}>
                        Order: {mode === "leases" && o.id === "total" ? "total cost" : o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-500" />
                </label>
              </div>
            )}

            {mode === "loans" && (
              <>
                <div key={resultsKey} className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {loans.map(({ option, monthly, total, complete }, i) => (
                    <Reveal key={option.id} delay={(i % 3) * 90} className="h-full">
                      <LoanCard
                        option={option}
                        monthly={monthly}
                        total={total}
                        complete={complete}
                        term={applied.term}
                        comparing={compare.includes(option.id)}
                        compareFull={compare.length >= MAX_COMPARE}
                        onToggleCompare={() => toggleCompare(option.id)}
                      />
                    </Reveal>
                  ))}
                </div>

                {sponsored.map(({ option, monthly, total, complete }) => (
                  <Reveal key={option.id} className="mt-6">
                    <div className="rounded-2xl border border-slate-200 bg-slate-100/70 p-4">
                      <p className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span className="rounded-md border border-slate-300 bg-white px-2 py-0.5 font-semibold text-slate-600">Sponsored</span>
                        Paid placement — shown separately and not part of the order above.
                      </p>
                      <div className="mt-3">
                        <LoanCard option={option} monthly={monthly} total={total} complete={complete} term={applied.term} wide />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </>
            )}

            {mode === "leases" && (
              <div key={resultsKey} className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {leases.map(({ option, monthly, initial, total, complete }, i) => (
                  <Reveal key={option.id} delay={(i % 3) * 90} className="h-full">
                    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                      <h3 className="text-base font-bold text-ink">{option.name}</h3>
                      <p className="text-xs text-slate-500">
                        {option.company} · {option.product}
                      </p>
                      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-xs">
                        <Figure label="Monthly rental" value={`${formatGBP(monthly)} × ${applied.term - 1}`} strong />
                        <Figure label="Initial rental" value={`${formatGBP(initial)} (${option.initialMonths}×)`} />
                        <Figure label="Mileage allowance" value={option.mileage} />
                        <Figure label="Excess mileage" value={option.excessMileage} muted={option.excessMileage === "Not provided"} />
                        <Figure label="End-of-contract fees" value={option.endFees === undefined ? "Not provided" : option.endFees === 0 ? "None stated" : formatGBP(option.endFees)} muted={option.endFees === undefined} />
                        <Figure label="Total cost" value={formatGBP(total)} strong />
                      </dl>
                      {!complete && <IncompleteNote />}
                      {option.vatNote && <p className="mt-3 text-xs font-semibold text-blue-700">{option.vatNote}</p>}
                      <p className="mt-3 text-xs leading-relaxed text-slate-600">{option.notes}</p>
                      <p className="mt-2 text-[11px] text-slate-400">
                        Last validated {option.validated} · valid until {option.validUntil}
                      </p>
                      <div className="mt-auto pt-4">
                        <Link href="#" className="inline-flex h-9 items-center rounded-full border border-slate-300 px-4 text-xs font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-md">
                          View full terms
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            )}

            {mode === "estimate" && (
              <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
                <Reveal>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                    <h2 className="flex items-center gap-2 text-xl font-extrabold text-ink">
                      <Calculator className="h-5 w-5 text-brand-dark" /> Estimate a payment
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Borrowing {formatGBP(estimate.amount)} over {applied.term} months. Change the price, deposit or term above.
                    </p>
                    <label className="mt-6 block">
                      <span className="flex items-center justify-between text-sm font-bold text-ink">
                        APR
                        <span key={estimateApr} className="animate-pop rounded-md bg-brand-light px-2 py-0.5 text-brand-dark">
                          {estimateApr.toFixed(1)}%
                        </span>
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={25}
                        step={0.1}
                        value={estimateApr}
                        onChange={(e) => setEstimateApr(Number(e.target.value))}
                        className="mt-3 w-full cursor-pointer accent-[#e8ac00]"
                      />
                      <span className="flex justify-between text-[11px] text-slate-400">
                        <span>0%</span>
                        <span>25%</span>
                      </span>
                    </label>
                  </div>
                </Reveal>
                <Reveal direction="left" delay={100}>
                  <div className="h-full rounded-2xl bg-navy p-6 text-white">
                    <p className="text-xs font-semibold tracking-wider text-brand uppercase">Illustrative estimate</p>
                    <p key={`${estimate.monthly}`} className="mt-2 animate-fade-up text-4xl font-extrabold">
                      {formatGBP(estimate.monthly)}
                      <span className="text-base font-medium text-slate-400"> /month</span>
                    </p>
                    <dl className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-slate-400">Total payable (incl. deposit)</dt>
                        <dd className="font-semibold">{formatGBP(estimate.total)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-400">Total interest</dt>
                        <dd className="font-semibold">{formatGBP(estimate.interest)}</dd>
                      </div>
                    </dl>
                    <p className="mt-4 flex gap-2 text-xs text-slate-400">
                      <Info className="mt-px h-3.5 w-3.5 shrink-0" /> Illustrative only — not an offer. Excludes fees, which vary by provider.
                    </p>
                    <button
                      type="button"
                      onClick={() => chooseMode("loans")}
                      className="btn-shine mt-5 inline-flex h-10 items-center rounded-full bg-brand px-5 text-sm font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
                    >
                      Compare real provider options
                    </button>
                  </div>
                </Reveal>
              </div>
            )}
          </div>
        </div>
      </section>

      {mode === "loans" && (
        <CompareTray items={compareItems} assumptions={applied} open={compareOpen} setOpen={setCompareOpen} onRemove={toggleCompare} onClear={() => setCompare([])} />
      )}
    </>
  );
}

/* ---------- Pieces ---------- */

function NumberField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-ink">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm text-ink transition-all hover:border-slate-400 focus:border-brand-dark focus:ring-2 focus:ring-brand/30 focus:outline-none"
      />
    </label>
  );
}

function Figure({ label, value, strong, muted }: { label: string; value: React.ReactNode; strong?: boolean; muted?: boolean }) {
  return (
    <div>
      <dt className="text-slate-500">{label}</dt>
      <dd className={`mt-0.5 ${strong ? "text-sm font-bold text-ink" : muted ? "text-slate-400 italic" : "text-ink"}`}>{value}</dd>
    </div>
  );
}

function IncompleteNote() {
  return (
    <p className="mt-3 flex gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-snug text-amber-800 ring-1 ring-amber-200">
      <Info className="mt-px h-3.5 w-3.5 shrink-0" /> Not included in cost sorting — costs aren&apos;t complete or fixed.
    </p>
  );
}

type LoanCardProps = {
  option: LoanOption;
  monthly: number;
  total: number;
  complete: boolean;
  term: number;
  wide?: boolean;
  comparing?: boolean;
  compareFull?: boolean;
  onToggleCompare?: () => void;
};

function LoanCard({ option: o, monthly, total, complete, term, wide, comparing, compareFull, onToggleCompare }: LoanCardProps) {
  return (
    <article
      className={`group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)] ${
        wide ? "hover:translate-y-0" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-ink">{o.name}</h3>
          <p className="text-xs text-slate-500">
            {o.company} · {o.product}
          </p>
        </div>
        {(o.badge === "Indicative rate" || wide) && (
          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-200">{o.badge}</span>
        )}
      </div>
      {o.badge === "Representative example" && !wide && (
        <span className="mt-2 w-fit rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-200">{o.badge}</span>
      )}

      <dl className={`mt-3 grid gap-3 border-t border-slate-100 pt-3 text-xs ${wide ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}>
        <Figure
          label="Representative APR"
          strong
          value={
            <>
              {o.apr}%{" "}
              <span className={`font-medium ${o.rateType === "variable" ? "text-amber-600" : "text-slate-600"}`}>
                {o.rateType === "variable" && "● "}
                {o.rateType}
              </span>
            </>
          }
        />
        <Figure label="Est. monthly" strong value={<span key={monthly} className="inline-block animate-fade-up">{`${formatGBP(monthly)} × ${term}`}</span>} />
        <Figure
          label="Fees"
          value={o.fees === undefined ? "Not provided" : o.fees === 0 ? "None stated" : formatGBP(o.fees)}
          muted={o.fees === undefined}
        />
        {o.balloon !== undefined && <Figure label="Optional final payment" value={formatGBP(o.balloon)} />}
        <Figure label="Total payable" strong value={<span key={total} className="inline-block animate-fade-up">{formatGBP(total)}</span>} />
      </dl>

      {!complete && <IncompleteNote />}
      <p className="mt-3 text-xs leading-relaxed text-slate-600">{o.notes}</p>
      <p className="mt-2 text-[11px] text-slate-400">
        Last validated {o.validated} · valid until {o.validUntil}
      </p>

      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
        <Link href="#" className="inline-flex h-9 items-center rounded-full border border-slate-300 px-4 text-xs font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-md">
          View full terms
        </Link>
        {onToggleCompare && (
          <label className={`flex items-center gap-2 text-xs font-medium text-ink ${!comparing && compareFull ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}>
            <input type="checkbox" checked={!!comparing} disabled={!comparing && compareFull} onChange={onToggleCompare} className="h-4 w-4 rounded accent-ink" />
            Compare
          </label>
        )}
      </div>
    </article>
  );
}

type CompareTrayProps = {
  items: LoanOption[];
  assumptions: Assumptions;
  open: boolean;
  setOpen: (open: boolean) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
};

function CompareTray({ items, assumptions, open, setOpen, onRemove, onClear }: CompareTrayProps) {
  const [visible, setVisible] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (items.length < 2) setOpen(false);
  }, [items.length, setOpen]);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }
    const frame = requestAnimationFrame(() => setVisible(true));
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const rows: { label: string; value: (o: LoanOption) => string }[] = [
    { label: "Product", value: (o) => o.product },
    { label: "Representative APR", value: (o) => `${o.apr}% ${o.rateType}` },
    { label: "Est. monthly", value: (o) => `${formatGBP(loanFigures(o, assumptions.price, assumptions.deposit, assumptions.term).monthly)} × ${assumptions.term}` },
    { label: "Fees", value: (o) => (o.fees === undefined ? "Not provided" : o.fees === 0 ? "None stated" : formatGBP(o.fees)) },
    { label: "Total payable", value: (o) => formatGBP(loanFigures(o, assumptions.price, assumptions.deposit, assumptions.term).total) },
    { label: "Rate basis", value: (o) => o.badge },
    { label: "Valid until", value: (o) => o.validUntil },
  ];

  return (
    <>
      <div
        aria-hidden={!items.length}
        className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          items.length ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-3 rounded-2xl bg-navy p-3 text-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/10 sm:flex-nowrap sm:p-4">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <ArrowLeftRight className="h-4 w-4 text-brand" /> Compare
            <span className="text-slate-400">
              {items.length}/{MAX_COMPARE}
            </span>
          </p>
          <ul className="flex flex-1 gap-2 overflow-x-auto">
            {items.map((o) => (
              <li key={o.id} className="flex shrink-0 animate-fade-up items-center gap-1.5 rounded-full bg-white/10 py-1 pr-1 pl-3 text-xs">
                {o.name}
                <button type="button" onClick={() => onRemove(o.id)} aria-label={`Remove ${o.name}`} className="grid h-5 w-5 place-items-center rounded-full hover:bg-white/20">
                  <X className="h-3 w-3" />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onClear} className="px-2 text-xs text-slate-400 hover:text-white">
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              disabled={items.length < 2}
              className="btn-shine rounded-full bg-brand px-4 py-2 text-xs font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark disabled:pointer-events-none disabled:opacity-50"
            >
              {items.length < 2 ? "Add one more" : "Compare now"}
            </button>
          </div>
        </div>
      </div>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Compare finance options">
            <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-navy/70 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`} />
            <div
              className={`relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:rounded-3xl ${
                visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-[0.97] opacity-0"
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h2 className="text-lg font-bold text-ink">Compare finance options</h2>
                <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 transition-all hover:rotate-90 hover:bg-ink hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="overflow-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="w-36 p-4" />
                      {items.map((o) => (
                        <th key={o.id} className="p-4 align-top font-bold text-ink">
                          {o.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.label} className="border-b border-slate-100 hover:bg-slate-50">
                        <th scope="row" className="p-4 text-xs font-semibold text-slate-500">
                          {row.label}
                        </th>
                        {items.map((o) => (
                          <td key={o.id} className="p-4 text-ink">
                            {row.value(o)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="px-5 py-3 text-xs text-slate-500">Estimates from your assumptions — not offers.</p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

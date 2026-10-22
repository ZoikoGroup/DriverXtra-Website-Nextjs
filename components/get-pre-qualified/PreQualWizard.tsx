"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, Info, Loader2, Pencil, Send } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import Stepper, { ErrorBanner } from "@/components/selling/Stepper";
import { CheckRow, Field, PrimaryButton, SecondaryButton, StepNav, StepTitle, inputClass } from "@/components/selling/FormParts";
import {
  SAMPLE_PROVIDER,
  employmentOptions,
  exampleIndication,
  incomeBands,
  priceRanges,
  steps,
  termOptions,
  type StepId,
} from "./data";

type FormData = {
  consent: boolean;
  tips: boolean;
  priceRange: string;
  deposit: string;
  term: string;
  employment: string;
  income: string;
};

const initialData: FormData = { consent: false, tips: false, priceRange: "", deposit: "", term: "48 months", employment: "", income: "" };

type Errors = Partial<Record<keyof FormData, string>>;

function validate(step: StepId, d: FormData): Errors {
  const e: Errors = {};
  if (step === 1 && !d.consent) e.consent = "Please agree before we collect anything.";
  if (step === 2) {
    if (!d.priceRange) e.priceRange = "Choose a vehicle price range.";
    if (d.deposit === "" || Number(d.deposit) < 0) e.deposit = "Enter a deposit (£0 if none).";
  }
  if (step === 3) {
    if (!d.employment) e.employment = "Choose your employment status.";
    if (!d.income) e.income = "Choose an income band.";
  }
  return e;
}

export default function PreQualWizard() {
  const [step, setStep] = useState<StepId>(1);
  const [maxStep, setMaxStep] = useState<StepId>(1);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [attempt, setAttempt] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"indication" | "unavailable" | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const update = (patch: Partial<FormData>) => {
    setData((d) => ({ ...d, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      (Object.keys(patch) as (keyof FormData)[]).forEach((k) => delete next[k]);
      return next;
    });
  };

  const goTo = (next: StepId) => {
    setStep(next);
    setMaxStep((m) => (next > m ? next : m));
    setErrors({});
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 100) cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const next = () => {
    const found = validate(step, data);
    setErrors(found);
    if (Object.keys(found).length) {
      setAttempt((a) => a + 1);
      return;
    }
    goTo((step + 1) as StepId);
  };

  const submit = () => {
    setSubmitting(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setResult(exampleIndication(data.priceRange, data.income, data.employment));
      setSubmitting(false);
    }, 1400);
  };

  const restart = () => {
    setData(initialData);
    setResult(null);
    setMaxStep(1);
    goTo(1);
  };

  const canOpen = (id: StepId) => !result && id <= maxStep;
  const isDone = (id: StepId) => (result ? true : id < maxStep && id !== step);

  const select = (key: "priceRange" | "term" | "employment" | "income", options: string[], placeholder?: string) => (
    <select value={data[key]} onChange={(e) => update({ [key]: e.target.value })} className={inputClass(errors[key])}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );

  return (
    <section id="early-indication" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className={container}>
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Check for an early indication</h2>
        </Reveal>

        <Reveal delay={100}>
          <Stepper steps={steps} step={step} isDone={isDone} canOpen={canOpen} onSelect={goTo} />
        </Reveal>

        <Reveal delay={200}>
          <div ref={cardRef} className="mt-5 scroll-mt-32 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <ErrorBanner errors={Object.values(errors).filter(Boolean) as string[]} attempt={attempt} />

            <div key={result ? "result" : step} className="animate-fade-up">
              {result ? (
                <Result result={result} data={data} onRestart={restart} />
              ) : (
                <>
                  {step === 1 && (
                    <>
                      <StepTitle>Before we collect anything</StepTitle>
                      <div className="mt-4 space-y-3">
                        <InfoBox title="Who you'd be sharing with" delay={0}>
                          <span className="mr-1.5 inline-block rounded border border-dashed border-amber-400 bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-amber-800 uppercase">
                            Sample
                          </span>
                          {SAMPLE_PROVIDER} (example legal entity). DriverXtra isn&apos;t a lender.
                        </InfoBox>
                        <InfoBox title="What a credit check may involve" delay={80}>
                          The provider decides whether any credit check is used and what type. They must tell you before it
                          happens. DriverXtra doesn&apos;t assume a &quot;soft&quot; or &quot;hard&quot; check.
                        </InfoBox>
                        <InfoBox title="What we'll ask" delay={160}>
                          The vehicle price range, deposit, term, employment status and an income band. No bank details, ID
                          numbers or exact salary.
                        </InfoBox>
                      </div>
                      <div className="mt-5 space-y-3">
                        <div className={`rounded-xl border px-3 transition-colors ${errors.consent ? "border-red-300" : "border-slate-200"}`}>
                          <CheckRow
                            label={`I've read this and agree that DriverXtra may share the details I enter with ${SAMPLE_PROVIDER} for an early indication only.`}
                            checked={data.consent}
                            onChange={() => update({ consent: !data.consent })}
                            error={!!errors.consent}
                          />
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3">
                          <CheckRow label="Optional: send me finance tips by email." checked={data.tips} onChange={() => update({ tips: !data.tips })} />
                        </div>
                      </div>
                      <div className="mt-6">
                        <PrimaryButton onClick={next}>Continue</PrimaryButton>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <StepTitle>About the vehicle</StepTitle>
                      <div className="grid gap-x-4 sm:grid-cols-3">
                        <Field label="Vehicle price range" error={errors.priceRange}>
                          {select("priceRange", priceRanges, "Choose a range")}
                        </Field>
                        <Field label="Deposit (GBP)" error={errors.deposit}>
                          <input type="number" inputMode="numeric" min={0} value={data.deposit} onChange={(e) => update({ deposit: e.target.value })} placeholder="e.g. 3000" className={inputClass(errors.deposit)} />
                        </Field>
                        <Field label="Term">{select("term", termOptions)}</Field>
                      </div>
                      <StepNav onBack={() => goTo(1)} onNext={next} />
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <StepTitle>About you</StepTitle>
                      <p className="mt-1 text-sm text-slate-500">An income band is enough — we never ask for your exact salary.</p>
                      <div className="grid gap-x-4 sm:grid-cols-2">
                        <Field label="Employment status" error={errors.employment}>
                          {select("employment", employmentOptions, "Choose status")}
                        </Field>
                        <Field label="Annual income band" error={errors.income}>
                          {select("income", incomeBands, "Choose a band")}
                        </Field>
                      </div>
                      <StepNav onBack={() => goTo(2)} onNext={next} />
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <StepTitle>Review what you&apos;ll share</StepTitle>
                      <p className="mt-1 text-sm text-slate-500">Shared only with {SAMPLE_PROVIDER}, for an early indication.</p>
                      <dl className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-200">
                        {[
                          { label: "Vehicle price range", value: data.priceRange, edit: 2 as StepId },
                          { label: "Deposit", value: `£${Number(data.deposit).toLocaleString("en-GB")}`, edit: 2 as StepId },
                          { label: "Term", value: data.term, edit: 2 as StepId },
                          { label: "Employment status", value: data.employment, edit: 3 as StepId },
                          { label: "Income band", value: data.income, edit: 3 as StepId },
                        ].map((row, i) => (
                          <div key={row.label} className="flex animate-fade-up items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-50" style={{ animationDelay: `${i * 60}ms` }}>
                            <dt className="w-40 shrink-0 text-xs font-semibold text-slate-500">{row.label}</dt>
                            <dd className="flex-1 text-sm text-ink">{row.value}</dd>
                            <button type="button" onClick={() => goTo(row.edit)} className="group inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-ink">
                              <Pencil className="h-3 w-3 transition-transform group-hover:-rotate-12" /> Edit
                            </button>
                          </div>
                        ))}
                      </dl>
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                        <button type="button" onClick={() => goTo(3)} className="text-sm font-semibold text-slate-600 hover:text-ink">
                          ← Back
                        </button>
                        <PrimaryButton onClick={submit} disabled={submitting}>
                          {submitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" /> Checking with {SAMPLE_PROVIDER}…
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" /> Check for an early indication
                            </>
                          )}
                        </PrimaryButton>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InfoBox({ title, delay, children }: { title: string; delay: number; children: ReactNode }) {
  return (
    <div
      className="animate-fade-up rounded-xl border border-slate-200 px-4 py-3 transition-all duration-300 hover:border-brand/60 hover:bg-brand-light/20"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-[13px] font-bold text-ink">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{children}</p>
    </div>
  );
}

function Result({ result, data, onRestart }: { result: "indication" | "unavailable"; data: FormData; onRestart: () => void }) {
  const positive = result === "indication";
  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <span
          className={`grid h-12 w-12 animate-pop place-items-center rounded-full text-white ${
            positive ? "bg-emerald-500 shadow-[0_0_0_8px_rgba(16,185,129,0.15)]" : "bg-slate-400"
          }`}
        >
          {positive ? <Check className="h-6 w-6" /> : <Info className="h-6 w-6" />}
        </span>
        <div>
          <StepTitle>{positive ? `${SAMPLE_PROVIDER} may consider you` : "No early indication available"}</StepTitle>
          <p className="text-sm text-slate-500">
            {data.priceRange} · {data.term} · {data.employment}
          </p>
        </div>
      </div>

      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600">
        {positive
          ? "This is an early indication, not an offer or approval. If you continue, the provider will make its own full assessment and tell you about any credit check first."
          : "The provider can't give an early indication from these details. This isn't a decline — you can compare other finance options or change the price range or deposit."}
      </p>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
        <Info className="h-3.5 w-3.5" /> Example result for design review — no real provider was contacted.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/compare-vehicle-finance"
          className="btn-shine group inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg"
        >
          Compare finance options <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <SecondaryButton onClick={onRestart}>Start again</SecondaryButton>
      </div>
    </>
  );
}

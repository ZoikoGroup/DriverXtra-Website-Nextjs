"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, BadgeCheck, Check, CircleHelp, Lock, Loader2, Mail, MapPin, Send, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import RegionPicker from "@/components/ui/RegionPicker";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import { DEFAULT_REGION, useRegion } from "@/lib/region";
import Stepper, { ErrorBanner } from "@/components/selling/Stepper";
import {
  BackButton,
  CheckRow,
  Field,
  OptionGroup,
  PrimaryButton,
  SecondaryButton,
  StepNav,
  StepTitle,
  TimelineItem,
  inputClass,
} from "@/components/selling/FormParts";
import { conditionIssues, conditionLevels, vehicleTypes, years } from "@/components/selling/data";
import {
  LAST_FORM_STEP,
  balanceOptions,
  budgetOptions,
  dealers,
  documentOptions,
  financeOptions,
  nextSteps,
  replacementOptions,
  sellerRoles,
  shareOptions,
  steps,
  type StepId,
} from "./data";

type FormData = {
  vehicleType: string;
  role: string;
  postcode: string;
  lookupMode: "reg" | "details";
  reg: string;
  make: string;
  model: string;
  year: string;
  mileage: string;
  condition: string;
  issues: string[];
  finance: string;
  documents: string;
  dealer: string;
  replacement: string;
  wantedVehicle: string;
  budget: string;
  settlement: string;
  balance: string;
  share: string[];
  email: string;
  consent: boolean;
};

const initialData: FormData = {
  vehicleType: "",
  role: "",
  postcode: "",
  lookupMode: "reg",
  reg: "",
  make: "",
  model: "",
  year: "",
  mileage: "",
  condition: "",
  issues: [],
  finance: "",
  documents: "",
  dealer: "",
  replacement: "",
  wantedVehicle: "",
  budget: "",
  settlement: "",
  balance: "",
  share: shareOptions.map((o) => o.id),
  email: "",
  consent: false,
};

type Errors = Partial<Record<keyof FormData, string>>;

const hasFinance = (d: FormData) => d.finance === financeOptions[1];

function validate(step: StepId, d: FormData): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!d.vehicleType) e.vehicleType = "Choose a vehicle type.";
    if (!d.role) e.role = "Tell us who is trading in.";
    if (d.postcode.trim().length < 2) e.postcode = "Enter the postcode where the vehicle is.";
  }
  if (step === 2) {
    if (d.lookupMode === "reg" && d.reg.trim().length < 2) e.reg = "Enter the registration or VIN.";
    if (d.lookupMode === "details") {
      if (!d.make.trim()) e.make = "Enter the make.";
      if (!d.model.trim()) e.model = "Enter the model.";
      if (!d.year) e.year = "Choose the year.";
    }
    if (!d.mileage || Number(d.mileage) < 0) e.mileage = "Enter the current mileage.";
  }
  if (step === 3) {
    if (!d.condition) e.condition = "Choose the overall condition.";
    if (!d.finance) e.finance = "Tell us about any outstanding finance.";
    if (!d.documents) e.documents = "Tell us about the ownership document.";
  }
  if (step === 4 && !d.dealer) e.dealer = "Choose a dealer to request terms from.";
  if (step === 5) {
    if (!d.replacement) e.replacement = "Tell us about the vehicle you plan to buy.";
    if (d.replacement === "chosen" && !d.wantedVehicle.trim()) e.wantedVehicle = "Enter the vehicle or listing you've chosen.";
  }
  if (step === 6) {
    if (hasFinance(d) && !(Number(d.settlement) > 0)) e.settlement = "Enter your lender's settlement figure.";
    if (!d.balance) e.balance = "Choose how you'll pay any balance.";
  }
  if (step === 7) {
    if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Enter a valid email so we can send status updates.";
    if (!d.consent) e.consent = "Your consent is needed to send the request.";
  }
  return e;
}

const money = (value: string) => `$${Number(value || 0).toLocaleString("en-US")}`;

export default function TradeInWizard() {
  const region = useRegion();
  const [step, setStep] = useState<StepId>(1);
  const [maxStep, setMaxStep] = useState<StepId>(1);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [attempt, setAttempt] = useState(0);
  const [eligibility, setEligibility] = useState<"idle" | "checking" | "eligible" | "business" | "unavailable">("idle");
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [sentAt, setSentAt] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => setEligibility("idle"), [region]);

  const dealer = dealers.find((d) => d.id === data.dealer);
  const submitted = !!reference;

  const update = (patch: Partial<FormData>) => {
    setData((d) => ({ ...d, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      (Object.keys(patch) as (keyof FormData)[]).forEach((k) => delete next[k]);
      return next;
    });
    if ("vehicleType" in patch || "role" in patch || "postcode" in patch) setEligibility("idle");
  };

  const goTo = (next: StepId) => {
    setStep(next);
    setMaxStep((m) => (next > m ? next : m));
    setErrors({});
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 100) cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const check = () => {
    const found = validate(step, data);
    setErrors(found);
    if (Object.keys(found).length) {
      setAttempt((a) => a + 1);
      return false;
    }
    return true;
  };

  const next = () => check() && goTo((step + 1) as StepId);

  const checkEligibility = () => {
    if (!check()) return;
    setEligibility("checking");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      if (region !== DEFAULT_REGION) setEligibility("unavailable");
      else if (data.role === sellerRoles[2]) setEligibility("business");
      else setEligibility("eligible");
    }, 900);
  };

  const sendRequest = () => {
    if (!check()) return;
    setSubmitting(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setReference(`DX-TI-${Math.floor(100000 + Math.random() * 900000)}`);
      setSentAt(new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }));
      setSubmitting(false);
      goTo(8);
    }, 1200);
  };

  const restart = () => {
    setData(initialData);
    setEligibility("idle");
    setReference("");
    setMaxStep(1);
    goTo(1);
  };

  // Before sending: the form steps you've reached. After sending: only the tracking steps.
  const canOpen = (id: StepId) => (submitted ? id > LAST_FORM_STEP : id <= maxStep && id <= LAST_FORM_STEP);
  const isDone = (id: StepId) => (submitted ? id <= LAST_FORM_STEP : id < maxStep && id !== step);

  return (
    <section id="check-trade-in" className="scroll-mt-28 bg-slate-50 py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="Trade-In"
          title="Check trade-in options, step by step"
          description="A market valuation isn't a dealer allowance. A request isn't an offer. An allowance isn't cash, a paid-off loan or a completed purchase."
        />

        <Reveal delay={150}>
          <Stepper steps={steps} step={step} isDone={isDone} canOpen={canOpen} onSelect={goTo} />
        </Reveal>

        <Reveal delay={250}>
          <div ref={cardRef} className="mt-5 scroll-mt-32 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <ErrorBanner errors={Object.values(errors)} attempt={attempt} />

            <div key={step} className="animate-fade-up">
              {step === 1 && (
                <>
                  <StepTitle>Check whether trade-in is available for you</StepTitle>
                  <div className="mt-2 flex flex-wrap items-center gap-1 text-xs text-slate-500">
                    Selling in <strong className="text-ink">{region}</strong> ·
                    <RegionPicker
                      label="Change market"
                      buttonClassName="font-semibold text-blue-700 underline underline-offset-2 transition-colors hover:text-ink"
                    />
                    . Nothing is shared yet.
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <OptionGroup title="Vehicle type" name="ti-vehicleType" options={vehicleTypes} value={data.vehicleType} onChange={(vehicleType) => update({ vehicleType })} error={errors.vehicleType} />
                    <OptionGroup title="You are" name="ti-role" options={sellerRoles} value={data.role} onChange={(role) => update({ role })} error={errors.role} />
                  </div>

                  <Field label="Postcode where the vehicle is" error={errors.postcode} hint="Used to find dealers that serve your area. Not shown to anyone.">
                    <input
                      value={data.postcode}
                      onChange={(e) => update({ postcode: e.target.value.toUpperCase() })}
                      placeholder="e.g. M1 1AE"
                      className={`${inputClass(errors.postcode)} max-w-[260px]`}
                    />
                  </Field>

                  {eligibility === "eligible" && (
                    <div className="mt-5 flex animate-fade-up flex-wrap items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                      <span className="grid h-9 w-9 animate-pop place-items-center rounded-full bg-emerald-500 text-white">
                        <Check className="h-5 w-5" />
                      </span>
                      <div className="flex-1 text-sm">
                        <p className="font-bold text-emerald-800">Trade-in is available near {data.postcode.trim()}</p>
                        <p className="text-emerald-700">{dealers.length} verified dealers consider trade-ins in your area.</p>
                      </div>
                      <PrimaryButton onClick={() => goTo(2)}>
                        Continue <ArrowRight className="h-4 w-4" />
                      </PrimaryButton>
                    </div>
                  )}
                  {eligibility === "business" && (
                    <Notice title="Businesses use the trade-to-trade route">
                      Dealer-to-dealer sales aren&apos;t trade-ins. See other ways to sell below.
                    </Notice>
                  )}
                  {eligibility === "unavailable" && (
                    <Notice title={`No trade-in dealers in ${region} yet`}>You can still sell another way — compare the options below.</Notice>
                  )}

                  {eligibility !== "eligible" && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      <PrimaryButton onClick={checkEligibility} disabled={eligibility === "checking"}>
                        {eligibility === "checking" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Checking…
                          </>
                        ) : (
                          "Check Eligibility"
                        )}
                      </PrimaryButton>
                      <SecondaryButton href="#compare-methods">View Other Ways to Sell</SecondaryButton>
                    </div>
                  )}
                </>
              )}

              {step === 2 && (
                <>
                  <StepTitle>Your current vehicle</StepTitle>
                  <div className="mt-4 inline-flex rounded-full bg-slate-100 p-1">
                    {(["reg", "details"] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => update({ lookupMode: mode })}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                          data.lookupMode === mode ? "bg-white text-ink shadow" : "text-slate-500 hover:text-ink"
                        }`}
                      >
                        {mode === "reg" ? "Registration or VIN" : "Enter details"}
                      </button>
                    ))}
                  </div>
                  <div key={data.lookupMode} className="grid animate-fade-up gap-4 sm:grid-cols-2">
                    {data.lookupMode === "reg" ? (
                      <Field label="Registration or VIN" error={errors.reg}>
                        <input value={data.reg} onChange={(e) => update({ reg: e.target.value.toUpperCase() })} placeholder="e.g. AB12 CDE" className={`${inputClass(errors.reg)} font-semibold tracking-wider`} />
                      </Field>
                    ) : (
                      <>
                        <Field label="Make" error={errors.make}>
                          <input value={data.make} onChange={(e) => update({ make: e.target.value })} placeholder="e.g. Volvo" className={inputClass(errors.make)} />
                        </Field>
                        <Field label="Model" error={errors.model}>
                          <input value={data.model} onChange={(e) => update({ model: e.target.value })} placeholder="e.g. XC60" className={inputClass(errors.model)} />
                        </Field>
                        <Field label="Year" error={errors.year}>
                          <select value={data.year} onChange={(e) => update({ year: e.target.value })} className={inputClass(errors.year)}>
                            <option value="">Choose year</option>
                            {years.map((y) => (
                              <option key={y}>{y}</option>
                            ))}
                          </select>
                        </Field>
                      </>
                    )}
                    <Field label="Current mileage" error={errors.mileage}>
                      <input type="number" inputMode="numeric" min={0} value={data.mileage} onChange={(e) => update({ mileage: e.target.value })} placeholder="e.g. 32000" className={inputClass(errors.mileage)} />
                    </Field>
                  </div>
                  <StepNav onBack={() => goTo(1)} onNext={next} />
                </>
              )}

              {step === 3 && (
                <>
                  <StepTitle>Condition and your right to sell</StepTitle>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {conditionLevels.map((c) => {
                      const active = data.condition === c.id;
                      return (
                        <label
                          key={c.id}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
                            active ? "border-brand bg-brand-light/50 shadow-md" : errors.condition ? "border-red-300" : "border-slate-200 hover:border-slate-400"
                          }`}
                        >
                          <input type="radio" name="ti-condition" checked={active} onChange={() => update({ condition: c.id })} className="mt-0.5 h-4 w-4 accent-ink" />
                          <span>
                            <span className="block text-sm font-bold text-ink">{c.label}</span>
                            <span className="block text-xs text-slate-500">{c.text}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <OptionGroup title="Outstanding finance" name="ti-finance" options={financeOptions} value={data.finance} onChange={(finance) => update({ finance })} error={errors.finance} />
                    <OptionGroup title="Ownership document" name="ti-documents" options={documentOptions} value={data.documents} onChange={(documents) => update({ documents })} error={errors.documents} />
                  </div>
                  <p className="mt-5 text-[13px] font-bold text-ink">Anything the dealer should know?</p>
                  <div className="mt-2 grid gap-x-4 sm:grid-cols-2">
                    {conditionIssues.map((issue) => (
                      <CheckRow
                        key={issue}
                        label={issue}
                        checked={data.issues.includes(issue)}
                        onChange={() => update({ issues: data.issues.includes(issue) ? data.issues.filter((i) => i !== issue) : [...data.issues, issue] })}
                      />
                    ))}
                  </div>
                  <StepNav onBack={() => goTo(2)} onNext={next} />
                </>
              )}

              {step === 4 && (
                <>
                  <StepTitle>Choose a dealer</StepTitle>
                  <p className="mt-1 text-sm text-slate-500">Verified dealers near {data.postcode.trim() || "you"} that consider trade-ins. Only the dealer you choose receives your request.</p>
                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {dealers.map((d, i) => {
                      const active = data.dealer === d.id;
                      return (
                        <label
                          key={d.id}
                          className={`group relative flex animate-fade-up cursor-pointer flex-col rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                            active ? "border-brand bg-brand-light/40 shadow-md" : errors.dealer ? "border-red-300" : "border-slate-200 hover:border-slate-400"
                          }`}
                          style={{ animationDelay: `${i * 80}ms` }}
                        >
                          <input type="radio" name="ti-dealer" checked={active} onChange={() => update({ dealer: d.id })} className="sr-only" />
                          <span
                            className={`absolute top-3 right-3 grid h-5 w-5 place-items-center rounded-full border transition-all duration-300 ${
                              active ? "border-ink bg-ink text-white" : "border-slate-300 bg-white"
                            }`}
                          >
                            {active && <Check className="h-3 w-3 animate-pop" />}
                          </span>
                          <span className="pr-6 text-sm font-bold text-ink">{d.name}</span>
                          <span className="mt-1 text-xs text-slate-500">{d.note}</span>
                          <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                            <BadgeCheck className="h-3 w-3" />
                            {d.badge}
                          </span>
                          <span className="mt-3 flex items-center gap-3 text-xs text-slate-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-slate-400" /> {d.distance}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 fill-brand text-brand" /> {d.rating} ({d.reviews})
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  <StepNav onBack={() => goTo(3)} onNext={next} />
                </>
              )}

              {step === 5 && (
                <>
                  <StepTitle>Your replacement vehicle</StepTitle>
                  <p className="mt-1 text-sm text-slate-500">A trade-in is linked to buying from {dealer?.name ?? "the same dealer"}. The purchase is a separate agreement.</p>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <OptionGroup
                      title="Where are you in your search?"
                      name="ti-replacement"
                      options={replacementOptions.map((o) => o.label)}
                      value={replacementOptions.find((o) => o.id === data.replacement)?.label ?? ""}
                      onChange={(label) => update({ replacement: replacementOptions.find((o) => o.label === label)?.id ?? "" })}
                      error={errors.replacement}
                    />
                    <div>
                      {data.replacement === "chosen" && (
                        <div className="animate-fade-up">
                          <Field label="Vehicle or listing you've chosen" error={errors.wantedVehicle}>
                            <input value={data.wantedVehicle} onChange={(e) => update({ wantedVehicle: e.target.value })} placeholder="e.g. 2024 Volvo XC60 B5 Plus" className={inputClass(errors.wantedVehicle)} />
                          </Field>
                        </div>
                      )}
                      <Field label="Budget for the replacement (optional)">
                        <select value={data.budget} onChange={(e) => update({ budget: e.target.value })} className={inputClass()}>
                          <option value="">Prefer not to say</option>
                          {budgetOptions.map((b) => (
                            <option key={b}>{b}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  </div>
                  <StepNav onBack={() => goTo(4)} onNext={next} />
                </>
              )}

              {step === 6 && (
                <>
                  <StepTitle>Your numbers</StepTitle>
                  <p className="mt-1 text-sm text-slate-500">We don&apos;t estimate an allowance — only the dealer can, after inspection.</p>
                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div>
                      {hasFinance(data) ? (
                        <Field label="Settlement figure from your lender" error={errors.settlement} hint="The amount needed to clear the finance today.">
                          <input type="number" inputMode="numeric" min={0} value={data.settlement} onChange={(e) => update({ settlement: e.target.value })} placeholder="e.g. 12500" className={inputClass(errors.settlement)} />
                        </Field>
                      ) : (
                        <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                          You said there&apos;s {data.finance === financeOptions[0] ? "no outstanding finance" : "no confirmed finance"} — no settlement figure is needed.
                        </p>
                      )}
                      <div className="mt-4">
                        <OptionGroup title="How you'll pay any balance" name="ti-balance" options={balanceOptions} value={data.balance} onChange={(balance) => update({ balance })} error={errors.balance} />
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-navy p-5 text-white">
                      <p className="text-xs font-semibold tracking-wider text-brand uppercase">How it adds up</p>
                      <dl className="mt-4 space-y-3 text-sm">
                        <div className="flex justify-between gap-3">
                          <dt className="text-slate-400">Replacement price</dt>
                          <dd>Set by the dealer</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-slate-400">− Trade-in allowance</dt>
                          <dd>After inspection</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-slate-400">+ Finance settlement</dt>
                          <dd key={data.settlement} className="animate-fade-up font-semibold text-brand">
                            {hasFinance(data) && data.settlement ? money(data.settlement) : "$0"}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-3 border-t border-white/10 pt-3 font-bold">
                          <dt>Balance you pay</dt>
                          <dd>In the dealer&apos;s terms</dd>
                        </div>
                      </dl>
                      <p className="mt-4 text-xs leading-relaxed text-slate-400">
                        If the allowance is less than your settlement, the difference (negative equity) is added to what you pay — it must be shown in the dealer&apos;s terms.
                      </p>
                    </div>
                  </div>
                  <StepNav onBack={() => goTo(5)} onNext={next} />
                </>
              )}

              {step === 7 && (
                <>
                  <StepTitle>Choose what&apos;s shared, then request terms</StepTitle>
                  <p className="mt-1 text-sm text-slate-500">Shared only with {dealer?.name ?? "the dealer you chose"}.</p>
                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="text-[13px] font-bold text-ink">Details to share</p>
                      <div className="mt-2 space-y-1">
                        {shareOptions.map((o) => (
                          <CheckRow
                            key={o.id}
                            label={o.label}
                            note={o.note}
                            disabled={"required" in o}
                            checked={data.share.includes(o.id)}
                            onChange={() => update({ share: data.share.includes(o.id) ? data.share.filter((s) => s !== o.id) : [...data.share, o.id] })}
                          />
                        ))}
                      </div>
                      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Lock className="h-3 w-3" /> ID and ownership documents are never shared at this step.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <Field label="Email for status updates" error={errors.email}>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input type="email" value={data.email} onChange={(e) => update({ email: e.target.value })} placeholder="you@example.com" className={`${inputClass(errors.email)} pl-9`} />
                        </div>
                      </Field>
                      <CheckRow
                        label={`I agree to share the selected details with ${dealer?.name ?? "the dealer"} to request trade-in terms. I can withdraw at any time before signing.`}
                        checked={data.consent}
                        onChange={() => update({ consent: !data.consent })}
                        error={!!errors.consent}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <BackButton onClick={() => goTo(6)} />
                    <PrimaryButton onClick={sendRequest} disabled={submitting}>
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> Request Trade-In Terms
                        </>
                      )}
                    </PrimaryButton>
                  </div>
                </>
              )}

              {step === 8 && submitted && (
                <>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="grid h-12 w-12 animate-pop place-items-center rounded-full bg-emerald-500 text-white shadow-[0_0_0_8px_rgba(16,185,129,0.15)]">
                      <Check className="h-6 w-6" />
                    </span>
                    <div>
                      <StepTitle>Request sent to {dealer?.name}</StepTitle>
                      <p className="text-sm text-slate-500">
                        Reference <strong className="text-ink">{reference}</strong> · updates go to {data.email}
                      </p>
                    </div>
                  </div>
                  <ol className="mt-6">
                    <TimelineItem state="done" title="Request sent" text={sentAt} />
                    <TimelineItem state="current" title={`${dealer?.name} is reviewing`} text="Typically within 1 business day." />
                    <TimelineItem state="next" title="Inspection booked" text="The dealer confirms any allowance only after inspecting the vehicle." last />
                  </ol>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <PrimaryButton onClick={() => goTo(9)}>
                      What happens next <ArrowRight className="h-4 w-4" />
                    </PrimaryButton>
                    <SecondaryButton onClick={restart}>Start a new request</SecondaryButton>
                  </div>
                </>
              )}

              {step === 9 && submitted && (
                <>
                  <StepTitle>Decision</StepTitle>
                  <p className="mt-1 text-sm text-slate-500">
                    When {dealer?.name} sends terms, you&apos;ll see the allowance, conditions and expiry here.
                  </p>
                  <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
                    <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <Loader2 className="h-4 w-4 animate-spin text-brand-dark" /> Waiting for the dealer&apos;s terms
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        { label: "Accept terms", icon: ThumbsUp },
                        { label: "Decline", icon: ThumbsDown },
                        { label: "Ask a question", icon: CircleHelp },
                      ].map(({ label, icon: Icon }) => (
                        <button
                          key={label}
                          type="button"
                          disabled
                          className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-400"
                        >
                          <Icon className="h-3.5 w-3.5" /> {label}
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-slate-500">These unlock when the terms arrive. Accepting isn&apos;t a completed purchase.</p>
                  </div>
                  <StepNav onBack={() => goTo(8)} onNext={() => goTo(10)} />
                </>
              )}

              {step === 10 && submitted && (
                <>
                  <StepTitle>Next steps</StepTitle>
                  <p className="mt-1 text-sm text-slate-500">What usually happens once you accept a dealer&apos;s trade-in terms.</p>
                  <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                    {nextSteps.map((s, i) => (
                      <li
                        key={s.title}
                        className="group flex animate-fade-up gap-3 rounded-xl border border-slate-200 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-md"
                        style={{ animationDelay: `${i * 80}ms` }}
                      >
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-brand transition-colors group-hover:bg-brand group-hover:text-ink">
                          {i + 1}
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-ink">{s.title}</span>
                          <span className="block text-xs text-slate-500">{s.text}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <BackButton onClick={() => goTo(9)} />
                    <SecondaryButton onClick={restart}>Start a new request</SecondaryButton>
                  </div>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 animate-fade-up rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
      <p className="font-bold">{title}</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}

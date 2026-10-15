"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, BadgeCheck, Check, Loader2, Lock, Mail, Send } from "lucide-react";
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
import { conditionIssues, conditionLevels, keyOptions, vehicleTypes, years } from "@/components/selling/data";
import { examplePartner, sellerRoles, shareOptions, steps, type StepId } from "./data";

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
  keys: string;
  notes: string;
  termsAccepted: boolean;
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
  keys: "2",
  notes: "",
  termsAccepted: false,
  share: shareOptions.map((o) => o.id),
  email: "",
  consent: false,
};

type Errors = Partial<Record<keyof FormData, string>>;

function validate(step: StepId, d: FormData): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!d.vehicleType) e.vehicleType = "Choose a vehicle type.";
    if (!d.role) e.role = "Tell us who is selling.";
    if (d.postcode.trim().length < 2) e.postcode = "Enter a postcode area or town.";
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
  if (step === 3 && !d.condition) e.condition = "Choose the overall condition.";
  if (step === 4 && !d.termsAccepted) e.termsAccepted = "Confirm you've read the partner's terms.";
  if (step === 5) {
    if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Enter a valid email so we can send status updates.";
    if (!d.consent) e.consent = "Your consent is needed to send the request.";
  }
  return e;
}

export default function OfferWizard() {
  const region = useRegion();
  const [step, setStep] = useState<StepId>(1);
  const [maxStep, setMaxStep] = useState<StepId>(1);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [attempt, setAttempt] = useState(0);
  const [availability, setAvailability] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [sentAt, setSentAt] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // A new market needs a fresh availability check.
  useEffect(() => setAvailability("idle"), [region]);

  const update = (patch: Partial<FormData>) => {
    setData((d) => ({ ...d, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      (Object.keys(patch) as (keyof FormData)[]).forEach((k) => delete next[k]);
      return next;
    });
    if ("vehicleType" in patch || "role" in patch || "postcode" in patch) setAvailability("idle");
  };

  const goTo = (next: StepId) => {
    setStep(next);
    setMaxStep((m) => (next > m ? next : m));
    setErrors({});
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 100) cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /** Validates the current step; returns true when it's complete. */
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

  const checkAvailability = () => {
    if (!check()) return;
    setAvailability("checking");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setAvailability(region === DEFAULT_REGION ? "available" : "unavailable");
    }, 900);
  };

  const sendRequest = () => {
    if (!check()) return;
    setSubmitting(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setReference(`DX-IO-${Math.floor(100000 + Math.random() * 900000)}`);
      setSentAt(new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }));
      setSubmitting(false);
      goTo(6);
    }, 1200);
  };

  const restart = () => {
    setData(initialData);
    setAvailability("idle");
    setReference("");
    setMaxStep(1);
    goTo(1);
  };

  const submitted = !!reference;
  const canOpen = (id: StepId) => (submitted ? id === 6 : id <= maxStep && id !== 6);
  const isDone = (id: StepId) => id < maxStep && id !== step && (id !== 6 || submitted);
  const errorList = Object.values(errors);

  return (
    <section id="request-offer" className="scroll-mt-28 bg-slate-50 py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="Instant Offer"
          title="Request an offer, step by step"
          description="Estimate ≠ offer. Submitting a request ≠ receiving an offer. Viewing an offer ≠ accepting it. Accepting ≠ a completed transfer or payment."
        />

        <Reveal delay={150}>
          <Stepper steps={steps} step={step} isDone={isDone} canOpen={canOpen} onSelect={goTo} />
        </Reveal>

        {/* Step card */}
        <Reveal delay={250}>
          <div ref={cardRef} className="mt-5 scroll-mt-32 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <ErrorBanner errors={errorList} attempt={attempt} />

            <div key={step} className="animate-fade-up">
              {step === 1 && (
                <>
                  <StepTitle>Is an offer program available for you?</StepTitle>
                  <div className="mt-2 flex flex-wrap items-center gap-1 text-xs text-slate-500">
                    Selling in <strong className="text-ink">{region}</strong> ·
                    <RegionPicker
                      label="Change market"
                      buttonClassName="font-semibold text-blue-700 underline underline-offset-2 transition-colors hover:text-ink"
                    />
                    . Nothing is shared at this step.
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <OptionGroup
                      title="Vehicle type"
                      name="vehicleType"
                      options={vehicleTypes}
                      value={data.vehicleType}
                      onChange={(vehicleType) => update({ vehicleType })}
                      error={errors.vehicleType}
                    />
                    <OptionGroup
                      title="You are"
                      name="role"
                      options={sellerRoles}
                      value={data.role}
                      onChange={(role) => update({ role })}
                      error={errors.role}
                    />
                  </div>

                  <Field label="Postcode area where the vehicle is" error={errors.postcode} hint="Partners only buy in areas they serve. Not your full address.">
                    <input
                      value={data.postcode}
                      onChange={(e) => update({ postcode: e.target.value })}
                      placeholder="e.g. M1 or Manchester"
                      className={`${inputClass(errors.postcode)} max-w-[260px]`}
                    />
                  </Field>

                  {availability === "available" && (
                    <div className="mt-5 flex animate-fade-up flex-wrap items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                      <span className="grid h-9 w-9 animate-pop place-items-center rounded-full bg-emerald-500 text-white">
                        <Check className="h-5 w-5" />
                      </span>
                      <div className="flex-1 text-sm">
                        <p className="font-bold text-emerald-800">An offer program is available</p>
                        <p className="text-emerald-700">
                          A verified partner buys this vehicle type ({data.vehicleType.toLowerCase()}) in {data.postcode.trim()}.
                        </p>
                      </div>
                      <PrimaryButton onClick={() => goTo(2)}>
                        Continue <ArrowRight className="h-4 w-4" />
                      </PrimaryButton>
                    </div>
                  )}
                  {availability === "unavailable" && (
                    <div className="mt-5 animate-fade-up rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                      <p className="font-bold">No instant-offer partners in {region} yet</p>
                      <p className="mt-1">You can still sell another way — compare the options below.</p>
                    </div>
                  )}

                  {availability !== "available" && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      <PrimaryButton onClick={checkAvailability} disabled={availability === "checking"}>
                        {availability === "checking" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Checking…
                          </>
                        ) : (
                          "Check Availability"
                        )}
                      </PrimaryButton>
                      <SecondaryButton href="#compare-methods">View Other Methods</SecondaryButton>
                    </div>
                  )}
                </>
              )}

              {step === 2 && (
                <>
                  <StepTitle>Tell us about the vehicle</StepTitle>
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
                        <input
                          value={data.reg}
                          onChange={(e) => update({ reg: e.target.value.toUpperCase() })}
                          placeholder="e.g. AB12 CDE"
                          className={`${inputClass(errors.reg)} font-semibold tracking-wider`}
                        />
                      </Field>
                    ) : (
                      <>
                        <Field label="Make" error={errors.make}>
                          <input value={data.make} onChange={(e) => update({ make: e.target.value })} placeholder="e.g. Toyota" className={inputClass(errors.make)} />
                        </Field>
                        <Field label="Model" error={errors.model}>
                          <input value={data.model} onChange={(e) => update({ model: e.target.value })} placeholder="e.g. RAV4 Hybrid" className={inputClass(errors.model)} />
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
                      <input
                        type="number"
                        inputMode="numeric"
                        min={0}
                        value={data.mileage}
                        onChange={(e) => update({ mileage: e.target.value })}
                        placeholder="e.g. 24000"
                        className={inputClass(errors.mileage)}
                      />
                    </Field>
                  </div>
                  <StepNav onBack={() => goTo(1)} onNext={next} />
                </>
              )}

              {step === 3 && (
                <>
                  <StepTitle>Describe its condition honestly</StepTitle>
                  <p className="mt-1 text-sm text-slate-500">The partner checks this at inspection — accurate answers avoid a revised offer.</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {conditionLevels.map((c) => {
                      const active = data.condition === c.id;
                      return (
                        <label
                          key={c.id}
                          className={`group flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
                            active ? "border-brand bg-brand-light/50 shadow-md" : errors.condition ? "border-red-300" : "border-slate-200 hover:border-slate-400"
                          }`}
                        >
                          <input
                            type="radio"
                            name="condition"
                            checked={active}
                            onChange={() => update({ condition: c.id })}
                            className="mt-0.5 h-4 w-4 accent-ink"
                          />
                          <span>
                            <span className="block text-sm font-bold text-ink">{c.label}</span>
                            <span className="block text-xs text-slate-500">{c.text}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-[1.4fr_1fr]">
                    <div>
                      <p className="text-[13px] font-bold text-ink">Anything the partner should know?</p>
                      <div className="mt-2 space-y-1">
                        {conditionIssues.map((issue) => (
                          <CheckRow
                            key={issue}
                            label={issue}
                            checked={data.issues.includes(issue)}
                            onChange={() =>
                              update({
                                issues: data.issues.includes(issue) ? data.issues.filter((i) => i !== issue) : [...data.issues, issue],
                              })
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Field label="Number of keys">
                        <select value={data.keys} onChange={(e) => update({ keys: e.target.value })} className={inputClass()}>
                          {keyOptions.map((k) => (
                            <option key={k}>{k}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Notes (optional)" hint={`${data.notes.length}/300`}>
                        <textarea
                          value={data.notes}
                          maxLength={300}
                          rows={3}
                          onChange={(e) => update({ notes: e.target.value })}
                          placeholder="e.g. small scratch on rear bumper"
                          className={`${inputClass()} h-auto resize-none py-2`}
                        />
                      </Field>
                    </div>
                  </div>
                  <StepNav onBack={() => goTo(2)} onNext={next} />
                </>
              )}

              {step === 4 && (
                <>
                  <StepTitle>Review the partner&apos;s terms</StepTitle>
                  <p className="mt-1 text-sm text-slate-500">Only this partner receives your request. DriverXtra doesn&apos;t buy vehicles.</p>
                  <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
                    <div className="flex flex-wrap items-center justify-between gap-2 bg-navy px-5 py-4 text-white">
                      <p className="font-bold">{examplePartner.name}</p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        {examplePartner.badge}
                      </span>
                    </div>
                    <dl>
                      {examplePartner.terms.map((t, i) => (
                        <div
                          key={t.label}
                          className="grid animate-fade-up gap-1 border-t border-slate-100 px-5 py-3 transition-colors hover:bg-slate-50 sm:grid-cols-[150px_1fr]"
                          style={{ animationDelay: `${i * 60}ms` }}
                        >
                          <dt className="text-xs font-semibold text-slate-500">{t.label}</dt>
                          <dd className="text-sm text-ink">{t.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="mt-4">
                    <CheckRow
                      label="I've read and understood these terms"
                      checked={data.termsAccepted}
                      onChange={() => update({ termsAccepted: !data.termsAccepted })}
                      error={!!errors.termsAccepted}
                    />
                  </div>
                  <StepNav onBack={() => goTo(3)} onNext={next} />
                </>
              )}

              {step === 5 && (
                <>
                  <StepTitle>Choose what&apos;s shared, then request</StepTitle>
                  <p className="mt-1 text-sm text-slate-500">Shared only with {examplePartner.name}.</p>
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
                            onChange={() =>
                              update({ share: data.share.includes(o.id) ? data.share.filter((s) => s !== o.id) : [...data.share, o.id] })
                            }
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
                          <input
                            type="email"
                            value={data.email}
                            onChange={(e) => update({ email: e.target.value })}
                            placeholder="you@example.com"
                            className={`${inputClass(errors.email)} pl-9`}
                          />
                        </div>
                      </Field>
                      <CheckRow
                        label={`I agree to share the selected details with ${examplePartner.name} to request an offer. I can withdraw before any sale.`}
                        checked={data.consent}
                        onChange={() => update({ consent: !data.consent })}
                        error={!!errors.consent}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <BackButton onClick={() => goTo(4)} />
                    <PrimaryButton onClick={sendRequest} disabled={submitting}>
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> Send Request
                        </>
                      )}
                    </PrimaryButton>
                  </div>
                </>
              )}

              {step === 6 && submitted && (
                <>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="grid h-12 w-12 animate-pop place-items-center rounded-full bg-emerald-500 text-white shadow-[0_0_0_8px_rgba(16,185,129,0.15)]">
                      <Check className="h-6 w-6" />
                    </span>
                    <div>
                      <StepTitle>Request sent</StepTitle>
                      <p className="text-sm text-slate-500">
                        Reference <strong className="text-ink">{reference}</strong> · updates go to {data.email}
                      </p>
                    </div>
                  </div>

                  <ol className="mt-6 space-y-0">
                    <TimelineItem state="done" title="Request sent" text={sentAt} />
                    <TimelineItem state="current" title={`${examplePartner.name} is reviewing`} text="Typically within 1 business day." />
                    <TimelineItem
                      state="next"
                      title="Offer or decline"
                      text="Any amount comes from the named partner and depends on inspection."
                      last
                    />
                  </ol>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <SecondaryButton onClick={restart}>Start a new request</SecondaryButton>
                    <SecondaryButton href="/sell-vehicles#create-listing">Create a listing instead</SecondaryButton>
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

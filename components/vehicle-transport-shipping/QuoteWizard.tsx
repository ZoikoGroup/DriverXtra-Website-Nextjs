"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { CheckCircle2, ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { regions, useRegion } from "@/lib/region";
import { flexibility, img, transportTypes, vehicleTypes } from "./data";

const steps = ["Route", "Vehicle", "Condition", "Dates", "Review"] as const;

type Values = {
  pickup: string;
  delivery: string;
  country: string;
  year: string;
  vehicle: string;
  vehicleType: string;
  starts: string;
  rolls: string;
  service: string;
  date: string;
  flex: string;
};

const empty: Values = {
  pickup: "",
  delivery: "",
  country: "",
  year: "",
  vehicle: "",
  vehicleType: "",
  starts: "",
  rolls: "",
  service: "",
  date: "",
  flex: "",
};

const thisYear = new Date().getFullYear();

/** Required fields for each step, with the message shown when one is missing. */
function stepErrors(step: number, v: Values) {
  const e: Partial<Record<keyof Values, string>> = {};
  if (step === 0) {
    if (!v.pickup.trim()) e.pickup = "Enter a city or postal area.";
    if (!v.delivery.trim()) e.delivery = "Enter a city or postal area.";
  }
  if (step === 1) {
    if (
      !/^\d{4}$/.test(v.year) ||
      Number(v.year) < 1900 ||
      Number(v.year) > thisYear + 1
    )
      e.year = "Enter a four-digit year, e.g. 2019.";
    if (!v.vehicle.trim()) e.vehicle = "Enter the make and model.";
    if (!v.vehicleType) e.vehicleType = "Choose a vehicle type.";
  }
  if (step === 2) {
    if (!v.starts) e.starts = "Choose an answer.";
    if (!v.rolls) e.rolls = "Choose an answer.";
    if (!v.service) e.service = "Choose a service type.";
  }
  if (step === 3) {
    if (!v.date) e.date = "Choose a date.";
    if (!v.flex) e.flex = "Choose how flexible you are.";
  }
  return e;
}

const nextLabel = [
  "Check route",
  "Next: condition",
  "Next: dates",
  "Review request",
];

/** Five-step demo quote request — nothing is sent anywhere. */
export default function QuoteWizard() {
  const region = useRegion();
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [values, setValues] = useState<Values>(empty);
  const [showErrors, setShowErrors] = useState(false);
  const [saved, setSaved] = useState(false);

  const country = values.country || region;
  const errors = showErrors ? stepErrors(step, values) : {};
  const set = (key: keyof Values) => (value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  const goTo = (i: number) => {
    setStep(i);
    setShowErrors(false);
  };

  const next = () => {
    if (Object.keys(stepErrors(step, values)).length)
      return setShowErrors(true);
    const n = step + 1;
    setReached((r) => Math.max(r, n));
    goTo(n);
  };

  const reset = () => {
    setValues(empty);
    setStep(0);
    setReached(0);
    setSaved(false);
    setShowErrors(false);
  };

  const summary: [string, string, number][] = [
    ["Pickup", `${values.pickup}, ${region}`, 0],
    ["Delivery", `${values.delivery}, ${country}`, 0],
    ["Vehicle", `${values.year} ${values.vehicle} (${values.vehicleType})`, 1],
    ["Starts and drives", values.starts, 2],
    ["Rolls, steers and brakes", values.rolls, 2],
    ["Service type", values.service, 2],
    [
      "Earliest pickup",
      values.date
        ? new Date(`${values.date}T00:00`).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "",
      3,
    ],
    ["Flexibility", values.flex, 3],
  ];

  return (
    <>
      <Reveal>
        <div className="flex items-center gap-2">
          <Eyebrow>Request a transport quote</Eyebrow>
          <span className="rounded border border-brand/60 bg-brand-light px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-gold">
            DEMO
          </span>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mt-3 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
          Tell us about the move
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
          Start with the origin and destination area; exact addresses and
          personal contact information are requested only when needed.
        </p>
      </Reveal>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Reveal delay={150} className="flex h-full flex-col">
          {/* Step pills — only steps already reached can be revisited. */}
          <ol className="flex flex-wrap gap-2">
            {steps.map((label, i) => {
              const current = i === step && !saved;
              const enabled = i <= reached && !saved;
              return (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    disabled={!enabled}
                    aria-current={current ? "step" : undefined}
                    className={`flex items-center gap-2 rounded-full border py-1.5 pr-3.5 pl-1.5 text-[13px] font-semibold transition-colors ${
                      current
                        ? "border-navy bg-navy text-white"
                        : "border-slate-200 bg-white text-ink"
                    } ${enabled && !current ? "hover:border-ink" : ""} disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <span
                      className={`grid h-6 w-6 place-items-center rounded-full text-[12px] font-black ${
                        current
                          ? "bg-brand text-ink"
                          : i < reached
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-ink"
                      }`}
                    >
                      {i + 1}
                    </span>
                    {label}
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-4 flex-1 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            {saved ? (
              <div className="animate-fade-up" role="status">
                <p className="flex items-center gap-2 text-[15px] font-bold text-ink">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  Demo request saved
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  Nothing has been sent. In a live service, your route and
                  vehicle details would only go to a named provider after you
                  agree, and you&apos;d receive a quotation to review — not a
                  booking.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className={`${secondaryBtn} mt-5`}
                >
                  Start again
                </button>
              </div>
            ) : (
              <div key={step} className="animate-fade-up">
                {step === 0 && (
                  <>
                    <StepTitle>Where is the vehicle going?</StepTitle>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      <Field
                        label="Where will the vehicle be picked up?"
                        hint={`${region} — city or postal area only for now.`}
                        error={errors.pickup}
                      >
                        <Input
                          value={values.pickup}
                          onChange={set("pickup")}
                          placeholder="City or postal area"
                          invalid={!!errors.pickup}
                        />
                      </Field>
                      <Field
                        label="Where should the vehicle be delivered?"
                        error={errors.delivery}
                      >
                        <Input
                          value={values.delivery}
                          onChange={set("delivery")}
                          placeholder="City or postal area"
                          invalid={!!errors.delivery}
                        />
                      </Field>
                      <Field label="Delivery country">
                        <Select
                          value={country}
                          onChange={set("country")}
                          options={regions.map((r) => r.name)}
                        />
                      </Field>
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <StepTitle>What are we moving?</StepTitle>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      <Field
                        label="Vehicle year"
                        hint="Four digits, e.g. 2019"
                        error={errors.year}
                      >
                        <Input
                          value={values.year}
                          onChange={(v) => set("year")(v.replace(/\D/g, ""))}
                          inputMode="numeric"
                          maxLength={4}
                          invalid={!!errors.year}
                        />
                      </Field>
                      <Field label="Make and model" error={errors.vehicle}>
                        <Input
                          value={values.vehicle}
                          onChange={set("vehicle")}
                          invalid={!!errors.vehicle}
                        />
                      </Field>
                      <Field label="Vehicle type" error={errors.vehicleType}>
                        <Select
                          value={values.vehicleType}
                          onChange={set("vehicleType")}
                          options={vehicleTypes}
                          placeholder="Choose"
                          invalid={!!errors.vehicleType}
                        />
                      </Field>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <StepTitle>What condition is it in?</StepTitle>
                    <div className="space-y-4">
                      <Choice
                        label="Does it start and drive?"
                        options={["Yes", "No", "Not sure"]}
                        value={values.starts}
                        onChange={set("starts")}
                        error={errors.starts}
                      />
                      <Choice
                        label="Does it roll, steer and brake?"
                        options={["Yes", "No", "Not sure"]}
                        value={values.rolls}
                        onChange={set("rolls")}
                        error={errors.rolls}
                      />
                      <Choice
                        label="Service type"
                        options={transportTypes}
                        value={values.service}
                        onChange={set("service")}
                        error={errors.service}
                      />
                      {(values.starts === "No" || values.rolls === "No") && (
                        <p className="rounded-lg bg-amber-50 px-3 py-2 text-[13px] text-amber-900">
                          Vehicles that don&apos;t start, roll, steer or brake
                          may need special equipment and an extra charge.
                        </p>
                      )}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <StepTitle>When should it be picked up?</StepTitle>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Earliest pickup date" error={errors.date}>
                        <Input
                          type="date"
                          value={values.date}
                          onChange={set("date")}
                          min={new Date().toISOString().slice(0, 10)}
                          invalid={!!errors.date}
                        />
                      </Field>
                      <Field label="How flexible are you?" error={errors.flex}>
                        <Select
                          value={values.flex}
                          onChange={set("flex")}
                          options={flexibility}
                          placeholder="Choose"
                          invalid={!!errors.flex}
                        />
                      </Field>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <StepTitle>Review your request</StepTitle>
                    <dl className="divide-y divide-slate-100 text-[13px]">
                      {summary.map(([label, value, s]) => (
                        <div
                          key={label}
                          className="flex items-baseline justify-between gap-3 py-2"
                        >
                          <dt className="text-slate-500">{label}</dt>
                          <dd className="flex items-baseline gap-3 text-right font-semibold text-ink">
                            {value}
                            <button
                              type="button"
                              onClick={() => goTo(s)}
                              className="text-[12px] font-semibold text-blue-700 underline underline-offset-2 hover:text-ink"
                            >
                              Edit
                            </button>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => goTo(step - 1)}
                      className={`${secondaryBtn} flex-1 sm:flex-none`}
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={step === 4 ? () => setSaved(true) : next}
                    className={`${primaryBtn} flex-1 sm:flex-none`}
                  >
                    {step === 4 ? "Save demo request" : nextLabel[step]}
                  </button>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal direction="left" delay={200} className="h-full">
          <aside className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white sm:flex-row lg:flex-col">
            <div className="relative aspect-[500/313] overflow-hidden sm:aspect-auto sm:min-h-[200px] sm:w-2/5 sm:shrink-0 lg:min-h-[200px] lg:w-auto lg:flex-1">
              <Image
                src={img("estimate-or-quote.webp")}
                alt="Raindrops on a car window with orange and blue light behind"
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 40vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="p-4 sm:p-5 lg:p-4">
              <h3 className="text-[15px] font-bold text-ink">
                Estimate or quote?
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                Not a carrier quote or guaranteed price. Shown only where
                approved data exists — none in this demo.
              </p>
              <span className="mt-3 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[12px] font-semibold text-emerald-700">
                Provider quotation
              </span>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                Review the issuer, scope, included fees and expiration.
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
                Final charges can depend on vehicle dimensions and condition,
                pickup and delivery access, service type, taxes, permitted
                accessorial charges and updated provider terms.
              </p>
            </div>
          </aside>
        </Reveal>
      </div>
    </>
  );
}

const primaryBtn =
  "btn-shine min-h-11 rounded-full bg-brand px-5 text-[14px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark";
const secondaryBtn =
  "min-h-11 rounded-full border border-slate-300 bg-white px-5 text-[14px] font-semibold text-ink transition-colors hover:border-ink";

const fieldCls = (invalid: boolean) =>
  `h-11 w-full rounded-xl border bg-white px-3 text-sm text-ink transition-colors placeholder:text-slate-400 focus:ring-2 focus:ring-brand/40 focus:outline-none ${
    invalid ? "border-red-500" : "border-slate-300 hover:border-ink"
  }`;

function StepTitle({ children }: { children: ReactNode }) {
  return <h3 className="mb-4 text-lg font-bold text-ink">{children}</h3>;
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold text-ink">{label}</span>
      <span className="mt-1.5 block">{children}</span>
      {error ? (
        <span className="mt-1 block text-[12px] text-red-600">{error}</span>
      ) : (
        hint && (
          <span className="mt-1 block text-[12px] text-slate-500">{hint}</span>
        )
      )}
    </label>
  );
}

function Input({
  value,
  onChange,
  invalid = false,
  ...rest
}: { value: string; onChange: (v: string) => void; invalid?: boolean } & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>) {
  return (
    <input
      {...rest}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={invalid}
      className={fieldCls(invalid)}
    />
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
  invalid = false,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  invalid?: boolean;
}) {
  return (
    <span className="relative flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid}
        className={`${fieldCls(invalid)} cursor-pointer appearance-none pr-9`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-500" />
    </span>
  );
}

function Choice({
  label,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="text-[13px] font-semibold text-ink">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={`min-h-11 rounded-full border px-4 text-[14px] transition-colors ${
              value === o
                ? "border-navy bg-navy font-semibold text-white"
                : "border-slate-300 bg-white text-ink hover:border-ink"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      {error && <p className="mt-1.5 text-[12px] text-red-600">{error}</p>}
    </fieldset>
  );
}

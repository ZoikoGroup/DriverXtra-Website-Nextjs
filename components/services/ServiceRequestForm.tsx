"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { CheckCircle2, ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionTitle";
import type { FormField } from "./types";

type Values = Record<string, string>;

const thisYear = new Date().getFullYear();

function validate(fields: FormField[], values: Values) {
  const errors: Record<string, string> = {};
  for (const f of fields) {
    const v = (values[f.key] ?? "").trim();
    const badYear =
      f.kind === "year" &&
      (!/^\d{4}$/.test(v) || Number(v) < 1900 || Number(v) > thisYear + 1);
    if (!v || badYear) errors[f.key] = f.error;
  }
  return errors;
}

type ServiceRequestFormProps = {
  title: string;
  fields: FormField[];
  image: string;
  imageAlt: string;
};

/** Demo request form with a "What happens next" card beside it — nothing is sent anywhere. */
export default function ServiceRequestForm({
  title,
  fields,
  image,
  imageAlt,
}: ServiceRequestFormProps) {
  const [values, setValues] = useState<Values>({});
  const [touched, setTouched] = useState(false);
  const [saved, setSaved] = useState(false);

  const errors = touched ? validate(fields, values) : {};
  const set = (key: string, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (Object.keys(validate(fields, values)).length === 0) setSaved(true);
  };

  const reset = () => {
    setValues({});
    setTouched(false);
    setSaved(false);
  };

  return (
    <>
      <Reveal>
        <div className="flex items-center gap-2">
          <Eyebrow>Eligibility &amp; qualification</Eyebrow>
          <span className="rounded border border-brand/60 bg-brand-light px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-gold">
            DEMO
          </span>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mt-3 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
          {title}
        </h2>
      </Reveal>

      {/* Both cards stretch to the same height on large screens. */}
      <div className="mt-5 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Reveal delay={150} className="h-full">
          <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            {saved ? (
              <div className="animate-fade-up" role="status">
                <p className="flex items-center gap-2 text-[15px] font-bold text-ink">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  Demo request saved
                </p>
                <dl className="mt-3 grid gap-x-6 gap-y-2 text-[13px] sm:grid-cols-2">
                  {fields.map((f) => (
                    <div key={f.key}>
                      <dt className="text-slate-500">{f.label}</dt>
                      <dd className="font-semibold text-ink">
                        {values[f.key]}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
                  Nothing has been sent — in a live service this would only go
                  to a verified provider after you agree.
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
              <form onSubmit={submit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {fields.map((f) => (
                    <Field
                      key={f.key}
                      label={f.label}
                      hint={f.hint}
                      error={errors[f.key]}
                    >
                      <Control
                        field={f}
                        value={values[f.key] ?? ""}
                        invalid={!!errors[f.key]}
                        onChange={(v) => set(f.key, v)}
                      />
                    </Field>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <button
                    type="submit"
                    className="btn-shine min-h-11 flex-1 rounded-full sm:flex-none bg-brand px-5 text-[14px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
                  >
                    Save demo request
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className={`${secondaryBtn} flex-1 sm:flex-none`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal direction="left" delay={200} className="h-full">
          {/* Tablets: image beside the text. Phones and desktop: image on top. */}
          <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white sm:flex-row lg:flex-col">
            <div className="relative aspect-[500/313] overflow-hidden sm:aspect-auto sm:min-h-[180px] sm:w-2/5 sm:shrink-0 lg:min-h-[200px] lg:w-auto lg:flex-1">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 40vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="p-4 sm:self-center sm:p-5 lg:self-auto lg:p-4">
              <h3 className="text-[14px] font-bold text-ink">
                What happens next
              </h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">
                In a live service, your details would only go to a named,
                verified provider after you agree. In this prototype nothing is
                sent.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}

const secondaryBtn =
  "min-h-11 rounded-full border border-slate-300 bg-white px-5 text-[14px] font-semibold text-ink transition-colors hover:border-ink";

const inputCls = (invalid: boolean) =>
  `h-11 w-full rounded-xl border bg-white px-3 text-sm text-ink transition-colors focus:ring-2 focus:ring-brand/40 focus:outline-none ${
    invalid ? "border-red-500" : "border-slate-300 hover:border-ink"
  }`;

function Control({
  field,
  value,
  invalid,
  onChange,
}: {
  field: FormField;
  value: string;
  invalid: boolean;
  onChange: (v: string) => void;
}) {
  if (field.kind === "select") {
    return (
      <span className="relative flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid}
          className={`${inputCls(invalid)} cursor-pointer appearance-none pr-9`}
        >
          <option value="">Choose</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-500" />
      </span>
    );
  }
  if (field.kind === "year") {
    return (
      <input
        inputMode="numeric"
        maxLength={4}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
        aria-invalid={invalid}
        className={inputCls(invalid)}
      />
    );
  }
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={invalid}
      className={inputCls(invalid)}
    />
  );
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

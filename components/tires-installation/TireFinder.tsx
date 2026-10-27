"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { Car, ChevronDown, CircleDot, Info } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { useRegion } from "@/lib/region";
import { exampleVehicles, rimSizes, tireProfiles, tireWidths } from "./data";

type Mode = "vehicle" | "size";
type Original = "" | "Yes" | "No" | "Not sure";

const modes = [
  {
    id: "vehicle",
    label: "By vehicle",
    text: "Year, make, model and variant",
    icon: Car,
  },
  {
    id: "size",
    label: "By tire size",
    text: "From your current tire sidewall",
    icon: CircleDot,
  },
] as const;

/** Demo tire finder — example vehicles only, nothing is sold or booked. */
export default function TireFinder() {
  const region = useRegion();
  const [mode, setMode] = useState<Mode>("vehicle");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [original, setOriginal] = useState<Original>("");
  const [size, setSize] = useState({ width: "", profile: "", rim: "" });
  const [touched, setTouched] = useState(false);
  const [result, setResult] = useState<{
    size: string;
    from: string;
    warn: boolean;
  } | null>(null);

  const models = make ? exampleVehicles[make] : [];

  const errors: Record<string, string> = {};
  if (touched && mode === "vehicle") {
    if (!make) errors.make = "Choose a make.";
    if (!model) errors.model = "Choose a model.";
    if (!original) errors.original = "Choose an answer.";
  }
  if (touched && mode === "size") {
    if (!size.width) errors.width = "Choose a width.";
    if (!size.profile) errors.profile = "Choose a profile.";
    if (!size.rim) errors.rim = "Choose a rim size.";
  }

  const switchMode = (m: Mode) => {
    setMode(m);
    setTouched(false);
    setResult(null);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (mode === "vehicle") {
      const match = models.find((m) => m.model === model);
      if (!match || !original) return setResult(null);
      setResult({
        size: match.size,
        from: `${make} ${match.model}`,
        warn: original !== "Yes",
      });
    } else {
      if (!size.width || !size.profile || !size.rim) return setResult(null);
      setResult({
        size: `${size.width}/${size.profile} R${size.rim}`,
        from: "your tire sidewall",
        warn: false,
      });
    }
  };

  return (
    <>
      <Reveal delay={150}>
        <div
          role="tablist"
          aria-label="Search by"
          className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:max-w-[880px]"
        >
          {modes.map(({ id, label, text, icon: Icon }) => {
            const active = mode === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => switchMode(id)}
                className={`group flex min-h-20 flex-col items-start gap-1 rounded-2xl border p-3.5 text-left transition-all duration-300 ${
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-slate-200 bg-white text-ink hover:-translate-y-0.5 hover:border-brand/60"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${active ? "text-brand" : "text-brand-dark"}`}
                />
                <span className="text-[15px] font-bold">{label}</span>
                <span
                  className={`text-[12px] ${active ? "text-slate-300" : "text-slate-500"}`}
                >
                  {text}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={200}>
        <form
          onSubmit={submit}
          noValidate
          className="mt-3.5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:max-w-[880px]"
        >
          {mode === "vehicle" ? (
            <div key="vehicle" className="animate-fade-up">
              <p className="text-[12px] font-bold text-ink">
                Tell us about your vehicle
              </p>
              <div className="mt-2 grid gap-4 sm:grid-cols-2">
                <Field label="Make" error={errors.make}>
                  <Select
                    value={make}
                    onChange={(v) => {
                      setMake(v);
                      setModel("");
                    }}
                    placeholder="Choose"
                    options={Object.keys(exampleVehicles)}
                    invalid={!!errors.make}
                  />
                </Field>
                <Field label="Model, year and variant" error={errors.model}>
                  <Select
                    value={model}
                    onChange={setModel}
                    placeholder={make ? "Choose" : "Choose make first"}
                    options={models.map((m) => m.model)}
                    disabled={!make}
                    invalid={!!errors.model}
                  />
                </Field>
              </div>
              <p className="mt-2 text-[12px] text-slate-500">
                No VIN needed. Example vehicles only.
              </p>

              <fieldset className="mt-5 rounded-xl border border-slate-200 p-4">
                <legend className="px-1 text-[15px] font-bold text-ink">
                  Are these the original wheel sizes?
                </legend>
                <div className="flex flex-wrap gap-2">
                  {(["Yes", "No", "Not sure"] as const).map((o) => (
                    <button
                      key={o}
                      type="button"
                      aria-pressed={original === o}
                      onClick={() => setOriginal(o)}
                      className={`min-h-11 rounded-full border px-4 text-[14px] transition-colors ${
                        original === o
                          ? "border-navy bg-navy font-semibold text-white"
                          : "border-slate-300 bg-white text-ink hover:border-ink"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
                {errors.original && (
                  <p className="mt-2 text-[12px] text-red-600">
                    {errors.original}
                  </p>
                )}
              </fieldset>
            </div>
          ) : (
            <div key="size" className="animate-fade-up">
              <p className="text-[12px] font-bold text-ink">
                Read the size from your current tire sidewall
              </p>
              <div className="mt-2 grid gap-4 sm:grid-cols-3">
                <Field label="Width" error={errors.width}>
                  <Select
                    value={size.width}
                    onChange={(v) => setSize((s) => ({ ...s, width: v }))}
                    placeholder="e.g. 225"
                    options={tireWidths}
                    invalid={!!errors.width}
                  />
                </Field>
                <Field label="Profile" error={errors.profile}>
                  <Select
                    value={size.profile}
                    onChange={(v) => setSize((s) => ({ ...s, profile: v }))}
                    placeholder="e.g. 45"
                    options={tireProfiles}
                    invalid={!!errors.profile}
                  />
                </Field>
                <Field label="Rim (inches)" error={errors.rim}>
                  <Select
                    value={size.rim}
                    onChange={(v) => setSize((s) => ({ ...s, rim: v }))}
                    placeholder="e.g. 17"
                    options={rimSizes}
                    invalid={!!errors.rim}
                  />
                </Field>
              </div>
              <p className="mt-2 text-[12px] text-slate-500">
                You&apos;ll find it on the sidewall, e.g. 225/45 R17.
              </p>
            </div>
          )}

          <button
            type="submit"
            className="btn-shine mt-5 min-h-11 w-full rounded-full bg-brand px-5 text-[14px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark sm:w-auto"
          >
            Find tires
          </button>

          <div aria-live="polite">
            {result && (
              <div className="mt-5 animate-fade-up rounded-xl bg-slate-50 p-4">
                <p className="text-[12px] text-slate-500">
                  Example size from {result.from}
                </p>
                <p className="mt-0.5 text-2xl font-extrabold tracking-tight text-ink">
                  {result.size}
                </p>
                {result.warn && (
                  <p className="mt-2 flex gap-2 text-[13px] leading-relaxed text-amber-800">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      Your wheels may not be the originals, so this size may not
                      fit. Read the size from your current tire sidewall
                      instead.{" "}
                      <button
                        type="button"
                        onClick={() => switchMode("size")}
                        className="font-semibold underline underline-offset-2 hover:text-ink"
                      >
                        Search by tire size
                      </button>
                    </span>
                  </p>
                )}
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  No verified tire sellers or installers are connected for{" "}
                  {region} yet, so no products or prices are shown. Check the
                  size against your sidewall and vehicle placard before buying.
                </p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[13px] font-semibold">
                  <Link
                    href="/tires-and-wheels"
                    className="text-blue-700 underline underline-offset-2 hover:text-ink"
                  >
                    Browse Tires &amp; Wheels
                  </Link>
                  <a
                    href="#installers"
                    className="text-blue-700 underline underline-offset-2 hover:text-ink"
                  >
                    See installers
                  </a>
                </div>
              </div>
            )}
          </div>
        </form>
      </Reveal>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold text-ink">{label}</span>
      <span className="mt-1.5 block">{children}</span>
      {error && (
        <span className="mt-1 block text-[12px] text-red-600">{error}</span>
      )}
    </label>
  );
}

function Select({
  value,
  onChange,
  placeholder,
  options,
  disabled = false,
  invalid = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
  disabled?: boolean;
  invalid?: boolean;
}) {
  return (
    <span className="relative flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-invalid={invalid}
        className={`h-11 w-full cursor-pointer appearance-none rounded-xl border bg-white pr-9 pl-3 text-sm text-ink transition-colors focus:ring-2 focus:ring-brand/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 ${
          invalid ? "border-red-500" : "border-slate-300 hover:border-ink"
        }`}
      >
        <option value="">{placeholder}</option>
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

"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock, ShieldCheck } from "lucide-react";

export const inputClass = (error?: string) =>
  `h-11 w-full rounded-lg border bg-white px-3 text-sm text-ink transition-all duration-200 placeholder:text-slate-400 focus:ring-2 focus:outline-none ${
    error ? "border-red-400 focus:ring-red-200" : "border-slate-300 hover:border-slate-400 focus:border-brand-dark focus:ring-brand/30"
  }`;


export function StepTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-bold text-ink sm:text-xl">{children}</h3>;
}

export function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <label className="mt-4 block">
      <span className="text-[13px] font-bold text-ink">{label}</span>
      <span className="mt-1.5 block">{children}</span>
      {error ? (
        <span className="mt-1 block animate-fade-up text-xs font-medium text-red-600">{error}</span>
      ) : (
        hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>
      )}
    </label>
  );
}

export function OptionGroup({
  title,
  name,
  options,
  value,
  onChange,
  error,
}: {
  title: string;
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <fieldset
      className={`rounded-xl border p-4 transition-colors duration-300 ${error ? "border-red-300 bg-red-50/30" : "border-slate-200"}`}
    >
      <legend className="sr-only">{title}</legend>
      <p className="text-[13px] font-bold text-ink">{title}</p>
      <div className="mt-2 space-y-0.5">
        {options.map((o) => (
          <label
            key={o}
            className="group -mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
          >
            <input
              type="radio"
              name={name}
              checked={value === o}
              onChange={() => onChange(o)}
              className="h-4 w-4 accent-ink transition-transform group-hover:scale-110"
            />
            <span className={value === o ? "font-semibold text-ink" : ""}>{o}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 animate-fade-up text-xs font-medium text-red-600">{error}</p>}
    </fieldset>
  );
}

export function CheckRow({
  label,
  note,
  checked,
  onChange,
  disabled,
  error,
}: {
  label: string;
  note?: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  error?: boolean;
}) {
  return (
    <label
      className={`group -mx-2 flex items-start gap-3 rounded-lg px-2 py-2 text-sm transition-colors ${
        disabled ? "cursor-default" : "cursor-pointer hover:bg-slate-50"
      } ${error ? "bg-red-50 ring-1 ring-red-200" : ""}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-ink transition-transform group-hover:scale-110"
      />
      <span className={checked ? "text-ink" : "text-slate-700"}>
        {label}
        {note && <span className="block text-xs text-slate-400">{note}</span>}
      </span>
    </label>
  );
}

export function PrimaryButton({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="btn-shine inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(232,172,0,0.7)] disabled:pointer-events-none disabled:opacity-70"
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, href }: { children: ReactNode; onClick?: () => void; href?: string }) {
  const className =
    "inline-flex h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-md";
  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-ink"
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
      Back
    </button>
  );
}

export function StepNav({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
      <BackButton onClick={onBack} />
      <PrimaryButton onClick={onNext}>
        Continue <ArrowRight className="h-4 w-4" />
      </PrimaryButton>
    </div>
  );
}

export function TimelineItem({ state, title, text, last }: { state: "done" | "current" | "next"; title: string; text: string; last?: boolean }) {
  const Icon = state === "done" ? Check : state === "current" ? Clock : ShieldCheck;
  return (
    <li className="relative flex gap-3 pb-5 last:pb-0">
      {!last && <span className="absolute top-8 bottom-0 left-[15px] w-px bg-slate-200" />}
      <span
        className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full ${
          state === "done"
            ? "bg-emerald-500 text-white"
            : state === "current"
              ? "bg-brand text-ink"
              : "border border-dashed border-slate-300 text-slate-400"
        }`}
      >
        {state === "current" && <span className="absolute inset-0 animate-ping rounded-full bg-brand/40" />}
        <Icon className="relative h-4 w-4" />
      </span>
      <div>
        <p className="text-sm font-bold text-ink">{title}</p>
        <p className="text-xs text-slate-500">{text}</p>
      </div>
    </li>
  );
}

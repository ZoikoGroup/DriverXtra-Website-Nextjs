"use client";

import { Check, CircleAlert } from "lucide-react";

type Step<Id extends number> = { id: Id; title: string };

type StepperProps<Id extends number> = {
  steps: readonly Step<Id>[];
  step: Id;
  isDone: (id: Id) => boolean;
  canOpen: (id: Id) => boolean;
  onSelect: (id: Id) => void;
};

/** Numbered step pills with a progress bar. Pills wrap onto a second row when there are many. */
export default function Stepper<Id extends number>({ steps, step, isDone, canOpen, onSelect }: StepperProps<Id>) {
  const index = steps.findIndex((s) => s.id === step);
  return (
    <div className="mt-8">
      <ol className="flex flex-wrap gap-2">
        {steps.map((s) => {
          const active = s.id === step;
          const done = isDone(s.id);
          const enabled = canOpen(s.id);
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => enabled && onSelect(s.id)}
                disabled={!enabled}
                aria-current={active ? "step" : undefined}
                className={`flex items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 text-xs font-semibold transition-all duration-300 ${
                  active
                    ? "border-ink bg-ink text-white shadow-lg"
                    : enabled
                      ? "border-slate-200 bg-white text-ink hover:-translate-y-0.5 hover:border-ink"
                      : "cursor-not-allowed border-slate-200 bg-white text-slate-400"
                }`}
              >
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold transition-colors duration-300 ${
                    active ? "bg-brand text-ink" : done ? "bg-emerald-500 text-white" : "bg-slate-100"
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : s.id}
                </span>
                {s.title}
              </button>
            </li>
          );
        })}
      </ol>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-brand transition-all duration-700 ease-out"
          style={{ width: `${(index / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

/** Shakes in whenever a step is submitted with missing fields. */
export function ErrorBanner({ errors, attempt }: { errors: string[]; attempt: number }) {
  if (!errors.length) return null;
  return (
    <div
      key={attempt}
      role="alert"
      className="mb-5 flex animate-shake items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{errors.length === 1 ? errors[0] : `Please complete ${errors.length} required fields.`}</span>
    </div>
  );
}

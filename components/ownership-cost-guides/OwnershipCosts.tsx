"use client";

import { useState } from "react";
import { Lock, Minus, Plus } from "lucide-react";

const OWN_OPTIONS = ["Buy outright", "Finance", "Lease"] as const;
const ENERGY_OPTIONS = ["Fuel", "Electric"] as const;
const BASIS_OPTIONS = ["Economic cost", "Cash flow"] as const;

const STATS = [
  { label: "Illustrative per year", value: "£5,149" },
  { label: "Illustrative monthly average", value: "£429" },
  { label: "Per mile", value: "£0.64" },
] as const;

const BARS = [
  {
    label: "Vehicle price + fees",
    value: "£18,250",
    width: 100,
    kind: "solid",
  },
  {
    label: "Estimated value at end",
    value: "−£8,100",
    width: 44,
    kind: "striped",
  },
  { label: "Fuel", value: "£4,687", width: 26, kind: "solid" },
  { label: "Insurance", value: "£2,600", width: 14, kind: "solid" },
  { label: "Road tax & registration", value: "£760", width: 4, kind: "solid" },
  { label: "Maintenance", value: "£1,800", width: 10, kind: "solid" },
  { label: "Tires", value: "£600", width: 3, kind: "solid" },
] as const;

const ROWS = [
  {
    cost: "Vehicle price + fees",
    amount: "£18,250",
    basis: "Your price assumption",
  },
  {
    cost: "Estimated value at end",
    amount: "−£8,100",
    basis: "Scenario (45% retained)",
  },
  { cost: "Fuel", amount: "£4,687", basis: "Illustrative assumption" },
  { cost: "Insurance", amount: "£2,600", basis: "Illustrative assumption" },
  {
    cost: "Road tax & registration",
    amount: "£760",
    basis: "Illustrative assumption",
  },
  { cost: "Maintenance", amount: "£1,800", basis: "Illustrative assumption" },
  { cost: "Tires", amount: "£600", basis: "Illustrative assumption" },
  {
    cost: "Other (parking, tolls)",
    amount: "£0",
    basis: "Optional — you chose to include",
  },
] as const;

const VEHICLE_FIELDS = [
  {
    id: "price",
    label: "Vehicle price",
    prefix: "£",
    suffix: "",
    value: "18000",
  },
  {
    id: "fees",
    label: "Upfront fees & taxes",
    prefix: "£",
    suffix: "",
    value: "250",
  },
  {
    id: "period",
    label: "Ownership period",
    prefix: "",
    suffix: "months",
    value: "48",
  },
  {
    id: "distance",
    label: "Distance per year",
    prefix: "",
    suffix: "miles",
    value: "8000",
  },
] as const;

const ENERGY_FIELDS = [
  {
    id: "economy",
    label: "Fuel economy",
    prefix: "",
    suffix: "mpg",
    value: "45",
  },
  {
    id: "fuel-price",
    label: "Fuel price",
    prefix: "£",
    suffix: "per litre",
    value: "1.45",
  },
] as const;

type Field = {
  readonly id: string;
  readonly label: string;
  readonly prefix: string;
  readonly suffix: string;
  readonly value: string;
};

function Pills<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#14233a]">{label}</p>
      <div role="group" aria-label={label} className="mt-2 flex gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={
              value === option
                ? "rounded-full bg-[#0f1b2d] px-4 py-2 text-sm font-semibold text-white"
                : "rounded-full border border-[#d9dde3] bg-white px-4 py-2 text-sm font-semibold text-[#14233a]"
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function NumberField({ field }: { field: Field }) {
  return (
    <div>
      <label
        htmlFor={field.id}
        className="block text-sm font-semibold text-[#14233a]"
      >
        {field.label}
      </label>
      <div className="mt-1.5 flex h-11 items-center gap-2 rounded-lg border border-[#d9dde3] bg-white px-3">
        {field.prefix && (
          <span className="text-sm text-[#5b6673]">{field.prefix}</span>
        )}
        <input
          id={field.id}
          name={field.id}
          defaultValue={field.value}
          inputMode="decimal"
          className="min-w-0 flex-1 bg-transparent text-sm text-[#14233a] outline-none"
        />
        {field.suffix && (
          <span className="text-sm text-[#5b6673]">{field.suffix}</span>
        )}
      </div>
    </div>
  );
}

function Panel({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  const Icon = open ? Minus : Plus;
  return (
    <div
      className={
        open
          ? "rounded-lg border-2 border-[#0f1b2d] bg-white"
          : "rounded-lg border border-[#d9dde3] bg-white"
      }
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-bold text-[#14233a]"
      >
        {title}
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#14233a]">
          <Icon className="h-3 w-3" aria-hidden="true" />
        </span>
      </button>
      {open && children && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

export default function OwnershipCosts() {
  const [own, setOwn] = useState<(typeof OWN_OPTIONS)[number]>("Buy outright");
  const [energy, setEnergy] = useState<(typeof ENERGY_OPTIONS)[number]>("Fuel");
  const [basis, setBasis] =
    useState<(typeof BASIS_OPTIONS)[number]>("Economic cost");
  const [open, setOpen] = useState({
    vehicle: true,
    energy: true,
    running: false,
    value: false,
  });

  const toggle = (key: keyof typeof open) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <section className="w-full overflow-x-hidden bg-[#f5f7fb] px-6 py-10 text-[#14233a] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <p className="flex items-center gap-2 text-sm text-[#5b6673]">
          <span aria-hidden="true" className="h-0.5 w-4 bg-[#e0a526]" />
          Illustrative estimate
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Explore ownership costs
        </h2>
        <p className="mt-3 max-w-[440px] text-base leading-7 text-[#5b6673]">
          Every input starts as a labeled illustrative assumption. Replace any
          of them with your own numbers.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
          <Pills
            label="How you’ll own it"
            options={OWN_OPTIONS}
            value={own}
            onChange={setOwn}
          />
          <Pills
            label="Energy"
            options={ENERGY_OPTIONS}
            value={energy}
            onChange={setEnergy}
          />
          <Pills
            label="Cost basis"
            options={BASIS_OPTIONS}
            value={basis}
            onChange={setBasis}
          />
        </div>

        <p className="mt-5 text-sm text-[#5b6673]">
          Economic cost estimates value change plus financing costs and ongoing
          use. It is not the same as cash paid.
        </p>

        <div className="mt-5 grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Inputs */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-[#c9dcf7] bg-[#e6f0fd] px-4 py-3 text-sm leading-5">
              <Lock
                className="mt-0.5 h-4 w-4 shrink-0 text-[#3b5bdb]"
                aria-hidden="true"
              />
              Do not enter bank credentials, full account numbers or other
              sensitive personal information.
            </div>

            <Panel
              title="Vehicle and period"
              open={open.vehicle}
              onToggle={() => toggle("vehicle")}
            >
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                {VEHICLE_FIELDS.map((field) => (
                  <NumberField key={field.id} field={field} />
                ))}
              </div>
            </Panel>

            <Panel
              title="Energy"
              open={open.energy}
              onToggle={() => toggle("energy")}
            >
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                {ENERGY_FIELDS.map((field) => (
                  <NumberField key={field.id} field={field} />
                ))}
              </div>
            </Panel>

            <Panel
              title="Running costs (per year)"
              open={open.running}
              onToggle={() => toggle("running")}
            />
            <Panel
              title="Value at the end"
              open={open.value}
              onToggle={() => toggle("value")}
            />

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                className="rounded-full border border-[#d9dde3] bg-white px-4 py-2 text-sm font-semibold"
              >
                Reset to illustrative assumptions
              </button>
              <button
                type="button"
                className="rounded-full border border-[#d9dde3] bg-white px-4 py-2 text-sm font-semibold"
              >
                Save as Scenario A for comparison
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="rounded-2xl border border-[#e3e6eb] bg-white p-6 shadow-sm">
            <p className="text-sm text-[#5b6673]">
              Economic cost · 48 months · GBP
            </p>
            <p className="mt-2 text-5xl font-bold tracking-tight">£20,597</p>
            <p className="mt-3 border-t border-[#eef0f4] pt-3 text-sm text-[#5b6673]">
              Scenario range: £19,157 – £22,037, mainly from uncertain value at
              the end
            </p>

            <dl className="mt-4 grid gap-3 sm:grid-cols-3">
              {STATS.map((stat) => (
                <div key={stat.label} className="rounded-lg bg-[#f2f4f8] p-3">
                  <dt className="text-sm text-[#5b6673]">{stat.label}</dt>
                  <dd className="mt-1 text-lg font-bold">{stat.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-3 text-sm text-[#5b6673]">
              The monthly average isn’t a provider payment.
            </p>

            <ul className="mt-3 space-y-2">
              {BARS.map((bar) => (
                <li
                  key={bar.label}
                  className="grid grid-cols-[150px_1fr_70px] items-center gap-3 text-sm"
                >
                  <span>{bar.label}</span>
                  <span className="block h-3">
                    <span
                      style={{ width: `${bar.width}%` }}
                      className={
                        bar.kind === "striped"
                          ? "block h-full rounded-full bg-[repeating-linear-gradient(135deg,#1f8a4c_0_4px,#8fd1a8_4px_8px)]"
                          : "block h-full rounded-full bg-[#0f1b2d]"
                      }
                    />
                  </span>
                  <span className="text-right font-semibold">{bar.value}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-sm font-bold">Cost breakdown</h3>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e3e6eb] text-[#5b6673]">
                    <th className="py-2 pr-3 font-semibold">Cost</th>
                    <th className="py-2 pr-3 font-semibold">Amount</th>
                    <th className="py-2 font-semibold">Basis</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.cost} className="border-b border-[#eef0f4]">
                      <td className="py-3 pr-3">{row.cost}</td>
                      <td className="py-3 pr-3">{row.amount}</td>
                      <td className="py-3 text-[#5b6673]">{row.basis}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-[#14233a] font-bold">
                    <td className="py-3 pr-3">Total</td>
                    <td className="py-3 pr-3">£20,597</td>
                    <td className="py-3">Economic cost</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="mt-3 rounded-full border border-[#d9dde3] bg-white px-4 py-2 text-sm font-semibold"
            >
              Print summary
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

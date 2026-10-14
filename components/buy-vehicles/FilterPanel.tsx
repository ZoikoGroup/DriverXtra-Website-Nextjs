"use client";

import type { ReactNode } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import {
  bodyTypes,
  makes,
  mileageOptions,
  powertrainFilterLabel,
  powertrains,
  sellerTypes,
  yearOptions,
  type Filters,
} from "./data";

type FilterPanelProps = {
  draft: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onApply: () => void;
  onClear: () => void;
  moreOpen: boolean;
  onToggleMore: () => void;
  /** Shows a close button (used in the mobile drawer). */
  onClose?: () => void;
  dirty: boolean;
  className?: string;
};

const toggle = <T,>(list: T[], value: T) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-slate-200 px-4 py-4">
      <h3 className="mb-2.5 text-[13px] font-bold text-ink">{title}</h3>
      {children}
    </div>
  );
}

function Option({
  type,
  checked,
  onChange,
  label,
  note,
  name,
}: {
  type: "radio" | "checkbox";
  checked: boolean;
  onChange: () => void;
  label: string;
  note?: string;
  name?: string;
}) {
  return (
    <label className="group -mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-slate-50">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className={`h-4 w-4 shrink-0 cursor-pointer accent-ink transition-transform duration-200 group-hover:scale-110 ${
          type === "checkbox" ? "rounded" : ""
        }`}
      />
      <span className={`flex-1 text-sm transition-colors ${checked ? "font-medium text-ink" : "text-slate-700"}`}>{label}</span>
      {note && <span className="max-w-[110px] text-right text-[11px] leading-tight text-slate-400">{note}</span>}
    </label>
  );
}

const selectClass =
  "h-10 w-full cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white pr-9 pl-3 text-sm text-ink transition-all duration-200 hover:border-slate-400 focus:border-brand-dark focus:ring-2 focus:ring-brand/30 focus:outline-none";

function Select({ value, onChange, children, label }: { value: string; onChange: (v: string) => void; children: ReactNode; label: string }) {
  return (
    <div className="relative">
      <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} className={selectClass}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </div>
  );
}

export default function FilterPanel({
  draft,
  onChange,
  onApply,
  onClear,
  moreOpen,
  onToggleMore,
  onClose,
  dirty,
  className = "",
}: FilterPanelProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onApply();
      }}
      className={`flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-3.5">
        <h2 className="text-base font-bold text-ink">Filters</h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-semibold text-blue-700 underline underline-offset-2 transition-colors hover:text-ink"
          >
            Clear all
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="grid h-8 w-8 place-items-center rounded-full transition-all duration-300 hover:rotate-90 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <Section title="Condition">
          <Option type="radio" name="condition" label="Any condition" checked={draft.condition === "any"} onChange={() => onChange({ condition: "any" })} />
          <Option type="radio" name="condition" label="New" checked={draft.condition === "new"} onChange={() => onChange({ condition: "new" })} />
          <Option
            type="radio"
            name="condition"
            label="Used"
            note="(includes certified used)"
            checked={draft.condition === "used"}
            onChange={() => onChange({ condition: "used" })}
          />
          <Option
            type="checkbox"
            label="Certified only"
            note="(documented certification)"
            checked={draft.certifiedOnly}
            onChange={() => onChange({ certifiedOnly: !draft.certifiedOnly })}
          />
        </Section>

        <Section title="Make">
          <Select label="Make" value={draft.make} onChange={(make) => onChange({ make })}>
            <option value="">Any make</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
        </Section>

        <Section title="Body type">
          {bodyTypes.map((b) => (
            <Option
              key={b}
              type="checkbox"
              label={b}
              checked={draft.bodies.includes(b)}
              onChange={() => onChange({ bodies: toggle(draft.bodies, b) })}
            />
          ))}
        </Section>

        <Section title="Price">
          <div className="grid grid-cols-2 gap-2">
            {(["priceMin", "priceMax"] as const).map((key) => (
              <input
                key={key}
                type="number"
                inputMode="numeric"
                min={0}
                placeholder={key === "priceMin" ? "Min" : "Max"}
                aria-label={key === "priceMin" ? "Minimum price" : "Maximum price"}
                value={draft[key]}
                onChange={(e) => onChange({ [key]: e.target.value })}
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-ink transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-brand-dark focus:ring-2 focus:ring-brand/30 focus:outline-none"
              />
            ))}
          </div>
        </Section>

        <Section title="Powertrain">
          {powertrains.map((p) => (
            <Option
              key={p}
              type="checkbox"
              label={powertrainFilterLabel[p]}
              checked={draft.powertrains.includes(p)}
              onChange={() => onChange({ powertrains: toggle(draft.powertrains, p) })}
            />
          ))}
        </Section>

        {/* More filters */}
        <div className="border-t border-slate-200">
          <button
            type="button"
            onClick={onToggleMore}
            aria-expanded={moreOpen}
            className="flex w-full items-center justify-between bg-slate-50 px-4 py-3.5 text-[13px] font-bold text-ink transition-colors hover:bg-slate-100"
          >
            More filters
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`} />
          </button>
          <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${moreOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden">
              <div className={`transition-all duration-500 ${moreOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}>
                <Section title="Seller type">
                  {sellerTypes.map((s) => (
                    <Option
                      key={s}
                      type="checkbox"
                      label={s}
                      checked={draft.sellers.includes(s)}
                      onChange={() => onChange({ sellers: toggle(draft.sellers, s) })}
                    />
                  ))}
                </Section>
                <Section title="Mileage">
                  <Select label="Maximum mileage" value={draft.maxMileage} onChange={(maxMileage) => onChange({ maxMileage })}>
                    <option value="">Any mileage</option>
                    {mileageOptions.map((m) => (
                      <option key={m} value={m}>
                        Up to {m.toLocaleString("en-US")} mi
                      </option>
                    ))}
                  </Select>
                </Section>
                <Section title="Year">
                  <Select label="Year from" value={draft.yearFrom} onChange={(yearFrom) => onChange({ yearFrom })}>
                    <option value="">Any year</option>
                    {yearOptions.map((y) => (
                      <option key={y} value={y}>
                        {y} or newer
                      </option>
                    ))}
                  </Select>
                </Section>
                <Section title="Trust">
                  <Option
                    type="checkbox"
                    label="Verified sellers only"
                    note="(L3 and above)"
                    checked={draft.verifiedOnly}
                    onChange={() => onChange({ verifiedOnly: !draft.verifiedOnly })}
                  />
                  <Option
                    type="checkbox"
                    label="History report available"
                    checked={draft.historyOnly}
                    onChange={() => onChange({ historyOnly: !draft.historyOnly })}
                  />
                </Section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 p-4">
        <button
          type="submit"
          className={`btn-shine flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(232,172,0,0.7)] ${
            dirty ? "shadow-[0_0_0_4px_rgba(255,194,14,0.3)]" : ""
          }`}
        >
          <Search className="h-4 w-4" />
          Search Vehicles
        </button>
      </div>
    </form>
  );
}

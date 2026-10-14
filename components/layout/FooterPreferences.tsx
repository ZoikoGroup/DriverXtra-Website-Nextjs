"use client";

import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { regions, setRegion, useRegion, type RegionName } from "@/lib/region";

const countries = regions.map((r) => r.name);
const languages = ["English (UK)", "English (US)", "Deutsch", "Français", "Español", "हिन्दी"];
const currencies = ["USD ($)", "GBP (£)", "EUR (€)", "CAD ($)", "INR (₹)", "AUD ($)", "AED (د.إ)"];

export default function FooterPreferences() {
  const country = useRegion();
  const [language, setLanguage] = useState(languages[0]);
  const [currency, setCurrency] = useState(currencies[0]);

  return (
    <div className="w-full max-w-xl">
      <p className="flex items-center gap-2 text-sm text-slate-300">
        <Globe className="h-4 w-4 text-brand" />
        Viewing DriverXtra for <span className="font-semibold text-white">{country}</span>
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <PreferenceSelect label="Country / Region" value={country} options={countries} onChange={(v) => setRegion(v as RegionName)} />
        <PreferenceSelect label="Language" value={language} options={languages} onChange={setLanguage} />
        <PreferenceSelect label="Currency" value={currency} options={currencies} onChange={setCurrency} />
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Currency is a display preference and doesn&apos;t change which payment methods are available.
      </p>
    </div>
  );
}

type PreferenceSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function PreferenceSelect({ label, value, options, onChange }: PreferenceSelectProps) {
  return (
    <label className="block">
      <span className="text-xs text-slate-400">{label}</span>
      <span className="group relative mt-1.5 block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-navy-800 pr-9 pl-3 text-sm text-white transition-all duration-300 hover:border-white/30 focus:border-brand focus:ring-2 focus:ring-brand/30 focus:outline-none"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400 transition-transform duration-300 group-hover:translate-y-[-30%] group-hover:text-brand" />
      </span>
    </label>
  );
}

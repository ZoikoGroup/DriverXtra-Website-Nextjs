"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const tabs = [
  { id: "buy", label: "Buy", placeholder: "Make, model or keyword" },
  { id: "sell", label: "Sell", placeholder: "Enter your registration or VIN" },
  { id: "parts", label: "Parts", placeholder: "Part name, number or VIN" },
  { id: "services", label: "Services", placeholder: "Inspection, repair, transport…" },
];

export default function HeroSearch() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div className="mt-8 max-w-xl">
      <div className="inline-flex rounded-full bg-white/10 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
              active === tab.id ? "bg-brand text-ink shadow" : "text-slate-300 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-3 flex items-center gap-2 rounded-2xl bg-white p-2 shadow-2xl ring-4 ring-transparent transition-all duration-300 focus-within:ring-brand/40"
      >
        <Search className="ml-3 h-5 w-5 shrink-0 text-slate-400" />
        <input
          key={current.id}
          type="search"
          placeholder={current.placeholder}
          className="h-11 w-full bg-transparent text-sm text-ink placeholder:text-slate-500 focus:outline-none sm:text-base"
        />
        <button
          type="submit"
          className="btn-shine h-11 shrink-0 rounded-xl bg-brand px-5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-brand-dark hover:shadow-lg sm:px-7"
        >
          Search
        </button>
      </form>
    </div>
  );
}

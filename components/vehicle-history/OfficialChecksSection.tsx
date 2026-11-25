"use client";

import { useId, useState } from "react";
import { ExternalLink } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { regions, type RegionName } from "@/lib/region";
import { officialChecks } from "./data";

export default function OfficialChecksSection() {
  const ids = useId();
  const [market, setMarket] = useState<RegionName | "">("");
  const services = market ? officialChecks[market] : [];

  return (
    <section id="official-checks" className="scroll-mt-28 bg-slate-50 py-16 md:py-20">
      <div className={container}>
        <SectionTitle eyebrow="Official checks" title="Official checks by market" />

        <Reveal delay={100} className="mt-6 max-w-sm">
          <label htmlFor={`${ids}-market`} className="text-xs font-bold text-ink">
            Where are you checking a vehicle?
          </label>
          <select
            id={`${ids}-market`}
            value={market}
            onChange={(e) => setMarket(e.target.value as RegionName | "")}
            aria-describedby={`${ids}-market-hint`}
            className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-ink focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
          >
            <option value="">Choose a market</option>
            {regions.map((r) => (
              <option key={r.code} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
          <p id={`${ids}-market-hint`} className="mt-1.5 text-[11px] text-slate-500">
            Available records and check services differ by country and vehicle.
          </p>
        </Reveal>

        <div aria-live="polite" className="mt-6">
          {!market ? (
            <p className="text-xs text-slate-500">Choose a market to see official check services.</p>
          ) : (
            <>
              <ul className="grid gap-4 md:grid-cols-3">
                {services.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_16px_32px_-20px_rgba(15,23,42,0.35)]"
                    >
                      <span className="flex items-start justify-between gap-3 text-sm font-bold text-ink group-hover:text-gold">
                        {s.name}
                        <ExternalLink aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      </span>
                      <span className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{s.text}</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] text-slate-500">
                Official services are run by third parties. DriverXtra isn&apos;t affiliated with them and doesn&apos;t
                receive your search.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

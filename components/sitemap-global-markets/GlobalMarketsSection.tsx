"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "@/components/press-media/PressHeading";
import { setRegion, useRegion } from "@/lib/region";
import { marketStatuses, markets, type Market, type MarketStatus } from "./data";

function StatusLabel({ status }: { status: MarketStatus }) {
  const s = marketStatuses[status];
  return (
    <span className={`flex items-center gap-1.5 text-sm ${s.text}`}>
      <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function MarketDetails({ market }: { market: Market }) {
  const region = useRegion();
  const isCurrent = market.region === region;
  const s = marketStatuses[market.status];

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-ink">{market.name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {market.code} · {market.currency}
          </p>
        </div>
        <StatusLabel status={market.status} />
      </div>

      <dl className="mt-5 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[120px_1fr]">
        <dt className="font-bold text-ink">Status</dt>
        <dd className="text-slate-600">{s.description}</dd>
        <dt className="font-bold text-ink">Currency</dt>
        <dd className="text-slate-600">Prices shown in {market.currency} where a provider supports it</dd>
        <dt className="font-bold text-ink">Language</dt>
        <dd className="text-slate-600">English</dd>
      </dl>

      <div className="mt-6" aria-live="polite">
        {market.region ? (
          isCurrent ? (
            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <Check aria-hidden className="h-4 w-4" />
              You&apos;re browsing as {market.name}.
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setRegion(market.region!)}
              className="inline-flex h-10 items-center rounded-full bg-brand px-5 text-sm font-bold text-ink transition-colors hover:bg-brand-dark"
            >
              Browse as {market.name}
            </button>
          )
        ) : (
          <p className="text-sm text-slate-600">This market can&apos;t be set as your browsing context yet.</p>
        )}
      </div>
    </div>
  );
}

export default function GlobalMarketsSection() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const results = q
    ? markets.filter((m) => `${m.name} ${m.code} ${m.currency}`.toLowerCase().includes(q))
    : markets;
  const market = markets.find((m) => m.name === selected);

  return (
    <section id="global-markets" className="scroll-mt-28 bg-[#F6F8FB] py-16 md:py-24">
      <div className={container}>
        <PressHeading
          eyebrow="Global markets"
          title="Explore global markets"
          description="Choose a market to view its available options. Being listed here doesn't mean DriverXtra operates there."
        />

        <Reveal as="dl" delay={100} className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {(Object.keys(marketStatuses) as MarketStatus[]).map((k) => (
            <div key={k}>
              <dt>
                <StatusLabel status={k} />
              </dt>
              <dd className="mt-1 text-[13px] text-slate-500">{marketStatuses[k].description}</dd>
            </div>
          ))}
        </Reveal>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
          <div>
            <label htmlFor="market-filter" className="text-sm font-bold text-ink">
              Filter markets
            </label>
            <input
              id="market-filter"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[15px] text-ink focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
            />
            <p className="sr-only" aria-live="polite">
              {results.length} {results.length === 1 ? "market" : "markets"}
            </p>

            {results.length === 0 ? (
              <p className="mt-4 text-[15px] text-slate-600">No markets match &ldquo;{query}&rdquo;.</p>
            ) : (
              <ul className="mt-2.5 space-y-2">
                {results.map((m) => {
                  const active = m.name === selected;
                  return (
                    <li key={m.code}>
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelected(m.name)}
                        className={`flex w-full items-center justify-between gap-4 rounded-xl border bg-white px-3 py-2.5 text-left transition-colors ${
                          active ? "border-ink ring-1 ring-ink" : "border-slate-200 hover:border-slate-400"
                        }`}
                      >
                        <span>
                          <span className="block text-base font-bold text-ink">{m.name}</span>
                          <span className="block text-sm text-slate-500">
                            {m.code} · {m.currency}
                          </span>
                        </span>
                        <StatusLabel status={m.status} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-28">
            {market ? (
              <MarketDetails market={market} />
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 px-6 py-14 text-center">
                <h3 className="text-xl font-bold text-ink">Choose a market</h3>
                <p className="mt-2 text-[15px] text-slate-600">
                  Select one to see its options and set your browsing context.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

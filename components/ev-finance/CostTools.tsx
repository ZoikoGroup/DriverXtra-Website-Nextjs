"use client";

import { useState } from "react";
import Link from "next/link";
import { Info, Zap } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import ChipGroup from "./ChipGroup";
import LoanEstimator, { Field, Placeholder, card, gbp, num } from "@/components/finance-tools/LoanEstimator";
import { chargingOptions, chargingTips, type ChargingOption } from "./data";

/* ---------------- Charging ---------------- */

type ChargeResult = { kwh: number; home: number; pub: number; total: number; perMile: number; install: number; share: number };

function ChargingEstimator({ share, setShare }: { share: number; setShare: (n: number) => void }) {
  const [v, setV] = useState({ distance: "", efficiency: "", home: "", public: "", install: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ChargeResult | null>(null);

  const set = (k: keyof typeof v) => (value: string) => {
    setV((s) => ({ ...s, [k]: value }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const distance = num(v.distance);
    const efficiency = num(v.efficiency);
    const home = num(v.home);
    const pub = num(v.public);
    const next: Record<string, string> = {};
    if (!(distance > 0)) next.distance = "Enter your monthly distance.";
    if (!(efficiency > 0)) next.efficiency = "Enter your vehicle's energy use.";
    if (share < 100 && !(home >= 0)) next.home = "Enter your electricity price.";
    if (share > 0 && !(pub >= 0)) next.public = "Enter a public charging price.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const kwh = (distance * efficiency) / 100;
    const s = share / 100;
    const homeCost = share < 100 ? kwh * (1 - s) * home : 0;
    const pubCost = share > 0 ? kwh * s * pub : 0;
    const install = Number.isFinite(num(v.install)) ? num(v.install) : 0;
    setResult({ kwh, home: homeCost, pub: pubCost, total: homeCost + pubCost, perMile: (homeCost + pubCost) / distance, install, share });
  };

  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.2fr_1fr]">
      <Reveal>
        <form noValidate onSubmit={submit} className={card}>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field id="ch-distance" label="Distance you drive per month" suffix="miles" value={v.distance} onChange={set("distance")} error={errors.distance} />
            <Field id="ch-eff" label="Your vehicle's energy use" suffix="kWh per 100 miles" value={v.efficiency} onChange={set("efficiency")} error={errors.efficiency} hint="From the manufacturer or your own records." />
            <Field id="ch-home" label="Home or work electricity price" prefix="£" suffix="per kWh" value={v.home} onChange={set("home")} error={errors.home} hint="From your own bill." disabled={share === 100} />
          </div>

          <div className="mt-5">
            <label htmlFor="ch-share" className="text-[12px] font-semibold text-ink">
              Share of charging at public chargers: <strong className="font-bold">{share}%</strong>
            </label>
            <input
              id="ch-share"
              type="range"
              min={0}
              max={100}
              step={5}
              value={share}
              onChange={(e) => {
                setShare(Number(e.target.value));
                setErrors((er) => ({ ...er, home: "", public: "" }));
              }}
              className="mt-3 w-full cursor-pointer accent-[#0f172a]"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>All home / work</span>
              <span>All public</span>
            </div>
          </div>

          <Field
            id="ch-public"
            label="Public charging price"
            prefix="£"
            suffix="per kWh"
            value={v.public}
            onChange={set("public")}
            error={errors.public}
            hint="Needed only if you use public chargers. Session fees aren't included."
            disabled={share === 0}
            className="mt-5"
          />
          <Field id="ch-install" label="Home charger installation (one-time, optional)" prefix="£" value={v.install} onChange={set("install")} hint="Shown separately — not added to your loan." className="mt-4" />

          <button type="submit" className="mt-5 h-11 w-full rounded-full bg-navy text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-ink">
            Estimate charging cost
          </button>
        </form>
      </Reveal>

      <Reveal direction="left" delay={150} className="lg:sticky lg:top-32">
        <div aria-live="polite">
          {!result ? (
            <Placeholder icon={Zap}>Enter distance, energy use and your electricity price to see an illustrative monthly charging cost.</Placeholder>
          ) : (
            <div key={result.total} className={`animate-fade-up ${card}`}>
              <p className="text-[12px] font-semibold tracking-wide text-slate-500 uppercase">Illustrative charging cost</p>
              <p className="mt-1 text-4xl font-extrabold tracking-tight text-ink">
                {gbp(result.total)}
                <span className="text-base font-semibold text-slate-500"> /month</span>
              </p>
              <p className="mt-1 text-[12px] text-slate-500">
                About {result.kwh.toLocaleString("en-GB", { maximumFractionDigits: 0 })} kWh a month · {gbp(result.perMile, 3)} per mile
              </p>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100" aria-hidden>
                <div className="h-full rounded-full bg-brand transition-all duration-700" style={{ width: `${result.total ? (result.pub / result.total) * 100 : result.share}%` }} />
              </div>
              <dl className="mt-3 divide-y divide-slate-100 border-y border-slate-100 text-[13px]">
                <div className="flex justify-between py-2">
                  <dt className="text-slate-600">Home / work ({100 - result.share}%)</dt>
                  <dd className="text-ink">{gbp(result.home)}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="flex items-center gap-2 text-slate-600">
                    <span className="h-2 w-2 rounded-full bg-brand" /> Public ({result.share}%)
                  </dt>
                  <dd className="text-ink">{gbp(result.pub)}</dd>
                </div>
                {result.install > 0 && (
                  <div className="flex justify-between py-2">
                    <dt className="text-slate-600">Charger installation (one-time)</dt>
                    <dd className="text-ink">{gbp(result.install, 0)}</dd>
                  </div>
                )}
              </dl>
              <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
                Uses only your figures. Session fees, standing charges and tariff changes aren&apos;t included. Charging is an ownership cost, not part of your loan.
              </p>
              <Link href={hrefFor("Ownership Cost Guides")} className="mt-3 inline-block text-[12px] font-semibold text-blue-700 underline underline-offset-2 transition-colors hover:text-gold">
                See other ownership costs
              </Link>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}

/** Charging choice, illustrative loan and charging cost — the charging choice presets the public-charging share. */
export default function CostTools() {
  const [charging, setCharging] = useState<ChargingOption | null>(null);
  const [share, setShare] = useState(0);

  return (
    <>
      <section id="charging" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Charging" title="Where will you charge?" description="We don't ask for your address or type of home." />
          <Reveal delay={150}>
            <div className="mt-6">
              <ChipGroup
                legend="Where will you charge?"
                hideLegend
                name="ev-charging"
                options={chargingOptions}
                value={charging}
                onChange={(o) => {
                  setCharging(o);
                  setShare(chargingTips[o].publicShare);
                }}
              />
            </div>
          </Reveal>
          <div aria-live="polite">
            {charging && (
              <p key={charging} className="mt-3 flex animate-fade-up items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] text-ink">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {chargingTips[charging].text}{" "}
                  <a href="#ownership-cost" className="font-semibold text-blue-700 underline underline-offset-2 transition-colors hover:text-gold">
                    Public share set to {chargingTips[charging].publicShare}% in the estimate
                  </a>
                  .
                </span>
              </p>
            )}
          </div>
        </div>
      </section>

      <section id="borrowing-cost" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Borrowing cost" title="Explore an illustrative loan" description="Enter your own example figures. Nothing is pre-filled with a rate, and this isn't a lender offer." />
          <LoanEstimator
            idPrefix="ev-loan"
            placeholder="Enter a price and an example APR to see a payment, total interest and what's excluded."
            excluded={["Insurance", "Charging and running costs", "Home charger installation", "Maintenance and servicing"]}
          />
        </div>
      </section>

      <section id="ownership-cost" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Ownership cost"
            title="Estimate charging cost separately"
            description="Charging cost is an ownership cost, not part of your loan. No default tariff or efficiency is assumed."
          />
          <ChargingEstimator share={share} setShare={setShare} />
        </div>
      </section>
    </>
  );
}

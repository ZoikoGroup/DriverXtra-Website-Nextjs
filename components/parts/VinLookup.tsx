"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Loader2, Lock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { vehicles, type VehicleId } from "./data";
import { exampleVinLookup, isValidVin, whyVin } from "./vin-data";

export default function VinLookup() {
  const [vin, setVin] = useState("");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"idle" | "checking" | "done">("idle");
  const [candidates, setCandidates] = useState<VehicleId[]>([]);
  const [chosen, setChosen] = useState<VehicleId | "">("");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const check = () => {
    const value = vin.replace(/\s/g, "");
    if (!isValidVin(value)) {
      setError(value ? "A VIN has 17 letters and numbers (no I, O or Q)." : "Enter your 17-character VIN.");
      setAttempt((a) => a + 1);
      return;
    }
    setError("");
    setStatus("checking");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const found = exampleVinLookup(value);
      setCandidates(found);
      setChosen(found.length === 1 ? found[0] : "");
      setStatus("done");
    }, 1000);
  };

  const label = (id: VehicleId) => {
    const v = vehicles.find((x) => x.id === id)!;
    return `${v.make} ${v.label}`;
  };

  return (
    <section id="find-by-vin" className="scroll-mt-28 bg-white pt-10 pb-20">
      <div className={container}>
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Find Parts by VIN</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-2 max-w-4xl text-[15px] leading-relaxed text-slate-600">
            Enter your vehicle identification number to help identify your vehicle and narrow your parts search where VIN
            lookup is available. You may need to confirm engine, trim or other details.
          </p>
        </Reveal>

        <div className="mt-6 grid items-start gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Reveal delay={150}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                check();
              }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <label htmlFor="vin-input" className="text-[13px] font-bold text-ink">
                Vehicle Identification Number (VIN)
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  id="vin-input"
                  value={vin}
                  maxLength={20}
                  onChange={(e) => {
                    setVin(e.target.value.toUpperCase());
                    setError("");
                    setStatus("idle");
                  }}
                  autoComplete="off"
                  spellCheck={false}
                  className={`h-12 min-w-0 flex-1 rounded-lg border px-3 font-mono text-sm font-semibold tracking-[0.15em] transition-all duration-200 focus:ring-2 focus:outline-none ${
                    error ? "border-red-400 focus:ring-red-200" : "border-slate-300 hover:border-slate-400 focus:border-brand-dark focus:ring-brand/30"
                  }`}
                />
                <button
                  type="submit"
                  disabled={status === "checking"}
                  className="btn-shine inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(232,172,0,0.7)] disabled:opacity-80"
                >
                  {status === "checking" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Checking…
                    </>
                  ) : (
                    "Check Vehicle"
                  )}
                </button>
              </div>
              {error ? (
                <p key={attempt} role="alert" className="mt-1.5 animate-shake text-xs font-medium text-red-600">
                  {error}
                </p>
              ) : (
                <p className="mt-1.5 flex justify-between text-xs text-slate-500">
                  <span>Enter the VIN exactly as shown on your vehicle or documents.</span>
                  <span className={vin.replace(/\s/g, "").length === 17 ? "font-semibold text-emerald-600" : ""}>{vin.replace(/\s/g, "").length}/17</span>
                </p>
              )}

              {status === "done" && (
                <div className="mt-4 animate-fade-up rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  {candidates.length === 1 ? (
                    <p className="flex items-center gap-2 text-sm font-bold text-emerald-800">
                      <span className="grid h-6 w-6 animate-pop place-items-center rounded-full bg-emerald-500 text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {label(candidates[0])}
                    </p>
                  ) : (
                    <fieldset>
                      <legend className="text-sm font-bold text-emerald-800">More than one vehicle matches — which is yours?</legend>
                      <div className="mt-2 space-y-1">
                        {candidates.map((id) => (
                          <label key={id} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-ink transition-colors hover:bg-white/70">
                            <input type="radio" name="vin-candidate" checked={chosen === id} onChange={() => setChosen(id)} className="h-4 w-4 accent-ink" />
                            {label(id)}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )}
                  <p className="mt-2 text-xs text-emerald-700">Example result — demo data until VIN lookup is connected.</p>
                  {chosen && (
                    <Link
                      href={`/parts?vehicle=${chosen}#all-parts`}
                      className="group mt-3 inline-flex animate-fade-up items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      Show parts for this vehicle
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              )}

              <p className="mt-4 text-xs font-semibold">
                <a href="#check-compatibility" className="text-blue-700 underline underline-offset-2 hover:text-ink">
                  Choose Vehicle Manually
                </a>
                <span className="mx-1.5 text-slate-400">·</span>
                <Link href="/parts#all-parts" className="text-blue-700 underline underline-offset-2 hover:text-ink">
                  Browse All Parts
                </Link>
              </p>
            </form>
          </Reveal>

          <Reveal direction="left" delay={250}>
            <aside className="rounded-2xl bg-navy p-5 text-white shadow-[0_24px_48px_-24px_rgba(11,18,32,0.8)] sm:p-6">
              <h3 className="text-base font-bold">Why use your VIN?</h3>
              <ul className="mt-4 space-y-3">
                {whyVin.map(({ text, icon: Icon }, i) => (
                  <Reveal key={text} as="li" direction="left" delay={350 + i * 100}>
                    <span className="group flex gap-3 text-sm text-slate-300">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand transition-transform duration-300 group-hover:scale-125" />
                      {text}
                    </span>
                  </Reveal>
                ))}
              </ul>
              <p className="mt-4 flex gap-2.5 rounded-xl bg-white/[0.06] p-3.5 text-xs leading-relaxed text-slate-300 ring-1 ring-white/10">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                We use the VIN you submit to identify your vehicle for this request. You can choose your vehicle manually or
                browse parts without a VIN.
              </p>
              <p className="mt-4 text-xs text-slate-400">
                Find your VIN on the windscreen base (driver&apos;s side), the door pillar, or your registration document.
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

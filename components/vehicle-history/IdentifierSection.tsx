"use client";

import { useId, useState, type FormEvent } from "react";
import Image from "next/image";
import { Check, CircleCheck, CircleX } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { checkVin, identifierTips, type VinResult } from "./data";

export default function IdentifierSection() {
  const ids = useId();
  const [vin, setVin] = useState("");
  const [result, setResult] = useState<VinResult | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setResult(checkVin(vin));
  };

  return (
    <section id="identifier" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className={`${container} grid items-start gap-10 lg:grid-cols-2`}>
        <div>
          <SectionTitle eyebrow="Identifier" title="Find the right vehicle identifier" />
          <ul className="mt-6 space-y-3">
            {identifierTips.map((tip, i) => (
              <Reveal as="li" key={tip} delay={i * 80} className="flex gap-3 text-[13px] leading-relaxed text-slate-700">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {tip}
              </Reveal>
            ))}
          </ul>
          <Reveal direction="zoom" delay={150} className="mt-6">
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-slate-200">
              <Image
                src="/images/vehicle-history/vin-location.webp"
                alt="A close view of a car door pillar and windscreen"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.25)]"
          >
            <h3 className="text-sm font-bold text-ink">Check a VIN&apos;s format</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              This only checks that the number is well formed. It runs in your browser — nothing is looked up, sent or
              saved.
            </p>
            <label htmlFor={`${ids}-vin`} className="mt-4 block text-xs font-bold text-ink">
              Vehicle identification number (VIN)
            </label>
            <input
              id={`${ids}-vin`}
              value={vin}
              onChange={(e) => {
                setVin(e.target.value);
                setResult(null);
              }}
              maxLength={24}
              autoComplete="off"
              spellCheck={false}
              aria-describedby={`${ids}-vin-hint ${ids}-vin-result`}
              aria-invalid={result ? !result.ok : undefined}
              className={`mt-1.5 h-11 w-full rounded-xl border bg-white px-3 font-mono text-sm tracking-wider text-ink uppercase focus:ring-2 focus:ring-brand/40 focus:outline-none ${
                result && !result.ok ? "border-red-500" : "border-slate-200 focus:border-ink"
              }`}
            />
            <p id={`${ids}-vin-hint`} className="mt-1.5 text-[11px] text-slate-500">
              17 letters and numbers. Never contains I, O or Q.
            </p>
            <div id={`${ids}-vin-result`} aria-live="polite">
              {result && (
                <div
                  className={`mt-3 flex gap-2 rounded-lg p-3 text-xs leading-relaxed ${
                    result.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"
                  }`}
                >
                  {result.ok ? (
                    <CircleCheck aria-hidden className="mt-px h-4 w-4 shrink-0" />
                  ) : (
                    <CircleX aria-hidden className="mt-px h-4 w-4 shrink-0" />
                  )}
                  <div>
                    <p className="font-semibold break-all">{result.message}</p>
                    {result.note && <p className="mt-1">{result.note}</p>}
                    {result.ok && <p className="mt-1">Format only — this doesn&apos;t confirm the vehicle&apos;s history or identity.</p>}
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-ink text-xs font-semibold text-white transition-colors hover:bg-navy-700"
            >
              Check format
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

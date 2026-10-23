"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Info, RotateCcw } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import RegionPicker from "@/components/ui/RegionPicker";
import { Eyebrow, container } from "@/components/ui/SectionTitle";
import Stepper from "@/components/selling/Stepper";
import { OptionGroup, PrimaryButton, StepNav, StepTitle } from "@/components/selling/FormParts";
import { useRegion } from "@/lib/region";
import { coverageOptions, resultShows, useOptions, vehicleOptions, wizardSteps } from "./data";

type StepId = (typeof wizardSteps)[number]["id"];

export default function InsuranceWizard() {
  const region = useRegion();
  const [step, setStep] = useState<StepId>(1);
  const [reached, setReached] = useState<StepId>(1);
  const [use, setUse] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [coverage, setCoverage] = useState("");
  const [error, setError] = useState("");

  const go = (next: StepId) => {
    setError("");
    setStep(next);
    setReached((r) => (next > r ? next : r));
  };

  const next = () => {
    const missing = (step === 2 && !use) || (step === 3 && !vehicle) || (step === 4 && !coverage);
    if (missing) {
      setError("Choose an option to continue.");
      return;
    }
    go((step + 1) as StepId);
  };

  const restart = () => {
    setUse("");
    setVehicle("");
    setCoverage("");
    setReached(1);
    go(1);
  };

  return (
    <section id="explore-options" className="scroll-mt-28 bg-white py-16">
      <div className={`${container} grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]`}>
        <div>
          <Reveal>
            <div className="flex items-center gap-2">
              <Eyebrow>Explore options</Eyebrow>
              <span className="rounded border border-brand/60 bg-brand-light px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-gold">DEMO</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Tell us what you&apos;re looking for</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-2 text-[13px] text-slate-500">
              Demonstration stepper. We don&apos;t ask for names, licence details, driving history or payment information, and nothing is sent anywhere.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <Stepper steps={wizardSteps} step={step} isDone={(id) => id < reached && id !== step} canOpen={(id) => id <= reached} onSelect={go} />
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div key={step} className="animate-fade-up">
                {step === 1 && (
                  <>
                    <StepTitle>Where is the vehicle kept?</StepTitle>
                    <div className="mt-2 flex flex-wrap items-center gap-1 text-sm text-slate-600">
                      Currently: <strong className="text-ink">{region}</strong>.
                      <RegionPicker label="Change market" buttonClassName="text-xs font-semibold text-blue-700 underline underline-offset-2 transition-colors hover:text-ink" />
                    </div>
                    <div className="mt-6">
                      <PrimaryButton onClick={next}>
                        Continue <ArrowRight className="h-4 w-4" />
                      </PrimaryButton>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <StepTitle>How is the vehicle used?</StepTitle>
                    <div className="mt-4">
                      <OptionGroup title="Main use" name="use" options={useOptions} value={use} onChange={(v) => (setUse(v), setError(""))} error={error} />
                    </div>
                    <StepNav onBack={() => go(1)} onNext={next} />
                  </>
                )}
                {step === 3 && (
                  <>
                    <StepTitle>What type of vehicle is it?</StepTitle>
                    <div className="mt-4">
                      <OptionGroup title="Vehicle type" name="vehicle" options={vehicleOptions} value={vehicle} onChange={(v) => (setVehicle(v), setError(""))} error={error} />
                    </div>
                    <StepNav onBack={() => go(2)} onNext={next} />
                  </>
                )}
                {step === 4 && (
                  <>
                    <StepTitle>What level of cover do you want to look at?</StepTitle>
                    <div className="mt-4">
                      <OptionGroup title="Cover level" name="coverage" options={coverageOptions} value={coverage} onChange={(v) => (setCoverage(v), setError(""))} error={error} />
                    </div>
                    <StepNav onBack={() => go(3)} onNext={next} />
                  </>
                )}
                {step === 5 && (
                  <>
                    <StepTitle>Supported options</StepTitle>
                    <dl className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-200 text-sm">
                      {[
                        ["Market", region],
                        ["Use", use],
                        ["Vehicle", vehicle],
                        ["Cover", coverage],
                      ].map(([label, value], i) => (
                        <div key={label} className="flex animate-fade-up justify-between gap-4 px-4 py-2.5" style={{ animationDelay: `${i * 70}ms` }}>
                          <dt className="text-slate-500">{label}</dt>
                          <dd className="text-right font-semibold text-ink">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-4 flex gap-3 rounded-xl bg-slate-50 p-4 text-[13px] leading-relaxed text-slate-600">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      No insurance providers are connected in this demonstration, so there are no options to show. When they are, only real, supported
                      providers would appear here.
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={restart}
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-ink"
                      >
                        <RotateCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" /> Start again
                      </button>
                      <Link href="#compare-insurance-faqs" className="text-sm font-semibold text-ink underline underline-offset-4 hover:text-gold">
                        Read common questions
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal direction="left" delay={200}>
          <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
            <div className="relative aspect-[500/313] overflow-hidden">
              <Image
                src="/images/compare-insurance/explore-options-car.png"
                alt="A blue car parked outside a building"
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="text-[15px] font-bold text-ink">What a supported result would show</h3>
              <ul className="mt-3 space-y-2.5">
                {resultShows.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[13px] text-slate-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

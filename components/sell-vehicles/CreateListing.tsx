"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import RegionPicker from "@/components/ui/RegionPicker";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { ErrorBanner } from "@/components/selling/Stepper";
import { useRegion } from "@/lib/region";
import { listerRoles, listingSteps, listingVehicleTypes } from "./data";

type Errors = { role?: string; vehicleType?: string };

export default function CreateListing() {
  const region = useRegion();
  const [role, setRole] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [attempt, setAttempt] = useState(0);
  const [started, setStarted] = useState(false);

  const currentStep = started ? 2 : 1;

  const start = () => {
    const found: Errors = {};
    if (!role) found.role = "Choose who you're listing as.";
    if (!vehicleType) found.vehicleType = "Choose the vehicle type.";
    setErrors(found);
    if (Object.keys(found).length) {
      setAttempt((a) => a + 1);
      return;
    }
    setStarted(true);
  };

  return (
    <section id="create-listing" className="scroll-mt-28 bg-slate-50 py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="Create a Listing"
          title="Create your vehicle listing."
          description="Add accurate vehicle details, explain its condition, upload your own photos and review the terms before submitting. You can save a draft and return later."
        />

        <ol className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {listingSteps.map((s, i) => {
            const n = i + 1;
            const active = n === currentStep;
            const done = n < currentStep;
            return (
              <Reveal key={s.title} as="li" delay={i * 70}>
                <div
                  className={`h-full rounded-xl border bg-white p-3.5 transition-all duration-500 hover:-translate-y-1 hover:shadow-md ${
                    active ? "border-brand shadow-[0_0_0_3px_rgba(255,194,14,0.25)]" : done ? "border-emerald-300" : "border-slate-200"
                  }`}
                >
                  <p className={`flex items-center gap-1 text-[11px] font-bold ${done ? "text-emerald-600" : "text-gold"}`}>
                    {done && <Check className="h-3 w-3 animate-pop" />}
                    Step {n}
                  </p>
                  <p className="mt-1 text-sm font-bold text-ink">{s.title}</p>
                  <p className="mt-1 text-xs leading-snug text-slate-500">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal delay={150}>
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <ErrorBanner errors={Object.values(errors).filter(Boolean) as string[]} attempt={attempt} />

            <h3 className="text-lg font-bold text-ink">Where are you selling, and on whose behalf?</h3>
            <div className="mt-1 flex flex-wrap items-center gap-1 text-xs text-slate-500">
              Selling in <strong className="text-ink">{region}</strong> ·
              <RegionPicker
                label="Change Market"
                buttonClassName="font-semibold text-blue-700 underline underline-offset-2 transition-colors hover:text-ink"
              />
              · We ask so we only show requirements that apply to you.
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <fieldset className={`rounded-xl border p-4 transition-colors ${errors.role ? "border-red-300 bg-red-50/30" : "border-slate-200"}`}>
                <legend className="sr-only">I&apos;m listing as</legend>
                <p className="text-[13px] font-bold text-ink">I&apos;m listing as</p>
                <div className="mt-2 space-y-0.5">
                  {listerRoles.map((r) => (
                    <label key={r.label} className="group -mx-2 flex cursor-pointer items-start gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-50">
                      <input
                        type="radio"
                        name="lister-role"
                        checked={role === r.label}
                        onChange={() => {
                          setRole(r.label);
                          setErrors((e) => ({ ...e, role: undefined }));
                          setStarted(false);
                        }}
                        className="mt-0.5 h-4 w-4 accent-ink transition-transform group-hover:scale-110"
                      />
                      <span>
                        <span className="block text-sm font-semibold text-ink">{r.label}</span>
                        <span className="block text-xs text-slate-500">{r.text}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-slate-500">Choosing a role doesn&apos;t grant permissions — they&apos;re checked on the server.</p>
              </fieldset>

              <fieldset className={`rounded-xl border p-4 transition-colors ${errors.vehicleType ? "border-red-300 bg-red-50/30" : "border-slate-200"}`}>
                <legend className="sr-only">Vehicle type</legend>
                <p className="text-[13px] font-bold text-ink">Vehicle type</p>
                <div className="mt-2 space-y-0.5">
                  {listingVehicleTypes.map((t) => (
                    <label
                      key={t.label}
                      className={`group -mx-2 flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors ${
                        t.unavailable ? "cursor-not-allowed text-slate-400" : "cursor-pointer text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="listing-vehicle-type"
                        disabled={t.unavailable}
                        checked={vehicleType === t.label}
                        onChange={() => {
                          setVehicleType(t.label);
                          setErrors((e) => ({ ...e, vehicleType: undefined }));
                          setStarted(false);
                        }}
                        className="h-4 w-4 accent-ink transition-transform group-hover:scale-110 disabled:cursor-not-allowed"
                      />
                      <span className={`flex-1 ${vehicleType === t.label ? "font-semibold text-ink" : ""}`}>{t.label}</span>
                      {t.unavailable && <span className="text-[11px]">(not available)</span>}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            {started && (
              <div className="mt-5 flex animate-fade-up flex-wrap items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <span className="grid h-9 w-9 animate-pop place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-5 w-5" />
                </span>
                <div className="flex-1 text-sm">
                  <p className="font-bold text-emerald-800">
                    Step 1 done — {vehicleType.toLowerCase()}, listed as {role.toLowerCase()} in {region}
                  </p>
                  <p className="text-emerald-700">Next: Specifications. The full listing editor opens here when it launches.</p>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={start}
              className="btn-shine group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(232,172,0,0.7)]"
            >
              Start Your Listing
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <Link
              href="#seller-readiness"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
            >
              Review Seller Requirements
            </Link>
            <Link
              href="/manage-my-listings"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
            >
              Manage My Listings
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export type FraudTypeOption = {
  id: string;
  title: string;
  description: string;
};

export type ReportFraudStep = {
  number: number;
  label: string;
  active: boolean;
};

const DEFAULT_FRAUD_STEPS: ReportFraudStep[] = [
  { number: 1, label: "Type", active: true },
  { number: 2, label: "You", active: false },
  { number: 3, label: "Connected to", active: false },
  { number: 4, label: "What happened", active: false },
  { number: 5, label: "Evidence", active: false },
  { number: 6, label: "Contact", active: false },
  { number: 7, label: "Review", active: false },
];

const DEFAULT_FRAUD_TYPES: FraudTypeOption[] = [
  {
    id: "account-takeover",
    title: "Account takeover",
    description: "Unauthorized logins, password changes or a hijacked account.",
  },
  {
    id: "impersonated-seller",
    title: "Impersonated seller or dealer",
    description: "A fake business, copied branding or a false representative.",
  },
  {
    id: "impersonated-buyer",
    title: "Impersonated buyer",
    description: "A fake buyer account or false identity.",
  },
  {
    id: "payment-redirection",
    title: "Payment redirection",
    description: "Asked to pay a switched account or outside agreed terms.",
  },
  {
    id: "forged-payment-proof",
    title: "Forged payment proof",
    description: "A fake bank screenshot, receipt or payment confirmation.",
  },
  {
    id: "overpayment-refund-scam",
    title: "Overpayment or refund scam",
    description: "A fake overpayment and a request to return the excess.",
  },
  {
    id: "deposit-advance-fee",
    title: "Deposit or advance-fee scam",
    description: "Money requested before availability was verified.",
  },
  {
    id: "phishing-credential-request",
    title: "Phishing or credential request",
    description: "Suspicious links, code requests or fake payment pages.",
  },
  {
    id: "fake-transport-collection",
    title: "Fake transport or collection",
    description: "A bogus carrier, handover or delivery demand.",
  },
  {
    id: "parts-purchase-delivery",
    title: "Parts purchase or delivery scam",
    description: "A fake invoice, non-existent stock or fraudulent shipment.",
  },
  {
    id: "false-finance-insurance",
    title: "False finance or insurance offer",
    description: "An impersonated lender or insurer, or a fraudulent offer.",
  },
  {
    id: "threat-coercion-extortion",
    title: "Threat, coercion or extortion",
    description: "Threats for money, credentials, content or a meeting.",
  },
  {
    id: "harassment-identity-misuse",
    title: "Harassment or identity misuse",
    description: "Misused photos, personal information or a fake profile.",
  },
  {
    id: "something-else-not-sure",
    title: "Something else / not sure",
    description: "You're not sure which category fits.",
  },
];

const DEFAULT_WHAT_HAPPENS_NEXT = [
  "Your report is received",
  "It's triaged by the right team",
  "Reviewers assess the evidence",
  "Any action follows review",
];

type ReportFraudStep1SectionProps = {
  id?: string;
  steps?: ReportFraudStep[];
  fraudTypes?: FraudTypeOption[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function ReportFraudStep1Section({
  id = "report-fraud-step1",
  steps = DEFAULT_FRAUD_STEPS,
  fraudTypes = DEFAULT_FRAUD_TYPES,
  imageSrc = "/images/fraud/2.png",
  imageAlt = "Two colleagues high-fiving over laptop in office workspace",
  className = "bg-[#F6F8FB]",
}: ReportFraudStep1SectionProps) {
  const [selectedTypeId, setSelectedTypeId] = useState<string>("");
  const [reportRef, setReportRef] = useState<string>("");

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Step Progress Bar */}
        <Reveal delay={50} className="mb-10">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-slate-100/80 p-2 border border-slate-200/60 w-fit">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  step.active
                    ? "bg-[#0B1220] text-white shadow-xs"
                    : "bg-white/80 text-slate-500 border border-slate-200/60"
                }`}
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-extrabold ${
                    step.active
                      ? "bg-[#F5B400] text-ink"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {step.number}
                </span>
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Main 2-Column Grid */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Radio Selection Box */}
          <Reveal delay={100} className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                What kind of suspected fraud would you like to report?
              </h2>

              {/* 2-Column Radio Card Grid */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {fraudTypes.map((type) => {
                  const isSelected = selectedTypeId === type.id;

                  return (
                    <label
                      key={type.id}
                      onClick={() => setSelectedTypeId(type.id)}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all duration-200 ${
                        isSelected
                          ? "border-slate-400 bg-slate-50/80 shadow-2xs ring-1 ring-slate-400"
                          : "border-slate-200/80 bg-white hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="fraudType"
                        value={type.id}
                        checked={isSelected}
                        onChange={() => {}}
                        className="mt-0.5 h-4 w-4 border-slate-300 text-ink focus:ring-slate-900"
                      />
                      <div>
                        <span className="block text-xs font-bold text-ink sm:text-sm">
                          {type.title}
                        </span>
                        <span className="mt-1 block text-xs text-slate-500 leading-relaxed">
                          {type.description}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Continue Button */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-[#F5B400] px-8 py-3 text-xs font-bold text-ink shadow-2xs transition-all hover:bg-[#e0a400]"
                >
                  Continue
                </button>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Image + What Happens Next + Wrong Place + Check a Report */}
          <div className="space-y-6 lg:col-span-5">
            {/* Top Image */}
            <Reveal direction="zoom" delay={120}>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-sm">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            {/* What Happens Next Box */}
            <Reveal delay={150}>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
                <h3 className="text-base font-bold text-ink sm:text-lg">
                  What happens next
                </h3>
                <ol className="mt-4 space-y-2.5 text-xs text-slate-600 sm:text-sm list-decimal list-inside leading-relaxed">
                  {DEFAULT_WHAT_HAPPENS_NEXT.map((stepText, idx) => (
                    <li key={idx} className="font-medium text-slate-700">
                      {stepText}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 border-t border-slate-100 pt-4 text-[11px] leading-relaxed text-slate-400">
                  We may limit case updates to protect privacy and the review
                  process.
                </p>
              </div>
            </Reveal>

            {/* Wrong Place? Box */}
            <Reveal delay={170}>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
                <h3 className="text-base font-bold text-ink sm:text-lg">
                  Wrong place?
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                  For misleading listing details without a suspected scam, use{" "}
                  <a
                    href="#"
                    className="text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-ink font-medium"
                  >
                    Report a Listing
                  </a>
                  .
                </p>
                <p className="mt-3 text-xs leading-relaxed text-slate-500 sm:text-sm">
                  If you want to challenge an eligible platform decision, see{" "}
                  <a
                    href="#"
                    className="text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-ink font-medium"
                  >
                    Disputes &amp; Appeals
                  </a>
                  .
                </p>
              </div>
            </Reveal>

            {/* Check a Report Box */}
            <Reveal delay={190}>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
                <h3 className="text-base font-bold text-ink sm:text-lg">
                  Check a report
                </h3>
                <div className="mt-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Report reference
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={reportRef}
                      onChange={(e) => setReportRef(e.target.value)}
                      placeholder="FR-XXXXXX"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-ink placeholder-slate-400 focus:border-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-400"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-2.5 text-xs font-bold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                  >
                    Check status
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

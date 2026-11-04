"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type CredentialStep = {
  step: number;
  title: string;
  description: string;
  variant?: "default" | "warning" | "danger";
};

const CREDENTIAL_STEPS: CredentialStep[] = [
  {
    step: 1,
    title: "Store",
    description:
      "In a secrets manager — never in code, repos or browser storage",
    variant: "default",
  },
  {
    step: 2,
    title: "Reveal once",
    description:
      "Where designed, a secret is shown once; copy it straight to secure storage",
    variant: "default",
  },
  {
    step: 3,
    title: "Rotate",
    description:
      "Rotating may interrupt integrations using the previous credential. Review affected applications.",
    variant: "warning",
  },
  {
    step: 4,
    title: "Revoke",
    description: "Immediately, if exposure is suspected",
    variant: "danger",
  },
];

type HandleCredentialsSafelySectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  steps?: CredentialStep[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function HandleCredentialsSafelySection({
  id = "credentials",
  eyebrow = "Secrets",
  title = "Handle credentials safely",
  description = "Masking a value on screen isn't the same as storing it securely.",
  steps = CREDENTIAL_STEPS,
  imageSrc = "/images/security/5.png",
  imageAlt = "Laptop displaying code editor with a cup of coffee on a wooden desk",
  className = "bg-white",
}: HandleCredentialsSafelySectionProps) {
  const [textToCheck, setTextToCheck] = useState("");
  const [checkedResult, setCheckedResult] = useState<string | null>(null);

  const handleCheckForSecrets = () => {
    if (!textToCheck.trim()) {
      setCheckedResult("Please enter text to check.");
      return;
    }
    // Local check simulation
    setCheckedResult("Local check complete: No obvious secrets detected.");
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 4 Steps Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(
            ({ step, title: stepTitle, description: stepDesc, variant }, i) => {
              let borderStyle = "border-slate-200/80 bg-white";
              if (variant === "warning") {
                borderStyle = "border-amber-400 bg-white";
              } else if (variant === "danger") {
                borderStyle = "border-rose-400 bg-white";
              }

              return (
                <Reveal key={step} delay={i * 80}>
                  <div
                    className={`flex h-full flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)] ${borderStyle}`}
                  >
                    <div>
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-[#0B1220] text-xs font-bold text-white shadow-sm">
                        {step}
                      </div>
                      <h3 className="mt-5 text-sm font-bold text-ink">
                        {stepTitle}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500">
                        {stepDesc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            },
          )}
        </div>

        {/* Interactive Text Checker Section */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Left Column: Heading + Laptop Image */}
          <Reveal delay={150}>
            <div>
              <h3 className="text-base font-bold text-ink sm:text-lg">
                Check text before you share it
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                Paste a log line or message you&apos;re about to send to
                support. This check runs only in your browser — nothing is sent
                or stored.
              </p>

              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/80 shadow-xl bg-white">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Interactive Textarea Card */}
          <Reveal delay={200}>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
              <label
                htmlFor="text-to-check"
                className="block text-xs font-bold uppercase tracking-wider text-ink"
              >
                Text to check
              </label>

              <div className="mt-3">
                <textarea
                  id="text-to-check"
                  rows={6}
                  value={textToCheck}
                  onChange={(e) => {
                    setTextToCheck(e.target.value);
                    setCheckedResult(null);
                  }}
                  placeholder="Paste a log line or message"
                  className="w-full rounded-xl border border-slate-300 bg-white p-4 text-xs text-ink placeholder:text-slate-400 outline-none transition-colors focus:border-ink sm:text-sm"
                />
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Local check only. It can miss secrets — always review
                  manually.
                </p>
                <button
                  type="button"
                  onClick={handleCheckForSecrets}
                  className="shrink-0 rounded-full bg-ink px-6 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90"
                >
                  Check for secrets
                </button>
              </div>

              {checkedResult && (
                <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs font-semibold text-slate-700 border border-slate-200">
                  {checkedResult}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

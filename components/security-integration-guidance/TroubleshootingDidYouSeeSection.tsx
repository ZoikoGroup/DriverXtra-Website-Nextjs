"use client";

import { useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type ErrorOption = {
  code: string;
  label: string;
  description?: string;
};

const ERROR_OPTIONS: ErrorOption[] = [
  {
    code: "401",
    label: "Authentication failed",
  },
  {
    code: "403",
    label: "Not permitted",
  },
  {
    code: "422",
    label: "Validation failed",
  },
  {
    code: "429",
    label: "Too many requests",
  },
  {
    code: "503",
    label: "Source unavailable",
  },
];

type TroubleshootingDidYouSeeSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  options?: ErrorOption[];
  className?: string;
};

export default function TroubleshootingDidYouSeeSection({
  id = "what-did-you-see",
  eyebrow = "Troubleshooting",
  title = "What did you see?",
  description = "Choose the response you received. Remediation depends on the actual API contract for the operation.",
  options = ERROR_OPTIONS,
  className = "bg-white",
}: TroubleshootingDidYouSeeSectionProps) {
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {options.map(({ code, label }, i) => {
            const isSelected = selectedCode === code;
            return (
              <Reveal key={code} delay={i * 60}>
                <label
                  onClick={() => setSelectedCode(code)}
                  className={`flex h-full cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-all duration-200 ${
                    isSelected
                      ? "border-slate-900 bg-white shadow-sm ring-1 ring-slate-900"
                      : "border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-ink">{code}</span>
                    <input
                      type="radio"
                      name="troubleshooting-response"
                      checked={isSelected}
                      onChange={() => {}}
                      className="h-4 w-4 border-slate-300 text-ink focus:ring-slate-900"
                    />
                  </div>
                  <p className="mt-4 text-xs font-medium text-slate-600">
                    {label}
                  </p>
                </label>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

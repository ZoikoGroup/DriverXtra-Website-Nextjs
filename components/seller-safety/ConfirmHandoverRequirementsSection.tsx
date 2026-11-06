"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type HandoverQuestion = {
  id: string;
  title: string;
};

const DEFAULT_QUESTIONS: HandoverQuestion[] = [
  {
    id: "payment-cleared",
    title: "Payment shows as cleared in an account I control",
  },
  {
    id: "authorized-to-sell",
    title: "I'm the owner, or authorized to sell",
  },
  {
    id: "registration-ready",
    title: "Registration and transfer paperwork is ready for my market",
  },
  {
    id: "finance-settled",
    title: "Any finance or lien on the vehicle is settled",
  },
];

type ConfirmHandoverRequirementsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  questions?: HandoverQuestion[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function ConfirmHandoverRequirementsSection({
  id = "handover",
  eyebrow = "Handover",
  title = "Confirm the handover requirements",
  description = "Make sure applicable payment, identity, registration and transfer requirements are verified through their authoritative channels before releasing a vehicle or parts.",
  questions = DEFAULT_QUESTIONS,
  imageSrc = "/images/seller/11.png",
  imageAlt = "Green high-performance luxury coupe parked on asphalt road",
  className = "bg-white",
}: ConfirmHandoverRequirementsSectionProps) {
  // Track selected answer per question ('Yes' | 'No' | 'Not sure' | null)
  const [selections, setSelections] = useState<Record<string, string>>({});

  const handleSelect = (questionId: string, answer: string) => {
    setSelections((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Title, Description & Hero Car Image */}
          <div className="lg:col-span-5">
            <SectionTitle
              eyebrow={eyebrow}
              title={title}
              description={description}
            />

            <Reveal delay={120} className="mt-8">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-sm">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Decision Aid Questionnaire Box */}
          <Reveal delay={180} className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              {/* Header with DECISION AID pill badge */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs font-bold text-slate-800 sm:text-sm">
                  Ready to hand over?
                </span>
                <span className="inline-flex items-center rounded-md bg-[#F5B400]/20 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-amber-800 border border-[#F5B400]/40 uppercase">
                  DECISION AID
                </span>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {questions.map((q) => {
                  const currentAnswer = selections[q.id];

                  return (
                    <div
                      key={q.id}
                      className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 transition-all duration-200 hover:border-slate-300"
                    >
                      <h3 className="text-xs font-bold text-ink sm:text-sm">
                        {q.title}
                      </h3>

                      {/* Yes / No / Not sure options */}
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {["Yes", "No", "Not sure"].map((option) => {
                          const isSelected = currentAnswer === option;

                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleSelect(q.id, option)}
                              className={`rounded-full px-5 py-1.5 text-xs font-bold transition-all duration-200 border ${
                                isSelected
                                  ? "bg-[#0B1220] text-white border-[#0B1220] shadow-xs"
                                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

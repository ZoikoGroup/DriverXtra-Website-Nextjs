"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "Does DriverXtra sell vehicles directly?",
    a: "No. DriverXtra is a technology marketplace. Vehicles, parts and services are offered by independent users and verified or regulated partners unless expressly stated.",
  },
  {
    q: "How are sellers and partners verified?",
    a: "Every business partner completes identity, licensing and compliance checks. Private sellers are verified by identity and contact details before listing.",
  },
  {
    q: "Can I get finance and insurance on DriverXtra?",
    a: "Yes. You can get pre-qualified and compare offers from authorised finance and insurance partners directly from a listing.",
  },
  {
    q: "Which countries does DriverXtra operate in?",
    a: "DriverXtra serves 40+ markets. Use the country selector in the footer to view local listings, language and currency.",
  },
  {
    q: "How do I report a suspicious listing?",
    a: "Use the “Report a Listing” option on any listing or visit Trust & Safety. Our team monitors reports 24/7.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-10">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title="Questions, answered"
          description="Can't find what you're looking for? Our Help Center has guides for buyers, sellers and partners."
        />

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 80}>
                <div
                  className={`rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen ? "border-brand shadow-lg" : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-ink"
                  >
                    {item.q}
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-brand" : "bg-slate-100"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <p className="overflow-hidden px-6 text-sm leading-relaxed text-slate-600">
                      <span className="block pb-5">{item.a}</span>
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

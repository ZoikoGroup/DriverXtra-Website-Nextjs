"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface FaqItem {
  id: string;
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    id: "faq-1",
    q: "What is DriverXtra for?",
    a: "DriverXtra brings together automotive discovery and guidance for vehicles, parts, services and relevant business pathways. What you can access depends on your market and the responsible service.",
  },
  {
    id: "faq-2",
    q: "Where should I start if I want to buy a car?",
    a: "Begin by searching listings in your market, filtering by condition, budget, and seller verification scope. Always review vehicle history, compare claims, and arrange an independent physical inspection before committing to any purchase.",
  },
  {
    id: "faq-3",
    q: "How do I start selling a vehicle?",
    a: "Prepare your listing with clear photos, vehicle specifications, and transparent history. Complete identity verification to earn verified badges, manage inquiries through DriverXtra channels, and confirm cleared funds before handover.",
  },
  {
    id: "faq-4",
    q: "Does a verification label guarantee a safe purchase?",
    a: "No. A verification label confirms that specific submitted documents, identity claims, or business registrations met review criteria at that time. It does not certify the mechanical condition or roadworthiness of a vehicle.",
  },
  {
    id: "faq-5",
    q: "Can DriverXtra confirm vehicle ownership or title?",
    a: "DriverXtra reviews documents provided by the seller, but official ownership and lien verification must be confirmed through official local government registries and motor vehicle licensing authorities.",
  },
  {
    id: "faq-6",
    q: "How do I compare finance choices?",
    a: "Use our financing comparison tools to evaluate estimated monthly payments, APR ranges, down payments, and loan terms across vetted institutional lending partners.",
  },
  {
    id: "faq-7",
    q: "Does an insurance comparison mean I am covered?",
    a: "No. Insurance comparisons provide indicative quotes. Active coverage only takes effect once you complete the provider's underwriting process and receive an issued policy binder.",
  },
  {
    id: "faq-8",
    q: "How can I find compatible parts?",
    a: "Search by year, make, model, or vehicle VIN. Always check OEM part numbers, seller fitment details, and return terms before submitting your order.",
  },
  {
    id: "faq-9",
    q: "What do OEM, OES and aftermarket mean?",
    a: "OEM parts are made by the vehicle manufacturer. OES parts are produced by the manufacturer's original parts suppliers. Aftermarket parts are compatible replacement units manufactured by independent companies.",
  },
  {
    id: "faq-10",
    q: "How do service appointments work?",
    a: "Select an eligible service provider, submit your maintenance or diagnostic requirements, and confirm an appointment slot. The provider will review work orders and confirm final timing and cost.",
  },
  {
    id: "faq-11",
    q: "Is an item reserved when stock is shown?",
    a: "Stock indicators reflect live provider inventories, but items are only reserved once the seller or parts supplier directly accepts and confirms your order or booking.",
  },
  {
    id: "faq-12",
    q: "Can I use DriverXtra for fleet or enterprise needs?",
    a: "Yes. Fleet and enterprise pathways support bulk vehicle acquisition, remarketing, corporate maintenance networks, and inventory API integration.",
  },
  {
    id: "faq-13",
    q: "How do I become a provider or parts seller?",
    a: "Submit an application through the partner portal with your registered business credentials, licenses, and inventory feeds for verification and onboarding.",
  },
  {
    id: "faq-14",
    q: "What should I do if I see a suspicious listing?",
    a: "Do not send payments or personal contact info. Use the 'Report a Listing' link or visit our buyer safety section to notify our trust and safety team.",
  },
  {
    id: "faq-15",
    q: "How do I report suspected fraud?",
    a: "Access the Report Fraud portal directly. No account sign-in is required to report suspicious activity or request platform review.",
  },
  {
    id: "faq-16",
    q: "What if a feature is unavailable in my region?",
    a: "Availability depends on regional compliance, local partnerships, and rollout schedules. Coverage maps indicate which services are currently supported in your area.",
  },
  {
    id: "faq-17",
    q: "Can I use the guide without signing in?",
    a: "Yes. All informational guides, safety principles, and platform exploration tools are accessible freely without logging in.",
  },
  {
    id: "faq-18",
    q: "Where can I find assistance or more detailed explanations?",
    a: "Visit the Help Center, consult our buyer/seller safety resources, or reach out to enterprise contact channels for dedicated assistance.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-[#F8F9FC] py-16 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className={`${container} grid gap-10 lg:grid-cols-[1fr_2fr]`}>
        {/* Left Column: Heading and info */}
        <div className="lg:sticky lg:top-36 lg:self-start">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">FAQ</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
              How DriverXtra Works questions
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-4 text-xs sm:text-sm text-slate-500 leading-relaxed">
              Proposed answers, pending owner review.
            </p>
          </Reveal>
        </div>

        {/* Right Column: Accordion list */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.id} delay={Math.min(i, 6) * 40}>
                <div className="group">
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 sm:py-4.5 text-left text-xs sm:text-sm font-bold text-slate-900 transition-colors hover:text-amber-600"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`grid h-6 w-6 sm:h-7 sm:w-7 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-[#ffc20e] text-[#0B1220] rotate-45 shadow-xs"
                          : "border border-slate-300 bg-white text-slate-500 group-hover:border-amber-400 group-hover:text-slate-800"
                      }`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-4 sm:pb-5 pr-8 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                        {faq.a}
                      </p>
                    </div>
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

"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Who can become a service provider?",
    answer:
      "Eligibility depends on your business type, operating market and service category. Use the eligibility check to see the requirements that may apply. An application is not guaranteed acceptance.",
  },
  {
    question: "Are individual mechanics eligible?",
    answer:
      "Individual mechanics and mobile technicians are eligible in select markets where individual operating credentials and mobile service coverage are supported.",
  },
  {
    question: "Which services can I offer?",
    answer:
      "You can offer services matching your business equipment and verified credentials, ranging from routine maintenance, tyre fitting, cosmetic detailing, to complex repairs.",
  },
  {
    question: "What documents will I need?",
    answer:
      "Typical requirements include business registration details, proof of branch locations, technician qualification credentials, and valid insurance evidence.",
  },
  {
    question: "Does applying make my business verified?",
    answer:
      "No. An application submission is recorded for review. Verification and authorization occur after evidence is validated and agreements are signed.",
  },
  {
    question: "Can I create more than one location?",
    answer:
      "Yes. You can manage multiple branch locations, setting custom operating hours and service areas for each site under a single organization account.",
  },
  {
    question: "Are there fees or commissions?",
    answer:
      "Applicable platform charges, commissions, and payout schedules depend on your approved market terms. Complete terms are presented before agreement signing.",
  },
  {
    question: "How do bookings work?",
    answer:
      "Depending on your enabled tools, customers send service requests or select available appointment slots based on your branch capacity and service area.",
  },
  {
    question: "Can I set service prices?",
    answer:
      "Yes, providers set clear scope estimates and pricing before work begins, subject to customer review and approval.",
  },
  {
    question: "What if my market is not supported?",
    answer:
      "You can submit an expression of interest to be notified as soon as DriverXtra expands provider onboarding to your operating area.",
  },
  {
    question: "Will DriverXtra provide insurance for my business?",
    answer:
      "No. Providers must maintain independent active liability and business insurance as required by their local operating jurisdiction.",
  },
  {
    question: "Are my uploaded documents public?",
    answer:
      "No. All uploaded business credentials, insurance policies, and verification evidence remain strictly private and visible only to authorized review teams.",
  },
  {
    question: "How will customers know my verification status?",
    answer:
      "Active providers display verified badge indicators on platform listings once branch checks and category permissions are officially completed.",
  },
  {
    question: "What if my application needs additional information?",
    answer:
      "If evidence is incomplete or expired, your application status updates to 'Awaiting dealer/provider' with instructions on what details to update.",
  },
  {
    question: "Can I pause or leave the program?",
    answer:
      "Yes. You can temporarily pause branch visibility or deactivate your service provider account at any time from your account settings.",
  },
  {
    question: "Do you guarantee customers or income?",
    answer:
      "No guarantees are made regarding customer volume or revenue. Service demand varies by market, provider ratings, and coverage area.",
  },
  {
    question: "Where do inspection or transport businesses apply?",
    answer:
      "Vehicle inspection and logistics/transport service providers have dedicated onboarding tracks with specialized compliance checks.",
  },
  {
    question: "How do I get help with an application?",
    answer:
      "You can submit a support ticket via the Dealer & Provider Support center to get help with document submission or status questions.",
  },
];

type BecomeServiceProviderFaqSectionProps = {
  id?: string;
  className?: string;
};

export default function BecomeServiceProviderFaqSection({
  id,
  className = "bg-[#F6F8FB]",
}: BecomeServiceProviderFaqSectionProps) {
  // First item open by default to match screenshot layout
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={`${container} grid gap-12 lg:grid-cols-12`}>
        {/* Left Side: Title & Info Header */}
        <div className="lg:col-span-5">
          <SectionTitle
            eyebrow="FAQ"
            title="Become a Service Provider questions"
            description="Proposed answers, pending legal and market review."
          />
        </div>

        {/* Right Side: Accordion FAQ List */}
        <div className="space-y-3 lg:col-span-7">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.question} delay={index * 25}>
                <div
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-slate-300 bg-[#F6F8FB] shadow-sm"
                      : "border-slate-200/80 bg-[#F6F8FB] hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-start justify-between p-5 text-left"
                  >
                    <span className="pr-4 text-xs font-bold text-ink sm:text-sm">
                      {item.question}
                    </span>
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors duration-200 ${
                        isOpen
                          ? "bg-brand text-ink"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {isOpen ? (
                        <X className="h-3.5 w-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {item.answer}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Who is Dealer Support for?",
    answer:
      "Dealer Support is intended for eligible DriverXtra dealership organizations and authorized team members. Buyers and private sellers should use the marketplace Help Center; a signed-in dealer account may be necessary to submit or view private cases.",
  },
  {
    question: "What can Dealer Support help with?",
    answer:
      "Dealer Support can assist with authorized account configurations, inventory feed troubleshooting, lead delivery issues, and dashboard permission management.",
  },
  {
    question: "How do I create a support request?",
    answer:
      "You can create a support request directly through the Dealer Support portal by filling out the ticket submission form with your rooftop ID and issue details.",
  },
  {
    question: "Can I get help before my dealership is verified?",
    answer:
      "Limited general guidance is available prior to verification, but account-specific troubleshooting and live data requests require full dealership verification.",
  },
  {
    question: "Can Dealer Support verify my dealership?",
    answer:
      "Dealer Support reviews verification documentation submitted through the onboarding portal, but cannot bypass standard regulatory or licensing compliance checks.",
  },
  {
    question: "Can support publish a rejected vehicle listing?",
    answer:
      "No. Support agents cannot override automated content moderation or compliance rejections; listings must meet marketplace standards before publication.",
  },
  {
    question: "What should I include for an inventory feed problem?",
    answer:
      "Please include your dealership rooftop ID, feed provider name, error logs or timestamps, and examples of affected vehicle VINs.",
  },
  {
    question: "Can you fix a CRM provider outage?",
    answer:
      "No. While we can diagnose ingestion issues on our end, third-party CRM outages must be resolved directly through your CRM vendor's support team.",
  },
  {
    question: "What is the difference between a received and resolved case?",
    answer:
      "A received case has been logged and assigned to an agent, while a resolved case means troubleshooting is complete and the ticket has been closed.",
  },
  {
    question: "How quickly will I hear back?",
    answer:
      "Initial response times vary by priority level, but standard inquiries typically receive an initial update within one business day.",
  },
  {
    question: "Can I see support cases for several dealership locations?",
    answer:
      "Yes, users with multi-rooftop permissions can view and manage support cases across all authorized dealership locations.",
  },
  {
    question: "Can I attach screenshots or files?",
    answer:
      "Yes. You can upload standard image formats and document logs directly to your support ticket to help illustrate the issue.",
  },
  {
    question: "Can I reply to an existing support case?",
    answer:
      "Yes. You can add comments or provide additional information by replying directly within the active support ticket thread.",
  },
  {
    question: "How do I escalate an unresolved issue?",
    answer:
      "If an issue requires further attention, you can request an escalation through your ticket interface or contact your designated account manager.",
  },
  {
    question: "What happens if my dealership account is restricted?",
    answer:
      "Account restrictions limit access to certain dashboard features or lead feeds until compliance or billing verifications are successfully resolved.",
  },
  {
    question:
      "How do I report a compromised account or suspected data exposure?",
    answer:
      "Immediately submit an urgent support ticket marked under security concerns or contact our emergency dealer security hotline.",
  },
  {
    question: "What information is recorded in a support case?",
    answer:
      "Support cases record communication timestamps, agent notes, attached files, and diagnostic metadata related to the reported inquiry.",
  },
  {
    question: "Can I reopen a resolved case or request a copy?",
    answer:
      "Yes. You can reopen a closed case within a limited timeframe or request a complete transcript history through your support dashboard.",
  },
];

type DealerSupportFAQSectionProps = {
  id?: string;
  className?: string;
};

export default function DealerSupportFAQSection({
  id,
  className = "bg-white",
}: DealerSupportFAQSectionProps) {
  // Open the first FAQ item by default to match design
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="FAQ"
          title="Dealer Support questions"
          description="Draft answers pending legal and product review."
        />

        <div className="mt-10 divide-y divide-slate-100">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.question} delay={index * 30}>
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left transition-colors hover:text-brand"
                  >
                    <span className="text-sm font-bold text-ink">
                      {item.question}
                    </span>
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-transform duration-200 ${
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

                  <div
                    className={`grid transition-[grid-template-rows] duration-400 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`pt-3 pr-10 text-xs leading-relaxed text-slate-500 transition-all duration-500 ${
                          isOpen
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-2 opacity-0"
                        }`}
                      >
                        {item.answer}
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

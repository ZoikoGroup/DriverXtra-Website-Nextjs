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
    question: "What is Dealer Analytics?",
    answer:
      "Dealer Analytics is a proposed reporting experience for authorized DriverXtra dealers. It can summarize supported inventory exposure, listing activity and inquiry handling. The exact metrics available depend on market, role and enabled data sources.",
  },
  {
    question: "Does a listing view mean someone intends to buy?",
    answer:
      "No. A listing view indicates that an eligible user loaded the details page of your vehicle listing. It does not signify explicit purchase intent or guaranteed buyer conversion.",
  },
  {
    question: "Are these numbers live?",
    answer:
      "Metrics are updated periodically based on batch aggregation cycles and stream processing for your market. Some activity counts may have short reporting delays.",
  },
  {
    question: "How are inquiries counted?",
    answer:
      "Inquiries are counted when valid lead submission forms or direct contact actions are successfully processed and accepted by DriverXtra.",
  },
  {
    question: "Do delivered leads count as answered?",
    answer:
      "No. Delivered leads represent successful dispatch to your dealership's system or CRM. An inquiry is only counted as answered when explicit response evidence is received.",
  },
  {
    question: "Can Dealer Analytics show confirmed vehicle sales?",
    answer:
      "No. Dealer Analytics does not track offline vehicle transactions or final sales unless explicitly reported through integrated dealer feeds.",
  },
  {
    question: "Can I compare multiple dealership locations?",
    answer:
      "Multi-location reporting is available for users with multi-rooftop permissions, allowing performance comparison across permitted dealership locations.",
  },
  {
    question: "Can I see how my dealership ranks against other dealers?",
    answer:
      "No. DriverXtra does not publish competitive ranking, relative placement, or private performance metrics of other dealerships.",
  },
  {
    question: "Why does a metric say “Not available”?",
    answer:
      "A metric displays 'Not available' when the required data source is disabled, your user role lacks necessary permissions, or insufficient data exists for the selected timeframe.",
  },
  {
    question: "Why did last month's number change?",
    answer:
      "Historical adjustments may occur if late-arriving CRM confirmations or deduplication routines retroactively re-evaluate activity within a past billing/reporting window.",
  },
  {
    question: "How does the response rate work?",
    answer:
      "Response rate calculates the percentage of acknowledged lead deliveries that received a recorded response within specified operational time thresholds.",
  },
  {
    question: "Can I export analytics?",
    answer:
      "Yes. Authorized roles (such as Owners and Managers) can export metrics and summary reports in CSV or PDF formats depending on market permissions.",
  },
  {
    question:
      "Can individual sales representatives see other people's performance?",
    answer:
      "Access control is strictly governed by role visibility. Individual representatives only see data associated with their assigned listings or rooftop permissions.",
  },
  {
    question: "Does the dashboard replace my CRM?",
    answer:
      "No. Dealer Analytics is a reporting interface for DriverXtra channel activity and is designed to complement, not replace, your existing Dealership Management or CRM system.",
  },
  {
    question: "What happens when an inventory feed fails?",
    answer:
      "If a feed fails, historical data remains intact, but real-time listing exposure and view metrics for affected vehicles may pause until the feed issue is resolved.",
  },
  {
    question: "Can I trust sample dashboard values shown on the public page?",
    answer:
      "Sample dashboard values displayed on documentation and landing pages represent synthetic data created purely for illustrative and design demo purposes.",
  },
  {
    question: "Can analytics data be used for marketing automatically?",
    answer:
      "No. Analytics data is provided for performance monitoring and operations. Automated marketing actions require separate tool integrations and consent configurations.",
  },
  {
    question: "How do I report a metric I think is wrong?",
    answer:
      "You can submit a ticket through the Dealer Support portal with the specific metric, time window, and rooftop ID for our analytics team to audit.",
  },
];

type DealerAnalyticsFAQSectionProps = {
  id?: string;
  className?: string;
};

export default function DealerAnalyticsFAQSection({
  id,
  className = "bg-white",
}: DealerAnalyticsFAQSectionProps) {
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
          title="Dealer Analytics questions"
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
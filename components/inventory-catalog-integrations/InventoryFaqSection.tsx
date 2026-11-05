"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type InventoryFaqItem = {
  question: string;
  answer: ReactNode;
};

const INVENTORY_FAQS: InventoryFaqItem[] = [
  {
    question: "What is this page for?",
    answer:
      "It explains how eligible partners may connect product, vehicle catalog and inventory sources to DriverXtra, and—where enabled—how authorized users may validate and monitor those sources. It does not itself grant marketplace or API access.",
  },
  {
    question:
      "Do I need a DriverXtra account to read the integration overview?",
    answer:
      "No. Public guidance is accessible to all partners. However, accessing specific tenant credentials, API configurations, and staging environments requires verified partner credentials.",
  },
  {
    question: "Which integration formats are supported?",
    answer:
      "DriverXtra supports scheduled batch files, partner feed protocols, and direct system-to-system REST APIs depending on market and authorization tier.",
  },
  {
    question: "Can any seller send a catalog?",
    answer:
      "No. Only partners with verified organization identity, market eligibility, and confirmed brand/OEM rights can connect catalog sources.",
  },
  {
    question: "How are parts and vehicle listings different?",
    answer:
      "Parts listings focus on SKU, fitment attributes, and product master details, whereas vehicle listings carry listing media, dealer rights, and taxonomy-bound vehicle specifications.",
  },
  {
    question: "Does an uploaded file automatically publish products?",
    answer:
      "No. Uploaded files pass through source validation, mapping, quality checks, and independent review gates before reaching live publication.",
  },
  {
    question: "What if an import succeeds but stock is old?",
    answer:
      "Items with stale stock observations will reflect last-reported timestamps or transition to unconfirmed availability to prevent overselling.",
  },
  {
    question: "What is the difference between zero and unknown stock?",
    answer:
      "Zero stock explicitly indicates an out-of-stock state, while unknown stock means the source feed is stale, unverified, or missing quantity data.",
  },
  {
    question: "Does vehicle compatibility mean guaranteed fitment?",
    answer:
      "No. Vehicle compatibility is categorized by evidence levels (Verified, Candidate, or Unverified) and should be reviewed prior to relying on the claim.",
  },
  {
    question: "How are OEM labels and brand logos checked?",
    answer:
      "Media and brand assets undergo automated and manual delegation checks to verify licensed distribution rights before display.",
  },
  {
    question: "What happens to recalled or restricted parts?",
    answer:
      "Items flagged for product safety or regulatory restrictions are placed on safety hold pending independent compliance review.",
  },
  {
    question: "Can I retry a failed import?",
    answer:
      "Yes. Once schema mismatches or field mapping errors are corrected, you can re-trigger a dry run or resubmit the affected scope.",
  },
  {
    question: "How are duplicate SKUs handled?",
    answer:
      "Matching values across distinct identifier types are never merged automatically. Identifier collisions require a reviewed resolution action.",
  },
  {
    question: "Can catalog pricing vary by market?",
    answer:
      "Yes. Currency, market rules, validity dates, and tax inclusion/exclusion are carried independently per region.",
  },
  {
    question: 'What does "partially accepted" mean?',
    answer:
      "It means valid records within a feed were accepted, while problematic rows were held or rejected with specific reason codes for remediation.",
  },
  {
    question: "Who can view rejected rows and diagnostics?",
    answer:
      "Authorized technical contacts and workspace administrators can inspect diagnostics and remediation logs in the partner portal.",
  },
  {
    question: "Where can I see outages or integration incidents?",
    answer:
      "System operational status and active incident reports are published on Platform Status.",
  },
  {
    question: "Who approves live integration or publication?",
    answer:
      "Publication approvals are granted independently by the DriverXtra partner governance and catalog safety team after all gate checks pass.",
  },
];

type InventoryFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: InventoryFaqItem[];
  defaultOpenIndex?: number | null;
  className?: string;
};

export default function InventoryFaqSection({
  id = "inventory-faq",
  eyebrow = "FAQ",
  title = "Inventory & Catalog Integrations questions",
  description,
  faqs = INVENTORY_FAQS,
  defaultOpenIndex = 0,
  className = "bg-white",
}: InventoryFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={`${container} grid gap-12 lg:grid-cols-12`}>
        {/* Left Side: Section Title */}
        <div className="lg:col-span-5">
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </div>

        {/* Right Side: Accordion FAQ Items */}
        <div className="space-y-3 lg:col-span-7">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.question} delay={Math.min(index, 6) * 30}>
                <div
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-slate-300 bg-white shadow-sm"
                      : "border-slate-200/80 bg-white hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between p-5 text-left"
                  >
                    <span className="pr-4 text-xs font-bold text-ink sm:text-sm">
                      {item.question}
                    </span>
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors duration-200 ${
                        isOpen
                          ? "bg-[#F5B400] text-ink"
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

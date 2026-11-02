"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type PartsFaqItem = {
  question: string;
  answer: ReactNode;
};

const PARTS_SELLER_FAQS: PartsFaqItem[] = [
  {
    question: "Who can apply to sell parts on DriverXtra?",
    answer:
      "Eligible automotive-parts businesses may be able to apply in supported markets. Eligibility depends on business type, product categories, required evidence and program availability. An application does not guarantee acceptance.",
  },
  {
    question: "Does signing up make my products live?",
    answer:
      "No. Completing the application submits your business and catalog information for review. Products only become live after business verification, catalog approval, and signed seller terms.",
  },
  {
    question: "Can a repair workshop also sell parts?",
    answer:
      "Yes. Workshops can apply for parts selling permissions, but parts seller onboarding and agreements are evaluated separately from service provider status.",
  },
  {
    question: "Do I need to be an OEM-authorized distributor?",
    answer:
      "Not necessarily. We accept applications from OEM distributors, independent aftermarket retailers, recyclers, and specialty component suppliers with proper provenance records.",
  },
  {
    question: "What product information will I need?",
    answer:
      "You will need manufacturer part numbers, product conditions, source claims, clear imagery rights, and accurate compatibility/fitment specifications.",
  },
  {
    question: "How do you check whether a part fits a vehicle?",
    answer:
      "Fitment is matched against verified vehicle database attributes. Unknown or incomplete fitment data is marked as 'not a match' to ensure buyer confidence.",
  },
  {
    question: "Can I sell used, refurbished or remanufactured parts?",
    answer:
      "Yes, provided the condition is explicitly declared and supported by appropriate provenance or refurbishment records where required.",
  },
  {
    question: "What about recalled or hazardous parts?",
    answer:
      "Restricted, hazardous, or recalled items are subject to specific safety policies and regulatory compliance reviews prior to catalog approval.",
  },
  {
    question: "Can I upload a product spreadsheet or connect my system?",
    answer:
      "Supported onboarding tracks allow batch catalog uploads via formatted CSV/spreadsheet templates or direct API integration for enterprise distributors.",
  },
  {
    question: "How often must I update inventory?",
    answer:
      "Sellers are responsible for keeping inventory and pricing up to date to prevent orders for out-of-stock items under agreed seller terms.",
  },
  {
    question: "How are selling fees determined?",
    answer:
      "Selling fees, platform charges, and payout arrangements depend on your category, operating market, and approved seller agreement.",
  },
  {
    question: "Who ships orders and handles returns?",
    answer:
      "Sellers fulfil orders directly from their stated locations and manage returns under the stated policy buyers view prior to purchase.",
  },
  {
    question: "Who provides product warranties?",
    answer:
      "Product warranties are provided by the manufacturer or seller as defined in your product listing and terms of sale.",
  },
  {
    question: "What happens if my application needs more documents?",
    answer:
      "Your application status will update to request additional information, with specific guidance on which business or product records are needed.",
  },
  {
    question: "Can staff work on the same seller account?",
    answer:
      "Yes. Organizations can assign role-based permissions to team members for managing catalog listings, orders, and business details.",
  },
  {
    question: "How do I know whether my catalog has been approved?",
    answer:
      "You will receive notification status updates in your dashboard for individual SKU items and overall catalog review progress.",
  },
  {
    question: "What if my business is suspended or I dispute a decision?",
    answer:
      "Sellers can submit an inquiry or appeal through the Seller Support portal for review by our operations team.",
  },
  {
    question: "What happens to my information if I stop onboarding?",
    answer:
      "Incomplete applications and uploaded verification documents remain private and are handled according to our privacy and data retention policy.",
  },
];

type BecomeAPartsSellerFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: PartsFaqItem[];
  defaultOpenIndex?: number | null;
  className?: string;
};

export default function BecomeAPartsSellerFaqSection({
  id,
  eyebrow = "FAQ",
  title = "Become a Parts Seller questions",
  description = "Proposed answers, pending legal and market review.",
  faqs = PARTS_SELLER_FAQS,
  defaultOpenIndex = 0,
  className = "bg-[#F6F8FB]",
}: BecomeAPartsSellerFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={`${container} grid gap-12 lg:grid-cols-12`}>
        {/* Left Side: Title & Info Header */}
        <div className="lg:col-span-5">
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </div>

        {/* Right Side: Accordion FAQ List */}
        <div className="space-y-3 lg:col-span-7">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.question} delay={Math.min(index, 6) * 30}>
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
                    aria-expanded={isOpen}
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

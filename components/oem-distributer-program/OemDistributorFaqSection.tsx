"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type OemFaqItem = {
  question: string;
  answer: ReactNode;
};

const OEM_DISTRIBUTOR_FAQS: OemFaqItem[] = [
  {
    question: "Who is this program intended for?",
    answer:
      "The program is designed for manufacturers, brand owners, distributors and eligible importers who can substantiate the capacity in which they supply automotive products. Acceptance depends on market eligibility, current evidence and program review. Ordinary parts resellers should use Become a Parts Seller unless they also have verifiable manufacturer or distributor authority.",
  },
  {
    question: "Does applying make us an official DriverXtra OEM partner?",
    answer:
      "No. Completing the application submits your organization and rights documentation for review. Official partnership status is granted only after verification and approved agreements.",
  },
  {
    question: "Can an authorized distributor apply without owning the brand?",
    answer:
      "Yes. Authorized distributors can apply by providing documentation naming the rights holder and defining their authorized distribution scope.",
  },
  {
    question: "Can an importer qualify as a distributor?",
    answer:
      "Importers and regional channel partners can apply under dedicated supply roles, subject to market and channel rights verification.",
  },
  {
    question: "What business documents are required?",
    answer:
      "You will need registered business identity, authorized signatory details, and commercial or legal documentation verifying your manufacturing, distribution, or import capacity.",
  },
  {
    question: "How do you verify manufacturer or brand rights?",
    answer:
      "Rights are assessed across multiple dimensions including brand ownership, product categories, geographic territories, and permitted sales channels.",
  },
  {
    question: "Can we apply for more than one brand?",
    answer:
      "Yes. Organizations managing multi-brand portfolios can declare and substantiate rights for multiple brands during onboarding.",
  },
  {
    question: "What if our authorization is limited to certain countries?",
    answer:
      "Rights are evaluated and scoped strictly by territory. Your catalog privileges will apply only within your verified markets.",
  },
  {
    question: "Can sub-distributors participate?",
    answer:
      "Sub-distributors must provide verifiable documentation showing direct authorization and supply rights from the primary brand owner or authorized rights holder.",
  },
  {
    question: "Does verifying our business make all products publishable?",
    answer:
      "No. Catalog publishing requires both verified organizational rights and active, confirmed scope for each specific product line.",
  },
  {
    question: "Can we list original, aftermarket and remanufactured products?",
    answer:
      "Product eligibility depends on your approved rights scope and category authorizations.",
  },
  {
    question: "What data or catalog integrations are supported?",
    answer:
      "Enterprise distributors can connect via structured inventory spreadsheets or automated API catalog integrations depending on their program tier.",
  },
  {
    question: "How are recalls and product safety handled?",
    answer:
      "Recalls and safety notices follow a rigorous documented compliance process, requiring immediate updates to affected catalog scopes.",
  },
  {
    question:
      "Are program fees, commissions or minimum purchase commitments fixed?",
    answer:
      "No. Commercial terms, fees, and payout arrangements depend entirely on your specific role, confirmed rights scope, and operating market.",
  },
  {
    question: "Who handles delivery, returns and warranty obligations?",
    answer:
      "Fulfillment, shipping, returns, and warranty terms are managed under your approved commercial partner agreement.",
  },
  {
    question: "Can our brand appear on a public partner directory?",
    answer:
      "Public directory listings and brand badging are governed by specific partnership tier rules and verified brand ownership.",
  },
  {
    question: "What happens when a distribution agreement expires or changes?",
    answer:
      "Rights are versioned and tracked. Expired evidence or documentation changes will pause the affected catalog scope until renewed.",
  },
  {
    question: "How do we get help with an application or decision?",
    answer:
      "You can submit inquiries or formal appeals through your partner support portal for review by our operations team.",
  },
];

type OemDistributorFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: OemFaqItem[];
  defaultOpenIndex?: number | null;
  className?: string;
};

export default function OemDistributorFaqSection({
  id,
  eyebrow = "FAQ",
  title = "OEM & Distributor Program questions",
  description = "Proposed answers, pending legal and market review.",
  faqs = OEM_DISTRIBUTOR_FAQS,
  defaultOpenIndex = 0,
  className = "bg-[#F6F8FB]",
}: OemDistributorFaqSectionProps) {
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
                  className={`rounded-2xl border transition-all bg-[#F6F8FB] duration-300 ${
                    isOpen
                      ? "border-slate-300 shadow-sm"
                      : "border-slate-200/80 hover:border-slate-300"
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

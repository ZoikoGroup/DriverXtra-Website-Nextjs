"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type VerificationFaqItem = {
  question: string;
  answer: ReactNode;
};

const VERIFICATION_FAQS: VerificationFaqItem[] = [
  {
    question: "What does verification mean on DriverXtra?",
    answer:
      "A verification signal describes a specific check for a specified person, business, activity or item, where that check is supported. Review the detail for its scope and the date it was evaluated. It is not a general safety or quality guarantee.",
  },
  {
    question: "Are all buyers, sellers and listings verified?",
    answer:
      "No. Verification checks apply selectively based on account type, market region, and completed checks. Absence of a signal simply means no completed check is recorded.",
  },
  {
    question: "Does a verified seller mean a vehicle is safe to purchase?",
    answer:
      "No. Seller verification evaluates business or identity attributes, not mechanical condition, vehicle safety, or roadworthiness.",
  },
  {
    question: "Does a verified parts seller mean every part is genuine?",
    answer:
      "No. Entity-level verification does not guarantee the authenticity or provenance of individual parts or inventory items.",
  },
  {
    question: "What information might be reviewed?",
    answer:
      "Depending on the check scope, reviews may include registered business identity, operating authority, location evidence, or official register data.",
  },
  {
    question: "Can a verification result change?",
    answer:
      "Yes. Signals expire on set dates, undergo periodic re-review, or may be revoked/withdrawn if supporting evidence changes.",
  },
  {
    question: 'What does "In review" mean?',
    answer:
      "An assessment is currently underway. No final verification status or outcome is implied while in this state.",
  },
  {
    question: "What if a source cannot be checked?",
    answer:
      'The status displays as "Source unavailable" to indicate that the external authority or register could not be reached at evaluation time.',
  },
  {
    question: 'What does "Not evaluated" mean?',
    answer:
      "It means no applicable completed check has been conducted or recorded for that specific attribute.",
  },
  {
    question: "Is a verification indicator an endorsement?",
    answer:
      "No. Verification indicators confirm only that factual claims met specific criteria at a given date—not an endorsement or financial guarantee.",
  },
  {
    question: "Can I see documents used in another person's review?",
    answer:
      "No. Submitted identity documents and internal reviewer notes remain strictly private. Public pages display only approved attribute claims.",
  },
  {
    question: "How do I check the scope of a signal?",
    answer:
      "Click on any signal reference code (e.g. DX-DEMO-1001) to open its explanation card showing exact attribute, market, and evaluation date.",
  },
  {
    question: "How do I correct my own verification information?",
    answer:
      "Submit updated evidence or request re-evaluation through your account's verification management route in the partner portal.",
  },
  {
    question: "Can I appeal a decision?",
    answer:
      "Yes. If a check is rejected or revoked, account administrators can initiate a dispute or appeal route with updated documentation.",
  },
  {
    question: "Where do I report a misleading listing or badge?",
    answer:
      'Use the "Report a Listing" route to submit concerns about inaccurate claims or misapplied verification badges.',
  },
  {
    question: "Where do I report a suspected scam?",
    answer:
      'Use the "Report Fraud" route immediately if someone requests money, private credentials, or suspicious off-platform transactions.',
  },
  {
    question: "How long does a verification review take?",
    answer:
      "Review timelines vary by check type and market, typically taking 1 to 3 business days once all required evidence is submitted.",
  },
  {
    question: "Does verification replace other due diligence?",
    answer:
      "No. Always perform independent inspections, verify vehicle history, and follow recommended safety guidelines prior to completing any transaction.",
  },
];

type HowVerificationWorksFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: VerificationFaqItem[];
  defaultOpenIndex?: number | null;
  className?: string;
};

export default function HowVerificationWorksFaqSection({
  id = "how-verification-faq",
  eyebrow = "FAQ",
  title = "How Verification Works questions",
  description = "Proposed answers, pending market and legal review.",
  faqs = VERIFICATION_FAQS,
  defaultOpenIndex = 0,
  className = "bg-[#F6F8FB]",
}: HowVerificationWorksFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={`${container} grid gap-12 lg:grid-cols-12`}>
        {/* Left Side: Section Title & Description */}
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

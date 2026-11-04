"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type BuyerSafetyFaqItem = {
  question: string;
  answer: ReactNode;
};

const BUYER_SAFETY_FAQS: BuyerSafetyFaqItem[] = [
  {
    question: "Does a verified badge mean a seller is safe?",
    answer:
      "No. A verification signal may cover only particular information at a particular time. It does not guarantee how someone will act or that a listing, item or transaction is legitimate. Review the scope and date of the check and perform the other relevant steps.",
  },
  {
    question: "How can I check whether a vehicle listing is genuine?",
    answer:
      "Cross-examine photos, descriptions, and pricing against independent market data. Confirm that seller contact details remain consistent and verify physical ownership documents upon inspection.",
  },
  {
    question: "Does a vehicle inspection prove the seller owns it?",
    answer:
      "No. Mechanical or condition inspections assess physical attributes only. Ownership, title, and finance clearances must be verified separately through authoritative registry records.",
  },
  {
    question: "What should I do before paying a deposit?",
    answer:
      "Verify payee identity, confirm deposit policies in writing, and ensure key listing details remain consistent. Never send funds under high-pressure tactics or unexpected account detail changes.",
  },
  {
    question: "Are payments on DriverXtra protected?",
    answer:
      "Payment terms and protections depend on the selected provider or checkout route. Review the payment provider's explicit coverage policy prior to completing transactions.",
  },
  {
    question: "Is it safe to pay outside the platform?",
    answer:
      "Off-platform payments carry significant risk and bypass built-in verification safeguards. Always use approved, trackable payment methods.",
  },
  {
    question: "How do I plan a safer inspection or test drive?",
    answer:
      "Arrange meetings during daylight in public or secure locations, bring someone you trust, verify driver insurance permissions, and keep test routes planned.",
  },
  {
    question: "What if the seller wants me to move to another messaging app?",
    answer:
      "Be cautious. Moving off-platform is a common warning sign used to bypass safety logging and intake reporting tools.",
  },
  {
    question: "How can I evaluate parts authenticity?",
    answer:
      "Inspect OEM part numbers, packaging seals, brand distributor verification signals, and request source or fitment documentation prior to purchase.",
  },
  {
    question: "Does a compatible-part label guarantee fitment?",
    answer:
      "No. Compatibility references serve as helpful guidance. Always verify exact part numbers against your vehicle's specific trim, model year, and VIN.",
  },
  {
    question: "What if I suspect a counterfeit or recalled part?",
    answer:
      "Do not install the item. Report the listing via the designated intake route and check official manufacturer recall databases.",
  },
  {
    question:
      "What should I do if someone asks for my one-time code or password?",
    answer:
      "Never share passwords, credentials, or one-time codes with anyone. DriverXtra personnel will never ask for your private authentication codes.",
  },
  {
    question: "How do I report a suspicious listing?",
    answer:
      "Click 'Report a Listing' directly from the page or use the concern route to submit listing references and evidence to our moderation team.",
  },
  {
    question: "How do I report suspected fraud?",
    answer:
      "Utilize the 'Report Fraud' intake channel immediately if an account requests off-platform payments, unexpected deposits, or credential sharing.",
  },
  {
    question: "Can DriverXtra refund a payment or recover money?",
    answer:
      "DriverXtra does not hold transaction funds directly. Disputes and refunds must be processed through your payment provider or financial institution.",
  },
  {
    question: "What if a verification check is expired or unavailable?",
    answer:
      "Treat unverified or stale attributes as non-current. Request updated evidence directly from the seller before relying on old status signals.",
  },
  {
    question: "Can I use this guide without an account?",
    answer:
      "Yes. All buyer safety guides, interactive checklists, and verification explanations are fully accessible without registration.",
  },
  {
    question: "Are the same rules and services available everywhere?",
    answer:
      "Verification availability, legal registers, and intake policies vary by geographic region and local legal framework.",
  },
];

type BuyerSafetyFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: BuyerSafetyFaqItem[];
  defaultOpenIndex?: number | null;
  className?: string;
};

export default function BuyerSafetyFaqSection({
  id = "buyer-safety-faq",
  eyebrow = "FAQ",
  title = "Buyer Safety questions",
  description = "Proposed answers, pending market and legal review. Not legal advice.",
  faqs = BUYER_SAFETY_FAQS,
  defaultOpenIndex = 0,
  className = "bg-white",
}: BuyerSafetyFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={`${container} grid gap-12 lg:grid-cols-12`}>
        {/* Left Side: Section Title & Disclaimer */}
        <div className="lg:col-span-5">
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </div>

        {/* Right Side: Accordion List */}
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

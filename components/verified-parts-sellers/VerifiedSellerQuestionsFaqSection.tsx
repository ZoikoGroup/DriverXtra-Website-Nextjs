"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type VerifiedSellerFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_VERIFIED_SELLER_FAQS: VerifiedSellerFaqItem[] = [
  {
    id: "what-does-verified-parts-seller-mean",
    question: 'What does "Verified Parts Seller" mean?',
    answer:
      "It can only mean that DriverXtra completed the specific checks described in its published, current program criteria. The precise checks are not evidenced yet, so an active label must not appear until the policy and supporting assessments are approved.",
  },
  {
    id: "does-verification-guarantee-that-every-part-is-genuine",
    question: "Does verification guarantee that every part is genuine?",
    answer:
      "No. Seller verification covers the published seller-level checks—not individual part authenticity, which is not part of general seller verification.",
  },
  {
    id: "does-it-mean-a-part-fits-my-vehicle",
    question: "Does it mean a part fits my vehicle?",
    answer:
      "No. Verification does not confirm vehicle fitment, trim compatibility, or coding/calibration requirements for your specific vehicle.",
  },
  {
    id: "does-it-mean-the-seller-is-authorized-by-a-brand",
    question: "Does it mean the seller is authorized by a brand?",
    answer:
      "Not automatically. Manufacturer authorization is a separate check for a named brand, period, and category only, where applicable.",
  },
  {
    id: "does-it-guarantee-refunds-or-safe-payments",
    question: "Does it guarantee refunds or safe payments?",
    answer:
      "No. Seller verification does not guarantee refunds, dispute outcomes, or payment protection; always follow payment provider guidance and review applicable terms.",
  },
  {
    id: "how-can-i-check-what-was-reviewed",
    question: "How can I check what was reviewed?",
    answer:
      "Each verification status refers to the specific checks listed in the published criteria along with the recorded check date when available.",
  },
  {
    id: "why-can-i-not-see-a-verified-label-for-a-seller",
    question: "Why can I not see a verified label for a seller?",
    answer:
      "A seller may be listed without a current verified label because a check is under review, out of date, pending, or not yet published—that alone is not a finding against the seller.",
  },
  {
    id: "what-happens-if-verification-expires",
    question: "What happens if verification expires?",
    answer:
      "When verification information is no longer current, the active verified label is not shown until a recheck is completed; an out-of-date check does not automatically imply wrongdoing.",
  },
  {
    id: "can-a-seller-pay-to-become-verified",
    question: "Can a seller pay to become 'verified'?",
    answer:
      "Verification status reflects completed checks against published criteria rather than paid placement or ranking.",
  },
  {
    id: "how-do-i-report-a-suspicious-seller",
    question: "How do I report a suspicious seller?",
    answer:
      "Use the private seller concern reporting action so the team can review the details; if you have lost money, contact your bank or payment provider first.",
  },
  {
    id: "what-if-the-reporting-form-is-not-working",
    question: "What if the reporting form is not working?",
    answer:
      "If a form or submission control is unavailable—such as in a prototype or during a temporary issue—retry later or reach out through the available support channel.",
  },
  {
    id: "can-i-view-the-sellers-registration-documents",
    question: "Can I view the seller's registration documents?",
    answer:
      "Underlying business registration documents or private verification records are not necessarily published in full due to privacy, confidentiality, and data-protection rules.",
  },
  {
    id: "do-seller-reviews-prove-verification",
    question: "Do seller reviews prove verification?",
    answer:
      "No. Customer feedback or ratings are separate from completed verification checks and do not replace published check status.",
  },
  {
    id: "can-a-seller-ask-to-correct-inaccurate-information",
    question: "Can a seller ask to correct inaccurate information?",
    answer:
      "Yes. Sellers can request corrections through the private seller workflow so accurate business details can be reviewed and updated.",
  },
  {
    id: "how-can-a-seller-appeal-a-decision",
    question: "How can a seller appeal a decision?",
    answer:
      "Corrections and status appeals are handled privately with the seller rather than in a public thread.",
  },
  {
    id: "is-verification-the-same-in-every-country",
    question: "Is verification the same in every country?",
    answer:
      "Business registration structures, trading rules, and market requirements can vary by country or jurisdiction, so checks and applicability may differ by market.",
  },
  {
    id: "are-there-legal-rules-about-marketplace-seller-information",
    question: "Are there legal rules about marketplace seller information?",
    answer:
      "Yes. Marketplaces and commercial listings are subject to applicable consumer protection, trader disclosure, and regulatory rules in relevant jurisdictions.",
  },
  {
    id: "how-current-is-the-seller-information",
    question: "How current is the seller information?",
    answer:
      "Currency depends on when each check was recorded and whether sample or reference entries are displayed; always check the status date and treat prototype items as illustrative.",
  },
];

type VerifiedSellerQuestionsFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: VerifiedSellerFaqItem[];
  className?: string;
};

export default function VerifiedSellerQuestionsFaqSection({
  id = "verified-seller-questions-faq",
  eyebrow = "FAQ",
  title = "Verified seller questions",
  description,
  faqs = DEFAULT_VERIFIED_SELLER_FAQS,
  className = "bg-white",
}: VerifiedSellerQuestionsFaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(
    "what-does-verified-parts-seller-mean",
  );

  const toggleFaq = (faqId: string) => {
    setOpenId((prev) => (prev === faqId ? null : faqId));
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Sticky Eyebrow & Title */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <SectionTitle
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
          </div>

          {/* Right Column: Clean Divider Accordion List */}
          <div className="divide-y divide-slate-200/80 border-b border-slate-200/80 lg:col-span-8">
            {faqs.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <Reveal key={faq.id} delay={index * 15}>
                  <div className="py-5 first:pt-0">
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <span
                        className={`text-xs font-bold sm:text-sm ${
                          isOpen ? "text-ink" : "text-slate-800 hover:text-ink"
                        }`}
                      >
                        {faq.question}
                      </span>

                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors ${
                          isOpen
                            ? "bg-[#F5B400] text-ink shadow-2xs"
                            : "border border-slate-200 bg-slate-50/70 text-slate-500 hover:bg-slate-100"
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
                      <p className="mt-3 pr-10 text-xs leading-relaxed text-slate-500 sm:text-sm">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

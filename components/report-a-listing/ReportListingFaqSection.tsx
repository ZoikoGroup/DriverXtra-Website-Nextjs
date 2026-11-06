"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type ReportFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_REPORT_FAQS: ReportFaqItem[] = [
  {
    id: "kinds-of-listings",
    question: "What kinds of listings can I report?",
    answer:
      "Use this form to flag concerns about vehicle, parts or service listings in supported markets. Available categories must reflect the applicable reporting policy.",
  },
  {
    id: "need-to-sign-in",
    question: "Do I need to sign in?",
    answer:
      "Signing in helps us verify your account and provide direct status updates, though public reporting pathways may be available depending on policy.",
  },
  {
    id: "no-longer-visible",
    question: "Can I report a listing that is no longer visible?",
    answer:
      "Yes, you can report historical or cached listings if you have the original listing reference ID or transaction details.",
  },
  {
    id: "automatically-remove",
    question: "Does a report automatically remove the listing?",
    answer:
      "No. Reports are queued for manual or automated policy review to ensure fairness before any administrative action is taken.",
  },
  {
    id: "seller-see-identity",
    question: "Will the seller see my identity?",
    answer:
      "Reports are processed confidentially. Your personal contact details and identity are not shared with the reported listing owner.",
  },
  {
    id: "evidence-should-provide",
    question: "What evidence should I provide?",
    answer:
      "Clear screenshots, communication dates, and official reference numbers are most helpful. Avoid sharing sensitive payment card numbers.",
  },
  {
    id: "know-report-received",
    question: "How will I know my report was received?",
    answer:
      "You will receive a unique report reference code (e.g. RL-XXXXXX) upon submission, along with a confirmation notice.",
  },
  {
    id: "report-payment-scam",
    question: "Can I report a payment scam?",
    answer:
      "For financial scams, fake payment links, or account impersonation, please use the Report Fraud portal for prioritized handling.",
  },
  {
    id: "immediate-danger",
    question: "What if someone is in immediate danger?",
    answer:
      "If there is an urgent threat to personal safety or physical security, contact local law enforcement authorities immediately.",
  },
  {
    id: "suspected-counterfeit-part",
    question: "Can I report a suspected counterfeit part?",
    answer:
      "Yes. Select the Parts provenance or counterfeit concern category and upload supporting photos or serial details.",
  },
  {
    id: "add-information-after-submit",
    question: "Can I add information after I submit?",
    answer:
      "You can reference your original report ID when contacting support to provide supplementary non-sensitive details.",
  },
  {
    id: "correct-or-withdraw-report",
    question: "Can I correct or withdraw my report?",
    answer:
      "Reach out through official platform support with your report reference number if you filed a report by mistake.",
  },
  {
    id: "exact-enforcement-action",
    question: "Will I be told the exact enforcement action?",
    answer:
      "Due to privacy laws and platform review policies, specific disciplinary actions taken against accounts may remain confidential.",
  },
  {
    id: "reported-wrong-listing",
    question: "What if I reported the wrong listing?",
    answer:
      "Inform support promptly with your reference number so the incorrect flag can be dismissed without affecting the seller.",
  },
  {
    id: "listing-was-verified",
    question: "What if the listing was verified?",
    answer:
      "Verified listings can still be flagged if new discrepancies, inaccurate descriptions, or policy violations occur after verification.",
  },
  {
    id: "seller-challenge-decision",
    question: "Can a seller challenge a decision?",
    answer:
      "Yes, sellers have access to an official appeal workflow under Disputes & Appeals if they believe a decision was made in error.",
  },
  {
    id: "guarantee-refund-compensation",
    question: "Does reporting guarantee a refund or compensation?",
    answer:
      "Reporting assists in platform moderation but does not automatically issue financial refunds or settle legal disputes.",
  },
  {
    id: "who-reviews-how-quickly",
    question: "Who reviews my report and how quickly?",
    answer:
      "Reports are processed by dedicated Trust & Safety specialists, prioritized by severity and potential harm.",
  },
];

type ReportListingFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: ReportFaqItem[];
  className?: string;
};

export default function ReportListingFaqSection({
  id = "faq",
  eyebrow = "FAQ",
  title = "Report a Listing questions",
  description = "Proposed answers, pending policy approval.",
  faqs = DEFAULT_REPORT_FAQS,
  className = "bg-white",
}: ReportListingFaqSectionProps) {
  // First item open by default matching design
  const [openId, setOpenId] = useState<string | null>("kinds-of-listings");

  const toggleFaq = (faqId: string) => {
    setOpenId(openId === faqId ? null : faqId);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Sticky Header & Description */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#F5B400]" />
              <span className="text-xs font-bold tracking-wider text-amber-600 uppercase">
                {eyebrow}
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {title}
            </h2>

            {description && (
              <p className="mt-3 text-xs leading-relaxed text-slate-500 sm:text-sm">
                {description}
              </p>
            )}
          </div>

          {/* Right Column: Accordion List */}
          <div className="space-y-3 lg:col-span-8">
            {faqs.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <Reveal key={faq.id} delay={index * 20}>
                  <div
                    onClick={() => toggleFaq(faq.id)}
                    className={`group cursor-pointer rounded-2xl border bg-white transition-all duration-300 ${
                      isOpen
                        ? "border-slate-300 shadow-xs"
                        : "border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    {/* Accordion Header Row */}
                    <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
                      <h3
                        className={`text-xs font-bold sm:text-sm ${
                          isOpen ? "text-ink font-extrabold" : "text-slate-700"
                        }`}
                      >
                        {faq.question}
                      </h3>

                      {/* Amber Toggle Button */}
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors ${
                          isOpen
                            ? "bg-[#F5B400] text-ink shadow-2xs"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {isOpen ? (
                          <X className="h-3.5 w-3.5 stroke-[2.5]" />
                        ) : (
                          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                        )}
                      </span>
                    </div>

                    {/* Expanded Answer Content */}
                    {isOpen && (
                      <div className="border-t border-slate-100 px-5 pb-6 pt-4 sm:px-6">
                        <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                          {faq.answer}
                        </p>
                      </div>
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

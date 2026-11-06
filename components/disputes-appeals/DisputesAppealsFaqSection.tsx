"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type DisputeFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_DISPUTE_FAQS: DisputeFaqItem[] = [
  {
    id: "difference-dispute-appeal",
    question: "What is the difference between a dispute and an appeal?",
    answer:
      "A dispute generally concerns a disagreement about a transaction or service. An appeal asks for review of an eligible decision already made under an applicable policy. The route available depends on the issue, your role and the market.",
  },
  {
    id: "report-suspected-fraud-here",
    question: "Can I report suspected fraud here?",
    answer:
      "For scams, fake payment proof, or account takeover, please use the Report Fraud portal for prioritized handling.",
  },
  {
    id: "challenge-misleading-listing",
    question: "Can I challenge a misleading listing?",
    answer:
      "Misleading listing details should be flagged via Report a Listing unless you are the affected seller appealing an active enforcement decision.",
  },
  {
    id: "automatically-get-refund",
    question: "Will I automatically get a refund?",
    answer:
      "No. Resolution depends on policy rules, verified evidence, and whether payment processors or banks issue funds back.",
  },
  {
    id: "how-do-i-know-eligible",
    question: "How do I know if I am eligible?",
    answer:
      "Eligibility depends on your standing as an involved party, the applicable market policy, and adherence to timeframes.",
  },
  {
    id: "is-there-a-deadline",
    question: "Is there a deadline to file?",
    answer:
      "Yes. Deadlines are determined by the specific policy governing your case type and transaction date.",
  },
  {
    id: "need-driverxtra-account",
    question: "Do I need a DriverXtra account?",
    answer:
      "An active account matching the transaction or case is required to verify identity and securely track status.",
  },
  {
    id: "what-information-should-provide",
    question: "What information should I provide?",
    answer:
      "Provide clear reference codes, transaction timestamps, objective descriptions, and relevant non-sensitive screenshots.",
  },
  {
    id: "will-other-party-see-complaint",
    question: "Will the other party see my complaint?",
    answer:
      "Relevant details necessary for a fair response are shared securely, but private reviewer notes and sensitive personal details remain confidential.",
  },
  {
    id: "what-happens-after-submit",
    question: "What happens after I submit?",
    answer:
      "Your submission is assigned a reference ID, triaged by Trust & Safety specialists, and evaluated against policy criteria.",
  },
  {
    id: "can-other-party-respond",
    question: "Can the other party respond?",
    answer:
      "Yes, when required for fairness and policy due process, the opposing party is given an opportunity to provide a statement.",
  },
  {
    id: "what-if-made-mistake",
    question: "What if I made a mistake in my report?",
    answer:
      "Contact platform support promptly quoting your case reference number to clarify or supplement your initial filing.",
  },
  {
    id: "what-if-submission-status-unknown",
    question: "What if my submission status is unknown?",
    answer:
      "Use your case reference code in the status checker widget on this page or reach out to support for updates.",
  },
  {
    id: "can-i-appeal-any-decision",
    question: "Can I appeal any decision?",
    answer:
      "Appeals are restricted to eligible platform decisions under formal policy; not all actions include a secondary review right.",
  },
  {
    id: "who-reviews-an-appeal",
    question: "Who reviews an appeal?",
    answer:
      "Appeals are evaluated by senior Trust & Safety review teams separate from the original decision-maker.",
  },
  {
    id: "will-receive-response-24h",
    question: "Will I receive a response within 24 hours?",
    answer:
      "Review times vary based on case complexity, volume, and required evidence verification.",
  },
  {
    id: "does-internal-appeal-affect-legal-rights",
    question: "Does an internal appeal affect my legal rights?",
    answer:
      "Platform dispute resolution is an internal administrative process and does not waive your independent statutory or legal rights.",
  },
  {
    id: "can-closed-case-ever-be-reviewed-again",
    question: "Can a closed case ever be reviewed again?",
    answer:
      "Closed cases are final unless significant new verifiable evidence is submitted within allowable policy time limits.",
  },
];

type DisputesAppealsFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: DisputeFaqItem[];
  className?: string;
};

export default function DisputesAppealsFaqSection({
  id = "faq",
  eyebrow = "FAQ",
  title = "Disputes & Appeals questions",
  description = "Proposed answers, pending policy and legal approval.",
  faqs = DEFAULT_DISPUTE_FAQS,
  className = "bg-white",
}: DisputesAppealsFaqSectionProps) {
  // First item open by default matching screenshot
  const [openId, setOpenId] = useState<string | null>(
    "difference-dispute-appeal",
  );

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

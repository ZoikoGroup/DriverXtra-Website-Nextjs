"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type FraudFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_FRAUD_FAQS: FraudFaqItem[] = [
  {
    id: "what-should-i-report-as-fraud",
    question: "What should I report as fraud?",
    answer:
      "Report suspected impersonation, compromised accounts, fake payments, phishing, suspicious requests for money or related scams. If the problem is only a misleading listing description, use Report a Listing instead[cite: 15].",
  },
  {
    id: "do-i-need-an-account",
    question: "Do I need an account?",
    answer:
      "Having an account helps link your report securely and provides status updates, though certain reporting options can be submitted with verified contact details.",
  },
  {
    id: "can-i-report-fraud-without-losing-money",
    question: "Can I report fraud without losing money?",
    answer:
      "Yes. If you spot a suspicious scam attempt, fake payment request, or account takeover before funds are transferred, you should report it immediately.",
  },
  {
    id: "is-this-an-emergency-help-service",
    question: "Is this an emergency help service?",
    answer:
      "No. If you or someone else is in immediate physical danger or facing an urgent threat, please contact local law enforcement authorities right away.",
  },
  {
    id: "can-driverxtra-recover-my-money",
    question: "Can DriverXtra recover my money?",
    answer:
      "DriverXtra investigates platform fraud and secures accounts, but financial recovery typically depends on your bank, payment provider, or legal authorities.",
  },
  {
    id: "does-a-report-prove-fraud",
    question: "Does a report prove fraud?",
    answer:
      "A report initiates an investigation by our Trust & Safety team. It provides necessary flags and evidence for professional review.",
  },
  {
    id: "what-evidence-is-useful",
    question: "What evidence is useful?",
    answer:
      "Clear screenshots of chat histories, transaction reference numbers, fake payment receipts, and profile details help accelerate review.",
  },
  {
    id: "will-the-other-person-see-my-details",
    question: "Will the other person see my details?",
    answer:
      "No. Reports are handled confidentially and your personal contact information is never shared with the accused party.",
  },
  {
    id: "what-if-i-reported-the-wrong-listing-or-person",
    question: "What if I reported the wrong listing or person?",
    answer:
      "Contact support promptly with your report reference number so our review team can correct the record.",
  },
  {
    id: "how-can-i-check-my-report",
    question: "How can I check my report?",
    answer:
      "You can enter your unique report reference number (e.g., FR-XXXXXX) into the status checker on our portal.",
  },
  {
    id: "why-did-my-report-not-get-a-confirmation",
    question: "Why did my report not get a confirmation?",
    answer:
      "Check your spam folder or verify that your contact email was entered correctly. You can also re-submit if needed.",
  },
  {
    id: "will-a-seller-be-removed-immediately",
    question: "Will a seller be removed immediately?",
    answer:
      "Accounts undergo a mandatory review process to ensure fairness and accuracy before any suspension or removal takes place.",
  },
  {
    id: "what-if-my-account-was-taken-over",
    question: "What if my account was taken over?",
    answer:
      "Secure your email password immediately, reset your credentials, and submit an urgent Account Takeover report.",
  },
  {
    id: "can-i-report-a-fake-parts-seller",
    question: "Can I report a fake parts seller?",
    answer:
      "Yes. Select the parts purchase or delivery scam category and provide relevant invoices and communication links.",
  },
  {
    id: "can-i-upload-a-suspicious-link",
    question: "Can I upload a suspicious link?",
    answer:
      "Yes, you can paste phishing URLs or suspicious payment links safely within the evidence section of your report.",
  },
  {
    id: "will-i-receive-an-update",
    question: "Will I receive an update?",
    answer:
      "Major status changes regarding your report are sent to your registered notification center or email address.",
  },
  {
    id: "can-i-withdraw-my-report",
    question: "Can I withdraw my report?",
    answer:
      "If you resolved an issue or filed by mistake, you can request a withdrawal by referencing your report ID through support.",
  },
  {
    id: "how-do-i-dispute-a-platform-decision",
    question: "How do I dispute a platform decision?",
    answer:
      "If you disagree with an enforcement outcome, you can submit an appeal through the Disputes & Appeals portal.",
  },
];

type ReportFraudFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: FraudFaqItem[];
  className?: string;
};

export default function ReportFraudFaqSection({
  id = "faq",
  eyebrow = "FAQ",
  title = "Report Fraud questions",
  description = "Proposed answers, pending legal and privacy approval.",
  faqs = DEFAULT_FRAUD_FAQS,
  className = "bg-[#F6F8FB]",
}: ReportFraudFaqSectionProps) {
  // First item open by default matching design
  const [openId, setOpenId] = useState<string | null>(
    "what-should-i-report-as-fraud",
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
                    className={`group cursor-pointer rounded-2xl border bg-[#F6F8FB] transition-all duration-300 ${
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

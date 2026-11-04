"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type SecurityFaqItem = {
  question: string;
  answer: ReactNode;
};

const SECURITY_FAQS: SecurityFaqItem[] = [
  {
    question: "Do I need an account to read this guidance?",
    answer:
      "General approved security and integration guidance should be public. Partner-restricted documents require verified eligibility and sign-in[cite: 14].",
  },
  {
    question: "Does this page mean DriverXtra offers live API keys?",
    answer:
      "No. This guidance outlines security standards and access workflows. Live credentials are provisioned only after successful verification and onboarding.",
  },
  {
    question: "What information should never appear in a support request?",
    answer:
      "Never share raw secrets, private keys, passwords, payment data, or personal identifiable information (PII) in support messages.",
  },
  {
    question: "Who is responsible for securing my integration?",
    answer:
      "Security is a shared responsibility. DriverXtra secures platform endpoints and token generation, while your organization is responsible for least-privilege role assignment, secure secret storage, and request validation.",
  },
  {
    question: "How are application permissions selected?",
    answer:
      "Permissions are requested based on specific operational needs and are subject to organization approval per scope[cite: 14].",
  },
  {
    question: "How do I store credentials safely?",
    answer:
      "Always store credentials in a dedicated secrets manager — never embed them in source code, repositories, or browser storage.",
  },
  {
    question: "Can a lost secret be shown again?",
    answer:
      "No. Secrets are displayed only once upon generation. If a secret is lost, you must rotate it through your partner dashboard.",
  },
  {
    question: "When should I rotate or revoke a credential?",
    answer:
      "Rotate credentials periodically or immediately if unauthorized access or exposure is suspected.",
  },
  {
    question: "Are sandbox and production interchangeable?",
    answer:
      "No. Non-production and production credentials, data, and callbacks must be kept strictly separated.",
  },
  {
    question: "How do I verify a webhook?",
    answer:
      "Verify delivery signatures against the published contract before processing, and bound your replay windows.",
  },
  {
    question: "May I accept any user-entered callback URL?",
    answer:
      "No. Callbacks must be explicitly registered and validated against approved organizational endpoints.",
  },
  {
    question: "Are fixed rate limits guaranteed?",
    answer:
      "Rate limits depend on your confirmed tier, operating market, and service level agreement.",
  },
  {
    question: "How can I report a suspected security vulnerability?",
    answer:
      "Use our approved private security reporting channel to submit vulnerability details securely without public disclosure[cite: 14].",
  },
  {
    question: "Does sending a report confirm an incident?",
    answer:
      "No. Submitting a report initiates a private triage and review process by our security team.",
  },
  {
    question: "Does DriverXtra hold a particular certification?",
    answer:
      "Compliance certifications and alignment standards are detailed in specific partner governance agreements.",
  },
  {
    question: "Can I access another organization's configuration?",
    answer:
      "No. Strict tenant isolation prevents cross-organization access to configurations, keys, and catalogs.",
  },
  {
    question: "How can I tell whether guidance is current?",
    answer:
      "All guidance pages display version identifiers and last-updated timestamps tied to official release documentation.",
  },
  {
    question: "How can I request partner-only security details?",
    answer:
      "Partner-restricted documentation and deep technical specifications require active program enrollment and authenticated review.",
  },
];

type SecurityFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: SecurityFaqItem[];
  defaultOpenIndex?: number | null;
  className?: string;
};

export default function SecurityFaqSection({
  id,
  eyebrow = "FAQ",
  title = "Security & Integration Guidance questions",
  description,
  faqs = SECURITY_FAQS,
  defaultOpenIndex = 0,
  className = "bg-white",
}: SecurityFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={`${container} grid gap-12 lg:grid-cols-12`}>
        {/* Left Side: Title Header */}
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
                      ? "border-slate-300 bg-slate-50/60 shadow-sm"
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

"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type FaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_FAQ_ITEMS: FaqItem[] = [
  {
    id: "genuine-oem",
    question: 'What does "genuine OEM" mean?',
    answer:
      "It is a specific manufacturing-origin claim. The meaning and supporting evidence must be checked for the particular part, manufacturer, market and seller; a generic logo is not enough[cite: 9].",
  },
  {
    id: "oes-part",
    question: "Is an OES part always the same as a manufacturer-branded part?",
    answer:
      "OES parts are made by original equipment suppliers, but they may not carry manufacturer branding or be identical to the specific packaged OEM component.",
  },
  {
    id: "aftermarket-counterfeit",
    question: "Are all aftermarket parts counterfeit?",
    answer:
      "No. Authorized and unlicensed aftermarket parts are third-party components that may be entirely lawful depending on the market and branding claims made.",
  },
  {
    id: "verified-seller",
    question: "Does a verified seller sell only genuine parts?",
    answer:
      "Seller verification confirms identity and commercial status, but each individual part listing must still be evaluated based on its specific evidence and origin claims.",
  },
  {
    id: "invoice-proof",
    question: "Does an invoice prove a part is authentic?",
    answer:
      "An invoice establishes commercial transaction history and purchase records, but it does not independently guarantee authenticity without supporting manufacturer provenance.",
  },
  {
    id: "serial-number",
    question: "Can I rely on a serial number or QR code?",
    answer:
      "Serials, batches and QR codes are illustrative indicators. Unless linked to a live issuer verification system, they serve as reference points rather than standalone proof.",
  },
  {
    id: "packaging-differences",
    question: "Can packaging differences prove counterfeiting?",
    answer:
      "Packaging variations warrant a closer look, but differing fonts, colors, or seals are indicators to pause and check rather than absolute proof of fraud.",
  },
  {
    id: "vehicle-fitment",
    question: "Does vehicle fitment confirm authenticity?",
    answer:
      "No. Fitment determines whether a part physically fits a vehicle, which is completely separate from its manufacturing origin or brand authenticity.",
  },
  {
    id: "recalled-part",
    question: "How do I check if a part is recalled?",
    answer:
      "Check available authoritative safety databases and manufacturer notices. Recall checks are safety signals evaluated separately from authenticity claims.",
  },
  {
    id: "unsafe-part",
    question: "What if the part appears unsafe?",
    answer:
      "Pause installation immediately, consult a certified technician or mechanic, and report listings displaying safety-critical ambiguity.",
  },
  {
    id: "report-brand-claim",
    question: "How do I report an inaccurate brand claim?",
    answer:
      "Use the platform reporting tools on the listing to flag unsupported brand representations or mismatched evidence.",
  },
  {
    id: "report-scam",
    question: "How do I report a scam involving a parts seller?",
    answer:
      "Submit a detailed report through customer support providing listing IDs, transaction evidence, and specific discrepancies.",
  },
  {
    id: "correct-origin-claim",
    question: "Can a seller correct a mistaken origin claim?",
    answer:
      "Yes. Sellers can update claims through their seller management tools, and an audit history of changes is maintained.",
  },
  {
    id: "rights-evidence-expires",
    question: "What happens when rights evidence expires?",
    answer:
      "Expired rights automatically remove positive claims from listings. Sellers must update or withdraw authorization promptly.",
  },
  {
    id: "refund-counterfeit",
    question: "Will DriverXtra refund a counterfeit purchase?",
    answer:
      "Platform protection policies evaluate transaction disputes and verified evidence on a case-by-case basis.",
  },
  {
    id: "appeal-removed-listing",
    question: "Can I appeal a removed or restricted listing?",
    answer:
      "Yes. Sellers can submit valid distributor agreements or brand-owner attestations through the appeals portal.",
  },
  {
    id: "documents-public",
    question: "Are photos, invoices and brand documents public?",
    answer:
      "Personal commercial documents and private supplier details are kept confidential in accordance with privacy protection standards.",
  },
  {
    id: "authenticity-not-established",
    question: 'Why does a listing say "authenticity not established"?',
    answer:
      "It means no verified claim or independent evidence exists for that part in the current market[cite: 3]. Absence of evidence is not proof of fraud[cite: 1].",
  },
];

type PartsAuthenticityFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: FaqItem[];
  className?: string;
};

export default function PartsAuthenticityFaqSection({
  id = "faq",
  eyebrow = "FAQ",
  title = "Parts authenticity questions",
  description = "Proposed answers, pending legal and content approval.",
  faqs = DEFAULT_FAQ_ITEMS,
  className = "bg-[#F6F8FB]",
}: PartsAuthenticityFaqSectionProps) {
  // First item open by default matching screenshot
  const [openId, setOpenId] = useState<string | null>("genuine-oem");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
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

                      {/* Amber Toggle Button matching screenshot */}
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

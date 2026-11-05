"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type SellerFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_SELLER_FAQS: SellerFaqItem[] = [
  {
    id: "guarantee-safe-sale",
    question: "Does DriverXtra guarantee a safe sale?",
    answer:
      "No. Safety guidance and any source-backed verification signal cannot guarantee a transaction, buyer conduct, payment or physical safety. Check relevant evidence independently.",
  },
  {
    id: "interested-buyers-verified",
    question: "Are all interested buyers verified?",
    answer:
      "Buyer verification depends on account status and market tier. Always evaluate individual interactions and independent payment confirmation carefully.",
  },
  {
    id: "screenshot-proof",
    question: "Is a screenshot proof that payment is complete?",
    answer:
      "No. Screenshots can be easily edited. Always confirm funds directly in your own bank or payment provider account.",
  },
  {
    id: "buyer-overpaid",
    question: "What should I do if a buyer says they overpaid?",
    answer:
      "Do not send money back or pay a courier or third party. Verify original transaction details through your official account records.",
  },
  {
    id: "escrow-protection",
    question: "Is escrow or payment protection included?",
    answer:
      "Platform protection applies only to eligible transactions under specific terms. Review active protection policies for your marketplace.",
  },
  {
    id: "share-id-title",
    question: "Can I share my ID or title document with a buyer?",
    answer:
      "Keep sensitive identity and ownership documents private until you are ready and communicating through secure verified channels.",
  },
  {
    id: "fake-platform-support",
    question: "How can I recognize fake platform support?",
    answer:
      "DriverXtra will never ask for login codes, verification fees, or external QR code payments via unverified links.",
  },
  {
    id: "meet-potential-buyer",
    question: "Where should I meet a potential vehicle buyer?",
    answer:
      "Choose a public place you are comfortable with, at a time that suits you, and let someone know your whereabouts.",
  },
  {
    id: "precautions-test-drive",
    question: "What precautions matter during a test drive?",
    answer:
      "Keep the vehicle keys until you are safely in the car, and check your local insurance terms before handing over control.",
  },
  {
    id: "buyer-arrange-courier",
    question: "What if a buyer wants me to arrange a courier?",
    answer:
      "Verify shipping arrangements through established carrier channels and ensure payments are fully cleared first.",
  },
  {
    id: "move-conversation",
    question: "Should I move the conversation to another messaging app?",
    answer:
      "Keeping conversations within in-platform messaging helps maintain secure records and protection support.",
  },
  {
    id: "cloned-misleading-listing",
    question: "How should I handle a cloned or misleading listing?",
    answer:
      "Use platform reporting tools immediately to flag suspicious listings or unauthorized use of your vehicle details.",
  },
  {
    id: "identity-prove-ownership",
    question: "Is seller identity verification enough to prove ownership?",
    answer:
      "Identity verification confirms who you are, but individual vehicle or part provenance must still be supported by separate documentation.",
  },
  {
    id: "parts-shipping-address",
    question: "What if a buyer asks me to change a parts shipping address?",
    answer:
      "Confirm unexpected address changes through the original order channel before dispatching any items.",
  },
  {
    id: "report-suspected-fraud",
    question: "How do I report suspected fraud?",
    answer:
      "Submit a detailed report via the Report Fraud portal with relevant transaction references and communication history.",
  },
  {
    id: "report-reviewed",
    question: "How do I know my report has been reviewed?",
    answer:
      "Status updates and review notifications are delivered through your account notification center and registered contact email.",
  },
  {
    id: "disagree-platform-decision",
    question: "What if I disagree with a platform decision?",
    answer:
      "You can submit additional verification documents or file an appeal through the Disputes & Appeals portal.",
  },
  {
    id: "guidance-every-country",
    question: "Does this guidance apply in every country?",
    answer:
      "Safety guidance adapts to local market regulations, legal frameworks, and regional platform features.",
  },
];

type SellerSafetyFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: SellerFaqItem[];
  className?: string;
};

export default function SellerSafetyFaqSection({
  id = "faq",
  eyebrow = "FAQ",
  title = "Seller Safety questions",
  description = "Proposed answers, pending market and legal review.",
  faqs = DEFAULT_SELLER_FAQS,
  className = "bg-white",
}: SellerSafetyFaqSectionProps) {
  // First item open by default matching screenshot
  const [openId, setOpenId] = useState<string | null>("guarantee-safe-sale");

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

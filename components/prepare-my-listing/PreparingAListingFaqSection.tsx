"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type PreparingListingFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_PREPARING_LISTING_FAQS: PreparingListingFaqItem[] = [
  {
    id: "is-listing-live-when-start-draft",
    question: "Is my listing live when I start a draft?",
    answer:
      "No. Preparing a draft does not publish a vehicle listing. Review, submission and any moderation or publication actions are separate stages and their actual availability must be confirmed by DriverXtra.",
  },
  {
    id: "do-i-need-account-to-read-checklist",
    question: "Do I need an account to read the checklist?",
    answer:
      "No. You can read every preparation step and checklist item freely without signing in or creating an account.",
  },
  {
    id: "do-i-have-to-enter-vin-or-registration",
    question: "Do I have to enter my VIN or registration number?",
    answer:
      "VIN or registration details may be optional depending on the flow and market requirements, though accurate vehicle identifiers help prevent mismatches later.",
  },
  {
    id: "how-should-i-describe-vehicle-condition",
    question: "How should I describe vehicle condition?",
    answer:
      "Describe condition accurately and objectively, noting wear, repairs, warning lights, or modifications so buyers know what to expect.",
  },
  {
    id: "what-if-displayed-model-or-trim-is-wrong",
    question: "What if the displayed model or trim is wrong?",
    answer:
      "Select the closest matching specification or flag the discrepancy during review rather than guessing or misrepresenting the trim level.",
  },
  {
    id: "how-do-i-report-mileage-inaccurate",
    question: "How do I report mileage that may be inaccurate?",
    answer:
      "Record the exact odometer reading and the date you read it, note any uncertainty or discrepancy clearly, and follow the review or support guidance provided.",
  },
  {
    id: "what-if-i-still-owe-money-on-vehicle",
    question: "What if I still owe money on my vehicle?",
    answer:
      "Be transparent about any active finance, loan, or lien on the vehicle and check your lender's terms before selling or transferring ownership.",
  },
  {
    id: "are-title-documents-made-public",
    question: "Are title documents made public?",
    answer:
      "No. Sensitive ownership or registration documents should not be exposed publicly in listing photos or descriptions.",
  },
  {
    id: "what-photos-should-i-prepare",
    question: "What photos should I prepare?",
    answer:
      "Prepare at least four clear, well-lit photos covering the exterior, interior, and key angles, keeping licence plates, documents, and people's faces out.",
  },
  {
    id: "can-people-see-photos-as-soon-as-upload",
    question: "Can people see my photos as soon as I upload them?",
    answer:
      "Draft uploads remain private to your draft until you complete review, submit, and any required checks or publication steps take place.",
  },
  {
    id: "what-should-i-remove-from-photos",
    question: "What should I remove from photos?",
    answer:
      "Keep licence plates, personal documents, home addresses, and bystanders' or sellers' faces out of your photos before uploading.",
  },
  {
    id: "how-is-my-asking-price-used",
    question: "How is my asking price used?",
    answer:
      "Your asking price sets the proposed listing amount you intend to advertise once submitted—it is not a guaranteed sale price or valuation offer.",
  },
  {
    id: "will-driverxtra-verify-vehicle-info",
    question: "Will DriverXtra verify the vehicle information I enter?",
    answer:
      "Self-entered draft details are not automatically certified as a mechanical or legal inspection; review and moderation stages check submitted information according to platform rules.",
  },
  {
    id: "can-i-save-draft-and-return-later",
    question: "Can I save the draft and return later?",
    answer:
      "Signing in allows you to save or resume your private listing draft across sessions, while you can read every preparation step without signing in.",
  },
  {
    id: "what-if-i-change-same-draft-two-devices",
    question: "What if I change the same draft on two devices?",
    answer:
      "Editing a draft across multiple devices simultaneously can overwrite recent changes—finish or save on one device before continuing on another.",
  },
  {
    id: "does-clicking-review-submit-listing",
    question: "Does clicking Review submit my listing?",
    answer:
      "No. Review is a check stage where you inspect your draft details; submission is a separate step that you choose to trigger.",
  },
  {
    id: "how-do-i-know-whether-submission-succeeded",
    question: "How do I know whether submission succeeded?",
    answer:
      "Look for explicit submission confirmation in the workflow after choosing to submit, and check status updates for any moderation step.",
  },
  {
    id: "where-can-i-get-help-or-report-problem",
    question: "Where can I get help or report a problem?",
    answer:
      "Use the platform's support or help channels if you encounter technical issues, conflicting records, or questions about draft or submission status.",
  },
];

type PreparingAListingFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: PreparingListingFaqItem[];
  className?: string;
};

export default function PreparingAListingFaqSection({
  id = "preparing-a-listing-faq",
  eyebrow = "FAQ",
  title = "Preparing a listing",
  description,
  faqs = DEFAULT_PREPARING_LISTING_FAQS,
  className = "bg-white",
}: PreparingAListingFaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(
    "is-listing-live-when-start-draft",
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

"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type WorkshopSuppliesFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_WORKSHOP_SUPPLIES_FAQS: WorkshopSuppliesFaqItem[] = [
  {
    id: "what-belongs-in-workshop-supplies",
    question: "What belongs in Workshop Supplies?",
    answer:
      "Task-oriented consumables and workshop essentials, subject to actual catalog scope; other destinations retain their own pages.",
  },
  {
    id: "is-workshop-supplies-same-as-tools-garage-equipment",
    question: "Is Workshop Supplies the same as Tools & Garage Equipment?",
    answer:
      "Not necessarily. Workshop Supplies focuses on consumables, PPE, fluids, and task essentials, while dedicated tools and heavy garage equipment pages cover broader equipment lines where applicable.",
  },
  {
    id: "do-i-need-to-add-a-vehicle-first",
    question: "Do I need to add a vehicle first?",
    answer:
      "No. Browsing and filtering Workshop Supplies works by job family, specification, and search query without requiring a saved vehicle.",
  },
  {
    id: "does-a-product-shown-here-fit-my-vehicle",
    question: "Does a product shown here fit my vehicle?",
    answer:
      "Workshop supplies are typically general, task, or specification-based rather than vehicle-specific fitment items. Always check specifications, ratings, and manufacturer requirements.",
  },
  {
    id: "does-a-professional-item-mean-safe-for-anyone",
    question: 'Does a "professional" item mean safe for anyone?',
    answer:
      "No. Professional or specialist workshop items may require appropriate training, risk assessment, protective equipment, or local regulatory compliance before use.",
  },
  {
    id: "where-can-i-find-a-safety-data-sheet",
    question: "Where can I find a safety data sheet?",
    answer:
      "Where safety data sheet (SDS) information is listed on an item, it is noted in its specification summary; in this prototype, sample records are illustrative and not live downloadable files.",
  },
  {
    id: "are-ppe-items-certified-by-driverxtra",
    question: "Are PPE items certified by DriverXtra?",
    answer:
      "No. DriverXtra does not independently certify PPE or safety gear; you must select protective equipment based on your own workplace risk assessment and applicable standards.",
  },
  {
    id: "can-i-buy-refrigerants-or-regulated-chemicals",
    question: "Can I buy refrigerants or regulated chemicals?",
    answer:
      "Handling or purchasing refrigerants and regulated chemicals may require certification, licensing, or market-specific rules, and ordering is not available in this prototype.",
  },
  {
    id: "does-driverxtra-certify-lifts",
    question: "Does DriverXtra certify lifts?",
    answer:
      "No. DriverXtra does not certify lifting equipment or workshop bays; lifting gear must be used according to manufacturer instructions and local inspection rules.",
  },
  {
    id: "can-i-use-hv-tools-without-training",
    question: "Can I use HV tools without training?",
    answer:
      "High-voltage tasks and insulated gear are intended for qualified personnel. This page does not provide HV training or safe-work instructions.",
  },
  {
    id: "how-do-pack-sizes-work",
    question: "How do pack sizes work?",
    answer:
      "Some items are sold as a single unit (each or pair) while others are sold as multi-packs or cases (such as a box of 100 or case of 12), with unit counts shown alongside the quantity stepper.",
  },
  {
    id: "can-i-compare-power-and-torque-ratings",
    question: "Can I compare power and torque ratings?",
    answer:
      "You can select items with the Compare checkbox and review each item's specification rows (such as torque range, capacity, or voltage ratings) side by side.",
  },
  {
    id: "why-is-a-price-missing",
    question: "Why is a price missing?",
    answer:
      "If an item does not display a fixed price, pricing or availability may be unconfirmed, subject to quote, or omitted in the reference catalog.",
  },
  {
    id: "why-does-freight-require-a-quote",
    question: "Why does freight require a quote?",
    answer:
      "Heavy, oversized, hazardous, or regional deliveries often depend on weight, dimensions, handling rules, and destination location before delivery options can be confirmed.",
  },
  {
    id: "is-a-seller-automatically-verified",
    question: "Is a seller automatically verified?",
    answer:
      "No. Do not assume automatic seller verification or live stock accuracy from example or reference entries alone.",
  },
  {
    id: "how-can-business-buyers-order-in-bulk",
    question: "How can business buyers order in bulk?",
    answer:
      "Live ordering and bulk purchasing are not available in this prototype; in a live environment, bulk or trade terms would follow confirmed supplier and market rules.",
  },
  {
    id: "what-if-a-document-looks-out-of-date",
    question: "What if a document looks out of date?",
    answer:
      "Always verify current revision dates, calibration intervals, and safety sheets directly with the manufacturer or governing standard before relying on a document.",
  },
  {
    id: "how-are-returns-and-warranties-determined",
    question: "How are returns and warranties determined?",
    answer:
      "Returns, warranties, and calibration coverage depend on the specific supplier, product terms, and applicable consumer or commercial law—none are guaranteed by this prototype.",
  },
];

type WorkshopSuppliesFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: WorkshopSuppliesFaqItem[];
  className?: string;
};

export default function WorkshopSuppliesFaqSection({
  id = "workshop-supplies-faq",
  eyebrow = "FAQ",
  title = "Workshop Supplies questions",
  description,
  faqs = DEFAULT_WORKSHOP_SUPPLIES_FAQS,
  className = "bg-white",
}: WorkshopSuppliesFaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(
    "what-belongs-in-workshop-supplies",
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

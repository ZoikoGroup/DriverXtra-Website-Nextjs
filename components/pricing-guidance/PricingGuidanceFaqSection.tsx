"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type PricingGuidanceFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_PRICING_GUIDANCE_FAQS: PricingGuidanceFaqItem[] = [
  {
    id: "is-this-a-guaranteed-sale-price",
    question: "Is this a guaranteed sale price?",
    answer:
      "No. It is non-binding asking-price guidance and may differ from what a buyer eventually pays.",
  },
  {
    id: "is-this-the-same-as-value-my-vehicle",
    question: "Is this the same as Value My Vehicle?",
    answer:
      "No. Pricing Guidance focuses on comparable asking prices to help you set a competitive listing price, whereas valuation tools may reflect trade-in or wholesale estimates.",
  },
  {
    id: "is-it-a-cash-offer",
    question: "Is it a cash offer?",
    answer:
      "No. DriverXtra does not make cash offers or purchase vehicles directly; this tool provides independent market context only.",
  },
  {
    id: "why-might-there-be-a-range",
    question: "Why might there be a range instead of one price?",
    answer:
      "Vehicles of the same make, model, and year vary in condition, specification, location, and service history. A range reflects realistic market spread rather than a single fixed figure.",
  },
  {
    id: "what-does-asking-price-mean",
    question: 'What does "asking price" mean?',
    answer:
      "Asking price is the amount a seller lists a vehicle for prior to buyer negotiation, rather than the final completed transaction price.",
  },
  {
    id: "can-i-see-actual-sold-prices",
    question: "Can I see actual sold prices?",
    answer:
      "Verified completed sale data is shown only where available and permitted. Where unavailable, estimates rely strictly on comparable active and recent asking listings.",
  },
  {
    id: "why-do-location-and-currency-matter",
    question: "Why do location and currency matter?",
    answer:
      "Vehicle demand, taxation, specification standards, and local supply differ significantly across regions, so pricing context is segmented by market and local currency.",
  },
  {
    id: "how-does-mileage-affect-guidance",
    question: "How does mileage affect guidance?",
    answer:
      "Higher odometer readings generally reduce market asking prices compared to lower-mileage equivalents within the same model year band.",
  },
  {
    id: "does-the-tool-inspect-my-vehicle",
    question: "Does the tool inspect my vehicle?",
    answer:
      "No. The guidance relies entirely on the details and condition tier you self-select and does not replace a physical or mechanical inspection.",
  },
  {
    id: "do-i-need-to-give-vin-or-registration",
    question: "Do I need to give my VIN or registration?",
    answer:
      "No. You can generate pricing guidance without entering a VIN, registration plate, or signing into an account.",
  },
  {
    id: "what-if-my-exact-trim-is-missing",
    question: "What if my exact trim is missing?",
    answer:
      'Select "I\'m not sure of the exact trim" to broaden the comparable group and view a wider, more conservative price range.',
  },
  {
    id: "why-cant-it-show-a-price-in-my-market",
    question: "Why can't it show a price in my market?",
    answer:
      "If there are too few comparable vehicles in your selected market, year, or model group, the range is withheld rather than displaying an unreliable guess.",
  },
  {
    id: "how-recent-is-the-data",
    question: "How recent is the data?",
    answer:
      "Market reference cohorts are refreshed periodically to reflect current listing conditions and seasonal trends.",
  },
  {
    id: "are-seller-fees-deducted",
    question: "Are seller fees deducted from the estimate?",
    answer:
      "No. The range represents gross asking prices before any listing fees, taxes, financing settlements, or preparation costs.",
  },
  {
    id: "can-i-save-the-suggested-amount",
    question: "Can I save the suggested amount?",
    answer:
      "You can note or print the range for reference; no personal vehicle data is stored to an account during this session.",
  },
  {
    id: "will-this-change-my-live-listing",
    question: "Will this change my live vehicle listing?",
    answer:
      "No. Using the Pricing Guidance tool is standalone and does not automatically modify any active listing.",
  },
  {
    id: "does-higher-pricing-guarantee-better-sale",
    question: "Does higher pricing guarantee a better sale?",
    answer:
      "Pricing above the comparable range often leads to fewer buyer enquiries and longer time on market, with no guarantee of achieving a higher final sale price.",
  },
  {
    id: "what-if-i-see-an-incorrect-value",
    question: "What if I see an incorrect value?",
    answer:
      "Double-check your selected market, odometer units (miles vs kilometres), model year, and condition tier, as small input differences significantly shift the cohort.",
  },
];

type PricingGuidanceFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: PricingGuidanceFaqItem[];
  className?: string;
};

export default function PricingGuidanceFaqSection({
  id = "pricing-guidance-faq",
  eyebrow = "FAQ",
  title = "Pricing guidance questions",
  description,
  faqs = DEFAULT_PRICING_GUIDANCE_FAQS,
  className = "bg-[#F6F8FB]",
}: PricingGuidanceFaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(
    "is-this-a-guaranteed-sale-price",
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

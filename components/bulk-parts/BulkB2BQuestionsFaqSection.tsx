"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type BulkB2BFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_BULK_B2B_FAQS: BulkB2BFaqItem[] = [
  {
    id: "who-can-use-bulk-b2b-parts",
    question: "Who can use Bulk / B2B Parts?",
    answer:
      "Public browsing may be available. Business prices, quote actions and ordering depend on supported service, your organization status, role and market.",
  },
  {
    id: "do-all-products-have-wholesale-discounts",
    question: "Do all products have wholesale discounts?",
    answer:
      "No. Volume pricing, pack tiers, and business rates depend on the specific part, seller terms, and eligible account status rather than applying automatically to every item.",
  },
  {
    id: "how-do-minimum-order-quantities-work",
    question: "How do minimum order quantities work?",
    answer:
      "Minimum order quantities (MOQs) set the smallest unit or pack volume required per line item or seller order; check the stated pack size and unit minimum before requesting a quote.",
  },
  {
    id: "can-i-order-without-a-business-account",
    question: "Can I order without a business account?",
    answer:
      "Browsing or viewing indicative catalog details may not require sign-in, while business pricing, RFQ workflows, or commercial ordering typically require an eligible, verified business account.",
  },
  {
    id: "can-i-use-a-resale-certificate",
    question: "Can I use a resale certificate?",
    answer:
      "Tax exemption or resale certificate eligibility depends on your registered organization profile, ship-to market rules, and applicable tax requirements—confirmation occurs during account or quote review.",
  },
  {
    id: "does-verified-seller-mean-a-part-is-authentic",
    question: "Does verified seller mean a part is authentic?",
    answer:
      "No. Seller verification reflects completed business checks against published criteria, not per-part authenticity or OEM genuineness on every listed item.",
  },
  {
    id: "will-parts-fit-every-vehicle-in-my-fleet",
    question: "Will parts fit every vehicle in my fleet?",
    answer:
      "No. Fleet vehicles can span different model years, trims, engines, regional specifications, and option packages—always verify fitment and service requirements per vehicle.",
  },
  {
    id: "can-i-upload-a-spreadsheet-of-parts",
    question: "Can I upload a spreadsheet of parts?",
    answer:
      "You can paste SKU and quantity lines into the bulk list helper to filter or prepare quantities; full spreadsheet upload support depends on the active business workflow.",
  },
  {
    id: "what-is-a-request-for-quotation",
    question: "What is a request for quotation?",
    answer:
      "A request for quotation (RFQ) or quote request asks a seller to confirm availability, business pricing, tax, and freight terms for your requested quantities—it is not a binding order on its own.",
  },
  {
    id: "when-is-a-price-binding",
    question: "When is a price binding?",
    answer:
      "Indicative or unconfirmed catalog figures are non-binding; a price is only confirmed according to the formal quote issued by the seller and the terms accepted when placing an order.",
  },
  {
    id: "does-price-include-freight-and-tax",
    question: "Does price include freight and tax?",
    answer:
      "Not necessarily. Totals, applicable taxes, duties, and freight or delivery charges depend on the ship-to market and are confirmed by the seller in the quote.",
  },
  {
    id: "can-i-buy-on-invoice-or-credit-terms",
    question: "Can I buy on invoice or credit terms?",
    answer:
      "Invoice or credit terms are not automatic and depend on seller approval, account eligibility, market rules, and agreed commercial terms.",
  },
  {
    id: "can-my-company-require-purchase-approval",
    question: "Can my company require purchase approval?",
    answer:
      "Yes. Organizations often configure internal sign-off or role permissions before quote requests or purchase orders are submitted.",
  },
  {
    id: "can-a-quote-change-after-i-request-it",
    question: "Can a quote change after I request it?",
    answer:
      "Yes. Until a quote is finalized and accepted under stated validity terms, stock movement, pack adjustments, freight rates, or revised quantities can change the quoted figures.",
  },
  {
    id: "can-i-split-shipments-by-branch",
    question: "Can I split shipments by branch?",
    answer:
      "Multi-location or branch split deliveries depend on the seller's fulfilment capabilities, ship-to market support, and freight terms confirmed during quoting.",
  },
  {
    id: "is-stock-reserved-when-i-add-to-rfq",
    question: "Is stock reserved when I add to RFQ?",
    answer:
      "No. Adding items or quantities to a draft or submitting an RFQ does not reserve inventory unless explicitly confirmed in writing by the seller.",
  },
  {
    id: "how-can-i-follow-up-on-an-rfq",
    question: "How can I follow up on an RFQ?",
    answer:
      "Track submitted quote requests through your business account workspace or the designated seller communication channel referenced on your quote.",
  },
  {
    id: "how-do-i-report-a-seller-or-price-concern",
    question: "How do I report a seller or price concern?",
    answer:
      "Use the private seller concern reporting workflow so the team can review accuracy or conduct concerns; if funds are affected, contact your bank or payment provider first.",
  },
];

type BulkB2BQuestionsFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: BulkB2BFaqItem[];
  className?: string;
};

export default function BulkB2BQuestionsFaqSection({
  id = "bulk-b2b-questions-faq",
  eyebrow = "FAQ",
  title = "Bulk / B2B questions",
  description,
  faqs = DEFAULT_BULK_B2B_FAQS,
  className = "bg-white",
}: BulkB2BQuestionsFaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(
    "who-can-use-bulk-b2b-parts",
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

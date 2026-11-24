"use client";

import { useState, useMemo, type ReactNode } from "react";
import { Plus, X, Search } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type BuyingSellingFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_BUYING_SELLING_FAQS: BuyingSellingFaqItem[] = [
  {
    id: "where-do-i-start-buying",
    question: "Where do I start when buying a vehicle?",
    answer:
      'Choose "I\'m buying" and work through research, listing checks, independent vehicle/ownership evidence, viewing/inspection, price and terms, payment and local transfer requirements. The checklist is educational, not proof that required checks are complete.',
  },
  {
    id: "where-do-i-start-selling",
    question: "Where do I start when selling?",
    answer:
      "Start by compiling accurate vehicle documentation, verifying ownership, and assessing market pricing to write an honest, transparent listing.",
  },
  {
    id: "does-verified-seller-mean-safe",
    question: "Does a verified seller mean the vehicle is safe?",
    answer:
      "Seller verification confirms identity or account status but does not substitute for a physical mechanical inspection and history check.",
  },
  {
    id: "how-do-i-know-clear-title",
    question: "How do I know a vehicle has a clear title?",
    answer:
      "Run an official vehicle history report or check with the relevant state/national registry to ensure there are no outstanding liens or write-off markers.",
  },
  {
    id: "difference-asking-and-sold-price",
    question:
      "What is the difference between an asking price and a sold price?",
    answer:
      "Asking price is what the seller lists the vehicle for; sold price is the final negotiated amount agreed upon and paid by the buyer.",
  },
  {
    id: "should-i-have-used-vehicle-inspected",
    question: "Should I have a used vehicle inspected?",
    answer:
      "Yes. An independent pre-purchase inspection by a qualified mechanic can uncover hidden mechanical, electrical, or structural issues.",
  },
  {
    id: "are-all-fees-included-in-listing",
    question: "Are all fees included in a vehicle listing?",
    answer:
      "Listings often exclude local taxes, registration fees, dealer documentation fees, and optional warranty or financing add-ons.",
  },
  {
    id: "can-i-compare-loan-and-lease",
    question: "Can I compare a loan and lease here?",
    answer:
      "This platform provides educational guides and ownership calculators, but financial products should be reviewed directly with lenders.",
  },
  {
    id: "how-should-i-respond-to-deposit",
    question: "How should I respond to a deposit request?",
    answer:
      "Never send unverified deposits. Confirm the recipient's identity and ensure agreements are documented in writing before transferring funds.",
  },
  {
    id: "can-i-trust-payment-screenshot",
    question: "Can I trust a payment screenshot?",
    answer:
      "No. Always verify funds directly inside your official bank account before releasing vehicle keys, title, or possession.",
  },
  {
    id: "how-do-i-prepare-safe-test-drive",
    question: "How do I prepare a safe test drive?",
    answer:
      "Meet in well-lit public areas, verify the driver's license and insurance coverage, and accompany the buyer during the test drive route.",
  },
  {
    id: "can-i-share-home-address",
    question: "Can I share my home address or identity documents?",
    answer:
      "Exercise caution when sharing sensitive personal data online. Share documents only after verifying the legitimacy of the other party.",
  },
  {
    id: "does-platform-handle-title-transfer",
    question: "Does the platform handle title transfer?",
    answer:
      "No. DriverXtra is an information and resource guide platform and does not handle direct legal title transfers or financial escrow.",
  },
  {
    id: "what-if-fraudulent-buyer-seller",
    question: "What if I suspect a fraudulent buyer or seller?",
    answer:
      "Cease communication immediately, preserve your records and screenshots, and report the incident to local authorities or fraud agencies.",
  },
  {
    id: "how-do-i-report-misleading-listing",
    question: "How do I report misleading listing details?",
    answer:
      "Document the discrepancies between the listing and actual records, and report the listing through platform support channels.",
  },
  {
    id: "what-if-something-goes-wrong-after",
    question: "What if something goes wrong after the transaction?",
    answer:
      "Refer to your written contract of sale, statutory consumer rights, or seek professional legal advice depending on whether you bought privately or from a dealer.",
  },
  {
    id: "are-these-guides-sponsored",
    question: "Are these guides sponsored or independent?",
    answer:
      "All guides published on DriverXtra are independent educational resources designed to promote buyer and seller transparency.",
  },
  {
    id: "how-often-is-information-reviewed",
    question: "How often is information reviewed?",
    answer:
      "Guides and market references are reviewed periodically to reflect current industry standards and regulatory updates.",
  },
];

type BuyingAndSellingFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: BuyingSellingFaqItem[];
  className?: string;
};

export default function BuyingAndSellingFaqSection({
  id = "buying-selling-faq",
  eyebrow = "FAQ",
  title = "Buying & selling questions",
  description,
  faqs = DEFAULT_BUYING_SELLING_FAQS,
  className = "bg-[#F6F8FB]",
}: BuyingAndSellingFaqSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  // First item open by default matching screenshot
  const [openId, setOpenId] = useState<string | null>(
    "where-do-i-start-buying",
  );

  // Dynamic search filtering
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const query = searchQuery.toLowerCase().trim();

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        (typeof faq.answer === "string" &&
          faq.answer.toLowerCase().includes(query)),
    );
  }, [searchQuery, faqs]);

  const toggleFaq = (faqId: string) => {
    setOpenId(openId === faqId ? null : faqId);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Title, Search Bar & Counter */}
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

            {/* Live Search Bar */}
            <div className="mt-6">
              <label
                htmlFor="search-buying-selling-faq"
                className="block text-xs font-semibold text-slate-500 mb-2"
              >
                Search these questions
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search-buying-selling-faq"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder=""
                  className="w-full rounded-2xl border border-slate-200/90 bg-white py-3 pl-4 pr-10 text-xs text-ink placeholder-slate-400 shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden sm:text-sm"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
                )}
              </div>
            </div>

            {/* Questions Counter */}
            <p className="mt-3 text-[11px] font-semibold text-slate-400">
              {filteredFaqs.length}{" "}
              {filteredFaqs.length === 1 ? "question" : "questions"}
            </p>
          </div>

          {/* Right Column: Interactive Accordion List */}
          <div className="space-y-3 lg:col-span-8">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
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
                      {/* Accordion Row */}
                      <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
                        <h3
                          className={`text-xs font-bold sm:text-sm ${
                            isOpen
                              ? "text-ink font-extrabold"
                              : "text-slate-700"
                          }`}
                        >
                          {faq.question}
                        </h3>

                        {/* Amber Action Button */}
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

                      {/* Answer Drawer */}
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
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                <p className="text-xs font-medium text-slate-500 sm:text-sm">
                  No questions match your search for &quot;{searchQuery}&quot;.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-3 text-xs font-bold text-amber-600 hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

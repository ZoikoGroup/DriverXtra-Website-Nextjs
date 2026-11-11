"use client";

import { useState, useMemo, type ReactNode } from "react";
import { Plus, X, Search } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type OwnershipCostFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_OWNERSHIP_FAQS: OwnershipCostFaqItem[] = [
  {
    id: "total-cost-of-owning",
    question: "What is the total cost of owning a vehicle?",
    answer:
      "It is an estimate of costs across acquisition, use and the end of the selected ownership period. It may include changes in vehicle value, financing costs, energy, insurance, taxes and maintenance. Always review the inclusion list and assumptions.",
  },
  {
    id: "monthly-estimate-vs-loan",
    question:
      "Why is the monthly ownership estimate different from a loan payment?",
    answer:
      "A loan payment covers only the amount borrowed and interest over a specific term. Total ownership cost also accounts for depreciation, insurance, maintenance, charging or fuel, and taxes over the entire duration.",
  },
  {
    id: "cash-flow-vs-economic-cost",
    question: "What is the difference between cash flow and economic cost?",
    answer:
      "Economic cost tracks overall value lost plus running expenses, whereas cash flow measures actual money paid out and received in and out across your ownership period.",
  },
  {
    id: "taxes-and-registration",
    question: "Does the guide include taxes and registration?",
    answer:
      "Yes, when specified in the calculation model, standard sales taxes, registration fees, and recurring statutory levies are incorporated into acquisition or running costs.",
  },
  {
    id: "compare-loans-and-leases",
    question: "Can I compare loans and leases?",
    answer:
      "Guides allow you to model different financing structures to evaluate how upfront payments and monthly commitments impact overall expenses.",
  },
  {
    id: "finance-offer-pre-approval",
    question: "Is this a finance offer or pre-approval?",
    answer:
      "No. All financing figures are illustrative estimations and calculations, not binding loan offers or credit pre-approvals.",
  },
  {
    id: "insurance-premiums-included",
    question: "Are insurance premiums included?",
    answer:
      "Estimates include generalized insurance benchmarks based on regional averages, though actual premiums vary widely depending on driver history and coverage levels.",
  },
  {
    id: "how-is-depreciation-estimated",
    question: "How is depreciation estimated?",
    answer:
      "Depreciation is calculated as the projected difference between purchase price and expected residual market value at the end of the ownership term.",
  },
  {
    id: "ev-charging-estimate-vary",
    question: "Why does the EV charging estimate vary?",
    answer:
      "Electric vehicle charging costs depend on local utility electricity rates, home versus public charging mix, and efficiency ratings.",
  },
  {
    id: "maintenance-and-repairs",
    question: "Does the guide include maintenance and repairs?",
    answer:
      "Yes, standard wear items such as tires, periodic servicing, and routine maintenance intervals are modeled based on cohort averages.",
  },
  {
    id: "missing-market-data",
    question: "What if my market has missing data?",
    answer:
      "Regions lacking sufficient verifiable data points are explicitly flagged or withheld to prevent inaccurate cost projections.",
  },
  {
    id: "choose-cheapest-car",
    question: "Can I use this to choose the cheapest car?",
    answer:
      "Estimates help compare relative ownership expenses between different vehicles, but individual driving habits and unexpected repairs will influence final costs.",
  },
  {
    id: "compare-two-scenarios-fairly",
    question: "How do I compare two scenarios fairly?",
    answer:
      "Ensure consistent mileage assumptions, ownership duration, and regional parameters when comparing different vehicle models side by side.",
  },
  {
    id: "road-tolls-parking-storage",
    question: "What about road tolls, parking and storage?",
    answer:
      "Discretionary expenses like parking garages, city tolls, and private storage are generally excluded unless specifically added to the custom calculation model.",
  },
  {
    id: "government-incentives-guaranteed",
    question: "Are government incentives guaranteed?",
    answer:
      "EV rebates, tax credits, and grants are subject to statutory eligibility rules, funding availability, and legislative changes.",
  },
  {
    id: "save-or-share-my-estimate",
    question: "Can I save or share my estimate?",
    answer:
      "Yes, you can generate shareable report links or export summary calculations for your personal records.",
  },
  {
    id: "where-do-example-figures-come-from",
    question: "Where do the example figures come from?",
    answer:
      "Example figures are derived from aggregated market research datasets, standardized depreciation models, and published industry benchmarks.",
  },
  {
    id: "cost-appears-incorrect",
    question: "What should I do if a cost appears incorrect?",
    answer:
      "You can submit feedback or flag calculation anomalies through our support desk for verification and review.",
  },
];

type OwnershipCostFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: OwnershipCostFaqItem[];
  className?: string;
};

export default function OwnershipCostFaqSection({
  id = "faq",
  eyebrow = "FAQ",
  title = "Ownership cost questions",
  description = "Answers explain assumptions and common terms. They do not replace current provider documents or professional advice.",
  faqs = DEFAULT_OWNERSHIP_FAQS,
  className = "bg-[#F6F8FB]",
}: OwnershipCostFaqSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  // First item open by default matching screenshot
  const [openId, setOpenId] = useState<string | null>("total-cost-of-owning");

  // Client-side search filtering
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
          {/* Left Column: Title, Description, Interactive Search Bar & Counter */}
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

            {/* Live Search Input */}
            <div className="mt-6">
              <label
                htmlFor="search-ownership-faq"
                className="block text-xs font-semibold text-slate-500 mb-2"
              >
                Search these questions
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search-ownership-faq"
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

          {/* Right Column: Dynamic Filtered Accordion List */}
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
                      {/* Accordion Header Row */}
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

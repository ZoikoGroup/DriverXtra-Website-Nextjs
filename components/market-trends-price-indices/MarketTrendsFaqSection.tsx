"use client";

import { useState, useMemo, type ReactNode } from "react";
import { Plus, X, Search } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type MarketTrendsFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_MARKET_TRENDS_FAQS: MarketTrendsFaqItem[] = [
  {
    id: "what-is-vehicle-price-index",
    question: "What is a vehicle price index?",
    answer:
      "A vehicle price index is a relative series showing how a defined measure changes against a documented base period for a specified market and vehicle cohort. It is not the price of a particular car. Each published series must explain its units, baseline, data sources, revision and calculation method.",
  },
  {
    id: "does-index-tell-me-what-car-worth",
    question: "Does an index tell me what my car is worth?",
    answer:
      "No. Price indices reflect aggregate market movements across generalized cohorts rather than individual appraisals for specific vehicle condition, mileage, or history.",
  },
  {
    id: "difference-asking-sold-prices",
    question: "What is the difference between asking and sold prices?",
    answer:
      "Asking prices reflect advertised seller expectations before final negotiation, whereas sold prices represent completed transaction values.",
  },
  {
    id: "where-does-information-come-from",
    question: "Where does the information come from?",
    answer:
      "Data is aggregated from verified market feeds, platform listing records, and historical automotive transaction databases.",
  },
  {
    id: "why-might-my-area-not-appear",
    question: "Why might my area not appear?",
    answer:
      "Regions or vehicle segments with insufficient sample volume are withheld to maintain statistical reliability and user privacy.",
  },
  {
    id: "why-do-different-regions-show-different-changes",
    question: "Why do different regions show different changes?",
    answer:
      "Local supply constraints, regional demand fluctuations, and demographic buying preferences cause price trends to vary across markets.",
  },
  {
    id: "how-often-is-information-updated",
    question: "How often is the information updated?",
    answer:
      "Update frequencies range from monthly indices to quarterly reports depending on the underlying data category.",
  },
  {
    id: "why-did-an-older-figure-change",
    question: "Why did an older figure change?",
    answer:
      "Historical data series are occasionally restated when late-reported transactions or revised methodology parameters are incorporated.",
  },
  {
    id: "what-does-a-base-of-100-mean",
    question: "What does a base of 100 mean?",
    answer:
      "A base value of 100 establishes the starting benchmark period against which all subsequent percentage changes are measured.",
  },
  {
    id: "are-these-actual-transaction-prices",
    question: "Are these actual transaction prices?",
    answer:
      "Unless specified as completed sales data, index calculations are primarily built on advertised listing prices.",
  },
  {
    id: "can-i-compare-used-and-new-vehicles",
    question: "Can I compare used and new vehicles?",
    answer:
      "New and used vehicles follow separate pricing dynamics and should be evaluated through their respective cohort indices.",
  },
  {
    id: "can-i-see-inflation-adjusted-trends",
    question: "Can I see inflation-adjusted trends?",
    answer:
      "Standard indices display nominal price movements unless an explicit real-terms adjustment methodology is applied.",
  },
  {
    id: "what-if-a-chart-has-missing-periods",
    question: "What if a chart has missing periods?",
    answer:
      "Periods lacking sufficient verifiable observations are left blank or explicitly noted rather than interpolated with estimated figures.",
  },
  {
    id: "do-larger-sample-counts-guarantee-accuracy",
    question: "Do larger sample counts guarantee accuracy?",
    answer:
      "While higher sample sizes reduce statistical variance, data quality, normalization rules, and outlier filtering remain critical.",
  },
  {
    id: "are-sponsored-content-and-ads-used-to-calculate-an-index",
    question: "Are sponsored content and ads used to calculate an index?",
    answer:
      "No. Promoted listings and sponsored advertisements are filtered out to prevent commercial bias in index calculations.",
  },
  {
    id: "can-i-download-or-share-the-chart",
    question: "Can I download or share the chart?",
    answer:
      "Yes, charts and research findings may be referenced or shared provided proper attribution to DriverXtra Market Trends is maintained.",
  },
  {
    id: "how-can-i-report-a-possible-mistake",
    question: "How can I report a possible mistake?",
    answer:
      "Users can flag potential data inaccuracies or methodology questions through our feedback portal for editorial review.",
  },
  {
    id: "is-this-information-financial-or-buying-advice",
    question: "Is this information financial or buying advice?",
    answer:
      "No. Market indices and trends are published strictly for educational and informational research purposes.",
  },
];

type MarketTrendsFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  faqs?: MarketTrendsFaqItem[];
  className?: string;
};

export default function MarketTrendsFaqSection({
  id = "faq",
  eyebrow = "FAQ",
  title = "Market Trends questions",
  faqs = DEFAULT_MARKET_TRENDS_FAQS,
  className = "bg-[#F6F8FB]",
}: MarketTrendsFaqSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  // First item open by default matching screenshot
  const [openId, setOpenId] = useState<string | null>(
    "what-is-vehicle-price-index",
  );

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
          {/* Left Column: Title, Interactive Search Bar & Questions Counter */}
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

            {/* Live Search Input */}
            <div className="mt-6">
              <label
                htmlFor="search-market-faq"
                className="block text-xs font-semibold text-slate-500 mb-2"
              >
                Search these questions
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search-market-faq"
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
                      className="group cursor-pointer rounded-2xl bg-[#F6F8FB] transition-all duration-300"
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

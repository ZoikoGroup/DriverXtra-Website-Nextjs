"use client";

import { useState, useMemo, type ReactNode } from "react";
import { Plus, X, Search } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type AutomotiveFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_AUTOMOTIVE_FAQS: AutomotiveFaqItem[] = [
  {
    id: "what-are-automotive-insights",
    question: "What are Automotive Insights?",
    answer:
      "Articles and explainers designed to help you understand automotive trends and decisions. Availability and source coverage can differ by market.",
  },
  {
    id: "personalized-vehicle-valuations",
    question: "Are the insights personalized vehicle valuations?",
    answer:
      "No. Market insights provide aggregate trends, illustrative benchmarks, and analytical context. They are not individualized appraisal values for specific VINs or vehicles.",
  },
  {
    id: "actual-sale-prices",
    question: "Are the prices shown actual sale prices?",
    answer:
      "Unless explicitly labeled as completed transaction data, advertised or asking prices reflect listing figures before negotiation or final closing fees.",
  },
  {
    id: "how-current-are-charts",
    question: "How current are the charts?",
    answer:
      "Data update frequencies vary by source and category, ranging from weekly market feeds to monthly or quarterly aggregation cycles.",
  },
  {
    id: "fewer-results-region",
    question: "Why does my region have fewer results?",
    answer:
      "Certain regions or smaller vehicle cohorts may be withheld to preserve statistical confidence and privacy standards.",
  },
  {
    id: "average-price-meaning",
    question: "What does an average price mean?",
    answer:
      "An average price aggregates observed listings within a defined sample set. It provides a central market baseline but does not account for individual vehicle condition or history.",
  },
  {
    id: "choose-lender-or-insurer",
    question: "Can I use these insights to choose a lender or insurer?",
    answer:
      "Insights are strictly for informational context and market education. Always consult accredited financial advisors or licensed insurance providers.",
  },
  {
    id: "written-independently",
    question: "Are all articles written independently?",
    answer:
      "Yes. Insights are produced according to strict editorial standards independently of specific dealership or commercial sponsor affiliations.",
  },
  {
    id: "how-choose-featured-articles",
    question: "How do you choose featured articles?",
    answer:
      "Featured pieces are selected based on high reader relevance, timeliness of market shifts, or significant methodology updates.",
  },
  {
    id: "where-find-data-methodology",
    question: "Where can I find data methodology?",
    answer:
      "Each data-backed chart or article includes reference notes and direct links to its underlying measurement methodology.",
  },
  {
    id: "incorrect-information",
    question: "What if I find incorrect information?",
    answer:
      "You can submit feedback or flag inaccuracies through our editorial desk for rapid review and verification.",
  },
  {
    id: "guarantee-price-or-condition",
    question: "Does the site guarantee a vehicle's price or condition?",
    answer:
      "No. We do not inspect individual vehicles or guarantee third-party seller transaction pricing.",
  },
  {
    id: "compare-ev-charging-costs",
    question: "Can I compare EV charging costs across regions?",
    answer:
      "Our EV explainers highlight general utility tariff structures and public charging dynamics across covered regions.",
  },
  {
    id: "do-i-have-to-sign-in",
    question: "Do I have to sign in?",
    answer:
      "No sign-in is required to browse published research, articles, and general market charts.",
  },
  {
    id: "dataset-becomes-unavailable",
    question: "What happens if a dataset becomes unavailable?",
    answer:
      "If a primary data feed is discontinued, affected charts are archived with clear attribution notes regarding the final measurement date.",
  },
  {
    id: "reuse-charts-or-quote",
    question: "Can I reuse charts or quote research?",
    answer:
      "You may quote short excerpts or reference charts provided proper attribution to DriverXtra Automotive Insights is included.",
  },
  {
    id: "report-suspicious-listing",
    question: "How do I report a suspicious marketplace listing?",
    answer:
      "Use the Report a Listing portal in our Safety & Trust center to submit details for prompt investigation.",
  },
  {
    id: "why-did-article-change",
    question: "Why did an article change?",
    answer:
      "Articles are updated periodically to incorporate new market data, correct errors, or clarify evolving industry policies.",
  },
];

type AutomotiveInsightsFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  faqs?: AutomotiveFaqItem[];
  className?: string;
};

export default function AutomotiveInsightsFaqSection({
  id = "faq",
  eyebrow = "FAQ",
  title = "Automotive Insights questions",
  faqs = DEFAULT_AUTOMOTIVE_FAQS,
  className = "bg-[#F6F8FB]",
}: AutomotiveInsightsFaqSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  // First item open by default matching screenshot
  const [openId, setOpenId] = useState<string | null>(
    "what-are-automotive-insights",
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
                htmlFor="search-faq"
                className="block text-xs font-semibold text-slate-500 mb-2"
              >
                Search these questions
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search-faq"
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
                      className={`group cursor-pointer bg-[#F6F8FB] transition-all duration-300 ${
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

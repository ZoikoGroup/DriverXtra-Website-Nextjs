"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type Article = {
  title: string;
  meta: string;
  category: string;
  content?: string;
};

const CATEGORIES = [
  "All topics",
  "Storefront and listings",
  "Inventory feeds and sync",
  "Leads and CRM",
  "Dealer verification",
  "Dealer analytics",
  "Account, team and access",
];

const ARTICLES: Article[] = [
  {
    title: "Troubleshoot a failed feed run",
    meta: "Updated 1 Oct 2026 · all markets (example)",
    category: "Inventory feeds and sync",
    content:
      "Check your feed source URL, inspect mapping configurations, and verify lockfile synchronizations to resolve feed parsing failures.",
  },
  {
    title: "Review a pending storefront change",
    meta: "Updated 1 Oct 2026 · all markets (example)",
    category: "Storefront and listings",
    content:
      "Storefront modifications undergo automated checks before publishing. Review approval statuses under your dealership settings.",
  },
  {
    title: "Fix a CRM connection",
    meta: "Updated 1 Oct 2026 · all markets (example)",
    category: "Leads and CRM",
    content:
      "Verify API credentials, endpoint endpoints, and dispatch webhook status to restore seamless lead delivery to your CRM.",
  },
  {
    title: "Understand a verification request",
    meta: "Updated 1 Oct 2026 · all markets (example)",
    category: "Dealer verification",
    content:
      "Ensure business registration documents and rooftop operating licenses match submitted verification requirements.",
  },
  {
    title: "Why a metric shows '—'",
    meta: "Updated 1 Oct 2026 · all markets (example)",
    category: "Dealer analytics",
    content:
      "Dash metrics appear as '—' when data collection is disabled, permissions are insufficient, or integration features are unconfigured.",
  },
  {
    title: "Add a team member",
    meta: "Updated 1 Oct 2026 · all markets (example)",
    category: "Account, team and access",
    content:
      "Invite team members from your account settings and assign specific rooftop permissions or role-based access limits.",
  },
];

type ChooseTopicSectionProps = {
  id?: string;
  className?: string;
};

export default function ChooseTopicSection({
  id,
  className = "bg-[#F6F8FB]",
}: ChooseTopicSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All topics");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === "All topics" ||
      article.category === selectedCategory;
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleArticle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle eyebrow="Topics" title="Choose a topic" />

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setOpenIndex(null);
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-ink text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 hover:text-ink border border-slate-200/80"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="mt-8">
          <label
            htmlFor="search-help-topics"
            className="block text-xs font-semibold text-slate-600"
          >
            Search dealer help topics
          </label>
          <div className="mt-2 flex max-w-md items-center gap-2">
            <input
              id="search-help-topics"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder=""
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-ink outline-none transition-colors focus:border-ink"
            />
            <button
              type="button"
              className="rounded-full bg-ink px-6 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Search
            </button>
          </div>
        </div>

        {/* Article Count */}
        <div className="mt-6 text-xs font-semibold text-slate-400">
          {filteredArticles.length} article
          {filteredArticles.length !== 1 ? "s" : ""}
        </div>

        {/* Articles Accordion List */}
        <div className="mt-4 space-y-3">
          {filteredArticles.map((article, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={article.title} delay={index * 40}>
                <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:border-slate-300 hover:shadow-[0_8px_20px_-8px_rgba(15,23,42,0.06)]">
                  <button
                    type="button"
                    onClick={() => toggleArticle(index)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-ink transition-colors group-hover:text-brand">
                        {article.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        {article.meta}
                      </p>
                    </div>
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-transform duration-200 ${
                        isOpen
                          ? "bg-brand text-ink"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                      }`}
                    >
                      {isOpen ? (
                        <X className="h-3.5 w-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                      )}
                    </span>
                  </button>

                  {isOpen && article.content && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <p className="text-xs leading-relaxed text-slate-600">
                        {article.content}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

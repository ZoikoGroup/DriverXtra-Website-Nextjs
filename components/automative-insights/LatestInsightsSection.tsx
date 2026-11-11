import type { ReactNode } from "react";
import Image from "next/image";
import { HelpCircle, FileText, ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type InsightCard = {
  id: string;
  category: string;
  location: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  tagLabel: string;
  tagType: "data-backed" | "sourced" | "editorial";
  dateText: string;
  updatedText?: string;
};

const DEFAULT_CATEGORIES = [
  { id: "all", label: "All", active: true },
  { id: "market-data", label: "Market data" },
  { id: "ownership", label: "Ownership" },
  { id: "ev", label: "EV" },
  { id: "buying-selling", label: "Buying & Selling" },
  { id: "parts", label: "Parts" },
  { id: "fleet", label: "Fleet" },
];

const DEFAULT_INSIGHTS: InsightCard[] = [
  {
    id: "asking-vs-sold",
    category: "MARKET ANALYSIS",
    location: "UNITED KINGDOM",
    title: "Asking prices and sold prices aren't the same thing",
    description:
      "Why listing prices and completed sales tell different stories — and how to read each.",
    imageSrc: "/images/auto/2.png",
    imageAlt: "Green luxury coupe parked outdoors",
    tagLabel: "Data-backed",
    tagType: "data-backed",
    dateText: "2 Oct 2026",
  },
  {
    id: "cost-of-owning",
    category: "EXPLAINER",
    location: "UNITED KINGDOM",
    title: "What goes into the cost of owning a car",
    description:
      "Fuel or charging, insurance, maintenance, depreciation and finance — what each covers.",
    imageSrc: "/images/auto/3.png",
    imageAlt: "Person reviewing financial paperwork and calculator",
    tagLabel: "Sourced explainer",
    tagType: "sourced",
    dateText: "24 Sept 2026",
    updatedText: "Updated 1 Oct 2026",
  },
  {
    id: "ev-charging-basics",
    category: "EXPLAINER",
    location: "UNITED KINGDOM",
    title: "Home, workplace and public charging: the basics",
    description:
      "Connector types, charging speeds in plain terms, and what affects real-world charging.",
    imageSrc: "/images/auto/4.png",
    imageAlt: "Electric vehicle charging cable connected to car",
    tagLabel: "Sourced explainer",
    tagType: "sourced",
    dateText: "18 Sept 2026",
  },
  {
    id: "time-to-sell",
    category: "EXPLAINER",
    location: "UNITED STATES",
    title: "What affects how long a car takes to sell",
    description:
      "Listing quality, pricing and demand all play a part — none guarantees a sale time.",
    imageSrc: "/images/auto/5.png",
    imageAlt: "Luxury sedan dark side profile silhouette",
    tagLabel: "Editorial context",
    tagType: "editorial",
    dateText: "12 Sept 2026",
  },
  {
    id: "oem-oes-aftermarket",
    category: "EDITORIAL COMPARISON",
    location: "UNITED KINGDOM",
    title: "OEM, OES and aftermarket parts compared",
    description:
      'Eligibility, what each claim means and what\'s still unknown — with no "best" ranking.',
    imageSrc: "/images/auto/6.png",
    imageAlt: "Mechanic pouring motor oil into engine bay",
    tagLabel: "Sourced explainer",
    tagType: "sourced",
    dateText: "5 Sept 2026",
  },
  {
    id: "fleet-replacement-cycles",
    category: "MARKET ANALYSIS",
    location: "UNITED KINGDOM",
    title: "Thinking about fleet replacement cycles",
    description:
      "Questions fleet managers ask about timing — and the data you'd need to answer them.",
    imageSrc: "/images/auto/7.png",
    imageAlt: "Commercial transport semi-truck driving on countryside road",
    tagLabel: "Data-backed",
    tagType: "data-backed",
    dateText: "28 Aug 2026",
  },
];

type LatestInsightsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  insights?: InsightCard[];
  className?: string;
};

export default function LatestInsightsSection({
  id = "latest-insights",
  eyebrow = "Latest",
  title = "Latest insights",
  description,
  insights = DEFAULT_INSIGHTS,
  className = "bg-white",
}: LatestInsightsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* Filter Bar & Sort Selector */}
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {DEFAULT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                  cat.active
                    ? "bg-[#0B1220] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <span className="text-xs font-medium text-slate-400">Sort by</span>
            <div className="relative inline-flex items-center rounded-xl border border-slate-200/80 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs">
              <span>Most recent published</span>
              <ChevronDown className="ml-2 h-3.5 w-3.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Published count label */}
        <p className="mt-4 text-[11px] font-semibold text-slate-400 sm:text-xs">
          8 published insights
        </p>

        {/* 3-Column Grid for Insight Cards */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((card, index) => (
            <Reveal key={card.id} delay={index * 40}>
              <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300 h-full">
                <div>
                  {/* Zero-padding edge-to-edge top image wrapper */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {/* Category & Location Header */}
                    <div className="text-[11px] font-extrabold tracking-widest text-[#4A5670] uppercase">
                      {card.category} · {card.location}
                    </div>

                    <h3 className="mt-2 text-base font-bold text-ink sm:text-lg leading-snug">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Footer Badges & Dates */}
                <div className="p-6 pt-0">
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                    {/* Metadata Badge */}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/70 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                      {card.tagType === "data-backed" && (
                        <HelpCircle className="h-3 w-3 stroke-[2.5]" />
                      )}
                      {card.tagType === "sourced" && (
                        <FileText className="h-3 w-3 stroke-[2.5]" />
                      )}
                      {card.tagType === "editorial" && (
                        <FileText className="h-3 w-3 stroke-[2.5]" />
                      )}
                      <span>{card.tagLabel}</span>
                    </span>

                    {/* Date String */}
                    <span className="text-[11px] font-medium text-slate-400">
                      {card.dateText}
                      {card.updatedText && ` - ${card.updatedText}`}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

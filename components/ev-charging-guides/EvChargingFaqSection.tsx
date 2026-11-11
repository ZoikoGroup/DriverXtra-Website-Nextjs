"use client";

import { useState, useMemo, type ReactNode } from "react";
import { Plus, X, Search } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type EvChargingFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_EV_CHARGING_FAQS: EvChargingFaqItem[] = [
  {
    id: "kw-vs-kwh",
    question: "What is the difference between kW and kWh?",
    answer:
      "kW describes a rate of electrical power; kWh describes an amount of energy. A charger rating in kW does not tell you how much energy a vehicle can accept in every condition.",
  },
  {
    id: "what-is-ac-charging",
    question: "What is AC charging?",
    answer:
      "Alternating Current (AC) charging supplies power directly to the vehicle's onboard converter, which converts AC power into DC to charge the battery pack.",
  },
  {
    id: "what-is-dc-fast-charging",
    question: "What is DC fast charging?",
    answer:
      "Direct Current (DC) fast charging bypasses the vehicle's onboard charger to feed high-voltage power straight into the battery, significantly reducing charging times.",
  },
  {
    id: "will-any-connector-fit",
    question: "Will any charging connector fit my EV?",
    answer:
      "No. Connectors vary by region and charger speed (such as Type 2, CCS, or NACS). You must check your vehicle's port compatibility before connecting.",
  },
  {
    id: "can-i-use-an-adapter",
    question: "Can I use an adapter?",
    answer:
      "Adapters can be used only when approved by your vehicle manufacturer and the charge point operator. Unapproved adapters present safety and warranty risks.",
  },
  {
    id: "how-long-does-charging-take",
    question: "How long does charging take?",
    answer:
      "Charging times depend on battery size, state of charge, maximum onboard charging speed, ambient temperature, and charger output capability.",
  },
  {
    id: "why-charging-slows-down",
    question: "Why does charging slow as the battery fills?",
    answer:
      "Batteries taper charging speeds above 80% to manage temperature, prevent over-voltage degradation, and preserve long-term cell health.",
  },
  {
    id: "can-i-install-charging-at-home",
    question: "Can I install charging at home?",
    answer:
      "Home charging installation depends on available electrical service capacity, property ownership or landlord permission, and local electrical codes.",
  },
  {
    id: "what-public-listing-tells-me",
    question: "What does a public charger listing tell me?",
    answer:
      "Listings typically show power output, plug types, network operator, access requirements, and operational status, though real-time availability can vary.",
  },
  {
    id: "how-public-fees-calculated",
    question: "How are public charging fees calculated?",
    answer:
      "Fees may be billed per kWh consumed, per minute connected, as a flat session fee, or a combination including idle and parking penalties.",
  },
  {
    id: "is-home-charging-cheaper",
    question: "Is home charging always cheaper?",
    answer:
      "Home charging on overnight off-peak electricity tariffs is usually cheaper than public charging, though peak daytime home rates can vary.",
  },
  {
    id: "what-affects-ev-range",
    question: "What affects EV driving range?",
    answer:
      "Driving speed, ambient temperature, climate control use, elevation change, wind resistance, vehicle payload, and tire pressure all impact real-world range.",
  },
  {
    id: "does-cold-weather-affect-range",
    question: "Does cold weather affect charging and range?",
    answer:
      "Yes. Low temperatures slow chemical reactions in the battery, reducing effective range and slowing initial charging rates until the pack warms up.",
  },
  {
    id: "what-is-battery-state-of-health",
    question: "What is battery state of health?",
    answer:
      "State of Health (SoH) measures the maximum energy capacity a battery can store today compared to its original capacity when brand new.",
  },
  {
    id: "are-charging-stations-always-available",
    question: "Are charging stations always available?",
    answer:
      "Availability fluctuates based on driver demand, location, time of day, and equipment maintenance status. Checking live network apps is recommended.",
  },
  {
    id: "what-if-equipment-looks-unsafe",
    question: "What should I do if equipment looks unsafe?",
    answer:
      "Do not touch damaged cables, exposed wires, or flooded stations. Report the safety issue immediately to the charge point operator and move away.",
  },
  {
    id: "can-i-rely-on-ev-incentives",
    question: "Can I rely on an EV incentive or tax credit?",
    answer:
      "Incentives and tax credits are subject to change, vehicle price caps, income criteria, and government budget allocations. Verify current rules before buying.",
  },
  {
    id: "how-current-is-this-guidance",
    question: "How current is this guidance?",
    answer:
      "This guidance reflects technical standards and market conditions as of the published model version and is updated periodically.",
  },
];

type EvChargingFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: EvChargingFaqItem[];
  className?: string;
};

export default function EvChargingFaqSection({
  id = "ev-charging-faq",
  eyebrow = "FAQ",
  title = "EV & Charging questions",
  description,
  faqs = DEFAULT_EV_CHARGING_FAQS,
  className = "bg-[#F6F8FB]",
}: EvChargingFaqSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  // First item open by default matching screenshot
  const [openId, setOpenId] = useState<string | null>("kw-vs-kwh");

  // Dynamic search filter
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
          {/* Left Column: Title, Interactive Search Input & Counter */}
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
                htmlFor="search-ev-charging-faq"
                className="block text-xs font-semibold text-slate-500 mb-2"
              >
                Search these questions
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search-ev-charging-faq"
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

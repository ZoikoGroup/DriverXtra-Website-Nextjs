"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "./SectionTitle";

const faqs = [
  {
    q: "What is DriverXtra?",
    a: "DriverXtra is a global automotive marketplace and commerce infrastructure platform for vehicles, parts, accessories, services, and third-party finance and insurance options. It connects consumers and organizations through verified participation, transparent marketplace rules and governed transaction workflows.",
  },
  {
    q: "Who owns DriverXtra?",
    a: "DriverXtra is a trading name of Zoiko Mobility Inc., a Zoiko Group company.",
  },
  {
    q: "Is DriverXtra a car dealer?",
    a: "No. DriverXtra is a marketplace and technology platform. Vehicles are listed by private sellers, dealers, fleets and other eligible businesses unless an offering clearly states otherwise.",
  },
  {
    q: "Can I buy and sell vehicles on DriverXtra?",
    a: "Yes. You can search, compare and buy vehicles from verified sellers, and value, list or get offers for your own vehicle where those features are available in your market.",
  },
  {
    q: "Does DriverXtra sell auto parts and accessories?",
    a: "Parts and accessories are sold by participating verified parts sellers. DriverXtra provides the marketplace, fitment matching, checkout and trust controls.",
  },
  {
    q: "How does DriverXtra verify sellers and businesses?",
    a: "Through layered verification — contact, identity, seller, business and certified-partner levels — applied according to the action being taken, the participant's role and local rules.",
  },
  {
    q: "Does DriverXtra provide vehicle financing?",
    a: "No. Financing is provided by third-party regulated partners. DriverXtra may facilitate comparison, pre-qualification or referral where permitted.",
  },
  {
    q: "Does DriverXtra provide car insurance?",
    a: "Insurance products are provided by third-party regulated providers. DriverXtra helps you compare options; availability, eligibility and terms vary by market.",
  },
  {
    q: "How does DriverXtra protect parts buyers from incorrect fitment or counterfeit products?",
    a: "Through VIN, make, model, year and trim fitment matching, seller validation, traceability and anti-counterfeit controls for higher-risk categories, plus structured returns and disputes.",
  },
  {
    q: "Can businesses integrate with DriverXtra?",
    a: "Yes. Inventory and catalog feeds, APIs, webhooks and CRM / workshop integrations let businesses connect their existing systems.",
  },
  {
    q: "Is DriverXtra available worldwide?",
    a: "DriverXtra is built for multi-market operation. Features, partners and availability vary by country and region.",
  },
  {
    q: "How does DriverXtra handle disputes?",
    a: "Disputes follow a structured workflow: the case is opened, evidence is attached, the other party responds within a set window, and the outcome is reviewed against policy and recorded, with an escalation route if needed.",
  },
  {
    q: "How does DriverXtra use AI?",
    a: "AI can assist with pricing context, fitment, anomaly detection and support. High-impact decisions stay bounded by policy, evidence and law.",
  },
  {
    q: "How does DriverXtra make money?",
    a: "Through marketplace and service fees, business subscriptions and tools, clearly labeled advertising and sponsored placement, and partner arrangements disclosed where required.",
  },
  {
    q: "How can I contact DriverXtra?",
    a: "Visit the Help Center or Contact DriverXtra page. Business and partner enquiries can use the dedicated partner and enterprise contact routes.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-slate-50 py-20 md:py-24">
      <div className={`${container} grid gap-10 lg:grid-cols-[1fr_2fr]`}>
        <div className="lg:sticky lg:top-40 lg:self-start">
          <SectionTitle
            eyebrow="Answer centre"
            title="Questions about DriverXtra"
            description="Short, self-contained answers for customers, partners, media and regulators."
          />
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={q} delay={Math.min(i, 6) * 50}>
                <div className="group">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-ink transition-colors duration-300 hover:text-gold"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">{q}</span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-brand bg-brand text-ink"
                          : "border-slate-300 bg-white text-slate-600 group-hover:border-brand group-hover:text-ink"
                      }`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-400 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p
                        className={`pr-10 pb-5 text-[13px] leading-relaxed text-slate-600 transition-all duration-500 ${
                          isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                        }`}
                      >
                        {a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

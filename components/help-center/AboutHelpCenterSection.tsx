"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface FaqItem {
  id: string;
  q: string;
  a: string;
}

const helpCenterFaqs: FaqItem[] = [
  {
    id: "hcf-1",
    q: "Can I read Help Center articles without signing in?",
    a: "Yes. Publicly approved guidance should remain available without signing in. You may need to sign in to view details about your own account, order, listing or organization.",
  },
  {
    id: "hcf-2",
    q: "How do I find help for a particular issue?",
    a: "Use the topic categories above to browse guidance by category, search by keywords in the search bar, or review relevant safety and transaction checklists.",
  },
  {
    id: "hcf-3",
    q: "What should I do if I suspect fraud?",
    a: "Do not proceed with the transaction, send payments, or share sensitive details. Immediately report the user or listing via our Report Fraud portal.",
  },
  {
    id: "hcf-4",
    q: "How do I report an inaccurate or unsafe listing?",
    a: "Click the 'Report this listing' link on any vehicle or part listing page, select the reason for concern, and our safety operations team will investigate.",
  },
  {
    id: "hcf-5",
    q: "Are sellers verified before I contact them?",
    a: "Sellers may carry specific verification badges indicating identity, registered business, or credential checks. However, verification does not replace independent vehicle inspections.",
  },
  {
    id: "hcf-6",
    q: "Can Help Center confirm my vehicle booking?",
    a: "No. Booking confirmations and scheduling are executed directly between you and the respective dealership, seller, or service provider.",
  },
  {
    id: "hcf-7",
    q: "Does DriverXtra hold or guarantee my payment?",
    a: "DriverXtra does not hold escrow or guarantee payments unless an authorized integrated transaction protection workflow is explicitly active for that purchase.",
  },
  {
    id: "hcf-8",
    q: "Can you explain a vehicle finance estimate?",
    a: "Finance estimates provide representative calculations based on inputted credit score, loan term, and down payment. Final terms are set by the underwriting lender.",
  },
  {
    id: "hcf-9",
    q: "Where should I ask about an insurance policy?",
    a: "Questions regarding coverage terms, policy endorsements, or claim handling must be directed to the licensed insurance company or underwriting broker.",
  },
  {
    id: "hcf-10",
    q: "How do I check if a part fits my vehicle?",
    a: "Verify the exact year, make, model, trim, and OEM part number against the seller's catalog fitment tables before purchasing.",
  },
  {
    id: "hcf-11",
    q: "Why am I seeing guidance for another region?",
    a: "Guidance defaults to regional regulatory frameworks. You can update your selected country or market in the region picker in the website navigation.",
  },
  {
    id: "hcf-12",
    q: "What if I cannot find the right article?",
    a: "Check our comprehensive buyer and seller safety guides, or reach out through our contact pathways for additional clarification.",
  },
  {
    id: "hcf-13",
    q: "Can I contact support through this page?",
    a: "Public help articles offer self-service guidance. For direct escalation or ticket submissions, use the Contact Support or Enterprise Contact portals.",
  },
  {
    id: "hcf-14",
    q: "Can I check my account, listing or order here?",
    a: "Account management, order tracking, and live listing statuses require logging in to your DriverXtra user or dealer dashboard.",
  },
  {
    id: "hcf-15",
    q: "What if an article seems outdated or wrong?",
    a: "Our editorial team continually audits documentation against current policy. You can submit feedback or correction notes via our support feedback channel.",
  },
  {
    id: "hcf-16",
    q: "Is the Help Center search sponsored?",
    a: "No. Help Center search results are ranked purely by keyword relevance and topic category, free of commercial promotion or paid placement.",
  },
  {
    id: "hcf-17",
    q: "Does Help Center provide legal or financial advice?",
    a: "No. All articles, calculators, and explainers provide informational guidance only and do not constitute certified legal, financial, or tax counsel.",
  },
  {
    id: "hcf-18",
    q: "Is a submitted request guaranteed to receive a reply by a specific time?",
    a: "Response times depend on inquiry severity and business queue volume. Critical safety reports and account security matters receive priority triage.",
  },
];

export default function AboutHelpCenterSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className={`${container} grid gap-10 lg:grid-cols-[1.1fr_1.9fr] lg:gap-14 items-start`}>
        {/* Left Column: Heading and Office Image */}
        <div className="lg:sticky lg:top-36 lg:self-start">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">FAQ</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
              About the Help Center
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-2 text-xs sm:text-[13px] text-slate-400 font-normal">
              18 questions
            </p>
          </Reveal>

          <Reveal direction="zoom" delay={200}>
            <div className="mt-6 relative w-full aspect-[16/10] overflow-hidden rounded-2xl shadow-md bg-slate-100 border border-slate-100">
              <Image
                src="/images/Help-Center/hc10.png"
                alt="Help Center and support operations office"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* Right Column: 18 Accordion Questions */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {helpCenterFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.id} delay={Math.min(i, 6) * 40}>
                <div className="group">
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 sm:py-4.5 text-left text-xs sm:text-sm font-bold text-slate-900 transition-colors hover:text-amber-600"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`grid h-6 w-6 sm:h-7 sm:w-7 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-[#ffc20e] text-[#0B1220] rotate-45 shadow-xs"
                          : "border border-slate-300 bg-white text-slate-500 group-hover:border-amber-400 group-hover:text-slate-800"
                      }`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-4 sm:pb-5 pr-8 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                        {faq.a}
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

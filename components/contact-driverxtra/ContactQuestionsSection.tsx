"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface FaqItem {
  id: string;
  q: string;
  a: string;
}

const contactFaqs: FaqItem[] = [
  {
    id: "cf-1",
    q: "How do I contact DriverXtra?",
    a: "Select your country or region and the topic you need help with. The page should show only contact routes currently approved for that purpose; a route may be unavailable in some markets.",
  },
  {
    id: "cf-2",
    q: "Can I ask a question without signing in?",
    a: "Yes. General inquiries and public topic guidance can be submitted without creating an account or logging in.",
  },
  {
    id: "cf-3",
    q: "Where do I report fraud?",
    a: "Visit our dedicated Report Fraud portal or use the safety routing links above to file an expedited security report.",
  },
  {
    id: "cf-4",
    q: "How can I report a suspicious listing?",
    a: "Select the 'Report a Listing' link directly on the vehicle or parts listing page, or submit details through our safety contact pathway.",
  },
  {
    id: "cf-5",
    q: "What should I do in an emergency?",
    a: "DriverXtra is not an emergency response service. If there is immediate physical danger, fraud in progress, or legal peril, contact local police and emergency authorities immediately.",
  },
  {
    id: "cf-6",
    q: "Can I call DriverXtra?",
    a: "Phone support is published only for specific contracted enterprise and dealer accounts. General consumers are supported through verified online inquiry channels.",
  },
  {
    id: "cf-7",
    q: "Is live chat available?",
    a: "Live chat availability depends on regional operational hours and account tier. If available in your country, a chat widget will appear in the bottom corner.",
  },
  {
    id: "cf-8",
    q: "How quickly will I get a response?",
    a: "Inquiry queue times vary by category. Safety and account security issues are triaged with highest priority, typically within 24 to 48 hours.",
  },
  {
    id: "cf-9",
    q: "What information should I include?",
    a: "Provide your market, a clear description of your issue, relevant listing URLs or order reference numbers, and any verifiable documentation.",
  },
  {
    id: "cf-10",
    q: "Can I attach a screenshot or document?",
    a: "Yes. Once your initial inquiry form is submitted, the ticket confirmation email allows you to reply with attached PDFs, photos, or transaction records.",
  },
  {
    id: "cf-11",
    q: "How will I know my inquiry was received?",
    a: "You will receive an automated confirmation email containing a unique inquiry reference tracking code (e.g. CT-XXXXXX).",
  },
  {
    id: "cf-12",
    q: "What if my submission fails?",
    a: "Check your internet connection, confirm that all required form fields are completed, or consult the Platform Status page for any temporary system maintenance.",
  },
  {
    id: "cf-13",
    q: "Can you help with an order from a partner?",
    a: "We can facilitate communication with authorized providers, but fulfillment, returns, and delivery terms remain the direct contractual responsibility of the merchant.",
  },
  {
    id: "cf-14",
    q: "What about a vehicle finance or insurance issue?",
    a: "Underwriting decisions, payment agreements, and claims must be resolved directly with the regulated lender or insurance carrier.",
  },
  {
    id: "cf-15",
    q: "How do businesses contact DriverXtra?",
    a: "Commercial fleets, dealerships, and parts suppliers can submit inquiries through the Dealer Support or Enterprise Contact portals.",
  },
  {
    id: "cf-16",
    q: "Where can journalists send an inquiry?",
    a: "Media and press representatives should route inquiries to our corporate press desk via the Press or Media contact options.",
  },
  {
    id: "cf-17",
    q: "How do I ask about jobs?",
    a: "Current career opportunities and recruiting department contact details are listed on our official Careers and About DriverXtra portals.",
  },
  {
    id: "cf-18",
    q: "What happens to the information I submit?",
    a: "Submitted information is processed strictly according to our Privacy Policy and used solely to investigate and resolve your specified inquiry.",
  },
];

export default function ContactQuestionsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-[#F8F9FC] py-16 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className={`${container} grid gap-10 lg:grid-cols-[1.1fr_1.9fr] lg:gap-14 items-start`}>
        {/* Left Column: Heading, Subtitle & Count */}
        <div className="lg:sticky lg:top-36 lg:self-start">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">FAQ</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
              Contact questions
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
              Proposed answers, pending owner review.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-2 text-xs sm:text-[13px] text-slate-400 font-normal">
              18 questions
            </p>
          </Reveal>
        </div>

        {/* Right Column: 18 Accordion Questions */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {contactFaqs.map((faq, i) => {
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

"use client";

import { useState } from "react";
import { Plus, X, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const faqs = [
  {
    question: "What is DriverXtra?",
    answer:
      "DriverXtra is a global automotive marketplace and commerce platform for vehicles, parts, accessories and automotive services. It provides verification, transaction and governance infrastructure rather than acting as a dealer or retailer.",
  },
  {
    question: "Can I buy and sell vehicles on DriverXtra?",
    answer:
      "DriverXtra connects buyers and sellers through vehicle listings and marketplace services. Available features depend on the market and the participating seller.",
  },
  {
    question: "How does DriverXtra verify sellers and businesses?",
    answer:
      "DriverXtra uses identity, ownership and business verification processes. Verification levels indicate the checks a participant has completed.",
  },
  {
    question: "How do I know whether a part fits my vehicle?",
    answer:
      "Select your vehicle using its make, model and year, or the available vehicle identification details. Check the compatibility information provided on the part listing before purchasing.",
  },
  {
    question: "Does DriverXtra provide finance or insurance?",
    answer:
      "DriverXtra connects users with third-party finance and insurance partners where available. Finance, insurance, eligibility and approval are determined by the respective providers.",
  },
  {
    question: "How are disputes and fraud reports handled?",
    answer:
      "Users can report suspicious activity or raise transaction disputes through the available reporting process. Reports are reviewed using the relevant transaction records and supporting evidence.",
  },
];

export default function AnswerCentre() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full overflow-hidden bg-[#F5F7FA] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      {/* Same width as the other sections */}
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-8 md:grid-cols-[280px_minmax(0,1fr)] md:gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12">
        {/* Left heading */}
        <Reveal direction="up">
          <div className="md:pt-1">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-5 rounded-full bg-[#FFB900] transition-all duration-300 hover:w-9" />

              <span className="text-sm font-bold leading-7 text-[#D99400]">
                Answer centre
              </span>
            </div>

            <h2 className="mt-2 text-3xl font-extrabold leading-9 tracking-tight text-[#172033] sm:text-4xl sm:leading-10">
              Questions,
              <br />
              answered
            </h2>

            <p className="mt-2 max-w-[320px] text-sm leading-6 text-[#77849B] sm:text-base sm:leading-7">
              Short, factual answers about how DriverXtra works.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#77849B]">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#FFF0C2] text-[#A36D00]">
                <ArrowRight size={14} />
              </span>
              <span>Explore frequently asked questions</span>
            </div>
          </div>
        </Reveal>

        {/* FAQ accordion */}
        <div className="min-w-0">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-question-${index}`;
            const answerId = `faq-answer-${index}`;

            return (
              <Reveal
                key={faq.question}
                direction="up"
                delay={index * 70}
              >
                <div className="group/faq relative border-b border-[#DCE3ED] transition-colors duration-300 hover:border-[#FFB900]/70">
                  {/* Animated accent */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#FFB900] transition-all duration-300 ${
                      isOpen
                        ? "w-full"
                        : "w-0 group-hover/faq:w-full"
                    }`}
                  />

                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() =>
                        setOpenIndex(isOpen ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-4 py-5 text-left transition-all duration-300 hover:pl-1"
                    >
                      <span
                        className={`text-sm font-bold leading-6 transition-colors duration-300 sm:text-base sm:leading-7 ${
                          isOpen
                            ? "text-[#B47B00]"
                            : "text-[#172033] group-hover/faq:text-[#B47B00]"
                        }`}
                      >
                        {faq.question}
                      </span>

                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-180 border-[#FFB900] bg-[#FFB900] text-[#0B1220] shadow-[0_4px_14px_rgba(255,185,0,0.18)]"
                            : "border-[#DCE3ED] bg-white text-[#172033] group-hover/faq:border-[#FFB900] group-hover/faq:bg-[#FFF5D9] group-hover/faq:text-[#B47B00]"
                        }`}
                      >
                        {isOpen ? (
                          <X
                            size={15}
                            strokeWidth={1.7}
                            className="transition-transform duration-300"
                          />
                        ) : (
                          <Plus
                            size={16}
                            strokeWidth={1.5}
                            className="transition-transform duration-300 group-hover/faq:rotate-90"
                          />
                        )}
                      </span>
                    </button>
                  </h3>

                  {/* Animated answer */}
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="overflow-hidden"
                  >
                    {isOpen && (
                      <div className="animate-in slide-in-from-top-1 fade-in duration-300 pb-5 pr-2 sm:pr-12">
                        <p className="text-sm leading-6 text-[#43516B] sm:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    )}
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
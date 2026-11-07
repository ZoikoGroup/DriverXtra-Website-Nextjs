"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { FAQS } from "./data";

export default function BlackFridayFaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="scroll-mt-28 bg-[#0d1829] py-20 text-white md:py-24">
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="bf-display text-4xl leading-[1.05] font-extrabold sm:text-5xl">
              Questions
              <br />
              drivers ask
            </h2>
            <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-slate-400">
              Straight answers about plans, data and the Black Friday offer.
            </p>
          </Reveal>

          <ul className="border-b border-white/10 lg:col-span-7 lg:col-start-6">
            {FAQS.map((f, i) => {
              const open = openId === f.id;
              return (
                <Reveal key={f.id} as="li" delay={i * 50} className="border-t border-white/10">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`faq-${f.id}`}
                      onClick={() => setOpenId(open ? null : f.id)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left text-[17px] font-bold transition-colors hover:text-[#fcd116]"
                    >
                      {f.question}
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          open ? "rotate-45 border-[#fcd116] bg-[#fcd116] text-[#13243c]" : "border-white/50"
                        }`}
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-${f.id}`}
                    className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <p className="overflow-hidden pr-12 text-[16px] leading-relaxed text-slate-300">
                      <span className="block pb-5">{f.answer}</span>
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

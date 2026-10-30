"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { FleetEyebrow } from "./FleetSectionHead";
import { PLUS_ICON, PLUS_OPEN_ICON } from "./data";

export type FleetFaq = { q: string; a: string };

type FleetFaqSectionProps = {
  title: ReactNode;
  faqs: FleetFaq[];
  /** Vertical padding of the section; pages differ in how much space sits above the FAQ. */
  className?: string;
};

export default function FleetFaqSection({ title, faqs, className = "py-[66px]" }: FleetFaqSectionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className={`flex w-full max-w-[1440px] flex-col gap-12 px-4 lg:flex-row lg:items-start lg:px-20 ${className}`}
    >
      <div className="flex w-full flex-col pb-8 lg:sticky lg:top-40 lg:w-[360px] lg:shrink-0">
        <div className="flex flex-col gap-2 pt-[7.5px]">
          <FleetEyebrow>FAQ</FleetEyebrow>
          <h2 className="pt-[4.745px] pb-[0.695px] text-[37.5px] leading-[44.8px] font-extrabold tracking-[-0.8px] text-[#172033] max-sm:text-[28px] max-sm:leading-[34px]">
            {title}
          </h2>
          <p className="max-w-[620px] text-[17px] leading-[26.35px] font-normal text-[#667085]">
            Draft answers pending legal and product review.
          </p>
        </div>
      </div>

      <div className="flex min-w-px flex-1 flex-col">
        {faqs.map(({ q, a }, i) => {
          const isOpen = open === i;
          return (
            <div key={q} className="flex flex-col border-b border-solid border-[#d7dee8]">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`flex w-full items-center justify-between gap-4 py-5 text-left ${isOpen ? "min-h-[74px]" : ""}`}
              >
                <span className="text-[16.4px] leading-[27.13px] font-bold tracking-[-0.175px] text-[#172033]">{q}</span>
                <span
                  className={`flex size-[34px] shrink-0 items-center justify-center rounded-[17px] border border-solid transition-transform duration-300 ${
                    isOpen ? "rotate-45 border-[#f5b400] bg-[#f5b400]" : "border-[#d7dee8]"
                  }`}
                >
                  <Image src={isOpen ? PLUS_OPEN_ICON : PLUS_ICON} alt="" width={16} height={16} unoptimized />
                </span>
              </button>
              {isOpen && a && (
                <p className="pr-[50px] pb-5 text-[16px] leading-[24.8px] font-normal text-[#3b4660]">{a}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ClaimTypeDefinition = {
  id: string;
  claim: string;
  meaning: string;
  limit: string;
};

const DEFAULT_CLAIM_TYPES: ClaimTypeDefinition[] = [
  {
    id: "oem-genuine",
    claim: "OEM / genuine",
    meaning: "Claims the original manufacturer made the part.",
    limit:
      "Needs issuer-authoritative evidence for that part and market. Seller verification alone doesn't establish it.",
  },
  {
    id: "oes",
    claim: "OES",
    meaning: "Made by an original equipment supplier.",
    limit: "May not carry manufacturer branding or be the identical OEM part.",
  },
  {
    id: "authorized-aftermarket",
    claim: "Authorized aftermarket",
    meaning: "A third-party part with manufacturing or licence claims.",
    limit: 'Shouldn\'t be described as "genuine OEM".',
  },
  {
    id: "unlicensed-aftermarket",
    claim: "Unlicensed aftermarket",
    meaning: "A third-party part without a licence claim.",
    limit: "May be lawful in some markets — not automatically counterfeit.",
  },
  {
    id: "remanufactured",
    claim: "Remanufactured",
    meaning: "Refurbished to an asserted process or specification.",
    limit: "Not the same as new OEM; check origin and condition wording.",
  },
  {
    id: "used",
    claim: "Used",
    meaning: "Previously used; condition separate from origin.",
    limit: "No performance guarantee.",
  },
  {
    id: "unbranded-unknown",
    claim: "Unbranded / unknown",
    meaning: "No brand evidence is available.",
    limit:
      "Absence of evidence isn't proof of fraud — it's \"not established\".",
  },
];

type WhatDifferentPartsClaimsMeanSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  claimTypes?: ClaimTypeDefinition[];
  className?: string;
};

export default function WhatDifferentPartsClaimsMeanSection({
  id = "claim-types",
  eyebrow = "Claim types",
  title = "What different parts claims mean",
  description = "Neutral definitions — a category alone never proves or disproves authenticity.",
  claimTypes = DEFAULT_CLAIM_TYPES,
  className = "bg-[#F6F8FB]",
}: WhatDifferentPartsClaimsMeanSectionProps) {
  const [activeTabId, setActiveTabId] = useState<string>("oem-genuine");

  const activeClaim =
    claimTypes.find((item) => item.id === activeTabId) || claimTypes[0];

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* Top Interactive Tabs & Detail Card */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Vertical Tab Buttons */}
          <div className="space-y-2 lg:col-span-4">
            {claimTypes.map((item) => {
              const isActive = activeTabId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTabId(item.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-xs font-bold transition-all duration-200 sm:text-sm ${
                    isActive
                      ? "bg-[#0B1220] text-white shadow-xs"
                      : "border border-slate-200/80 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span>{item.claim}</span>
                </button>
              );
            })}
          </div>

          {/* Right Preview Card Box */}
          <Reveal delay={120} className="lg:col-span-8">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              <h3 className="text-base font-bold text-ink">
                {activeClaim.claim}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                {activeClaim.meaning}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Bottom All Claim Types at a Glance Table */}
        <Reveal delay={200} className="mt-16">
          <div className="text-center">
            <h4 className="text-xs font-bold text-slate-500 sm:text-sm">
              All claim types at a glance
            </h4>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200/80 bg-slate-50/50 text-slate-500">
                <tr>
                  <th scope="col" className="py-3.5 pl-6 pr-4 font-semibold">
                    Claim
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">
                    Meaning
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-6 font-semibold">
                    Limit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {claimTypes.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 pl-6 pr-4 font-bold text-ink whitespace-nowrap">
                      {item.claim}
                    </td>
                    <td className="px-4 py-4 leading-relaxed text-slate-600">
                      {item.meaning}
                    </td>
                    <td className="py-4 pl-4 pr-6 leading-relaxed text-slate-500">
                      {item.limit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

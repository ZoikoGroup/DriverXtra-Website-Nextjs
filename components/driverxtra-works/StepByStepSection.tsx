"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface StepItem {
  number: number;
  title: string;
  description: string;
}

interface TabCategory {
  id: string;
  name: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  steps: StepItem[];
}

const tabCategories: TabCategory[] = [
  {
    id: "find-vehicle",
    name: "Find a vehicle",
    title: "Find a vehicle: step by step",
    imageSrc: "/images/DriverXtra-Works/w8.png",
    imageAlt: "Front view of performance sport vehicle",
    steps: [
      {
        number: 1,
        title: "Search",
        description: "Choose your market, search vehicles, use filters and save options to compare.",
      },
      {
        number: 2,
        title: "Evaluate",
        description: "Review seller verification scope, history and condition evidence, and inspection options.",
      },
      {
        number: 3,
        title: "Inquire",
        description: "Contact the seller through the enabled channel. Keep personal details private.",
      },
      {
        number: 4,
        title: "Inspect and agree",
        description: "Arrange a viewing or independent inspection, and agree terms with the seller.",
      },
      {
        number: 5,
        title: "Complete safely",
        description: "Verify that funds are cleared and paperwork is right before handover.",
      },
    ],
  },
  {
    id: "sell-vehicle",
    name: "Sell a vehicle",
    title: "Sell a vehicle: step by step",
    imageSrc: "/images/DriverXtra-Works/w3.png",
    imageAlt: "Vehicle prepared for sale",
    steps: [
      {
        number: 1,
        title: "List details",
        description: "Provide accurate vehicle specs, VIN, condition photos, and ownership history.",
      },
      {
        number: 2,
        title: "Verify identity",
        description: "Complete identity and title verification to receive verified seller badges.",
      },
      {
        number: 3,
        title: "Manage inquiries",
        description: "Review questions and arrange qualified viewings through DriverXtra channels.",
      },
      {
        number: 4,
        title: "Agree offer",
        description: "Confirm price, inspection agreements, and escrow or payment terms.",
      },
      {
        number: 5,
        title: "Handover securely",
        description: "Transfer documents and release vehicle once payment confirmation is settled.",
      },
    ],
  },
  {
    id: "find-parts",
    name: "Find parts",
    title: "Find parts: step by step",
    imageSrc: "/images/DriverXtra-Works/w4.png",
    imageAlt: "Automotive engine parts and components",
    steps: [
      {
        number: 1,
        title: "Check fitment",
        description: "Filter by vehicle make, model, year or VIN to ensure part compatibility.",
      },
      {
        number: 2,
        title: "Review provider",
        description: "Inspect OEM claims, warranty coverage, seller reviews, and return terms.",
      },
      {
        number: 3,
        title: "Place order",
        description: "Submit purchase request with tracking and secure payment guarantee.",
      },
      {
        number: 4,
        title: "Track shipping",
        description: "Receive dispatch updates and verified delivery logistics directly.",
      },
      {
        number: 5,
        title: "Inspect on delivery",
        description: "Examine components upon receipt and verify condition against order details.",
      },
    ],
  },
  {
    id: "arrange-service",
    name: "Arrange a service",
    title: "Arrange a service: step by step",
    imageSrc: "/images/DriverXtra-Works/w5.png",
    imageAlt: "Car servicing in professional shop",
    steps: [
      {
        number: 1,
        title: "Select service",
        description: "Choose maintenance, mechanical repair, diagnostic, or cosmetic detailing.",
      },
      {
        number: 2,
        title: "Compare shops",
        description: "Evaluate certified specialists, ratings, certifications, and distance.",
      },
      {
        number: 3,
        title: "Request quote",
        description: "Share vehicle requirements and receive estimated pricing and schedules.",
      },
      {
        number: 4,
        title: "Confirm booking",
        description: "Select an available appointment slot and approve the agreed work order.",
      },
      {
        number: 5,
        title: "Collect and pay",
        description: "Review completed checklist, sign off, and settle invoices with warranty records.",
      },
    ],
  },
  {
    id: "finance-insurance",
    name: "Explore finance and insurance",
    title: "Explore finance and insurance: step by step",
    imageSrc: "/images/DriverXtra-Works/w6.png",
    imageAlt: "Finance and insurance consultation",
    steps: [
      {
        number: 1,
        title: "Calculate budget",
        description: "Use loan or insurance comparison calculators to estimate monthly costs.",
      },
      {
        number: 2,
        title: "Compare offers",
        description: "Review APR, terms, deductibles, and institutional lender protections.",
      },
      {
        number: 3,
        title: "Pre-qualify",
        description: "Submit soft-check inquiries without impacting your underlying credit score.",
      },
      {
        number: 4,
        title: "Complete underwriting",
        description: "Provide necessary proof of income, residence, and vehicle documentation.",
      },
      {
        number: 5,
        title: "Finalize coverage",
        description: "Bind your insurance policy or disburse finance direct to the automotive transaction.",
      },
    ],
  },
  {
    id: "business-partners",
    name: "Business and partners",
    title: "Business and partners: step by step",
    imageSrc: "/images/DriverXtra-Works/w7.png",
    imageAlt: "Commercial transport and dealer operations",
    steps: [
      {
        number: 1,
        title: "Select track",
        description: "Choose dealer storefront, fleet management, logistics, or parts distribution.",
      },
      {
        number: 2,
        title: "Submit credentials",
        description: "Share business licensing, tax identification, and corporate operating details.",
      },
      {
        number: 3,
        title: "Connect inventory",
        description: "Sync stock automatically via API, DMS, webhooks, or direct bulk catalog feeds.",
      },
      {
        number: 4,
        title: "Configure workflows",
        description: "Set up pricing rules, lead routing, regional boundaries, and staff roles.",
      },
      {
        number: 5,
        title: "Scale operations",
        description: "Access verified multi-market distribution, analytics dashboards, and support.",
      },
    ],
  },
];

export default function StepByStepSection() {
  const [activeTabId, setActiveTabId] = useState<string>("find-vehicle");

  const currentTab = tabCategories.find((tab) => tab.id === activeTabId) || tabCategories[0];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className={container}>
        {/* Header */}
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Step by step</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
              {currentTab.title}
            </h2>
          </Reveal>
        </div>

        {/* Tab Navigation Pills */}
        <div className="mt-6 sm:mt-8">
          <div className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-slate-200/90 bg-white p-1 shadow-xs no-scrollbar">
            {tabCategories.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  type="button"
                  className={`cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#0B1220] font-semibold text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content: 2-Column Layout */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Image */}
          <Reveal direction="zoom" delay={120} className="lg:col-span-6 xl:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-md">
              <Image
                src={currentTab.imageSrc}
                alt={currentTab.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-opacity duration-300"
              />
            </div>
          </Reveal>

          {/* Right Column: 5 Steps Stack */}
          <div className="space-y-3 lg:col-span-6 xl:col-span-6">
            {currentTab.steps.map((step, idx) => (
              <Reveal key={step.number} delay={idx * 60}>
                <div className="flex items-start gap-3.5 rounded-xl border border-slate-200/90 bg-white p-3.5 sm:p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-xs">
                  {/* Number badge */}
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0B1220] text-xs font-bold text-[#ffc20e] shadow-xs mt-0.5">
                    {step.number}
                  </div>

                  {/* Text details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-0.5 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

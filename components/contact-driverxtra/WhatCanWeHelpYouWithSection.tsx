"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronDown, Circle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface InquiryOption {
  id: string;
  title: string;
  subtitle: string;
  href?: string;
  isSafety?: boolean;
}

interface InquiryCategory {
  title: string;
  options: InquiryOption[];
}

const inquiryCategories: InquiryCategory[] = [
  {
    title: "EVERYDAY",
    options: [
      {
        id: "general-info",
        title: "General information",
        subtitle: "Inquiry form available",
      },
      {
        id: "buying-vehicle",
        title: "Buying a vehicle",
        subtitle: "Inquiry form available",
      },
      {
        id: "selling-vehicle",
        title: "Selling a vehicle",
        subtitle: "Inquiry form available",
      },
      {
        id: "part-order-concern",
        title: "Part order concern",
        subtitle: "Inquiry form available",
      },
      {
        id: "service-appointment",
        title: "Service appointment",
        subtitle: "Inquiry form available",
      },
    ],
  },
  {
    title: "SAFETY",
    options: [
      {
        id: "suspected-fraud",
        title: "Suspected fraud",
        subtitle: "Goes to Report Fraud",
        href: "/report-a-fraud",
        isSafety: true,
      },
      {
        id: "suspicious-listing",
        title: "Suspicious listing",
        subtitle: "Goes to Report a Listing",
        href: "/report-a-listing",
        isSafety: true,
      },
      {
        id: "account-security",
        title: "Account security",
        subtitle: "Goes to Account security help",
        href: "/seller-safety",
        isSafety: true,
      },
      {
        id: "part-authenticity",
        title: "Part authenticity concern",
        subtitle: "Goes to Parts Authenticity",
        href: "/parts-authenticity",
        isSafety: true,
      },
    ],
  },
  {
    title: "SPECIALIST",
    options: [
      {
        id: "finance-question",
        title: "Finance question",
        subtitle: "Goes to Vehicle Finance",
        href: "/compare-vehicle-finance",
      },
      {
        id: "insurance-question",
        title: "Insurance question",
        subtitle: "Goes to Insurance",
        href: "/compare-insurance",
      },
    ],
  },
  {
    title: "BUSINESS",
    options: [
      {
        id: "dealer-account",
        title: "Dealer account",
        subtitle: "Goes to Dealer Support",
        href: "/dealer-support",
      },
      {
        id: "fleet-enterprise",
        title: "Fleet or enterprise",
        subtitle: "Goes to Enterprise Contact",
        href: "/enterprise-contact",
      },
      {
        id: "become-provider",
        title: "Become a provider",
        subtitle: "Goes to Partner Onboarding",
        href: "/partner-onboarding",
      },
      {
        id: "developer-integration",
        title: "Developer integration",
        subtitle: "Goes to Developer Hub",
        href: "/developer-hub",
      },
    ],
  },
  {
    title: "COMPANY",
    options: [
      {
        id: "press-media",
        title: "Press or media",
        subtitle: "Goes to Press & Media",
        href: "/about-driverxtra",
      },
      {
        id: "employment",
        title: "Employment",
        subtitle: "Goes to Careers",
        href: "/about-driverxtra",
      },
      {
        id: "partnership-proposal",
        title: "Partnership proposal",
        subtitle: "Goes to Partner With Us",
        href: "/enterprise-contact",
      },
    ],
  },
];

const availableRegions = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "United Arab Emirates",
];

export default function WhatCanWeHelpYouWithSection() {
  const [selectedOptionId, setSelectedOptionId] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("United Kingdom");
  const [isChangingRegion, setIsChangingRegion] = useState<boolean>(false);
  const [referenceCode, setReferenceCode] = useState<string>("");
  const [checkResult, setCheckResult] = useState<string | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceCode.trim()) {
      setCheckResult("Please enter a valid reference code.");
    } else {
      setCheckResult(`No open public inquiry found for reference "${referenceCode}". Please check your confirmation email.`);
    }
  };

  return (
    <section id="choose-a-topic" className="bg-white py-16 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className={container}>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Form & Topic Options */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Header */}
            <Reveal>
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">Step 1</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
                What can we help you with?
              </h2>
            </Reveal>

            {/* Region Selector Box */}
            <Reveal delay={150}>
              <div className="mt-6 max-w-sm">
                <label className="block text-xs font-semibold text-slate-700">
                  Your country or region
                </label>
                <div className="mt-1.5 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                  {isChangingRegion ? (
                    <select
                      value={selectedRegion}
                      onChange={(e) => {
                        setSelectedRegion(e.target.value);
                        setIsChangingRegion(false);
                      }}
                      className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none"
                    >
                      {availableRegions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <>
                      <span className="text-xs sm:text-sm font-semibold text-slate-900">
                        {selectedRegion}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsChangingRegion(true)}
                        className="cursor-pointer text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Change
                      </button>
                    </>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Categorized Options */}
            <div className="mt-8 space-y-8">
              {inquiryCategories.map((category) => (
                <div key={category.title} className="space-y-3">
                  <h3 className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                    {category.title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.options.map((option) => {
                      const isSelected = selectedOptionId === option.id;
                      const cardClasses = `group flex cursor-pointer items-start gap-3 rounded-xl p-3.5 sm:p-4 text-left transition-all duration-200 ${
                        option.isSafety
                          ? isSelected
                            ? "border-2 border-rose-400 bg-rose-50/30 shadow-xs"
                            : "border border-rose-200/90 bg-white hover:border-rose-300 hover:shadow-xs"
                          : isSelected
                          ? "border-2 border-amber-400 bg-amber-50/20 shadow-xs"
                          : "border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
                      }`;

                      const content = (
                        <>
                          <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-300 transition-colors group-hover:border-slate-400">
                            {isSelected ? (
                              <div className="h-2 w-2 rounded-full bg-slate-900" />
                            ) : null}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                              {option.title}
                            </h4>
                            <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500 leading-snug">
                              {option.subtitle}
                            </p>
                          </div>
                        </>
                      );

                      if (option.href) {
                        return (
                          <Link
                            key={option.id}
                            href={option.href}
                            onClick={() => setSelectedOptionId(option.id)}
                            className={cardClasses}
                          >
                            {content}
                          </Link>
                        );
                      }

                      return (
                        <div
                          key={option.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedOptionId(option.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              setSelectedOptionId(option.id);
                            }
                          }}
                          className={cardClasses}
                        >
                          {content}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual & Verified Channels Sidebar */}
          <div className="space-y-6 lg:col-span-5 xl:col-span-5 lg:mt-16">
            {/* Image card */}
            <Reveal direction="zoom">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-md bg-slate-100 border border-slate-100">
                <Image
                  src="/images/Contact-DriverXtra/cd5.png"
                  alt="DriverXtra presentation and team meeting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            {/* Verified channels card */}
            <Reveal delay={100}>
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Verified channels for {selectedRegion}
                </h3>

                <div className="mt-4 divide-y divide-slate-100 text-xs sm:text-[13px]">
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-600">Web inquiry form</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Available
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-600">Telephone</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                      Not published
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-600">Email</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                      Not published
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-600">Live chat</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                      Not offered
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-600">Help Center</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Available
                    </span>
                  </div>
                </div>

                <p className="mt-4 border-t border-slate-100 pt-3 text-[11px] leading-relaxed text-slate-500">
                  We only show channels that are verified for your market. No response time is promised.
                </p>
              </div>
            </Reveal>

            {/* Check an inquiry card */}
            <Reveal delay={150}>
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Check an inquiry
                </h3>

                <form onSubmit={handleCheck} className="mt-4">
                  <label htmlFor="ref-code" className="block text-xs font-semibold text-slate-700">
                    Reference
                  </label>
                  <input
                    id="ref-code"
                    type="text"
                    value={referenceCode}
                    onChange={(e) => setReferenceCode(e.target.value)}
                    placeholder="CT-XXXXXX"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                  />

                  {checkResult && (
                    <p className="mt-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200/60">
                      {checkResult}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="mt-3 cursor-pointer rounded-lg border border-slate-200 bg-white px-5 py-2 text-xs sm:text-sm font-semibold text-slate-900 shadow-xs transition-colors hover:bg-slate-50 active:bg-slate-100"
                  >
                    Check
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

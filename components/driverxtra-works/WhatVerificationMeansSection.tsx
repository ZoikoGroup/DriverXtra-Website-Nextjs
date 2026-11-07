import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface VerificationScopeItem {
  id: string;
  title: string;
  subtitle: string;
}

const verificationScopeItems: VerificationScopeItem[] = [
  {
    id: "identity",
    title: "Identity",
    subtitle: "A person or account",
  },
  {
    id: "business",
    title: "Business",
    subtitle: "A registered organization",
  },
  {
    id: "credential",
    title: "Credential",
    subtitle: "A qualification or licence",
  },
  {
    id: "listing",
    title: "Listing",
    subtitle: "Selected listing details",
  },
  {
    id: "part",
    title: "Part",
    subtitle: "Source or fitment evidence",
  },
  {
    id: "vehicle",
    title: "Vehicle",
    subtitle: "Specific records, where connected",
  },
];

export default function WhatVerificationMeansSection() {
  return (
    <section className="bg-[#F8F9FC] py-16 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className={container}>
        {/* Header */}
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Verification</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
              What verification does — and doesn't — mean
            </h2>
          </Reveal>
        </div>

        {/* 2-Column Content */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Image */}
          <Reveal direction="zoom" delay={120} className="lg:col-span-6 xl:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-md">
              <Image
                src="/images/DriverXtra-Works/w9.png"
                alt="Signing verification documents"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Right Column: 2x3 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 lg:col-span-6 xl:col-span-6">
            {verificationScopeItems.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 60}>
                <div className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 min-h-[96px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-200 hover:border-slate-300">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[11px] sm:text-xs text-slate-500 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

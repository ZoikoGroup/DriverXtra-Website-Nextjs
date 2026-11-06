import type { ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type EvidenceListOption = {
  id: string;
  label: string;
  selected?: boolean;
};

const DEFAULT_EVIDENCE_LIST: EvidenceListOption[] = [
  { id: "1", label: "Brand-owner attestation", selected: true },
  { id: "2", label: "Distributor agreement" },
  { id: "3", label: "Invoice" },
  { id: "4", label: "Serial or batch record" },
  { id: "5", label: "Packaging or QR code" },
  { id: "6", label: "Warranty card" },
  { id: "7", label: "Lab report" },
  { id: "8", label: "Recall status" },
];

type WhatEvidenceCanAndCantShowSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  options?: EvidenceListOption[];
  attestationImageSrc?: string;
  brandRightsImageSrc?: string;
  serialsImageSrc?: string;
  className?: string;
};

export default function WhatEvidenceCanAndCantShowSection({
  id = "evidence-limits",
  eyebrow = "Evidence",
  title = "What evidence can — and can't — show",
  description = "Each type of evidence has an issuer, a date and limits. Choose one to see its limits.",
  options = DEFAULT_EVIDENCE_LIST,
  attestationImageSrc = "/images/parts/5.png",
  brandRightsImageSrc = "/images/parts/6.png",
  serialsImageSrc = "/images/parts/7.png",
  className = "bg-white",
}: WhatEvidenceCanAndCantShowSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* Top Split Layout matching exact design */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Side: Option Radio List */}
          <div className="space-y-2 lg:col-span-5">
            {options.map((opt) => (
              <div
                key={opt.id}
                className={`flex items-center gap-3.5 rounded-xl border p-3.5 transition-all ${
                  opt.selected
                    ? "border-slate-300 bg-slate-50/90 shadow-2xs"
                    : "border-slate-200/80 bg-white"
                }`}
              >
                <div
                  className={`grid h-4 w-4 place-items-center rounded-full border ${
                    opt.selected
                      ? "border-ink bg-ink text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {opt.selected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </div>
                <span className="text-xs font-bold text-ink sm:text-sm">
                  {opt.label}
                </span>
              </div>
            ))}
          </div>

          {/* Right Side: Active Card Box + Image (/images/parts/5.png) */}
          <Reveal delay={120} className="lg:col-span-7">
            <div className="space-y-6">
              {/* Text Card Box */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs sm:p-8">
                <h3 className="text-base font-bold text-ink">
                  Brand-owner attestation
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  <span className="font-bold text-ink">What it can show:</span>{" "}
                  Authority to claim a relationship, bounded by part, market,
                  channel and expiry.
                </p>
              </div>

              {/* Main Signing Document Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-sm">
                <Image
                  src={attestationImageSrc}
                  alt="Person signing attestation paperwork"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom 2 Image Cards (/images/parts/6.png and /images/parts/7.png) */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Brand Rights Card */}
          <Reveal delay={200}>
            <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300">
              <div className="relative aspect-[24/9] w-full overflow-hidden bg-slate-900">
                <Image
                  src={brandRightsImageSrc}
                  alt="Corporate high-rise buildings representing brand rights"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="text-base font-bold text-ink sm:text-lg">
                    Brand rights
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Manufacturers, distributors and dealers may hold rights
                    limited by territory, channel and dates. Brand-right claims
                    need evidence for that scope.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Serials, Batches and Markings Card */}
          <Reveal delay={260}>
            <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300">
              <div className="relative aspect-[24/9] w-full overflow-hidden bg-slate-900">
                <Image
                  src={serialsImageSrc}
                  alt="Abstract liquid patterns representing batch and serial markings"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="text-base font-bold text-ink sm:text-lg">
                    Serials, batches and markings
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Markings are illustrative indicators. There&apos;s no live
                    serial lookup on this page — where an issuer offers one, use
                    it directly.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

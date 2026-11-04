"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { X, Clock, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type NotEstablishedItem = string;

type SignalChangeItem = {
  title: string;
  description: string;
};

type SelfProtectionChecklistItem = {
  id: string;
  label: string;
};

const DEFAULT_NOT_ESTABLISHED: NotEstablishedItem[] = [
  "Vehicle inspection or mechanical condition",
  "Ownership, title or finance clearance",
  "A safe transaction or payment protection",
  "That parts are original or genuine",
  "Fitness for your intended use",
];

const DEFAULT_SIGNAL_CHANGES: SignalChangeItem[] = [
  {
    title: "Expiry",
    description: "checks can lapse on a set date",
  },
  {
    title: "Stale",
    description: "old results show as non-current",
  },
  {
    title: "Re-review",
    description: "new information can reopen a check",
  },
  {
    title: "Revocation",
    description: "signals can be withdrawn",
  },
  {
    title: "Source outage",
    description: "shown as unavailable, never green",
  },
];

const DEFAULT_PROTECTION_CHECKLIST: SelfProtectionChecklistItem[] = [
  {
    id: "inspect",
    label:
      "See the vehicle or part in person, or use an independent inspection",
  },
  {
    id: "history",
    label: "Check history and ownership documents yourself",
  },
  {
    id: "channels",
    label: "Keep payment and messages on approved channels",
  },
  {
    id: "pressure",
    label: "Be wary of pressure to act quickly",
  },
];

type WhatVerificationDoesNotEstablishSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  notEstablishedList?: NotEstablishedItem[];
  signalChangesList?: SignalChangeItem[];
  protectionChecklist?: SelfProtectionChecklistItem[];
  carImageSrc?: string;
  carImageAlt?: string;
  docsImageSrc?: string;
  docsImageAlt?: string;
  oilImageSrc?: string;
  oilImageAlt?: string;
  className?: string;
};

export default function WhatVerificationDoesNotEstablishSection({
  id = "limits-and-freshness",
  eyebrow = "Limits and freshness",
  title = "What verification does not establish",
  description = "Treat signals as one input — not a guarantee.",
  notEstablishedList = DEFAULT_NOT_ESTABLISHED,
  signalChangesList = DEFAULT_SIGNAL_CHANGES,
  protectionChecklist = DEFAULT_PROTECTION_CHECKLIST,
  carImageSrc = "/images/how/7.png",
  carImageAlt = "Black sports car driving on a highway at dusk",
  docsImageSrc = "/images/how/8.png",
  docsImageAlt = "Person reviewing invoices and financial documents with a calculator",
  oilImageSrc = "/images/how/9.png",
  oilImageAlt = "Mechanic pouring motor oil into an engine bay",
  className = "bg-[#F6F8FB]",
}: WhatVerificationDoesNotEstablishSectionProps) {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleCheck = (itemId: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 2x2 Grid Layout */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Top-Left Card: Not established by a signal */}
          <Reveal delay={100}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300">
              <div className="relative aspect-[20/9] w-full overflow-hidden bg-slate-900">
                <Image
                  src={carImageSrc}
                  alt={carImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="text-base font-bold text-ink">
                    Not established by a signal
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {notEstablishedList.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500 stroke-[2.5]" />
                        <span className="text-xs text-slate-700 sm:text-sm">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Top-Right Card: When signals change */}
          <Reveal delay={180}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300">
              <div className="relative aspect-[20/9] w-full overflow-hidden bg-slate-900">
                <Image
                  src={docsImageSrc}
                  alt={docsImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="text-base font-bold text-ink">
                    When signals change
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {signalChangesList.map(
                      ({ title: itemTitle, description: itemDesc }) => (
                        <li key={itemTitle} className="flex items-start gap-3">
                          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#B96B13] stroke-[2]" />
                          <span className="text-xs text-slate-700 sm:text-sm">
                            <strong className="font-semibold text-ink">
                              {itemTitle}:
                            </strong>{" "}
                            <span className="text-slate-500">{itemDesc}</span>
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bottom-Left Block: Protect yourself Interactive Checklist */}
          <Reveal delay={240}>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-ink">
                  Protect yourself
                </h3>

                <div className="mt-4 space-y-3">
                  {protectionChecklist.map(({ id: itemId, label }) => {
                    const isChecked = Boolean(checkedIds[itemId]);

                    return (
                      <label
                        key={itemId}
                        onClick={() => toggleCheck(itemId)}
                        className={`flex cursor-pointer items-center gap-3.5 rounded-xl border p-4 transition-all duration-200 ${
                          isChecked
                            ? "border-slate-300 bg-slate-50/80 shadow-2xs"
                            : "border-slate-200/80 bg-white hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="h-4 w-4 rounded border-slate-300 text-ink focus:ring-slate-900"
                        />
                        <span className="text-xs font-medium text-slate-700 sm:text-sm">
                          {label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bottom-Right Card: Parts and authenticity */}
          <Reveal delay={300}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                <Image
                  src={oilImageSrc}
                  alt={oilImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="text-base font-bold text-ink">
                    Parts and authenticity
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Provenance and counterfeit concerns have their own route,
                    separate from seller verification.
                  </p>
                </div>

                <div className="mt-6">
                  <a
                    href="#parts-authenticity"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D5FD1] hover:underline sm:text-sm"
                  >
                    Parts Authenticity & Anti-Counterfeit
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

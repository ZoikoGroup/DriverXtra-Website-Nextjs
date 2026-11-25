"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { checklistItems } from "./data";

const pill =
  "inline-flex h-9 items-center rounded-full border border-slate-300 bg-white px-4 text-xs font-semibold text-ink transition-colors hover:border-ink";

export default function ChecklistSection() {
  const [done, setDone] = useState<boolean[]>(() => checklistItems.map(() => false));
  const count = done.filter(Boolean).length;

  return (
    <section id="checklist" className="scroll-mt-28 bg-slate-50 py-16 md:py-20">
      <div className={`${container} grid items-start gap-10 lg:grid-cols-2`}>
        <div>
          <SectionTitle eyebrow="Checklist" title="Before you commit to a vehicle" />

          <ul className="mt-6 space-y-3">
            {checklistItems.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 80}>
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3 transition-colors ${
                    done[i] ? "border-emerald-300" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-4 w-4 shrink-0 rounded-full transition-colors ${done[i] ? "bg-emerald-600" : "bg-ink"}`}
                  />
                  <span className={`flex-1 text-[13px] leading-relaxed ${done[i] ? "text-slate-500 line-through" : "text-slate-700"}`}>
                    {item}
                  </span>
                  <input
                    type="checkbox"
                    checked={done[i]}
                    onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                    className="h-4 w-4 shrink-0 accent-ink"
                  />
                </label>
              </Reveal>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-slate-500" aria-live="polite">
            {count} of {checklistItems.length} done — nothing is saved
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/inspection-appraisal"
              className="inline-flex h-9 items-center rounded-full bg-brand px-4 text-xs font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg"
            >
              Arrange an independent inspection
            </Link>
            <a href="#official-checks" className={pill}>
              Check Official Recall Records
            </a>
          </div>
        </div>

        <Reveal direction="zoom" delay={150}>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="relative aspect-[8/3] bg-slate-200">
              <Image
                src="/images/vehicle-history/checklist-review-documents.webp"
                alt="Two people reviewing documents together"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
                <TriangleAlert aria-hidden className="h-4 w-4" />
                Something doesn&apos;t add up?
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                Pause the purchase. Ask for documents, recheck the identifier and source date.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/report-a-listing" className={pill}>
                  Report a Listing Concern
                </Link>
                <Link href="/report-a-fraud" className={pill}>
                  Report Fraud
                </Link>
                <Link href="/trust-buyer-safety" className={pill}>
                  Buyer Safety
                </Link>
              </div>
              <p className="mt-4 text-[11px] text-slate-500">Don&apos;t post a VIN or personal details in public reports.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

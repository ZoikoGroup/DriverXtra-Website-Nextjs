import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type VerificationStatusTone = "ok" | "warn" | "muted";

export type SellerStatusMeaningRow = {
  id: string;
  tone: VerificationStatusTone;
  statusShown: string;
  whatItMeans: string;
  inCurrentlyVerifiedFilter: "Yes" | "No";
};

const DEFAULT_SELLER_STATUS_ROWS: SellerStatusMeaningRow[] = [
  {
    id: "verified-for-published-checks",
    tone: "ok",
    statusShown: "Verified for the published checks",
    whatItMeans:
      "Business details checked against the published criteria on the date shown.",
    inCurrentlyVerifiedFilter: "Yes",
  },
  {
    id: "verification-is-under-review",
    tone: "warn",
    statusShown: "Verification is under review",
    whatItMeans:
      "A scheduled recheck is happening. No current label is shown meanwhile.",
    inCurrentlyVerifiedFilter: "No",
  },
  {
    id: "verification-information-is-not-current",
    tone: "muted",
    statusShown: "Verification information is not current",
    whatItMeans:
      "The last check is out of date. It doesn't mean the seller did anything wrong.",
    inCurrentlyVerifiedFilter: "No",
  },
  {
    id: "verification-unavailable",
    tone: "muted",
    statusShown: "Verification unavailable",
    whatItMeans:
      "Shown neutrally. No reason is published while a review is open.",
    inCurrentlyVerifiedFilter: "No",
  },
  {
    id: "verification-review-in-progress",
    tone: "warn",
    statusShown: "Verification review in progress",
    whatItMeans: "The seller has applied; no decision yet.",
    inCurrentlyVerifiedFilter: "No",
  },
];

function StatusDot({ tone }: { tone: VerificationStatusTone }) {
  if (tone === "ok") {
    return (
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600"
      />
    );
  }

  if (tone === "warn") {
    return (
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full border border-slate-400 bg-transparent"
    />
  );
}

type WhatEachStatusMeansSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  rows?: SellerStatusMeaningRow[];
  className?: string;
};

export default function WhatEachStatusMeansSection({
  id = "what-each-status-means",
  eyebrow = "Statuses",
  title = "What each status means",
  description = "A seller can be listed without a current verified label. That isn't a finding against them.",
  rows = DEFAULT_SELLER_STATUS_ROWS,
  className = "bg-[#F6F8FB]",
}: WhatEachStatusMeansSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-16 md:py-20 ${className}`}>
      <div className={container}>
        <Reveal delay={40}>
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-600">
                  <th scope="col" className="py-3 pr-6 font-bold">
                    Status shown
                  </th>
                  <th scope="col" className="py-3 pr-6 font-bold">
                    What it means
                  </th>
                  <th scope="col" className="py-3 font-bold">
                    In &ldquo;currently verified&rdquo; filter?
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200/80 border-b border-slate-200/80 text-xs">
                {rows.map((row) => {
                  const statusLabelClass =
                    row.tone === "ok"
                      ? "text-emerald-700"
                      : row.tone === "warn"
                        ? "text-amber-800"
                        : "text-slate-600";

                  return (
                    <tr
                      key={row.id}
                      className="align-top transition-colors hover:bg-slate-50/50"
                    >
                      <td className="py-3.5 pr-6 font-semibold">
                        <span
                          className={`inline-flex items-center gap-2 ${statusLabelClass}`}
                        >
                          <StatusDot tone={row.tone} />
                          <span>{row.statusShown}</span>
                        </span>
                      </td>

                      <td className="py-3.5 pr-6 leading-relaxed text-slate-600">
                        {row.whatItMeans}
                      </td>

                      <td className="py-3.5 font-medium text-slate-700">
                        {row.inCurrentlyVerifiedFilter}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

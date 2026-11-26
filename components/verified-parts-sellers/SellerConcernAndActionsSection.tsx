"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

type SellerConcernAndActionsSectionProps = {
  id?: string;
  concernTitle?: ReactNode;
  concernDescription?: ReactNode;
  concernCtaLabel?: string;
  concernCtaHref?: string;
  onReportConcern?: () => void;
  fraudNoticePrefix?: string;
  fraudLinkLabel?: string;
  fraudLinkHref?: string;
  onReportFraud?: () => void;
  sellerCardTitle?: ReactNode;
  sellerCardDescription?: ReactNode;
  becomeSellerLabel?: string;
  becomeSellerHref?: string;
  onBecomeSeller?: () => void;
  appealStatusLabel?: string;
  appealStatusHref?: string;
  onAppealStatus?: () => void;
  className?: string;
};

export default function SellerConcernAndActionsSection({
  id = "seller-concern-and-actions",
  concernTitle = "Have a concern about a seller?",
  concernDescription = "Share a concern privately so the team can review it. You don't need to know whether anything is wrong.",
  concernCtaLabel = "Report a seller concern",
  concernCtaHref = "#report-seller-concern",
  onReportConcern,
  fraudNoticePrefix = "Lost money? Contact your bank or payment provider first.",
  fraudLinkLabel = "Report Fraud",
  fraudLinkHref = "#report-fraud",
  onReportFraud,
  sellerCardTitle = "Are you a parts seller?",
  sellerCardDescription = "Corrections and appeals are handled privately with the seller — not in a public thread.",
  becomeSellerLabel = "Become a parts seller",
  becomeSellerHref = "#become-a-parts-seller",
  onBecomeSeller,
  appealStatusLabel = "Correct or appeal a status",
  appealStatusHref = "#correct-or-appeal-status",
  onAppealStatus,
  className = "bg-[#F6F8FB]",
}: SellerConcernAndActionsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-12 md:py-16 ${className}`}>
      <div className={container}>
        <Reveal delay={50}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Card: Concern & Fraud Reporting */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              <div>
                <h2 className="text-sm font-extrabold tracking-tight text-ink sm:text-base">
                  {concernTitle}
                </h2>

                {concernDescription && (
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {concernDescription}
                  </p>
                )}

                <div className="mt-5">
                  {onReportConcern ? (
                    <button
                      type="button"
                      onClick={onReportConcern}
                      className="w-full rounded-full bg-[#F5B400] px-6 py-3 text-center text-xs font-extrabold text-ink shadow-2xs transition-colors hover:bg-[#e0a400]"
                    >
                      {concernCtaLabel}
                    </button>
                  ) : (
                    <a
                      href={concernCtaHref}
                      className="block w-full rounded-full bg-[#F5B400] px-6 py-3 text-center text-xs font-extrabold text-ink shadow-2xs transition-colors hover:bg-[#e0a400]"
                    >
                      {concernCtaLabel}
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
                {fraudNoticePrefix}{" "}
                {onReportFraud ? (
                  <button
                    type="button"
                    onClick={onReportFraud}
                    className="font-medium text-slate-500 underline underline-offset-2 transition-colors hover:text-ink"
                  >
                    {fraudLinkLabel}
                  </button>
                ) : (
                  <a
                    href={fraudLinkHref}
                    className="font-medium text-slate-500 underline underline-offset-2 transition-colors hover:text-ink"
                  >
                    {fraudLinkLabel}
                  </a>
                )}
              </p>
            </div>

            {/* Right Card: Seller Onboarding & Status Appeals */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              <div>
                <h2 className="text-sm font-extrabold tracking-tight text-ink sm:text-base">
                  {sellerCardTitle}
                </h2>

                {sellerCardDescription && (
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {sellerCardDescription}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {onBecomeSeller ? (
                    <button
                      type="button"
                      onClick={onBecomeSeller}
                      className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-ink shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50"
                    >
                      {becomeSellerLabel}
                    </button>
                  ) : (
                    <a
                      href={becomeSellerHref}
                      className="inline-block rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-ink shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50"
                    >
                      {becomeSellerLabel}
                    </a>
                  )}

                  {onAppealStatus ? (
                    <button
                      type="button"
                      onClick={onAppealStatus}
                      className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-ink shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50"
                    >
                      {appealStatusLabel}
                    </button>
                  ) : (
                    <a
                      href={appealStatusHref}
                      className="inline-block rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-ink shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50"
                    >
                      {appealStatusLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type QuoteDraftLineItem = {
  id: string;
  sku: string;
  partName: string;
  sellerName: string;
  quantity: number;
  packLabel?: string;
};

type QuoteRequestSectionProps = {
  id?: string;
  heading?: ReactNode;
  description?: ReactNode;
  eligibilityNote?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  onSignInClick?: () => void;
  onSubmitQuoteRequest?: (items: QuoteDraftLineItem[]) => void;
  selectedItems?: QuoteDraftLineItem[];
  className?: string;
};

export default function QuoteRequestSection({
  id = "quote-request",
  heading = "Quote request",
  description = "A quote request isn't an order. Totals, tax and freight are confirmed by the seller in the quote.",
  eligibilityNote = "Sign in with an eligible business account to build a quote request.",
  ctaLabel,
  ctaHref = "#business-sign-in",
  onSignInClick,
  onSubmitQuoteRequest,
  selectedItems = [],
  className = "bg-[#F6F8FB]",
}: QuoteRequestSectionProps) {
  const hasSelectedItems = selectedItems.length > 0;

  return (
    <section id={id} className={`scroll-mt-28 py-14 md:py-16 ${className}`}>
      <div className={container}>
        <Reveal delay={40}>
          <div className="max-w-xl">
            <h2 className="text-lg font-extrabold tracking-tight text-ink sm:text-xl">
              {heading}
            </h2>

            {description && (
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                {description}
              </p>
            )}

            {hasSelectedItems && (
              <div className="mt-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                <div className="text-[11px] font-bold text-ink">
                  Draft quote items ({selectedItems.length})
                </div>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                  {selectedItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="truncate">
                        <strong className="font-semibold text-ink">
                          {item.sku}
                        </strong>{" "}
                        · {item.partName}
                      </span>
                      <span className="shrink-0 text-[11px] font-semibold text-slate-700">
                        Qty {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {eligibilityNote && (
              <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
                {eligibilityNote}
              </p>
            )}

            {(ctaLabel || hasSelectedItems) && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {hasSelectedItems && onSubmitQuoteRequest && (
                  <button
                    type="button"
                    onClick={() => onSubmitQuoteRequest(selectedItems)}
                    className="rounded-full bg-[#F5B400] px-5 py-2.5 text-xs font-extrabold text-ink shadow-2xs transition-colors hover:bg-[#e0a400]"
                  >
                    Request quote
                  </button>
                )}

                {ctaLabel &&
                  (onSignInClick ? (
                    <button
                      type="button"
                      onClick={onSignInClick}
                      className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-ink transition-colors hover:border-slate-300 hover:bg-slate-50"
                    >
                      {ctaLabel}
                    </button>
                  ) : (
                    <a
                      href={ctaHref}
                      className="inline-block rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-ink transition-colors hover:border-slate-300 hover:bg-slate-50"
                    >
                      {ctaLabel}
                    </a>
                  ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

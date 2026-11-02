import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type TransparentSellerTermsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  headingText?: ReactNode;
  descriptionText?: ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
};

export default function TransparentSellerTermsSection({
  id,
  eyebrow = "Pricing",
  title = "Transparent terms before you commit",
  headingText = "Selling fees, payment arrangements and payout timing depend on your category, market and approved seller terms.",
  descriptionText = "No fees, commissions or payout schedules are shown until approved terms exist for your market. You'll see the exact terms before signing.",
  buttonText = "How partner agreements work",
  onButtonClick,
  className = "bg-white",
}: TransparentSellerTermsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle eyebrow={eyebrow} title={title} />

        <Reveal delay={100} className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 border-l-4 border-l-brand bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)] sm:p-8">
            <div className="flex flex-col gap-6 pl-2 lg:flex-row lg:items-center lg:justify-between">
              {/* Text Content */}
              <div className="max-w-2xl">
                <h3 className="text-base font-bold leading-snug text-ink sm:text-lg">
                  {headingText}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                  {descriptionText}
                </p>
              </div>

              {/* Action Button */}
              <div className="shrink-0">
                <button
                  type="button"
                  onClick={onButtonClick}
                  className="w-full rounded-full border border-slate-200 bg-white px-6 py-3 text-xs font-semibold text-ink transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

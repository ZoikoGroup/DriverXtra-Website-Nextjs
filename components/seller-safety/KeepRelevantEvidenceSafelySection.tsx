import type { ReactNode } from "react";
import { FileText, Lock, Check, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const DEFAULT_KEEP_ITEMS = [
  "Messages with the buyer, with dates",
  "Transaction or order references",
  "Handover notes and photos, with consent",
];

const DEFAULT_DONT_SHARE_ITEMS = [
  "Identity or ownership documents",
  "Bank or payment card details",
  "Key codes or login codes",
];

type KeepRelevantEvidenceSafelySectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  keepTitle?: string;
  keepItems?: string[];
  dontShareTitle?: string;
  dontShareItems?: string[];
  footerNote?: string;
  className?: string;
};

export default function KeepRelevantEvidenceSafelySection({
  id = "evidence",
  eyebrow = "Evidence",
  title = "Keep relevant evidence safely",
  description = "Retain transaction references and messages where lawful. Share identity, financial and ownership documents only through an approved secure process.",
  keepTitle = "Worth keeping",
  keepItems = DEFAULT_KEEP_ITEMS,
  dontShareTitle = "Don't share publicly",
  dontShareItems = DEFAULT_DONT_SHARE_ITEMS,
  footerNote = "This page has no evidence upload — reports collect evidence through a private, secure process.",
  className = "bg-white",
}: KeepRelevantEvidenceSafelySectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Left Box: Worth Keeping */}
          <Reveal delay={100}>
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8 h-full">
              <div>
                {/* Yellow Document Icon */}
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-2xs">
                  <FileText className="h-5 w-5 stroke-[2]" />
                </div>

                <h3 className="text-base font-bold text-ink sm:text-lg">
                  {keepTitle}
                </h3>

                <div className="mt-6 space-y-4">
                  {keepItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-emerald-600">
                        <Check className="h-4 w-4 stroke-[3]" />
                      </span>
                      <span className="text-xs font-medium text-slate-700 sm:text-sm leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Box: Don't Share Publicly */}
          <Reveal delay={150}>
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8 h-full">
              <div>
                {/* Lock Icon */}
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-2xs">
                  <Lock className="h-5 w-5 stroke-[2]" />
                </div>

                <h3 className="text-base font-bold text-ink sm:text-lg">
                  {dontShareTitle}
                </h3>

                <div className="mt-6 space-y-4">
                  {dontShareItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-rose-500">
                        <X className="h-4 w-4 stroke-[3]" />
                      </span>
                      <span className="text-xs font-medium text-slate-700 sm:text-sm leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-note footer */}
              {footerNote && (
                <p className="mt-8 text-xs leading-relaxed text-slate-400 border-t border-slate-100 pt-4">
                  {footerNote}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import { Check, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const CHECKED_ITEMS = [
  "Business entity identity",
  "Business authorization",
  "Operating locations",
  "Representative authority",
];

const NOT_CHECKED_ITEMS = [
  "Vehicle condition or history",
  "Pricing or financing outcomes",
  "Future conduct or endorsement",
];

type VerificationScopeSectionProps = {
  id?: string;
  className?: string;
};

export default function VerificationScopeSection({
  id,
  className = "bg-white",
}: VerificationScopeSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Scope"
          title="What verification checks — and what it doesn't"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* May be checked */}
          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-emerald-300 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
              <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                May be checked
              </span>
              <ul className="mt-6 space-y-4">
                {CHECKED_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                    <span className="text-sm font-semibold text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Not checked */}
          <Reveal delay={200}>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-slate-300 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Not checked
              </span>
              <ul className="mt-6 space-y-4">
                {NOT_CHECKED_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <X className="h-4 w-4 shrink-0 text-slate-400 stroke-[2.5]" />
                    <span className="text-sm font-semibold text-slate-600">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

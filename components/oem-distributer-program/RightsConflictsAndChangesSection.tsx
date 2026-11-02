import type { ReactNode } from "react";
import { Scale, Calendar, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const CHANGES_BULLETS = [
  "Rights are versioned — changes are reviewed",
  "Expired evidence pauses the affected scope",
  "Recalls and disputes follow a documented process",
];

type RightsConflictsAndChangesSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  className?: string;
};

export default function RightsConflictsAndChangesSection({
  id,
  eyebrow = "Conflicts & changes",
  title = "When rights overlap, change or expire",
  className = "bg-[#F6F8FB]",
}: RightsConflictsAndChangesSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle eyebrow={eyebrow} title={title} />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Left Card: Overlapping claims */}
          <Reveal delay={100}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)] sm:p-8">
              <div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400]">
                  <Scale className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="mt-5 text-base font-bold text-ink">
                  Overlapping claims
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                  Where two applicants claim the same brand rights in a market,
                  neither is activated for that scope until the conflict is
                  resolved. This is an owner decision, not an automatic outcome.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Card: Changes and expiry */}
          <Reveal delay={180}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)] sm:p-8">
              <div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400]">
                  <Calendar className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="mt-5 text-base font-bold text-ink">
                  Changes and expiry
                </h3>

                <ul className="mt-5 space-y-3">
                  {CHANGES_BULLETS.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3">
                      <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                      <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

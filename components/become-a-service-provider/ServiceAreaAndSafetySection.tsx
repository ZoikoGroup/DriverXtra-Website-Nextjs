import { MapPin, AlertTriangle, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type ServiceAreaAndSafetySectionProps = {
  id?: string;
  className?: string;
};

export default function ServiceAreaAndSafetySection({
  id,
  className = "bg-[#F6F8FB]",
}: ServiceAreaAndSafetySectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Service area & safety"
          title="Choose where your team is equipped and authorized to work."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Service Area Card */}
          <Reveal delay={100}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)] sm:p-8">
              <div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400]">
                  <MapPin className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="mt-5 text-base font-bold text-ink">
                  Service area
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  Areas are set per branch and per category. There&apos;s no
                  universal travel radius — mobile services set their own
                  coverage.
                </p>

                <ul className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                    <span className="text-xs font-semibold text-slate-700">
                      Postal areas or towns for each branch
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                    <span className="text-xs font-semibold text-slate-700">
                      Mobile coverage only where allowed
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                    <span className="text-xs font-semibold text-slate-700">
                      Change areas any time after review
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Safety and Licensing Card (Highlighted Border) */}
          <Reveal delay={180}>
            <div className="flex h-full flex-col justify-between rounded-2xl border-2 border-brand border-t-4 border-t-brand bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-12px_rgba(245,180,0,0.2)] sm:p-8">
              <div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-700">
                  <AlertTriangle className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="mt-5 text-base font-bold text-ink">
                  Safety and licensing
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  Some services require additional technical, safety or
                  licensing checks. Regulated permissions are never granted
                  instantly.
                </p>

                <ul className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                    <span className="text-xs font-semibold text-slate-700">
                      Credential checks for specialist work
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                    <span className="text-xs font-semibold text-slate-700">
                      Expiry dates tracked for each credential
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                    <span className="text-xs font-semibold text-slate-700">
                      Expired evidence can pause a service
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

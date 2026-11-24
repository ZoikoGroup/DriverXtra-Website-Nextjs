import type { ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type TripPlanningChecklistItem = {
  id: string;
  text: string;
};

const DEFAULT_TRIP_CHECKLIST: TripPlanningChecklistItem[] = [
  {
    id: "plan-stops-with-buffer",
    text: "Plan charging stops with a buffer",
  },
  {
    id: "backup-charger-in-mind",
    text: "Have a backup charger in mind",
  },
  {
    id: "check-access-and-payment",
    text: "Check access and payment before you set off",
  },
];

type BatteryCareAndTripPlanningSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  careTitle?: string;
  careDescription?: string;
  careSubtext?: string;
  careImageSrc?: string;
  careImageAlt?: string;
  tripTitle?: string;
  tripChecklist?: TripPlanningChecklistItem[];
  tripDisclaimer?: string;
  tripImageSrc?: string;
  tripImageAlt?: string;
  className?: string;
};

export default function BatteryCareAndTripPlanningSection({
  id = "battery-care-and-trip-planning",
  eyebrow = "Battery and travel",
  title = "Battery care and trip planning",
  description,
  careTitle = "Battery care",
  careDescription = "Battery care guidance depends on the specific vehicle and manufacturer recommendations.",
  careSubtext = "State of charge (how full it is) isn't state of health (how much capacity remains).",
  careImageSrc = "/images/ev/3.png",
  careImageAlt = "White electric supercar on display in showroom",
  tripTitle = "Planning a longer trip",
  tripChecklist = DEFAULT_TRIP_CHECKLIST,
  tripDisclaimer = "This page doesn't show live charger availability.",
  tripImageSrc = "/images/auto/1.png",
  tripImageAlt = "Man driving a modern vehicle during sunset holding steering wheel",
  className = "bg-[#F6F8FB]",
}: BatteryCareAndTripPlanningSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 2-Column Grid Layout */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Left Card: Battery Care */}
          <Reveal delay={50}>
            <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs h-full">
              <div>
                {/* Edge-to-edge top image */}
                <div className="relative aspect-[24/9] w-full overflow-hidden bg-slate-900">
                  <Image
                    src={careImageSrc}
                    alt={careImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-base font-bold text-ink sm:text-lg">
                    {careTitle}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {careDescription}
                  </p>

                  {careSubtext && (
                    <p className="mt-4 text-xs font-medium text-slate-400">
                      {careSubtext}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Card: Planning a longer trip */}
          <Reveal delay={100}>
            <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs h-full">
              <div>
                {/* Edge-to-edge top image */}
                <div className="relative aspect-[24/9] w-full overflow-hidden bg-slate-900">
                  <Image
                    src={tripImageSrc}
                    alt={tripImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-base font-bold text-ink sm:text-lg">
                    {tripTitle}
                  </h3>

                  <div className="mt-4 space-y-3">
                    {tripChecklist.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 text-xs sm:text-sm"
                      >
                        <span className="mt-0.5 text-emerald-600 shrink-0">
                          <Check className="h-4 w-4 stroke-[2.5]" />
                        </span>
                        <p className="font-medium text-slate-600 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {tripDisclaimer && (
                    <p className="mt-6 text-xs font-medium text-slate-400">
                      {tripDisclaimer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

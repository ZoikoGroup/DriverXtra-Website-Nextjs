import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ReportConcernItem = {
  id: string;
  title: string;
  description: string;
};

const DEFAULT_CONCERNS: ReportConcernItem[] = [
  {
    id: "misleading-vehicle-details",
    title: "Misleading vehicle details",
    description: "Year, make, model, mileage or condition doesn't match.",
  },
  {
    id: "vehicle-identity-title",
    title: "Vehicle identity or title concerns",
    description: "Suspected false VIN, title or ownership claim.",
  },
  {
    id: "unsafe-prohibited-listing",
    title: "Unsafe or prohibited listing",
    description:
      "Hazardous equipment, misdescribed safety parts or unsafe service.",
  },
  {
    id: "parts-provenance-counterfeit",
    title: "Parts provenance or counterfeit",
    description: "Brand, serial, packaging or rights concern.",
  },
  {
    id: "fitment-compatibility",
    title: "Fitment or compatibility",
    description: "Compatibility claims conflict with the product.",
  },
  {
    id: "misleading-price-terms",
    title: "Misleading price or terms",
    description: "Bait pricing, hidden terms or unavailable stock.",
  },
  {
    id: "misuse-images-text",
    title: "Misuse of images or text",
    description: "Stolen photos or deceptive media.",
  },
  {
    id: "impersonation-in-listing",
    title: "Impersonation in listing",
    description: "The seller pretends to be another person or brand.",
  },
  {
    id: "exposed-personal-data",
    title: "Exposed personal data",
    description: "A home address, ID image or phone number is visible.",
  },
  {
    id: "spam-duplicate-stale",
    title: "Spam, duplicate or stale availability",
    description: "Repeated, fake or out-of-date listing.",
  },
  {
    id: "harassment-discriminatory",
    title: "Harassment or discriminatory text",
    description: "Hostile or exclusionary wording.",
  },
  {
    id: "other-concern",
    title: "Other concern",
    description: "Something else about the listing.",
  },
];

type WhatYouCanReportSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  concerns?: ReportConcernItem[];
  className?: string;
};

export default function WhatYouCanReportSection({
  id = "concerns",
  eyebrow = "Concerns",
  title = "What you can report",
  description,
  concerns = DEFAULT_CONCERNS,
  className = "bg-[#F6F8FB]",
}: WhatYouCanReportSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 4-Column Grid for Reportable Concerns */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {concerns.map((concern, index) => (
            <Reveal key={concern.id} delay={index * 25}>
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:border-slate-300 hover:shadow-xs h-full">
                <div>
                  <h3 className="text-xs font-bold text-ink sm:text-sm">
                    {concern.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {concern.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

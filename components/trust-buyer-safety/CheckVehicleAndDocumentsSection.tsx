import type { ReactNode } from "react";
import Image from "next/image";
import { FileText, Wrench, Car, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type VehicleCheckCard = {
  title: string;
  description: string;
  icon: typeof FileText;
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_VEHICLE_CHECKS: VehicleCheckCard[] = [
  {
    title: "Documents",
    description:
      "Ownership or title, VIN, mileage and history are separate evidence categories. Check each with its authoritative source.",
    icon: FileText,
    imageSrc: "/images/trust/2.png",
    imageAlt: "Person reviewing and signing vehicle documentation on clipboard",
  },
  {
    title: "Independent inspection",
    description:
      "A qualified inspector can report the condition they observe — inspections have limits and exclusions.",
    icon: Wrench,
    imageSrc: "/images/trust/3.png",
    imageAlt: "Vehicle in repair garage under inspection lights",
  },
  {
    title: "Test drive",
    description:
      "Check the seller's permission and insurance arrangements, plan the route and keep it short.",
    icon: Car,
    imageSrc: "/images/trust/4.png",
    imageAlt: "Driver behind the steering wheel during a test drive",
  },
];

const DEFAULT_SELLER_DUE_DILIGENCE: string[] = [
  "Contact details stay consistent over time",
  "No unexplained edits to price or key details",
  "Photos are of this vehicle, not copied elsewhere",
  "Claims are supported by evidence you can check",
];

const DEFAULT_SAFE_MEETING_CHECKLIST: string[] = [
  "Take photos at handover — with the seller's consent",
  "Collect keys, documents and a receipt",
];

type CheckVehicleAndDocumentsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  vehicleChecks?: VehicleCheckCard[];
  sellerDueDiligence?: string[];
  safeMeetingText?: string;
  safeMeetingChecklist?: string[];
  className?: string;
};

export default function CheckVehicleAndDocumentsSection({
  id = "vehicles-check",
  eyebrow = "Vehicles",
  title = "Check the vehicle and its documents",
  description = "A condition inspection is different from checking legal ownership or a vehicle's history. Review the documents applicable in your market.",
  vehicleChecks = DEFAULT_VEHICLE_CHECKS,
  sellerDueDiligence = DEFAULT_SELLER_DUE_DILIGENCE,
  safeMeetingText = "Choose a location and time that feels safe, and consider bringing someone you trust. Do not continue a meeting if you feel threatened.",
  safeMeetingChecklist = DEFAULT_SAFE_MEETING_CHECKLIST,
  className = "bg-white",
}: CheckVehicleAndDocumentsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* Top 3 Column Cards with Inline Icons in Content Body */}
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {vehicleChecks.map(
            (
              {
                title: cardTitle,
                description: cardDesc,
                icon: Icon,
                imageSrc,
                imageAlt,
              },
              i,
            ) => (
              <Reveal key={cardTitle} delay={i * 80}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                  {/* Clean Image Header */}
                  <div className="relative aspect-[20/9] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Content Body */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      {/* Dark Icon Box embedded inside the content block */}
                      <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-sm">
                        <Icon className="h-5 w-5 stroke-[2]" />
                      </div>

                      <h3 className="text-base font-bold text-ink">
                        {cardTitle}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                        {cardDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ),
          )}
        </div>

        {/* Bottom 2 Cards Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Bottom Left: Seller and listing due diligence */}
          <Reveal delay={240}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              <div>
                <h3 className="text-base font-bold text-ink sm:text-lg">
                  Seller and listing due diligence
                </h3>

                <ul className="mt-4 space-y-3">
                  {sellerDueDiligence.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                      <span className="text-xs font-medium text-slate-700 sm:text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Bottom Right: Safe meeting and collection */}
          <Reveal delay={300}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              <div>
                <h3 className="text-base font-bold text-ink sm:text-lg">
                  Safe meeting and collection
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                  {safeMeetingText}
                </p>

                <ul className="mt-4 space-y-3">
                  {safeMeetingChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                      <span className="text-xs font-medium text-slate-700 sm:text-sm">
                        {item}
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

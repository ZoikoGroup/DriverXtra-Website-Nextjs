import type { ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type SafetyTroubleshootingItem = {
  id: string;
  text: ReactNode;
};

const DEFAULT_TROUBLESHOOTING_ITEMS: SafetyTroubleshootingItem[] = [
  {
    id: "charging-wont-start",
    text: "Charging won't start? Check the connector, the app or card, and the operator's instructions",
  },
  {
    id: "public-charger-fault",
    text: "Public charger fault? Contact the operator shown on the charger",
  },
  {
    id: "vehicle-warning",
    text: "Vehicle warning? Follow your vehicle manual or contact the manufacturer",
  },
];

type IfSomethingGoesWrongSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  items?: SafetyTroubleshootingItem[];
  emergencyDisclaimer?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function IfSomethingGoesWrongSection({
  id = "if-something-goes-wrong",
  eyebrow = "Safety and troubleshooting",
  title = "If something goes wrong",
  description,
  items = DEFAULT_TROUBLESHOOTING_ITEMS,
  emergencyDisclaimer = "In an emergency, contact local emergency services.",
  imageSrc = "/images/ev/5.png",
  imageAlt = "Person working at laptop while checking smartphone screen",
  className = "bg-white",
}: IfSomethingGoesWrongSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        {/* Section Title Header */}
        <Reveal delay={50}>
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        {/* 2-Column Responsive Layout */}
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Edge-to-Edge Image (6 cols) */}
          <Reveal direction="zoom" delay={100} className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-xs">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Right Troubleshooting Items Checklist (6 cols) */}
          <Reveal delay={150} className="lg:col-span-6">
            <div className="space-y-4">
              <div className="space-y-4">
                {items.map((item) => (
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

              {emergencyDisclaimer && (
                <p className="pt-2 text-xs font-medium text-slate-400">
                  {emergencyDisclaimer}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

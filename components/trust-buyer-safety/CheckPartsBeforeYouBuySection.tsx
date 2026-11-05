import type { ReactNode } from "react";
import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type WarningSignItem = string;

const DEFAULT_WARNING_SIGNS: WarningSignItem[] = [
  "Unclear origin or no source information",
  "Fitment claimed without compatible-vehicle evidence",
  "Safety-sensitive parts with no recall check",
  "Packaging or seals that look tampered with",
  "Brand claims that seem unsupported",
];

type CheckPartsBeforeYouBuySectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  warningSigns?: WarningSignItem[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function CheckPartsBeforeYouBuySection({
  id = "check-parts-before-you-buy",
  eyebrow = "Parts",
  title = "Check parts before you buy",
  description = "A product photo or brand name alone does not prove authenticity or fitment. Check source information and compatible-vehicle evidence.",
  warningSigns = DEFAULT_WARNING_SIGNS,
  imageSrc = "/images/trust/5.png",
  imageAlt = "Mechanic pouring motor oil into an engine bay using an orange funnel",
  className = "bg-[#F6F8FB]",
}: CheckPartsBeforeYouBuySectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Image Card */}
          <Reveal delay={100} className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-md">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Right Column: Warning Signs List */}
          <Reveal delay={180} className="lg:col-span-6">
            <div>
              <h3 className="text-sm font-bold text-ink sm:text-base">
                Warning signs worth checking
              </h3>

              <ul className="mt-5 space-y-3.5">
                {warningSigns.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 stroke-[2]" />
                    <span className="text-xs font-medium text-slate-700 sm:text-sm">
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

import type { ReactNode } from "react";
import { X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const UNSUPPORTED_ITEMS = [
  "Sales or revenue you didn't report",
  'Return on investment or composite "health" scores',
  "Individual shopper identities",
];

type NoUnsupportedInferenceSectionProps = {
  id?: string;
  className?: string;
};

export default function NoUnsupportedInferenceSection({
  id,
  className = "bg-white",
}: NoUnsupportedInferenceSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="What is not measured"
          title="No unsupported inference"
        />

        <div className="mt-8 max-w-2xl">
          <Reveal delay={100}>
            <div className="rounded-2xl transition-all duration-300 hover:border-slate-300 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
              <ul className="space-y-4">
                {UNSUPPORTED_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <X className="h-4 w-4 shrink-0 text-[#0F7B55] stroke-[2.5]" />
                    <span className="text-sm font-semibold text-slate-700">
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

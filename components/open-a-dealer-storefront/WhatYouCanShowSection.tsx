import type { ReactNode } from "react";
import { Check, AlertTriangle, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type RuleItem = {
  text: string;
  type: "allowed" | "warning";
  icon: LucideIcon;
};

const BRANDING_RULES: RuleItem[] = [
  {
    text: "Use images you own or have rights to",
    type: "allowed",
    icon: Check,
  },
  {
    text: "Provide alt text for logo and cover images",
    type: "allowed",
    icon: Check,
  },
  {
    text: "No unsupported claims, trademarks you don't control, or \"verified\" wording you haven't earned",
    type: "warning",
    icon: AlertTriangle,
  },
];

type WhatYouCanShowSectionProps = {
  id?: string;
  className?: string;
};

export default function WhatYouCanShowSection({
  id,
  className = "bg-white",
}: WhatYouCanShowSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Content and branding rules"
          title="What you can show"
        />

        <div className="mt-8 space-y-4 max-w-2xl">
          {BRANDING_RULES.map(({ text, type, icon: Icon }, i) => (
            <Reveal key={text} delay={i * 80}>
              <div className="flex items-start gap-3.5 text-sm">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    type === "allowed" ? "text-[#0F7B55]" : "text-[#0F7B55]"
                  }`}
                >
                  <Icon className="h-4 w-4 stroke-[2.5]" />
                </span>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

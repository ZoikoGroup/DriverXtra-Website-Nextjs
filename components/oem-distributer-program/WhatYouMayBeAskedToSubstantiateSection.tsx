import type { ReactNode } from "react";
import {
  Bookmark,
  ShieldCheck,
  Tag,
  Globe,
  Calendar,
  Lock,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type SubstantiateRequirementCard = {
  title: string;
  description: string;
  icon: typeof Bookmark;
  isDark?: boolean;
};

const DEFAULT_SUBSTANTIATE_REQUIREMENTS: SubstantiateRequirementCard[] = [
  {
    title: "Legal entity",
    description: "Registered identity and an authorized signatory.",
    icon: Bookmark,
  },
  {
    title: "Supply capacity",
    description:
      "Whether you manufacture, distribute or import — with evidence.",
    icon: ShieldCheck,
  },
  {
    title: "Brands and products",
    description: "The brands and product categories you supply.",
    icon: Tag,
  },
  {
    title: "Territories and channels",
    description: "Markets and permitted sales channels.",
    icon: Globe,
  },
  {
    title: "Rights validity",
    description: "Start and expiry dates of your rights documents.",
    icon: Calendar,
  },
  {
    title: "Distributors and importers",
    description:
      "You must identify the underlying rights holder. Rights aren't transferred automatically.",
    icon: Lock,
    isDark: true,
  },
];

type WhatYouMayBeAskedToSubstantiateSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  items?: SubstantiateRequirementCard[];
  className?: string;
};

export default function WhatYouMayBeAskedToSubstantiateSection({
  id,
  eyebrow = "Requirements",
  title = "What you may be asked to substantiate",
  description = "Evidence is reviewed privately by authorized roles and never shown on public profiles.",
  items = DEFAULT_SUBSTANTIATE_REQUIREMENTS,
  className = "bg-white",
}: WhatYouMayBeAskedToSubstantiateSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(
            (
              { title: cardTitle, description: cardDesc, icon: Icon, isDark },
              i,
            ) => (
              <Reveal key={cardTitle} delay={i * 80}>
                <div
                  className={`group flex h-full flex-col justify-between rounded-2xl p-6 transition-all duration-300 ${
                    isDark
                      ? "bg-[#0B1220] text-white shadow-xl hover:border-slate-700"
                      : "border border-slate-200/80 bg-white text-ink hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]"
                  }`}
                >
                  <div>
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-xl ${
                        isDark
                          ? "bg-amber-500 text-ink"
                          : "bg-[#0B1220] text-[#F5B400]"
                      }`}
                    >
                      <Icon className="h-5 w-5 stroke-[2]" />
                    </div>
                    <h3
                      className={`mt-5 text-sm font-bold ${
                        isDark ? "text-white" : "text-ink"
                      }`}
                    >
                      {cardTitle}
                    </h3>
                    <p
                      className={`mt-2 text-xs leading-relaxed ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {cardDesc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

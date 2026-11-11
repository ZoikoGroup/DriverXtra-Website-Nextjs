import type { ReactNode } from "react";
import Image from "next/image";
import { Tag, CreditCard, Zap, ShieldCheck, Wrench, Gauge } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type CostSourceCard = {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  icon: "tag" | "card" | "zap" | "shield" | "wrench" | "gauge";
};

const DEFAULT_COST_SOURCES: CostSourceCard[] = [
  {
    id: "buying",
    title: "Buying",
    subtitle: "Price, fees and taxes",
    imageSrc: "/images/auto/2.png",
    imageAlt: "Green high-performance luxury coupe parked outdoors",
    icon: "tag",
  },
  {
    id: "finance",
    title: "Finance",
    subtitle: "Interest and fees",
    imageSrc: "/images/market/2.png",
    imageAlt: "Person writing notes on financial contract",
    icon: "card",
  },
  {
    id: "energy",
    title: "Energy",
    subtitle: "Fuel or charging",
    imageSrc: "/images/auto/4.png",
    imageAlt: "Electric vehicle plugged into charging port",
    icon: "zap",
  },
  {
    id: "insurance-tax",
    title: "Insurance & tax",
    subtitle: "Varies by driver",
    imageSrc: "/images/disputes/12.png",
    imageAlt: "Person using smartphone and laptop computer",
    icon: "shield",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    subtitle: "Service, repairs, tires",
    imageSrc: "/images/Help-Center/hc5.png",
    imageAlt: "Vehicle under maintenance in auto repair garage",
    icon: "wrench",
  },
  {
    id: "value-at-end",
    title: "Value at the end",
    subtitle: "Depreciation scenario",
    imageSrc: "/images/auto/9.png",
    imageAlt: "Front profile of a performance muscle car",
    icon: "gauge",
  },
];

type WhereOwnershipCostsComeFromSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  sources?: CostSourceCard[];
  className?: string;
};

export default function WhereOwnershipCostsComeFromSection({
  id = "where-ownership-costs-come-from",
  eyebrow = "Learn the basics",
  title = "Where ownership costs come from",
  description = (
    <>
      Two ways to look at cost:{" "}
      <strong className="font-semibold text-slate-700">economic</strong> (value
      lost plus running costs) and{" "}
      <strong className="font-semibold text-slate-700">cash flow</strong> (money
      in and out). They answer different questions.
    </>
  ),
  sources = DEFAULT_COST_SOURCES,
  className = "bg-white",
}: WhereOwnershipCostsComeFromSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 6-Column Responsive Grid */}
        <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {sources.map((item, i) => (
            <Reveal key={item.id} delay={i * 30}>
              <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300 h-full">
                <div>
                  {/* Zero-padding edge-to-edge top image */}
                  <div className="relative aspect-[20/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4 sm:p-5">
                    {/* Inline Icon + Title Row */}
                    <div className="flex items-center gap-2">
                      <span className="text-[#F5B400] shrink-0">
                        {item.icon === "tag" && (
                          <Tag className="h-4 w-4 stroke-[2]" />
                        )}
                        {item.icon === "card" && (
                          <CreditCard className="h-4 w-4 stroke-[2]" />
                        )}
                        {item.icon === "zap" && (
                          <Zap className="h-4 w-4 stroke-[2]" />
                        )}
                        {item.icon === "shield" && (
                          <ShieldCheck className="h-4 w-4 stroke-[2]" />
                        )}
                        {item.icon === "wrench" && (
                          <Wrench className="h-4 w-4 stroke-[2]" />
                        )}
                        {item.icon === "gauge" && (
                          <Gauge className="h-4 w-4 stroke-[2]" />
                        )}
                      </span>

                      <h3 className="text-xs font-bold text-ink sm:text-sm truncate">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-1 text-[11px] font-medium text-slate-400 sm:text-xs">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

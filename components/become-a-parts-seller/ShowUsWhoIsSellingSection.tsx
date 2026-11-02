import type { ReactNode } from "react";
import {
  Building2,
  ClipboardCheck,
  ShieldCheck,
  FileText,
  Store,
  Lock,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type SellerRequirementCard = {
  title: string;
  description: string;
  icon: typeof Building2;
  isDark?: boolean;
};

const SELLER_REQUIREMENTS: SellerRequirementCard[] = [
  {
    title: "Business identity",
    description:
      "Registered business details and an authorized representative — kept distinct from the organization itself.",
    icon: Building2,
  },
  {
    title: "Product categories",
    description:
      "The categories and conditions (new, used, refurbished) you intend to sell.",
    icon: ClipboardCheck,
  },
  {
    title: "Source & provenance",
    description:
      "Source claims you can substantiate, such as OEM-classified or recycled parts.",
    icon: ShieldCheck,
  },
  {
    title: "Catalog data",
    description:
      "Part numbers, imagery you have rights to, and compatibility information.",
    icon: FileText,
  },
  {
    title: "Fulfilment locations",
    description: "Where you ship from, and your returns policy.",
    icon: Store,
  },
  {
    title: "Your evidence stays private",
    description:
      "Documents are reviewed by authorized roles only and never shown on public pages or listings.",
    icon: Lock,
    isDark: true,
  },
];

type ShowUsWhoIsSellingSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  items?: SellerRequirementCard[];
  className?: string;
};

export default function ShowUsWhoIsSellingSection({
  id,
  eyebrow = "Requirements",
  title = "Show us who is selling.",
  description = "A seller application may require business registration, authorization and documents relevant to the products and locations you intend to serve.",
  items = SELLER_REQUIREMENTS,
  className = "bg-white",
}: ShowUsWhoIsSellingSectionProps) {
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

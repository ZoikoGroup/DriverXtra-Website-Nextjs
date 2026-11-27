import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type SellerCheckCard = {
  id: string;
  title: string;
  description: string;
  doesntProve: string;
};

const DEFAULT_SELLER_CHECKS: SellerCheckCard[] = [
  {
    id: "business-identity",
    title: "Business identity",
    description:
      "Registration and the person acting for the business were checked.",
    doesntProve:
      "That every listing is accurate, or how the seller will behave in future.",
  },
  {
    id: "business-contact",
    title: "Business contact",
    description:
      "The seller controls the contact details shown on its profile.",
    doesntProve: "That every outside website or message is safe.",
  },
  {
    id: "trading-market",
    title: "Trading market",
    description: "The seller can trade in the markets shown.",
    doesntProve: "That every item is permitted or road-legal everywhere.",
  },
  {
    id: "manufacturer-authorization",
    title: "Manufacturer authorization",
    description: "Separate check, for a named brand, period and category only.",
    doesntProve:
      "That individual parts are genuine, or that all warranties apply.",
  },
  {
    id: "part-authenticity",
    title: "Part authenticity",
    description: "Not part of seller verification.",
    doesntProve: "Authenticity is checked per product, if at all.",
  },
];

type EachClaimCheckedSeparatelySectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  checks?: SellerCheckCard[];
  className?: string;
};

export default function EachClaimCheckedSeparatelySection({
  id = "each-claim-checked-separately",
  eyebrow = "Separate checks",
  title = "Each claim is checked separately",
  description = "There's no single \"trusted\" seal. Here's what each check does — and doesn't — tell you.",
  checks = DEFAULT_SELLER_CHECKS,
  className = "bg-white",
}: EachClaimCheckedSeparatelySectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-16 md:py-20 ${className}`}>
      <div className={container}>
        <Reveal delay={40}>
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {checks.map((check, index) => (
            <Reveal key={check.id} delay={index * 40}>
              <article className="flex h-full flex-col justify-start rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs transition-all duration-300 hover:border-slate-300 hover:shadow-xs">
                <h3 className="text-sm font-extrabold tracking-tight text-ink">
                  {check.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {check.description}
                </p>

                <p className="mt-4 text-xs leading-relaxed text-slate-600">
                  <strong className="font-bold text-ink">
                    Doesn&apos;t prove:
                  </strong>{" "}
                  {check.doesntProve}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

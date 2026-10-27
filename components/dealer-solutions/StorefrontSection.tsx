import type { ReactNode } from "react";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type StorefrontSectionProps = {
  id?: string;
  className?: string;
};

export default function StorefrontSection({
  id,
  className = "bg-white",
}: StorefrontSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-16 md:py-20 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Storefront"
          title="Present your dealership with a clearer storefront."
          description="Bring location information, available vehicles and business identity into a consistent customer view where supported."
        />
      </div>
    </section>
  );
}

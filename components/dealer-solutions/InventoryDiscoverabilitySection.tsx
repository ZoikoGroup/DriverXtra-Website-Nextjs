import Image from "next/image";
import { Check, AlertTriangle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type InventoryDiscoverabilitySectionProps = {
  id?: string;
  className?: string;
};

export default function InventoryDiscoverabilitySection({
  id,
  className = "bg-[#F6F8FB]",
}: InventoryDiscoverabilitySectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Inventory discoverability"
          title="Keep vehicle data accurate across your selling workflow."
          description="Explore structured feeds, validation rules and publishing controls before connecting inventory."
        />

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side: Image */}
          <Reveal direction="zoom" delay={100} className="w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/dealer-solutions/2.png"
                alt="Luxury vehicle representing inventory discoverability workflow"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Right Side: Features */}
          <div className="flex flex-col gap-6">
            <Reveal delay={150}>
              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check className="h-4 w-4" />
                </span>
                <p className="text-base font-semibold text-ink">
                  Structured, validated listing data
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check className="h-4 w-4" />
                </span>
                <p className="text-base font-semibold text-ink">
                  Publishing controls you approve
                </p>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <AlertTriangle className="h-4 w-4" />
                </span>
                <p className="text-base font-semibold text-ink">
                  Accurate listings — not guaranteed reach
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type InventoryFeedsHeroProps = {
  id?: string;
  className?: string;
};

export default function InventoryFeedsHero({
  id,
  className = "bg-[#0B1220]",
}: InventoryFeedsHeroProps) {
  return (
    <section id={id} className={`py-16 md:py-24 text-white ${className}`}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-2`}>
        {/* Left Side: Content */}
        <div className="max-w-xl">
          <SectionTitle
            dark={true}
            eyebrow="INVENTORY FEEDS"
            title="Connect inventory data with greater control."
            description="Import permitted stock data, review mapping and validation results, and approve changes before eligible vehicles appear on your storefront."
          />
        </div>

        {/* Right Side: Image */}
        <Reveal direction="zoom" delay={150} className="w-full">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/inventory-feeds/hero.png"
              alt="Abstract liquid droplet textures representing inventory data flow"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

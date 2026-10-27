import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export default function DealerSolutionsHero() {
  return (
    <section className="bg-[#0B1220] py-16 md:py-24 text-white">
      <div className={`${container} grid items-center gap-12 lg:grid-cols-2`}>
        {/* Left Side: Content */}
        <div className="max-w-xl">
          <SectionTitle
            dark={true}
            eyebrow="DEALER SOLUTIONS"
            title="Run your dealership with clearer connections."
            description="Bring inventory publishing, dealership visibility, customer inquiries and operational tools into a more organized workflow. Availability and access depend on your business, market and approved setup."
          />
        </div>

        {/* Right Side: Image */}
        <Reveal direction="zoom" delay={150} className="w-full">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/dealer-solutions/1.png"
              alt="Dealer Solutions - Modern skyscraper architectures representing operational scale"
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

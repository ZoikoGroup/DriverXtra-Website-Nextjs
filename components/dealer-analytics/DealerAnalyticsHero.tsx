import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type DealerAnalyticsHeroProps = {
  id?: string;
  className?: string;
};

export default function DealerAnalyticsHero({
  id,
  className = "bg-[#0B1220]",
}: DealerAnalyticsHeroProps) {
  return (
    <section id={id} className={`py-16 md:py-24 text-white ${className}`}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-2`}>
        {/* Left Side: Content */}
        <div className="max-w-xl">
          <SectionTitle
            dark={true}
            eyebrow="DEALER ANALYTICS"
            title="Make better decisions with clearer dealer data."
            description="Understand what people see, which listings attract interest and how inquiries move through eligible dealer workflows. Available insights depend on your market, permissions and enabled data sources."
          />
        </div>

        {/* Right Side: Image */}
        <Reveal direction="zoom" delay={150} className="w-full">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/dealer-analytics/hero.png"
              alt="Analytical documents, calculator, and financial reports on desk"
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

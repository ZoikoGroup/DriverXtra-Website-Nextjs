import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type DealerVerificationHeroProps = {
  id?: string;
  className?: string;
};

export default function DealerVerificationHero({
  id,
  className = "bg-[#0B1220]",
}: DealerVerificationHeroProps) {
  return (
    <section id={id} className={`py-16 md:py-24 text-white ${className}`}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-2`}>
        {/* Left Side: Content */}
        <div className="max-w-xl">
          <SectionTitle
            dark={true}
            eyebrow="DEALER VERIFICATION"
            title="Verify your dealership business with clear requirements."
            description="Understand which business and location details may be reviewed before your dealership displays a verification status on DriverXtra. Requirements vary by market."
          />
        </div>

        {/* Right Side: Image */}
        <Reveal direction="zoom" delay={150} className="w-full">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/dealer-verification/hero.png"
              alt="Person reviewing and signing business verification documents"
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

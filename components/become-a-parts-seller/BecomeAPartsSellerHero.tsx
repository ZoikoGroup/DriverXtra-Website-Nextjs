import Image from "next/image";
import { Check, Lock, Database } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type FeatureCard = {
  title: string;
  description: string;
  icon: typeof Check;
};

const FEATURE_CARDS: FeatureCard[] = [
  {
    title: "Clear catalog data",
    description: "part numbers, condition, source",
    icon: Database,
  },
  {
    title: "Evidence-based fitment",
    description: "unknown is never a match",
    icon: Check,
  },
  {
    title: "Private evidence",
    description: "never shown publicly",
    icon: Lock,
  },
];

type BecomeAPartsSellerHeroProps = {
  id?: string;
  className?: string;
};

export default function BecomeAPartsSellerHero({
  id,
  className = "bg-[#0B1220]",
}: BecomeAPartsSellerHeroProps) {
  return (
    <section id={id} className={`py-16 md:py-24 text-white ${className}`}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-2`}>
        {/* Left Side: Content */}
        <div>
          <SectionTitle
            dark={true}
            eyebrow="SELL PARTS THROUGH DRIVERXTRA"
            title="Bring your parts business to a marketplace built around clearer information."
            description="Learn the information and checks that may apply before an eligible parts business can list and fulfill products through DriverXtra. Availability depends on your market, category and application review."
          />

          {/* 3 Dark Feature Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {FEATURE_CARDS.map(({ title, description, icon: Icon }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="flex h-full flex-col justify-start rounded-xl border border-slate-800 bg-[#131C2E] p-4 transition-all duration-300 hover:border-slate-700">
                  <Icon className="h-4 w-4 shrink-0 text-brand stroke-[2.5]" />
                  <h3 className="mt-3 text-xs font-bold text-white leading-snug">
                    {title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right Side: Image */}
        <Reveal direction="zoom" delay={150} className="w-full">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/become-a-parts-seller/1.png"
              alt="Mechanic pouring motor oil during vehicle maintenance in an automotive service bay"
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

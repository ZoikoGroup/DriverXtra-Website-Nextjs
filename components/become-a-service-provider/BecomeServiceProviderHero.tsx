import Image from "next/image";
import { Check, Lock, Layers } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type FeatureBadge = {
  title: string;
  description: string;
  icon: typeof Check;
};

const FEATURE_BADGES: FeatureBadge[] = [
  {
    title: "Quick eligibility check",
    description: "no account needed to start.",
    icon: Check,
  },
  {
    title: "Private evidence",
    description: "never shown on public pages",
    icon: Lock,
  },
  {
    title: "Separate checks",
    description: "business, branch and credentials",
    icon: Layers,
  },
];

type BecomeServiceProviderHeroProps = {
  id?: string;
  className?: string;
};

export default function BecomeServiceProviderHero({
  id,
  className = "bg-[#0B1220]",
}: BecomeServiceProviderHeroProps) {
  return (
    <section id={id} className={`py-16 md:py-24 text-white ${className}`}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-2`}>
        {/* Left Side: Content */}
        <div>
          <SectionTitle
            dark={true}
            eyebrow="SERVICE PROVIDERS"
            title="Bring your automotive services to the right customers."
            description="Explore whether your business and services may be eligible to participate in DriverXtra. Learn the requirements, review how applications are assessed and choose the next step for your market."
          />

          {/* 3 Dark Feature Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {FEATURE_BADGES.map(({ title, description, icon: Icon }, i) => (
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
              src="/images/become-a-service-provider/1.png"
              alt="Automotive workshop service bay with vehicle on lift and tail lights illuminated"
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

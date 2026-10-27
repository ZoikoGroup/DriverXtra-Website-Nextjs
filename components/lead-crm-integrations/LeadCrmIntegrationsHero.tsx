import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type LeadCrmIntegrationsHeroProps = {
  id?: string;
  className?: string;
};

export default function LeadCrmIntegrationsHero({
  id,
  className = "bg-[#0B1220]",
}: LeadCrmIntegrationsHeroProps) {
  return (
    <section id={id} className={`py-16 md:py-24 text-white ${className}`}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-2`}>
        {/* Left Side: Content */}
        <div className="max-w-xl">
          <SectionTitle
            dark={true}
            eyebrow="DEALER LEAD MANAGEMENT"
            title="Keep inquiries connected to the next step."
            description="Give your team a clearer path from a customer inquiry to an authorized follow-up. Connect supported CRM workflows, manage routing and see when a delivery needs attention."
          />
        </div>

        {/* Right Side: Image */}
        <Reveal direction="zoom" delay={150} className="w-full">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/lead-crm-integrations/hero.png"
              alt="Team collaborating in a modern office representing lead and CRM integrations"
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

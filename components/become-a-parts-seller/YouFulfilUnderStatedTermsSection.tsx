import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type FulfilmentStep = {
  step: number;
  title: string;
  description: string;
};

const FULFILMENT_STEPS: FulfilmentStep[] = [
  {
    step: 1,
    title: "Order received",
    description: "A buyer orders a listed part.",
  },
  {
    step: 2,
    title: "Confirm stock",
    description: "Only confirm what you can ship.",
  },
  {
    step: 3,
    title: "Dispatch",
    description: "Ship from your stated location.",
  },
  {
    step: 4,
    title: "Delivery",
    description: "Tracking where your carrier supports it.",
  },
  {
    step: 5,
    title: "Returns",
    description: "Handled under the policy buyers saw before purchase.",
  },
];

type YouFulfilUnderStatedTermsSectionProps = {
  id?: string;
  className?: string;
};

export default function YouFulfilUnderStatedTermsSection({
  id,
  className = "bg-[#F6F8FB]",
}: YouFulfilUnderStatedTermsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Fulfilment & returns"
          title="You fulfil — under your stated terms"
          description="Pricing, stock and dispatch are your responsibility under approved seller terms."
        />

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side: Image */}
          <Reveal direction="zoom" delay={100} className="w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/become-a-parts-seller/3.png"
                alt="Water droplets reflecting fluid protection and chemical supplies"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Right Side: Step-by-Step Vertical Process Timeline */}
          <div className="relative">
            {/* Vertical Connecting Line */}
            <div
              className="absolute left-4 top-4 bottom-4 w-[2px] bg-slate-200"
              aria-hidden="true"
            />

            <div className="space-y-6">
              {FULFILMENT_STEPS.map(({ step, title, description }, i) => (
                <Reveal
                  key={step}
                  delay={i * 80}
                  className="relative z-10 flex items-start gap-5"
                >
                  {/* Circle Badge with Brand Accent Color */}
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-ink ring-white">
                    {step}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink">{title}</h3>
                    <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

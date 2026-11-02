import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type StepItem = {
  step: number;
  title: string;
  description: string;
};

const ONBOARDING_STEPS: StepItem[] = [
  {
    step: 1,
    title: "Check eligibility",
    description: "Business type, category and market",
  },
  {
    step: 2,
    title: "Create your organization",
    description: "Legal identity and representative",
  },
  {
    step: 3,
    title: "Add branches and services",
    description: "Locations, hours, categories, credentials",
  },
  {
    step: 4,
    title: "Submit for review",
    description: "Your receipt is not an approval",
  },
  {
    step: 5,
    title: "Decision and agreement",
    description: "Approved scope, then terms to sign",
  },
  {
    step: 6,
    title: "Activation",
    description: "Specific services enabled — possibly limited",
  },
];

type ProviderOnboardingStepsSectionProps = {
  id?: string;
  className?: string;
};

export default function ProviderOnboardingStepsSection({
  id,
  className = "bg-[#F6F8FB]",
}: ProviderOnboardingStepsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="How provider onboarding works"
          title="Six clear steps from first check to activation"
        />

        <div className="relative mt-12">
          {/* Connecting Timeline Line */}
          <div
            className="absolute top-4 hidden h-[2px] w-full bg-[#F5B400] lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {ONBOARDING_STEPS.map(({ step, title, description }, i) => (
              <Reveal key={step} delay={i * 80} className="relative z-10">
                <div className="flex flex-col items-start">
                  {/* Step Badge */}
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-ink text-xs font-bold text-[#F5B400] shadow-sm ring-4 ring-slate-50">
                    {step}
                  </div>

                  {/* Step Title & Description */}
                  <h3 className="mt-4 text-xs font-bold text-ink">{title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type WorkflowStep = {
  step: number;
  title: string;
  description: string;
};

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: "Request received",
    description: "A customer describes what they need.",
  },
  {
    step: 2,
    title: "Clarify the need",
    description: "Ask questions before quoting.",
  },
  {
    step: 3,
    title: "Agree scope and estimate",
    description: "Itemized and clear.",
  },
  {
    step: 4,
    title: "Customer approval",
    description: "Work starts only after approval.",
  },
  {
    step: 5,
    title: "Complete and record",
    description: "Keep a record of work performed.",
  },
];

type AgreeWorkBeforeItBeginsSectionProps = {
  id?: string;
  className?: string;
};

export default function AgreeWorkBeforeItBeginsSection({
  id,
  className = "bg-white",
}: AgreeWorkBeforeItBeginsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Provider workflow"
          title="Agree the work before it begins."
          description="Where supported, providers can review customer requests, clarify service needs and agree the work before it begins. Transaction features are conditional on your market and approved terms."
        />

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side: Image */}
          <Reveal direction="zoom" delay={100} className="w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/become-a-service-provider/6.png"
                alt="Business partners celebrating an agreed scope of work with a high five"
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
              {WORKFLOW_STEPS.map(({ step, title, description }, i) => (
                <Reveal
                  key={step}
                  delay={i * 80}
                  className="relative z-10 flex items-start gap-5"
                >
                  {/* Circle Badge with Brand Accent Color */}
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-ink shadow-sm ring-4 ring-white">
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

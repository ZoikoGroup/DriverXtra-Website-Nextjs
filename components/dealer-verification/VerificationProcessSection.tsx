import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type ProcessStep = {
  number: string;
  description: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "1",
    description: "Check the requirements for your market and dealership type.",
  },
  {
    number: "2",
    description:
      "Submit the requested information through your secure dealer account.",
  },
  {
    number: "3",
    description:
      "We review the applicable details and may request clarification.",
  },
  {
    number: "4",
    description:
      "Address any outstanding requests or provide updated documents.",
  },
  {
    number: "5",
    description: "See the outcome and any applicable renewal requirements.",
  },
];

type VerificationProcessSectionProps = {
  id?: string;
  className?: string;
};

export default function VerificationProcessSection({
  id,
  className = "bg-white",
}: VerificationProcessSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Process"
          title="A clear process from requirements to review."
        />

        <div className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map(({ number, description }, i) => (
            <Reveal key={number} delay={i * 80}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <div>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-[#F5B400] font-bold text-xs shadow-sm transition-transform duration-300 group-hover:scale-105">
                    {number}
                  </span>
                  <p className="mt-4 text-xs font-semibold leading-relaxed text-ink">
                    {description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

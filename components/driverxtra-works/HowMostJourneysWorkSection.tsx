import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface JourneyStep {
  number: number;
  title: string;
  description: string;
}

const journeySteps: JourneyStep[] = [
  {
    number: 1,
    title: "Discover",
    description: "Search and browse",
  },
  {
    number: 2,
    title: "Assess",
    description: "Review what's known and what isn't",
  },
  {
    number: 3,
    title: "Contact or request",
    description: "Reach the seller or provider",
  },
  {
    number: 4,
    title: "Confirm with the owner",
    description: "They confirm price, stock or timing",
  },
  {
    number: 5,
    title: "Follow through",
    description: "Complete safely and keep records",
  },
];

export default function HowMostJourneysWorkSection() {
  return (
    <section className="bg-[#F8F9FC] py-16 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className={container}>
        {/* Header */}
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Overview</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
              How most journeys work
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-xl">
              Every path follows the same shape. The seller, provider or partner confirms each commitment — not DriverXtra on their behalf.
            </p>
          </Reveal>
        </div>

        {/* Stepper Timeline */}
        <div className="mt-12 sm:mt-14">
          {/* Desktop Stepper */}
          <div className="relative hidden md:block">
            {/* Connecting line */}
            <div className="absolute top-4 left-6 right-6 h-[2px] z-0">
              <div className="h-full w-full bg-gradient-to-r from-amber-400 via-amber-300/80 to-slate-200" />
            </div>

            <div className="relative z-10 grid grid-cols-5 gap-4">
              {journeySteps.map((step, idx) => (
                <Reveal key={step.number} delay={idx * 80}>
                  <div className="flex flex-col items-start pr-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1220] text-xs font-bold text-[#ffc20e] shadow-sm ring-4 ring-[#F8F9FC]">
                      {step.number}
                    </div>

                    <h3 className="mt-3.5 text-xs sm:text-sm font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Mobile Stepper */}
          <div className="space-y-6 md:hidden">
            {journeySteps.map((step, idx) => (
              <Reveal key={step.number} delay={idx * 60}>
                <div className="flex items-start gap-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B1220] text-xs font-bold text-[#ffc20e] shadow-sm">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-0.5 text-xs text-slate-500">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

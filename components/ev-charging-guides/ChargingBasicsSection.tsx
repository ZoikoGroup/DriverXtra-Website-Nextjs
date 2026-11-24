import type { ReactNode } from "react";
import { Zap, Layers, Car, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ChargingBasicCard = {
  id: string;
  title: string;
  description: string;
  icon: "zap" | "layers" | "car";
};

export type EnergyFlowStep = {
  id: string;
  title: string;
  description: string;
};

const DEFAULT_BASIC_CARDS: ChargingBasicCard[] = [
  {
    id: "kw-vs-kwh",
    title: "kW vs kWh",
    description:
      "kW is power — how fast energy flows. kWh is energy — how much is stored or used. A 7 kW charger running for 2 hours delivers about 14 kWh, before losses.",
    icon: "zap",
  },
  {
    id: "ac-vs-dc",
    title: "AC vs DC",
    description:
      "AC charging uses the car's onboard charger, which limits speed. DC charging bypasses it and feeds the battery directly, usually much faster.",
    icon: "layers",
  },
  {
    id: "bev-vs-phev",
    title: "BEV vs PHEV",
    description:
      "A battery-electric vehicle runs only on its battery. A plug-in hybrid has a smaller battery plus a combustion engine.",
    icon: "car",
  },
];

const DEFAULT_FLOW_STEPS: EnergyFlowStep[] = [
  {
    id: "grid",
    title: "Grid",
    description: "Electricity supply",
  },
  {
    id: "charger",
    title: "Charger",
    description: "AC equipment or DC station",
  },
  {
    id: "vehicle-inlet",
    title: "Vehicle inlet",
    description: "Connector and protocol must match",
  },
  {
    id: "onboard-charger",
    title: "Onboard charger",
    description: "AC only — limits AC speed",
  },
  {
    id: "battery",
    title: "Battery",
    description: "Accepts power based on its state",
  },
];

type ChargingBasicsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  basics?: ChargingBasicCard[];
  flowTitle?: string;
  flowSteps?: EnergyFlowStep[];
  className?: string;
};

export default function ChargingBasicsSection({
  id = "charging-basics",
  eyebrow = "Fundamentals",
  title = "Charging basics",
  description,
  basics = DEFAULT_BASIC_CARDS,
  flowTitle = "How energy reaches the battery",
  flowSteps = DEFAULT_FLOW_STEPS,
  className = "bg-[#F6F8FB]",
}: ChargingBasicsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3-Column Top Grid: Fundamental Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {basics.map((card, i) => (
            <Reveal key={card.id} delay={i * 50}>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8 h-full">
                {/* Dark Slate Icon Badge */}
                <div className="mb-5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-2xs">
                  {card.icon === "zap" && (
                    <Zap className="h-4 w-4 stroke-[2]" />
                  )}
                  {card.icon === "layers" && (
                    <Layers className="h-4 w-4 stroke-[2]" />
                  )}
                  {card.icon === "car" && (
                    <Car className="h-4 w-4 stroke-[2]" />
                  )}
                </div>

                <h3 className="text-base font-bold text-ink sm:text-lg">
                  {card.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                  {card.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Energy Flow Diagram Container */}
        <Reveal delay={180}>
          <div className="mt-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
            <h3 className="text-sm font-bold text-ink sm:text-base">
              {flowTitle}
            </h3>

            {/* Step-by-step Process Flow */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-2">
              {flowSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className="relative flex flex-col sm:flex-row sm:items-center"
                >
                  <div className="flex-1 rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-slate-100/80">
                    <h4 className="text-xs font-bold text-ink sm:text-sm">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
                      {step.description}
                    </p>
                  </div>

                  {/* Horizontal Arrow between steps (hidden on last step & mobile) */}
                  {idx < flowSteps.length - 1 && (
                    <div className="hidden sm:flex shrink-0 items-center justify-center px-1 text-amber-500">
                      <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

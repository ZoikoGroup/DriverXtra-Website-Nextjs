import Image from "next/image";
import { ChartNoAxesColumnIncreasing, MapPin, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { IMG } from "./data";

/** Lucide has no steering-wheel icon, so this one is drawn to match its 24px stroke style. */
function SteeringWheel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2" />
      <path d="M3.5 10.5 10 12M20.5 10.5 14 12M12 14v7" />
    </svg>
  );
}

const STEPS: { title: string; body: string; Icon: LucideIcon | typeof SteeringWheel }[] = [
  {
    title: "Explore driver plans",
    body: "Compare data, hotspot and calling across plans sized from lighter workweeks to full-time driving.",
    Icon: ChartNoAxesColumnIncreasing,
  },
  {
    title: "Check your eligibility",
    body: "Confirm your area and device are supported before you sign up.",
    Icon: MapPin,
  },
  {
    title: "Sign up and drive",
    body: "Choose your plan and get set up while parked, so you're connected before your first trip.",
    Icon: SteeringWheel,
  },
];

export default function ThreeStepsSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-[#13243c] py-20 text-white md:py-24">
      <div className={container}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="bf-display max-w-lg text-3xl leading-[1.05] font-extrabold sm:text-5xl">
                Three steps to a plan that works your hours
              </h2>
            </Reveal>

            <ol className="mt-10 space-y-8">
              {STEPS.map(({ title, body, Icon }, i) => (
                <Reveal key={title} as="li" delay={100 + i * 100} className="flex gap-5">
                  <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl border-2 border-[#fcd116] text-[#fcd116]">
                    <Icon className="h-7 w-7" />
                    <span aria-hidden className="absolute -top-2.5 -right-2.5 h-5 w-5 rounded-full bg-[#2f8a7e]" />
                  </span>
                  <div>
                    <h3 className="bf-display text-xl font-extrabold">{title}</h3>
                    <p className="mt-1.5 max-w-md text-[16px] leading-relaxed text-slate-300">{body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal direction="zoom" delay={150}>
            <div className="relative aspect-[560/512] overflow-hidden rounded-3xl border-4 border-[#fcd116]">
              <Image
                src={`${IMG}/steps-car-on-road.webp`}
                alt="Dark saloon car driving along a road at dusk, seen from behind"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

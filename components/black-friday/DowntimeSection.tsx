import Image from "next/image";
import Link from "next/link";
import { Check, SquareParking } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { IMG } from "./data";

const POINTS = [
  "5 GB to 35 GB of high-speed data, then unlimited 2G data",
  "1 GB to 20 GB of mobile hotspot for a second device",
  "Unlimited talk and text across the U.S., Canada and Mexico from Cruise 15",
];

export default function DowntimeSection() {
  return (
    <section id="downtime" className="relative overflow-hidden bg-[#13243c] text-white">
      {/* City photo fills the left half on desktop, fading into the navy panel */}
      <div className="relative h-72 sm:h-96 lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[55%]">
        <Image
          src={`${IMG}/downtime-city-aerial.webp`}
          alt="Aerial view of a dense city grid beside a lake at dusk"
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#13243c] lg:bg-gradient-to-r lg:via-[#13243c]/30 lg:to-[#13243c]" />
      </div>

      <div className={`relative py-16 lg:py-28 ${container}`}>
        <div className="lg:ml-auto lg:w-[48%]">
          <Reveal direction="left">
            <div className="border-[3px] border-[#fcd116] bg-[#0d1829] px-7 py-7 sm:px-8">
              <h2 className="bf-display text-3xl leading-tight font-extrabold italic sm:text-4xl">
                Downtime matters on the road.
              </h2>
              <p className="mt-2 text-[15px] font-bold text-[#fcd116]">Pick a plan sized to how much you drive.</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 text-[16px] leading-relaxed text-slate-300">
              Every DriverX Mobile driver plan keeps you online after your high-speed allowance, so navigation and
              messaging don&apos;t simply stop mid-shift. Higher tiers add more hotspot and wider calling.
            </p>
            <ul className="mt-6 space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex gap-3 text-[16px]">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[#4fb3a5]" strokeWidth={3} />
                  {p}
                </li>
              ))}
            </ul>

            <p className="mt-7 flex gap-3 rounded-lg border-l-[3px] border-[#2f8a7e] bg-[#13243c] px-5 py-4 text-[15px] text-slate-200">
              <SquareParking className="mt-0.5 h-5 w-5 shrink-0 text-[#4fb3a5]" />
              Set up your phone and routes while parked. Please don&apos;t handle your phone while driving.
            </p>

            <Link
              href="#plans"
              className="btn-shine mt-7 inline-flex h-12 items-center rounded-full bg-[#fcd116] px-6 text-[15px] font-bold text-[#13243c] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(252,209,22,0.7)]"
            >
              Explore driver plans
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

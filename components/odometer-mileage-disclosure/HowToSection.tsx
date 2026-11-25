import { useId } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { regions } from "@/lib/region";
import { howToImage, howToSteps } from "./data";

type HowToSectionProps = { location: string; onLocationChange: (value: string) => void };

export default function HowToSection({ location, onLocationChange }: HowToSectionProps) {
  const ids = useId();

  return (
    <section id="how-to" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className={container}>
        <label htmlFor={`${ids}-location`} className="block text-xs font-bold text-ink">
          Where is the vehicle registered?
        </label>
        <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-2">
          <div className="relative">
            <select
              id={`${ids}-location`}
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              aria-describedby={`${ids}-location-note`}
              className="h-11 w-64 appearance-none rounded-xl border border-slate-200 bg-white pr-9 pl-3 text-sm text-ink focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
            >
              <option value="">Choose a location</option>
              {regions.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>
          <p id={`${ids}-location-note`} aria-live="polite" className="pb-1 text-xs text-slate-500">
            {location
              ? `No approved rule for ${location} in this version — follow the general steps below.`
              : "Choose a location to see available guidance."}
          </p>
        </div>

        <SectionTitle eyebrow="How to" title="Check the total odometer reading" className="mt-14 max-w-2xl" />

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <ol>
            {howToSteps.map(({ title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 80} className="relative flex gap-5 pb-7 last:pb-0">
                {i < howToSteps.length - 1 && (
                  <span aria-hidden className="absolute top-11 bottom-1 left-5 w-0.5 -translate-x-1/2 bg-slate-200" />
                )}
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-ink">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="text-sm font-bold text-ink">{title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal direction="zoom" delay={150}>
            <div className="relative aspect-[8/5] overflow-hidden rounded-2xl bg-slate-200">
              <Image
                src={howToImage}
                alt="A driver’s view of a car dashboard"
                fill
                sizes="(min-width: 1024px) 590px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

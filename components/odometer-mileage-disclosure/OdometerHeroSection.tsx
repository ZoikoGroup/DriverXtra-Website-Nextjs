import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, container } from "@/components/ui/SectionTitle";
import { heroImage } from "./data";

export default function OdometerHeroSection() {
  return (
    <section id="odometer-mileage-disclosure" className="bg-navy py-14 text-white md:py-20">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]`}>
        <div>
          <Reveal>
            <Eyebrow dark>SELL VEHICLES / DOCUMENTS</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              Odometer / Mileage Disclosure
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
              Understand how to record a vehicle&apos;s displayed mileage and when further disclosure may be needed.
            </p>
          </Reveal>
        </div>

        <Reveal direction="zoom" delay={150}>
          <div className="relative aspect-[8/5] overflow-hidden rounded-2xl bg-slate-800">
            <Image
              src={heroImage}
              alt="An instrument display with readings"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

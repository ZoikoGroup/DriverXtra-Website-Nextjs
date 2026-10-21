import Image from "next/image";
import { Info } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { heroFacts } from "./data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <BgImage src="/images/home/hero-bg.jpeg" className="opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-20">
        <div>
          <Reveal>
            <Eyebrow dark>
              <span className="text-xs">Value My Vehicle</span>
            </Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-[52px]">
              Sell your vehicle with clarity.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-xl font-bold text-brand sm:text-2xl">Know what your vehicle is worth.</p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300">
              Get a market-informed valuation, then choose how you want to sell. Your estimate is not a guaranteed purchase
              offer.
            </p>
          </Reveal>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {heroFacts.map(({ text, icon: Icon }, i) => (
              <Reveal key={text} as="li" delay={400 + i * 90}>
                <span className="group flex items-center gap-2 text-sm text-slate-300">
                  <Icon className="h-4 w-4 text-brand transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" />
                  {text}
                </span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={700}>
            <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-white">
              <Info className="h-4 w-4 text-brand" />A valuation estimate is not a purchase offer.
            </p>
          </Reveal>
        </div>

        {/* The image already has its rounded frame and shadow */}
        <Reveal direction="left" delay={200}>
          <div className="group relative animate-float-slow">
            <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
            <Image
              src="/images/value-my-vehicle/hero-value-my-vehicle.webp"
              alt="A seller and buyer shaking hands beside an SUV"
              width={633}
              height={525}
              priority
              className="relative h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

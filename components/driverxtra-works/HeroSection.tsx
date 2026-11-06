import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0B1220] py-16 sm:py-20 lg:py-24 text-white">
      {/* Subtle background ambient graphic/arc */}
      <div className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.04] opacity-70" />
      <div className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-white/[0.02]" />

      <div className={`${container} relative grid items-center gap-10 lg:grid-cols-12 lg:gap-12`}>
        {/* Left Column: Heading and Description */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#ffc20e]">
                COMPANY &amp; SUPPORT
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.12] text-white">
              How DriverXtra Works
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-slate-300 sm:text-[15px]">
              Explore vehicles, parts and services, learn what to check, and continue with the right seller,
              provider or specialist service when available in your market.
            </p>
          </Reveal>
        </div>

        {/* Right Column: Hero Image */}
        <Reveal direction="zoom" delay={150} className="lg:col-span-6 xl:col-span-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-slate-900 border border-white/10">
            <Image
              src="/images/DriverXtra-Works/w1.png"
              alt="Person driving modern vehicle with DriverXtra"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, container } from "@/components/ui/SectionTitle";
import { heroImage } from "./data";

export default function PhotoChecklistHeroSection() {
  return (
    <section id="photo-checklist" className="bg-navy py-14 text-white md:py-20">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]`}>
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow dark>SELL VEHICLES / SELLER TOOLS</Eyebrow>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-slate-200">Photo guide</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">Photo checklist</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
              Help buyers see your vehicle clearly. Start with the angles that matter, then check every image for private
              details.
            </p>
          </Reveal>
        </div>

        <Reveal direction="zoom" delay={150}>
          <div className="relative aspect-[8/5] overflow-hidden rounded-2xl bg-slate-800">
            <Image
              src={heroImage}
              alt="A car photographed in good daylight"
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

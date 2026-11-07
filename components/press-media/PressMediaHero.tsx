import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { IMG } from "./data";

export default function PressMediaHero() {
  return (
    <section id="press-media-hero" className="relative overflow-hidden bg-navy py-16 text-white md:py-20">
      {/* Faint arc behind the image, top right */}
      <div aria-hidden className="absolute -top-40 -right-24 h-[460px] w-[460px] rounded-full border-[56px] border-white/[0.04]" />

      <div className={`relative ${container}`}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="flex items-center gap-3 text-[13px] font-bold tracking-wide text-brand uppercase">
              <span className="h-0.5 w-5 bg-brand" />
              Company &amp; Support
            </p>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">Press &amp; Media</h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-slate-300">
              Find approved company resources, published announcements and the right way to submit a media inquiry.
            </p>
          </Reveal>

          <Reveal direction="zoom" delay={150}>
            <div className="relative aspect-[563/479] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={`${IMG}/hero-communications-team.webp`}
                alt="Large open-plan office with people working at rows of desks"
                fill
                priority
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

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, container } from "@/components/ui/SectionTitle";

export default function NewsroomHeroSection() {
  return (
    <section id="newsroom-hero" className="relative overflow-hidden bg-navy py-16 text-white md:py-24">
      <div className={`${container} grid items-center gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow dark>OFFICIAL DRIVERXTRA NEWS</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">Newsroom</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
              Official DriverXtra announcements and approved media information.
            </p>
          </Reveal>
        </div>

        <Reveal direction="zoom" delay={150} className="lg:col-span-6">
          <div className="relative aspect-[6/5] w-full overflow-hidden rounded-3xl bg-black shadow-2xl">
            <Image
              src="/images/newsroom/hero-communications-team.webp"
              alt="A communications team at work in an open-plan office"
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

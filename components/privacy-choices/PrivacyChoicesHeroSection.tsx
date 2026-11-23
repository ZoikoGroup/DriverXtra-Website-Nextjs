import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export default function PrivacyChoicesHeroSection() {
  return (
    <section id="privacy-choices-hero" className="relative overflow-hidden bg-navy py-10 text-white md:py-14">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12`}>
        <div className="lg:col-span-7">
          <Reveal>
            <h1 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">Privacy Choices</h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
              Explore the privacy choices and request options available to you. Availability can depend on your location
              and the processing involved.
            </p>
          </Reveal>
        </div>

        <Reveal direction="zoom" delay={150} className="lg:col-span-5">
          <div className="relative aspect-[8/5] w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
            <Image
              src="/images/privacy-choices/hero-laptop-phone.webp"
              alt="A person using a laptop and a phone at a café table"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

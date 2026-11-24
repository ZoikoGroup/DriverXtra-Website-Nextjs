import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, container } from "@/components/ui/SectionTitle";

export default function VerifiedHeroSection() {
  return (
    <section id="verified-seller-inventory" className="relative overflow-hidden bg-navy py-14 text-white md:py-20">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12`}>
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow dark>BUY VEHICLES / BROWSE BY NEED</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 max-w-xl text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              Browse vehicles from verified sellers.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
              Explore available listings offered by sellers who have completed applicable checks. Verification scope
              varies by seller and market.
            </p>
          </Reveal>
        </div>

        <Reveal direction="zoom" delay={150} className="lg:col-span-5">
          <div className="relative aspect-[8/5] w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
            <Image
              src="/images/verified-seller-inventory/hero-verified-sellers.webp"
              alt="Cars on a dealer forecourt"
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

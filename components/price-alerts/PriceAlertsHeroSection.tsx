import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, container } from "@/components/ui/SectionTitle";

export default function PriceAlertsHeroSection() {
  return (
    <section id="price-alerts" className="relative overflow-hidden bg-navy py-14 text-white md:py-20">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12`}>
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow dark>BRANDS &amp; RESEARCH</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">Price Alerts</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-3 text-lg font-bold">Know when a watched vehicle price changes.</p>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
              Set an alert for a specific listing or a saved vehicle search. We will notify you through available,
              authorized channels when a qualifying price event is validated.
            </p>
          </Reveal>
        </div>

        <Reveal direction="zoom" delay={150} className="lg:col-span-5">
          <div className="relative aspect-[8/5] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-2xl">
            <Image
              src="/images/price-alerts/hero-price-alerts.webp"
              alt="A person checking vehicle prices on a laptop"
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

import Reveal from "@/components/ui/Reveal";
import { Eyebrow, container } from "@/components/ui/SectionTitle";

export default function PriceReducedHeroSection() {
  return (
    <section id="price-reduced" className="bg-navy py-14 text-white md:py-20">
      <div className={container}>
        <Reveal>
          <Eyebrow dark>BUY VEHICLES / BROWSE BY NEED</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">Price Reduced Vehicles</h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
            Explore available vehicles with a documented decrease in their public asking price.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export default function SitemapHeroSection() {
  return (
    <section id="sitemap-hero" className="relative overflow-hidden bg-navy py-10 text-white md:py-6">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12`}>
        <div className="lg:col-span-7">
          <Reveal>
            <h1 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">Sitemap &amp; Global Markets</h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-300 sm:text-base">
              Explore DriverXtra sections and choose how to browse your market.
            </p>
          </Reveal>
        </div>

        <Reveal direction="zoom" delay={150} className="lg:col-span-5">
          <div className="relative aspect-[8/5] w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
            <Image
              src="/images/sitemap-global-markets/hero-driving-at-dusk.webp"
              alt="A driver's hands on the steering wheel at dusk, with city lights ahead"
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

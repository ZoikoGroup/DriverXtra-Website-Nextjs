import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, container } from "@/components/ui/SectionTitle";
import { quickLinks } from "./data";

export default function VehicleHistoryHeroSection() {
  return (
    <>
      <section id="vehicle-history" className="bg-navy py-14 text-white md:py-20">
        <div className={container}>
          <Reveal>
            <Eyebrow dark>BUY VEHICLES / GUIDANCE</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">Vehicle History</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
              Understand what a vehicle&apos;s records may show—and what you still need to check before buying.
            </p>
          </Reveal>
        </div>
      </section>

      <nav aria-label="On this page" className="bg-white py-8 md:py-10">
        <ul className={`${container} grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4`}>
          {quickLinks.map(({ label, href, image, alt }, i) => (
            <Reveal as="li" key={label} delay={i * 80}>
              <a
                href={href}
                className="group block overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_16px_32px_-20px_rgba(15,23,42,0.35)]"
              >
                <div className="relative aspect-[2/1] overflow-hidden bg-slate-200">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="block px-3 py-2.5 text-xs font-bold text-ink group-hover:text-gold">{label}</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </nav>
    </>
  );
}

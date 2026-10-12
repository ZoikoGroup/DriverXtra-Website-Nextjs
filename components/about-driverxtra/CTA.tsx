import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import { container } from "./SectionTitle";

const secondary = ["Sell a Vehicle", "Find Parts", "For Business"];

export default function CTA() {
  return (
    <section className="group relative overflow-hidden bg-navy py-20 text-center text-white md:py-24">
      <BgImage src="/images/about/cta-background.webp" className="transition-transform duration-[2s] group-hover:scale-105" />
      <div className="absolute inset-0 bg-navy/20" />

      <div className={`${container} relative`}>
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl leading-tight font-extrabold tracking-tight sm:text-[40px]">
            Ready to move through automotive commerce <span className="text-brand">with more confidence?</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-300">
            Explore vehicles, parts, services and trusted marketplace partners — or bring your dealership, fleet,
            inventory, service network or automotive business to DriverXtra.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#"
              className="btn-shine rounded-full bg-brand px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_12px_28px_-8px_rgba(255,194,14,0.7)]"
            >
              Explore DriverXtra
            </Link>
            {secondary.map((label) => (
              <Link
                key={label}
                href="#"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-ink"
              >
                {label}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

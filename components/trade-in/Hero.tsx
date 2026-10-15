import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import { Eyebrow } from "@/components/ui/SectionTitle";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <BgImage src="/images/home/hero-bg.jpeg" className="opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-20">
        <div>
          <Reveal>
            <Eyebrow dark>
              <span className="text-xs">Trade-In Options</span>
            </Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-[52px]">
              Sell your vehicle with clarity.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-xl font-bold text-brand sm:text-2xl">Explore trade-in options for your vehicle.</p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300">
              See whether an eligible dealer in your market can consider your current vehicle toward a separate purchase.
              Dealer terms, inspection and any finance arrangements are independent decisions.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#check-trade-in"
                className="btn-shine rounded-full bg-brand px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(255,194,14,0.7)]"
              >
                Check Trade-In Availability
              </Link>
              <Link
                href="#compare-methods"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink"
              >
                See Other Ways to Sell
              </Link>
            </div>
          </Reveal>
        </div>

        {/* The image already has its rounded frame and shadow */}
        <Reveal direction="left" delay={200}>
          <div className="group relative animate-float-slow">
            <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
            <Image
              src="/images/trade-in/hero-trade-in.webp"
              alt="A couple reviewing trade-in details beside an SUV"
              width={633}
              height={483}
              priority
              className="relative h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

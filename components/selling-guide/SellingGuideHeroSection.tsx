import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Tag } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, container } from "@/components/ui/SectionTitle";

export default function SellingGuideHeroSection() {
  return (
    <section id="selling-guide" className="relative overflow-hidden bg-navy py-16 text-white md:py-24">
      <div className={`${container} grid items-center gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow dark>SELLING GUIDE</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              Sell your vehicle, step by step.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
              Choose how to sell, get the car ready, write an honest listing and finish the sale safely. Steps can
              differ by market and sale type.
            </p>
          </Reveal>
          <Reveal delay={300} className="mt-6">
            <nav
              aria-label="Choose a guide"
              className="inline-flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/5 p-1"
            >
              <Link
                href="/trust-buyer-safety"
                className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ShoppingCart className="h-4 w-4" /> I&apos;m buying a vehicle
              </Link>
              <span
                aria-current="page"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink"
              >
                <Tag className="h-4 w-4 text-gold" /> I&apos;m selling a vehicle
              </span>
            </nav>
          </Reveal>
        </div>

        <Reveal direction="zoom" delay={150} className="lg:col-span-6">
          <div className="relative aspect-[6/5] w-full overflow-hidden rounded-3xl bg-black shadow-2xl">
            <Image
              src="/images/selling-guide/hero-car-ready-for-sale.webp"
              alt="A clean car parked and ready for sale"
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

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { steps } from "./data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <BgImage src="/images/home/hero-bg.jpeg" className="opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-20">
        <div>
          <Reveal>
            <Eyebrow dark>
              <span className="text-xs">Sell Vehicles · Instant Offer</span>
            </Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-[52px]">
              Sell your vehicle with clarity.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-xl font-bold text-brand sm:text-2xl">Check whether an instant vehicle offer is available.</p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300">
              See whether an eligible third-party vehicle buyer can provide an offer for your vehicle in your market.
              Offers depend on partner availability, vehicle details and stated conditions.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/sell-vehicles#create-listing"
                className="btn-shine rounded-full bg-brand px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(255,194,14,0.7)]"
              >
                Create a Listing
              </Link>
              <Link
                href="/sell-vehicles#value-my-vehicle"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink"
              >
                Get My Valuation
              </Link>
            </div>
          </Reveal>
        </div>

        {/* How it works */}
        <Reveal direction="left" delay={200}>
          <div className="rounded-2xl bg-white p-5 text-ink shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)] sm:p-6">
            <p className="text-sm font-semibold text-slate-500">How it works</p>
            <ol className="mt-3 space-y-2">
              {steps.map((s, i) => (
                <Reveal key={s.id} as="li" direction="left" delay={300 + i * 80}>
                  <a
                    href="#request-offer"
                    className="group flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-3 transition-all duration-300 hover:translate-x-1 hover:border-brand hover:bg-brand-light/40 hover:shadow-md"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-ink">
                      {s.id}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold">{s.title}</span>
                      <span className="block text-xs text-slate-500">{s.text}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                </Reveal>
              ))}
            </ol>
            <p className="mt-3 text-xs text-slate-500">We don&apos;t show sample prices. Any amount comes from the named partner.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

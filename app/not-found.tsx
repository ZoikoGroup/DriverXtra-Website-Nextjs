import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Car, CircleHelp, Home, Info, Navigation, Wrench, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BackButton from "@/components/not-found/BackButton";
import RoadScene from "@/components/not-found/RoadScene";

export const metadata: Metadata = {
  title: "Page not found — DriverXtra",
};

const destinations: { title: string; text: string; href: string; icon: LucideIcon }[] = [
  { title: "Buy Vehicles", text: "Browse verified listings", href: "/buy-vehicles", icon: Car },
  { title: "Find Parts", text: "Parts that fit your vehicle", href: "#", icon: Wrench },
  { title: "About DriverXtra", text: "Who we are and how we work", href: "/about-driverxtra", icon: Info },
  { title: "Help Center", text: "Answers and support", href: "#", icon: CircleHelp },
];

/** The "0" in 404, drawn as a spinning wheel. */
function Wheel() {
  return (
    <svg viewBox="0 0 120 120" className="h-[0.86em] w-[0.86em]" aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill="#111a2e" stroke="#ffc20e" strokeWidth="6" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#1a2440" strokeWidth="10" strokeDasharray="6 8" />
      <g className="nf-spin-slow">
        <circle cx="60" cy="60" r="30" fill="#0b1220" stroke="#ffc20e" strokeWidth="4" />
        {[0, 72, 144, 216, 288].map((deg) => (
          <rect key={deg} x="57" y="32" width="6" height="22" rx="3" fill="#ffc20e" transform={`rotate(${deg} 60 60)`} />
        ))}
        <circle cx="60" cy="60" r="8" fill="#ffc20e" />
      </g>
    </svg>
  );
}

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Grid + glow background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute top-10 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 pt-14 text-center sm:px-6 sm:pt-20">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <Navigation className="h-3.5 w-3.5 text-brand" />
            Recalculating route…
          </span>
        </Reveal>

        <Reveal delay={100} direction="zoom">
          <h1 className="mt-6 flex items-center justify-center gap-2 text-[110px] leading-none font-extrabold tracking-tight sm:gap-4 sm:text-[170px]">
            <span className="animate-float bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">4</span>
            <span className="inline-flex animate-float [animation-delay:0.4s]">
              <Wheel />
            </span>
            <span className="animate-float bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent [animation-delay:0.8s]">
              4
            </span>
            <span className="sr-only">Error 404</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <h2 className="mt-4 text-2xl font-extrabold sm:text-4xl">
            Looks like you took a <span className="text-brand">wrong turn.</span>
          </h2>
        </Reveal>
        <Reveal delay={300}>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-slate-300">
            The page you&apos;re looking for has moved, been removed or never existed. Let&apos;s get you back on the road.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="btn-shine group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_12px_28px_-8px_rgba(255,194,14,0.7)]"
            >
              <Home className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              Back to home
            </Link>
            <BackButton />
          </div>
        </Reveal>
      </div>

      <Reveal delay={300} className="relative mt-12">
        <RoadScene />
      </Reveal>

      {/* Quick destinations */}
      <div className="relative bg-[#151d2e] pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <p className="pt-2 text-center text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Popular destinations
            </p>
          </Reveal>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map(({ title, text, href, icon: Icon }, i) => (
              <Reveal key={title} delay={i * 90}>
                <Link
                  href={href}
                  className="group flex h-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:bg-white/[0.08] hover:shadow-[0_20px_40px_-20px_rgba(255,194,14,0.35)]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand transition-all duration-300 group-hover:-rotate-6 group-hover:bg-brand group-hover:text-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block text-sm font-semibold text-white">{title}</span>
                    <span className="block truncate text-xs text-slate-400">{text}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

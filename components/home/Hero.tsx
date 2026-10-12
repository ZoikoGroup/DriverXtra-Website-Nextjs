import { BadgeCheck, Fuel, Gauge, MapPin, ShieldCheck, Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import HeroSearch from "./HeroSearch";

const stats = [
  { value: "2.4M+", label: "Vehicles listed" },
  { value: "18K+", label: "Verified partners" },
  { value: "40+", label: "Markets served" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand/15 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:px-10">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              One governed global automotive marketplace
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
              Buy, sell & power every{" "}
              <span className="relative inline-block text-brand">
                journey
                <svg viewBox="0 0 200 12" className="absolute -bottom-2 left-0 w-full" aria-hidden="true">
                  <path d="M2 9c50-6 146-8 196-2" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}
              in one place.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Vehicles, parts, finance, insurance and automotive services from verified sellers and regulated partners —
              connected through DriverXtra.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <HeroSearch />
          </Reveal>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={400 + i * 100}>
                <p className="text-2xl font-bold text-white sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Visual: floating listing cards */}
        <Reveal direction="left" delay={250} className="relative hidden lg:block">
          <div className="relative mx-auto h-[460px] max-w-md">
            <div className="absolute inset-x-6 top-0 animate-float rounded-3xl border border-white/10 bg-white p-5 text-ink shadow-2xl">
              <div className="relative grid h-48 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
                <CarIllustration />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold shadow">
                  <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" />
                  Certified
                </span>
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <p className="font-semibold">2024 Volt Crossover EX</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5" /> London, UK
                  </p>
                </div>
                <p className="text-lg font-bold">£32,450</p>
              </div>
              <div className="mt-4 flex gap-4 border-t border-slate-100 pt-4 text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Gauge className="h-4 w-4" /> 8,200 mi
                </span>
                <span className="flex items-center gap-1.5">
                  <Fuel className="h-4 w-4" /> Electric
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-brand text-brand" /> 4.9
                </span>
              </div>
            </div>

            <div className="absolute bottom-6 -left-6 animate-float-slow rounded-2xl border border-white/10 bg-navy-700/90 p-4 shadow-2xl backdrop-blur [animation-delay:1s]">
              <p className="text-xs text-slate-400">Pre-qualified finance</p>
              <p className="mt-1 text-xl font-bold">
                £389<span className="text-sm font-medium text-slate-400">/mo</span>
              </p>
              <div className="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-3/4 rounded-full bg-brand" />
              </div>
            </div>

            <div className="absolute -right-4 bottom-20 animate-float rounded-2xl bg-brand p-4 text-ink shadow-2xl [animation-delay:2s]">
              <ShieldCheck className="h-6 w-6" />
              <p className="mt-2 text-sm font-semibold">Seller verified</p>
              <p className="text-xs">ID & compliance checked</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CarIllustration() {
  return (
    <svg viewBox="0 0 320 140" className="w-4/5" aria-hidden="true">
      <ellipse cx="160" cy="124" rx="130" ry="8" fill="#0f172a" opacity="0.12" />
      <path
        d="M30 96c0-14 8-22 22-25l38-8 34-26c8-6 18-9 28-9h56c12 0 22 5 30 13l26 24 32 6c12 2 20 12 20 24v10c0 5-4 9-9 9H39c-5 0-9-4-9-9V96z"
        fill="#ffc20e"
      />
      <path d="M128 42c6-5 14-7 22-7h28v30h-74l24-23zM190 35h20c9 0 17 4 23 10l20 20h-63V35z" fill="#1e293b" opacity="0.85" />
      <circle cx="90" cy="108" r="20" fill="#0f172a" />
      <circle cx="90" cy="108" r="9" fill="#cbd5e1" />
      <circle cx="240" cy="108" r="20" fill="#0f172a" />
      <circle cx="240" cy="108" r="9" fill="#cbd5e1" />
      <rect x="282" y="84" width="14" height="6" rx="3" fill="#fff" opacity="0.9" />
    </svg>
  );
}

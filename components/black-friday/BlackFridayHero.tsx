import Image from "next/image";
import Link from "next/link";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { IMG } from "./data";

/** Deterministic skyline outline (seeded, so server and client render the same path). */
function skylinePath(width: number, height: number, seed: number) {
  let s = seed;
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  let d = `M0 ${height}`;
  for (let x = 0; x < width; ) {
    const w = 24 + Math.round(rand() * 46);
    const top = Math.round(height * (0.25 + rand() * 0.6));
    d += `V${top}H${Math.min(x + w, width)}`;
    x += w;
  }
  return `${d}V${height}Z`;
}

const SKYLINE_BACK = skylinePath(1440, 420, 7);
const SKYLINE_FRONT = skylinePath(1440, 420, 23);

/** Skyline silhouette drawn in SVG so the hero needs no extra background photo. */
function Skyline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 420"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-[60%] w-full"
    >
      <path d={SKYLINE_BACK} fill="#16304f" opacity="0.55" transform="translate(0 -40)" />
      <path d={SKYLINE_FRONT} fill="#0f1d33" opacity="0.75" transform="translate(0 70)" />
    </svg>
  );
}

export default function BlackFridayHero() {
  return (
    <section
      id="black-friday-hero"
      className="relative overflow-hidden bg-[linear-gradient(115deg,#14253d_0%,#1c3657_55%,#1d5c8f_100%)] pt-16 pb-24 text-white md:pt-20 md:pb-28"
    >
      <Skyline />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,rgb(56_189_248/0.25),transparent_55%)]" />

      <div className={`relative ${container}`}>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7 xl:col-span-6">
            <div className="border-[3px] border-[#fcd116] bg-[#13243c]/40 p-7 backdrop-blur-[2px] sm:p-12">
              <p className="flex items-center gap-2 text-sm font-bold text-[#fcd116]">
                <ChartNoAxesColumnIncreasing className="h-4 w-4" strokeWidth={3} />
                DriverX Mobile Black Friday
              </p>
              <h1 className="bf-display mt-5 text-5xl leading-[0.95] font-extrabold italic sm:text-6xl lg:text-7xl">
                Built for your busiest routes.
              </h1>
              <p className="mt-8 max-w-sm text-lg leading-snug">Black Friday driver-plan savings from DriverX Mobile.</p>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-slate-300">
                Your next shift deserves a stronger connection. Mobile plans shaped around how rideshare drivers,
                couriers and small fleets actually work.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#plans"
                  className="btn-shine inline-flex h-12 items-center rounded-full bg-[#fcd116] px-6 text-[15px] font-bold text-[#13243c] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(252,209,22,0.7)]"
                >
                  Explore driver plans
                </Link>
                <Link
                  href="#offer-conditions"
                  className="inline-flex h-12 items-center rounded-full border border-white/40 px-6 text-[15px] font-bold transition-colors hover:border-white hover:bg-white/10"
                >
                  Read offer conditions
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal direction="zoom" delay={150} className="lg:col-span-5 lg:col-start-8 xl:col-span-5 xl:col-start-8">
            <div className="relative mx-auto aspect-[432/374] w-full max-w-md overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] lg:ml-auto">
              <Image
                src={`${IMG}/hero-delivery-van.webp`}
                alt="White delivery van on a city street with route markers traced along the road"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 432px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Lane markings */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-8 h-1 bg-[linear-gradient(90deg,rgb(252_209_22/0.45)_0_64px,transparent_64px_112px)] bg-[length:112px_4px]"
      />
    </section>
  );
}

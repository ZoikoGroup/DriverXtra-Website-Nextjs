import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Percent } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { IMG, TITLE } from "./data";

export default function ArticleHero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(115deg,#0b1220_0%,#111a2e_55%,#1a2440_100%)] pt-12 pb-20 text-white md:pt-16 md:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgb(255_194_14/0.18),transparent_55%)]" />

      <div className={`relative ${container}`}>
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-300">Blog</span>
        </nav>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="flex flex-wrap items-center gap-3 text-sm font-semibold text-brand">
              <span className="rounded-full bg-white/10 px-3 py-1">Driver connectivity</span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <Clock className="h-4 w-4" /> 9 min read
              </span>
            </p>
            <h1 className="mt-5 font-condensed text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-[3.4rem]">{TITLE}</h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate-300">
              Looking for affordable driver mobile plans? Explore DriverX Mobile&apos;s introductory offer and discover how
              you could save on eligible mobile plan charges while staying connected on the road.
            </p>
          </Reveal>

          <Reveal direction="zoom" delay={150} className="lg:col-span-5">
            <div className="relative mx-auto aspect-[432/374] w-full max-w-md overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] lg:ml-auto">
              <Image
                src={`${IMG}/hero-delivery-van.webp`}
                alt="White delivery van on a city street with route markers traced along the road"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 448px"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl bg-[#0b1220]/85 px-4 py-3 backdrop-blur">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-ink">
                  <Percent className="h-5 w-5" strokeWidth={3} />
                </span>
                <span className="text-sm leading-tight">
                  <strong className="block text-lg text-brand">35% off</strong>
                  eligible plans for 3 months
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

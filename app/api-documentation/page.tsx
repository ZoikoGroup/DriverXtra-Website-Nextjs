import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ClipboardCheck, ShieldCheck, Zap } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import ApiReference from "@/components/api-documentation/ApiReference";
import { destinations, faqs } from "@/components/api-documentation/data";

export const metadata: Metadata = {
  title: "API Documentation — DriverXtra",
  description: "Explore maintained technical reference and guides for supported DriverXtra integrations.",
};

const icons = { zap: Zap, clipboard: ClipboardCheck, calendar: CalendarDays, shield: ShieldCheck };

export default function ApiDocumentationPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <BgImage src="/images/home/hero-bg.jpeg" className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8 lg:py-20">
          <div>
            <Reveal delay={100}>
              <h1 className="text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">API Documentation</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
                Explore maintained technical reference and guides for supported DriverXtra integrations. Published access and availability may depend on your
                organization, market and program.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#reference"
                  className="btn-shine group inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
                >
                  Browse the reference <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href={`${hrefFor("Developer Hub")}#request-access`}
                  className="inline-flex h-11 items-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                >
                  Request technical access
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative animate-float-slow">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl" />
              <div className="relative aspect-[346/173] overflow-hidden rounded-2xl">
                <Image
                  src="/images/api-documentation/hero-api-documentation.webp"
                  alt="Printed reports and a laptop on a desk"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <ApiReference />
        </div>
      </section>

      <section id="specialist-destinations" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Related" title="Specialist destinations" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map(({ label, text, icon, image, alt }, i) => {
              const Icon = icons[icon];
              // Pages that aren't built yet are reached through the Developer Hub directory.
              const own = hrefFor(label) !== "#";
              return (
                <Reveal key={label} delay={i * 100} className="h-full">
                  <Link
                    href={own ? hrefFor(label) : `${hrefFor("Developer Hub")}#integration-routes`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]"
                  >
                    <span className="relative block aspect-[242/105] overflow-hidden">
                      <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                    </span>
                    <span className="relative flex flex-1 flex-col px-4 pt-7 pb-4">
                      <span className="absolute -top-5 left-4 grid h-10 w-10 place-items-center rounded-lg border-2 border-white bg-ink text-brand shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-brand group-hover:text-ink">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{label}</span>
                      <span className="mt-1.5 flex-1 text-[13px] text-slate-600">{text}</span>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-700">
                        {own ? `Open ${label}` : "Via Developer Hub"} <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <FaqSection id="api-documentation-faqs" eyebrow="FAQ" title="API Documentation questions" faqs={faqs} className="bg-white" />
    </>
  );
}

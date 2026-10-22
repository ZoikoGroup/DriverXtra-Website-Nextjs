import type { Metadata } from "next";
import Image from "next/image";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import { Eyebrow } from "@/components/ui/SectionTitle";
import PreQualWizard from "@/components/get-pre-qualified/PreQualWizard";
import { faqs } from "@/components/get-pre-qualified/data";

export const metadata: Metadata = {
  title: "Get Pre-Qualified — DriverXtra",
  description:
    "See whether a participating provider may consider you, before a full application. An early indication, not an offer or approval.",
};

export default function GetPreQualifiedPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <BgImage src="/images/home/hero-bg.jpeg" className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-20">
          <div>
            <Reveal>
              <Eyebrow dark>
                <span className="text-xs">Vehicle Finance</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Get Pre-Qualified</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
                See whether a participating provider may consider you, before a full application. It&apos;s an early
                indication, not an offer or approval.
              </p>
            </Reveal>
          </div>
          {/* The image already has its rounded frame */}
          <Reveal direction="left" delay={200}>
            <div className="group relative animate-float-slow">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl" />
              <Image
                src="/images/get-pre-qualified/hero-get-pre-qualified.webp"
                alt="A woman checking finance options on her laptop"
                width={544}
                height={280}
                priority
                className="relative h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <PreQualWizard />

      <FaqSection id="prequal-faqs" eyebrow="Get Pre-Qualified" title="Pre-qualification questions" faqs={faqs} className="bg-slate-50" />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import InsuranceTabBar from "@/components/compare-insurance/InsuranceTabBar";
import UseSelector from "@/components/personal-vehicle-insurance/UseSelector";
import DetailsAccordion from "@/components/personal-vehicle-insurance/DetailsAccordion";
import RenewalChecklist from "@/components/personal-vehicle-insurance/RenewalChecklist";
import { coverItems, faqs } from "@/components/personal-vehicle-insurance/data";

export const metadata: Metadata = {
  title: "Personal Vehicle Insurance — DriverXtra",
  description: "Learn about private-use motor coverage and know what to review before going to a provider.",
};

export default function PersonalVehicleInsurancePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <BgImage src="/images/home/hero-bg.jpeg" className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-20">
          <div>
            <Reveal>
              <Eyebrow dark>
                <span className="text-xs">Insurance</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Personal Vehicle Insurance</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
                Learn about private-use motor coverage and know what to review before going to a provider.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative animate-float-slow">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl" />
              <Image
                src="/images/personal-vehicle-insurance/hero-personal-vehicle-insurance.png"
                alt="A black saloon car lit from the side in a dark studio"
                width={599}
                height={448}
                priority
                className="relative h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <InsuranceTabBar active="personal" />

      <section id="your-use" className="scroll-mt-40 bg-white pt-16 pb-14">
        <div className={container}>
          <SectionTitle eyebrow="Your use" title="How do you use the vehicle?" />
          <Reveal delay={150}>
            <p className="mt-2 text-sm text-slate-500">Private-use cover is different from business use. Choose what fits best.</p>
          </Reveal>
          <UseSelector />
        </div>
      </section>

      <section id="coverage-overview" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Coverage overview" title="What personal motor cover can include" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {coverItems.map(({ title, text, image, alt }, i) => (
              <Reveal key={title} delay={i * 100} className="h-full">
                <article className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                  <div className="relative aspect-[398/249] overflow-hidden">
                    <Image src={image} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="policy-details" className="scroll-mt-40 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Read the details" title="Deductibles, limits and exclusions" />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-2">
            <Reveal direction="right">
              <div className="group overflow-hidden rounded-2xl">
                <Image
                  src="/images/personal-vehicle-insurance/policy-details.png"
                  alt="Insurance paperwork and a calculator on a desk"
                  width={500}
                  height={375}
                  className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
            <DetailsAccordion />
          </div>
        </div>
      </section>

      <section id="renewal-checklist" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Buying, switching and renewing" title="Your renewal checklist" />
          <Reveal delay={150}>
            <p className="mt-2 text-sm text-slate-500">Tick items off as you go. Nothing is saved or sent.</p>
          </Reveal>
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            <RenewalChecklist />
            <Reveal direction="left" delay={150}>
              <div className="group overflow-hidden rounded-2xl">
                <Image
                  src="/images/personal-vehicle-insurance/renewal-checklist.webp"
                  alt="Two colleagues celebrating with a high five at a desk"
                  width={500}
                  height={375}
                  className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-16 text-center text-white">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
        <div className={`${container} relative`}>
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Read the policy details, <span className="text-brand">then compare.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-300">
              Before continuing to any provider, review what&apos;s covered, the excess and the exclusions.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/compare-insurance"
              className="btn-shine group mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(232,172,0,0.7)]"
            >
              Compare Insurance <ArrowRight className="h-4 w-0 opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100" />
            </Link>
          </Reveal>
        </div>
      </section>

      <FaqSection id="personal-insurance-faqs" eyebrow="Questions" title="Personal vehicle insurance questions" faqs={faqs} className="bg-white" />
    </>
  );
}

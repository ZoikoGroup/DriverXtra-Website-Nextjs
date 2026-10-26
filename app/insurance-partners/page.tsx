import type { Metadata } from "next";
import Image from "next/image";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import InsuranceTabBar from "@/components/compare-insurance/InsuranceTabBar";
import PartnerDirectory from "@/components/insurance-partners/PartnerDirectory";
import { continueSteps, fairness, faqs, roles } from "@/components/insurance-partners/data";

export const metadata: Metadata = {
  title: "Insurance Partners — DriverXtra",
  description: "Understand who the participating third parties are and which roles they may perform.",
};

export default function InsurancePartnersPage() {
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
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Insurance Partners</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
                Understand who the participating third parties are and which roles they may perform.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative animate-float-slow">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl" />
              <Image
                src="/images/insurance-partners/hero-insurance-partners.webp"
                alt="Two people shaking hands in an office"
                width={599}
                height={448}
                priority
                className="relative h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <InsuranceTabBar active="partners" />

      <section id="directory" className="scroll-mt-40 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Directory" title="Verified insurance partners" />
          <PartnerDirectory />
        </div>
      </section>

      <section id="roles" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Roles" title="Who does what" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map(({ title, text, image, alt }, i) => (
              <Reveal key={title} delay={i * 90} className="h-full">
                <article className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                  <div className="relative aspect-[294/184] overflow-hidden">
                    <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
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

      <section id="fairness" className="scroll-mt-40 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Fairness" title="Ordering and sponsorship" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {fairness.map(({ title, text, icon: Icon }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                  <h3 className="flex items-center gap-2 text-[14px] font-bold text-ink">
                    <Icon className="h-4 w-4 text-brand-dark transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12" />
                    {title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="leaving-driverxtra" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={`${container} grid items-center gap-8 lg:grid-cols-[1fr_1.25fr]`}>
          <Reveal direction="right">
            <div className="group overflow-hidden rounded-2xl">
              <Image
                src="/images/insurance-partners/continue-to-partner.png"
                alt="A driver's hand on the steering wheel at dusk"
                width={500}
                height={375}
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>Leaving DriverXtra</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-3 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">What happens if you continue to a partner</h2>
            </Reveal>
            <ol className="mt-4 space-y-3">
              {continueSteps.map((step, i) => (
                <Reveal key={step} as="li" delay={150 + i * 90}>
                  <span className="group flex gap-3 text-[14px] leading-relaxed text-slate-600">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-brand transition-transform duration-500 group-hover:rotate-[360deg]">
                      {i + 1}
                    </span>
                    {step}
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <FaqSection id="insurance-partner-faqs" eyebrow="Questions" title="Insurance partner questions" faqs={faqs} className="bg-white" />
    </>
  );
}

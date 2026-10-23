import type { Metadata } from "next";
import Image from "next/image";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import { Eyebrow, container } from "@/components/ui/SectionTitle";
import PartnerDirectory from "@/components/finance-partners/PartnerDirectory";
import { customerTypes, faqs, howWeWork, productTypes, type Customer } from "@/components/finance-partners/data";

export const metadata: Metadata = {
  title: "Finance Partners — DriverXtra",
  description:
    "Learn about participating third-party finance providers, the products they may offer in your market and what happens before you choose to continue.",
};

type PageProps = { searchParams: Promise<{ product?: string; customer?: string }> };

export default async function FinancePartnersPage({ searchParams }: PageProps) {
  const { product, customer } = await searchParams;
  const initialProduct = productTypes.find((p) => p.toLowerCase() === product?.toLowerCase());
  const initialCustomer = customerTypes.find((c) => c.toLowerCase() === customer?.toLowerCase()) as Customer | undefined;

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <BgImage src="/images/home/hero-bg.jpeg" className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-20">
          <div>
            <Reveal>
              <Eyebrow dark>
                <span className="text-xs">Finance Partners</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Explore participating finance providers.</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
                Learn about participating third-party organizations, the products they may offer in your market and what happens before you choose to
                continue.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative animate-float-slow">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl" />
              <Image
                src="/images/finance-calculator/hero-finance-calculator.webp"
                alt="A couple discussing vehicle-finance options with a provider representative"
                width={544}
                height={281}
                priority
                className="relative h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Remount when the query changes so menu links re-apply their filter. */}
      <PartnerDirectory key={`${product}|${customer}`} initialProduct={initialProduct} initialCustomer={initialCustomer} />

      <section id="how-we-work" className="scroll-mt-28 bg-white pb-20">
        <div className={container}>
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">How we work with providers</h2>
          </Reveal>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {howWeWork.map(({ title, text, icon: Icon }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-slate-200 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                  <h3 className="flex items-center gap-2 text-[15px] font-bold text-ink">
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

      <FaqSection id="partner-faqs" eyebrow="Finance Partners" title="Partner questions" faqs={faqs} />
    </>
  );
}

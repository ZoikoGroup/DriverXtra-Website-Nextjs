import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { sellingMethods, type SellingMethod } from "./data";

const buttonStyles: Record<SellingMethod["style"], string> = {
  primary:
    "btn-shine bg-brand text-ink hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(232,172,0,0.7)]",
  dark: "bg-ink text-white hover:bg-navy-700 hover:shadow-lg",
  outline: "border border-slate-300 bg-white text-ink hover:border-ink hover:shadow-md",
};

export default function SellingMethods() {
  return (
    <section id="selling-methods" className="scroll-mt-28 bg-white py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="Selling methods"
          title="Choose how you'd like to sell."
          description="You can start by checking a value or prepare a listing. Other options depend on your vehicle and market."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sellingMethods.map(({ title, text, icon: Icon, note, provider, cta, href, style, featured }, i) => (
            <Reveal key={title} delay={(i % 3) * 100}>
              <article
                className={`group flex h-full flex-col rounded-2xl border bg-white p-5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_50px_-24px_rgba(15,23,42,0.35)] sm:p-6 ${
                  featured ? "border-2 border-brand" : "border-slate-200 hover:border-brand/60"
                }`}
              >
                <h3 className="flex items-center gap-3 text-[17px] font-bold text-ink">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-brand/40 bg-brand-light text-brand-dark transition-all duration-500 group-hover:rotate-12 group-hover:bg-brand group-hover:text-ink">
                    <Icon className="h-4 w-4" />
                  </span>
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p>

                <div className="mt-4 rounded-xl border border-slate-200 p-4 text-xs transition-colors duration-300 group-hover:border-slate-300 group-hover:bg-slate-50/60">
                  {provider ? (
                    <>
                      <p className="text-slate-500">Provided by</p>
                      <p className="mt-1.5 font-bold text-ink">{provider}</p>
                      <p className="mt-1.5 text-slate-500">(example partner). Their terms apply.</p>
                    </>
                  ) : (
                    <p className="font-semibold text-slate-600">{note}</p>
                  )}
                </div>

                <div className="mt-auto pt-6">
                  <Link
                    href={href}
                    className={`group/btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${buttonStyles[style]}`}
                  >
                    {cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-6 flex items-center gap-2 text-xs text-slate-500">
            <Info className="h-3.5 w-3.5" /> Partner programs and fees shown are examples for design review.
          </p>
        </Reveal>
      </div>
    </section>
  );
}


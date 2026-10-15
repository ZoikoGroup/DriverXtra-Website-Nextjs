import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { readinessChecks } from "./data";

export default function SellerReadiness() {
  return (
    <section id="seller-readiness" className="scroll-mt-28 bg-white py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="Seller readiness"
          title="What you may be asked for"
          description="Requirements depend on your market, your role and the method you choose. Each check is separate."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {readinessChecks.map(({ title, icon: Icon, what, never }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-2 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <h3 className="flex items-center gap-3 text-[15px] font-bold text-ink">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-brand transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="h-4 w-4" />
                  </span>
                  {title}
                </h3>
                <p className="mt-4 text-xs font-semibold text-gold">What it is</p>
                <p className="mt-1.5 border-l-2 border-emerald-500 pl-3 text-[13px] leading-relaxed text-slate-600 transition-all duration-300 group-hover:border-l-4">
                  {what}
                </p>
                <p className="mt-4 text-xs font-semibold text-gold">Never</p>
                <p className="mt-1.5 border-l-2 border-slate-300 pl-3 text-[13px] leading-relaxed text-slate-500">{never}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

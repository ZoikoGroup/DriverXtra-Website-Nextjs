import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { businessPaths } from "./data";

export default function SellingAsBusiness() {
  return (
    <section className="bg-slate-50 py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="For dealers and fleets"
          title="Selling as a business"
          description="Business sellers use a separate verified path. Verifying a business doesn't automatically authorise every user or every vehicle."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {businessPaths.map(({ title, text, icon: Icon }, i) => (
            <Reveal key={title} delay={i * 120} direction={i === 0 ? "right" : "left"}>
              <div className="group relative flex h-full gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-brand transition-transform duration-500 group-hover:scale-y-100" />
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand/40 bg-brand-light text-brand-dark transition-all duration-500 group-hover:scale-110 group-hover:bg-brand group-hover:text-ink">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold text-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

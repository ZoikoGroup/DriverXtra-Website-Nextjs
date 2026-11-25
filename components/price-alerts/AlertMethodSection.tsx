import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { methodCards } from "./data";

export default function AlertMethodSection() {
  return (
    <section id="method" className="scroll-mt-28 bg-slate-50 py-16 md:py-20">
      <div className={container}>
        <SectionTitle eyebrow="Method" title="How alerts are checked" />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {methodCards.map(({ title, text, icon: Icon, image, alt }, i) => (
            <Reveal key={title} delay={i * 100}>
              <article className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <div className="relative aspect-[8/3] overflow-hidden bg-slate-200">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-brand transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon aria-hidden className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-[15px] font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

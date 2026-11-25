import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { methodSteps } from "./data";

export default function MethodSection() {
  return (
    <section id="method" className="scroll-mt-28 bg-slate-50 py-16 md:py-20">
      <div className={container}>
        <SectionTitle
          eyebrow="Method"
          title="How we check price reductions"
          description="A reduction appears only when a comparable earlier public price can be substantiated."
        />

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
          <ol className="space-y-6">
            {methodSteps.map(({ title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 80} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-ink">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-ink">{title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal direction="zoom" delay={150}>
            <div className="relative aspect-[8/5] overflow-hidden rounded-2xl bg-ink shadow-xl">
              <Image
                src="/images/price-reduced/price-history-chart.webp"
                alt="A price history chart on a screen"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

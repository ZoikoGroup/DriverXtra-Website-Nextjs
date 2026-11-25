import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { prepareImage, prepareSteps } from "./data";

export default function PrepareSection() {
  return (
    <section id="prepare" className="scroll-mt-28 bg-slate-50 py-16 md:py-20">
      <div className={container}>
        <SectionTitle eyebrow="Prepare" title="Before you take a photo or scan" />

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <ol>
            {prepareSteps.map(({ title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 80} className="relative flex gap-5 pb-7 last:pb-0">
                {i < prepareSteps.length - 1 && (
                  <span aria-hidden className="absolute top-11 bottom-1 left-5 w-0.5 -translate-x-1/2 bg-slate-200" />
                )}
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-ink">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="text-sm font-bold text-ink">{title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal direction="zoom" delay={150}>
            <div className="relative aspect-[8/5] overflow-hidden rounded-2xl bg-slate-200">
              <Image
                src={prepareImage}
                alt="A document being prepared on a desk"
                fill
                sizes="(min-width: 1024px) 590px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

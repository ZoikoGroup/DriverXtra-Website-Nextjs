import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { FEATURES } from "./data";

export default function PlanFeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 bg-[#13243c] py-20 text-white md:py-24">
      <div className={container}>
        <Reveal>
          <h2 className="bf-display text-3xl font-extrabold sm:text-5xl">What comes with driver plans</h2>
          <p className="mt-3 text-[17px] text-slate-300">
            The essentials drivers rely on, with allowances that grow by plan.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <article className="group">
                <div className="relative aspect-[378/254] overflow-hidden rounded-2xl border-2 border-[#1f3556]">
                  <Image
                    src={f.image}
                    alt={f.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="bf-display mt-5 text-xl font-extrabold">{f.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate-300">{f.body}</p>
                {f.note && <p className="mt-3 text-[14px] font-bold text-[#4fb3a5]">{f.note}</p>}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

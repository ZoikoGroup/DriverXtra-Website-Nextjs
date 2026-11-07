import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "./PressHeading";
import { ANNOUNCEMENTS } from "./data";

export default function NewsroomSection() {
  return (
    <section id="newsroom" className="scroll-mt-28 bg-whitepy-16 md:py-20">
      <div className={`grid gap-8 lg:grid-cols-2 ${container}`}>
        <PressHeading
          eyebrow="Newsroom"
          title="Read published announcements"
          description="Official statements are published in the Newsroom, which is the source of truth. We don't copy release text here."
        />

        <ul className="space-y-3">
          {ANNOUNCEMENTS.map((a, i) => (
            <Reveal key={a.title} as="li" delay={i * 80}>
              <article className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="relative w-[120px] shrink-0">
                  <Image src={a.image} alt={a.alt} fill sizes="120px" className="object-cover" />
                </div>
                <div className="p-3.5">
                  <span className="inline-block rounded border border-dashed border-amber-400 bg-amber-50 px-1.5 py-0.5 text-[11px] font-bold tracking-wide text-amber-800 uppercase">
                    Example
                  </span>
                  <h3 className="mt-1.5 text-[16px] font-bold text-ink">{a.title}</h3>
                  <p className="mt-1 text-[13px] text-slate-500">{a.date} · Newsroom</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

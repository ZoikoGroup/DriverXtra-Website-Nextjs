import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, container } from "@/components/ui/SectionTitle";
import { announcements, formatDate, spotlightId } from "./data";
import TypeBadge from "./TypeBadge";

export default function ReleaseSpotlightSection() {
  const item = announcements.find((a) => a.id === spotlightId) ?? announcements[0];

  return (
    <section id="spotlight" className="scroll-mt-28 bg-[#F6F8FB] py-16 md:py-20">
      <div className={container}>
        <Reveal>
          <Eyebrow dark>Release spotlight</Eyebrow>
        </Reveal>
        <Reveal delay={100} className="mt-6">
          <article className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white md:grid-cols-[11fr_9fr]">
            <div className="relative aspect-[3/2] md:aspect-auto md:min-h-[420px]">
              <Image
                src="/images/newsroom/spotlight-parts-onboarding.webp"
                alt={item.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <TypeBadge>{item.type}</TypeBadge>
              <h2 className="mt-3 text-2xl leading-tight font-bold tracking-tight text-ink sm:text-3xl">{item.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">{item.summary}</p>
              <p className="mt-4 text-sm text-slate-500">
                Published <time dateTime={item.published}>{formatDate(item.published)}</time> · {item.regions.join(", ")}
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "@/components/press-media/PressHeading";

const cards = [
  {
    title: "Data and reuse requests",
    text: "Available information may not be licensed for redistribution. Request permission before downloading or republishing restricted data.",
    image: "/images/methodology-data-standards/data-reuse-requests.webp",
    alt: "Abstract colour study representing data files",
  },
  {
    title: "Report a correction",
    text: "Spotted a figure or definition that looks wrong? Tell us which metric and version.",
    image: "/images/methodology-data-standards/report-a-correction.webp",
    alt: "Reviewers checking figures in an open-plan office",
  },
];

export default function ReuseCorrectionsSection() {
  return (
    <section id="reuse-corrections" className="scroll-mt-28 bg-[#F6F8FB] py-16 md:py-20">
      <div className={container}>
        <PressHeading eyebrow="Reuse & corrections" title="Request data reuse or report an issue" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="relative aspect-[8/3]">
                  <Image src={c.image} alt={c.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{c.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

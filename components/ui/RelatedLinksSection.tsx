import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionTitle, { container } from "./SectionTitle";

export type RelatedLink = { title: string; text: string; image: string; alt: string; href: string };

type RelatedLinksSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  links: RelatedLink[];
  className?: string;
};

/** Three image cards linking to related pages, each with an "Open →" label. */
export default function RelatedLinksSection({
  id = "related",
  eyebrow = "Related",
  title,
  links,
  className = "bg-white",
}: RelatedLinksSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-16 md:py-20 ${className}`}>
      <div className={container}>
        <SectionTitle eyebrow={eyebrow} title={title} />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {links.map(({ title: linkTitle, text, image, alt, href }, i) => (
            <Reveal key={linkTitle} delay={i * 100}>
              <Link
                href={href}
                className="group block h-full rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-500 hover:-translate-y-2 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]"
              >
                <div className="relative aspect-[16/7] overflow-hidden rounded-lg bg-slate-200">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="px-2 pb-2">
                  <span className="relative -mt-5 grid h-9 w-9 place-items-center rounded-lg bg-navy text-brand ring-4 ring-white transition-transform duration-500 group-hover:scale-110">
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 text-[15px] font-bold text-ink">{linkTitle}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 group-hover:text-blue-900">
                    Open
                    <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

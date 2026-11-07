import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleHelp, FileText, Globe, MessageSquare } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "./PressHeading";
import { START_ROUTES } from "./data";

const ICONS = { message: MessageSquare, file: FileText, globe: Globe, help: CircleHelp };

export default function StartHereSection() {
  return (
    <section id="start-here" className="bg-whitepy-16 md:py-20">
      <div className={container}>
        <PressHeading
          eyebrow="Start here"
          title="What do you need?"
          description="Media inquiries, published announcements and general support each have their own route."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {START_ROUTES.map((r, i) => {
            const Icon = ICONS[r.icon];
            return (
              <Reveal key={r.title} delay={i * 80} className="h-full">
                <Link
                  href={r.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)]"
                >
                  <div className="relative aspect-[291/146] overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="flex items-center gap-2 text-[17px] font-bold text-ink">
                      <Icon className="h-5 w-5 text-brand-dark" />
                      {r.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{r.body}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[15px] font-bold text-blue-700">
                      Go <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

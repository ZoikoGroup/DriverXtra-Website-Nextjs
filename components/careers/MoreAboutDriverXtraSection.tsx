import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface MoreCard {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

const moreCards: MoreCard[] = [
  {
    id: "about-driverxtra",
    title: "About DriverXtra",
    description: "Who we are.",
    imageSrc: "/images/Careers/c13.png",
    imageAlt: "Modern glass office building architecture",
    href: "/about-driverxtra",
  },
  {
    id: "how-driverxtra-works",
    title: "How DriverXtra Works",
    description: "What the platform does.",
    imageSrc: "/images/Careers/c14.png",
    imageAlt: "Vehicle cockpit driver with modern dashboard",
    href: "/DriverXtra-Works",
  },
  {
    id: "contact-driverxtra",
    title: "Contact DriverXtra",
    description: "Have a company question? Contact DriverXtra.",
    imageSrc: "/images/Careers/c15.png",
    imageAlt: "Team collaborative presentation in creative workspace",
    href: "/Contact-DriverXtra",
  },
];

export default function MoreAboutDriverXtraSection() {
  return (
    <section className="bg-[#F8F9FC] py-16 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className={container}>
        {/* Header */}
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Company</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
              More about DriverXtra
            </h2>
          </Reveal>
        </div>

        {/* 3-Card Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {moreCards.map((card, index) => (
            <Reveal key={card.id} delay={index * 80}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg hover:border-slate-300">
                {/* Top Image */}
                <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {/* Badge with ArrowRight */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B1220] text-[#ffc20e] shadow-xs">
                    <ArrowRight className="h-4 w-4" />
                  </div>

                  <h3 className="mt-3 font-bold text-slate-900 text-sm sm:text-base">
                    {card.title}
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-slate-600 flex-1">
                    {card.description}
                  </p>

                  <div className="mt-4 sm:mt-5 pt-1">
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <span>Open</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

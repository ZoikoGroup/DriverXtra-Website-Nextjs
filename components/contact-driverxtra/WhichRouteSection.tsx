import Image from "next/image";
import Link from "next/link";
import { CircleHelp, Flag, MessageSquare } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface RouteCard {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: typeof CircleHelp;
  linkText: string;
  href: string;
}

const routeCards: RouteCard[] = [
  {
    id: "help-center",
    title: "Help Center",
    description: "Self-service guidance you can read any time, without signing in.",
    imageSrc: "/images/Contact-DriverXtra/cd2.png",
    imageAlt: "Self service documentation and technical guidance",
    icon: CircleHelp,
    linkText: "Open the Help Center",
    href: "/Help-Center",
  },
  {
    id: "contact-driverxtra",
    title: "Contact DriverXtra",
    description: "A support inquiry about how DriverXtra works for you, where a channel is available.",
    imageSrc: "/images/Contact-DriverXtra/cd3.png",
    imageAlt: "Support consultation across desktop",
    icon: MessageSquare,
    linkText: "Choose a topic",
    href: "#choose-a-topic",
  },
  {
    id: "specialist-pages",
    title: "Specialist pages",
    description: "Fraud, listings, fleet, dealers, partners and developers each have their own route.",
    imageSrc: "/images/Contact-DriverXtra/cd4.png",
    imageAlt: "Specialist support and escalation operations",
    icon: Flag,
    linkText: "Report Fraud",
    href: "/report-a-fraud",
  },
];

export default function WhichRouteSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className={container}>
        {/* Header */}
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Which route?</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
              Contact, Help Center or a specialist page?
            </h2>
          </Reveal>
        </div>

        {/* 3-Card Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {routeCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.id} delay={index * 80}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-lg hover:border-slate-300">
                  {/* Top Image */}
                  <div className="relative aspect-[16/8] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
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
                    {/* Dark icon badge */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B1220] text-[#ffc20e] shadow-xs">
                      <Icon className="h-4 w-4" />
                    </div>

                    <h3 className="mt-3 font-bold text-slate-900 text-sm sm:text-base">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600 flex-1">
                      {card.description}
                    </p>

                    <div className="mt-4 sm:mt-5 pt-1">
                      <Link
                        href={card.href}
                        className="inline-block text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors"
                      >
                        {card.linkText}
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ShieldCheck, Tag } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface SafetyCard {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: typeof ShieldCheck;
  linkText: string;
  href: string;
}

const safetyCards: SafetyCard[] = [
  {
    id: "buying-safely",
    title: "Buying safely",
    description: "Inspect, verify documents and pay carefully.",
    imageSrc: "/images/DriverXtra-Works/w10.png",
    imageAlt: "Vehicle inspection and safety checks",
    icon: ShieldCheck,
    linkText: "Buyer Safety",
    href: "/trust-buyer-safety",
  },
  {
    id: "selling-safely",
    title: "Selling safely",
    description: "Confirm cleared funds before handover.",
    imageSrc: "/images/DriverXtra-Works/w11.png",
    imageAlt: "Securing transaction and funds before release",
    icon: Tag,
    linkText: "Seller Safety",
    href: "/seller-safety",
  },
  {
    id: "something-wrong",
    title: "Something wrong?",
    description: "Report fraud or a listing at any time — no sign-in needed to read guidance.",
    imageSrc: "/images/DriverXtra-Works/w12.png",
    imageAlt: "Reporting concerns or disputes safely",
    icon: AlertTriangle,
    linkText: "Report Fraud",
    href: "/report-a-fraud",
  },
];

export default function StaySafeAtEveryStepSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className={container}>
        {/* Header */}
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Safety</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
              Stay safe at every step
            </h2>
          </Reveal>
        </div>

        {/* 3-Card Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {safetyCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.id} delay={index * 80}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg hover:border-slate-300">
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
                    {/* Icon Badge */}
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

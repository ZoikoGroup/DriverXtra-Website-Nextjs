import Image from "next/image";
import { AlertTriangle, HeartHandshake } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface SafetyGuidanceCard {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: typeof AlertTriangle;
}

const safetyGuidanceCards: SafetyGuidanceCard[] = [
  {
    id: "accessible-application",
    title: "Need help with an accessible application?",
    description:
      "Accommodation requests are handled through the application site's approved process. Don't send medical details through general contact forms.",
    imageSrc: "/images/Careers/c11.png",
    imageAlt: "Candidate success collaboration and accommodation support",
    icon: HeartHandshake,
  },
  {
    id: "recruitment-fraud",
    title: "Recruitment fraud",
    description:
      "Be cautious of unverified recruitment messages or payment requests. Genuine hiring never asks you to pay a fee or buy equipment up front.",
    imageSrc: "/images/Careers/c12.png",
    imageAlt: "Digital device fraud security guidance",
    icon: AlertTriangle,
  },
];

export default function CareersSafetySection() {
  return (
    <section className="bg-[#F8F9FC] py-16 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className={container}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safetyGuidanceCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.id} delay={idx * 100}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-lg hover:border-slate-300">
                  {/* Top Image */}
                  <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B1220] text-[#ffc20e] shadow-xs">
                      <Icon className="h-4 w-4" />
                    </div>

                    <h3 className="mt-3 font-bold text-slate-900 text-sm sm:text-base">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                      {card.description}
                    </p>
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

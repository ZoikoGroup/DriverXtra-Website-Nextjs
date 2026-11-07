import Image from "next/image";
import { Car, Code2, Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface WorkAreaCard {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: typeof Code2;
}

const workAreas: WorkAreaCard[] = [
  {
    id: "trustworthy-products",
    title: "Build trustworthy products",
    description: "Clear information, honest states and accessible experiences.",
    imageSrc: "/images/Careers/c8.png",
    imageAlt: "Clean developer environment with code and tools",
    icon: Code2,
  },
  {
    id: "across-teams",
    title: "Work across teams",
    description: "Product, design, engineering, trust and partnerships together.",
    imageSrc: "/images/Careers/c9.png",
    imageAlt: "Modern open collaboration space with engineers and designers",
    icon: Users,
  },
  {
    id: "serve-drivers-businesses",
    title: "Serve drivers and businesses",
    description: "From private sellers to fleets and parts suppliers.",
    imageSrc: "/images/Careers/c10.png",
    imageAlt: "High performance vehicle marketplace",
    icon: Car,
  },
];

export default function WhatWeWorkOnSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className={container}>
        {/* Header */}
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Working here</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
              What we work on
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-xl">
              DriverXtra builds a marketplace for vehicles, parts and services. Specific benefits and policies are stated only in each verified job posting.
            </p>
          </Reveal>
        </div>

        {/* 3-Card Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {workAreas.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.id} delay={index * 80}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg hover:border-slate-300">
                  {/* Top Image */}
                  <div className="relative aspect-[16/8] sm:aspect-[16/9] w-full overflow-hidden bg-slate-100">
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
                    {/* Icon badge */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B1220] text-[#ffc20e] shadow-xs">
                      <Icon className="h-4 w-4" />
                    </div>

                    <h3 className="mt-3 font-bold text-slate-900 text-sm sm:text-base">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600 flex-1">
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

"use client";

import Image from "next/image";
import {
  ArrowRight,
  CarFront,
  Truck,
  Zap,
  Crown,
  Building2,
  Bike,
  Star,
  Wrench,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const vehicleTypes = [
  {
    title: "Sedans & Coupes",
    image: "/images/home/image5.png",
    icon: CarFront,
    href: "/vehicles?type=sedans-coupes",
  },
  {
    title: "SUVs & Crossovers",
    image: "/images/home/image6.png",
    icon: CarFront,
    href: "/vehicles?type=suvs-crossovers",
  },
  {
    title: "Trucks & Vans",
    image: "/images/home/image7.png",
    icon: Truck,
    href: "/vehicles?type=trucks-vans",
  },
  {
    title: "Electric & Hybrid",
    image: "/images/home/image8.png",
    icon: Zap,
    href: "/vehicles?type=electric-hybrid",
    tall: true,
  },
  {
    title: "Luxury & Performance",
    image: "/images/home/image9.png",
    icon: Crown,
    href: "/vehicles?type=luxury-performance",
  },
  {
    title: "Commercial & Fleet",
    image: "/images/home/image10.png",
    icon: Building2,
    href: "/vehicles?type=commercial-fleet",
  },
  {
    title: "Motorcycles & Powersports",
    image: "/images/home/image11.png",
    icon: Bike,
    href: "/vehicles?type=motorcycles-powersports",
  },
  {
    title: "Classic & Collector",
    image: "/images/home/image12.png",
    icon: Star,
    href: "/vehicles?type=classic-collector",
  },
  {
    title: "Project Vehicles",
    image: "/images/home/image13.png",
    icon: Wrench,
    href: "/vehicles?type=project-vehicles",
    restricted: true,
  },
];

export default function BrowseVehicleTypes() {
  return (
    <section
      id="browse-vehicle-types"
      className="w-full overflow-hidden bg-white"
    >
      {/* Main container */}
      <div className="mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        {/* Section heading */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <Reveal direction="up">
            <div className="max-w-[720px]">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-5 shrink-0 rounded-full bg-[#FFBF00] transition-all duration-300 hover:w-8" />

                <p className="text-sm font-bold leading-7 text-[#C58B00] sm:text-base">
                  Browse by type
                </p>
              </div>

              <h2 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-[#172033] transition-colors duration-300 sm:text-4xl sm:leading-10">
                Browse vehicles your way
              </h2>

              <p className="mt-2 max-w-[620px] text-sm leading-6 text-[#66738C] sm:text-base sm:leading-7">
                Not sure on a make or model yet? Start with the kind of
                vehicle you need.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={120}>
            <a
              href="/vehicles"
              className="group/link inline-flex w-fit shrink-0 items-center gap-1.5 border-b-2 border-[#FFBF00] pb-1 text-sm font-semibold text-[#172033] transition-all duration-300 hover:gap-2.5 hover:border-[#B98200] hover:text-[#B98200] sm:text-base"
            >
              Explore all vehicle types

              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover/link:translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        {/* Vehicle type cards */}
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 xl:gap-4">
          {vehicleTypes.map((vehicle, index) => {
            const Icon = vehicle.icon;

            return (
              <Reveal
                key={vehicle.title}
                direction="up"
                delay={index * 80}
              >
                <a
                  href={vehicle.href}
                  className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#DCE3ED] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.03)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#FFBF00] hover:shadow-[0_12px_28px_rgba(16,24,40,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF00] focus-visible:ring-offset-2"
                >
                  {/* Vehicle image */}
                  <div
                    className={`relative w-full overflow-hidden bg-[#F2F4F7] ${
                      vehicle.tall
                        ? "h-36 sm:h-36 xl:h-[150px]"
                        : "h-28 sm:h-28 xl:h-[120px]"
                    }`}
                  >
                    <Image
                      src={vehicle.image}
                      alt={vehicle.title}
                      fill
                      sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 20vw, 20vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Image overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07101F]/35 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Icon badge */}
                  <div className="relative z-10 mx-auto -mt-3.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-[#DCE3ED] bg-white text-[#D99A00] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#FFBF00] group-hover:bg-[#FFBF00] group-hover:text-[#101828] group-hover:shadow-[0_4px_12px_rgba(255,191,0,0.25)]">
                    <Icon
                      size={15}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:rotate-[-6deg]"
                    />
                  </div>

                  {/* Vehicle label */}
                  <div className="flex flex-1 flex-col items-center px-2 pb-3 pt-2 text-center">
                    <h3 className="text-xs font-bold leading-4 text-[#172033] transition-colors duration-300 group-hover:text-[#B98200] sm:text-[13px]">
                      {vehicle.title}
                    </h3>

                    {vehicle.restricted && (
                      <p className="mt-1.5 text-[10px] leading-4 text-[#66738C] sm:text-[11px]">
                        Restricted — policy applies
                      </p>
                    )}
                  </div>

                  {/* Animated bottom indicator */}
                  <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#FFBF00] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
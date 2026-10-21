"use client";

import {
  CarFront,
  Tag,
  Cog,
  Wrench,
  ArrowRight,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const routes = [
  {
    title: "Buy Vehicles",
    description:
      "Browse verified inventory, compare vehicles and set price alerts.",
    link: "Browse Vehicles",
    href: "/buy-vehicles",
    icon: CarFront,
  },
  {
    title: "Sell Vehicles",
    description:
      "Value, list, receive offers or explore trade-in options.",
    link: "Get Your Value",
    href: "/value-my-vehicle",
    icon: Tag,
  },
  {
    title: "Parts & Accessories",
    description:
      "Shop by vehicle with fitment confidence, warranties and trusted sellers.",
    link: "Find Parts",
    href: "/parts",
    icon: Cog,
  },
  {
    title: "Finance & Services",
    description:
      "Compare finance and insurance, then book verified automotive services.",
    link: "Explore Finance & Services",
    href: "/services",
    icon: Wrench,
  },
];

export default function Start() {
  return (
    <section
      id="start-here"
      className="w-full overflow-hidden bg-white px-5 py-14 text-[#172033] sm:px-8 sm:py-16 lg:px-10 lg:py-20"
    >
      {/* Main container */}
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Section heading */}
        <Reveal direction="up">
          <div className="mb-7 max-w-[720px] sm:mb-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-0.5 w-5 shrink-0 rounded-full bg-[#FFB900] transition-all duration-300 hover:w-8" />

              <p className="text-sm font-bold leading-7 text-[#E9A300] sm:text-base">
                Start here
              </p>
            </div>

            <h2 className="text-2xl font-extrabold leading-tight tracking-tight transition-colors duration-300 sm:text-3xl lg:text-4xl lg:leading-10">
              Start with what you need
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#66738C] sm:text-base sm:leading-7">
              Four routes into the marketplace. Pick one — you can switch at any
              time.
            </p>
          </div>
        </Reveal>

        {/* Route cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {routes.map((route, index) => {
            const Icon = route.icon;

            return (
              <Reveal
                key={route.title}
                direction="up"
                delay={index * 120}
              >
                <a
                  href={route.href}
                  className="group relative flex h-full min-w-0 flex-col items-start overflow-hidden rounded-2xl border border-[#DCE3ED] bg-white px-5 pb-5 pt-6 shadow-[0_1px_3px_rgba(23,32,51,0.03)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#FFB900] hover:shadow-[0_14px_32px_rgba(23,32,51,0.11)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB900] focus-visible:ring-offset-2 sm:px-5"
                >
                  {/* Subtle hover background */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFF8E5]/0 via-transparent to-[#FFB900]/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Card content */}
                  <div className="relative z-10 flex h-full w-full flex-col items-start">
                    {/* Icon */}
                    <div className="mb-2 flex size-12 shrink-0 items-center justify-center rounded-full border border-[#FFB900] bg-[#FFF8E5] text-[#E9A300] transition-all duration-300 group-hover:scale-110 group-hover:border-[#FFB900] group-hover:bg-[#FFB900] group-hover:text-[#172033] group-hover:shadow-[0_0_0_5px_rgba(255,185,0,0.12)]">
                      <Icon
                        size={22}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:rotate-[-6deg]"
                      />
                    </div>

                    {/* Card title */}
                    <h3 className="mt-1 text-base font-bold leading-6 tracking-tight text-[#172033] transition-colors duration-300 group-hover:text-[#B98200] sm:text-lg">
                      {route.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-1.5 text-sm leading-6 text-[#66738C] transition-colors duration-300 group-hover:text-[#4B5870]">
                      {route.description}
                    </p>

                    {/* Link with animated underline */}
                    <span className="mt-auto flex w-full items-center gap-1.5 pt-5 text-sm font-semibold leading-6 text-[#172033]">
                      <span className="relative inline-block">
                        {route.link}

                        <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-[#FFB900] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                      </span>

                      <ArrowRight
                        size={16}
                        strokeWidth={1.8}
                        className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  {/* Bottom hover indicator */}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#FFB900] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
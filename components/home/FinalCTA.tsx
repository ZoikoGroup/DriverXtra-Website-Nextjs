"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const ctaButtons = [
  {
    label: "Create Free Account",
    href: "/sign-up",
    primary: true,
  },
  {
    label: "List Your Vehicle",
    href: "/sell-vehicle",
    primary: false,
  },
  {
    label: "Find Parts",
    href: "/parts",
    primary: false,
  },
  {
    label: "Get Pre-Qualified",
    href: "/compare-vehicle-finance",
    primary: false,
  },
];

export default function FinalCTA() {
  return (
    <section className="group/cta relative w-full overflow-hidden bg-[#0B1220] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-20">
      {/* Background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/images/home/bg4.png')] bg-cover bg-center bg-no-repeat"
      />

      {/* Background overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#0B1220]/50 transition-colors duration-500 group-hover/cta:bg-[#0B1220]/40"
      />

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[#FFB900]/[0.06] blur-3xl transition-all duration-700 group-hover/cta:bg-[#FFB900]/[0.10]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 size-72 rounded-full bg-[#24344D]/30 blur-3xl"
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center gap-4">
        {/* Heading */}
        <Reveal direction="up">
          <h2 className="text-center text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl sm:leading-[1.2] lg:text-5xl lg:leading-[60.48px]">
            Ready to Buy, Sell,{" "}
            <span className="inline-block text-[#FFB900] transition-transform duration-300 hover:scale-[1.03]">
              or Upgrade?
            </span>
          </h2>
        </Reveal>

        {/* Description */}
        <Reveal direction="up" delay={100}>
          <p className="w-full max-w-[620px] text-center text-sm font-normal leading-6 text-[#C4CDDC] transition-colors duration-300 group-hover/cta:text-white sm:text-base sm:leading-7 lg:text-lg">
            Join buyers, sellers and verified partners on a governed global
            automotive marketplace — vehicles, parts, accessories and services.
          </p>
        </Reveal>

        {/* CTA buttons */}
        <div className="mt-1 flex w-full flex-wrap items-center justify-center gap-3 pt-2 sm:pt-3.5">
          {ctaButtons.map((button, index) => (
            <Reveal
              key={button.label}
              direction="up"
              delay={150 + index * 90}
            >
              <Link
                href={button.href}
                className={`group/button inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-semibold leading-6 transition-all duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB900] active:translate-y-0 sm:text-base ${
                  button.primary
                    ? "border border-[#FFB900] bg-[#FFB900] text-[#0B1220] hover:border-[#FFD04D] hover:bg-[#FFD04D] hover:shadow-[0_8px_24px_rgba(255,185,0,0.22)]"
                    : "border border-white/35 bg-transparent text-white hover:border-[#FFB900] hover:bg-white/[0.07] hover:text-[#FFB900]"
                }`}
              >
                {button.label}

                <ArrowRight
                  size={16}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover/button:translate-x-1"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
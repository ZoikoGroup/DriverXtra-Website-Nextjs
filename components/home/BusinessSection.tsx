"use client";

import Image from "next/image";
import {
  Check,
  CarFront,
  Truck,
  Wrench,
  ArrowRight,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const businessTypes = [
  {
    title: "Dealers & Retailers",
    description:
      "List inventory, integrate feeds, manage leads and build trust with verified dealer status.",
    benefits: [
      "Inventory feed and DMS integration",
      "Lead inbox and consignment eligibility",
    ],
    button: "Dealer Solutions",
    Icon: CarFront,
    image: "/images/home/1.png",
    imageHeight: "h-40 sm:h-48 lg:h-36",
  },
  {
    title: "Fleets",
    description:
      "Acquire, operate and dispose of vehicles with lifecycle and procurement tools.",
    benefits: [
      "Bulk parts procurement with fitment",
      "Remarketing and disposal channels",
    ],
    button: "Fleet Solutions",
    Icon: Truck,
    image: "/images/home/2.png",
    imageHeight: "h-40 sm:h-48 lg:h-36",
  },
  {
    title: "Service Providers & Parts Sellers",
    description:
      "Sell parts, manage bookings, payments and verified reputation.",
    benefits: [
      "Bookings, quotes and payouts",
      "Reviews from verified transactions only",
    ],
    button: "Become a Partner",
    Icon: Wrench,
    image: "/images/home/3.png",
    imageHeight: "h-40 sm:h-48 lg:h-36",
  },
];

export default function BusinessSection() {
  return (
    <section className="w-full overflow-hidden bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Section heading */}
        <Reveal direction="up">
          <div className="max-w-[720px]">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-5 rounded-full bg-[#FFB900] transition-all duration-300 hover:w-9" />

              <span className="text-sm font-bold leading-6 text-[#D99400] sm:text-base">
                For business
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#172033] sm:text-3xl lg:text-4xl lg:leading-10">
              Built for dealers, fleets and partners
            </h2>

            <p className="mt-2 max-w-[620px] text-sm leading-6 text-[#77849B] sm:text-base sm:leading-7">
              Onboarding starts with your role and a clear checklist of what we
              need to verify.
            </p>
          </div>
        </Reveal>

        {/* Business cards */}
        <div className="mt-6 grid grid-cols-1 items-stretch gap-5 pt-2 md:grid-cols-2 lg:grid-cols-3">
          {businessTypes.map(
            (
              { title, description, benefits, button, Icon, image, imageHeight },
              index
            ) => (
              <Reveal
                key={title}
                direction="up"
                delay={index * 120}
              >
                <article className="group/card relative flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] bg-[#0B1220] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(11,18,32,0.18)]">
                  {/* Animated top accent */}
                  <span className="absolute left-0 top-0 z-10 h-1 w-0 rounded-r-full bg-[#FFB900] transition-all duration-500 group-hover/card:w-full" />

                  {/* Card image */}
                  <div
                    className={`relative w-full shrink-0 overflow-hidden bg-gradient-to-br from-[#17233A] via-[#101A2C] to-[#080D18] ${imageHeight}`}
                  >
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                    />

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/10 to-transparent transition-opacity duration-300 group-hover/card:from-[#0B1220]/90" />

                    {/* Image icon */}
                    <div className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-xl border border-white/20 bg-[#0B1220]/60 text-[#FFB900] backdrop-blur-sm transition-all duration-300 group-hover/card:scale-110 group-hover/card:border-[#FFB900] group-hover/card:bg-[#FFB900] group-hover/card:text-[#0B1220]">
                      <Icon
                        size={20}
                        strokeWidth={1.8}
                        className="transition-transform duration-300 group-hover/card:rotate-[-8deg]"
                      />
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-1 flex-col items-start px-5 pb-8 pt-1 sm:px-6 sm:pb-9">
                    <h3 className="text-base font-bold leading-6 text-white transition-colors duration-300 group-hover/card:text-[#FFB900] sm:text-lg">
                      {title}
                    </h3>

                    <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#B9C4D5] transition-colors duration-300 group-hover/card:text-[#D5DCE7]">
                      {description}
                    </p>

                    {/* Benefits */}
                    <ul className="mt-4 flex flex-col gap-1.5">
                      {benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="group/benefit flex items-start gap-2 text-xs leading-5 text-[#D5DCE7] sm:text-sm"
                        >
                          <span className="mt-0.5 flex size-[15px] shrink-0 items-center justify-center rounded-full bg-[#FFB900]/10 transition-all duration-300 group-hover/card:bg-[#FFB900]">
                            <Check
                              aria-hidden="true"
                              size={11}
                              strokeWidth={2.5}
                              className="text-[#FFB900] transition-colors duration-300 group-hover/card:text-[#0B1220]"
                            />
                          </span>

                          <span className="transition-transform duration-300 group-hover/card:translate-x-0.5">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-auto w-full pt-5">
                      <a
                        href="#"
                        className="group/button flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#FFB900] px-4 py-2.5 text-center text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFD04D] hover:shadow-[0_8px_20px_rgba(255,185,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB900] active:translate-y-0"
                      >
                        {button}

                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover/button:translate-x-1"
                        />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}
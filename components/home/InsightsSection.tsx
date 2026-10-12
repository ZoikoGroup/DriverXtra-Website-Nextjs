"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const articles = [
  {
    category: "EV & Charging",
    title:
      "Home vs public charging: what a year of EV ownership really costs",
    date: "24 Sep 2026",
    readTime: "7 min read",
    image: "/images/home/image15.png",
    href: "/insights/home-vs-public-charging",
    categoryStyle: "bg-[#E8F0FF] text-[#2862C7]",
  },
  {
    category: "Buying Guide",
    title:
      "Buying used: the history checks that matter before you pay a deposit",
    date: "17 Sep 2026",
    readTime: "6 min read",
    image: "/images/home/image16.png",
    href: "/insights/used-car-history-checks",
    categoryStyle: "bg-[#F5F7FA] text-[#65738B] border border-[#DCE3ED]",
  },
  {
    category: "Ownership Costs",
    title: "Servicing, tyres and brakes: budgeting the first five years",
    date: "3 Sep 2026",
    readTime: "5 min read",
    image: "/images/home/image17.png",
    href: "/insights/vehicle-ownership-costs",
    categoryStyle: "bg-[#F5F7FA] text-[#65738B] border border-[#DCE3ED]",
  },
];

export default function InsightsSection() {
  return (
    <section className="w-full overflow-hidden bg-white px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Heading */}
        <Reveal direction="up">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[720px]">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-5 rounded-full bg-[#FFB900] transition-all duration-300 hover:w-9" />

                <span className="text-sm font-bold leading-6 text-[#D99400]">
                  Insights
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#172033] sm:text-3xl lg:text-4xl lg:leading-10">
                Make better automotive decisions
              </h2>

              <p className="mt-2 max-w-[620px] text-sm leading-6 text-[#77849B] sm:text-base sm:leading-6">
                Independent market data, explainers and guides — clearly
                separated from listings and advertising.
              </p>
            </div>

            <Link
              href="/insights"
              className="group/explore inline-flex w-fit shrink-0 items-center gap-1.5 border-b-2 border-[#FFB900] pb-1 text-sm font-semibold leading-6 text-[#172033] transition-colors duration-300 hover:text-[#D99400]"
            >
              Explore Insights

              <ArrowRight
                size={16}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover/explore:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        {/* Article cards and market data */}
        <div className="mt-7 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article, index) => (
            <Reveal
              key={article.category}
              direction="up"
              delay={index * 100}
            >
              <article className="group/card relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#DCE3ED] bg-white transition-all duration-300 hover:-translate-y-2 hover:border-[#C6D0DF] hover:shadow-[0_16px_35px_rgba(11,18,32,0.10)]">
                {/* Animated accent */}
                <span className="absolute left-0 top-0 z-10 h-1 w-0 bg-[#FFB900] transition-all duration-500 group-hover/card:w-full" />

                <Link
                  href={article.href}
                  aria-label={`Read ${article.title}`}
                  className="flex h-full flex-col"
                >
                  {/* Article image */}
                  <div className="relative h-44 overflow-hidden bg-[#F1F4F8] sm:h-36 lg:h-[155px]">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/30 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover/card:opacity-100" />

                    <span className="absolute bottom-3 right-3 flex size-8 translate-y-2 items-center justify-center rounded-full bg-[#FFB900] text-[#0B1220] opacity-0 shadow-md transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>

                  {/* Article content */}
                  <div className="flex flex-1 flex-col p-3.5">
                    <span
                      className={`w-fit max-w-full rounded-full px-2 py-0.5 text-[11px] font-semibold leading-4 transition-transform duration-300 group-hover/card:-translate-y-0.5 ${article.categoryStyle}`}
                    >
                      {article.category}
                    </span>

                    <h3 className="mt-2 text-sm font-bold leading-[19px] text-[#172033] transition-colors duration-300 group-hover/card:text-[#B47B00]">
                      {article.title}
                    </h3>

                    <p className="mt-auto pt-4 text-[11px] leading-[17px] text-[#77849B]">
                      {article.date} · {article.readTime} · DriverXtra
                      <br />
                      Editorial
                    </p>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}

          {/* Market data card */}
          <Reveal direction="up" delay={300}>
            <article className="group/market relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl bg-[#0B1220] p-4 text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(11,18,32,0.22)]">
              {/* Decorative hover glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-[#FFB900]/10 blur-3xl transition-all duration-500 group-hover/market:bg-[#FFB900]/20" />

              <div className="relative">
                <span className="inline-flex rounded-full bg-[#FFF4D5] px-2 py-0.5 text-[11px] font-semibold leading-4 text-[#805900] transition-colors duration-300 group-hover/market:bg-[#FFB900]">
                  Market data
                </span>
              </div>

              <h3 className="relative mt-2 text-sm font-bold leading-5">
                Used EV price index
              </h3>

              <p className="relative mt-2 text-[28px] font-extrabold leading-9 text-[#FFB900] transition-transform duration-300 group-hover/market:translate-x-1">
                −3.1%
              </p>

              <p className="relative mt-2 text-[11px] leading-[17px] text-[#AAB5C8]">
                Change over the last 6 months, example region. Methodology and
                date range published with each index.
              </p>

              {/* Trend chart */}
              <div className="relative mt-4 flex flex-1 flex-col justify-end">
                <div className="relative h-[70px] overflow-hidden border-t border-[#253044]">
                  <svg
                    viewBox="0 0 260 70"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full overflow-visible"
                    fill="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="ev-chart-gradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#FFB900"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FFB900"
                          stopOpacity="0.01"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      d="M0 9 L48 13 L98 24 L151 21 L204 37 L260 45 L260 70 L0 70 Z"
                      fill="url(#ev-chart-gradient)"
                      className="transition-opacity duration-300 group-hover/market:opacity-100"
                    />

                    <path
                      d="M0 9 L48 13 L98 24 L151 21 L204 37 L260 45"
                      stroke="#FFB900"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeDasharray="400"
                      strokeDashoffset="0"
                      className="transition-all duration-700 group-hover/market:stroke-[3.5]"
                    />
                  </svg>

                  <div className="absolute inset-x-0 bottom-0 flex justify-between text-[9px] leading-3 text-[#8793A8]">
                    <span>Apr</span>
                    <span>Sep</span>
                  </div>
                </div>
              </div>

              <Link
                href="/insights/regional-reports"
                className="group/report relative mt-3 inline-flex w-fit items-center gap-1.5 border-b-2 border-[#FFB900] pb-1 text-sm font-semibold leading-5 text-white transition-colors duration-300 hover:text-[#FFB900]"
              >
                See regional reports

                <ArrowRight
                  size={15}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover/report:translate-x-1"
                />
              </Link>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
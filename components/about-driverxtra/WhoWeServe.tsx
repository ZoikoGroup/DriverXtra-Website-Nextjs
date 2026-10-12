"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, CreditCard, Crosshair, Store, Truck, User, Wrench } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import SectionTitle, { container } from "./SectionTitle";

// Shown for any tab whose own photo hasn't been added yet.
const FALLBACK_IMAGE = "/images/about/audience-individuals.webp";

const audiences = [
  {
    tab: "Individuals",
    icon: User,
    title: "For individuals",
    image: "/images/about/audience-individuals.webp",
    points: [
      "Find and compare vehicles",
      "Sell or value a vehicle",
      "Buy compatible parts and accessories",
      "Book trusted automotive services",
      "Compare third-party finance and insurance options",
      "Save, message, compare and manage activity",
    ],
    primary: "Explore the Marketplace",
    secondary: "Value my vehicle",
  },
  {
    tab: "Dealers & retailers",
    icon: Store,
    title: "For dealers & retailers",
    image: "/images/about/audience-dealers.jpg",
    points: [
      "Branded storefront and inventory listings",
      "Inventory feeds and CRM / lead integrations",
      "Dealer verification and trust badges",
      "Finance and insurance options alongside listings",
      "Lead, pricing and performance analytics",
      "Trade-in and appraisal workflows",
    ],
    primary: "Explore Dealer Solutions",
    secondary: "Open a storefront",
  },
  {
    tab: "Fleets",
    icon: Truck,
    title: "For fleets",
    image: "/images/about/audience-fleets.jpg",
    points: [
      "Bulk acquisition and disposition",
      "Maintenance and service networks",
      "Parts procurement at scale",
      "Commercial finance and insurance options",
      "Lifecycle cost analytics",
      "Enterprise workspaces and roles",
    ],
    primary: "Explore Fleet Solutions",
    secondary: "Contact enterprise",
  },
  {
    tab: "Parts sellers & suppliers",
    icon: Crosshair,
    title: "For parts sellers & suppliers",
    image: "/images/about/audience-parts-sellers.jpg",
    points: [
      "Fitment-matched listings by VIN, make, model, year and trim",
      "Seller verification and authenticity controls",
      "Inventory and catalog feeds",
      "Orders, returns and warranty workflows",
      "Access to bulk and B2B buyers",
      "Sales and performance analytics",
    ],
    primary: "Become a Parts Seller",
    secondary: "Catalog integrations",
  },
  {
    tab: "Service providers",
    icon: Wrench,
    title: "For service providers",
    image: "/images/about/audience-service-providers.jpg",
    points: [
      "Reach verified vehicle owners",
      "Booking and scheduling tools",
      "Licensing and insurance verification",
      "Verified-transaction reviews",
      "Transparent pricing display",
      "Business dashboard",
    ],
    primary: "Become a Provider",
    secondary: "Provider requirements",
  },
  {
    tab: "Finance & insurance partners",
    icon: CreditCard,
    title: "For finance & insurance partners",
    image: "/images/about/audience-finance-partners.jpg",
    points: [
      "Reach in-market buyers at the point of decision",
      "Pre-qualification and comparison flows where permitted",
      "Clear provider attribution and disclosures",
      "Regulated partner standards",
      "Referral and lead integrations",
      "Market-specific eligibility controls",
    ],
    primary: "Partner With Us",
    secondary: "Partner standards",
  },
];

export default function WhoWeServe() {
  const [active, setActive] = useState(0);
  const a = audiences[active];

  return (
    <section className="bg-slate-50 py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="Built for individuals and organizations"
          title="One marketplace, built for every participant"
          description="Choose who you are to see what DriverXtra does for you."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[260px_1fr]">
          <Reveal direction="right">
            <div role="tablist" aria-label="Participants" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {audiences.map(({ tab, icon: Icon }, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={`group flex shrink-0 items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-[13px] font-semibold transition-all duration-300 ${
                      isActive
                        ? "border-navy bg-navy text-white shadow-lg"
                        : "border-slate-200 bg-white text-ink hover:translate-x-1 hover:border-brand"
                    }`}
                  >
                    <span
                      className={`grid h-7 w-7 place-items-center rounded-full transition-colors duration-300 ${
                        isActive ? "bg-brand text-ink" : "bg-slate-100 text-slate-600 group-hover:bg-brand-light"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {tab}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal direction="left" delay={100}>
            <div
              key={a.tab}
              role="tabpanel"
              className="grid animate-fade-up overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-[1.1fr_1fr]"
            >
              <div className="group relative min-h-[240px] overflow-hidden">
                <BgImage
                  src={a.image}
                  fallback={`url(${FALLBACK_IMAGE})`}
                  className="transition-transform duration-[1.2s] group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="text-xl font-bold text-ink">{a.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {a.points.map((p, i) => (
                    <li
                      key={p}
                      className="flex animate-fade-up gap-2 text-sm text-slate-700"
                      style={{ animationDelay: `${80 + i * 50}ms` }}
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col items-start gap-3">
                  <Link
                    href="#"
                    className="btn-shine rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg"
                  >
                    {a.primary}
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white"
                  >
                    {a.secondary}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

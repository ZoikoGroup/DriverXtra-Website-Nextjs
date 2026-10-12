"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ClipboardCheck,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Wrench,
  Warehouse,
  CircleAlert,
  CircleCheck,
  Disc3,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

type Service = {
  label: string;
  icon: LucideIcon;
};

type Provider = {
  name: string;
  category: string;
  city: string;
  icon: LucideIcon;
  verification: string;
  credentials: string;
  price: string;
  next: string;
  rating: string;
  bookings: number;
};

const services: Service[] = [
  { label: "Inspection & Appraisal", icon: ClipboardCheck },
  { label: "Maintenance & Repair", icon: Wrench },
  { label: "Detailing", icon: Sparkles },
  { label: "Transport & Shipping", icon: Truck },
  { label: "Storage", icon: Warehouse },
  { label: "Warranties & Protection", icon: ShieldCheck },
  { label: "Roadside", icon: CircleAlert },
  { label: "Tires & Installation", icon: Disc3 },
];

const providers: Provider[] = [
  {
    name: "Northgate Vehicle Inspections",
    category: "Inspection & Appraisal",
    city: "Manchester",
    icon: ClipboardCheck,
    verification: "L4 Business Verified",
    credentials: "Independent inspector, insured",
    price: "$129 – $189",
    next: "Tomorrow, 9:00",
    rating: "4.8",
    bookings: 212,
  },
  {
    name: "Halcyon Motor Works",
    category: "Maintenance & Repair",
    city: "London",
    icon: Wrench,
    verification: "L5 Certified Partner",
    credentials: "Approved repairer, ATA-certified technicians",
    price: "$95 – $420",
    next: "Thu, 14:30",
    rating: "4.9",
    bookings: 486,
  },
  {
    name: "Kingsway Auto Care",
    category: "Maintenance & Repair",
    city: "Birmingham",
    icon: Wrench,
    verification: "L4 Business Verified",
    credentials: "EV-trained technicians, insured",
    price: "$79 – $360",
    next: "Fri, 10:00",
    rating: "4.7",
    bookings: 158,
  },
  {
    name: "Clearcoat Detailing Studio",
    category: "Detailing",
    city: "Leeds",
    icon: Sparkles,
    verification: "L4 Business Verified",
    credentials: "Business verified, insured",
    price: "$65 – $340",
    next: "Sat, 11:00",
    rating: "4.9",
    bookings: 97,
  },
  {
    name: "Meridian Vehicle Transport",
    category: "Transport & Shipping",
    city: "Nationwide",
    icon: Truck,
    verification: "L5 Certified Partner",
    credentials: "Goods-in-transit insurance verified",
    price: "$180 – $950",
    next: "Quote within 1 working day",
    rating: "4.8",
    bookings: 301,
  },
  {
    name: "Harbourside Secure Storage",
    category: "Storage",
    city: "Bristol",
    icon: Warehouse,
    verification: "L4 Business Verified",
    credentials: "Monitored site, insured",
    price: "$90 – $160",
    next: "Spaces available",
    rating: "4.6",
    bookings: 64,
  },
];

export default function ServicesMarketplace() {
  const [selectedService, setSelectedService] = useState("");
  const [postcode, setPostcode] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [notice, setNotice] = useState("");
  const [activeProvider, setActiveProvider] = useState<Provider | null>(null);
  const [quoteRequested, setQuoteRequested] = useState(false);

  const filteredProviders = providers.filter((provider) => {
    const matchesService =
      !selectedService || provider.category === selectedService;

    const query = searchLocation.trim().toLowerCase();

    const matchesLocation =
      !query ||
      provider.city.toLowerCase().includes(query) ||
      provider.name.toLowerCase().includes(query) ||
      provider.category.toLowerCase().includes(query);

    return matchesService && matchesLocation;
  });

  function searchServices() {
    if (!postcode.trim()) {
      setNotice("Please enter a town or postcode.");
      return;
    }

    setSearchLocation(postcode);
    setNotice(
      "Showing matching demo providers. Live postcode-based availability is not connected."
    );
  }

  function openProvider(provider: Provider, isQuote: boolean) {
    setActiveProvider(provider);
    setQuoteRequested(isQuote);
  }

  return (
    <section
      id="services-marketplace"
      className="w-full overflow-hidden bg-[#F4F7FB] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      {/* Keep the same width as the other sections */}
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Hero */}
        <Reveal direction="up">
          <div className="group grid min-h-[380px] overflow-hidden rounded-2xl bg-[#FFB900] shadow-sm transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(11,18,32,0.12)] md:grid-cols-[0.95fr_1.05fr] lg:min-h-[410px]">
            {/* Hero image */}
            <div className="relative min-h-[240px] overflow-hidden md:min-h-full">
              <Image
                src="/images/home/image14.png"
                alt="Automotive engine and vehicle mechanical components"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/30 to-transparent transition-opacity duration-500 group-hover:from-[#0B1220]/40 md:bg-none" />
            </div>

            {/* Yellow content panel */}
            <div className="flex min-w-0 flex-col justify-center px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-8">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-0.5 w-5 rounded-full bg-[#0B1220] transition-all duration-300 group-hover:w-9" />

                <span className="text-xs font-bold text-[#0B1220]">
                  Services marketplace
                </span>
              </div>

              <h1 className="max-w-[520px] text-2xl font-extrabold leading-tight tracking-tight text-[#0B1220] transition-transform duration-300 group-hover:translate-x-0.5 sm:text-3xl lg:text-[34px]">
                Keep your vehicle moving
              </h1>

              <p className="mt-2 max-w-[450px] text-sm leading-5 text-[#0B1220]">
                Find verified automotive providers for inspection,
                maintenance, repair, transport and more.
              </p>

              {/* Service categories */}
              <div className="mt-5 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  const active = selectedService === service.label;

                  return (
                    <button
                      key={service.label}
                      type="button"
                      onClick={() => {
                        setSelectedService(active ? "" : service.label);
                        setNotice("");
                      }}
                      aria-pressed={active}
                      style={{ transitionDelay: `${index * 20}ms` }}
                      className={`group/service flex min-h-10 min-w-0 items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:text-[13px] ${
                        active
                          ? "bg-[#0B1220] text-white shadow-md"
                          : "bg-white/35 text-[#0B1220] hover:bg-white/90"
                      }`}
                    >
                      <span
                        className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover/service:rotate-[-8deg] group-hover/service:scale-110 ${
                          active
                            ? "bg-[#FFB900] text-[#0B1220]"
                            : "bg-[#0B1220] text-[#FFB900] group-hover/service:bg-[#FFB900] group-hover/service:text-[#0B1220]"
                        }`}
                      >
                        <Icon size={15} strokeWidth={1.9} />
                      </span>

                      <span className="min-w-0">{service.label}</span>

                      <ArrowRight
                        size={13}
                        className="ml-auto shrink-0 opacity-0 transition-all duration-300 group-hover/service:translate-x-0.5 group-hover/service:opacity-100"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Location search */}
              <form
                className="mt-4 flex flex-col gap-2 min-[460px]:flex-row"
                onSubmit={(event) => {
                  event.preventDefault();
                  searchServices();
                }}
              >
                <label className="relative min-w-0 flex-1">
                  <span className="sr-only">Town or postcode</span>

                  <MapPin
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A96A9] transition-colors duration-200"
                  />

                  <input
                    type="text"
                    value={postcode}
                    onChange={(event) => setPostcode(event.target.value)}
                    placeholder="Town or postcode"
                    className="h-11 w-full rounded-lg border border-[#E1E6EE] bg-white py-2 pl-9 pr-3 text-sm text-[#0B1220] outline-none transition-all duration-300 placeholder:text-[#9AA5B5] hover:border-[#AAB5C5] focus:border-[#0B1220] focus:ring-2 focus:ring-[#0B1220]/10"
                  />
                </label>

                <button
                  type="submit"
                  className="group/search inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#0B1220] px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#273247] hover:shadow-lg active:translate-y-0 sm:text-sm"
                >
                  <Search
                    size={15}
                    className="transition-transform duration-300 group-hover/search:scale-110"
                  />
                  Find Services Near Me
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover/search:translate-x-1"
                  />
                </button>
              </form>

              {notice && (
                <p
                  role="status"
                  className="mt-2 text-xs leading-5 text-[#0B1220]"
                >
                  {notice}
                </p>
              )}
            </div>
          </div>
        </Reveal>

        {/* Provider section heading */}
        <Reveal direction="up" delay={100}>
          <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#171F32]">
                Verified providers
              </h2>

              {selectedService && (
                <p className="mt-1 text-xs text-[#71809A]">
                  Category: {selectedService}
                  <button
                    type="button"
                    onClick={() => setSelectedService("")}
                    className="ml-2 font-semibold text-[#171F32] underline underline-offset-2 transition-colors hover:text-[#64748B]"
                  >
                    Clear
                  </button>
                </p>
              )}
            </div>

            <p className="flex items-center gap-1.5 text-xs text-[#71809A]">
              <CircleCheck size={13} className="text-[#23966B]" />
              Ratings come from verified bookings only.
            </p>
          </div>
        </Reveal>

        {/* Provider cards */}
        {filteredProviders.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProviders.map((provider, index) => {
              const Icon = provider.icon;

              return (
                <Reveal
                  key={provider.name}
                  direction="up"
                  delay={index * 100}
                >
                  <article className="group/card relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#DCE3ED] bg-white p-3.5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FFB900] hover:shadow-[0_16px_35px_rgba(11,18,32,0.10)] sm:p-4">
                    {/* Animated top accent */}
                    <span className="absolute left-0 top-0 h-1 w-0 rounded-r-full bg-[#FFB900] transition-all duration-500 group-hover/card:w-full" />

                    {/* Provider identity */}
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#0B1220] transition-all duration-300 group-hover/card:scale-105 group-hover/card:bg-[#FFB900]">
                        <Icon
                          size={19}
                          strokeWidth={1.8}
                          className="text-[#FFB900] transition-all duration-300 group-hover/card:rotate-[-8deg] group-hover/card:text-[#0B1220]"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold leading-5 text-[#171F32] transition-colors duration-300 group-hover/card:text-[#0B1220]">
                          {provider.name}
                        </h3>

                        <p className="mt-0.5 text-[11px] leading-4 text-[#71809A]">
                          {provider.category} · {provider.city}
                        </p>
                      </div>
                    </div>

                    {/* Verification badge */}
                    <div className="mt-2.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F7F0] px-2 py-1 text-[10px] font-semibold text-[#23966B] transition-colors duration-300 group-hover/card:bg-[#D5F2E4]">
                        <BadgeCheck size={12} />
                        {provider.verification}
                      </span>
                    </div>

                    {/* Provider details */}
                    <dl className="mt-2.5 space-y-1.5">
                      <div className="grid grid-cols-[65px_minmax(0,1fr)] gap-2">
                        <dt className="text-[11px] text-[#71809A]">
                          Credentials
                        </dt>

                        <dd className="text-[11px] font-semibold leading-4 text-[#273247]">
                          {provider.credentials}
                        </dd>
                      </div>

                      <div className="grid grid-cols-[65px_minmax(0,1fr)] gap-2">
                        <dt className="text-[11px] text-[#71809A]">Price</dt>

                        <dd className="text-[11px] font-semibold text-[#273247] transition-colors duration-300 group-hover/card:text-[#0B1220]">
                          {provider.price}
                        </dd>
                      </div>

                      <div className="grid grid-cols-[65px_minmax(0,1fr)] gap-2">
                        <dt className="text-[11px] text-[#71809A]">Next</dt>

                        <dd className="text-[11px] font-semibold leading-4 text-[#273247]">
                          {provider.next}
                        </dd>
                      </div>
                    </dl>

                    {/* Rating */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-[#71809A]">Rating</span>

                      <Star
                        size={13}
                        fill="#E9A000"
                        strokeWidth={1.5}
                        className="text-[#E9A000] transition-transform duration-300 group-hover/card:rotate-12 group-hover/card:scale-110"
                      />

                      <span className="font-bold text-[#E9A000]">
                        {provider.rating}
                      </span>

                      <span className="text-[#71809A]">
                        from {provider.bookings} verified bookings
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto grid grid-cols-2 gap-1.5 pt-4">
                      <button
                        type="button"
                        onClick={() => openProvider(provider, false)}
                        className="group/book inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full bg-[#FFB900] px-2.5 text-xs font-bold text-[#0B1220] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFD04D] hover:shadow-md active:translate-y-0"
                      >
                        <CalendarDays
                          size={13}
                          className="transition-transform duration-300 group-hover/book:rotate-[-8deg]"
                        />
                        Book
                        <ArrowRight
                          size={12}
                          className="transition-transform duration-300 group-hover/book:translate-x-0.5"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => openProvider(provider, true)}
                        className="group/quote inline-flex min-h-9 items-center justify-center gap-1 rounded-full border border-[#DCE3ED] bg-white px-2 text-xs font-semibold text-[#171F32] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0B1220] hover:bg-[#F5F7FA] hover:shadow-sm active:translate-y-0"
                      >
                        Request Quote
                        <ArrowRight
                          size={12}
                          className="transition-transform duration-300 group-hover/quote:translate-x-0.5"
                        />
                      </button>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <Reveal direction="up">
            <div className="mt-4 rounded-xl border border-[#DCE3ED] bg-white px-5 py-10 text-center transition-shadow duration-300 hover:shadow-md">
              <Search size={24} className="mx-auto text-[#71809A]" />

              <p className="mt-3 font-semibold text-[#171F32]">
                No matching demo providers found
              </p>

              <p className="mt-1 text-sm text-[#71809A]">
                Try another category or search for Manchester, London,
                Birmingham, Leeds or Bristol.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSelectedService("");
                  setPostcode("");
                  setSearchLocation("");
                  setNotice("");
                }}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#0B1220] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#273247] hover:shadow-md"
              >
                Reset filters
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </Reveal>
        )}

        {/* Booking / quote dialog */}
        {activeProvider && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1220]/60 p-4 backdrop-blur-[3px] animate-in fade-in duration-200"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setActiveProvider(null);
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="provider-dialog-title"
              className="w-full max-w-md animate-in zoom-in-95 slide-in-from-bottom-2 rounded-2xl bg-white p-5 shadow-2xl duration-200 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    id="provider-dialog-title"
                    className="text-lg font-bold text-[#171F32]"
                  >
                    {quoteRequested ? "Request a quote" : "Book a service"}
                  </h3>

                  <p className="mt-1 text-sm text-[#71809A]">
                    {activeProvider.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProvider(null)}
                  aria-label="Close dialog"
                  className="rounded-lg px-2 py-1 text-xl text-[#71809A] transition-all duration-200 hover:rotate-90 hover:bg-[#F5F7FA] hover:text-[#171F32]"
                >
                  ×
                </button>
              </div>

              <div className="mt-4 rounded-xl border border-[#DCE3ED] bg-[#F5F7FA] p-4 transition-colors duration-300 hover:border-[#FFB900]">
                <p className="text-xs text-[#71809A]">Indicative price</p>

                <p className="mt-1 text-lg font-bold text-[#171F32]">
                  {activeProvider.price}
                </p>

                <p className="mt-2 text-sm text-[#273247]">
                  {activeProvider.category}
                </p>

                <p className="mt-1 text-xs text-[#71809A]">
                  Next availability: {activeProvider.next}
                </p>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#273247]">
                {quoteRequested
                  ? "Connect this form to your provider enquiry API to submit a genuine quote request."
                  : "Connect your booking API or provider calendar to confirm an actual appointment."}
              </p>

              <button
                type="button"
                onClick={() => setActiveProvider(null)}
                className="group/close mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0B1220] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#273247] hover:shadow-lg active:translate-y-0"
              >
                Close
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover/close:translate-x-1"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
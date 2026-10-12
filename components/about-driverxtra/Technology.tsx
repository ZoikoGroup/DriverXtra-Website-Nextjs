"use client";

import { useState } from "react";
import {
  Building2,
  Car,
  Check,
  Code,
  Crosshair,
  FileText,
  Gauge,
  Globe,
  MessageSquare,
  Plug,
  Scale,
  Search,
  ShieldCheck,
  ShoppingCart,
  TriangleAlert,
  User,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "./SectionTitle";

type Module = { name: string; icon: LucideIcon; text: string };

const layers: { label: string; highlight?: boolean; modules: Module[] }[] = [
  {
    label: "Experiences",
    highlight: true,
    modules: [
      { name: "Marketplace web & app", icon: Car, text: "The consumer experience for discovering, comparing and transacting across vehicles, parts, services and partner products." },
      { name: "Business workspaces", icon: Building2, text: "Role-based workspaces for dealers, fleets, parts sellers and providers to manage inventory, orders, leads and teams." },
      { name: "Developer APIs", icon: Code, text: "Documented APIs and webhooks for inventory, catalog, order, booking and status integrations." },
    ],
  },
  {
    label: "Platform capabilities",
    modules: [
      { name: "Identity & access", icon: User, text: "Accounts, roles, permissions and layered identity verification tied to the actions a participant takes." },
      { name: "Search & discovery", icon: Search, text: "Universal search, filters, saved searches and alerts across every marketplace category." },
      { name: "Vehicle & parts catalogs", icon: FileText, text: "Structured vehicle and parts data that keeps listings consistent and comparable." },
      { name: "Fitment", icon: Crosshair, text: "VIN, make, model, year and trim matching with fitment confidence for parts and accessories." },
      { name: "Verification", icon: ShieldCheck, text: "Contact, identity, seller, business and partner verification levels with ongoing monitoring." },
      { name: "Messaging & documents", icon: MessageSquare, text: "Secure messaging and document exchange with redaction, attached to the transaction record." },
      { name: "Transactions", icon: ShoppingCart, text: "Cart, checkout, offers, payments and escrow where available, with full order history." },
      { name: "Disputes", icon: Scale, text: "Structured dispute workflows with evidence, response windows, decisions and escalation routes." },
    ],
  },
  {
    label: "Integration & controls",
    modules: [
      { name: "Partner integrations", icon: Plug, text: "Connectors for finance, insurance, logistics, inspection and data partners." },
      { name: "Compliance & localization", icon: Globe, text: "Market-specific disclosures, eligibility, language, currency and policy controls." },
      { name: "Fraud & anomaly signals", icon: TriangleAlert, text: "Signals and monitoring that flag suspicious listings, accounts and transactions for review." },
      { name: "Analytics & monitoring", icon: Gauge, text: "Operational reporting, performance analytics and platform health monitoring." },
    ],
  },
];

const pillars = [
  {
    title: "Discovery & intelligence",
    icon: Search,
    points: [
      "Universal search across vehicles, parts, services and providers",
      "Advanced filters and saved searches",
      "Market-price context and AI-assisted pricing where appropriate",
      "Fitment and compatibility matching",
    ],
  },
  {
    title: "Commerce & transactions",
    icon: ShoppingCart,
    points: [
      "Parts cart and checkout",
      "Vehicle offer and counteroffer where supported",
      "Payments and escrow where available",
      "Orders, transaction history and audit events",
    ],
  },
  {
    title: "Trust & evidence",
    icon: ShieldCheck,
    points: [
      "Identity and business verification",
      "Ownership and title evidence workflows",
      "Fraud and anomaly signals",
      "Document exchange, redaction and dispute evidence",
    ],
  },
  {
    title: "Business infrastructure",
    icon: Code,
    points: [
      "Inventory and catalog feeds",
      "APIs and webhooks",
      "Dealer, fleet and supplier workspaces",
      "Analytics, procurement and operational reporting",
    ],
  },
];

export default function Technology() {
  const [selected, setSelected] = useState<Module | null>(null);

  return (
    <section className="bg-white py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="Technology & platform architecture"
          title="Technology at the core"
          description="DriverXtra is API-first and modular. The customer experience is supported by dedicated capabilities for identity and access, vehicle and parts catalogs, fitment, search, verification, messaging, transactions, partner integrations, disputes, compliance and analytics — so DriverXtra can scale across multiple automotive categories."
        />

        <div className="mt-10 space-y-4">
          {layers.map((layer, li) => (
            <Reveal key={layer.label} delay={li * 100}>
              <div className="grid items-start gap-3 md:grid-cols-[180px_1fr]">
                <p className="pt-2 text-xs font-semibold text-slate-500">{layer.label}</p>
                <div className="flex flex-wrap gap-2">
                  {layer.modules.map((m) => {
                    const isActive = selected?.name === m.name;
                    return (
                      <button
                        key={m.name}
                        type="button"
                        onClick={() => setSelected(m)}
                        onMouseEnter={() => setSelected(m)}
                        aria-pressed={isActive}
                        className={`group inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                          isActive
                            ? "border-navy bg-navy text-white shadow-lg"
                            : layer.highlight
                              ? "border-brand/40 bg-brand-light text-ink hover:border-brand hover:shadow-md"
                              : "border-slate-200 bg-white text-ink hover:border-brand hover:shadow-md"
                        }`}
                      >
                        <m.icon
                          className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-brand" : "text-brand-dark"}`}
                        />
                        {m.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}

          <div
            key={selected?.name ?? "empty"}
            className="animate-fade-up rounded-r-xl border-l-4 border-brand bg-slate-50 px-5 py-4 text-sm text-slate-600"
            aria-live="polite"
          >
            {selected ? (
              <>
                <strong className="text-ink">{selected.name}:</strong> {selected.text}
              </>
            ) : (
              "Select any module to see what it does."
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ title, icon: Icon, points }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-2 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <p className="flex items-center gap-3 text-[15px] font-bold text-ink">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-brand transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-4 w-4" />
                  </span>
                  {title}
                </p>
                <ul className="mt-4 space-y-2">
                  {points.map((p) => (
                    <li key={p} className="flex gap-2 text-[13px] leading-snug text-slate-600">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

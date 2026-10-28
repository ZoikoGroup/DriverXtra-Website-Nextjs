"use client";

import { useState } from "react";
import { container } from "@/components/ui/SectionTitle";

const NAV_ITEMS = [
  { label: "Dealer Solutions", href: "#dealer-solutions" },
  { label: "Open a Dealer Storefront", href: "#open-storefront" },
  { label: "Inventory Feeds", href: "#inventory-feeds" },
  { label: "Lead & CRM Integrations", href: "#crm-integrations" },
  { label: "Dealer Verification", href: "#dealer-verification" },
  { label: "Dealer Analytics", href: "#dealer-analytics" },
  { label: "Dealer Support", href: "#dealer-support" },
];

export default function DealerAnalyticsSubNav() {
  const [activeTab, setActiveTab] = useState("Dealer Analytics");

  return (
    <div className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className={container}>
        <nav
          className="no-scrollbar flex items-center space-x-8 overflow-x-auto whitespace-nowrap scroll-smooth"
          aria-label="Dealer Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveTab(item.label)}
                className={`relative py-4 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-ink font-bold"
                    : "text-slate-600 hover:text-ink"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-full bg-brand" />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

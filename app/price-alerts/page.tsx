import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import {
  AlertMethodSection,
  ExampleAlertsSection,
  PriceAlertsApp,
  PriceAlertsHeroSection,
} from "@/components/price-alerts";
import { priceAlertFaqs } from "@/components/price-alerts/data";

export const metadata: Metadata = {
  title: "Price Alerts | DriverXtra",
  description:
    "Set a price alert for a vehicle listing or saved search, and get notified when a verified price decrease or your target price is reached.",
};

export default function PriceAlertsPage() {
  return (
    <main>
      <PriceAlertsHeroSection />
      <PriceAlertsApp />
      <ExampleAlertsSection />
      <AlertMethodSection />
      <FaqSection id="faq" eyebrow="FAQ" title="Price alert questions" faqs={priceAlertFaqs} className="bg-white" />
    </main>
  );
}

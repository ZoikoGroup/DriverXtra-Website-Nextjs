import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import {
  KeepExploringSection,
  MethodSection,
  PriceReducedHeroSection,
  PriceReducedInventorySection,
} from "@/components/price-reduced";
import { priceReducedFaqs } from "@/components/price-reduced/data";

export const metadata: Metadata = {
  title: "Price Reduced Vehicles | DriverXtra",
  description:
    "Browse vehicles with a documented decrease in their public asking price, and see how DriverXtra checks each reduction.",
};

export default function PriceReducedPage() {
  return (
    <main>
      <PriceReducedHeroSection />
      <PriceReducedInventorySection />
      <MethodSection />
      <KeepExploringSection />
      <FaqSection id="faq" eyebrow="FAQ" title="Price reduction questions" faqs={priceReducedFaqs} />
    </main>
  );
}

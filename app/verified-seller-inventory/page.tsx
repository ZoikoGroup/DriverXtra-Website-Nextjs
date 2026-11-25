import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import { BeforeYouBuySection, VerifiedHeroSection, VerifiedInventorySection } from "@/components/verified-seller-inventory";
import { verifiedFaqs } from "@/components/verified-seller-inventory/data";

export const metadata: Metadata = {
  title: "Verified Seller Inventory | DriverXtra",
  description:
    "Browse vehicles from sellers who have completed applicable verification checks, and learn what seller verification does and doesn't cover.",
};

export default function VerifiedSellerInventoryPage() {
  return (
    <main>
      <VerifiedHeroSection />
      <VerifiedInventorySection />
      <BeforeYouBuySection />
      <FaqSection id="faq" eyebrow="FAQ" title="Verified seller questions" faqs={verifiedFaqs} className="bg-white" />
    </main>
  );
}

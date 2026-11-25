import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import RelatedLinksSection from "@/components/ui/RelatedLinksSection";
import { ListingDraftSection, OdometerGuide, OdometerHeroSection } from "@/components/odometer-mileage-disclosure";
import { odometerFaqs, relatedLinks } from "@/components/odometer-mileage-disclosure/data";

export const metadata: Metadata = {
  title: "Odometer / Mileage Disclosure | DriverXtra",
  description:
    "Understand how to record a vehicle's displayed mileage, handle miles and kilometres, and when further disclosure may be needed.",
};

export default function OdometerMileageDisclosurePage() {
  return (
    <main>
      <OdometerHeroSection />
      <OdometerGuide />
      <RelatedLinksSection title="Related guidance" links={relatedLinks} />
      <ListingDraftSection />
      <FaqSection id="faq" eyebrow="FAQ" title="Odometer questions" faqs={odometerFaqs} className="bg-white" />
    </main>
  );
}

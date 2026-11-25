import {
  PricingGuidanceHeroSection,
  PricingGuidanceCalculatorSection,
  HowThisRangeWasEstimatedSection,
  HowToChooseAnAskingPriceSection,
  PricingGuidanceFaqSection,
} from "@/components/pricing-guidance";

export default function PricingGuidancePage() {
  return (
    <main>
      <PricingGuidanceHeroSection />
      <PricingGuidanceCalculatorSection />
      <HowThisRangeWasEstimatedSection />
      <HowToChooseAnAskingPriceSection />
      <PricingGuidanceFaqSection />
    </main>
  );
}

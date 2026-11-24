import {
  BuyingSellingGuidesHeroSection,
  BuyingAVehicleStepByStepSection,
  FirstTimeBuyerChecklistSection,
  ComparingWhereToBuySection,
  WarningSignsAndWhereToGoSection,
  BrowseGuidesSection,
  BuyingAndSellingFaqSection,
} from "@/components/buying-selling-guides";

export default function BuyingSellingGuidesPage() {
  return (
    <main>
      <BuyingSellingGuidesHeroSection />
      <BuyingAVehicleStepByStepSection />
      <FirstTimeBuyerChecklistSection />
      <ComparingWhereToBuySection />
      <WarningSignsAndWhereToGoSection />
      <BrowseGuidesSection />
      <BuyingAndSellingFaqSection />
    </main>
  );
}

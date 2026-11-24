import {
  OwnershipCostGuidesHeroSection,
  WhereOwnershipCostsComeFromSection,
  OwnershipCosts,
  UnderstandTheNumbersSection,
  HowTheEstimateWorksSection,
  KeepExploringSection,
  OwnershipCostFaqSection,
} from "@/components/ownership-cost-guides";

export default function OwnershipCostGuidesPage() {
  return (
    <main>
      <OwnershipCostGuidesHeroSection />
      <WhereOwnershipCostsComeFromSection />
      <OwnershipCosts />
      <UnderstandTheNumbersSection />
      <HowTheEstimateWorksSection />
      <KeepExploringSection />
      <OwnershipCostFaqSection />
    </main>
  );
}

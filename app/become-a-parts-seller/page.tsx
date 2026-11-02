import {
  BecomeAPartsSellerHero,
  BuiltForPartsBusinessesSection,
  CheckPartsEligibilitySection,
  ShowUsWhoIsSellingSection,
  BetterCatalogDataSection,
  SellerOnboardingStepsSection,
  YouFulfilUnderStatedTermsSection,
  TransparentSellerTermsSection,
  BecomeAPartsSellerFaqSection,
} from "@/components/become-a-parts-seller";

export default function BecomeAPartsSellerPage() {
  return (
    <main>
      <BecomeAPartsSellerHero />
      <BuiltForPartsBusinessesSection />
      <CheckPartsEligibilitySection />
      <ShowUsWhoIsSellingSection />
      <BetterCatalogDataSection />
      <SellerOnboardingStepsSection />
      <YouFulfilUnderStatedTermsSection />
      <TransparentSellerTermsSection />
      <BecomeAPartsSellerFaqSection />
    </main>
  );
}

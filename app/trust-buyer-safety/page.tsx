import {
  BuyerSafetyHeroSection,
  SixStepsToSaferPurchaseSection,
  CheckConfirmsWhatItDescribesSection,
  CheckVehicleAndDocumentsSection,
  CheckPartsBeforeYouBuySection,
  PayCarefullyAndKeepControlSection,
  WarningSignsWorthCheckingSection,
  QuestionsBeforeYouCommitSection,
  FindTheRightRouteSection,
  BuyerSafetyFaqSection,
} from "@/components/trust-buyer-safety";

export default function TrustBuyerSafetyPage() {
  return (
    <main>
      <BuyerSafetyHeroSection />
      <SixStepsToSaferPurchaseSection />
      <CheckConfirmsWhatItDescribesSection />
      <CheckVehicleAndDocumentsSection />
      <CheckPartsBeforeYouBuySection />
      <PayCarefullyAndKeepControlSection />
      <WarningSignsWorthCheckingSection />
      <QuestionsBeforeYouCommitSection />
      <FindTheRightRouteSection />
      <BuyerSafetyFaqSection />
    </main>
  );
}

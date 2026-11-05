import {
  SellWithClearerSafetyStepsHero,
  BeforeYouTalkToBuyersSection,
  ProtectAccountFromImpersonationSection,
  ConfirmPaymentSection,
  PrepareForVehicleViewingsSection,
  ConfirmHandoverRequirementsSection,
  KeepPartsShippingVerifiableSection,
  KeepRelevantEvidenceSafelySection,
  NotSureWhereToReportSection,
  SellerSafetyFaqSection,
} from "@/components/seller-safety";

export default function SellerSafetyPage() {
  return (
    <main>
      <SellWithClearerSafetyStepsHero />
      <BeforeYouTalkToBuyersSection />
      <ProtectAccountFromImpersonationSection />
      <ConfirmPaymentSection />
      <PrepareForVehicleViewingsSection />
      <ConfirmHandoverRequirementsSection />
      <KeepPartsShippingVerifiableSection />
      <KeepRelevantEvidenceSafelySection />
      <NotSureWhereToReportSection />
      <SellerSafetyFaqSection />
    </main>
  );
}

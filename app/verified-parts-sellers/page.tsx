import {
  VerifiedPartsSellersHeroSection,
  FindPartsSellerSection,
  WhatEachStatusMeansSection,
  EachClaimCheckedSeparatelySection,
  SellerConcernAndActionsSection,
  VerifiedSellerQuestionsFaqSection,
} from "@/components/verified-parts-sellers";

export default function VerifiedPartsSellerPage() {
  return (
    <main>
      <VerifiedPartsSellersHeroSection />
      <FindPartsSellerSection />
      <WhatEachStatusMeansSection />
      <EachClaimCheckedSeparatelySection />
      <SellerConcernAndActionsSection />
      <VerifiedSellerQuestionsFaqSection />
    </main>
  );
}

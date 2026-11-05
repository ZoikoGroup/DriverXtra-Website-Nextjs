import {
  PartsAuthenticityHeroSection,
  OriginConditionAndFitSection,
  WhatDifferentPartsClaimsMeanSection,
  WhatEvidenceCanAndCantShowSection,
  HowClaimsAppearOnListingsSection,
  SignsWorthACloserLookSection,
  CheckAtEveryStageSection,
  PresentAuthenticityClaimsAccuratelySection,
  PartsAuthenticityFaqSection,
} from "@/components/parts-authenticity";

export default function PartsAuthenticityPage() {
  return (
    <main>
      <PartsAuthenticityHeroSection />
      <OriginConditionAndFitSection />
      <WhatDifferentPartsClaimsMeanSection />
      <WhatEvidenceCanAndCantShowSection />
      <HowClaimsAppearOnListingsSection />
      <SignsWorthACloserLookSection />
      <CheckAtEveryStageSection />
      <PresentAuthenticityClaimsAccuratelySection />
      <PartsAuthenticityFaqSection />
    </main>
  );
}

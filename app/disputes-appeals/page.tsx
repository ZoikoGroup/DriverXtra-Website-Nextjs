import {
  DisputesAppealsHeroSection,
  WhatWouldYouLikeToDoSection,
  TwoKindsOfReviewSection,
  WhatEligibilityDependsOnSection,
  EachStageIsSeparateSection,
  CheckCaseStatusSection,
  OtherWaysToGetHelpSection,
  DisputesAppealsFaqSection,
} from "@/components/disputes-appeals";

export default function DisputesAppealsPage() {
  return (
    <main>
      <DisputesAppealsHeroSection />
      <WhatWouldYouLikeToDoSection />
      <TwoKindsOfReviewSection />
      <WhatEligibilityDependsOnSection />
      <EachStageIsSeparateSection />
      <CheckCaseStatusSection />
      <OtherWaysToGetHelpSection />
      <DisputesAppealsFaqSection />
    </main>
  );
}

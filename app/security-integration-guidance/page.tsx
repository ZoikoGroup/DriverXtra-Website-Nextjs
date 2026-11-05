import {
  SecurityHeroSection,
  WhatBringsYouHereSection,
  PrepareBeforeAccessSection,
  WhoProtectsWhatSection,
  AuthenticationPermissionsSection,
  HandleCredentialsSafelySection,
  ProtectEveryConnectionSection,
  CollectLessKeepItShorterSection,
  SafeExamplePatternSection,
  TroubleshootingDidYouSeeSection,
  ReportVulnerabilitySection,
  SecurityFaqSection,
} from "@/components/security-integration-guidance";

export default function SecurityIntegrationGuidancePage() {
  return (
    <main>
      <SecurityHeroSection />
      <WhatBringsYouHereSection />
      <PrepareBeforeAccessSection />
      <WhoProtectsWhatSection />
      <AuthenticationPermissionsSection />
      <HandleCredentialsSafelySection />
      <ProtectEveryConnectionSection />
      <CollectLessKeepItShorterSection />
      <SafeExamplePatternSection />
      <TroubleshootingDidYouSeeSection />
      <ReportVulnerabilitySection />
      <SecurityFaqSection />
    </main>
  );
}

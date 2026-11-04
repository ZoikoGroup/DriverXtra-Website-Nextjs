import {
  HowVerificationWorksHeroSection,
  CoreDistinctionsSection,
  ChooseWhoOrWhatSection,
  WhatACheckMayInvolveSection,
  WhatEachStatusMeansSection,
  ReadTheScopeBehindASignalSection,
  WhatVerificationDoesNotEstablishSection,
  ConcernedAboutAListingSection,
  HowVerificationWorksFaqSection,
} from "@/components/how-it-works";

export default function HowItWorksPage() {
  return (
    <main>
      <HowVerificationWorksHeroSection />
      <CoreDistinctionsSection />
      <ChooseWhoOrWhatSection />
      <WhatACheckMayInvolveSection />
      <WhatEachStatusMeansSection />
      <ReadTheScopeBehindASignalSection />
      <WhatVerificationDoesNotEstablishSection />
      <ConcernedAboutAListingSection />
      <HowVerificationWorksFaqSection />
    </main>
  );
}

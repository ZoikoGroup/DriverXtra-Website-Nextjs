import {
  DealerSupportHero,
  DealerSupportSubNav,
  SupportAvailabilitySection,
  ChooseTopicSection,
  WhatEachStatusMeansSection,
  BeforeYouOpenACaseSection,
  DealerSupportFAQSection,
} from "@/components/dealer-support";

export default function DealerSupportPage() {
  return (
    <main>
      <DealerSupportHero />
      <DealerSupportSubNav />
      <SupportAvailabilitySection />
      <ChooseTopicSection />
      <WhatEachStatusMeansSection />
      <BeforeYouOpenACaseSection />
      <DealerSupportFAQSection />
    </main>
  );
}

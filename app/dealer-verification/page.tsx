import {
  DealerVerificationHero,
  DealerVerificationSubNav,
  VerificationScopeSection,
  OperatingMarketSection,
  VerificationProcessSection,
  AuthorityAndSignersSection,
  WhatEachStatusMeansSection,
} from "@/components/dealer-verification";

export default function DealerVerificationPage() {
  return (
    <main>
      <DealerVerificationHero />
      <DealerVerificationSubNav />
      <VerificationScopeSection />
      <OperatingMarketSection />
      <VerificationProcessSection />
      <AuthorityAndSignersSection />
      <WhatEachStatusMeansSection />
    </main>
  );
}

import {
  DealerStorefrontsHero,
  DealerStorefrontSubNav,
  StorefrontFourPartsSection,
  EligibleDealerTypesSection,
  FiveStepsFromDraftToPublicSection,
  AccurateListingsSection,
  WhatYouCanShowSection,
} from "@/components/open-a-dealer-storefront";

export default function OpenADealerStorefrontPage() {
  return (
    <main>
      <DealerStorefrontsHero />
      <DealerStorefrontSubNav />
      <StorefrontFourPartsSection />
      <EligibleDealerTypesSection />
      <FiveStepsFromDraftToPublicSection />
      <AccurateListingsSection />
      <WhatYouCanShowSection />
    </main>
  );
}

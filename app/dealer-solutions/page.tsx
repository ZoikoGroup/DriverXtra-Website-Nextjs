import {
  DealerSolutionsHero,
  DealerSubNav,
  WhoItsForSection,
  WhatDriverXtraSupports,
  HowItWorksSection,
  InventoryDiscoverabilitySection,
  StorefrontSection,
  FeedPathwaysSection,
  LeadAndCrmFlowsSection,
  AuthorizedBranchesSection,
  DealerSetupJourneySection,
  ProductPreviewWorkspaceSection,
  SecurityPrivacyScopedSection,
  DealerContactSection,
} from "@/components/dealer-solutions";

export default function DealerSolutionsPage() {
  return (
    <main>
      <DealerSolutionsHero />
      <DealerSubNav />
      <WhoItsForSection />
      <WhatDriverXtraSupports />
      <HowItWorksSection />
      <InventoryDiscoverabilitySection />
      <StorefrontSection />
      <FeedPathwaysSection />
      <LeadAndCrmFlowsSection />
      <AuthorizedBranchesSection />
      <DealerSetupJourneySection />
      <ProductPreviewWorkspaceSection />
      <SecurityPrivacyScopedSection />
      <DealerContactSection />
    </main>
  );
}

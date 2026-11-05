import {
  InventoryHeroSection,
  WhoThisIsForSection,
  FromOrganizationToPublicationSection,
  PathwayAvailabilitySection,
  WhatFlowsThroughSection,
  ClaimsCarryTheirEvidenceSection,
  ExploreIntegrationRequirementsSection,
  WhenSomethingGoesWrongSection,
  WhereTheDetailsLiveSection,
  TalkToThePartnerTeamSection,
  InventoryFaqSection,
} from "@/components/inventory-catalog-integrations";

export default function InventoryPage() {
  return (
    <main>
      <InventoryHeroSection />
      <WhoThisIsForSection />
      <FromOrganizationToPublicationSection />
      <PathwayAvailabilitySection />
      <WhatFlowsThroughSection />
      <ClaimsCarryTheirEvidenceSection />
      <ExploreIntegrationRequirementsSection />
      <WhenSomethingGoesWrongSection />
      <WhereTheDetailsLiveSection />
      <TalkToThePartnerTeamSection />
      <InventoryFaqSection />
    </main>
  );
}

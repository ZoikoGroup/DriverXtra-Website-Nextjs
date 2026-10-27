import {
  LeadCrmIntegrationsHero,
  LeadCrmSubNav,
  HowIntegrationWorksSection,
  WhatTheIntegrationHandlesSection,
  ProposedSupportedSourcesSection,
  PotentialPathsSection,
  SecureMappingSection,
} from "@/components/lead-crm-integrations";

export default function LeadCrmIntegrationsPage() {
  return (
    <main>
      <LeadCrmIntegrationsHero />
      <LeadCrmSubNav />
      <HowIntegrationWorksSection />
      <WhatTheIntegrationHandlesSection />
      <ProposedSupportedSourcesSection />
      <PotentialPathsSection />
      <SecureMappingSection />
    </main>
  );
}

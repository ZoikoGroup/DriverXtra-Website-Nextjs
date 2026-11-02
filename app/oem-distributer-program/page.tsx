import {
  OemDistributorHeroSection,
  ForOrganizationsUnderOwnRightsSection,
  SelectOrganizationRoleSection,
  WhatYouMayBeAskedToSubstantiateSection,
  RightsScopeSection,
  OemCatalogRightsStepsSection,
  RightsConflictsAndChangesSection,
  OemCommercialTermsSection,
  OemDistributorFaqSection,
} from "@/components/oem-distributer-program";

export default function OemDistributerProgramPage() {
  return (
    <main>
      <OemDistributorHeroSection />
      <ForOrganizationsUnderOwnRightsSection />
      <SelectOrganizationRoleSection />
      <WhatYouMayBeAskedToSubstantiateSection />
      <RightsScopeSection />
      <OemCatalogRightsStepsSection />
      <RightsConflictsAndChangesSection />
      <OemCommercialTermsSection />
      <OemDistributorFaqSection />
    </main>
  );
}

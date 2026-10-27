import {
  InventoryFeedsHero,
  InventoryFeedsSubNav,
  CapabilityQualificationSection,
  FeedConnectionTrustSection,
  VehicleDataSyncSection,
  RolesAndBoundariesSection,
  MappingOverviewSection,
  ValidationSampleSection,
  ProposedChangesSection,
  ControlsBeforeGoLiveSection,
  EveryRunIsRecordedSection,
  ComparisonOfModesSection,
} from "@/components/inventory-feeds";

export default function InventoryFeedsPage() {
  return (
    <main>
      <InventoryFeedsHero />
      <InventoryFeedsSubNav />
      <CapabilityQualificationSection />
      <FeedConnectionTrustSection />
      <VehicleDataSyncSection />
      <RolesAndBoundariesSection />
      <MappingOverviewSection />
      <ValidationSampleSection />
      <ProposedChangesSection />
      <ControlsBeforeGoLiveSection />
      <EveryRunIsRecordedSection />
      <ComparisonOfModesSection />
    </main>
  );
}

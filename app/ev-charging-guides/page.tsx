import {
  EvChargingGuidesHeroSection,
  WhatDoYouWantToKnowSection,
  ChargingBasicsSection,
  ChargingOptionsUkSection,
  ConnectorsAndCompatibilitySection,
  ChargingAtHomeSection,
  UsingPublicChargersSection,
  ChargingTime,
  RatedVsRealWorldRangeSection,
  WhatChargingMightCostSection,
  BatteryCareAndTripPlanningSection,
  IfSomethingGoesWrongSection,
  EvChargingFaqSection,
} from "@/components/ev-charging-guides";

export default function EvChargingGuidesPage() {
  return (
    <main>
      <EvChargingGuidesHeroSection />
      <WhatDoYouWantToKnowSection />
      <ChargingBasicsSection />
      <ChargingOptionsUkSection />
      <ConnectorsAndCompatibilitySection />
      <ChargingAtHomeSection />
      <UsingPublicChargersSection />
      <ChargingTime />
      <RatedVsRealWorldRangeSection />
      <WhatChargingMightCostSection />
      <BatteryCareAndTripPlanningSection />
      <IfSomethingGoesWrongSection />
      <EvChargingFaqSection />
    </main>
  );
}

import {
  DealerAnalyticsHero,
  DealerAnalyticsSubNav,
  BuiltForDealerOperationsSection,
  WithPublishedDefinitionsSection,
  NoUnsupportedInferenceSection,
  IllustrativeDashboardSection,
  WhoSeesWhatSection,
  HowNumbersAreDefinedSection,
  DealerAnalyticsFAQSection,
} from "@/components/dealer-analytics";

export default function DealerAnalyticsPage() {
  return (
    <main>
      <DealerAnalyticsHero />
      <DealerAnalyticsSubNav />
      <BuiltForDealerOperationsSection />
      <WithPublishedDefinitionsSection />
      <NoUnsupportedInferenceSection />
      <IllustrativeDashboardSection />
      <WhoSeesWhatSection />
      <HowNumbersAreDefinedSection />
      <DealerAnalyticsFAQSection />
    </main>
  );
}

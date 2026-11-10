import {
  MarketTrendsHeroSection,
  ObservedMovement,
  CoverageFreshnessSourcesSection,
  HowFiguresAreCalculatedSection,
  ThingsThatCanMoveATrendLineSection,
  RelatedReadingSection,
  MarketTrendsFaqSection,
} from "@/components/market-trends-price-indices";

export default function MarketPage() {
  return (
    <main>
      <MarketTrendsHeroSection />
      <ObservedMovement />
      <CoverageFreshnessSourcesSection />
      <HowFiguresAreCalculatedSection />
      <ThingsThatCanMoveATrendLineSection />
      <RelatedReadingSection />
      <MarketTrendsFaqSection />
    </main>
  );
}

import {
  ReportListingHeroSection,
  ReportListingStep1Section,
  MakeYourReportEasierToReviewSection,
  WhatYouCanReportSection,
  LearnBeforeYouBuyOrSellSection,
  ReportListingFaqSection,
} from "@/components/report-a-listing";

export default function ReportAListingPage() {
  return (
    <main>
      <ReportListingHeroSection />
      <ReportListingStep1Section />
      <MakeYourReportEasierToReviewSection />
      <WhatYouCanReportSection />
      <LearnBeforeYouBuyOrSellSection />
      <ReportListingFaqSection />
    </main>
  );
}

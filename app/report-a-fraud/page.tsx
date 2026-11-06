import {
  ReportFraudHeroSection,
  ReportFraudStep1Section,
  RecognizeCommonFraudPatternsSection,
  ReportFraudFaqSection,
  ProtectYourselfNextTimeSection,
} from "@/components/report-a-fraud";

export default function ReportAFraudPage() {
  return (
    <main>
      <ReportFraudHeroSection />
      <ReportFraudStep1Section />
      <RecognizeCommonFraudPatternsSection />
      <ReportFraudFaqSection />
      <ProtectYourselfNextTimeSection />
    </main>
  );
}

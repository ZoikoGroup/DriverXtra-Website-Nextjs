import {
  BulkB2BPartsHeroSection,
  FindPartsInQuantitySection,
  QuoteRequestSection,
  BulkB2BQuestionsFaqSection,
} from "@/components/bulk-parts";

export default function BulkPartsPage() {
  return (
    <main>
      <BulkB2BPartsHeroSection />
      <FindPartsInQuantitySection />
      <QuoteRequestSection />
      <BulkB2BQuestionsFaqSection />
    </main>
  );
}

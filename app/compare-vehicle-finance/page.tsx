import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import FinanceComparison, { type FinanceMode } from "@/components/finance/FinanceComparison";
import { FinanceDisclosures, UnderstandingFigures } from "@/components/finance/FinanceInfo";
import { faqs } from "@/components/finance/data";

export const metadata: Metadata = {
  title: "Compare Vehicle Finance — DriverXtra",
  description:
    "See loan and lease options from third-party providers side by side, with the costs that matter explained.",
};

type PageProps = {
  /** ?mode=leases or ?mode=estimate from menu links. */
  searchParams: Promise<{ mode?: string }>;
};

const isMode = (value: string | undefined): value is FinanceMode => value === "loans" || value === "leases" || value === "estimate";

export default async function CompareVehicleFinancePage({ searchParams }: PageProps) {
  const { mode } = await searchParams;

  return (
    <>
      <FinanceComparison initialMode={isMode(mode) ? mode : "loans"} />
      <UnderstandingFigures />
      <FinanceDisclosures />
      <FaqSection
        id="finance-faqs"
        eyebrow="Vehicle finance questions"
        title="Before you compare"
        description="Loans, leases, APR and what happens when you continue to a provider."
        faqs={faqs}
        className="bg-white"
      />
    </>
  );
}

import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import { BudgetHeroSection, BudgetSearchSection, HowEstimatesWorkSection } from "@/components/by-monthly-budget";
import { budgetFaqs } from "@/components/by-monthly-budget/data";

export const metadata: Metadata = {
  title: "By Monthly Budget | DriverXtra",
  description:
    "Browse vehicles by the monthly payment you'd like to make, and see the assumptions behind every payment estimate.",
};

export default function ByMonthlyBudgetPage() {
  return (
    <main>
      <BudgetHeroSection />
      <BudgetSearchSection />
      <HowEstimatesWorkSection />
      <FaqSection id="faq" eyebrow="FAQ" title="Monthly budget questions" faqs={budgetFaqs} className="bg-white" />
    </main>
  );
}

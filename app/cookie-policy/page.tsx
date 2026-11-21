import type { Metadata } from "next";
import { container } from "@/components/ui/SectionTitle";
import PolicySidebar from "@/components/legal/PolicySidebar";
import PolicyFaqSection from "@/components/legal/PolicyFaqSection";
import {
  CookiePolicyHeroSection,
  OverviewSection,
  TechnologyCategoriesSection,
  TechnologiesTableSection,
  YourControlsSection,
  BrowsersDevicesSection,
  PolicyChangesSection,
  CookieHelpSection,
} from "@/components/cookie-policy";
import { cookieFaqs, tocSections } from "@/components/cookie-policy/data";

export const metadata: Metadata = {
  title: "Cookie Policy | DriverXtra",
  description:
    "The cookies and similar storage technologies used on DriverXtra, what they do, how long they last and how to control them.",
};

export default function CookiePolicyPage() {
  return (
    <main>
      <CookiePolicyHeroSection />
      <div className={`${container} grid gap-10 py-12 md:py-16 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14`}>
        <PolicySidebar sections={tocSections} showRegion printLabel="Print this policy" />
        <div className="max-w-[820px]">
          <OverviewSection />
          <TechnologyCategoriesSection />
          <TechnologiesTableSection />
          <YourControlsSection />
          <BrowsersDevicesSection />
          <PolicyChangesSection />
          <CookieHelpSection />
          <PolicyFaqSection title="Cookie questions" faqs={cookieFaqs} />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { container } from "@/components/ui/SectionTitle";
import PolicySidebar from "@/components/legal/PolicySidebar";
import PolicyFaqSection from "@/components/legal/PolicyFaqSection";
import {
  PrivacyChoicesHeroSection,
  YourChoicesSection,
  CookiesSection,
  AfterYouSubmitSection,
  PrivacyHelpSection,
} from "@/components/privacy-choices";
import { privacyFaqs, tocSections } from "@/components/privacy-choices/data";

export const metadata: Metadata = {
  title: "Privacy Choices | DriverXtra",
  description:
    "The privacy choices and data-rights requests available to you on DriverXtra, how to submit one and what happens next.",
};

export default function PrivacyChoicesPage() {
  return (
    <main>
      <PrivacyChoicesHeroSection />
      <div className={`${container} grid gap-10 py-12 md:py-16 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14`}>
        <PolicySidebar sections={tocSections} />
        <div className="max-w-205">
          <YourChoicesSection />
          <CookiesSection />
          <AfterYouSubmitSection />
          <PrivacyHelpSection />
          <PolicyFaqSection title="Privacy Choices questions" faqs={privacyFaqs} />
        </div>
      </div>
    </main>
  );
}

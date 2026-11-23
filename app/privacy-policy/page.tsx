import type { Metadata } from "next";
import { container } from "@/components/ui/SectionTitle";
import PolicySidebar from "@/components/legal/PolicySidebar";
import PrivacyPolicyHeroSection from "@/components/privacy-policy/PrivacyPolicyHeroSection";
import PrivacyPolicyHelpSection from "@/components/privacy-policy/PrivacyPolicyHelpSection";

export const metadata: Metadata = {
  title: "Privacy Policy | DriverXtra",
  description: "Understand how DriverXtra describes its handling of personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PrivacyPolicyHeroSection />
      <div className={`${container} grid gap-10 py-10 md:py-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10`}>
        {/* No policy sections are published yet, so the page menu only offers printing. */}
        <PolicySidebar sections={[]} printLabel="Print this privacy policy" />
        <div className="max-w-205">
          <PrivacyPolicyHelpSection />
        </div>
      </div>
    </main>
  );
}

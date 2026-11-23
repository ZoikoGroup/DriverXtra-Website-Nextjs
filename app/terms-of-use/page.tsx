import type { Metadata } from "next";
import { container } from "@/components/ui/SectionTitle";
import PolicySidebar from "@/components/legal/PolicySidebar";
import TermsHeroSection from "@/components/terms-of-use/TermsHeroSection";
import TermsHelpSection from "@/components/terms-of-use/TermsHelpSection";

export const metadata: Metadata = {
  title: "Terms of Use | DriverXtra",
  description: "Read the DriverXtra Terms of Use available for your selected region and language.",
};

export default function TermsOfUsePage() {
  return (
    <main>
      <TermsHeroSection />
      <div className={`${container} grid gap-10 py-10 md:py-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10`}>
        {/* No term sections are published yet, so the page menu only offers printing. */}
        <PolicySidebar sections={[]} printLabel="Print this version" />
        <div className="max-w-205">
          <TermsHelpSection />
        </div>
      </div>
    </main>
  );
}

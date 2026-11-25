import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import {
  DocumentUploadHeroSection,
  PrepareSection,
  PrivacySection,
  PrivateUploadSection,
  ProcessSection,
} from "@/components/document-upload-guidance";
import { documentFaqs } from "@/components/document-upload-guidance/data";

export const metadata: Metadata = {
  title: "Document Upload Guidance | DriverXtra",
  description:
    "Prepare vehicle documents before you upload them to an authorized listing — scanning tips, privacy checks and how upload review works.",
};

export default function DocumentUploadGuidancePage() {
  return (
    <main>
      <DocumentUploadHeroSection />
      <PrepareSection />
      <PrivacySection />
      <ProcessSection />
      <PrivateUploadSection />
      <FaqSection id="faq" eyebrow="FAQ" title="Document questions" faqs={documentFaqs} />
    </main>
  );
}

import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import {
  ChecklistSection,
  PhotoChecklistHeroSection,
  QualityPrivacySection,
  WorkspaceSection,
} from "@/components/photo-checklist";
import { photoFaqs } from "@/components/photo-checklist/data";

export const metadata: Metadata = {
  title: "Photo Checklist | DriverXtra",
  description:
    "The vehicle photos buyers find useful — exterior, interior and condition shots — plus quality tips and a privacy check before you share.",
};

export default function PhotoChecklistPage() {
  return (
    <main>
      <PhotoChecklistHeroSection />
      <ChecklistSection />
      <QualityPrivacySection />
      <WorkspaceSection />
      <FaqSection id="faq" eyebrow="FAQ" title="Photo questions" faqs={photoFaqs} />
    </main>
  );
}

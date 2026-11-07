import type { Metadata } from "next";
import {
  PressMediaHero,
  StartHereSection,
  MediaResourcesSection,
  CompanyFactsSection,
  NewsroomSection,
  MediaInquirySection,
  ImpersonationSection,
  PressMediaFaqSection,
} from "@/components/press-media";

export const metadata: Metadata = {
  title: "Press & Media | DriverXtra",
  description:
    "Approved DriverXtra media resources, company facts, published announcements and how to submit a media inquiry.",
};

export default function PressMediaPage() {
  return (
    <>
      <PressMediaHero />
      <StartHereSection />
      <MediaResourcesSection />
      <NewsroomSection />
      <CompanyFactsSection />
      <MediaInquirySection />
      <ImpersonationSection />
      <PressMediaFaqSection />
    </>
  );
}

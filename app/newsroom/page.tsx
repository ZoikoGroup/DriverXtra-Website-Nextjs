import type { Metadata } from "next";
import {
  NewsroomHeroSection,
  ReleaseSpotlightSection,
  AnnouncementsArchiveSection,
  MediaResourcesSection,
  PressInquiriesSection,
  NewsroomFaqSection,
} from "@/components/newsroom";

export const metadata: Metadata = {
  title: "Newsroom | DriverXtra",
  description: "Official DriverXtra announcements, corrections, media statements and approved media information.",
};

export default function NewsroomPage() {
  return (
    <main>
      <NewsroomHeroSection />
      <ReleaseSpotlightSection />
      <AnnouncementsArchiveSection />
      <MediaResourcesSection />
      <PressInquiriesSection />
      <NewsroomFaqSection />
    </main>
  );
}

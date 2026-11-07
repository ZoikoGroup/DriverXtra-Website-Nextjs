import type { Metadata } from "next";
import {
  HelpCenterHeroSection,
  BrowseHelpTopicsSection,
  PopularArticlesSection,
  AboutHelpCenterSection,
} from "@/components/help-center";

export const metadata: Metadata = {
  title: "Help Center — DriverXtra Support & Guidance",
  description:
    "Find guidance for buying, selling, parts, services and your account across the DriverXtra automotive marketplace.",
};

export default function HelpCenterPage() {
  return (
    <>
      <HelpCenterHeroSection />
      <BrowseHelpTopicsSection />
      <PopularArticlesSection />
      <AboutHelpCenterSection />
    </>
  );
}

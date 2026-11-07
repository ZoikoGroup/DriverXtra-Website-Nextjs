import type { Metadata } from "next";
import {
  ContactHeroSection,
  WhichRouteSection,
  WhatCanWeHelpYouWithSection,
  ContactQuestionsSection,
} from "@/components/contact-driverxtra";

export const metadata: Metadata = {
  title: "Contact DriverXtra — Support & General Inquiries",
  description:
    "Find the right way to reach DriverXtra. Choose what you need help with. We'll show the appropriate available route for your market.",
};

export default function ContactDriverXtraPage() {
  return (
    <>
      <ContactHeroSection />
      <WhichRouteSection />
      <WhatCanWeHelpYouWithSection />
      <ContactQuestionsSection />
    </>
  );
}

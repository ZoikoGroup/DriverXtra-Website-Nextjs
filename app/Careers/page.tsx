import type { Metadata } from "next";
import {
  CareersHeroSection,
  OpenRolesSection,
  HowHiringWorksSection,
  WhatWeWorkOnSection,
  CareersSafetySection,
  CandidateQuestionsSection,
  MoreAboutDriverXtraSection,
} from "@/components/careers";

export const metadata: Metadata = {
  title: "Careers — DriverXtra Opportunities",
  description:
    "Explore verified opportunities and learn how to find the right application pathway at DriverXtra.",
};

export default function CareersPage() {
  return (
    <>
      <CareersHeroSection />
      <OpenRolesSection />
      <HowHiringWorksSection />
      <WhatWeWorkOnSection />
      <CareersSafetySection />
      <CandidateQuestionsSection />
      <MoreAboutDriverXtraSection />
    </>
  );
}

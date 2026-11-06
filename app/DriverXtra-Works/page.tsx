import type { Metadata } from "next";
import {
  HeroSection,
  ChooseWhatYouWantToDoSection,
  HowMostJourneysWorkSection,
  StepByStepSection,
  WhatVerificationMeansSection,
  StaySafeAtEveryStepSection,
  FaqSection,
} from "@/components/driverxtra-works";

export const metadata: Metadata = {
  title: "How DriverXtra Works — Global Automotive Marketplace",
  description:
    "Explore vehicles, parts and services, learn what to check, and continue with the right seller, provider or specialist service when available in your market.",
};

export default function DriverXtraWorksPage() {
  return (
    <>
      <HeroSection />
      <ChooseWhatYouWantToDoSection />
      <HowMostJourneysWorkSection />
      <StepByStepSection />
      <WhatVerificationMeansSection />
      <StaySafeAtEveryStepSection />
      <FaqSection />
    </>
  );
}

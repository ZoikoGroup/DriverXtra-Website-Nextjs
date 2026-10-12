import type { Metadata } from "next";
import Hero from "@/components/about-driverxtra/Hero";
import WhoWeAre from "@/components/about-driverxtra/WhoWeAre";
import TheProblem from "@/components/about-driverxtra/TheProblem";
import Mission from "@/components/about-driverxtra/Mission";
import Ecosystem from "@/components/about-driverxtra/Ecosystem";
import Lifecycle from "@/components/about-driverxtra/Lifecycle";
import Trust from "@/components/about-driverxtra/Trust";
import Technology from "@/components/about-driverxtra/Technology";
import WhoWeServe from "@/components/about-driverxtra/WhoWeServe";
import Differentiators from "@/components/about-driverxtra/Differentiators";
import GlobalLocal from "@/components/about-driverxtra/GlobalLocal";
import Boundaries from "@/components/about-driverxtra/Boundaries";
import CorporateHome from "@/components/about-driverxtra/CorporateHome";
import LookingForward from "@/components/about-driverxtra/LookingForward";
import FAQ from "@/components/about-driverxtra/FAQ";
import CTA from "@/components/about-driverxtra/CTA";

export const metadata: Metadata = {
  title: "About DriverXtra — Global Automotive Commerce Infrastructure",
  description:
    "DriverXtra connects the automotive ecosystem through one governed marketplace for vehicles, parts, services, finance and insurance.",
};

export default function AboutPage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <TheProblem />
      <Mission />
      <Ecosystem />
      <Lifecycle />
      <Trust />
      <Technology />
      <WhoWeServe />
      <Differentiators />
      <GlobalLocal />
      <Boundaries />
      <CorporateHome />
      <LookingForward />
      <FAQ />
      <CTA />
    </>
  );
}

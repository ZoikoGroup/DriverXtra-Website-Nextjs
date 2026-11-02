import type { Metadata } from "next";
import { FleetHero, FleetSubNav, FleetFaqSection } from "@/components/fleet-solutions";
import { EnquirySection, PrivacySection } from "@/components/enterprise-contact";
import { FAQS, HERO_IMAGE } from "@/components/enterprise-contact/data";

export const metadata: Metadata = {
  title: "Enterprise Contact — DriverXtra",
  description:
    "Share a few details and we'll route your enquiry to the right team. A receipt is not a callback promise, quote or contract.",
};

export default function EnterpriseContactPage() {
  return (
    <div className="flex flex-col items-center gap-[22px] pb-[88px]">
      <FleetHero
        title="Tell us about your fleet priorities and reach the right enterprise team."
        lede="Share a few details and we'll route your enquiry to the right team. A receipt is not a callback promise, quote or contract."
        image={{ src: HERO_IMAGE, alt: "An enterprise team meeting" }}
      />
      <FleetSubNav />
      <EnquirySection />
      <PrivacySection />
      <FleetFaqSection title={<>Enterprise Contact questions</>} faqs={FAQS} className="pt-[66px]" />
    </div>
  );
}

import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import Hero from "@/components/manage-my-listings/Hero";
import { faqs } from "@/components/sell-vehicles/data";

export const metadata: Metadata = {
  title: "Manage My Listings — DriverXtra",
  description: "Sign in to view and manage the vehicle listings associated with your DriverXtra account.",
};

export default function ManageMyListingsPage() {
  return (
    <>
      <Hero />
      <FaqSection
        eyebrow="Selling questions"
        title="Managing listings: common questions"
        description="DriverXtra is a marketplace operated by Zoiko Mobility Inc. We don't buy vehicles ourselves."
        faqs={faqs}
        className="bg-white"
      />
    </>
  );
}

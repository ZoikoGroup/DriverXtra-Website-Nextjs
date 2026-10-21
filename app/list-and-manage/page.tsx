import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import SellingSafely from "@/components/selling/SellingSafely";
import CreateListing from "@/components/sell-vehicles/CreateListing";
import Hero from "@/components/list-and-manage/Hero";
import { faqs } from "@/components/list-and-manage/data";

export const metadata: Metadata = {
  title: "Create a Listing — DriverXtra",
  description:
    "Confirm your vehicle details, describe its condition, add photos, set your asking price and submit your listing for review.",
};

export default function ListAndManagePage() {
  return (
    <>
      <Hero />
      <CreateListing showNotice showBackToOptions />
      <SellingSafely className="bg-white py-20 md:py-24" />
      <FaqSection
        eyebrow="Selling questions"
        title="Questions about creating a listing"
        description="DriverXtra is a marketplace operated by Zoiko Mobility Inc. We don't buy vehicles ourselves."
        faqs={faqs}
        className="bg-white"
      />
    </>
  );
}

import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import MethodsTable from "@/components/selling/MethodsTable";
import SellingSafely from "@/components/selling/SellingSafely";
import Hero from "@/components/sell-vehicles/Hero";
import SellingMethods from "@/components/sell-vehicles/SellingMethods";
import HowSellingWorks from "@/components/sell-vehicles/HowSellingWorks";
import ValueMyVehicle from "@/components/sell-vehicles/ValueMyVehicle";
import CreateListing from "@/components/sell-vehicles/CreateListing";
import SellerReadiness from "@/components/sell-vehicles/SellerReadiness";
import SellingAsBusiness from "@/components/sell-vehicles/SellingAsBusiness";
import { faqs } from "@/components/sell-vehicles/data";

export const metadata: Metadata = {
  title: "Sell Vehicles — DriverXtra",
  description:
    "Get a market-informed valuation, prepare your listing, and choose the selling path available in your market.",
};

export default function SellVehiclesPage() {
  return (
    <>
      <Hero />
      <SellingMethods />
      <HowSellingWorks />
      <ValueMyVehicle />
      <CreateListing />
      <SellerReadiness />
      <MethodsTable className="bg-slate-50" />
      <SellingSafely reportLink className="bg-white py-20 md:py-24" />
      <SellingAsBusiness />
      <FaqSection
        eyebrow="Selling questions"
        title="Straight answers about selling"
        description="DriverXtra is a marketplace operated by Zoiko Mobility Inc. We don't buy vehicles ourselves."
        faqs={faqs}
        className="bg-white"
      />
    </>
  );
}

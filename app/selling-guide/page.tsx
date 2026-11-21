import type { Metadata } from "next";
import {
  SellingGuideHeroSection,
  FindRightWayToSellSection,
  GetCarReadySection,
  TakePhotosSection,
  SetAskingPriceSection,
  WriteListingSection,
  RespondToBuyersSection,
  GetPaidSafelySection,
  SellingFaqSection,
} from "@/components/selling-guide";

export const metadata: Metadata = {
  title: "Selling Guide | DriverXtra",
  description:
    "Sell your vehicle step by step: choose how to sell, get the car ready, write an honest listing and finish the sale safely.",
};

export default function SellingGuidePage() {
  return (
    <main>
      <SellingGuideHeroSection />
      <FindRightWayToSellSection />
      <GetCarReadySection />
      <TakePhotosSection />
      <SetAskingPriceSection />
      <WriteListingSection />
      <RespondToBuyersSection />
      <GetPaidSafelySection />
      <SellingFaqSection />
    </main>
  );
}

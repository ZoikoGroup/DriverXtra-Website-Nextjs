import Hero from "@/components/home/Hero";

import Start from "@/components/home/Start";
import VehicleDiscovery from "@/components/home/VehicleDiscovery";
import BrowseVehicleTypes from "@/components/home/BrowseVehicleTypes";
import ShopByBrand from "@/components/home/ShopByBrand";
import SellVehicleValuation from "@/components/home/SellVehicleValuation";
import PartsAccessories from "@/components/home/PartsAccessories";
import FinanceInsurance from "@/components/home/FinanceInsurance";
import ServicesMarketplace from "@/components/home/ServicesMarketplace";
import TrustSafety from "@/components/home/TrustSafety";
import BusinessSection from "@/components/home/BusinessSection";
import RegionSection from "@/components/home/RegionSection";
import InsightsSection from "@/components/home/InsightsSection";
import AnswerCentre from "@/components/home/AnswerCentre";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Start />
      <VehicleDiscovery />
      <BrowseVehicleTypes />
      <ShopByBrand />
      <SellVehicleValuation />
      <PartsAccessories />
      <FinanceInsurance />
      <ServicesMarketplace />
      <TrustSafety />
      <BusinessSection />
      <RegionSection />
      <InsightsSection />
      <AnswerCentre />
      <FinalCTA />

      
    </>
  );
}

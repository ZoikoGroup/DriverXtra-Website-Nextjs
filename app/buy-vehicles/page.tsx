import type { Metadata } from "next";
import VehicleBrowser from "@/components/buy-vehicles/VehicleBrowser";
import { isTabId } from "@/components/buy-vehicles/data";

export const metadata: Metadata = {
  title: "Buy Vehicles — DriverXtra",
  description:
    "Browse new, used, certified, electric and commercial vehicles from verified private sellers, dealers and fleets.",
};

type PageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function BuyVehiclesPage({ searchParams }: PageProps) {
  const { type } = await searchParams;
  return <VehicleBrowser initialTab={isTabId(type) ? type : "all"} />;
}

import type { Metadata } from "next";
import VehicleBrowser from "@/components/buy-vehicles/VehicleBrowser";
import { isCategoryId, isSortId, isTabId } from "@/components/buy-vehicles/data";

export const metadata: Metadata = {
  title: "Buy Vehicles — DriverXtra",
  description:
    "Browse new, used, certified, electric and commercial vehicles from verified private sellers, dealers and fleets.",
};

type PageProps = {
  searchParams: Promise<{ type?: string; category?: string; sort?: string; make?: string }>;
};

export default async function BuyVehiclesPage({ searchParams }: PageProps) {
  const { type, category, sort, make } = await searchParams;
  return (
    <VehicleBrowser
      initialTab={isTabId(type) ? type : "all"}
      initialCategory={isCategoryId(category) ? category : undefined}
      initialSort={isSortId(sort) ? sort : undefined}
      initialMake={make?.trim().slice(0, 40) || undefined}
    />
  );
}

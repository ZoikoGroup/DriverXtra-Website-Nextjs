import { redirect } from "next/navigation";
import { findBrand } from "@/components/brands/data";

type PageProps = {
  params: Promise<{ brand: string }>;
};

/**
 * /brands/<name> (used by the home page brand tiles) → that brand's vehicles.
 * Unknown names go to the A–Z directory with the name pre-searched.
 */
export default async function BrandRedirect({ params }: PageProps) {
  const { brand } = await params;
  const name = decodeURIComponent(brand).replace(/-/g, " ");
  const match = findBrand(name) ?? findBrand(decodeURIComponent(brand));

  redirect(match ? `/buy-vehicles?make=${encodeURIComponent(match.name)}` : `/brands?q=${encodeURIComponent(name)}`);
}

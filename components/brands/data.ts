import type { Faq } from "@/components/ui/FaqSection";

export type Brand = {
  name: string;
  /** Other names people search for — abbreviations, old names, spellings without accents. */
  aliases?: string[];
  /** Region codes where the brand isn't sold new (from lib/region). */
  notOfferedIn?: string[];
  /** No longer making vehicles — kept so older vehicles can be found. */
  historic?: boolean;
};

export const REGISTRY_VERSION = "brand-registry-2026.10-example";

export const brands: Brand[] = [
  { name: "Abarth" },
  { name: "Acura", notOfferedIn: ["GB"] },
  { name: "Alfa Romeo", aliases: ["Alfa"] },
  { name: "Alpine" },
  { name: "Aston Martin", aliases: ["Aston"] },
  { name: "Audi" },
  { name: "Bentley" },
  { name: "BMW", aliases: ["Bayerische Motoren Werke"] },
  { name: "Buick", notOfferedIn: ["GB"] },
  { name: "BYD" },
  { name: "Cadillac", notOfferedIn: ["GB"] },
  { name: "Chevrolet", aliases: ["Chevy"], notOfferedIn: ["GB"] },
  { name: "Chrysler", notOfferedIn: ["GB"] },
  { name: "Citroën", aliases: ["Citroen"] },
  { name: "Cupra" },
  { name: "Dacia" },
  { name: "Daewoo", historic: true },
  { name: "Dodge", notOfferedIn: ["GB"] },
  { name: "DS Automobiles", aliases: ["DS"] },
  { name: "Ferrari" },
  { name: "Fiat" },
  { name: "Ford" },
  { name: "Genesis" },
  { name: "GMC", notOfferedIn: ["GB"] },
  { name: "Honda" },
  { name: "Hyundai" },
  { name: "Ineos" },
  { name: "Infiniti", notOfferedIn: ["GB"] },
  { name: "Jaguar" },
  { name: "Jeep" },
  { name: "KGM", aliases: ["SsangYong"] },
  { name: "Kia" },
  { name: "Lamborghini", aliases: ["Lambo"] },
  { name: "Land Rover" },
  { name: "Lexus" },
  { name: "Lotus" },
  { name: "Lucid", notOfferedIn: ["GB"] },
  { name: "Maserati" },
  { name: "Mazda" },
  { name: "McLaren" },
  { name: "Mercedes-Benz", aliases: ["Mercedes", "Merc", "Benz"] },
  { name: "MG" },
  { name: "MINI" },
  { name: "Mitsubishi" },
  { name: "Nissan" },
  { name: "Opel", notOfferedIn: ["GB"] },
  { name: "Peugeot" },
  { name: "Polestar" },
  { name: "Porsche" },
  { name: "Ram", notOfferedIn: ["GB"] },
  { name: "Renault" },
  { name: "Rivian", notOfferedIn: ["GB"] },
  { name: "Rolls-Royce", aliases: ["Rolls", "Rolls Royce"] },
  { name: "Saab", historic: true },
  { name: "SEAT" },
  { name: "Škoda", aliases: ["Skoda"] },
  { name: "smart" },
  { name: "Subaru" },
  { name: "Suzuki" },
  { name: "Tesla" },
  { name: "Toyota" },
  { name: "Vauxhall" },
  { name: "Volkswagen", aliases: ["VW"] },
  { name: "Volvo" },
];

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/** Lower-case, accents removed, spaces and dashes unified — so "Skoda", "škoda" and "SKODA" all match. */
export const normalise = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .trim();

export const brandSlug = (name: string) => normalise(name);

export const letterOf = (name: string) => normalise(name).charAt(0).toUpperCase();

export const brandsByLetter = ALPHABET.map((letter) => ({
  letter,
  brands: brands.filter((b) => letterOf(b.name) === letter).sort((a, b) => normalise(a.name).localeCompare(normalise(b.name))),
}));

/** Exact match on a brand's name or alias (accent- and case-insensitive). */
export function findBrand(query: string): Brand | undefined {
  const q = normalise(query);
  if (!q) return undefined;
  return brands.find((b) => normalise(b.name) === q || b.aliases?.some((a) => normalise(a) === q));
}

/** Brands whose name or alias contains the query. */
export function searchBrands(query: string): Brand[] {
  const q = normalise(query);
  if (!q) return [];
  return brands.filter((b) => normalise(b.name).includes(q) || b.aliases?.some((a) => normalise(a).includes(q)));
}

export const faqs: Faq[] = [
  {
    q: "What is All Brands A–Z on DriverXtra?",
    a: "It is a directory for finding automotive brands by their approved names, then continuing to eligible vehicle discovery in your selected market.",
  },
  {
    q: "Does the directory include every brand in the world?",
    a: "No. It lists brands in our brand registry for the markets we serve. The registry version is shown under the directory, and brands are added as markets grow.",
  },
  {
    q: "Can I look up a brand by an abbreviation?",
    a: "Yes, where it's an approved alias — for example “VW” finds Volkswagen and “Merc” finds Mercedes-Benz.",
  },
  {
    q: "What happens if a brand has no listings?",
    a: "The brand still appears so you can find it, but no listing count is shown. Opening it shows that no vehicles are currently listed.",
  },
  {
    q: "How are brand names sorted?",
    a: "Alphabetically by name, ignoring accents — so Škoda sits under S and Citroën under C.",
  },
  {
    q: "Are the brands shown verified partners?",
    a: "No. A brand appearing here doesn't mean the manufacturer partners with DriverXtra. Sellers are verified separately on each listing.",
  },
  {
    q: "Why does a brand use another name in my region?",
    a: "Some manufacturers sell under different names in different markets — for example Opel and Vauxhall. The directory shows which name applies where.",
  },
  {
    q: "Can I search by an old brand name?",
    a: "Yes, where it's a recorded alias — for example “SsangYong” finds KGM. Brands that no longer make vehicles are marked Historic.",
  },
  {
    q: "Can I find electric vehicles by brand?",
    a: "Yes. Open a brand, then use the powertrain filter, or browse the Electric & Hybrid category on Buy Vehicles.",
  },
  {
    q: "Can I find genuine parts just by selecting a brand?",
    a: "No. Parts compatibility depends on the specific vehicle, so choose a vehicle (or enter its VIN) to check fitment.",
  },
  {
    q: "How is the regional brand directory different?",
    a: "It shows the same registry with market-specific availability, like “Not offered in GB”, for the region you've selected.",
  },
  {
    q: "Can I compare vehicles from different brands?",
    a: "Yes. On Buy Vehicles, add up to three vehicles from any brands to compare them side by side.",
  },
  {
    q: "Why is a brand logo not visible?",
    a: "Manufacturer logos are trademarks and are only shown where we have permission. Brand names are always shown.",
  },
  {
    q: "How can I report a brand name or listing error?",
    a: "Use Report a Listing on the listing itself, or contact DriverXtra through the Help Center for directory corrections.",
  },
];

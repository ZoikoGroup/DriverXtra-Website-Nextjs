import Link from "next/link";
import { container } from "@/components/ui/SectionTitle";
import DriverXLogo from "./DriverXLogo";

const COLUMNS = [
  {
    title: "Plans",
    links: [
      { label: "Prepaid", href: "#plans" },
      { label: "Postpaid", href: "#plans" },
      { label: "Data-Only", href: "#plans" },
      { label: "Business & Fleet", href: "#plans" },
    ],
  },
  {
    title: "Drivers",
    links: [
      { label: "Rideshare", href: "#who-its-for" },
      { label: "Delivery and couriers", href: "#who-its-for" },
      { label: "Small fleets", href: "#who-its-for" },
      { label: "How it works", href: "#how-it-works" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Offer conditions", href: "#offer-conditions" },
      // No dedicated DriverX Mobile legal pages exist yet; these are placeholders.
      { label: "Privacy policy", href: "#" },
      { label: "Terms of service", href: "#" },
    ],
  },
];

export default function DriverXFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0d1829] py-14 text-white">
      <div className={container}>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <DriverXLogo />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-slate-400">
              Mobile service designed around commercial drivers&apos; work rhythms. Stay Connected. Drive Smarter. Earn
              More.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-[14px] font-bold">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="link-underline text-[14px] text-slate-400 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 border-t border-white/10 pt-6 text-[13px] text-slate-500">© 2026 DriverX Mobile</p>
      </div>
    </footer>
  );
}

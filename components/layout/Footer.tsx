import Image from "next/image";
import Link from "next/link";
import { CircleHelp, Flag, MapPin } from "lucide-react";
import { footerColumns, legalLinks } from "@/lib/navigation";
import Reveal from "@/components/ui/Reveal";
import FooterPreferences from "./FooterPreferences";
import RegulatoryNotice from "./RegulatoryNotice";
import SocialLinks from "./SocialLinks";

const offices = [
  {
    title: "Global Headquarters",
    lines: ["DriverXtra / Zoiko Mobility Inc.", "1401 21st Street, Suite R", "Sacramento, CA 95811", "United States"],
  },
  {
    title: "European Headquarters",
    lines: ["DriverXtra / Zoiko Mobility Inc.", "167–169 Great Portland Street, 5th Floor", "London W1W 5PF", "United Kingdom"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Brand + preferences */}
        <div className="grid gap-10 border-b border-white/10 py-12 lg:grid-cols-2">
          <Reveal>
            <Link
              href="/"
              className="inline-flex rounded-full bg-white px-4 py-2 transition-transform duration-300 hover:scale-105"
            >
              <Image src="/logo.png" alt="DriverXtra" width={684} height={120} className="h-6 w-auto" />
            </Link>
            <p className="mt-5 text-base font-semibold text-white">Global Automotive Commerce Infrastructure</p>
            <p className="mt-1 text-xs text-slate-400">A trading name of Zoiko Mobility Inc. · A Zoiko Group company</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              Vehicles, parts, finance, insurance and automotive services — connected through one governed global
              marketplace.
            </p>
          </Reveal>
          <Reveal delay={150} className="lg:justify-self-end">
            <FooterPreferences />
          </Reveal>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-white/10 py-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {footerColumns.map((col, i) => (
            <Reveal key={col.title} delay={(i % 8) * 60}>
              <p className="text-[11px] font-semibold text-brand">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="link-underline inline text-[13px] leading-snug text-slate-400 hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Company, offices, social */}
        <div className="grid gap-8 border-b border-white/10 py-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_auto]">
          <Reveal>
            <p className="text-base font-semibold text-white">DriverXtra</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              Global Automotive Commerce Infrastructure. DriverXtra is a trading name of Zoiko Mobility Inc., a Zoiko
              Group company.
            </p>
            <div className="mt-5 flex gap-6 text-sm font-semibold text-white">
              {["About DriverXtra", "Contact DriverXtra"].map((label) => (
                <Link
                  key={label}
                  href="#"
                  className="relative pb-1 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-brand after:transition-transform after:duration-300 hover:text-brand hover:after:scale-x-50"
                >
                  {label}
                </Link>
              ))}
            </div>
          </Reveal>

          {offices.map((office, i) => (
            <Reveal key={office.title} delay={100 + i * 100}>
              <div className="group h-full rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_-20px_rgba(255,194,14,0.35)]">
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <MapPin className="h-4 w-4 text-brand transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                  {office.title}
                </p>
                <address className="mt-3 space-y-0.5 text-[13px] text-slate-400 not-italic">
                  {office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </Reveal>
          ))}

          <Reveal delay={300}>
            <p className="text-sm font-semibold text-white">Follow DriverXtra</p>
            <SocialLinks />
            <div className="mt-5 space-y-2.5 text-sm">
              <Link href="#" className="group flex items-center gap-2 text-slate-400 transition-colors hover:text-white">
                <CircleHelp className="h-4 w-4 text-brand transition-transform duration-300 group-hover:rotate-12" />
                Help Center
              </Link>
              <Link href="#" className="group flex items-center gap-2 text-slate-400 transition-colors hover:text-white">
                <Flag className="h-4 w-4 text-brand transition-transform duration-300 group-hover:-rotate-12" />
                Report fraud
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <RegulatoryNotice />
        </Reveal>

        {/* Legal */}
        <div className="py-8">
          <Reveal>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-slate-300">
              {legalLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="link-underline hover:text-white">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-6 space-y-2 text-xs leading-relaxed text-slate-500">
              <p className="font-semibold text-slate-300">DriverXtra is a trading name of Zoiko Mobility Inc., a Zoiko Group company.</p>
              <p>
                DriverXtra provides automotive marketplace and commerce infrastructure. Unless expressly stated,
                DriverXtra does not own listed inventory or act as principal in transactions.
              </p>
              <p>© {new Date().getFullYear()} Zoiko Mobility Inc. All rights reserved.</p>
              <p>
                Vehicle manufacturer names, logos and trademarks are the property of their respective owners. Their use
                on DriverXtra is for identification, compatibility and marketplace-reference purposes and does not imply
                endorsement unless expressly stated.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}

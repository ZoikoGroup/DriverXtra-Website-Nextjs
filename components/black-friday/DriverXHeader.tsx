"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { container } from "@/components/ui/SectionTitle";
import DriverXLogo from "./DriverXLogo";

const NAV = [
  { href: "#plans", label: "Driver plans" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#who-its-for", label: "Who it's for" },
  { href: "#offer-conditions", label: "Black Friday" },
  { href: "#faq", label: "FAQ" },
];

export default function DriverXHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d1829]/95 text-white backdrop-blur">
      <div className={`flex h-16 items-center justify-between gap-6 ${container}`}>
        <DriverXLogo />

        <nav aria-label="Page sections" className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="link-underline text-[14px] text-slate-300 hover:text-white">
              {n.label}
            </Link>
          ))}
          <Link
            href="#plans"
            className="btn-shine inline-flex h-9 items-center rounded-full bg-[#fcd116] px-4 text-[14px] font-bold text-[#13243c] transition-transform hover:-translate-y-0.5"
          >
            Explore driver plans
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav aria-label="Page sections" className="animate-fade-up border-t border-white/10 lg:hidden">
          <div className={`flex flex-col py-3 ${container}`}>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2.5 text-[15px] text-slate-200">
                {n.label}
              </Link>
            ))}
            <Link
              href="#plans"
              onClick={() => setOpen(false)}
              className="mt-2 mb-2 inline-flex h-11 items-center justify-center rounded-full bg-[#fcd116] text-[15px] font-bold text-[#13243c]"
            >
              Explore driver plans
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

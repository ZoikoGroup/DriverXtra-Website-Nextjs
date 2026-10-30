"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SUB_NAV } from "./data";

/** Tab strip shared by every Fleets & Enterprise page; the active tab follows the route. */
export default function FleetSubNav() {
  const pathname = usePathname();

  return (
    <div className="w-full border-b border-solid border-[#d7dee8] bg-white px-4 lg:px-20">
      <div className="mx-auto w-full max-w-[1280px]">
        <nav aria-label="Fleets & Enterprise" className="no-scrollbar flex items-start gap-1 overflow-x-auto">
          {SUB_NAV.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-[46px] items-center border-b-[3px] border-solid px-3 pt-[10.16px] pb-[10.84px] text-[14px] leading-[21.7px] font-[650] whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-[#f5b400] text-[#172033]"
                    : "border-transparent text-[#4a5670] hover:text-[#172033]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

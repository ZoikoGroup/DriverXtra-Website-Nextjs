"use client";

import { useRegion } from "@/lib/region";
import { capabilityStyles, markets, type Capability } from "./data";

function Status({ value }: { value: Capability }) {
  const s = capabilityStyles[value];
  return (
    <span className={`inline-flex items-center gap-1.5 ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {value}
    </span>
  );
}

/** Orders and bookings availability by market, with the visitor's market highlighted. */
export default function MarketCapabilities() {
  const region = useRegion();
  const current = markets.some((m) => m.market === region) ? region : "Other markets";

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-[13px]">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500">
            {["Market", "Orders", "Bookings"].map((h) => (
              <th key={h} className="w-1/3 px-3 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {markets.map(({ market, orders, bookings }) => {
            const mine = market === current;
            return (
              <tr key={market} className={`border-b border-slate-100 transition-colors duration-300 ${mine ? "bg-brand-light/70" : "hover:bg-slate-50"}`}>
                <th scope="row" className="px-3 py-3 font-semibold text-ink">
                  {market} {mine && <span className="ml-1 text-[11px] font-normal text-slate-500">(your market)</span>}
                </th>
                <td className="px-3 py-3">
                  <Status value={orders} />
                </td>
                <td className="px-3 py-3">
                  <Status value={bookings} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

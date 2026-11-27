"use client";

import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { readingStates, sellers, type Reading, type Seller } from "./data";

const CURRENT_YEAR = 2026;
const years = Array.from({ length: 26 }, (_, i) => CURRENT_YEAR - i);

const field =
  "h-11 w-full rounded-lg border border-slate-300 bg-white text-sm text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none";

function Select({ id, label, value, onChange, children }: { id: string; label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-[12px] font-semibold text-ink">
        {label}
      </label>
      <span className="relative mt-1.5 block">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={`${field} cursor-pointer appearance-none px-3 pr-9`}>
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </span>
    </div>
  );
}

/** Optional vehicle context. It only produces talking points — never a payment change or a decision. */
export default function VehicleDetails() {
  const [year, setYear] = useState("Not sure");
  const [miles, setMiles] = useState("");
  const [reading, setReading] = useState<Reading>("Not sure");
  const [seller, setSeller] = useState<Seller>("Not sure yet");

  const age = year === "Not sure" ? null : CURRENT_YEAR - Number(year);
  const mileage = miles === "" ? null : Number(miles);

  const notes: string[] = [];
  if (age !== null && age >= 10) notes.push(`At ${age} years old, some lenders may offer shorter terms or not finance it.`);
  else if (age !== null) notes.push(`A ${age === 0 ? "current-year" : `${age}-year-old`} vehicle is within the age range many lenders consider — rules still vary.`);
  if (mileage !== null && mileage >= 100000) notes.push("Higher mileage can affect how a lender values the vehicle.");
  if (mileage !== null && reading !== "Verified on a document") notes.push("Ask the seller for a documented mileage reading before you apply.");
  if (seller === "Private seller") notes.push("Not every lender finances private sales. Check before agreeing a price.");
  if (seller === "Auction") notes.push("Auction purchases often need funds ready on the day. Arrange finance first.");
  if (seller === "Dealer") notes.push("Dealers may offer their own finance. Compare it with other lenders.");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_20px_40px_-28px_rgba(15,23,42,0.35)]">
      <div className="grid gap-4 sm:grid-cols-3">
        <Select id="uv-year" label="Model year" value={year} onChange={setYear}>
          <option>Not sure</option>
          {years.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </Select>
        <div>
          <label htmlFor="uv-miles" className="text-[12px] font-semibold text-ink">
            Odometer reading
          </label>
          <span className="relative mt-1.5 block">
            <input
              id="uv-miles"
              inputMode="numeric"
              placeholder="100"
              value={miles}
              onChange={(e) => setMiles(e.target.value.replace(/\D/g, "").slice(0, 7))}
              className={`${field} pr-16 pl-3 text-right placeholder:text-slate-400`}
            />
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-slate-500">miles</span>
          </span>
        </div>
        <Select id="uv-reading" label="Is that reading…" value={reading} onChange={(v) => setReading(v as Reading)}>
          {readingStates.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </Select>
        <Select id="uv-seller" label="Who is selling it?" value={seller} onChange={(v) => setSeller(v as Seller)}>
          {sellers.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
      </div>
      <p className="mt-4 text-[12px] text-slate-500">No VIN or registration is needed.</p>

      <div aria-live="polite">
        {notes.length > 0 && (
          <div className="mt-4 animate-fade-up rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="flex items-center gap-2 text-[13px] font-bold text-ink">
              <Info className="h-4 w-4 text-gold" /> What lenders may look at
            </p>
            <ul className="mt-2 space-y-1.5 text-[13px] text-slate-700">
              {notes.map((n) => (
                <li key={n} className="flex animate-fade-up gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /> {n}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-slate-500">General points only — not a lending decision, and they don&apos;t change the payment maths.</p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import RegionPicker from "@/components/ui/RegionPicker";

const CHECK_LIST = [
  "Intended market and sales channels shape the requirements",
  "Resellers without rights use Become a Parts Seller",
  "Nothing is shared or submitted",
];

type SelectOrganizationRoleSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  checkList?: string[];
  className?: string;
};

export default function SelectOrganizationRoleSection({
  id,
  eyebrow = "Participation check",
  title = "Select your organization's role",
  description = "Choose the role you can substantiate with current legal and commercial evidence. We'll show what may apply for United Kingdom.",
  checkList = CHECK_LIST,
  className = "bg-[#F6F8FB]",
}: SelectOrganizationRoleSectionProps) {
  const [role, setRole] = useState("");
  const [brandScope, setBrandScope] = useState("");
  const [market, setMarket] = useState("United Kingdom");

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-2`}>
        {/* Left Column: Title, Description, Check Bullet Points */}
        <div>
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />

          <Reveal delay={100} className="mt-8">
            <ul className="space-y-3">
              {checkList.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                  <span className="text-sm font-semibold text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Right Column: Interactive Role Check Form Card */}
        <Reveal direction="zoom" delay={150}>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
            {/* Organization's Role Field */}
            <div>
              <label
                htmlFor="oem-organization-role"
                className="block text-xs font-semibold text-slate-700"
              >
                Your organization&apos;s role
              </label>
              <div className="relative mt-2">
                <select
                  id="oem-organization-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
                >
                  <option value="" disabled>
                    Choose
                  </option>
                  <option value="manufacturer">
                    Manufacturer / Brand Owner
                  </option>
                  <option value="distributor">Authorized Distributor</option>
                  <option value="importer">
                    Importer / Regional Channel Partner
                  </option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Brand Scope Field */}
            <div className="mt-5">
              <label
                htmlFor="oem-brand-scope"
                className="block text-xs font-semibold text-slate-700"
              >
                Brand scope
              </label>
              <div className="relative mt-2">
                <select
                  id="oem-brand-scope"
                  value={brandScope}
                  onChange={(e) => setBrandScope(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
                >
                  <option value="" disabled>
                    Choose
                  </option>
                  <option value="single-brand">Single Proprietary Brand</option>
                  <option value="multi-brand">Multi-Brand Portfolio</option>
                  <option value="exclusive">Exclusive Territory License</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Intended Market Field with RegionPicker */}
            <div className="mt-5">
              <label
                htmlFor="oem-intended-market"
                className="block text-xs font-semibold text-slate-700"
              >
                Intended market
              </label>
              <div className="relative mt-2 flex items-center justify-between rounded-xl border border-slate-300 bg-[#F6F8FB] px-4 py-3">
                <span className="text-sm font-semibold text-ink">{market}</span>
                <RegionPicker
                  label="Change"
                  buttonClassName="text-xs font-bold text-[#1D5FD1] hover:underline cursor-pointer"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="button"
                className="w-full rounded-xl bg-brand py-3.5 text-center text-sm font-bold text-ink shadow-sm transition-opacity hover:opacity-90"
              >
                Check participation requirements
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

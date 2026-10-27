import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type CapabilityQualificationSectionProps = {
  id?: string;
  className?: string;
};

export default function CapabilityQualificationSection({
  id,
  className = "bg-white",
}: CapabilityQualificationSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="max-w-3xl">
          <SectionTitle
            eyebrow="Capability qualification"
            title="Select a source method available to your dealership."
            description="CSV, scheduled transfer and API options depend on account, market and implementation eligibility."
          />
        </div>

        <Reveal delay={100} className="mt-8 max-w-2xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="business-role"
                className="block text-xs font-semibold text-slate-700"
              >
                Business role
              </label>
              <div className="relative mt-1.5">
                <select
                  id="business-role"
                  defaultValue="single-rooftop"
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/20"
                >
                  <option value="single-rooftop">Single rooftop</option>
                  <option value="dealer-group">Dealer group</option>
                  <option value="franchised-dealer">Franchised dealer</option>
                  <option value="verified-agent">Verified agent</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-slate-400">
                  ▼
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="source-method"
                className="block text-xs font-semibold text-slate-700"
              >
                Method
              </label>
              <div className="relative mt-1.5">
                <select
                  id="source-method"
                  defaultValue="csv-upload"
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/20"
                >
                  <option value="csv-upload">CSV upload</option>
                  <option value="scheduled-ftp">Scheduled FTP / SFTP</option>
                  <option value="inventory-api">Direct Inventory API</option>
                  <option value="dms-integration">DMS Auto-sync</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-slate-400">
                  ▼
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import {
  ClipboardCheck,
  AlertTriangle,
  Check,
  Circle,
  HelpCircle,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type ListingFieldRow = {
  field: string;
  whyItMatters: string;
};

const LISTING_FIELDS: ListingFieldRow[] = [
  {
    field: "Manufacturer part number",
    whyItMatters: "Identifies the exact part",
  },
  {
    field: "Condition",
    whyItMatters: "New, used or refurbished — stated by you",
  },
  {
    field: "Source claim",
    whyItMatters: "OEM-classified, aftermarket or used, with evidence",
  },
  {
    field: "Imagery",
    whyItMatters: "Only images you own or are licensed to use",
  },
];

type BetterCatalogDataSectionProps = {
  id?: string;
  className?: string;
};

export default function BetterCatalogDataSection({
  id,
  className = "bg-[#F6F8FB]",
}: BetterCatalogDataSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Catalog & fitment"
          title="Better catalog data helps buyers evaluate parts."
          description="Provide accurate part numbers, condition, source claims, imagery rights and compatibility information where applicable."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Left Card: What a good listing includes (Table structure) */}
          <Reveal delay={100}>
            <div className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)] sm:p-8">
              <div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400]">
                  <ClipboardCheck className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="mt-5 text-base font-bold text-ink">
                  What a good listing includes
                </h3>

                {/* Table structure avoiding colspan/rowspan */}
                <div className="mt-6 divide-y divide-slate-100 border-t border-slate-100">
                  <div className="grid grid-cols-2 py-3 text-xs font-bold text-slate-400">
                    <span>Field</span>
                    <span>Why it matters</span>
                  </div>
                  {LISTING_FIELDS.map(({ field, whyItMatters }) => (
                    <div
                      key={field}
                      className="grid grid-cols-2 py-3.5 text-xs text-slate-700"
                    >
                      <span className="font-semibold text-ink">{field}</span>
                      <span className="text-slate-500">{whyItMatters}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Card: Compatibility needs evidence (Highlighted border) */}
          <Reveal delay={180}>
            <div className="flex h-full flex-col justify-between rounded-2xl border-2 border-brand border-t-4 border-t-brand bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-[0_16px_32px_-12px_rgba(245,180,0,0.2)] sm:p-8">
              <div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-700">
                  <AlertTriangle className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="mt-5 text-base font-bold text-ink">
                  Compatibility needs evidence, not assumptions.
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  Fitment information can depend on model year, variant, engine
                  and other specifications. A listing should make limitations
                  clear.
                </p>

                {/* Fitment Status Legend */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">
                      Verified fitment
                    </span>
                    <span className="text-xs text-slate-400">—</span>
                    <span className="text-xs font-semibold text-amber-700">
                      Candidate match
                    </span>
                    <span className="text-xs text-slate-400">—</span>
                    <span className="text-xs text-slate-600">
                      confirm details
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full border border-slate-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-600">
                      Unknown
                    </span>
                    <span className="text-xs text-slate-400">—</span>
                    <span className="text-xs text-slate-500">not a match</span>
                  </div>
                </div>

                <p className="mt-6 text-xs leading-relaxed text-slate-500 border-t border-slate-100 pt-5">
                  An OEM-classified listing doesn&apos;t imply manufacturer
                  endorsement. Buyers confirm their vehicle specifics.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

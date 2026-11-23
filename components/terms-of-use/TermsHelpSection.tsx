import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";
import { hrefFor } from "@/lib/navigation";

export default function TermsHelpSection() {
  return (
    <PolicySection id="help" title="Help">
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal as="article" className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-bold text-ink">Need an accessible format?</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
            No dedicated accessible-copy service is published yet. Use Contact DriverXtra, or see the{" "}
            <Link
              href={hrefFor("Accessibility Statement")}
              className="text-ink underline underline-offset-2 hover:text-blue-700"
            >
              Accessibility Statement
            </Link>
            .
          </p>
          <Link
            href={hrefFor("Contact DriverXtra")}
            className="mt-3 flex h-10 w-full items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            Contact DriverXtra
          </Link>
        </Reveal>

        <Reveal as="article" delay={80} className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
            <TriangleAlert aria-hidden className="h-5 w-5" />
            Safety concerns
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">Reporting is separate from these terms.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={hrefFor("Report Fraud")}
              className="inline-flex h-10 items-center rounded-full bg-brand px-4 text-sm font-bold text-ink transition-colors hover:bg-brand-dark"
            >
              Report Fraud
            </Link>
            <Link
              href={hrefFor("Report a Listing")}
              className="inline-flex h-10 items-center rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              Report a Listing
            </Link>
          </div>
        </Reveal>
      </div>
    </PolicySection>
  );
}

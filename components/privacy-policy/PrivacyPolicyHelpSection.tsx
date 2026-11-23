import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";
import { hrefFor } from "@/lib/navigation";

const outline =
  "inline-flex h-10 items-center justify-center rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-ink";

export default function PrivacyPolicyHelpSection() {
  return (
    <PolicySection id="help" title="Get help with privacy information">
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal as="article" className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-bold text-ink">Questions and requests</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
            Use Privacy Choices to make a request, or Contact DriverXtra for general questions. No privacy email or phone
            line is published yet.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Privacy Choices", "Contact DriverXtra"].map((l) => (
              <Link key={l} href={hrefFor(l)} className={outline}>
                {l}
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal as="article" delay={80} className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-bold text-ink">Spotted a mistake on this page?</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
            This is separate from exercising your privacy rights.
          </p>
          <Link href={hrefFor("Contact DriverXtra")} className={`${outline} mt-3 w-full`}>
            Report an error in this privacy page
          </Link>
        </Reveal>
      </div>
    </PolicySection>
  );
}

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";
import { hrefFor } from "@/lib/navigation";
import { relatedLinks } from "./data";

const pill =
  "inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-ink";

export default function ComplianceHelpSection() {
  return (
    <PolicySection id="help" title="Need help understanding where to find the correct documents?">
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal as="article" className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="relative aspect-[8/3]">
            <Image
              src="/images/compliance-disclosures/help-support.webp"
              alt="Two colleagues celebrating at a desk with a laptop"
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="text-base font-bold text-ink">Help and contact</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              General navigation help only — not legal or financial advice.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Help Center", "Contact DriverXtra"].map((l) => (
                <Link key={l} href={hrefFor(l)} className={pill}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal as="article" delay={80} className="self-start rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-base font-bold text-ink">Related legal pages</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {relatedLinks.map((l) => (
              <li key={l}>
                <Link href={hrefFor(l)} className={pill}>
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </PolicySection>
  );
}

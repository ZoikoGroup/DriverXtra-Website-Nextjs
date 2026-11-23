import Image from "next/image";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";
import { hrefFor } from "@/lib/navigation";

const pill =
  "inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-ink";

export default function OtherWaysSection() {
  return (
    <PolicySection id="other-ways" title="Other ways to access this information or task">
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal as="article" className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="relative aspect-[8/3]">
            <Image
              src="/images/accessibility-statement/help-support.webp"
              alt="Two colleagues celebrating at a desk with a laptop"
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="text-base font-bold text-ink">Help and contact</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              If something is hard to use, the Help Center and Contact DriverXtra are alternatives. No dedicated
              accessibility phone line or email is published in this version.
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

        <Reveal as="article" delay={80} className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="flex items-center gap-2 text-base font-bold text-ink">
            <TriangleAlert aria-hidden className="h-4 w-4" />
            Urgent safety issue?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Need help with an urgent safety issue? Use the separate safety reporting route.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Report Fraud", "Report a Listing"].map((l) => (
              <Link key={l} href={hrefFor(l)} className={pill}>
                {l}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </PolicySection>
  );
}

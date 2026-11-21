import Image from "next/image";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";
import { hrefFor } from "@/lib/navigation";
import { relatedLinks } from "./data";

const pill =
  "inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-ink";

export default function PrivacyHelpSection() {
  return (
    <PolicySection id="help" title="Need assistance with a privacy request?">
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal as="article" className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="relative aspect-[8/3]">
            <Image
              src="/images/privacy-choices/help-support.webp"
              alt="Two colleagues celebrating at a desk with a laptop"
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="text-base font-bold text-ink">Help</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              No dedicated privacy contact is published in this version. Use the Help Center or Contact DriverXtra.
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
          <h3 className="flex items-center gap-2 text-base font-bold text-ink">
            <TriangleAlert className="h-4 w-4" />
            Stay safe
          </h3>
          <h4 className="mt-4 text-sm font-bold text-ink">Related documents</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {relatedLinks.map((l) => (
              <li key={l.label}>
                <Link href={hrefFor(l.page)} className={pill}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </PolicySection>
  );
}

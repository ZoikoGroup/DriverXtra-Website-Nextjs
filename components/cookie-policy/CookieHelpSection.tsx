import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { hrefFor } from "@/lib/navigation";
import PolicySection from "@/components/legal/PolicySection";
import { relatedLinks } from "./data";

const pill =
  "inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-ink";

const relatedLabel: Record<string, string> = {
  "Privacy Policy": "Read the Privacy Policy",
  "Privacy Choices": "Manage Privacy Choices",
};

export default function CookieHelpSection() {
  return (
    <PolicySection id="help" title="Need help with cookie settings?">
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal as="article" className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="relative aspect-[8/3]">
            <Image
              src="/images/cookie-policy/help-support.webp"
              alt="Two colleagues celebrating at a desk with a laptop"
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="text-base font-bold text-ink">Help and support</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Use the Help Center or Contact DriverXtra. No dedicated privacy contact is published in this version.
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
          <h3 className="text-base font-bold text-ink">Related</h3>
          <ul className="mt-4 flex flex-col items-start gap-2">
            {relatedLinks.map((l) => (
              <li key={l}>
                <Link href={hrefFor(l)} className={pill}>
                  {relatedLabel[l] ?? l}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">These documents are separate from this policy.</p>
        </Reveal>
      </div>
    </PolicySection>
  );
}

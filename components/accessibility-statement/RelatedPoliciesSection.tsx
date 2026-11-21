import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";
import { hrefFor } from "@/lib/navigation";
import { relatedLinks } from "./data";

export default function RelatedPoliciesSection() {
  return (
    <PolicySection id="related" title="Related policies and help">
      <Reveal as="ul" className="flex flex-wrap gap-2">
        {relatedLinks.map((l) => (
          <li key={l}>
            <Link
              href={hrefFor(l)}
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-ink"
            >
              {l}
            </Link>
          </li>
        ))}
      </Reveal>
    </PolicySection>
  );
}

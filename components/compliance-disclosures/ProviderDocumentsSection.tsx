import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";

export default function ProviderDocumentsSection() {
  return (
    <PolicySection id="provider-documents" title="Review the participating provider's current documents">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <Reveal direction="zoom" className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src="/images/compliance-disclosures/provider-documents.webp"
            alt="Contract documents, a calculator and a pen on a desk"
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="text-[15px] leading-relaxed text-slate-600">
            Lenders, insurers, sellers and service providers publish their own terms. Those documents — not this page —
            set the binding terms of your agreement with them.
          </p>
          <p className="mt-4 text-[13px] font-medium text-ink">
            Provider document links appear on listings, quotes and bookings once verified. Links to other sites open with
            a notice that you&apos;re leaving DriverXtra.
          </p>
        </Reveal>
      </div>
    </PolicySection>
  );
}

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";

export default function CookiesSection() {
  return (
    <PolicySection id="cookies" title="Cookies and similar technologies">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <Reveal direction="zoom" className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src="/images/privacy-choices/cookie-settings-laptop.webp"
            alt="A laptop open on a desk beside a plant and a mug"
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="text-[15px] leading-relaxed text-ink">
            Cookie Settings control device storage. They&apos;re separate from data-rights requests.
          </p>
        </Reveal>
      </div>
    </PolicySection>
  );
}

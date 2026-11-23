import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";

export default function BrowsersDevicesSection() {
  return (
    <PolicySection id="browsers" title="Browsers and devices">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <Reveal direction="zoom" className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src="/images/cookie-policy/browser-settings.webp"
            alt="A laptop open on a desk, showing browser settings"
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="text-[15px] leading-relaxed text-slate-600">
            Most browsers let you view and clear site data, and block storage for specific sites. Look for{" "}
            <strong className="text-ink">Privacy</strong>, <strong className="text-ink">Site settings</strong> or{" "}
            <strong className="text-ink">Cookies and site data</strong> in your browser&apos;s settings. Steps vary by
            browser and version.
          </p>
          <p className="mt-4 text-sm font-medium text-ink">
            Blocking all storage may stop features like your region choice or saved vehicles from working.
          </p>
        </Reveal>
      </div>
    </PolicySection>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock, FileText, Layers, Lock, SlidersHorizontal, type LucideIcon } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import { partnerIcons } from "@/components/partner-program/icons";
import { PartnerHero } from "@/components/partner-program/sections";
import EventCatalog from "@/components/webhooks/EventCatalog";
import { deliverySteps, envelopeFields, faqs, securitySteps, subscriptionSteps, troubleshooting, versions } from "@/components/webhooks/data";

export const metadata: Metadata = {
  title: "Webhooks — DriverXtra",
  description: "Learn how approved DriverXtra integrations may deliver event notifications to a callback you control.",
};

const card = "rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]";

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-brand transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand group-hover:text-ink">
      <Icon className="h-4 w-4" />
    </span>
  );
}

/** A card with a photo on top, used for delivery semantics and failure handling. */
function ImageCard({ image, alt, icon, title, delay, children }: { image: string; alt: string; icon: LucideIcon; title: string; delay: number; children: React.ReactNode }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className={`group h-full overflow-hidden ${card}`}>
        <div className="relative aspect-[324/120] overflow-hidden">
          <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        </div>
        <div className="p-5">
          <IconTile icon={icon} />
          <h3 className="mt-4 text-[15px] font-bold text-ink transition-colors group-hover:text-gold">{title}</h3>
          {children}
        </div>
      </article>
    </Reveal>
  );
}

export default function WebhooksPage() {
  return (
    <>
      <PartnerHero
        eyebrow="Webhooks"
        title="Webhooks"
        text="Learn how approved DriverXtra integrations may deliver event notifications to a callback you control."
        badges={[
          { icon: "zap", title: "Event notifications", text: "sent to a callback you control" },
          { icon: "shield", title: "Signed deliveries", text: "verify before you process" },
          { icon: "layers", title: "Idempotent receivers", text: "expect duplicates and delays" },
        ]}
        image={{ src: "/images/webhooks/hero-webhooks.webp", alt: "Server racks with green status lights and fibre cabling", width: 623, height: 539 }}
        actions={{
          primary: { label: "Browse event catalog", href: "#event-catalog" },
          secondary: { label: "Request technical access", href: hrefFor("API Partners") },
        }}
      />

      <section id="how-delivery-works" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="How delivery works" title="From event to endpoint — with clear controls" />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {deliverySteps.map(({ title, text, icon }, i) => {
              const Icon = partnerIcons[icon];
              return (
                <Reveal as="li" key={title} delay={i * 100} className="relative h-full">
                  {i < deliverySteps.length - 1 && <span aria-hidden className="absolute top-1/2 -right-6 hidden h-px w-6 bg-brand lg:block" />}
                  <div className={`group h-full p-4 ${card}`}>
                    <IconTile icon={Icon} />
                    <h3 className="mt-4 text-[13px] font-bold text-ink transition-colors group-hover:text-gold">
                      {i + 1}. {title}
                    </h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-slate-600">{text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section id="event-catalog" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Event catalog"
            title="Approved event families"
            description="Only explicitly approved public summaries are shown. Restricted families don't reveal their event names."
          />
          <EventCatalog />
        </div>
      </section>

      <section id="envelope" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Envelope"
            title="What a notification looks like"
            description="Annotated illustrative specimen with synthetic values. Field names are not a production contract."
          />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
            <Reveal direction="right">
              <div className="group relative aspect-[356/216] overflow-hidden rounded-2xl">
                <Image
                  src="/images/webhooks/notification-envelope.webp"
                  alt="A woman reading on her laptop at a desk"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
            <ol className="space-y-2.5">
              {envelopeFields.map(({ title, text }, i) => (
                <Reveal as="li" key={title} delay={i * 80}>
                  <div className="group flex gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-md">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-[11px] font-bold text-ink transition-all duration-300 group-hover:scale-110 group-hover:bg-ink group-hover:text-brand">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-[13px] font-bold text-ink">{title}</h3>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-slate-600">{text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="delivery-semantics" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Delivery semantics" title="Design your receiver for real-world delivery" />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <ImageCard image="/images/webhooks/duplicates-and-order.webp" alt="Reports with charts spread across a desk" icon={Layers} title="Duplicates, delays and order" delay={0}>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                Your receiver should handle duplicate, delayed or out-of-order notifications unless a published contract states otherwise.
              </p>
              <ul className="mt-4 space-y-2">
                {["Deduplicate on the event ID", "Don't assume events arrive in order", "Acknowledge quickly, process asynchronously"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-[13px] text-ink">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600" /> {t}
                  </li>
                ))}
              </ul>
            </ImageCard>
            <ImageCard image="/images/webhooks/acknowledgement.webp" alt="Printed reports and a laptop on a desk" icon={Check} title="Acknowledgement" delay={120}>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                Transport receipt and business processing are separate. The accepted response class and timeout are set by the published contract.
              </p>
              <dl className="mt-4 space-y-2 text-[13px]">
                {["Accepted response", "Timeout"].map((t) => (
                  <div key={t} className="grid grid-cols-[140px_1fr] gap-2">
                    <dt className="font-semibold text-ink">{t}</dt>
                    <dd className="text-slate-600">Not yet published</dd>
                  </div>
                ))}
              </dl>
            </ImageCard>
          </div>
        </div>
      </section>

      <section id="security" className="scroll-mt-28 bg-white py-16">
        <div className={`${container} grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]`}>
          <div>
            <SectionTitle eyebrow="Security" title="Validate the sender before processing an event" />
            <ol className="mt-6">
              {securitySteps.map(({ title, text }, i) => (
                <Reveal as="li" key={title} delay={i * 90} className="group relative flex gap-4 pb-5 last:pb-0">
                  {i < securitySteps.length - 1 && <span aria-hidden className="absolute top-8 bottom-0 left-[13px] w-px bg-slate-200" />}
                  <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-ink transition-all duration-300 group-hover:scale-110 group-hover:bg-ink group-hover:text-brand">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{title}</h3>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-slate-600">{text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal direction="left" delay={150}>
            <div className="group relative aspect-[328/216] overflow-hidden rounded-2xl">
              <Image
                src="/images/webhooks/validate-sender.png"
                alt="A phone and paperwork on a desk"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="subscriptions" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Subscriptions"
            title="How a subscription is set up"
            description="Subscriptions depend on program eligibility, your organization and environment scopes. There's no universal self-serve creation."
          />
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {subscriptionSteps.map(({ title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 90} className="h-full">
                <div className={`group flex h-full flex-col p-4 ${card}`}>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-[13px] font-bold text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-ink">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-[13px] font-bold text-ink">{title}</h3>
                  <p className="mt-1 flex-1 text-[12px] text-slate-600">{text}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-[12px] text-slate-500">
                    <span className="h-2 w-2 rounded-full border border-slate-400" /> Access-controlled
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={300}>
            <Link
              href={hrefFor("API Partners")}
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition-colors hover:text-gold"
            >
              Request access through the Developer Hub <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="retries-replay-testing" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Retries, replay & testing" title="When deliveries fail" />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <ImageCard image="/images/webhooks/retries-and-replay.webp" alt="A team meeting in an open-plan office" icon={Clock} title="Retries and replay" delay={0}>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                An <strong className="font-semibold text-ink">event</strong> can have several <strong className="font-semibold text-ink">delivery attempts</strong>. Retry,
                replay or support timing is not published for this integration. Refer to your approved agreement.
              </p>
            </ImageCard>
            <ImageCard image="/images/webhooks/testing.webp" alt="Printed reports and a laptop on a desk" icon={SlidersHorizontal} title="Testing" delay={120}>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                Test events use synthetic fixtures in a non-production environment, where one has been provisioned for your organization. There&apos;s no &ldquo;Send test&rdquo;
                control on this page.
              </p>
            </ImageCard>
          </div>

          <Reveal delay={150}>
            <h3 className="mt-10 text-[15px] font-bold text-ink">Troubleshooting deliveries</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                    {["Symptom", "Likely class", "Safe next step"].map((h) => (
                      <th key={h} className="w-1/3 px-3 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {troubleshooting.map(([symptom, cls, step]) => (
                    <tr key={symptom} className="border-b border-slate-100 transition-colors hover:bg-brand-light/50">
                      <th scope="row" className="px-3 py-3 font-semibold text-ink">
                        {symptom}
                      </th>
                      <td className="px-3 py-3 text-slate-700">{cls}</td>
                      <td className="px-3 py-3 text-slate-700">
                        {step.endsWith("Platform Status.") ? (
                          <>
                            Check subscription status, then{" "}
                            <Link href={hrefFor("Platform Status")} className="text-blue-700 underline underline-offset-4 transition-colors hover:text-gold">
                              Platform Status
                            </Link>
                            .
                          </>
                        ) : (
                          step
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="privacy-and-versions" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Privacy & versions" title="Minimal data, governed change" />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <Reveal className="h-full">
              <article className={`group h-full p-5 ${card}`}>
                <IconTile icon={Lock} />
                <h3 className="mt-4 text-[15px] font-bold text-ink transition-colors group-hover:text-gold">Data minimization</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  Payloads carry the minimum needed. Sensitive event families need a separate review. Retention is set by policy and your agreement.
                </p>
              </article>
            </Reveal>
            <Reveal delay={120} className="h-full">
              <article className={`group h-full p-5 ${card}`}>
                <IconTile icon={FileText} />
                <h3 className="mt-4 text-[15px] font-bold text-ink transition-colors group-hover:text-gold">Versions and changelog</h3>
                <table className="mt-3 w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      {["Family", "Version", "Support window"].map((h) => (
                        <th key={h} className="py-2 pr-3 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {versions.map(([family, version, window]) => (
                      <tr key={family} className="border-b border-slate-100 last:border-0">
                        <td className="py-2.5 pr-3 text-ink">{family}</td>
                        <td className="py-2.5 pr-3 text-ink">{version}</td>
                        <td className="py-2.5 text-slate-600">{window}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Link
                  href={hrefFor("API Documentation")}
                  className="group/link mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-700 transition-colors hover:text-gold"
                >
                  Versioning policy in API Documentation <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqSection id="webhooks-faqs" eyebrow="FAQ" title="Webhooks questions" faqs={faqs} className="bg-white" />
    </>
  );
}

import type { ReactNode } from "react";
import {
  Check,
  CircleCheck,
  ClipboardList,
  Crosshair,
  FileText,
  Info,
  Landmark,
  Lock,
  MessageSquare,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import SectionTitle, { container } from "./SectionTitle";

const levels: { badge: string | LucideIcon; title: string; text: string }[] = [
  { badge: "L1", title: "Contact Verified", text: "Email and phone verification for limited account actions." },
  { badge: "L2", title: "Identity Verified", text: "Government-ID and identity checks for eligible listing or messaging activities." },
  { badge: "L3", title: "Verified Seller", text: "Identity plus applicable ownership or title evidence for vehicle sellers." },
  { badge: "L4", title: "Business Verified", text: "Business registration, authorized representative and relevant operating evidence." },
  { badge: "L5", title: "Certified Partner", text: "Enhanced monitoring, service-level commitments and compliance controls for approved partners." },
  { badge: Crosshair, title: "Parts integrity", text: "Seller validation, fitment information, traceability and anti-counterfeit controls for higher-risk categories." },
  { badge: ClipboardList, title: "Provider eligibility", text: "Licensing and insurance checks where a service or jurisdiction requires them." },
  { badge: Lock, title: "Transaction evidence", text: "Messages, documents, actions and dispute evidence are recorded within governed workflows where applicable." },
];

const dispute = [
  { title: "Buyer opens a dispute", note: "Part received does not match the listed fitment.", date: "1 Oct", icon: MessageSquare, state: "done" },
  { title: "Evidence attached", note: "Photos, VIN match record and order history added.", date: "1 Oct", icon: FileText, state: "done" },
  { title: "Seller responds within the window", note: "Secure messaging; document exchange with redaction.", date: "3 Oct", icon: MessageSquare, state: "done" },
  { title: "Under review", note: "Reviewed against policy and the evidence trail.", date: "Now", icon: Scale, state: "current" },
  { title: "Resolution and record", note: "Outcome recorded; escalation route if needed.", date: "Next", icon: CircleCheck, state: "next" },
] as const;

function Badge({ tone, icon: Icon, tip, children }: { tone: "green" | "grey" | "blue" | "outline"; icon?: LucideIcon; tip: string; children: ReactNode }) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    grey: "bg-slate-50 text-slate-600 ring-slate-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    outline: "bg-white text-slate-700 ring-slate-300",
  };
  return (
    <span
      tabIndex={0}
      className={`group/badge relative inline-flex cursor-help items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 transition-transform duration-300 outline-none hover:scale-105 focus-visible:scale-105 ${tones[tone]}`}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {children}
      <span className="pointer-events-none absolute right-0 bottom-full z-10 mb-2 w-52 translate-y-1 rounded-lg bg-navy px-3 py-2 text-left text-[11px] leading-snug font-normal text-white opacity-0 shadow-xl transition-all duration-300 group-hover/badge:translate-y-0 group-hover/badge:opacity-100 group-focus-visible/badge:translate-y-0 group-focus-visible/badge:opacity-100">
        {tip}
      </span>
    </span>
  );
}

export default function Trust() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white md:py-24">
      <BgImage src="/images/about/trust-background.webp" position="top center" />

      <div className={`${container} relative`}>
        <SectionTitle
          dark
          eyebrow="Trust as infrastructure"
          title="Trust is not a badge. It is an operating system."
          description="DriverXtra uses layered verification, marketplace controls, evidence, monitoring and structured resolution workflows to reduce fraud and improve transaction confidence. The required verification level depends on the action being taken, the participant's role and applicable local rules."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map(({ badge: B, title, text }, i) => (
            <Reveal key={title} delay={(i % 4) * 80}>
              <div className="group h-full rounded-xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/50 hover:bg-white/[0.09]">
                <p className="flex items-center gap-3 text-sm font-semibold">
                  {typeof B === "string" ? (
                    <span className="grid h-8 w-8 place-items-center rounded-md bg-brand text-xs font-bold text-ink transition-transform duration-500 group-hover:scale-110">
                      {B}
                    </span>
                  ) : (
                    <span className="grid h-8 w-8 place-items-center rounded-md border border-brand/50 text-brand transition-transform duration-500 group-hover:scale-110 group-hover:bg-brand group-hover:text-ink">
                      <B className="h-4 w-4" />
                    </span>
                  )}
                  {title}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Reveal delay={100}>
            <div className="h-full rounded-2xl bg-white p-6 text-ink transition-shadow duration-500 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]">
              <h3 className="text-lg font-bold">A structured dispute, step by step</h3>
              <p className="mt-1 text-[13px] text-slate-500">
                Example timeline. Messages, documents and decisions stay attached to the transaction record.
              </p>
              <ol className="mt-5">
                {dispute.map(({ title, note, date, icon: Icon, state }, i) => (
                  <li key={title} className="group relative flex gap-3 pb-5 last:pb-0">
                    {i < dispute.length - 1 && <span className="absolute top-8 bottom-0 left-[13px] w-px bg-slate-200" />}
                    <span
                      className={`relative grid h-7 w-7 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
                        state === "done"
                          ? "bg-emerald-50 text-emerald-600"
                          : state === "current"
                            ? "bg-brand text-ink"
                            : "border border-dashed border-slate-300 text-slate-400"
                      }`}
                    >
                      {state === "current" && <span className="absolute inset-0 animate-ping rounded-full bg-brand/40" />}
                      <Icon className="relative h-3.5 w-3.5" />
                    </span>
                    <div className="flex-1 transition-transform duration-300 group-hover:translate-x-1">
                      <p className="flex justify-between gap-3 text-sm font-semibold">
                        {title}
                        <span className="text-[11px] font-normal text-slate-400">{date}</span>
                      </p>
                      <p className="text-xs text-slate-500">{note}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="h-full rounded-2xl bg-white p-6 text-ink transition-shadow duration-500 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]">
              <h3 className="text-lg font-bold">How trust shows up in the product</h3>
              <p className="mt-1 text-[13px] text-slate-500">
                Every state is written in words, not just colour. Hover or focus a badge for its meaning.
              </p>
              <ul className="mt-5 space-y-2">
                <Row label="Verification badge">
                  <Badge tone="green" icon={ShieldCheck} tip="The seller passed identity plus ownership or title checks.">
                    L3 Verified Seller
                  </Badge>
                </Row>
                <Row label="Vehicle history">
                  <Badge tone="green" icon={FileText} tip="A third-party history report is attached to this listing.">
                    History report available
                  </Badge>
                </Row>
                <Row label="Parts fitment">
                  <Badge tone="green" icon={Check} tip="Matched to your vehicle by VIN, make, model, year and trim.">
                    Fitment Verified
                  </Badge>
                  <Badge tone="grey" icon={Info} tip="Fitment could not be confirmed — check with the seller before buying.">
                    Fitment Unverified
                  </Badge>
                </Row>
                <Row label="Paid placement">
                  <Badge tone="outline" tip="This listing paid for higher placement. It is labeled and separated from organic results.">
                    Sponsored
                  </Badge>
                </Row>
                <Row label="Finance & insurance">
                  <Badge tone="blue" icon={Landmark} tip="Offered by an authorized third-party provider, not DriverXtra.">
                    Provided by regulated partner
                  </Badge>
                </Row>
                <Row label="Report a problem">
                  <button
                    type="button"
                    className="rounded-full border border-slate-300 px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-ink"
                  >
                    Report listing
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lg"
                  >
                    Report fraud
                  </button>
                </Row>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 px-3 py-2.5 transition-colors duration-300 hover:border-slate-300 hover:bg-slate-50">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="flex flex-wrap gap-1.5">{children}</span>
    </li>
  );
}

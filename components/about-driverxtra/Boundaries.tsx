import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const questions = [
  {
    badge: "Generally no",
    q: "Does DriverXtra own the vehicles listed?",
    a: "Generally no. Listings are supplied by participating private sellers, dealers, fleets or other eligible businesses unless a specific offering clearly states otherwise.",
  },
  {
    badge: "No",
    q: "Does DriverXtra set vehicle or parts prices?",
    a: "No. Sellers and providers set their own commercial terms, subject to marketplace rules and applicable law. DriverXtra may provide pricing context or tools.",
  },
  {
    badge: "No",
    q: "Does DriverXtra lend money?",
    a: "No. Financing is provided by third-party regulated partners. DriverXtra may facilitate comparison, pre-qualification or referral where permitted.",
  },
  {
    badge: "Partner-provided",
    q: "Does DriverXtra sell insurance?",
    a: "Insurance products are provided by third-party regulated providers. Availability, eligibility and terms vary by market.",
  },
  {
    badge: "No",
    q: "Does DriverXtra perform vehicle repairs?",
    a: "No. Services are delivered by participating service providers, with verification and credential requirements applied where relevant.",
  },
  {
    badge: "No",
    q: "Does DriverXtra guarantee every transaction?",
    a: "No. DriverXtra reduces risk through verification, controls and resolution processes, but users must still review listings, disclosures and provider terms.",
  },
  {
    badge: "Depends on market",
    q: "Is escrow always available?",
    a: "No. Secure-payment and escrow options depend on transaction type, provider support and jurisdiction.",
    soft: true,
  },
];

export default function Boundaries() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className={`${container} grid gap-10 lg:grid-cols-[1fr_1.7fr]`}>
        <div className="lg:sticky lg:top-40 lg:self-start">
          <SectionTitle
            eyebrow="Our role in the ecosystem"
            title="Infrastructure, not inventory."
            description="DriverXtra does not need to own the vehicle, manufacture the part, perform the repair, issue the insurance policy or provide the loan to make the transaction better. Our role is to connect the right participants, make important information visible, apply marketplace rules, support secure workflows and create a more reliable evidence trail."
          />
        </div>

        <div className="space-y-3">
          {questions.map(({ badge, q, a, soft }, i) => (
            <Reveal key={q} delay={i * 60} direction="left">
              <div className="group grid gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-lg sm:grid-cols-[120px_1fr] sm:p-5">
                <span
                  className={`h-fit w-fit rounded-md px-2.5 py-1 text-[11px] font-bold transition-transform duration-300 group-hover:scale-105 ${
                    soft ? "border border-brand/60 bg-brand-light text-gold" : "bg-navy text-white"
                  }`}
                >
                  {badge}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-ink">{q}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

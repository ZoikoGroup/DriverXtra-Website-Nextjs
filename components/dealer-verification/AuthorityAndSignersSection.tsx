import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type AuthorityCard = {
  title: string;
  description: string;
};

const AUTHORITY_ROLES: AuthorityCard[] = [
  {
    title: "Owner or principal",
    description: "May confirm ownership and authorize others.",
  },
  {
    title: "Authorized representative",
    description: "Acts on the dealership's behalf with documented authority.",
  },
  {
    title: "Staff member",
    description: "May prepare information but not sign without authority.",
  },
];

type AuthorityAndSignersSectionProps = {
  id?: string;
  className?: string;
};

export default function AuthorityAndSignersSection({
  id,
  className = "bg-[#F6F8FB]",
}: AuthorityAndSignersSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle eyebrow="Who can submit" title="Authority and signers" />

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {AUTHORITY_ROLES.map(({ title, description }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="group flex h-full flex-col justify-start rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <h3 className="text-base font-bold text-ink">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

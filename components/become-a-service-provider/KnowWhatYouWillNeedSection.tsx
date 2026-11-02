import {
  Building2,
  MapPin,
  Wrench,
  ShieldCheck,
  FileText,
  Lock,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type RequirementCard = {
  title: string;
  description: string;
  icon: typeof Building2;
  isDark?: boolean;
};

const REQUIREMENTS_CARDS: RequirementCard[] = [
  {
    title: "Business details",
    description:
      "Registered business name, number and an authorized representative.",
    icon: Building2,
  },
  {
    title: "Branch locations",
    description: "Address and operating hours for each site you'll serve from.",
    icon: MapPin,
  },
  {
    title: "Service categories",
    description: "The services each branch is equipped to provide.",
    icon: Wrench,
  },
  {
    title: "Technician credentials",
    description:
      "Qualifications where a category requires them, with expiry dates.",
    icon: ShieldCheck,
  },
  {
    title: "Insurance evidence",
    description: "Where your market requires it, with validity dates.",
    icon: FileText,
  },
  {
    title: "Your evidence stays private",
    description:
      "Business, location and professional credentials may be reviewed separately. Documents are never shown publicly.",
    icon: Lock,
    isDark: true,
  },
];

type KnowWhatYouWillNeedSectionProps = {
  id?: string;
  className?: string;
};

export default function KnowWhatYouWillNeedSection({
  id,
  className = "bg-white",
}: KnowWhatYouWillNeedSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Requirements"
          title="Know what you will need before applying."
          description="Lists are configured by market and category. Some items only apply to certain services."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REQUIREMENTS_CARDS.map(
            ({ title, description, icon: Icon, isDark }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div
                  className={`group flex h-full flex-col justify-between rounded-2xl p-6 transition-all duration-300 ${
                    isDark
                      ? "bg-[#0B1220] text-white shadow-xl hover:border-slate-700"
                      : "border border-slate-200/80 bg-white text-ink hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]"
                  }`}
                >
                  <div>
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-xl ${
                        isDark
                          ? "bg-amber-500 text-ink"
                          : "bg-[#0B1220] text-[#F5B400]"
                      }`}
                    >
                      <Icon className="h-5 w-5 stroke-[2]" />
                    </div>
                    <h3
                      className={`mt-5 text-sm font-bold ${
                        isDark ? "text-white" : "text-ink"
                      }`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`mt-2 text-xs leading-relaxed ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

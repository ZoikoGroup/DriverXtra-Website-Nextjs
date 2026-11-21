import Link from "next/link";
import { FileText, ShieldCheck, SlidersHorizontal } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { hrefFor } from "@/lib/navigation";

const choices = [
  {
    id: undefined,
    title: "Manage choices",
    body: "Opt-outs and preferences where they apply.",
    href: "#cookies",
    icon: SlidersHorizontal,
  },
  {
    id: "data-rights",
    title: "Request data rights",
    body: "Access, delete, correct and more, where available.",
    href: hrefFor("Contact DriverXtra"),
    icon: FileText,
  },
  {
    id: undefined,
    title: "Read the Privacy Policy",
    body: "How personal information is handled.",
    href: hrefFor("Privacy Policy"),
    icon: ShieldCheck,
  },
];

/** Three entry points at the top of the page. */
export default function YourChoicesSection() {
  return (
    <section id="choices" aria-label="Your choices" className="scroll-mt-28 border-b border-slate-200 pb-10">
      <ul className="grid gap-3 sm:grid-cols-3">
        {choices.map(({ id, title, body, href, icon: Icon }, i) => (
          <Reveal as="li" key={title} delay={i * 80}>
            <Link
              id={id}
              href={href}
              className="flex h-full scroll-mt-28 gap-2.5 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-ink"
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-dark" />
              <span>
                <span className="block text-sm font-bold text-ink">{title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-500">{body}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
      <p id="how-to-submit" className="mt-3 scroll-mt-28 text-xs leading-relaxed text-slate-500">
        Review your options, choose a request, and follow the instructions shown. Some choices may be subject to
        verification, legal conditions or exceptions.
      </p>
    </section>
  );
}

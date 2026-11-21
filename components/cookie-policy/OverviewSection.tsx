import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";

const cards = [
  {
    title: "First party and third party",
    body: "First-party technologies are set by the site you're visiting. Third-party technologies are set by another organization. Every item on this prototype is first party.",
  },
  {
    title: "Cookies and similar storage",
    body: "Cookies are small files a site stores in your browser. Local storage and session storage do a similar job: session storage clears when you close the tab; local storage stays until you clear it.",
  },
];

export default function OverviewSection() {
  return (
    <PolicySection id="overview" title="Overview" intro="Cookie Settings are separate from this policy. Reading this page doesn't accept anything.">
      <div className="grid gap-5 sm:grid-cols-2">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 80} className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-bold text-ink">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.body}</p>
          </Reveal>
        ))}
      </div>
    </PolicySection>
  );
}

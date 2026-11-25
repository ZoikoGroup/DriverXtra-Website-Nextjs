import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export default function MessagesHeroSection() {
  return (
    <section id="messages" className="bg-navy py-10 text-white md:py-12">
      <div className={container}>
        <Reveal>
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">Messages</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-300 sm:text-base">
            Conversations about your listings stay here.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

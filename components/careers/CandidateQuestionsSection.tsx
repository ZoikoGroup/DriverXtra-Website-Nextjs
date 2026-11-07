"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface FaqItem {
  id: string;
  q: string;
  a: string;
}

const candidateFaqs: FaqItem[] = [
  {
    id: "cq-1",
    q: "Where can I find open roles?",
    a: "Current approved vacancies, if available for your selected location, appear on this page. If none are verified, we will show a clear no-open-roles message.",
  },
  {
    id: "cq-2",
    q: "Are the jobs listed here current?",
    a: "Yes. All listings displayed on this page are actively synchronized with our human resources applicant tracking system and regularly verified.",
  },
  {
    id: "cq-3",
    q: "Can I apply without creating a DriverXtra account?",
    a: "Yes. Applications are processed through our external recruiting portal where you can submit your details and CV directly without a consumer platform account.",
  },
  {
    id: "cq-4",
    q: "What happens when I choose Apply?",
    a: "You will be securely redirected to the authorized job description and application form hosted by our enterprise recruitment partner.",
  },
  {
    id: "cq-5",
    q: "How can I confirm an application was received?",
    a: "Upon successful submission, you will receive an automated confirmation email from our recruiting portal containing your candidate reference ID.",
  },
  {
    id: "cq-6",
    q: "Can I check my application status here?",
    a: "Status updates are managed directly through candidate communication emails and your portal profile, not on the public marketing site.",
  },
  {
    id: "cq-7",
    q: "Do you accept general resumes?",
    a: "We recommend applying directly to specific open roles to ensure your qualifications are reviewed by the appropriate department hiring team.",
  },
  {
    id: "cq-8",
    q: "Are all roles remote?",
    a: "Work arrangements vary by role. Each listing specifies whether the position is On-site, Hybrid, or eligible for Remote within the designated country.",
  },
  {
    id: "cq-9",
    q: "Can you confirm visa sponsorship or work authorization support?",
    a: "Sponsorship eligibility is determined on a per-role and regional basis. Detailed work authorization criteria are listed in individual job postings.",
  },
  {
    id: "cq-10",
    q: "Where do salary and benefits details come from?",
    a: "Compensation ranges and statutory benefits are formulated by our People and Total Rewards teams in compliance with local market regulations.",
  },
  {
    id: "cq-11",
    q: "Why has a job disappeared?",
    a: "A listing is removed once the application window closes, sufficient qualified candidates have been shortlisted, or the vacancy has been filled.",
  },
  {
    id: "cq-12",
    q: "Can I get help using the application process?",
    a: "Candidates requiring accessibility accommodations or experiencing technical issues can request support via our accommodation channels.",
  },
  {
    id: "cq-13",
    q: "How is candidate information handled?",
    a: "All resume data and personal information are processed in strict compliance with GDPR, local employment privacy laws, and our Candidate Privacy Notice.",
  },
  {
    id: "cq-14",
    q: "Do I need to pay to apply?",
    a: "Never. DriverXtra never charges application fees, processing costs, or security deposits for interviews or onboarding.",
  },
  {
    id: "cq-15",
    q: "How can I report a suspicious recruiter?",
    a: "If someone contacts you claiming to represent DriverXtra from an unverified domain or requests money, report them to our security team via Report Fraud.",
  },
  {
    id: "cq-16",
    q: "Where can I ask general company questions?",
    a: "General company information can be found in our About DriverXtra section or through our public Contact DriverXtra pathways.",
  },
  {
    id: "cq-17",
    q: "How do I learn about the organization?",
    a: "Explore our About DriverXtra and Developer Hub pages to learn about our corporate mission, platform infrastructure, and leadership principles.",
  },
  {
    id: "cq-18",
    q: "Does viewing a vacancy guarantee an interview or offer?",
    a: "No. All applications undergo comprehensive evaluation against role requirements, team capacity, and candidate qualifications.",
  },
];

export default function CandidateQuestionsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className={`${container} grid gap-10 lg:grid-cols-[1.1fr_1.9fr] lg:gap-14 items-start`}>
        {/* Left Column: Heading, Subtitle & Count */}
        <div className="lg:sticky lg:top-36 lg:self-start">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">FAQ</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
              Candidate questions
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
              Proposed answers; People and Legal approve per market.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-2 text-xs sm:text-[13px] text-slate-400 font-normal">
              18 questions
            </p>
          </Reveal>
        </div>

        {/* Right Column: 18 Accordion Questions */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {candidateFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.id} delay={Math.min(i, 6) * 40}>
                <div className="group">
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 sm:py-4.5 text-left text-xs sm:text-sm font-bold text-slate-900 transition-colors hover:text-amber-600"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`grid h-6 w-6 sm:h-7 sm:w-7 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-[#ffc20e] text-[#0B1220] rotate-45 shadow-xs"
                          : "border border-slate-300 bg-white text-slate-500 group-hover:border-amber-400 group-hover:text-slate-800"
                      }`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-4 sm:pb-5 pr-8 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Flag, Gauge } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface PopularArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  lastReviewed: string;
  href: string;
}

const popularArticles: PopularArticle[] = [
  {
    id: "art-1",
    title: "Is a payment screenshot proof?",
    description: "No. Check payment status with the responsible provider.",
    category: "Orders, payments and returns",
    lastReviewed: "1 Oct 2026",
    href: "#payment-screenshot-proof",
  },
  {
    id: "art-2",
    title: "Booking requests vs confirmed appointments",
    description: "A booking request is not a confirmed appointment.",
    category: "Services and bookings",
    lastReviewed: "1 Oct 2026",
    href: "#booking-requests-vs-confirmed",
  },
  {
    id: "art-3",
    title: "Check a part fits your vehicle",
    description: "Fitment depends on the exact vehicle. Unknown fitment means compatibility isn't confirmed.",
    category: "Parts and accessories",
    lastReviewed: "29 Sep 2026",
    href: "#check-part-fits-vehicle",
  },
  {
    id: "art-4",
    title: "What does a verification badge mean?",
    description: "A badge covers only the attribute shown. It isn't a guarantee of a listing or transaction.",
    category: "Accounts and verification",
    lastReviewed: "1 Oct 2026",
    href: "#verification-badge-meaning",
  },
  {
    id: "art-5",
    title: "Can't sign in or think your account is compromised",
    description: "Use the official account recovery process. We'll never ask for your password or codes.",
    category: "Accounts and verification",
    lastReviewed: "2 Oct 2026",
    href: "#cant-sign-in-compromised",
  },
];

export default function PopularArticlesSection() {
  return (
    <section className="bg-[#F8F9FC] py-16 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className={container}>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Popular Articles List */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Header */}
            <Reveal>
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">Popular</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
                Popular articles
              </h2>
            </Reveal>

            {/* Articles Stack */}
            <div className="mt-8 space-y-4">
              {popularArticles.map((article, idx) => (
                <Reveal key={article.id} delay={idx * 50}>
                  <Link
                    href={article.href}
                    className="group block rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-slate-300 hover:shadow-md"
                  >
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 underline decoration-slate-300 underline-offset-2 transition-colors group-hover:text-blue-600 group-hover:decoration-blue-600">
                      {article.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                      {article.description}
                    </p>
                    <p className="mt-2 text-[11px] sm:text-xs text-slate-400">
                      {article.category} · Last reviewed {article.lastReviewed}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: Still need help & Service issues cards */}
          <div className="space-y-5 lg:col-span-5 xl:col-span-5 lg:mt-16">
            {/* Still need help? */}
            <Reveal delay={150}>
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-200 hover:shadow-md">
                <div className="flex items-center gap-2.5">
                  <Flag className="h-4 w-4 text-slate-700" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Still need help?
                  </h3>
                </div>
                <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                  Contact options for this location or issue are not confirmed. You can continue browsing public help and safety guidance.
                </p>
                <div className="mt-4 pt-1">
                  <Link
                    href="/DriverXtra-Works"
                    className="inline-block text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors"
                  >
                    How DriverXtra Works
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Service issues? */}
            <Reveal delay={200}>
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-200 hover:shadow-md">
                <div className="flex items-center gap-2.5">
                  <Gauge className="h-4 w-4 text-slate-700" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Service issues?
                  </h3>
                </div>
                <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                  Check the Platform Status page for current incidents.
                </p>
                <div className="mt-4 pt-1">
                  <Link
                    href="/platform-status"
                    className="inline-block text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors"
                  >
                    Platform Status
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

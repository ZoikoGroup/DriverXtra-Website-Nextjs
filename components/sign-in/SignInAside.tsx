import Image from "next/image";
import {
  CalendarClock,
  ChartColumn,
  Globe,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import DriverXmobileLogo from "./DriverXmobileLogo";

const FEATURES = [
  { title: "Earn more", text: "Competitive fares and transparent pay.", icon: ChartColumn },
  { title: "Total flexibility", text: "Work when you want, where you want.", icon: CalendarClock },
  { title: "Drive with confidence", text: "Verified riders and in-app safety tools.", icon: ShieldCheck },
  { title: "24/7 driver support", text: "Real people, real help.", icon: Users },
] as const;

const STATS = [
  { value: "1M+", label: "Drivers worldwide", icon: Users },
  { value: "500+", label: "Cities and growing", icon: Globe },
  { value: "4.8/5", label: "Driver satisfaction", icon: Star },
] as const;

export default function SignInAside() {
  return (
    <aside className="relative isolate flex flex-col overflow-hidden px-4 py-10 sm:px-10 lg:min-h-[900px] lg:px-[86px] lg:py-[52px]">
      <Image
        src="/images/sign-in/driver-hero.webp"
        alt="Smiling driver leaning on his car with a city skyline at sunset"
        fill
        priority
        sizes="(min-width: 1024px) 52vw, 100vw"
        className="-z-10 object-cover object-top"
      />

      <div className="flex flex-1 flex-col">
        <DriverXmobileLogo />

        <div className="mt-16 max-w-[533px] lg:mt-[200px]">
          <h1 className="font-[family-name:var(--font-manrope)] text-4xl font-extrabold leading-tight sm:text-5xl sm:leading-[55.47px]">
            <span className="block text-[#1B1F25]">Your drive</span>
            <span className="block text-[#338A4E]">Greater opportunities</span>
          </h1>
          <p className="mt-4 font-[family-name:var(--font-plex)] text-lg leading-6 tracking-tight text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
            The all-in-one platform for drivers. Flexible work, Fair earnings.
            Real support. On the road and in your corner.
          </p>
        </div>

        <ul className="mt-14 grid max-w-[630px] grid-cols-1 gap-4 font-[family-name:var(--font-figtree)] sm:grid-cols-2 sm:gap-x-5">
          {FEATURES.map(({ title, text, icon: Icon }) => (
            <li
              key={title}
              className="flex min-h-20 items-center gap-3.5 rounded-3xl bg-white px-[18px] py-4 text-black shadow-[0_0_4px_rgba(0,0,0,0.25)]"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#338A83]/20 text-[#338A83]">
                <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold">{title}</p>
                <p className="mt-0.5 max-w-[180px] text-xs leading-[1.15]">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <ul className="mt-auto grid max-w-[553px] grid-cols-1 gap-4 rounded-lg bg-gray-900/60 px-7 py-4 font-[family-name:var(--font-figtree)] text-white outline outline-[0.7px] outline-white/40 backdrop-blur-[2px] max-lg:mt-10 sm:grid-cols-3 sm:gap-0">
          {STATS.map(({ value, label, icon: Icon }, i) => (
            <li
              key={label}
              className={`flex items-center gap-3.5 ${i > 0 ? "sm:border-l sm:border-white/50 sm:pl-5" : ""}`}
            >
              <Icon
                className="size-6 shrink-0"
                fill={Icon === Star ? "currentColor" : "none"}
                aria-hidden="true"
              />
              <div>
                <p className="text-xl font-bold leading-6">{value}</p>
                <p className="text-xs">{label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

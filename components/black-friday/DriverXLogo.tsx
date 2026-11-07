import Link from "next/link";

/** DriverX Mobile wordmark: signal bars, "DRIVER" + yellow "X", with "MOBILE" underneath. */
export default function DriverXLogo() {
  return (
    <Link href="/black-friday" aria-label="DriverX Mobile home" className="inline-flex items-center gap-1.5">
      <svg aria-hidden viewBox="0 0 22 20" className="h-7 w-7">
        <rect x="1" y="12" width="5" height="8" rx="1" fill="#2f8a7e" />
        <rect x="8.5" y="7" width="5" height="13" rx="1" fill="#4fb3a5" />
        <rect x="16" y="1" width="5" height="19" rx="1" fill="#fcd116" />
      </svg>
      <span className="bf-display flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight text-white italic">
          DRIVER<span className="text-[#fcd116]">X</span>
        </span>
        <span className="text-[9px] font-bold tracking-[0.35em] text-[#fcd116]">MOBILE</span>
      </span>
    </Link>
  );
}

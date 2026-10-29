import Link from "next/link";

// Text-based DriverXmobile mark (no image asset exists for this brand yet).
export default function DriverXmobileLogo() {
  return (
    <Link
      href="/"
      aria-label="DriverXmobile home"
      className="inline-flex w-fit items-center gap-1 rounded-2xl bg-white px-2.5 py-2 shadow-sm"
    >
      <span
        aria-hidden="true"
        className="flex size-9 items-end justify-center gap-[3px] rounded-md bg-[#338A83] pb-1.5"
      >
        <span className="h-1.5 w-1.5 rounded-[1px] bg-[#FCD018]" />
        <span className="h-2.5 w-1.5 rounded-[1px] bg-[#FCD018]" />
        <span className="h-4 w-1.5 rounded-[1px] bg-[#FCD018]" />
      </span>
      <span aria-hidden="true" className="flex flex-col leading-none">
        <span className="flex items-center text-[22px] font-black italic tracking-tight">
          <span className="text-[#338A83]">RIVER</span>
          <span className="text-[30px] leading-[22px] text-[#FCD018]">X</span>
        </span>
        <span className="text-[9px] font-bold italic tracking-[0.35em] text-[#FCD018]">
          MOBILE
        </span>
      </span>
    </Link>
  );
}

import Image from "next/image";
import { iconSrc, type FleetIcon } from "./data";

type FleetIconBoxProps = {
  /** Built-in Fleet Solutions icon name. */
  icon?: FleetIcon;
  /** Explicit icon path, for pages that ship their own icons. */
  src?: string;
  box?: 38 | 40;
};

/** Dark rounded tile holding a yellow line icon (journey steps, module and role cards). */
export default function FleetIconBox({ icon, src, box = 40 }: FleetIconBoxProps) {
  const path = src ?? (icon ? iconSrc(icon) : "");
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-[10px] bg-[#0b1220] ${box === 38 ? "size-[38px]" : "size-[40px]"}`}
    >
      <Image src={path} alt="" width={20} height={20} unoptimized />
    </span>
  );
}

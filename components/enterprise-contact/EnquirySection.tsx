import Image from "next/image";
import EnquiryForm from "./EnquiryForm";
import { ASIDE_IMAGE, ROUTING } from "./data";

export default function EnquirySection() {
  return (
    <section className="grid w-full max-w-[1440px] gap-7 px-4 py-[66px] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:px-20">
      <div className="flex flex-col self-start pt-[6.05px]">
        <p className="flex items-center gap-2 text-[13.5px] leading-[20.93px] font-bold text-[#f5b400]">
          <span className="h-[2px] w-[22px] shrink-0 rounded-[2px] bg-[#f5b400]" />
          Enquiry
        </p>
        <h2
          id="ecFormH"
          className="pt-[13px] pb-[0.88px] text-[22.3px] leading-[26.88px] font-bold tracking-[-0.48px] text-[#172033]"
        >
          Contact the Enterprise Team
        </h2>
        <EnquiryForm />
      </div>

      <aside className="flex flex-col self-start overflow-clip rounded-[20px] border border-solid border-[#d7dee8] bg-white">
        <div className="relative aspect-[499.67/312.28] w-full">
          <Image
            src={ASIDE_IMAGE}
            alt="Fleet vans at a depot"
            fill
            sizes="(max-width: 1024px) 100vw, 500px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-[10px] px-4 pt-[15px] pb-4">
          {ROUTING.map(({ title, titleSize, text }) => (
            <div key={title} className="flex flex-col gap-[10px]">
              <h3 className={`${titleSize} leading-[19px] font-bold tracking-[-0.34px] text-[#172033]`}>{title}</h3>
              <p className="text-[13px] leading-[20.15px] font-normal text-[#667085]">{text}</p>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}

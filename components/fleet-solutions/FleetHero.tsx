import Image from "next/image";

type FleetHeroProps = {
  title: string;
  lede: string;
  image: { src: string; alt: string };
  eyebrow?: string;
  /** Figma sizes the hero row to the headline length: 472.81px (default), 494.75px, 499.94px or 551.77px. */
  rowHeight?: keyof typeof ROW_HEIGHT;
};

const ROW_HEIGHT = {
  472.81: "lg:h-[472.81px]",
  494.75: "lg:h-[494.75px]",
  499.94: "lg:h-[499.94px]",
  551.77: "lg:h-[551.77px]",
} as const;

/** Dark hero shared by the Fleets & Enterprise pages: copy on the left, photo on the right. */
export default function FleetHero({ title, lede, image, eyebrow = "FLEETS & ENTERPRISE", rowHeight = 472.81 }: FleetHeroProps) {
  return (
    <section className="flex w-full flex-col overflow-clip bg-[#0b1220] px-4 pt-[30px] pb-[44px] lg:px-20">
      <div
        className={`mx-auto grid w-full max-w-[1280px] items-center gap-9 lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] ${ROW_HEIGHT[rowHeight]}`}
      >
        <div className="flex flex-col gap-3 self-center">
          <p className="flex items-center gap-2 pt-[12.05px] text-[13.5px] leading-[20.93px] font-bold text-[#f5b400]">
            <span className="h-[2px] w-[22px] shrink-0 rounded-[2px] bg-[#f5b400]" />
            {eyebrow}
          </p>
          <h1 className="pt-[7.33px] text-[45.4px] leading-[51.84px] font-extrabold tracking-[-0.96px] text-white max-sm:text-[34px] max-sm:leading-[40px]">
            {title}
          </h1>
          <p className="max-w-[600px] text-[17.5px] leading-[27.13px] font-normal text-[#dde3ee]">{lede}</p>
        </div>

        <figure className="flex flex-col justify-center self-center overflow-clip rounded-[20px] bg-[#18233a] shadow-[0px_30px_60px_-30px_rgba(0,0,0,0.6)]">
          <div className="relative h-[403.64px] w-full max-sm:h-[280px]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 540px"
              className="object-cover"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState, type FormEvent, type ReactNode } from "react";
import { ICON_CHEVRON_DOWN, INTERESTS, MARKETS } from "./data";

const LABEL = "text-[13px] leading-[20.15px] font-[650] text-[#172033]";
const INPUT =
  "h-[46px] min-h-[46px] w-full rounded-[12px] border border-solid border-[#d7dee8] bg-white px-3 text-[15px] leading-[23.25px] text-[#172033] outline-none focus-visible:border-[#0b1220]";

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-[5px]">
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      {children}
    </div>
  );
}

function CheckRow({ id, name, tint, children }: { id: string; name: string; tint?: boolean; children: ReactNode }) {
  return (
    <label
      htmlFor={id}
      className={`flex min-h-[46px] cursor-pointer items-center gap-3 rounded-[10px] border border-solid border-[#d7dee8] px-3 py-[10px] ${
        tint ? "bg-[#f6f8fb]" : "bg-white"
      }`}
    >
      <input id={id} name={name} type="checkbox" className="size-5 shrink-0 cursor-pointer accent-[#0b1220]" />
      <span className="text-[14.5px] leading-[22.48px] font-normal text-[#172033]">{children}</span>
    </label>
  );
}

export default function EnquiryForm() {
  const [interest, setInterest] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  // Figma shows the hint from the start, so it stays visible until an area is chosen.
  const showInterestError = !interest;

  return (
    <form
      id="ecF"
      onSubmit={onSubmit}
      noValidate
      className="flex w-full max-w-[880px] flex-col rounded-[20px] border border-solid border-[#d7dee8] bg-white px-[22px] pt-[14.63px] pb-[40px]"
    >
      <fieldset className="flex flex-col pb-[14px]">
        <legend className="text-[13px] leading-[20.15px] font-bold text-[#172033]">Area of interest</legend>
        <div className="flex flex-wrap gap-2 pt-2">
          {INTERESTS.map((name) => {
            const selected = interest === name;
            return (
              <label key={name} className="cursor-pointer">
                <input
                  type="radio"
                  name="interest"
                  value={name}
                  checked={selected}
                  onChange={() => setInterest(name)}
                  className="peer sr-only"
                />
                <span
                  className={`flex min-h-[44px] items-center rounded-full border border-solid px-4 pt-[8.76px] pb-[10.24px] text-[14.5px] leading-[22.48px] font-[650] whitespace-nowrap text-[#172033] transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-[#0b1220] ${
                    selected ? "border-[#f5b400] bg-[#fff3c4]" : "border-[#d7dee8] bg-white"
                  }`}
                >
                  {name}
                </span>
              </label>
            );
          })}
        </div>
        {showInterestError && (
          <p role="alert" className="pt-2 text-[16px] leading-[24.8px] font-normal text-[#172033]">
            Choose an area of interest.
          </p>
        )}
      </fieldset>

      <div className="mt-[12.94px] grid gap-3 sm:grid-cols-3">
        <Field id="ecN" label="Full name">
          <input id="ecN" name="name" type="text" autoComplete="name" className={INPUT} />
        </Field>
        <Field id="ecE" label="Work email">
          <input id="ecE" name="email" type="email" autoComplete="email" className={INPUT} />
        </Field>
        <Field id="ecO" label="Organization">
          <input id="ecO" name="organization" type="text" autoComplete="organization" className={INPUT} />
        </Field>
        <Field id="ecC" label="Country / market">
          <div className="relative">
            <select id="ecC" name="market" defaultValue="" className={`${INPUT} appearance-none pr-[34px]`}>
              <option value="" disabled>
                Choose
              </option>
              {MARKETS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <Image
              src={ICON_CHEVRON_DOWN}
              alt=""
              width={14}
              height={14}
              unoptimized
              className="pointer-events-none absolute top-1/2 right-[13px] -translate-y-1/2"
            />
          </div>
        </Field>
      </div>

      <div className="mt-[32.64px] flex flex-col gap-[5px]">
        <label htmlFor="ecM" className={LABEL}>
          Message
        </label>
        <textarea
          id="ecM"
          name="message"
          className="h-[100px] min-h-[100px] w-full resize-y rounded-[12px] border border-solid border-[#d7dee8] bg-white px-3 py-[10px] text-[15px] leading-[23.25px] text-[#172033] outline-none focus-visible:border-[#0b1220]"
        />
        <p className="pt-[4.79px] pb-[0.59px] text-[12px] leading-[18.6px] font-normal text-[#667085]">
          Don&apos;t include VIN lists, driver names or financial details.
        </p>
      </div>

      <details className="group py-2">
        <summary className="relative flex min-h-[44px] cursor-pointer list-none flex-col gap-[2px] rounded-[12px] border border-solid border-[#d7dee8] bg-white py-3 pr-[44px] pl-[14px] [&::-webkit-details-marker]:hidden">
          <b className="text-[15px] leading-[23.25px] font-bold text-[#172033]">Optional details</b>
          <span className="text-[14px] leading-[21.7px] font-normal text-[#4a5670]">
            Phone, fleet size, organization type
          </span>
          <span className="absolute top-1/2 right-[14px] flex size-6 -translate-y-1/2 items-center justify-center rounded-[12px] border border-solid border-[#d7dee8] pt-px text-[16px] leading-[24.8px] font-extrabold text-[#172033] transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="grid gap-3 pt-3 sm:grid-cols-3">
          <Field id="ecP" label="Phone">
            <input id="ecP" name="phone" type="tel" autoComplete="tel" className={INPUT} />
          </Field>
          <Field id="ecFs" label="Fleet size">
            <input id="ecFs" name="fleetSize" type="text" inputMode="numeric" className={INPUT} />
          </Field>
          <Field id="ecOt" label="Organization type">
            <input id="ecOt" name="organizationType" type="text" className={INPUT} />
          </Field>
        </div>
      </details>

      <div className="mt-[4px] flex flex-col gap-[14px]">
        <CheckRow id="ecOk" name="acknowledge">
          I acknowledge DriverXtra will use these details to respond to my enquiry.
        </CheckRow>
        <CheckRow id="ecMk" name="marketing" tint>
          Optional: send me fleet updates by email.
        </CheckRow>
      </div>

      <button
        type="submit"
        className="mt-[14px] flex min-h-[46px] w-full items-center justify-center rounded-full border border-solid border-transparent bg-[#f5b400] px-6 py-[10px] text-center text-[15px] leading-[23.25px] font-[650] text-[#0b1220] transition-colors hover:bg-[#e8ac00]"
      >
        Send enquiry
      </button>

      {submitted && interest && (
        <p role="status" className="pt-3 text-[14.5px] leading-[22.48px] font-normal text-[#4a5670]">
          Enquiry received. A receipt is not a callback promise, quote or contract.
        </p>
      )}
    </form>
  );
}

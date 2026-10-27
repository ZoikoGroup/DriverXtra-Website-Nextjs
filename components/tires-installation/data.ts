import type { Faq } from "@/components/ui/FaqSection";

export const img = (name: string) => `/images/tires-installation/${name}`;

/** Example vehicles only — sizes are illustrative, not fitment advice. */
export const exampleVehicles: Record<
  string,
  { model: string; size: string }[]
> = {
  BMW: [
    { model: "3 Series 2019 · 320i SE", size: "225/50 R17 98W" },
    { model: "X3 2021 · xDrive20d", size: "245/50 R19 105W" },
  ],
  Ford: [
    { model: "Fiesta 2020 · Titanium", size: "195/55 R16 87V" },
    { model: "Focus 2019 · ST-Line", size: "215/50 R17 95W" },
  ],
  Tesla: [{ model: "Model 3 2022 · Long Range", size: "235/45 R18 98W" }],
  Toyota: [
    { model: "Corolla 2021 · Design", size: "225/45 R17 94W" },
    { model: "RAV4 2022 · Hybrid", size: "225/65 R17 102H" },
  ],
  Volkswagen: [
    { model: "Golf 2020 · Life", size: "205/55 R16 91V" },
    { model: "Polo 2021 · Style", size: "185/65 R15 88T" },
  ],
};

export const tireWidths = [
  "175",
  "185",
  "195",
  "205",
  "215",
  "225",
  "235",
  "245",
  "255",
  "265",
  "275",
];
export const tireProfiles = [
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
  "60",
  "65",
  "70",
];
export const rimSizes = ["14", "15", "16", "17", "18", "19", "20", "21"];

export const sidewallParts = [
  { code: "225", text: "Section width in millimetres" },
  { code: "45", text: "Sidewall height as % of width" },
  { code: "R", text: "Radial construction" },
  { code: "17", text: "Rim diameter in inches" },
  { code: "94", text: "Load index (per-tire capacity)" },
  { code: "W", text: "Speed symbol — a rating, not a recommended speed" },
];

export const visitChecklist = [
  "Bring the locking wheel-nut key, if your wheels use one",
  "Check the tire size and quantity on your booking match your vehicle",
  "Mention TPMS sensors or warning lights to the fitter",
  "Ask whether balancing, valves and disposal are included",
  "Ask the fitter to confirm directional or asymmetric mounting",
];

export const afterFitting = [
  {
    title: "Manufacturer warranty",
    text: "Covers defects in the tire itself, under the manufacturer's terms and conditions.",
  },
  {
    title: "Retailer rights",
    text: "Your statutory rights with the seller for faulty or misdescribed goods.",
  },
  {
    title: "Installer workmanship",
    text: "Issues with the fitting work, handled by the installer that performed it.",
  },
];

export const faqs: Faq[] = [
  {
    q: "How do I find the right tire size for my vehicle?",
    a: "Start with the vehicle selector or read the size on the tire sidewall and the vehicle placard. Different trims, axles or aftermarket wheels can require different sizes. Check the specification with a qualified installer before fitting.",
  },
  {
    q: "Does “fits my vehicle” mean the tires are safe to install?",
    a: "Not on its own. It means the size matches the vehicle data we have. The installer still needs to check the wheels, load and speed ratings, and the condition of the vehicle before fitting.",
  },
  {
    q: "Can the front and rear tires have different sizes?",
    a: "Yes, some vehicles use staggered sizes from the factory. Only fit different sizes front and rear if the manufacturer specifies it for your vehicle.",
  },
  {
    q: "What do the numbers on a tire sidewall mean?",
    a: "In 225/45 R17 94W: 225 is the width in millimetres, 45 is the sidewall height as a percentage of width, R means radial, 17 is the rim diameter in inches, 94 is the load index and W is the speed symbol.",
  },
  {
    q: "What does the load index tell me?",
    a: "It's a code for the maximum weight each tire can carry at the correct pressure. Replacement tires should meet or exceed the load index your vehicle's manufacturer specifies.",
  },
  {
    q: "What is a speed rating?",
    a: "A letter showing the maximum speed the tire is designed to sustain under the right load and pressure. It's a rating, not a recommended speed — always follow road limits.",
  },
  {
    q: "Can I switch from run-flat tires to regular tires?",
    a: "Sometimes, but vehicles built for run-flats often have no spare wheel. Check the manufacturer's guidance, and plan for a repair kit or spare before switching.",
  },
  {
    q: "Do electric vehicles require special tires?",
    a: "Not always, but EVs are heavier and deliver torque instantly, so many use tires with a higher load index or EV-specific designs. Use the size and ratings the manufacturer specifies.",
  },
  {
    q: "What does the three-peak mountain snowflake marking mean?",
    a: "It shows the tire has passed a standard snow traction test. It's the marking to look for where winter tires are required or recommended.",
  },
  {
    q: "Are fitting and balancing included in tire prices?",
    a: "It depends on the seller and installer. Check whether fitting, balancing, new valves and disposal of old tires are included before you book.",
  },
  {
    q: "What is TPMS service?",
    a: "Work on the tire pressure monitoring system sensors inside the wheels, such as resetting, resealing or replacing them. It may be charged separately.",
  },
  {
    q: "Can I book installation for today?",
    a: "Only if a verified installer near you shows same-day availability. None are published yet in this demo, so no appointments can be booked.",
  },
  {
    q: "Why did my installed price change?",
    a: "Extra items such as valves, TPMS work, locking wheel-nut removal or disposal may be added. Any change should be explained and agreed with you before the work goes ahead.",
  },
  {
    q: "Can the installer refuse to fit tires I purchased?",
    a: "Yes, if the tires are the wrong size, damaged, too old or unsafe for your vehicle. The installer should tell you why.",
  },
  {
    q: "Do fitted tires come with a warranty?",
    a: "The tire may have a manufacturer warranty against defects, and the installer may offer a workmanship guarantee. Keep your invoice as proof of purchase and fitting.",
  },
  {
    q: "Can I return tires after installation?",
    a: "Usually not if they're fitted and used, unless they're faulty or misdescribed. Check the seller's return policy before fitting.",
  },
  {
    q: "Who should I contact for an installation problem?",
    a: "Contact the installer who did the work first. For a fault in the tire itself, contact the seller.",
  },
  {
    q: "What should I do if a tire seems unsafe while driving?",
    a: "Slow down and stop somewhere safe as soon as you can. Don't keep driving on a damaged or flat tire — call roadside assistance if you need help.",
  },
];

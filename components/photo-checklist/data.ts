import type { Faq } from "@/components/ui/FaqSection";

const img = (name: string) => `/images/photo-checklist/${name}.webp`;

export const heroImage = img("hero-front-car");
export const qualityImage = img("quality-basics");
export const workspaceImage = img("add-photos-laptop");

/* ---------- Checklist ---------- */

export type VehicleType = "car" | "van" | "motorcycle";

export const vehicleTypes: { value: VehicleType; label: string }[] = [
  { value: "car", label: "Car" },
  { value: "van", label: "Van" },
  { value: "motorcycle", label: "Motorcycle" },
];

export type Shot = {
  title: string;
  text: string;
  tip: string;
  image: string;
  alt: string;
};

export type ShotGroup = { id: string; label: string; shots: Shot[] };

const shot = (title: string, text: string, tip: string, image: string, view: string): Shot => ({
  title,
  text,
  tip,
  image: img(image),
  alt: `Example view of ${view} — not your vehicle`,
});

const front = (subject: string) =>
  shot(
    "Front three-quarter",
    `Show the front and one side of the ${subject} in the same frame.`,
    `Keep the whole ${subject} in frame on a plain background.`,
    "example-front-three-quarter",
    "front three-quarter",
  );

const rear = shot(
  "Rear three-quarter",
  "Show the back and opposite side, including visible body condition.",
  "Check privacy before sharing — consider covering the number plate where local rules allow.",
  "example-rear-three-quarter",
  "rear three-quarter",
);

const sides = (text: string) =>
  shot("Left and right side", text, "Don’t hide damage with angles or shadows.", "example-sides", "left and right side");

const odometer = shot(
  "Odometer",
  "A clear odometer photo may help explain the reading you disclose separately.",
  "This photo isn’t a mileage verification.",
  "example-odometer",
  "odometer",
);

const damage = shot(
  "Damage and defects",
  "Photograph scratches, dents, stains or other known defects clearly.",
  "A wide shot for context, then a close-up in focus.",
  "example-damage-defects",
  "damage and defects",
);

export const shotGroups: Record<VehicleType, ShotGroup[]> = {
  car: [
    {
      id: "exterior",
      label: "Exterior",
      shots: [front("vehicle"), rear, sides("Show both side profiles when they help demonstrate body panels and wheels.")],
    },
    {
      id: "interior",
      label: "Interior",
      shots: [
        shot(
          "Dashboard and cabin",
          "Show a clear view of the cabin; remove mail, addresses and other private items first.",
          "Clear saved navigation addresses and phone names from the screen.",
          "example-dashboard-cabin",
          "dashboard and cabin",
        ),
        shot(
          "Seats, storage and equipment",
          "If relevant, show seats, storage and equipment buyers may want to see.",
          "Optional — skip what doesn’t apply to your vehicle.",
          "example-seats-storage",
          "seats, storage and equipment",
        ),
      ],
    },
    { id: "condition", label: "Condition & details", shots: [odometer, damage] },
  ],
  van: [
    {
      id: "exterior",
      label: "Exterior",
      shots: [front("van"), rear, sides("Show both sides, including sliding doors, racks and any signwriting marks.")],
    },
    {
      id: "interior",
      label: "Interior",
      shots: [
        shot(
          "Cab and dashboard",
          "Show the driver’s cab clearly; remove delivery notes, addresses and private items first.",
          "Clear saved navigation addresses and phone names from the screen.",
          "example-dashboard-cabin",
          "cab and dashboard",
        ),
        shot(
          "Load area and fittings",
          "Show the load floor, racking, tie-downs and bulkhead buyers may want to see.",
          "Empty the load area so its size and condition are clear.",
          "example-seats-storage",
          "load area and fittings",
        ),
      ],
    },
    { id: "condition", label: "Condition & details", shots: [odometer, damage] },
  ],
  motorcycle: [
    {
      id: "exterior",
      label: "Exterior",
      shots: [
        front("motorcycle"),
        rear,
        sides("Show both sides, including the exhaust, chain or belt, and wheels."),
      ],
    },
    {
      id: "interior",
      label: "Controls & storage",
      shots: [
        shot(
          "Controls and instruments",
          "Show the handlebars, switchgear and instrument panel clearly.",
          "Clear paired phone names and saved destinations from any display.",
          "example-dashboard-cabin",
          "controls and instruments",
        ),
        shot(
          "Seat, luggage and accessories",
          "If relevant, show the seat, panniers, top box and fitted accessories.",
          "Optional — skip what doesn’t apply to your motorcycle.",
          "example-seats-storage",
          "seat, luggage and accessories",
        ),
      ],
    },
    { id: "condition", label: "Condition & details", shots: [odometer, damage] },
  ],
};

/* ---------- Quality & privacy ---------- */

export const qualityDos = [
  "Use steady light and keep the vehicle in focus.",
  "Shoot in landscape with the whole subject in frame.",
  "Move the vehicle away from clutter.",
];

export const qualityDont = "Avoid edits that change the apparent condition of the vehicle.";

export const privacyChecks = [
  "House numbers, street signs and your driveway’s surroundings",
  "Registration documents, letters and receipts on seats",
  "People, especially children, and other cars’ plates",
  "Location data stored inside the photo file",
];

/* ---------- FAQ ---------- */

export const photoFaqs: Faq[] = [
  {
    q: "Are all these photos required?",
    a: "No universal requirement is assumed. The guide distinguishes recommended shots from any market- and vehicle-specific mandatory item only when an authorized, current source supports that rule.",
  },
  {
    q: "Do I need an account to read this checklist?",
    a: "No. The checklist is public. You only need to sign in to add photos to a private listing draft.",
  },
  {
    q: "Does uploading photos publish my vehicle listing?",
    a: "No. Photos are added to a private draft. Your listing is only published when you review it and choose to publish.",
  },
  {
    q: "Which angle should I photograph first?",
    a: "Many sellers start with the front three-quarter view because it shows the front and one side together. Any order works — you can rearrange photos later.",
  },
  {
    q: "Should I show scratches or damage?",
    a: "Yes. Clear photos of known defects help buyers understand the vehicle’s condition and set accurate expectations. Take a wide shot for context, then a close-up.",
  },
  {
    q: "Should I include my license plate?",
    a: "That’s your choice. Consider covering or blurring the plate where local rules allow, and check that other vehicles’ plates aren’t visible.",
  },
  {
    q: "Can I photograph the odometer?",
    a: "Yes. A clear odometer photo may help explain the reading you disclose separately, but it isn’t a mileage verification.",
  },
  {
    q: "Can I use filters or image enhancements?",
    a: "Light cropping and exposure fixes are fine. Avoid filters or edits that change the apparent colour or condition of the vehicle.",
  },
  {
    q: "Can I upload photos taken with my phone?",
    a: "Yes. Most modern phone cameras work well. Shoot in landscape, wipe the lens and use steady, even light.",
  },
  {
    q: "What if a photo is blurry?",
    a: "Retake it. Hold the phone steady, tap to focus on the vehicle and avoid shooting into bright light.",
  },
  {
    q: "What happens to GPS and other photo metadata?",
    a: "Photos can contain location and device details. Remove location data before sharing where your phone or editor allows it, and don’t rely on any service to remove it for you.",
  },
  {
    q: "Will DriverXtra detect every face or private detail?",
    a: "No automated check is perfect. Review every image yourself for faces, documents, addresses and other personal information before sharing.",
  },
  {
    q: "What if a photo is rejected?",
    a: "You’ll be told why where a reason is available. Retake or edit the photo to address the issue, then add it again.",
  },
  {
    q: "Can I change the photo order without dragging?",
    a: "Yes. The draft workspace provides keyboard-accessible controls to move photos up or down without dragging.",
  },
  {
    q: "What happens if my connection drops?",
    a: "Photos that finished uploading stay in your draft. Any interrupted upload can be retried once you’re back online.",
  },
  {
    q: "Can other users see my draft photos?",
    a: "No. Draft photos are private to your account until you publish the listing.",
  },
  {
    q: "Will an uploaded photo verify ownership or condition?",
    a: "No. Photos help buyers see the vehicle, but they don’t verify ownership, mileage or condition. Buyers should still arrange checks and an inspection.",
  },
  {
    q: "Where can I learn about document privacy?",
    a: "See Document Upload Guidance and PII Redaction under Sell Vehicles → Documents for how to protect personal information on documents.",
  },
];

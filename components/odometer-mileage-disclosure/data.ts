import type { Faq } from "@/components/ui/FaqSection";
import type { RelatedLink } from "@/components/ui/RelatedLinksSection";
import { hrefFor } from "@/lib/navigation";

const img = (name: string) => `/images/odometer-mileage-disclosure/${name}.webp`;

export const heroImage = img("hero-instrument-display");
export const howToImage = img("how-to-dashboard");
export const draftImage = img("listing-draft-car");

/* ---------- How to ---------- */

export const howToSteps = [
  { title: "Turn on the display", text: "Many digital displays only show the total with the ignition on." },
  {
    title: "Find the total, not the trip",
    text: "Check the total odometer reading, not the trip counter (often labelled TRIP, A or B).",
  },
  { title: "Note the unit", text: "Look for mi or km next to the number. If none is shown, say you’re not sure." },
  {
    title: "Write what you see",
    text: "Record the digits shown, without estimating or rounding up. Note the date you read it.",
  },
  {
    title: "Photograph separately (optional)",
    text: "A clear photo can help explain the reading — it doesn’t prove total mileage.",
  },
];

/* ---------- Units ---------- */

export const KM_PER_MILE = 1.609344;

export const unitWarnings = [
  "Imported vehicles may display a different unit from the market where they’re sold.",
  "Some displays show a decimal place or tenths digit — check before recording.",
  "A unit switch in the settings menu changes what’s shown, not the distance travelled.",
];

/* ---------- Uncertainty ---------- */

export const uncertainCases = [
  { title: "I cannot confirm the current reading.", text: "The display is unreadable, faulty, or you can’t access the vehicle." },
  {
    title: "The odometer or instrument cluster may have been replaced.",
    text: "Official rules apply. You may need records of when it was replaced.",
  },
  {
    title: "The instrument may not show the full distance travelled.",
    text: "For example, an older display that has rolled past its maximum.",
  },
  {
    title: "The display can’t be read",
    text: "A faulty or blank display. Don’t estimate — say the reading can’t be confirmed.",
  },
];

/* ---------- Related ---------- */

export const relatedLinks: RelatedLink[] = [
  {
    title: "Review ownership and title guidance",
    text: "Title confirms legal transfer — it says nothing about mileage or condition.",
    image: img("related-ownership-title"),
    alt: "Vehicle documents",
    href: hrefFor("Ownership / Title Requirements"),
  },
  {
    title: "Photo Checklist",
    text: "How to photograph the odometer and the rest of the vehicle.",
    image: img("related-photo-checklist"),
    alt: "A car ready for photos",
    href: "/photo-checklist",
  },
  {
    title: "Vehicle History",
    text: "What mileage records can — and can’t — show.",
    image: img("related-vehicle-history"),
    alt: "A car on a street",
    href: "/vehicle-history",
  },
];

/* ---------- FAQ ---------- */

export const odometerFaqs: Faq[] = [
  {
    q: "What is an odometer reading?",
    a: "It is the distance number shown by the vehicle’s odometer display. It may not prove the vehicle’s entire distance history. Check whether the display shows miles or kilometres.",
  },
  {
    q: "Is my listing mileage automatically verified?",
    a: "No. The mileage you enter is your own statement of what the display shows. DriverXtra doesn’t automatically verify it.",
  },
  {
    q: "Should I enter miles or kilometres?",
    a: "Enter the unit shown on the display. Don’t convert the reading yourself — conversions on this page are illustrative only.",
  },
  {
    q: "Can I enter zero when I cannot read the odometer?",
    a: "No. Zero would be inaccurate. Say that the reading can’t be confirmed instead of entering a number you can’t see.",
  },
  {
    q: "What if my odometer was replaced?",
    a: "Say so clearly. The display may not show the vehicle’s total distance, and official rules may require records of when it was replaced.",
  },
  {
    q: "What if the display has rolled over?",
    a: "Record the digits shown and note that the display may have rolled past its maximum, so the total distance may be higher.",
  },
  {
    q: "Do all vehicles require an odometer declaration?",
    a: "Not necessarily. Requirements depend on where the vehicle is registered and its type or age. Check the official rule for your location.",
  },
  {
    q: "Is a photograph enough to prove mileage?",
    a: "No. A photo can help explain the reading on a given day, but it doesn’t prove the vehicle’s total distance travelled.",
  },
  {
    q: "What if a vehicle history record shows a different value?",
    a: "Don’t ignore it. Check the dates, units and source of each record, and explain any genuine difference you know about.",
  },
  {
    q: "Can DriverXtra certify that a mileage reading is accurate?",
    a: "No. DriverXtra doesn’t certify mileage. An independent inspection and official records can help buyers assess it.",
  },
  {
    q: "What is the difference between a draft and a disclosure?",
    a: "A draft is your private, unpublished record. A disclosure is a statement you make to a buyer or authority — sometimes on an official form.",
  },
  {
    q: "Does checking an acknowledgment sign a legal form?",
    a: "No. Ticking a box on DriverXtra doesn’t sign or submit any official odometer disclosure form.",
  },
  {
    q: "Can I change a mileage mistake after saving?",
    a: "Yes, while your listing is a draft. If it’s already published, update it as soon as you notice and tell anyone you’ve already shared it with.",
  },
  {
    q: "Will my odometer photograph be visible to buyers?",
    a: "Only if you add it to a published listing. Photos in a private draft aren’t visible to other users.",
  },
  {
    q: "Where do I check the official rule for my location?",
    a: "Use the official sources section on this page, or check the government transport or licensing authority where the vehicle is registered.",
  },
  {
    q: "Is the vehicle title the same as odometer disclosure?",
    a: "No. A title confirms legal ownership transfer. In some places it also records mileage, but the two serve different purposes.",
  },
  {
    q: "What if I think a listing has misleading mileage?",
    a: "Don’t rely on it. Ask the seller for records, arrange an inspection and report a listing concern if something doesn’t add up.",
  },
  {
    q: "Can I use this page without signing in?",
    a: "Yes. This guidance is public. You only need to sign in to save a reading to your own listing draft.",
  },
];

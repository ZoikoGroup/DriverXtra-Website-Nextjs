/** Shared data shapes for the Automotive Services pages. */

export type ServiceCard = {
  title: string;
  text: string;
  image: string;
  alt: string;
};

export type ChargeStatus =
  | "quoted"
  | "conditional"
  | "consent"
  | "new-consent"
  | "included"
  | "unknown"
  | "not-confirmed";

export type Charge = { charge: string; covers: string; status: ChargeStatus };

/** `meta` is a small grey line under the text, e.g. "Reported by: Carrier". */
export type Step = { title: string; text: string; meta?: string };

export type FormField = {
  key: string;
  label: string;
  hint?: string;
  /** "year" accepts four digits only. */
  kind?: "text" | "year" | "select";
  options?: string[];
  /** Shown when the field is left empty or invalid. */
  error: string;
};

export const yearField: FormField = {
  key: "year",
  label: "Vehicle year",
  hint: "Four digits, e.g. 2019",
  kind: "year",
  error: "Enter a four-digit year, e.g. 2019.",
};
export const vehicleField: FormField = {
  key: "vehicle",
  label: "Make and model",
  error: "Enter the make and model.",
};
export const locationField: FormField = {
  key: "location",
  label: "Location / ZIP",
  hint: "Town or postal area only — no full address.",
  error: "Enter a town or postal area.",
};

import type { Faq } from "@/components/ui/FaqSection";
import type { CatalogItem } from "@/components/services/ServiceCatalog";
import type { Charge } from "@/components/services/ServiceParts";

export const safetySteps = [
  {
    id: "get-safe",
    title: "Get safe",
    text: "Leave the vehicle by the side away from traffic if it's safe to do so, and wait behind a barrier where possible.",
  },
  { id: "call-for-help", title: "Call for help", text: "If anyone is hurt or in danger, call local emergency services first." },
  { id: "know-where", title: "Know where you are", text: "Note a road name, junction or landmark. You choose what location to share." },
] as const;

export const needs: CatalogItem[] = [
  {
    id: "flat-tire",
    title: "Flat tire",
    text: "Help fitting a spare or arranging recovery. Not tire repair advice.",
    image: "/images/roadside-assistance/flat-tire.png",
    alt: "A black Porsche driving on a motorway",
  },
  {
    id: "battery-jump-start",
    title: "Battery jump-start",
    text: "Help starting a vehicle with a flat battery.",
    image: "/images/roadside-assistance/battery-jump-start.png",
    alt: "The silhouette of a black saloon car in low light",
  },
  {
    id: "lockout",
    title: "Lockout",
    text: "Help when keys are locked inside, subject to proof of ownership.",
    image: "/images/roadside-assistance/lockout.png",
    alt: "A grey BMW coupe parked at dusk",
  },
  {
    id: "tow-or-recovery",
    title: "Tow or recovery",
    text: "Moving a vehicle that can't be driven safely.",
    image: "/images/roadside-assistance/tow-or-recovery.webp",
    alt: "A truck driving along a mountain highway",
  },
];

export const vehicleTypes = ["Car", "SUV / 4x4", "Van", "Motorcycle", "Electric vehicle", "Motorhome / caravan", "Other"];

export const safetySituations = [
  { value: "safe", label: "Safe, away from traffic", danger: false },
  { value: "verge", label: "On a verge or hard shoulder", danger: false },
  { value: "live-lane", label: "Stopped in a live lane", danger: true },
  { value: "hurt", label: "Someone is hurt or in danger", danger: true },
];

export const charges: Charge[] = [
  { charge: "Call-out", covers: "Set by the provider or covered by your plan", status: "quoted" },
  { charge: "Labour on site", covers: "Time spent at the vehicle", status: "quoted" },
  { charge: "Tow distance", covers: "Per mile/km beyond any included distance", status: "conditional" },
  { charge: "Parts or fuel", covers: "Only with your approval", status: "consent" },
];

export const steps = [
  { title: "Safety guidance first", text: "Get to a safe place; call emergency services if anyone is in danger." },
  { title: "Request", text: "Your request goes to a provider — it isn't dispatched until they accept." },
  { title: "Provider and dispatch status", text: "Accepted, dispatched and arrived are separate statuses from the provider." },
  { title: "Charges, handover and support", text: "Charges and coverage are confirmed by the provider and your plan." },
];

export const records = [
  "Request time and what you asked for",
  "Provider who accepted, and when",
  "Arrival and work-completed times as reported",
  "Charges and any coverage applied",
  "Where the vehicle was taken, if towed",
];

export const faqs: Faq[] = [
  {
    q: "What should I do first if I break down?",
    a: "Get yourself and passengers to a safe place away from traffic. If anyone is in danger, call local emergency services.",
  },
  {
    q: "Is my request the same as a dispatch?",
    a: "No. A request goes to a provider first. Help is only on its way once the provider accepts and marks it as dispatched.",
  },
  {
    q: "Is the arrival time guaranteed?",
    a: "No. Any arrival time is an estimate from the provider and can change with traffic, weather and demand.",
  },
  {
    q: "Will my breakdown cover pay?",
    a: "It depends on your plan. The provider and your plan confirm what's covered — anything outside it should be shown as a charge before work starts.",
  },
  {
    q: "Do you track my location?",
    a: "No. We never use your device location automatically. You type a road name, junction or landmark and choose what to share.",
  },
  {
    q: "What if my car needs repair after a tow?",
    a: "The record shows where the vehicle was taken. From there you can choose a repairer — see Maintenance & Repair for what to check.",
  },
];

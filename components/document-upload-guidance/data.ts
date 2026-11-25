import type { Faq } from "@/components/ui/FaqSection";

const img = (name: string) => `/images/document-upload-guidance/${name}.webp`;

export const heroImage = img("hero-signing-documents");
export const prepareImage = img("prepare-documents-desk");
export const uploadImage = img("private-upload-workspace");

/* ---------- Prepare ---------- */

export const prepareSteps = [
  { title: "Lay it flat in good light", text: "Avoid shadows, glare and folds across text." },
  {
    title: "Capture all four edges",
    text: "Keep the document readable and include any fields required by the receiving authority.",
  },
  { title: "Don't alter required text", text: "Never edit, cover or retype anything an authority requires to be visible." },
  { title: "Check the background", text: "Remove other papers, cards and anything personal from the frame." },
  { title: "Save as a clear file", text: "A scan to PDF, or a sharp photo, usually works best." },
];

/* ---------- Privacy ---------- */

export const hiddenDetailChecks: { text: string; ok: boolean }[] = [
  { text: "Don't upload ID documents that weren't asked for", ok: false },
  { text: "Don't include bank cards or unrelated letters in the frame", ok: false },
  { text: "Review sensitive information before sharing it, where permitted", ok: true },
];

/* ---------- Process ---------- */

export const uploadSteps = [
  "Choose a listing draft and purpose",
  "Choose the file",
  "Transfer",
  "Receipt",
  "Safety check",
  "Privacy and document review",
  "Decision",
];

/* ---------- FAQ ---------- */

export const documentFaqs: Faq[] = [
  {
    q: "Which vehicle documents do I need?",
    a: "The required documents may depend on where you are selling, your relationship to the vehicle, and the transaction. Check the official authority for your location and the applicable source-linked guidance. Do not upload documents solely because they appear in an example checklist.",
  },
  {
    q: "Does uploading a title prove I own the vehicle?",
    a: "No. Uploading a document doesn’t prove ownership. It may be reviewed, but legal ownership is confirmed by the relevant authority and records.",
  },
  {
    q: "Can I upload documents on this public page?",
    a: "No. This page is guidance only. Sign in and open your private listing draft to add a document.",
  },
  {
    q: "Are all documents mandatory?",
    a: "No. Only upload what’s requested for your listing or required where you’re selling. Example checklists aren’t a list of mandatory documents.",
  },
  {
    q: "Which file types and sizes are accepted?",
    a: "Accepted types and size limits are shown in the upload step of your draft. Clear PDFs and sharp photos usually work best.",
  },
  {
    q: "Can I use my phone camera?",
    a: "Yes. Lay the document flat in good light, capture all four edges and check the photo is sharp before uploading.",
  },
  {
    q: "Should I hide personal information?",
    a: "Remove anything that wasn’t asked for. Don’t cover or alter text an authority requires to be visible — review sensitive information before sharing it, where permitted.",
  },
  {
    q: "Will DriverXtra automatically remove PII?",
    a: "Don’t rely on it. Automated detection isn’t complete, and any information detected in an image must be reviewed before use.",
  },
  {
    q: "What happens after I choose a file?",
    a: "It’s transferred and received, then goes through a safety check and privacy and document review before any decision is made.",
  },
  {
    q: "Does 100% upload mean the document is approved?",
    a: "No. 100% means the transfer finished. A received file hasn’t been checked, reviewed or accepted yet.",
  },
  {
    q: "What if an upload is interrupted?",
    a: "The file may not have been received. Check your draft once you’re back online and upload it again if it isn’t listed.",
  },
  {
    q: "What if my document is rejected?",
    a: "You’ll be told why where a reason is available. Fix the issue — for example a blurry or cropped image — and upload a new copy.",
  },
  {
    q: "Who can see my uploaded documents?",
    a: "Documents in a private draft are for you and authorized reviewers. They’re never shown on a public listing.",
  },
  {
    q: "Does DriverXtra verify that a document is genuine?",
    a: "A review doesn’t guarantee a document is genuine. Buyers should still check documents with the relevant authority.",
  },
  {
    q: "Can I replace a document?",
    a: "Yes, while your listing is a draft. Upload a new copy and remove the old one; a replacement may need to be reviewed again.",
  },
  {
    q: "How long are documents kept?",
    a: "Documents are kept only as long as needed for the listing, review and any legal or safety obligations, then removed under our retention rules.",
  },
  {
    q: "Can someone else upload on my behalf?",
    a: "Only someone authorized to act for you, using their own access. Never share your sign-in details.",
  },
  {
    q: "What if someone asks me to send documents outside DriverXtra?",
    a: "Don’t send them. Requests for documents by email, chat apps or links are a common scam — report suspicious document requests.",
  },
];

import type { Faq } from "@/components/ui/FaqSection";

export const topics = [
  { title: "Ownership", text: "Who holds title, and when it passes" },
  { title: "Ongoing costs", text: "What the regular payment does and doesn't cover" },
  { title: "Flexibility", text: "Mileage, modifications and ending early" },
  { title: "End obligations", text: "Return, payoff or purchase terms" },
];

export type ExplainItem = { title: string; summary: string; detail: string };

export const loanItems: ExplainItem[] = [
  {
    title: "Instalment loan",
    summary: "A set of scheduled repayments under the provider's contract.",
    detail: "You repay the amount borrowed plus interest in regular instalments over an agreed term. The contract sets the amount, dates and what happens if a payment is missed.",
  },
  {
    title: "Fixed interest",
    summary: "The rate basis may be fixed by agreement.",
    detail: "With a fixed rate, the interest rate — and usually the repayment — stays the same for the term, so the total cost is known at the start.",
  },
  {
    title: "Variable rate",
    summary: "The rate or repayments may change under stated conditions.",
    detail: "A variable rate can rise or fall during the term, so repayments and the total cost may change. The agreement says how and when.",
  },
  {
    title: "Secured loan",
    summary: "The provider may hold security linked to the vehicle.",
    detail: "Hire purchase and some loans are secured on the vehicle: the provider may own it, or hold a right over it, until the debt is repaid, and may repossess it if you don't pay.",
  },
  {
    title: "Unsecured personal loan",
    summary: "May not use the vehicle as direct security.",
    detail: "You usually own the vehicle from the start, but the lender can still take action to recover the debt if you don't repay. Rates can differ from secured finance.",
  },
  {
    title: "Balloon or final payment",
    summary: "Some agreements end with a much larger payment.",
    detail: "Agreements like PCP lower the monthly payment by leaving a large optional final payment. You can usually pay it to own the vehicle, return it, or part-exchange it.",
  },
  {
    title: "Paying off early",
    summary: "Payoff amount and fees depend on the agreement and law.",
    detail: "You can usually settle early by asking for a settlement figure. Early-settlement charges and interest rebates depend on the agreement and local law.",
  },
  {
    title: "Used-vehicle loans",
    summary: "Providers may limit vehicle age, mileage or category.",
    detail: "Many providers finance used vehicles, but may cap the vehicle's age at the end of the term, its mileage or its type. Rates may also differ.",
  },
];

export const leaseItems: ExplainItem[] = [
  {
    title: "Due at signing",
    summary: "Upfront money may include the first payment, fees, taxes and a security deposit.",
    detail: "Leases often start with an initial rental — commonly several months' payments — plus any arrangement fee. Ask exactly what's included before you sign.",
  },
  {
    title: "Periodic payment",
    summary: "Paid for agreed use under the contract's conditions.",
    detail: "The regular rental pays for using the vehicle for the term and mileage agreed. It doesn't build ownership.",
  },
  {
    title: "Ownership",
    summary: "Title and right of use depend on the contract and jurisdiction.",
    detail: "With most leases the finance company keeps ownership throughout. You have the right to use the vehicle on the contract's terms.",
  },
  {
    title: "Purchase option",
    summary: "A future price may be set, calculated later, or not offered.",
    detail: "Some leases include an option to buy at the end; many personal contract hire agreements don't. Check whether, how and at what price.",
  },
  {
    title: "Mileage and use",
    summary: "Agreements may limit distance, area, business use or modifications.",
    detail: "Going over the mileage allowance usually means a charge per mile. Some contracts also limit business use, foreign travel or modifications.",
  },
  {
    title: "Wear and condition",
    summary: "Return may involve inspection and end-of-term charges.",
    detail: "The vehicle is inspected when returned. Damage beyond fair wear and tear, as defined in the contract, can be charged.",
  },
  {
    title: "Start and end fees",
    summary: "Providers may charge at the start or end.",
    detail: "Arrangement, documentation, collection or disposal fees may apply. A full fee list should be available before you sign.",
  },
  {
    title: "Ending early",
    summary: "Ending early may create substantial liability; transfers may not be allowed.",
    detail: "Early termination can cost a large share of the remaining rentals. Some providers allow the lease to be transferred; many don't.",
  },
  {
    title: "Insurance and servicing",
    summary: "You may have specified insurance, maintenance and servicing duties.",
    detail: "Leases usually require fully comprehensive insurance and servicing to the manufacturer's schedule, unless a maintenance package is included.",
  },
  {
    title: "Personal vs business",
    summary: "Business tax and eligibility depend on the organisation and jurisdiction.",
    detail: "Business contract hire can have different VAT and tax treatment, and different eligibility checks. Get qualified advice for your organisation.",
  },
];

export const loanJourney = [
  { title: "Agree", text: "Amount, rate basis, term and fees" },
  { title: "Repay", text: "Scheduled payments over the term" },
  { title: "Settle", text: "Final payment, any balloon, or early payoff" },
  { title: "Release", text: "Security or title released when obligations are met" },
];

export const leaseJourney = [
  { title: "Sign", text: "Amount due at signing, term, mileage" },
  { title: "Use", text: "Periodic payments within permitted use" },
  { title: "Inspect", text: "Condition and mileage checked at the end" },
  { title: "Return or decide", text: "Return, renew or buy — only if the contract allows" },
];

export const tradeoffs: [string, string, string][] = [
  ["What it's for", "May support financing a purchase and eventual unencumbered ownership, subject to terms.", "May support use of a vehicle for a specified term, with end rights depending on the agreement."],
  ["Upfront spend", "Down payment, taxes and origination or other charges, as applicable.", "Amount due at signing, which may include first payment, fees, taxes and a security deposit."],
  ["During the contract", "Scheduled repayments; the rate basis and term matter.", "Periodic payments; permitted use, maintenance and insurance duties matter."],
  ["End of the arrangement", "Loan balance, title or security release, and any resale or equity position.", "Return, renewal or purchase — only if the contract allows — plus any fees."],
  ["Mileage and use", "Often fewer contractual mileage limits for consumer purchase loans, but restrictions vary.", "Mileage, use and wear limits may apply; terms vary by provider."],
  ["Modifications", "Usually more flexibility, subject to lien, warranty and law.", "Alterations may be restricted or need restoring before return."],
  ["Cost uncertainty", "Rate changes (if variable), repairs, depreciation, late or early payment charges.", "Excess mileage or wear, end-of-term charges, payment changes and early-exit charges."],
  ["Long-term economics", "Ownership may have resale value; depreciation, finance and upkeep also matter.", "Return or purchase terms, fees and repeated leasing costs matter. No blanket winner."],
  ["Credit decision", "The provider assesses you under its own process. Nothing here implies approval.", "The provider or lessor approves you, possibly with different criteria."],
  ["Insurance", "Cover levels may be required by the contract or law.", "Cover and loss obligations may be set by the lessor and law."],
  ["Tax and incentives", "Depends on location and individual facts.", "Lease tax and incentive treatment can differ; get qualified advice where needed."],
  ["Ending early", "Payoff amount and any fees depend on the agreement and law.", "Early termination may create substantial liability; transfers may not be allowed."],
];

export const faqs: Faq[] = [
  {
    q: "What is the main difference between a vehicle loan and a lease?",
    a: "A loan generally finances a purchase, while a lease generally grants use of a vehicle under an agreement for a defined period. Title, payment obligations and end-of-term choices depend on the contract and applicable law.",
  },
  {
    q: "Will I own the car at the end of a loan?",
    a: "Usually, once every payment and any final payment are made. With secured finance like hire purchase, ownership passes only when the agreement is fully paid.",
  },
  {
    q: "Can I buy the vehicle when my lease ends?",
    a: "Only if your contract includes a purchase option. Many personal leases don't — check before you sign.",
  },
  {
    q: "Is leasing always cheaper than financing?",
    a: "No. Monthly payments can be lower, but you don't own the vehicle and may face mileage, wear and end-of-term charges. Compare the total cost over the time you'll keep the vehicle.",
  },
  {
    q: "What should I look for in the total cost?",
    a: "All upfront payments, every regular payment, fees, any balloon or purchase price, and likely end-of-term charges — not just the monthly figure.",
  },
  {
    q: "Do all leases have mileage limits?",
    a: "Most do. Going over the allowance usually costs a set amount per mile, shown in the contract.",
  },
  {
    q: "What happens if a leased vehicle has excess wear?",
    a: "You may be charged for damage beyond fair wear and tear, as defined in your contract and assessed at inspection.",
  },
  {
    q: "Can I exit a loan or lease early?",
    a: "Usually, but costs differ. Loans have a settlement figure; leases can carry significant early-termination charges.",
  },
  {
    q: "Do I need a deposit or down payment?",
    a: "Not always. A larger deposit lowers repayments on a loan; leases typically ask for an initial rental instead.",
  },
  {
    q: "Are loans and leases available for used vehicles?",
    a: "Loans for used vehicles are common. Used-vehicle leases exist but are less widely offered.",
  },
  {
    q: "Are EV finance or lease incentives guaranteed?",
    a: "No. Incentives depend on the market, the vehicle, the provider and current rules, and can change or end.",
  },
  {
    q: "Does using this page check my credit?",
    a: "No. This page is general information. A credit check only happens if you apply to a provider, and they must tell you first.",
  },
  {
    q: "Can a business or fleet operator use these options?",
    a: "Yes. Business contract hire and business loans are available from some providers, with different eligibility and tax treatment.",
  },
  {
    q: "Does DriverXtra decide my rate or approve my financing?",
    a: "No. DriverXtra isn't a lender. Providers set rates and make every decision.",
  },
];

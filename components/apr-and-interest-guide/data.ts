import type { Faq } from "@/components/ui/FaqSection";

export const terms = [
  { title: "Interest rate", text: "The percentage charged on the money you borrow, usually per year. On its own it doesn't include fees." },
  { title: "APR", text: "Annual percentage rate — a broader yearly measure of borrowing cost that can include certain fees, depending on local rules." },
  { title: "Amount financed", text: "What you actually borrow after your down payment and any trade-in." },
  { title: "Finance charge", text: "The cost of credit in money terms — interest and certain fees." },
  { title: "Term", text: "How many months you repay over." },
  { title: "Total repayment", text: "Everything you pay back over the term: the amount financed plus the finance charge." },
];

export const comparison = [
  { row: "What it measures", rate: "The cost of borrowing the money itself", apr: "A broader yearly cost of credit" },
  { row: "Includes fees?", rate: "No", apr: "Can include certain lender fees — which ones depends on local rules" },
  { row: "Best used for", rate: "Working out the interest part of a payment", apr: "Comparing similar loans on the same basis" },
  { row: "Who sets it", rate: "The lender, for you", apr: "The lender, calculated under local disclosure rules" },
];

export const financeCharges = ["Interest", "Loan arrangement or origination fees", "Some credit-related charges"];
export const notFinanceCharges = ["Insurance, fuel or charging", "Registration, tax and maintenance", "Optional products — unless you choose to finance them"];

export const watchOut = [
  { title: "Variable rates", text: "The rate can change, so future payments aren't fixed." },
  { title: "Balloon payments", text: "A large final payment changes the whole schedule." },
  { title: "Late charges", text: "Fees for missed or late payments add to the cost." },
  { title: "Optional extras", text: "Add-ons you finance increase the amount you borrow." },
];

export const rateKinds = ["A nominal interest rate", "An APR", "Not sure"] as const;
export type RateKind = (typeof rateKinds)[number];
export const loanTypes = ["Fixed rate, equal monthly payments", "Variable rate", "Balloon payment"] as const;
export type LoanType = (typeof loanTypes)[number];
export const feeTimings = ["Up front", "Monthly", "At the end"] as const;
export const feeClasses = ["Unknown", "Finance charge", "Not a finance charge"] as const;

export const faqs: Faq[] = [
  { q: "What is APR?", a: "APR is an annualized measure of borrowing cost. Depending on applicable rules it reflects interest plus certain finance charges; check the actual creditor disclosure." },
  { q: "How is interest rate different from APR?", a: "The interest rate is the cost of the money itself. APR can also include certain fees, so it's usually equal to or higher than the interest rate." },
  { q: "Is a low APR always the cheapest loan?", a: "Not always. Compare the total repayment over the same term, and check for fees or optional products outside the APR." },
  { q: "Does APR include all dealer fees?", a: "No. Which fees are included depends on local rules. Some dealer fees and optional products may sit outside the APR." },
  { q: "Does APR include taxes and registration?", a: "Usually not. Taxes and registration are costs of owning the car, even if you choose to finance them." },
  { q: "What is a finance charge?", a: "The cost of credit in money terms — interest plus certain fees — over the life of the loan." },
  { q: "Can I calculate official APR here?", a: "No. Official APR follows local disclosure rules and is calculated by the lender. This calculator uses a simple nominal rate." },
  { q: "Why do my payments differ from a lender quote?", a: "Lenders may include fees, use different day-count methods or round differently. Their disclosure is the authoritative figure." },
  { q: "What happens when a loan has 0% interest?", a: "Each payment is simply the amount financed divided by the term. Check whether fees or a higher price offset the 0% rate." },
  { q: "Does a longer term reduce the total price?", a: "No. A longer term lowers each payment but usually increases the total interest you pay." },
  { q: "Are variable-rate loans covered?", a: "No. This example assumes a fixed rate. With a variable rate, future payments can change." },
  { q: "What about balloon payments?", a: "They aren't covered. A large final payment changes the schedule — ask the lender for the full repayment table." },
  { q: "Can I compare two lender APRs?", a: "Yes — tick “Compare two scenarios” and enter each rate with the same amount and term to compare like for like." },
  { q: "Does the guide check my credit?", a: "No. Nothing you enter is shared or stored." },
  { q: "Are the numbers current lender offers?", a: "No. Every figure is your own hypothetical number. This guide doesn't show real offers." },
  { q: "Does a down payment change APR?", a: "It reduces the amount financed and the interest paid. The rate itself is set by the lender and may or may not change." },
  { q: "Can fees be financed into the loan?", a: "Sometimes. Financed fees increase the amount you borrow, so you pay interest on them too." },
  { q: "Where do I find the authoritative APR?", a: "In the lender's credit agreement or pre-contract disclosure. That document takes priority over any estimate." },
];

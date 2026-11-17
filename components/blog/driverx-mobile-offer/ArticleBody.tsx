import { Sparkles } from "lucide-react";
import { container } from "@/components/ui/SectionTitle";
import { A, Callout, CheckList, Figure, H2, H3, NumberedCard, P } from "../Prose";
import { DRIVERX_URL, IMG, QUICK_SUMMARY, SAVINGS_ROWS, TOC } from "./data";

function QuickSummary() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
      <p className="flex items-center gap-2 text-sm font-bold tracking-wide text-gold uppercase">
        <Sparkles className="h-4 w-4" /> Quick summary
      </p>
      <ul className="mt-4 space-y-3">
        {QUICK_SUMMARY.map(({ label, text }) => (
          <li key={label} className="flex gap-3 text-[15px] leading-relaxed text-slate-700">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-dark" />
            <span>
              <strong className="text-ink">{label}:</strong> {text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Toc() {
  return (
    <nav aria-label="On this page" className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-bold tracking-wide text-slate-500 uppercase">On this page</p>
      <ol className="mt-3 space-y-1">
        {TOC.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="block rounded-md border-l-2 border-transparent px-3 py-1.5 text-[14px] text-slate-600 transition-colors hover:border-brand hover:bg-slate-50 hover:text-ink"
            >
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function SavingsTable() {
  return (
    <figure className="mt-6">
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-left text-[15px]">
          <thead className="bg-navy text-white">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">Eligible monthly plan charge</th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {SAVINGS_ROWS.map(({ label, amount, highlight }) => (
              <tr key={label} className={highlight ? "bg-brand-light font-bold text-ink" : "bg-white text-slate-700"}>
                <td className="px-5 py-3">{label}</td>
                <td className="px-5 py-3 text-right tabular-nums">{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 text-[13px] leading-relaxed text-slate-500">
        Illustration only. The $50 plan charge is an example, not a confirmed DriverX Mobile plan price. Actual savings
        depend on the eligible plan charge and applicable promotional conditions.
      </figcaption>
    </figure>
  );
}

export default function ArticleBody() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className={`${container} grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)]`}>
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <Toc />
          </div>
        </aside>

        <article className="max-w-[760px]">
          <QuickSummary />

          <P>
            Staying connected is essential for today&apos;s professional drivers. Whether you work in rideshare, food
            delivery, freight transportation, logistics or other mobile professions, your smartphone plays an important
            role in managing your daily activities. From accessing navigation and accepting customer requests to
            communicating with clients and tracking deliveries, reliable mobile connectivity helps keep your work moving.
          </P>
          <P>
            However, maintaining a dependable mobile connection can become an ongoing expense, particularly for drivers
            who spend several hours on the road every day.
          </P>
          <P>
            That&apos;s where DriverX Mobile aims to make a difference. With its latest promotional offer, eligible
            customers can enjoy 35% off eligible driver-plan charges for the first three months, helping reduce initial
            mobile connectivity costs. Eligible new lines may also qualify for an activation-fee waiver, subject to
            commercial approval.
          </P>
          <P>
            For drivers looking to manage their mobile expenses while maintaining access to essential connectivity, this
            introductory offer provides an opportunity to explore driver-focused mobile solutions.
          </P>
          <P>
            Discover how DriverX Mobile helps drivers stay connected and how you can take advantage of this limited
            introductory saving opportunity.
          </P>

          <H2 id="save-35">Save 35% on Eligible DriverX Mobile Plans for Three Months</H2>
          <P>
            Managing expenses is an important part of working as an independent driver or transportation professional.
            Mobile connectivity is one of the everyday costs that can support your work, making it worthwhile to explore
            plans and offers that provide better value.
          </P>
          <P>
            With the DriverX Mobile introductory promotion, eligible customers can receive 35% off eligible driver-plan
            charges for their first three months.
          </P>
          <P>
            This promotional saving gives qualifying new customers an opportunity to experience DriverX Mobile while
            reducing their eligible plan charges during the introductory period.
          </P>
          <P>
            For example, drivers who regularly depend on their smartphones for navigation, delivery applications,
            communication and other work-related activities can explore suitable mobile plan options while benefiting
            from the promotional discount.
          </P>
          <P>
            In addition, eligible new lines may qualify for a waived activation fee where commercially approved. This
            provides another potential opportunity to reduce the initial cost of getting started.
          </P>
          <P>The key benefits of this promotional offer include:</P>
          <CheckList
            items={[
              "35% off eligible driver-plan charges for the first three months.",
              "Potential activation-fee savings for eligible new lines, subject to commercial approval.",
              "An opportunity to explore driver-focused mobile connectivity.",
              "Access to mobile solutions designed around the needs of working drivers.",
            ]}
          />
          <Callout>
            Customers should check the applicable promotional terms, eligible plans and activation conditions before
            purchasing.
          </Callout>

          <H2 id="why-connectivity">Why Mobile Connectivity Matters for Professional Drivers</H2>
          <P>
            For professional drivers, a smartphone is much more than a communication device. It is an essential work
            tool that supports daily operations and helps manage different responsibilities throughout the day.
          </P>
          <P>
            Consider a delivery driver completing multiple orders. They may need to access a delivery application,
            follow GPS directions, communicate with customers and check updated delivery instructions. A rideshare
            driver may depend on mobile applications to receive trip requests, navigate unfamiliar locations and
            communicate with passengers.
          </P>
          <P>All these activities require dependable access to mobile services.</P>
          <Figure
            src={`${IMG}/downtime-city-aerial.webp`}
            alt="Aerial view of city streets and traffic"
            caption="Navigation, trip requests and customer messages all depend on a dependable connection."
          />
          <P>Here are some reasons why mobile connectivity is important for drivers.</P>
          <div className="mt-6 grid gap-4">
            <NumberedCard n={1} title="Navigation and Route Planning">
              <p>
                Navigation applications help drivers identify routes, understand traffic conditions and reach
                destinations more efficiently. Having access to mobile data makes it easier to use digital maps and
                receive updated route information.
              </p>
              <p>For drivers who regularly travel through unfamiliar areas, navigation is an essential part of their working routine.</p>
            </NumberedCard>
            <NumberedCard n={2} title="Managing Delivery and Rideshare Applications">
              <p>
                Many independent drivers use digital platforms to receive assignments, manage bookings and communicate
                with customers.
              </p>
              <p>
                Applications associated with rideshare and delivery services can become central to daily operations. A
                suitable mobile plan helps drivers maintain access to these important digital tools.
              </p>
            </NumberedCard>
            <NumberedCard n={3} title="Communication with Customers">
              <p>
                Clear communication helps drivers coordinate pickups, confirm delivery instructions and respond to
                customer enquiries.
              </p>
              <p>
                Mobile connectivity supports calls, messages and other communication services that help keep these
                interactions organised.
              </p>
            </NumberedCard>
            <NumberedCard n={4} title="Managing Multiple Work Applications">
              <p>
                Some professional drivers use several applications throughout the day, including navigation, delivery
                platforms, messaging services and business management tools.
              </p>
              <p>
                Choosing a mobile plan that matches actual data usage can help drivers manage these activities without
                paying for features they do not need.
              </p>
            </NumberedCard>
          </div>

          <H2 id="driver-focused">DriverX Mobile: Connectivity Designed Around Drivers</H2>
          <P>
            DriverX Mobile focuses on the connectivity requirements of professional drivers, gig workers, fleet operators
            and mobile professionals.
          </P>
          <P>
            Unlike a general mobile service approach, its website highlights solutions designed around the needs of
            people who depend on mobile technology while working.
          </P>
          <P>
            The company supports different driver categories, including rideshare professionals, independent delivery
            workers and commercial transportation operators.
          </P>
          <P>
            Its driver-focused services are designed to help customers explore connectivity solutions suited to their
            work requirements.
          </P>

          <H3>Mobile Solutions for Gig and Delivery Drivers</H3>
          <Figure
            src={`${IMG}/audience-courier-delivery.webp`}
            alt="Courier handing over a cardboard parcel"
          />
          <P>Independent drivers often depend on their smartphones to manage work throughout the day.</P>
          <P>
            From accepting delivery requests to accessing navigation and coordinating customer interactions, mobile
            connectivity supports multiple parts of the working process.
          </P>
          <P>
            DriverX Mobile provides driver-focused plans for people working across different gig and delivery
            activities.
          </P>
          <P>
            These solutions are relevant to professionals using platforms such as Uber, Lyft, DoorDash, Amazon Flex and
            other delivery and transportation services.
          </P>
          <P>
            Drivers can explore the available options through the official{" "}
            <A href={DRIVERX_URL}>DriverX Gig and Delivery Driver Plans</A> page.
          </P>

          <H3>Connectivity Options for Fleet and Logistics Operations</H3>
          <Figure src={`${IMG}/audience-fleet-truck.webp`} alt="Commercial fleet truck on the road" />
          <P>
            Businesses operating transportation and logistics fleets have different connectivity requirements from
            individual drivers.
          </P>
          <P>
            Fleet operators may need mobile services that support communication, location-related tools, connected
            devices and coordination between drivers and management teams.
          </P>
          <P>
            DriverX Mobile also offers fleet and logistics connectivity solutions designed to support commercial
            transportation operations.
          </P>
          <P>
            Businesses can explore the available services through the{" "}
            <A href={DRIVERX_URL}>DriverX Fleet and Logistics Connectivity</A> page.
          </P>

          <H3>Flexible Mobile Plan Options</H3>
          <P>Different drivers have different connectivity requirements.</P>
          <P>
            A part-time delivery driver may have different data requirements from someone working full-time in rideshare
            or managing multiple delivery applications.
          </P>
          <P>DriverX Mobile provides different plan categories, including prepaid, postpaid, business and data-only options.</P>
          <P>
            Exploring these categories can help customers identify an option that better matches their usage
            requirements and budget.
          </P>
          <P>
            Visit the official <A href={DRIVERX_URL}>DriverX Mobile Plans</A> page to explore available options.
          </P>

          <H2 id="how-discount-helps">How the 35% Introductory Discount Helps Drivers Save</H2>
          <P>
            Mobile expenses can add up over time, particularly for individuals who use their phones extensively for
            professional activities.
          </P>
          <P>An introductory discount can help reduce the cost of eligible services during the initial months of a mobile plan.</P>
          <P>
            With DriverX Mobile&apos;s 35% introductory promotion, qualifying customers can benefit from reduced eligible
            driver-plan charges for three months.
          </P>
          <P>Here is an illustrative example of how the discount works:</P>
          <SavingsTable />
          <P>
            For customers who qualify, the activation-fee waiver may provide additional upfront savings when
            commercially approved.
          </P>
          <P>
            Before activating a new line, customers should confirm whether their selected plan qualifies and whether any
            activation charges or other fees apply.
          </P>

          <H2 id="who-benefits">Who Can Benefit from DriverX Mobile&apos;s Promotional Offer?</H2>
          <P>
            The introductory promotion may be relevant to several types of mobile customers, particularly those who
            depend on connectivity for their professional activities.
          </P>
          <Figure
            src={`${IMG}/audience-rideshare-driver.webp`}
            alt="Driver's hand on a steering wheel with city lights at dusk"
          />
          <H3>Rideshare Drivers</H3>
          <P>
            Rideshare professionals regularly use mobile applications to manage trip requests, navigate routes and
            communicate with passengers. A suitable mobile plan can help support these everyday activities.
          </P>
          <H3>Food Delivery Drivers</H3>
          <P>
            Food delivery professionals depend on digital platforms to receive orders, check delivery details and
            coordinate with customers. Mobile connectivity plays an important role in keeping these activities
            accessible.
          </P>
          <H3>Independent Gig Workers</H3>
          <P>
            Gig workers often manage multiple responsibilities using their smartphones. Whether accessing work
            platforms, checking schedules or communicating with customers, a suitable mobile service can support their
            daily routines.
          </P>
          <H3>Commercial and Fleet Drivers</H3>
          <P>
            Transportation businesses need effective communication between drivers, operations teams and fleet
            managers. DriverX Mobile&apos;s fleet-focused solutions provide another option for businesses exploring
            mobile connectivity for their operations.
          </P>
          <H3>Frequent Travellers and Mobile Professionals</H3>
          <P>
            Professionals who spend significant time travelling may benefit from exploring mobile solutions that suit
            their communication and data requirements. The right plan depends on individual usage, coverage
            availability and service requirements.
          </P>

          <H2 id="what-to-consider">What to Consider Before Choosing a Driver Mobile Plan</H2>
          <P>Finding an appropriate mobile plan involves more than comparing promotional discounts.</P>
          <P>Drivers should consider their actual connectivity requirements before selecting a service.</P>
          <P>Here are some important factors to evaluate.</P>
          <H3>Data Allowance</H3>
          <P>
            Think about how much mobile data you use every month. Navigation, video calls, messaging, streaming and work
            applications can contribute to overall data consumption. Choosing a plan that matches your typical usage can
            help avoid unnecessary expenses.
          </P>
          <H3>Network Coverage</H3>
          <P>
            Coverage is particularly important for drivers who travel between cities, suburbs and different working
            locations. Check the provider&apos;s coverage information for the areas where you regularly work and travel.
          </P>
          <H3>Mobile Hotspot Availability</H3>
          <Figure src={`${IMG}/feature-hotspot-laptop.webp`} alt="Laptop connected to a phone's mobile hotspot" />
          <P>
            Some drivers use hotspot functionality to connect additional devices. If you need to connect a tablet,
            laptop or another compatible device, check whether your chosen plan includes hotspot access and what limits
            apply.
          </P>
          <H3>Plan Flexibility</H3>
          <P>
            Your mobile requirements may change depending on working hours, seasonal demand and professional
            activities. Review available billing arrangements, plan conditions and cancellation policies before making
            a decision.
          </P>
          <H3>Customer Support</H3>
          <P>
            Accessible customer support can be useful when you experience activation difficulties, billing questions or
            connectivity issues. Consider the available support channels and service hours when comparing mobile
            providers.
          </P>

          <H2 id="how-to-explore">How to Explore the DriverX Mobile Offer</H2>
          <P>
            Getting started with a new mobile service should involve understanding the available plans and checking the
            conditions of the promotional offer.
          </P>
          <P>Customers interested in the DriverX Mobile introductory promotion can follow these steps:</P>
          <Figure src={`${IMG}/steps-car-on-road.webp`} alt="Car driving along an open road" />
          <div className="mt-6 grid gap-4">
            <NumberedCard n={1} title="Visit the Official Website">
              <p>
                Start by visiting <A href={DRIVERX_URL}>www.driverxmobile.com</A> to explore the company&apos;s mobile
                services and available solutions.
              </p>
            </NumberedCard>
            <NumberedCard n={2} title="Review Available Mobile Plans">
              <p>
                Compare the available prepaid, postpaid, business and data-only plans to identify an option that suits
                your connectivity requirements.
              </p>
            </NumberedCard>
            <NumberedCard n={3} title="Check Promotional Eligibility">
              <p>Confirm whether your selected driver plan qualifies for the 35% introductory discount during the first three months.</p>
            </NumberedCard>
            <NumberedCard n={4} title="Confirm Activation Conditions">
              <p>
                Ask whether your new line qualifies for an activation-fee waiver. This benefit is subject to eligibility
                and commercial approval.
              </p>
            </NumberedCard>
            <NumberedCard n={5} title="Review the Terms Before Activation">
              <p>
                Check the applicable charges, promotional period, plan conditions and any additional fees before
                completing your purchase.
              </p>
            </NumberedCard>
          </div>
          <P>For further information, customers can contact DriverX Mobile through its official website.</P>

          <H2 id="why-driver-focused">Why Choose a Driver-Focused Mobile Solution?</H2>
          <P>
            Drivers have different connectivity requirements from people who primarily use their phones for personal
            communication.
          </P>
          <P>
            A professional driver may depend on mobile services throughout an entire working day. Even small
            interruptions to communication or access to essential applications can create inconvenience.
          </P>
          <P>A driver-focused mobile solution recognises these practical requirements.</P>
          <Figure src={`${IMG}/feature-talk-text-phone.webp`} alt="Smartphone showing calls and messages" />
          <P>DriverX Mobile highlights several areas of its service offering:</P>
          <CheckList
            items={[
              "Connectivity solutions for gig workers and professional drivers.",
              "Mobile services for fleet and logistics operations.",
              "Options for different plan categories and usage requirements.",
              "Driver-focused support and connected services.",
              "Additional services designed to support mobile professionals.",
            ]}
          />
          <P>
            The company also highlights smart savings features and vehicle-related services as part of its wider
            driver-focused ecosystem.
          </P>
          <P>
            For more information about its approach and services, visit the{" "}
            <A href={DRIVERX_URL}>DriverX Mobile official website</A>.
          </P>
        </article>
      </div>
    </section>
  );
}

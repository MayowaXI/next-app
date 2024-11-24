import React from "react";

const EnergyBillReliefPage: React.FC = () => {
  return (
    <div className="bg-gray-100 text-gray-800 font-sans">
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MainContent />
        <NewsSection />
      </div>
      <CallToAction />
      <Footer />
      <StickyButton />
    </div>
  );
};

const Header: React.FC = () => (
  <header
    className="bg-blue-600 text-white py-6"
    style={{
      backgroundImage: "url('/header-bg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      {/* Left Content */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold">
          Energy Bill Relief Fund 2024-25
        </h1>
        <p className="mt-2 text-base md:text-lg">
          Supporting Australian households and small businesses to ease
          cost-of-living pressures.
        </p>
      </div>

      {/* Right Button */}
      <div className="mt-4 md:mt-0">
        <a
          href="/mygov"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors"
        >
          Apply Now
        </a>
      </div>
    </div>
  </header>
);


const MainContent: React.FC = () => (
  <main className="bg-white shadow-md rounded-lg p-8 lg:col-span-2">
    <Overview />
    <Households />
    <SmallBusinesses />
    <Eligibility />
    <FAQ />
  </main>
);

// Corrected the duplication and improper nesting in the Overview component
const Overview: React.FC = () => (
  <section className="mb-10">
    <h2 className="text-3xl font-semibold mb-6 text-blue-600">Overview</h2>
    <p className="text-base leading-relaxed">
      The Australian Government is providing <strong>$3.5 billion</strong> to
      extend and expand the Energy Bill Relief Fund and provide electricity bill
      rebates to Australian households and eligible small business electricity
      customers in 2024-25 to ease cost-of-living pressures. This builds on the{" "}
      <strong>$1.5 billion</strong> available for energy rebates provided by the
      Commonwealth in 2023-24 under the existing fund.
    </p>
    <p className="text-base leading-relaxed mt-4">
      Australian households with electricity bills will receive a{" "}
      <strong>$300 rebate</strong> and eligible small businesses will receive{" "}
      <strong>$325</strong> from the Australian Government. In most cases, the
      rebate will be paid in quarterly instalments on your electricity bill
      throughout 2024-25.
    </p>
    <p className="text-base leading-relaxed mt-4">
      If you have an electricity account on the relevant census date, as
      published in the fact sheets and Q&As below, you will automatically
      receive a rebate on your next electricity bill or as soon as practicable
      after the census date. It may take some time for the credit to be applied
      on your electricity bill, depending on your retailer and state or
      territory government processes.
    </p>
    <p className="text-base leading-relaxed mt-4">
      If you receive your bill for the first quarter and it doesnt have a
      credit on it, you should receive your first quarter credit along with the
      next quarters credit automatically on your next bill.
    </p>
    <p className="text-base leading-relaxed mt-4">
      State and territory governments will administer the rebates and deliver
      the payments through retailers.
    </p>
  </section>
);

const Households: React.FC = () => (
  <section className="mb-10">
    <h2 className="text-3xl font-semibold mb-6 text-blue-600">Households</h2>
    <p className="text-base leading-relaxed">
      Eligible households will automatically receive a <strong>$300 rebate</strong>
      distributed in quarterly instalments. This includes households in embedded
      networks such as strata buildings or caravan parks.
    </p>
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {["ACT", "NSW", "QLD", "VIC", "SA", "TAS", "WA", "NT"].map((state) => (
        <li key={state}>
          <a
            href="#"
            className="text-blue-600 hover:underline font-medium block"
          >
            {state}
          </a>
        </li>
      ))}
    </ul>
    <p className="mt-6">
      <a
        href="#"
        className="inline-block text-blue-600 hover:underline font-medium"
      >
        Fact Sheet: Households and Embedded Network Customers (PDF)
      </a>
    </p>
  </section>
);

const SmallBusinesses: React.FC = () => (
  <section className="mb-10">
    <h2 className="text-3xl font-semibold mb-6 text-blue-600">Small Businesses</h2>
    <p className="text-base leading-relaxed">
      Small businesses will receive a <strong>$325 rebate</strong> if they meet
      state-defined electricity consumption thresholds. Rebates are applied
      quarterly to electricity accounts, providing much-needed financial relief.
    </p>
    <table className="w-full mt-6 border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 border border-gray-200 text-left">State</th>
          <th className="px-4 py-2 border border-gray-200 text-left">
            Annual Consumption Threshold
          </th>
        </tr>
      </thead>
      <tbody>
        {[
          { state: "NSW", threshold: "100 MWh" },
          { state: "VIC", threshold: "40 MWh" },
          { state: "QLD", threshold: "100 MWh" },
          { state: "WA", threshold: "50 MWh" },
          { state: "SA", threshold: "160 MWh" },
          { state: "TAS", threshold: "150 MWh" },
          { state: "ACT", threshold: "100 MWh" },
          { state: "NT", threshold: "160 MWh" },
        ].map(({ state, threshold }) => (
          <tr key={state}>
            <td className="px-4 py-2 border border-gray-200">{state}</td>
            <td className="px-4 py-2 border border-gray-200">{threshold}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p className="mt-6">
      <a
        href="#"
        className="inline-block text-blue-600 hover:underline font-medium"
      >
        Fact Sheet: Small Businesses and Embedded Network Customers (PDF)
      </a>
    </p>
  </section>
);

const Eligibility: React.FC = () => (
  <section className="mb-10">
    <h2 className="text-3xl font-semibold mb-6 text-blue-600">Eligibility</h2>
    <p className="text-base leading-relaxed">
      Households and businesses with active electricity accounts will
      automatically receive the rebate. Concession cardholders may also qualify
      for additional state or territory rebates.
    </p>
    <div className="mt-6 text-center">
      <a
        href="/mygov"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition-colors"
      >
        Apply Now
      </a>
    </div>
  </section>
);

const FAQ: React.FC = () => (
  <section className="mb-10">
    <h2 className="text-3xl font-semibold mb-6 text-blue-600">Frequently Asked Questions</h2>
    <div className="space-y-6">
      {[
        {
          question: "How do I apply for the Energy Bill Relief Fund?",
          answer:
            "Most households and businesses will receive the rebate automatically on their electricity bills. If you do not receive it, contact your electricity retailer.",
        },
        {
          question: "Am I eligible if I receive other energy rebates?",
          answer:
            "Yes, you can receive the Energy Bill Relief Fund rebate in addition to other state or territory energy rebates you may be eligible for.",
        },
        {
          question: "When will the rebate appear on my bill?",
          answer:
            "The rebate will typically appear on your next electricity bill after the relevant census date. Timing may vary depending on your retailer.",
        },
        {
          question: "Do I need to be a concession cardholder to receive the rebate?",
          answer:
            "No, all households and small businesses with active electricity accounts are eligible, regardless of concession status.",
        },
      ].map(({ question, answer }, index) => (
        <div key={index}>
          <h3 className="text-xl font-medium">{question}</h3>
          <p className="text-base leading-relaxed mt-2">{answer}</p>
        </div>
      ))}
    </div>
  </section>
);

const CallToAction: React.FC = () => (
  <section className="py-12 bg-blue-50 text-center">
    <h2 className="text-3xl font-semibold mb-4">Take the Next Step</h2>
    <p className="text-lg leading-relaxed mb-6">
      Learn more about the Energy Bill Relief Fund or apply now to start
      receiving your rebate.
    </p>
    <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:inline-block">
      <a
        href="https://www.energy.gov.au"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors mb-4 sm:mb-0"
      >
        Learn More
      </a>
      <a
        href="/mygov"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition-colors"
      >
        Apply Now
      </a>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto text-center">
      <p>
        &copy; {new Date().getFullYear()} Australian Government. All rights
        reserved.
      </p>
    </div>
  </footer>
);

const StickyButton: React.FC = () => (
  <div className="fixed bottom-4 right-4 sm:right-6 sm:bottom-6">
    <a
      href="/mygov"
      className="inline-block bg-green-600 text-white px-4 py-3 rounded-full text-lg shadow-lg hover:bg-green-700 transition-colors"
    >
      Apply Now
    </a>
  </div>
);

const NewsSection: React.FC = () => (
  <aside className="bg-white shadow-md rounded-lg p-6 lg:col-span-1">
    <h2 className="text-xl font-semibold mb-4">Latest News</h2>
    <div className="space-y-6">
      {[
        {
          title: "EOIs now open for existing home trial energy assessors",
          date: "18 Nov 2024",
          image: "/eois-nathers-consultation-news.jpg",
        },
        {
          title: "Third lender announced for discounted energy upgrade loans",
          date: "15 Nov 2024",
          image: "/household-energy-upgrades-fund-news.jpg",
        },
        {
          title: "Government announces new renewable energy projects",
          date: "10 Nov 2024",
          image: "/renewable-energy-projects.jpg",
        },
        {
          title: "Energy-saving tips for households this summer",
          date: "05 Nov 2024",
          image: "/energy-saving-tips.jpg",
        },
      ].map(({ title, date, }, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0"
        >
          
          <div>
            <h3 className="text-lg font-medium">
              <a href="#" className="text-blue-600 hover:underline">
                {title}
              </a>
            </h3>
            <p className="text-sm text-gray-600">{date}</p>
          </div>
        </div>
      ))}
    </div>
  </aside>
);

export default EnergyBillReliefPage;

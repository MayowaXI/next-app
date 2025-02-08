import React from "react";
import Image from "next/image";
import Link from "next/link";

const UrgentAssistancePage: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
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
  <header className="bg-blue-600 text-white py-4 shadow-lg">
    <div className="container mx-auto px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Image src="/logore.png" alt="Logo" width={50} height={50} className="rounded-full" />
        <h1 className="text-2xl font-bold ml-4">Urgent Needs Assistance Program</h1>
      </div>
      <nav>
        <ul className="flex space-x-6">
        <li><Link href="/" className="hover:text-blue-200 transition-colors">Home</Link></li>
          <li><a href="/about" className="hover:text-blue-200 transition-colors">About</a></li>
          <li><a href="/contact" className="hover:text-blue-200 transition-colors">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

const MainContent: React.FC = () => (
  <main className="bg-white shadow-lg rounded-xl p-8 lg:col-span-2">
    <Overview />
    <Eligibility />
    <HowToApply />
    <FAQ />
  </main>
);

const Overview: React.FC = () => (
  <section className="mb-10">
    <h2 className="text-3xl font-semibold mb-6 text-blue-600">Overview</h2>
    <p className="text-base leading-relaxed">
      Life is unpredictable, and sometimes, emergencies happen when we least expect them. The Urgent Need Assistance Program is here to support
      you in your time of greatest need. Whether you&apos;re facing a natural disaster, a financial crisis, or any other critical situation, our mission is
      to provide quick, easy, and reliable support to get you back on your feet.
    </p>
    <p className="text-base leading-relaxed mt-4">
      With a streamlined application process and no red tape, we offer immediate funds, housing assistance, and medical support for those who qualify. 
      We know that in times of crisis, every minute counts—and that’s why we’re here to ensure you have the help you need, when you need it most.
    </p>
  </section>
);

const Eligibility: React.FC = () => (
  <section className="mb-10">
    <h2 className="text-3xl font-semibold mb-6 text-blue-600">Eligibility</h2>
    <p className="text-base leading-relaxed">
      The Urgent Need Assistance Program provides aid to:
    </p>
    <ul className="list-disc pl-6 mt-4">
      <li>Families and individuals facing financial hardships due to unforeseen circumstances.</li>
      <li>People who have been impacted by recent natural disasters or emergencies.</li>
      <li>Small businesses struggling to survive following sudden financial shocks.</li>
      <li>Those in immediate need of emergency housing, medical, or mental health support.</li>
    </ul>
    <p className="text-base leading-relaxed mt-6">
      If any of these situations apply to you, we encourage you to apply immediately to receive urgent assistance.
    </p>
  </section>
);

const HowToApply: React.FC = () => (
  <section className="mb-10">
    <h2 className="text-3xl font-semibold mb-6 text-blue-600">How to Apply</h2>
    <p className="text-base leading-relaxed">
      Applying for support from The Urgent Need Assistance Program is simple, quick, and stress-free. Here&apos;s how you can get the help you deserve:
    </p>
    <ol className="list-decimal pl-6 mt-4">
      <li>Click the Apply for Assistance Now button below to begin your application.</li>
      <li>Fill out the form with your basic information and details about your current situation.</li>
      <li>Submit your application, and our team will review it immediately to ensure you get timely assistance.</li>
    </ol>
    <p className="mt-6 text-base leading-relaxed">
      Once you apply, our team will work swiftly to get you the support you need—no waiting, no delays.
    </p>
  </section>
);

const FAQ: React.FC = () => (
  <section className="mb-10">
    <h2 className="text-3xl font-semibold mb-6 text-blue-600">Frequently Asked Questions</h2>
    <div className="space-y-6">
      {[
        {
          question: "How do I apply for urgent assistance?",
          answer:
            "Simply click the 'Apply for Assistance Now' button, complete the short form, and submit it. Our team will review and process your application immediately.",
        },
        {
          question: "Who is eligible for this program?",
          answer:
            "The program is available to anyone who is facing a financial crisis, recovering from a natural disaster, or in need of urgent medical or housing support.",
        },
        {
          question: "How quickly will I receive assistance?",
          answer:
            "Once your application is submitted and approved, you will receive assistance as soon as possible. We understand that time is of the essence in emergencies.",
        },
        {
          question: "Can I apply if I’m already receiving government support?",
          answer:
            "Yes, you can apply for assistance from The Urgent Need Assistance Program, even if you are already receiving other forms of government aid. We are here to provide additional support in your time of need.",
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
    <h2 className="text-3xl font-semibold mb-4">Act Now to Get the Support You Need</h2>
    <p className="text-lg leading-relaxed mb-6">
      Don’t let your situation worsen—apply today and access the urgent help you need to overcome life’s challenges.
    </p>
    <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:inline-block">
      <a
        href="https://www.assistance.gov.au"
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
        &copy; {new Date().getFullYear()} The Urgent Need Assistance Program. All rights reserved.
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
  <aside className="bg-white shadow-lg rounded-xl p-6 lg:col-span-1">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Updates</h2>
    <div className="space-y-8">
      {[
        {
          title: "New Financial Aid Now Available for Vulnerable Groups",
          date: "18 Jan 2025",
          image: "/renewable-energy-projects.jpg",
        },
        {
          title: "How to Apply for Emergency Help in Crisis Situations",
          date: "05 Jan 2025",
          image: "/household-energy-upgrades-fund-news.jpg",
        },
        {
          title: "Quick Tips for Accessing Support in Emergencies",
          date: "01 Jan 2025",
          image: "/energy-saving-tips.jpg",
        },
      ].map(({ title, date, image }, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start"
        >
          <div className="relative w-full sm:w-auto h-28 sm:h-24 rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="sm:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 hover:underline">
              <a href="#">{title}</a>
            </h3>
            <p className="text-sm text-gray-500 mt-1">{date}</p>
          </div>
        </div>
      ))}
    </div>
  </aside>
);

export default UrgentAssistancePage;
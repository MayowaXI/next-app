"use client";

import Head from "next/head";
import Image from "next/image";

export default function ThankYouPage() {
  return (
    <>
      <Head>
        <title>Thank You - MyGov</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:200,400,700|Roboto:300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-[#66d3ee] border-b-4 border-[#5bbad7]">
          <div className="max-w-7xl mx-auto flex items-center p-4">
            <a href="#" className="flex items-center">
              <Image
                src="/images/myGov-cobranded-logo-black.svg"
                alt="myGov Beta Logo"
                width={150}
                height={40}
                className="h-10"
              />
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-xl p-10 max-w-2xl text-center">
            <div className="mb-6">
              <Image
                src="/images/thank-you-icon.svg"
                alt="Thank You"
                width={120}
                height={120}
                className="mx-auto"
              />
            </div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Thank You!
            </h1>
            <p className="text-gray-600 text-lg">
              Your application has been successfully submitted. We appreciate
              your time and effort in completing the process.
            </p>
            <p className="text-gray-600 mt-4">
              If you have any questions or need further assistance, please feel
              free to contact us.
            </p>
            <div className="mt-8">
              <a
                href="#"
                className="px-6 py-3 font-medium text-white bg-[#66d3ee] rounded-lg hover:bg-[#5bbad7] transition focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Return to Home
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-10 mt-12">
          <div className="container mx-auto text-center">
            <ul className="flex justify-center space-x-6 mb-4 text-sm">
              <li>
                <a href="#" className="hover:underline focus:outline-none">
                  Terms of use
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline focus:outline-none">
                  Privacy and security
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline focus:outline-none">
                  Copyright
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline focus:outline-none">
                  Accessibility
                </a>
              </li>
            </ul>
            <Image
              src="/images/myGov-cobranded-logo-white.svg"
              alt="myGov Beta"
              width={150}
              height={40}
              className="h-10 mx-auto"
            />
            <p className="mt-6 text-sm">
              We acknowledge the Traditional Custodians of the lands we live on.
              We pay our respects to all Elders, past and present, of all
              Aboriginal and Torres Strait Islander nations.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

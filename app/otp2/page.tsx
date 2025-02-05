"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const CongratulationsPage = () => {
  const router = useRouter();

  // Redirect to home page after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>Congratulations! - SSI Submission Successful</title>
        <meta
          name="description"
          content="Your SSI information has been successfully submitted. An agent will contact you shortly."
        />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-2xl w-full mx-4 bg-white p-8 sm:p-12 rounded-2xl shadow-xl text-center transform transition-all duration-500 hover:scale-105">
          {/* Animated Checkmark */}
          <div className="mx-auto mb-8 w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-500 animate-checkmark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Congratulations! 🎉
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-700 mb-8">
            Your SSI information has been successfully submitted. An agent will
            contact you shortly to assist you further.
          </p>

          {/* Redirect Message */}
          <p className="text-sm text-gray-500">
            You will be redirected to the home page in{" "}
            <span className="font-semibold">10 seconds</span>...
          </p>

          {/* Manual Redirect Button */}
          <button
            onClick={() => router.push("/")}
            className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go to Home Page
          </button>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes checkmark {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-checkmark {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: checkmark 0.5s ease-in-out forwards;
        }
      `}</style>
    </>
  );
};

export default CongratulationsPage;
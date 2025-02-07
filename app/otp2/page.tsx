"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const SubmittingPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(true);
  const router = useRouter();

  // Simulate submitting process for 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSubmitting(false);
    }, 7000); // 7 seconds to simulate submission

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Submitting Your Information...</title>
        <meta name="description" content="We are processing your information, please wait..." />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        {isSubmitting ? (
          <div className="max-w-2xl w-full mx-4 bg-white p-8 sm:p-12 rounded-2xl shadow-xl text-center">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Submitting...</h1>
            <p className="text-lg sm:text-xl text-gray-700">We are processing your information. Please wait...</p>
            {/* Loading animation */}
            <div className="mx-auto mb-8 w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-yellow-500 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="80"
                  strokeDashoffset="60"
                  className="animate-spin-slow"
                />
              </svg>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl w-full mx-4 bg-white p-8 sm:p-12 rounded-2xl shadow-xl text-center">
            {/* Transition to the next page after submitting */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Information Verification Needed 🛠️</h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8">
              One or more of your details do not match our records. An agent will contact you shortly to assist you further with the verification.
            </p>
            
            <button
              onClick={() => router.push("/")}
              className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Go to Home Page
            </button>
          </div>
        )}
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

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 2s infinite linear;
        }

        .animate-spin-slow {
          animation: spin 3s infinite linear;
        }
      `}</style>
    </>
  );
};

export default SubmittingPage;

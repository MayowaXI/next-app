export const sendTelegramMessage = async (message: string) => {
  try {
    // Fetch IP and Geolocation details using GeoPlugin
    const ipResponse = await fetch("https://www.geoplugin.net/json.gp");
    if (!ipResponse.ok) {
      throw new Error("Failed to fetch geolocation data from GeoPlugin");
    }

    const ipData = await ipResponse.json();
    const ip = ipData.geoplugin_request || "Unavailable";
    const city = ipData.geoplugin_city || "Unknown";
    const region = ipData.geoplugin_region || "Unknown";
    const country = ipData.geoplugin_countryName || "Unknown";

    // Get timestamp
    const timestamp = new Date().toLocaleString();

    // Combine IP and Timestamp with the original message
    const fullMessage = `
      ${message}
      🌐 IP Address: ${ip}
      📍 Location: ${city}, ${region}, ${country}
      ⏰ Time: ${timestamp}
    `;

    // Securely access Telegram bot token and chat ID
    const TELEGRAM_BOT_TOKEN = "7972666652:AAHpQu7Ax4vgN-lL_-psZbWVjptYDvgl7YA"; // Set in environment variables
    const TELEGRAM_CHAT_ID = "1303640598"; // Set in environment variables

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("Telegram bot token or chat ID is missing");
    }

    // Send the message to Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: fullMessage,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send message to Telegram");
    }

    console.log("Message sent to Telegram successfully");
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
};

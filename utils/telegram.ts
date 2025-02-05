export const sendTelegramMessage = async (message: string) => {
  const botToken = "7972666652:AAHpQu7Ax4vgN-lL_-psZbWVjptYDvgl7YA"; // Replace with your bot token
  const chatId = "1303640598"; // Replace with your chat ID or user ID

  if (!botToken || !chatId) {
    console.error("Bot token or chat ID is missing.");
    return;
  }

  try {
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Send message to Telegram API
    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to send message to Telegram. Status: ${response.status}`);
    }

    const responseData = await response.json();
    if (responseData.ok) {
      console.log("Message sent successfully to Telegram:", responseData);
    } else {
      console.error("Telegram API returned an error:", responseData.description);
    }
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
};

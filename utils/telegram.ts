export const sendTelegramMessage = async (message: string) => {
  try {
    // Call the Lambda function via API Gateway
    const response = await fetch("https://354n03ww4c.execute-api.us-east-1.amazonaws.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }), // Pass the message to Lambda
    });

    if (!response.ok) {
      throw new Error("Failed to send message via Lambda");
    }

    const responseData = await response.json();
    console.log("Message sent successfully via Lambda:", responseData);
  } catch (error) {
    console.error("Error sending Telegram message via Lambda:", error);
  }
};

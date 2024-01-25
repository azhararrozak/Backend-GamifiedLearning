const db = require("../models");
const Chat = db.chat;

exports.getHistoryChat = async (req, res) => {
    try {
        // Sort berdasarkan timestamp dari yang terbaru
        let chatHistory = await Chat.find().limit(10).sort({ timestamp: -1 });

        // Reverse array untuk mendapatkan urutan dari yang terbaru ke yang paling lama
        chatHistory = chatHistory.reverse();

        if (!chatHistory || chatHistory.length === 0) {
            return res.status(404).json({ message: "Chat history tidak ditemukan." });
        }
        return res.status(200).json(chatHistory);
    } catch (error) {
        console.error("Gagal mendapatkan chat history:", error);
        res.status(500).json({
            message: "Terjadi kesalahan dalam mendapatkan chat history.",
        });
    }
}
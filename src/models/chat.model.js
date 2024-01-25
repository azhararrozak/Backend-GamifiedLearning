const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

// Set indeks TTL pada bidang timestamp untuk menghapus dokumen setelah 1 hari
chatSchema.index({ timestamp: 1 }, { expireAfterSeconds: 86400 });

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
const mongoose = require("mongoose");

const Badge = mongoose.model(
    "Badge",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        created_At: {
            type: Date,
            default: Date.now,
        },
    })
);

module.exports = Badge;
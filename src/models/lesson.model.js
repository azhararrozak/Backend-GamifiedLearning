const mongoose = require("mongoose");

const Lesson = mongoose.model(
    "Lesson",
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        content: String,
        images: String,
        completedByUsers: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            completed: {
                type: Boolean,
                default: false
            },
        }],
    })
);

module.exports = Lesson;
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
        video: {
            urlVideo: { type: String },
            commentars: [{
                user: String,
                comment: String,
                timestamp: { type: Date, default: Date.now },
            }],
        },
        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Unit",
        },
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
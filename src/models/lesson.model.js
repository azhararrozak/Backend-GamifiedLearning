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
    })
);

module.exports = Lesson;
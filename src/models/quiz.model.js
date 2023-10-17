const mongoose = require("mongoose");

const Quiz = mongoose.model(
    "Quiz",
    new mongoose.Schema({
        question: String,
        image: String,
        answer: [
            {
                text: {
                    type: String,
                    required: true
                },
                isCorrect: {
                    type: Boolean,
                    required: true,
                    default: false
                },
                image: String
            }
        ]
    })
);

module.exports = Quiz;
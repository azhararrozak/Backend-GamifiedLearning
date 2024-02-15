const mongoose = require("mongoose");

const postestAnswerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    answers: [
        {
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        },
        isCorrect: {
            type: Boolean,
            required: true,
        },
        },
    ],
    });

const PostestAnswer = mongoose.model("PostestAnswer", postestAnswerSchema);

module.exports = PostestAnswer;
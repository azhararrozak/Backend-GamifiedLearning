const mongoose = require('mongoose');

const Score = mongoose.model(
    "Score",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        pretest: {
            type: Number,
            default: 0,
        },
        posttest: {
            type: Number,
            default: 0,
        },
        quizmaterial1: {
            type: Number,
            default: 0,
        },
        quizmaterial2: {
            type: Number,
            default: 0,
        },
        quizmaterial3: {
            type: Number,
            default: 0,
        },
        quizmaterial4: {
            type: Number,
            default: 0,
        },
    })
);

module.exports = Score;
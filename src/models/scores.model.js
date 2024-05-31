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
        quizmaterials: [{
            title: String,
            finalScore: Number,
        }],
    })
);

module.exports = Score;
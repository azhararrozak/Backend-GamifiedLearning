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
            score: Number,
        }],
    })
);

module.exports = Score;
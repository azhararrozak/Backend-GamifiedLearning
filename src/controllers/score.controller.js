const db = require("../models");
const Score = db.score;

exports.getAllScore = async (req, res) => {
    try {
        const scores = await Score.find().populate("user", "-__v");
        res.send(scores);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// Ambil data pretest berdasarkan user
exports.getScoreByIdUser = async (req, res) => {
    try {
        const scores = await Score.find({ user: req.userId }).populate("user", "-__v");
        res.send(scores);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


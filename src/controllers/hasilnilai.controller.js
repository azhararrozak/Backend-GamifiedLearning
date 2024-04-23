const db = require("../models");
const AnswerPretest = db.answerPretest;
const AnswerPostest = db.answerPostest;

exports.getHasilNilaiPretest = async (req, res) => {
    try {
        const answerPretest = await AnswerPretest.find().populate("user", "-password");
        res.send(answerPretest);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getHasilNilaiPostest = async (req, res) => {
    try {
        const answerPostest = await AnswerPostest.find().populate("user", "-password");
        res.send(answerPostest);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

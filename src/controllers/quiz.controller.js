const db = require("../models");
const Quiz = db.quiz;

exports.createQuiz = async (req, res) => {
    try {
        const quiz = new Quiz({
            question: req.body.question,
            image: req.body.image,
            answer: req.body.answer,
        });

        await quiz.save();
        res.send({ message: "Quiz was created successfully!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.find();
        res.send(quiz);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        res.send(quiz);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, {
            question: req.body.question,
            image: req.body.image,
            answer: req.body.answer,
        });

        await quiz.save();
        res.send({ message: "Quiz was updated successfully!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndRemove(req.params.id);
        res.send({ message: "Quiz was deleted successfully!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}




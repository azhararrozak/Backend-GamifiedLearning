const db = require("../models");
const Problem = db.problem;

exports.getProblems = async (req, res) => {
    try {
        const problem = await Problem.find();
        res.send(problem);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        res.send(problem);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.createProblem = async (req, res) => {
    try {
        const problem = new Problem({
            title: req.body.title,
            description: req.body.description,
        })

        await problem.save();
        res.send({ message: "Permasalahan berhasil di buat"})
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteProblem = async (req, res) => {
    try {
        await Problem.findByIdAndRemove(req.params.id);
        send({ message: "Berhasil di hapus" })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
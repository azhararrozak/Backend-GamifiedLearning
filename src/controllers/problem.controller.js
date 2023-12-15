const db = require("../models");
const Problem = db.problem;

exports.createProblem = async (req, res) => {
    const { title, description, image } = req.body;

    try {
        const problem = new Problem({
            title,
            description,
            image,
        });

        await problem.save();
        res.send({ message: "Problem was created successfully!" });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.send(problems);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.deleteProblems = async (req, res) => {
    try {
        await Problem.deleteMany();
        res.send({ message: "Problems deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

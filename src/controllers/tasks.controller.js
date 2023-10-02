const db = require("../models");
const Tasks = db.tasks;

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Tasks.find();
        res.send(tasks);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}



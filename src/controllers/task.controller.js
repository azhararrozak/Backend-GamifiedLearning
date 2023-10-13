const db = require("../models");
const Task = db.task;

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.send(task);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.createTask = async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title,
            content: req.body.content
        });

        await task.save();
        res.send({ message: "Task was created successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.title = req.body.title;
        task.content = req.body.content;

        await task.save();
        res.send({ message: "Task was updated successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndRemove(req.params.id);
        res.send({ message: "Task was deleted successfully!" });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.submitTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.completedByUsers.push({ userId: req.userId, urlFile:req.body.urlFile, submitted: true });
        await task.save();
        res.send({ message: "Task was submitted successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.completeTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.submittedByUser.forEach((user) => {
            if (user.userId == req.userId) {
                user.completed = true;
            }
        });
        await task.save();
        res.send({ message: "Task was completed successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getAllSubmittedTask = async (req, res) => {
    try {
        const tasks = await Task.find();
        const submittedTasks = [];
        tasks.forEach((task) => {
            task.submittedByUser.forEach((user) => {
                if (user.userId == req.userId) {
                    submittedTasks.push(task);
                }
            });
        });
        res.send(submittedTasks);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}


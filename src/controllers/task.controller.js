const db = require("../models");
const Task = db.task;

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.send(task);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      urlTask: req.body.urlTask,
      content: req.body.content,
    });

    await task.save();
    res.send({ message: "Task was created successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.title = req.body.title;
    task.content = req.body.content;
    task.urlTask = req.body.urlTask;

    await task.save();
    res.send({ message: "Task was updated successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.id);
    res.send({ message: "Task was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.submitTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    const checkUserSubmited = task.submittedByUser.find(
      (submission) => submission.userId.toString() === req.userId
    );

    if (checkUserSubmited) {
      res
        .status(400)
        .send({ message: "You have already submitted this task!" });
    } else {
      task.submittedByUser.push({
        userId: req.userId,
        urlFile: req.body.urlFile,
        submitted: true,
      });
      await task.save();
      res.send({ message: "Task was submitted successfully!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getListSubmit = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "submittedByUser.userId"
    );
    res.send(task.submittedByUser);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.setcompletedTask = async (req, res) => {
  try {
    
    const task = await Task.findById(req.params.id).populate(
      "submittedByUser.userId"
    );

    const score = req.body.score;

    const checkUserSubmited = task.submittedByUser.find(
      (submission) => submission.userId.username === req.body.name
    );

    if (!checkUserSubmited) {
      res.status(400).send({ message: "You have not submitted this task!" });
    } else {
      if (checkUserSubmited.completed === true) {
        res
          .status(400)
          .send({ message: "You have already completed this task!" });
      } else {
        checkUserSubmited.completed = true;
        checkUserSubmited.score = score;
        await task.save();
        res.send({ message: "Task was completed successfully!" });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

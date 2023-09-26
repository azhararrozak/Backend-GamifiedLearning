const db = require("../models");
const Lesson = db.lesson;

exports.getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find();
        res.send(lessons);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        res.send(lesson);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.createLesson = async (req, res) => {
    try {
        const lesson = new Lesson({
            title: req.body.title,
            content: req.body.content,
            images: req.body.images,
        });

        await lesson.save();
        res.send({ message: "Lesson was created successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        lesson.title = req.body.title;
        lesson.content = req.body.content;
        lesson.images = req.body.images;

        await lesson.save();
        res.send({ message: "Lesson was updated successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteLesson = async (req, res) => {
    try {
        await Lesson.findByIdAndRemove(req.params.id);
        res.send({ message: "Lesson was deleted successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
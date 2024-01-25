const db = require("../models");
const Lesson = db.lesson;
const Unit = db.unit;

exports.getLessons = async (req, res) => {
    try {
        const unit = await Unit.findById(req.params.id).populate("lessons");
        res.send(unit.lessons);
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
        const unitId = req.body.unitId;
        const unit = await Unit.findById(unitId);

        const lesson = new Lesson({
            title: req.body.title,
            content: req.body.content,
            images: req.body.images,
            video: {
                urlVideo: req.body.urlVideo,
            }
        });

        await lesson.save();

        unit.lessons.push(lesson._id);
        await unit.save();

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
        lesson.video.urlVideo = req.body.urlVideo;

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
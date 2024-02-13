const db = require("../models");
const Lesson = db.lesson;
const Unit = db.unit;

exports.getLessons = async (req, res) => {
    try {
        const unit = await Unit.findById(req.params.id).populate("lessons");
        res.send(unit);
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
            unit: unitId,
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
        const lesson = await Lesson.findByIdAndRemove(req.params.id);

        // Check if the lesson exists
        if (!lesson) {
            return res.status(404).send({ message: "Lesson not found" });
        }

        // Remove the lesson from the unit
        await Unit.updateOne(
            { _id: lesson.unit }, // Assuming lesson has a reference to the unit
            { $pull: { lessons: req.params.id } } // Assuming lessons is an array field in the Unit model
        );

        res.send({ message: "Lesson was deleted successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.postCommentVideo = async (req, res) => {
    try{
        const user = req.body.user;
        const comment = req.body.comment;
        const lesson = await Lesson.findById(req.params.id);
        lesson.video.commentars.push({user, comment});
        await lesson.save();
        res.send({ message: "Comment was added successfully!" });
    }catch(err) {
        res.status(500).send({ message: err.message });
    }
}
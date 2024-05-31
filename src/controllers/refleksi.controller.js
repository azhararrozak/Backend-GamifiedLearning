const db = require("../models");
const Refleksi = db.refleksi;

exports.getRefleksi = async (req, res) => {
    try {
        const refleksi = await Refleksi.find().populate("refleksi.userId", "-__v -password");
        res.status(200).json(refleksi);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteRefleksi = async (req, res) => {
    try {
        await Refleksi.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Refleksi has been deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.pushRefleksi = async (req, res) => {
    try {

        const refleksi = await Refleksi.findById(req.params.id);

        //Membuat user hanya push 1 kali
        const user = refleksi.refleksi.find((user) => user.userId == req.userId);
        
        if (user) {
            return res.status(400).json({ message: "Anda Sudah Mengisi Form Refleksi ini" });
        }

        refleksi.refleksi.push({
            userId: req.userId,
            questions: req.body.questions
        })
        await refleksi.save();
        res.status(200).json(refleksi);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getRefleksiById = async (req, res) => {
    try {
        const refleksi = await Refleksi.findById(req.params.id);
        res.status(200).json(refleksi);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const db = require("../models");
const Evaluasi = db.evaluasi;

exports.getEvaluasi = async (req, res) => {
    try {
        const evaluasi = await Evaluasi.find();
        res.status(200).json(evaluasi);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteEvaluasi = async (req, res) => {
    try {
        await Evaluasi.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Evaluasi has been deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.pushEvaluasi = async (req, res) => {
    try {
        const evaluasi = await Evaluasi.findById(req.params.id);
        evaluasi.evaluasi.push({
            ketua: req.body.ketua,
            kelompok: req.body.kelompok,
            content: req.body.content
        })
        await evaluasi.save();
        res.status(200).json(evaluasi);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getEvaluasiById = async (req, res) => {
    try {
        const evaluasi = await Evaluasi.findById(req.params.id);
        res.status(200).json(evaluasi);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


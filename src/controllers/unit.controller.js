const db = require("../models");
const Unit = db.unit;

exports.getUnits = async (req, res) => {
  try {
    const units = await Unit.find().sort({_id: 1});;
    res.send(units);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUnitById = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);
    res.send(unit);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.createUnit = async (req, res) => {
  try {
    const unit = new Unit({
      title: req.body.title,
      description: req.body.description,
      lessons: [],
    });

    await unit.save();
    res.send({ message: "Unit atau Pertemuan berhasil di buat" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateUnit = async (req, res) => {
  try {
    await Unit.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "Unit atau Pertemuan berhasil di update" });
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.deleteUnit = async (req, res) => {
  try {
    await Unit.findByIdAndDelete(req.params.id);
    res.send({ message: "Unit atau Pertemuan berhasil di hapus" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
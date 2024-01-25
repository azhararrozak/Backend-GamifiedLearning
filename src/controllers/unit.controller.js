const db = require("../models");
const Unit = db.unit;

exports.getUnits = async (req, res) => {
    try {
        const units = await Unit.find();
        res.send(units);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getUnitById = async (req, res) => {
    try {
        const unit = await Unit.findById(req.params.id);
        res.send(unit);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.createUnit = async (req, res) => {
    try {
        const unit = new Unit({
            title: req.body.title,
        });

        await unit.save();
        res.send({ message: "Unit was created successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
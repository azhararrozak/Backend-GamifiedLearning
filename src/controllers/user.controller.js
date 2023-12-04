const db = require("../models");
const User = db.user;

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.urlProfile = req.body.urlProfile;
        user.address = req.body.address;
        user.phone = req.body.phone;
        user.school = req.body.school;

        await user.save();
        res.send({ message: "User was updated successfully!" });
    } catch (er) {
        res.status(500).send({ message: err.message });
    }
}


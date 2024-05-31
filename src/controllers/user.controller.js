const db = require("../models");
const User = db.user;

const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate("roles", "-__v");
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

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.send({ message: "User was deleted successfully!" });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.password = bcrypt.hashSync(req.body.password, 8);

        await user.save();
        res.send({ message: "Password was updated successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}


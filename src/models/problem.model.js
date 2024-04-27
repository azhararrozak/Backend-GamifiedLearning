const mongoose = require("mongoose");

const Problem = mongoose.model(
    "Problem",
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    })
);

module.exports = Problem
const mongoose = require("mongoose");

const Task = mongoose.model(
    "Task",
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        content: String,
        urlTask: String,
        date: {
            type: Date,
            default: Date.now(),
        },
        submittedByUser: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            urlFile: String,
            submitted: {
                type: Boolean,
                default: false
            },
            completed: {
                type: Boolean,
                default: false
            },
        }],
    })
);

module.exports = Task;

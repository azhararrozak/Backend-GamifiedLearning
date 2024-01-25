const mongoose = require("mongoose");

const Unit = mongoose.model(
  "Unit",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    // completedByUsers: [{
    //     userId: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User",
    //     },
    //     completed: {
    //         type: Boolean,
    //         default: false
    //     },
    // }],
  })
);

module.exports = Unit;

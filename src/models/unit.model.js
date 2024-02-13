const mongoose = require("mongoose");

const Unit = mongoose.model(
  "Unit",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
  })
);

module.exports = Unit;

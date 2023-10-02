const mongoose = require("mongoose");

const Tasks = mongoose.model(
  "Tasks",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    task: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "incomplete",
    },
  })
);

module.exports = Tasks;

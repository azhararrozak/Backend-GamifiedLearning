const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    urlProfile: String,
    address: {
      type: String,
      default: "Indonesia"
    },
    phone: String,
    school: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    problem: String,
  })
);

module.exports = User;
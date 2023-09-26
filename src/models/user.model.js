const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    point: {
      type: Number,
      default:0,
    },
    level: {
      type: Number,
      default: 1,
    },
    badges: [
      {
        name: String,
        description: String,
        images: String,
      }
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
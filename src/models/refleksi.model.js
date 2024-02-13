const mongoose = require("mongoose");

const Refleksi = mongoose.model(
  "Refleksi",
  new mongoose.Schema({
    pertemuan: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    refleksi: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        questions: [{
          type: Object,
        }],
      },
    ],
  })
);

module.exports = Refleksi;

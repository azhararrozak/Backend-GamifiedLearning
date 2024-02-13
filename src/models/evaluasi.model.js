const mongoose = require("mongoose");

const Evaluasi = mongoose.model(
  "Evaluasi",
  new mongoose.Schema({
    pertemuan: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    evaluasi: [
      {
        ketua: {
          type: String,
        },
        kelompok: {
          type: String,
        },
        content: {
          type: String,
        },
      },
    ],
  })
);

module.exports = Evaluasi;
